/**
 * 交接清單頁面
 */

import { Page } from '../components/ui';
import { Card, Footer, Progress, Enc, Btn, Row } from '../components/ui';
import { CheckIcon, DownloadIcon, ChevronLeft, ChevronRight } from '../components/icons';
import { checklistCategories } from '../data/checklist';
import { exportToCSV, exportToHTML } from '../utils/export';
import { ENCOURAGEMENT, BUTTON_TEXT } from '../constants';
import type { StageName, ChecklistItem } from '../types';

interface ChecklistPageProps {
  checklist: ChecklistItem[];
  toggleCheck: (id: string) => void;
  setStage: (stage: StageName) => void;
}

export const ChecklistPage = ({ checklist, toggleCheck, setStage }: ChecklistPageProps) => {
  const done = checklist.filter((i) => i.checked).length;
  const unchecked = checklist.filter((i) => !i.checked);

  return (
    <Page>
      <Progress current={7} total={10} />
      <Enc icon={<CheckIcon className="w-5 h-5" />} text={ENCOURAGEMENT.CHECKLIST} />
      <Card>
        <Row className="mb-2">
          <h3 className="font-bold text-gray-800 min-w-0">離職交接清單</h3>
          <span className="text-sm text-[#D4A5A5] flex-shrink-0">
            {done}/{checklist.length}
          </span>
        </Row>
        <div className="w-full h-2 bg-gray-200 rounded-full mb-4 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#D4A5A5] to-[#B8A9C9]"
            style={{ width: `${(done / checklist.length) * 100}%` }}
          />
        </div>
        <div className="space-y-4 max-h-80 overflow-y-auto">
          {checklistCategories.map((cat) => (
            <div key={cat}>
              <h4 className="text-xs font-bold text-[#D4A5A5] mb-2 sticky top-0 bg-white py-1">{cat}</h4>
              <div className="space-y-1">
                {checklist
                  .filter((i) => i.category === cat)
                  .map((i) => (
                    <label
                      key={i.id}
                      className={`flex items-start gap-2 p-2 rounded-3xl cursor-pointer ${
                        i.checked ? 'bg-green-50' : 'hover:bg-gray-50'
                      } ${
                        i.priority === 'must'
                          ? 'border-l-2 border-red-400'
                          : i.priority === 'should'
                          ? 'border-l-2 border-amber-400'
                          : ''
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={i.checked}
                        onChange={() => toggleCheck(i.id)}
                        className="w-4 h-4 mt-0.5 flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <span className={`text-sm ${i.checked ? 'text-gray-400 line-through' : ''}`}>{i.text}</span>
                        {i.note && <p className="text-xs text-gray-400 mt-0.5 break-words">{i.note}</p>}
                      </div>
                    </label>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </Card>
      <Card>
        <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-1">
          <DownloadIcon className="w-4 h-4" />
          輸出未完成項目
        </h3>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => exportToCSV(unchecked)}
            className="flex items-center justify-center gap-2 p-3 border rounded-3xl hover:bg-gray-50 min-h-[44px]"
          >
            <DownloadIcon className="w-4 h-4 text-green-600 flex-shrink-0" />
            <span className="text-sm">Excel (CSV)</span>
          </button>
          <button
            onClick={() => exportToHTML(unchecked)}
            className="flex items-center justify-center gap-2 p-3 border rounded-3xl hover:bg-gray-50 min-h-[44px]"
          >
            <DownloadIcon className="w-4 h-4 text-blue-600 flex-shrink-0" />
            <span className="text-sm">Word (HTML)</span>
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2 text-center">
          CSV可用Excel/Google Sheets開啟，HTML可用Word開啟
        </p>
      </Card>
      <div className="flex gap-3">
        <Btn onClick={() => setStage('menu')} variant="secondary">
          <ChevronLeft className="w-4 h-4" /> {BUTTON_TEXT.BACK}
        </Btn>
        <Btn onClick={() => setStage('rights')}>
          確認權益 <ChevronRight className="w-4 h-4" />
        </Btn>
      </div>
      <Footer />
    </Page>
  );
};

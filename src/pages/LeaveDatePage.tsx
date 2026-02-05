/**
 * 離職日期頁面
 */

import { Page } from '../components/ui';
import { Card, Footer, Progress, Enc, Btn } from '../components/ui';
import { CalendarIcon, ChevronLeft, ChevronRight, CheckIcon, InfoIcon } from '../components/icons';
import { calcTenure } from '../utils/calculations';
import type { StageName, FormData, DateMode } from '../types';

interface LeaveDatePageProps {
  form: FormData;
  dateMode: DateMode;
  setDateMode: (mode: DateMode) => void;
  updateForm: <K extends keyof FormData>(key: K, value: FormData[K]) => void;
  setStage: (stage: StageName) => void;
  doCalc: () => void;
}

export const LeaveDatePage = ({
  form,
  dateMode,
  setDateMode,
  updateForm,
  setStage,
  doCalc,
}: LeaveDatePageProps) => {
  const ct = calcTenure(form.joinDate, new Date().toISOString().split('T')[0]);

  return (
    <Page>
      <Progress current={2} total={10} />
      <Enc icon={<CalendarIcon className="w-5 h-5" />} text="給自己充足的時間說再見。" />
      <Card className="space-y-4">
        <div>
          <div className="text-sm text-gray-500">到職日期</div>
          <div className="text-xl font-bold text-[#D4A5A5] bg-[#D4A5A5]/10 rounded-3xl p-3 text-center">
            {new Date(form.joinDate).toLocaleDateString('zh-TW')}
          </div>
          <div className="text-center mt-1 text-sm text-gray-600">
            年資約 {ct.years} 年 {ct.months} 個月
          </div>
        </div>
        <div className="border-t pt-4">
          <h3 className="font-bold text-gray-800 mb-3">決定離職日期了嗎？</h3>
          <div className="space-y-2">
            <label
              className={`block p-3 border-2 rounded-3xl cursor-pointer overflow-hidden ${
                dateMode === 'known' ? 'border-[#D4A5A5] bg-[#D4A5A5]/5' : 'border-gray-200'
              }`}
            >
              <div className="flex items-start gap-3">
                <input
                  type="radio"
                  checked={dateMode === 'known'}
                  onChange={() => setDateMode('known')}
                  className="mt-1 flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-sm flex items-center gap-1">
                    <CheckIcon className="w-4 h-4 text-[#D4A5A5]" />
                    是，已決定最後上班日
                  </div>
                  <div className="text-xs text-gray-500">會計算最晚提離職日期</div>
                </div>
              </div>
            </label>
            <label
              className={`block p-3 border-2 rounded-3xl cursor-pointer overflow-hidden ${
                dateMode === 'unknown' ? 'border-[#D4A5A5] bg-[#D4A5A5]/5' : 'border-gray-200'
              }`}
            >
              <div className="flex items-start gap-3">
                <input
                  type="radio"
                  checked={dateMode === 'unknown'}
                  onChange={() => setDateMode('unknown')}
                  className="mt-1 flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-sm flex items-center gap-1">
                    <InfoIcon className="w-4 h-4 text-[#B8A9C9]" />
                    還沒，想先了解預告期
                  </div>
                  <div className="text-xs text-gray-500">會計算最快能離職的日期</div>
                </div>
              </div>
            </label>
          </div>
        </div>
        {dateMode === 'known' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">預計最後上班日</label>
            <input
              type="date"
              value={form.leaveDate}
              onChange={(e) => updateForm('leaveDate', e.target.value)}
              className="w-full max-w-full px-3 py-2.5 border-2 border-[#D4A5A5]/30 rounded-3xl focus:outline-none focus:border-[#D4A5A5] box-border text-base"
            />
          </div>
        )}
      </Card>
      <div className="flex gap-3">
        <Btn onClick={() => setStage('join-date')} variant="secondary">
          <ChevronLeft className="w-4 h-4" /> 返回
        </Btn>
        <Btn
          onClick={() => {
            doCalc();
            setStage('salary-info');
          }}
          disabled={dateMode === 'known' && !form.leaveDate}
        >
          下一步 <ChevronRight className="w-4 h-4" />
        </Btn>
      </div>
      <Footer />
    </Page>
  );
};

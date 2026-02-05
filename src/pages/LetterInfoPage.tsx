/**
 * 離職信資訊頁面
 */

import { useCallback } from 'react';
import { Page } from '../components/ui';
import { Card, Footer, Progress, Enc, Btn } from '../components/ui';
import { PenIcon, ChevronLeft, ChevronRight } from '../components/icons';
import { ENCOURAGEMENT, BUTTON_TEXT, REASON_OPTIONS, TONE_OPTIONS } from '../constants';
import type { StageName, FormData } from '../types';

interface LetterInfoPageProps {
  form: FormData;
  updateForm: <K extends keyof FormData>(key: K, value: FormData[K]) => void;
  setStage: (stage: StageName) => void;
}

export const LetterInfoPage = ({ form, updateForm, setStage }: LetterInfoPageProps) => {
  const toggle = useCallback((id: string) => {
    const newReasons = form.reasons.includes(id)
      ? form.reasons.filter((r) => r !== id)
      : [...form.reasons, id];
    updateForm('reasons', newReasons);
  }, [form.reasons, updateForm]);

  return (
    <Page>
      <Progress current={5} total={10} />
      <Enc icon={<PenIcon className="w-5 h-5" />} text={ENCOURAGEMENT.LETTER_INFO} />
      <Card className="space-y-3">
        <p className="text-xs text-gray-500">皆為選填</p>
        <div className="grid grid-cols-2 gap-2">
          <input
            placeholder="你的姓名"
            value={form.employeeName}
            onChange={(e) => updateForm('employeeName', e.target.value)}
            className="px-3 py-2 border rounded-3xl text-base min-w-0"
          />
          <input
            placeholder="主管稱呼"
            value={form.supervisorName}
            onChange={(e) => updateForm('supervisorName', e.target.value)}
            className="px-3 py-2 border rounded-3xl text-base min-w-0"
          />
          <input
            placeholder="公司名稱"
            value={form.company}
            onChange={(e) => updateForm('company', e.target.value)}
            className="px-3 py-2 border rounded-3xl text-base min-w-0"
          />
          <input
            placeholder="部門"
            value={form.department}
            onChange={(e) => updateForm('department', e.target.value)}
            className="px-3 py-2 border rounded-3xl text-base min-w-0"
          />
          <input
            placeholder="職稱"
            value={form.position}
            onChange={(e) => updateForm('position', e.target.value)}
            className="col-span-2 px-3 py-2 border rounded-3xl text-base"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">離職原因（可複選）</label>
          <div className="grid grid-cols-3 gap-1 mt-1">
            {REASON_OPTIONS.map((r) => (
              <label
                key={r.id}
                className={`p-2 border rounded-3xl text-xs cursor-pointer text-center ${
                  form.reasons.includes(r.id) ? 'border-[#D4A5A5] bg-[#D4A5A5]/5' : ''
                }`}
              >
                <input
                  type="checkbox"
                  checked={form.reasons.includes(r.id)}
                  onChange={() => toggle(r.id)}
                  className="sr-only"
                />
                {r.label}
              </label>
            ))}
          </div>
          {form.reasons.includes('other') && (
            <input
              placeholder="說明其他原因"
              value={form.reasonOther}
              onChange={(e) => updateForm('reasonOther', e.target.value)}
              className="w-full mt-2 px-3 py-2 border rounded-3xl text-base"
            />
          )}
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">語氣</label>
          <div className="flex gap-2 mt-1">
            {TONE_OPTIONS.map((t) => (
              <label
                key={t.value}
                className={`flex-1 py-2 text-center text-sm rounded-full cursor-pointer border min-h-[44px] flex items-center justify-center ${
                  form.tone === t.value ? 'bg-[#D4A5A5] text-white border-[#D4A5A5]' : 'border-gray-200'
                }`}
              >
                <input
                  type="radio"
                  checked={form.tone === t.value}
                  onChange={() => updateForm('tone', t.value)}
                  className="sr-only"
                />
                {t.label}
              </label>
            ))}
          </div>
        </div>
        <textarea
          placeholder="感謝的話（選填）"
          value={form.gratitude}
          onChange={(e) => updateForm('gratitude', e.target.value)}
          rows={2}
          className="w-full px-3 py-2 border rounded-3xl text-base resize-none"
        />
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={form.hasHandover}
            onChange={(e) => updateForm('hasHandover', e.target.checked)}
            className="flex-shrink-0"
          />
          加入交接承諾
        </label>
      </Card>
      <div className="flex gap-3">
        <Btn onClick={() => setStage('menu')} variant="secondary">
          <ChevronLeft className="w-4 h-4" /> {BUTTON_TEXT.BACK}
        </Btn>
        <Btn onClick={() => setStage('letter-result')}>
          {BUTTON_TEXT.GENERATE} <ChevronRight className="w-4 h-4" />
        </Btn>
      </div>
      <Footer />
    </Page>
  );
};

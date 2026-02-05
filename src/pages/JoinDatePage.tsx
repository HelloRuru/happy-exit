/**
 * 到職日期頁面
 */

import { Page } from '../components/ui';
import { Card, Footer, Progress, Legal, Enc, Btn } from '../components/ui';
import { SproutIcon, ChevronLeft, ChevronRight } from '../components/icons';
import type { StageName, FormData } from '../types';

interface JoinDatePageProps {
  form: FormData;
  updateForm: <K extends keyof FormData>(key: K, value: FormData[K]) => void;
  setStage: (stage: StageName) => void;
}

export const JoinDatePage = ({ form, updateForm, setStage }: JoinDatePageProps) => (
  <Page>
    <Progress current={1} total={10} />
    <Enc icon={<SproutIcon className="w-5 h-5" />} text="改變需要勇氣，你已經踏出第一步。" />
    <Card>
      <label className="block text-lg font-bold text-gray-800 mb-1">到職日期？</label>
      <p className="text-xs text-gray-500 mb-3">大概日期即可</p>
      <input
        type="date"
        value={form.joinDate}
        onChange={(e) => updateForm('joinDate', e.target.value)}
        className="w-full max-w-full px-3 py-2.5 border-2 border-[#D4A5A5]/30 rounded-3xl focus:outline-none focus:border-[#D4A5A5] box-border text-base"
      />
    </Card>
    <Legal>依《勞基法》§84-2，年資自受僱日起算。</Legal>
    <div className="flex gap-3">
      <Btn onClick={() => setStage('welcome')} variant="secondary">
        <ChevronLeft className="w-4 h-4" />
      </Btn>
      <Btn onClick={() => setStage('leave-date')} disabled={!form.joinDate}>
        下一步 <ChevronRight className="w-4 h-4" />
      </Btn>
    </div>
    <Footer />
  </Page>
);

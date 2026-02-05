/**
 * 薪資資訊頁面
 */

import { Page } from '../components/ui';
import { Card, Footer, Progress, Enc, Btn } from '../components/ui';
import { CoinIcon, ShieldIcon, ChevronLeft, ChevronRight } from '../components/icons';
import type { StageName, FormData, DateMode } from '../types';

interface SalaryInfoPageProps {
  form: FormData;
  dateMode: DateMode;
  updateForm: <K extends keyof FormData>(key: K, value: FormData[K]) => void;
  setStage: (stage: StageName) => void;
  doCalc: () => void;
}

export const SalaryInfoPage = ({ form, dateMode, updateForm, setStage, doCalc }: SalaryInfoPageProps) => (
  <Page>
    <Progress current={3} total={10} />
    <Enc icon={<CoinIcon className="w-5 h-5" />} text="薪資資訊（選填）有助計算特休折算與失業補助" />
    <Card className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">月薪（選填）</label>
        <input
          type="number"
          placeholder="例如 45000"
          value={form.monthlySalary || ''}
          onChange={(e) => updateForm('monthlySalary', parseInt(e.target.value) || 0)}
          className="w-full px-3 py-2.5 border-2 border-[#D4A5A5]/30 rounded-3xl focus:outline-none focus:border-[#D4A5A5] text-base"
        />
        <p className="text-xs text-gray-400 mt-1">用於計算特休折算、資遣費</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">勞保投保薪資（選填）</label>
        <input
          type="number"
          placeholder="通常≤月薪，例如 45800"
          value={form.insuredSalary || ''}
          onChange={(e) => updateForm('insuredSalary', parseInt(e.target.value) || 0)}
          className="w-full px-3 py-2.5 border-2 border-[#D4A5A5]/30 rounded-3xl focus:outline-none focus:border-[#D4A5A5] text-base"
        />
        <p className="text-xs text-gray-400 mt-1">未填則以月薪估算失業給付</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">今年已用特休天數</label>
        <input
          type="number"
          placeholder="0"
          value={form.usedAnnualLeave || ''}
          onChange={(e) => updateForm('usedAnnualLeave', parseInt(e.target.value) || 0)}
          className="w-full px-3 py-2.5 border-2 border-[#D4A5A5]/30 rounded-3xl focus:outline-none focus:border-[#D4A5A5] text-base"
        />
      </div>
      <div className="border-t pt-4">
        <label className="flex items-start gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={form.isInvoluntary}
            onChange={(e) => updateForm('isInvoluntary', e.target.checked)}
            className="mt-1 flex-shrink-0"
          />
          <div className="min-w-0">
            <span className="font-bold text-sm">非自願離職</span>
            <p className="text-xs text-gray-500 break-words">公司資遣、裁員、歇業等（可領資遣費+失業給付）</p>
          </div>
        </label>
      </div>
      {form.isInvoluntary && (
        <div className="bg-blue-50 rounded-3xl p-3 space-y-3">
          <h4 className="font-bold text-sm text-blue-800 flex items-center gap-1">
            <ShieldIcon className="w-4 h-4" />
            失業給付資格
          </h4>
          <div>
            <label className="block text-xs text-gray-600 mb-1">就業保險年資</label>
            <select
              value={form.insuranceYears}
              onChange={(e) => updateForm('insuranceYears', parseInt(e.target.value))}
              className="w-full px-3 py-2 border rounded-3xl text-base"
            >
              <option value={0}>未滿1年</option>
              <option value={1}>1年以上</option>
            </select>
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">扶養親屬人數（無謀生能力）</label>
            <select
              value={form.dependents}
              onChange={(e) => updateForm('dependents', parseInt(e.target.value))}
              className="w-full px-3 py-2 border rounded-3xl text-base"
            >
              {[0, 1, 2, 3].map((n) => (
                <option key={n} value={n}>
                  {n}人{n > 0 ? `（+${Math.min(n * 10, 20)}%）` : ''}
                </option>
              ))}
            </select>
          </div>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.isOver45}
              onChange={(e) => updateForm('isOver45', e.target.checked)}
              className="flex-shrink-0"
            />
            45歲以上（可領9個月）
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.hasDisability}
              onChange={(e) => updateForm('hasDisability', e.target.checked)}
              className="flex-shrink-0"
            />
            身心障礙者（可領9個月）
          </label>
        </div>
      )}
    </Card>
    <div className="flex gap-3">
      <Btn onClick={() => setStage('leave-date')} variant="secondary">
        <ChevronLeft className="w-4 h-4" /> 返回
      </Btn>
      <Btn
        onClick={() => {
          doCalc();
          setStage('result');
        }}
      >
        計算結果 <ChevronRight className="w-4 h-4" />
      </Btn>
    </div>
    <Footer />
  </Page>
);

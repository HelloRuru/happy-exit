/**
 * 計算結果頁面
 */

import { Page } from '../components/ui';
import { Card, Footer, OhruruRecommend, Progress, Legal, Enc, Btn, Row } from '../components/ui';
import {
  ChartIcon,
  AlertIcon,
  CalendarIcon,
  SearchIcon,
  UmbrellaIcon,
  CoinIcon,
  ChevronLeft,
  ChevronRight,
} from '../components/icons';
import { ENCOURAGEMENT, LEGAL_TEXT, BUTTON_TEXT } from '../constants';
import type { StageName, FormData, CalcResult, DateMode } from '../types';

interface ResultPageProps {
  form: FormData;
  calc: CalcResult;
  dateMode: DateMode;
  setStage: (stage: StageName) => void;
}

export const ResultPage = ({ form, calc, dateMode, setStage }: ResultPageProps) => (
  <Page>
    <Progress current={4} total={10} />
    <Enc icon={<ChartIcon className="w-5 h-5" />} text={ENCOURAGEMENT.RESULT} />
    <Card className="space-y-4">
      <Row>
        <span className="text-gray-600 min-w-0">年資</span>
        <span className="font-bold text-[#D4A5A5] text-xl flex-shrink-0">
          {calc.tenure.years}年 {calc.tenure.months}月 {calc.tenure.days}天
        </span>
      </Row>
      <Row>
        <span className="text-gray-600 min-w-0">法定預告期</span>
        <span className="font-bold text-xl flex-shrink-0">{calc.noticeRequired} 天</span>
      </Row>
      {dateMode === 'known' && calc.deadlineToResign && (
        <div className="bg-amber-50 rounded-3xl p-3">
          <Row>
            <span className="text-amber-800 font-medium min-w-0 flex items-center gap-1">
              <AlertIcon className="w-4 h-4" />
              最晚送出離職
            </span>
            <span className="font-bold text-amber-700 text-xl flex-shrink-0">
              {new Date(calc.deadlineToResign).toLocaleDateString('zh-TW')}
            </span>
          </Row>
          <p className="text-xs text-amber-600 mt-1">在這天前告知，才能如期離開</p>
        </div>
      )}
      {dateMode === 'unknown' && calc.earliestLeaveDate && (
        <div className="bg-green-50 rounded-3xl p-3">
          <Row>
            <span className="text-green-800 font-medium min-w-0 flex items-center gap-1">
              <CalendarIcon className="w-4 h-4" />
              今天提最快可離職
            </span>
            <span className="font-bold text-green-700 text-xl flex-shrink-0">
              {new Date(calc.earliestLeaveDate).toLocaleDateString('zh-TW')}
            </span>
          </Row>
        </div>
      )}
      <div className="border-t pt-4 space-y-3">
        <Row>
          <span className="text-gray-600 min-w-0 flex items-center gap-1">
            <SearchIcon className="w-4 h-4" />
            謀職假
          </span>
          <span className="font-bold flex-shrink-0">{calc.jobSearchLeave} 天（有薪）</span>
        </Row>
        <Row>
          <span className="text-gray-600 min-w-0 flex items-center gap-1">
            <UmbrellaIcon className="w-4 h-4" />
            特休額度
          </span>
          <span className="font-bold flex-shrink-0">{calc.annualLeave} 天</span>
        </Row>
        <Row>
          <span className="text-gray-600 min-w-0">已使用</span>
          <span className="flex-shrink-0">-{form.usedAnnualLeave} 天</span>
        </Row>
        <Row>
          <span className="text-gray-600 min-w-0">剩餘可折算</span>
          <span className="font-bold text-[#D4A5A5] flex-shrink-0">{calc.remainingLeave} 天</span>
        </Row>
        {form.monthlySalary > 0 && (
          <Row>
            <span className="text-gray-600 min-w-0 flex items-center gap-1">
              <CoinIcon className="w-4 h-4" />
              特休折算
            </span>
            <span className="font-bold text-green-600 flex-shrink-0">
              ≈ ${Math.round(calc.leaveCompensation).toLocaleString()}
            </span>
          </Row>
        )}
      </div>
    </Card>
    {form.isInvoluntary && (
      <Card className="bg-gradient-to-br from-amber-50 to-orange-50 space-y-3">
        <h3 className="font-bold text-amber-800 flex items-center gap-1">
          <AlertIcon className="w-4 h-4" />
          非自願離職權益
        </h3>
        {form.monthlySalary > 0 && (
          <>
            <Row>
              <span className="text-gray-700 min-w-0">資遣費</span>
              <span className="font-bold text-amber-700 flex-shrink-0">
                ${Math.round(calc.severancePay).toLocaleString()}
              </span>
            </Row>
            <Row>
              <span className="text-gray-700 min-w-0">預告工資</span>
              <span className="font-bold text-amber-700 flex-shrink-0">
                ${Math.round(calc.noticeWage).toLocaleString()}
              </span>
            </Row>
          </>
        )}
        {form.insuranceYears >= 1 && (
          <>
            <div className="border-t pt-2">
              <Row>
                <span className="text-gray-700 min-w-0">失業給付/月</span>
                <span className="font-bold text-blue-700 flex-shrink-0">
                  ${calc.unemploymentBenefit.toLocaleString()}
                </span>
              </Row>
              <p className="text-xs text-gray-500 mt-1">
                投保薪資60%{form.dependents > 0 ? `+扶養${Math.min(form.dependents * 10, 20)}%` : ''} ×{' '}
                {calc.unemploymentMonths}個月
              </p>
            </div>
            <Row>
              <span className="text-gray-700 min-w-0">最長可領</span>
              <span className="font-bold flex-shrink-0">{calc.unemploymentMonths} 個月</span>
            </Row>
            <div className="bg-white/50 rounded-3xl p-2">
              <p className="text-xs text-gray-600 font-medium">政府補助總計約</p>
              <p className="text-2xl font-bold text-blue-700">${calc.totalGovernmentBenefit.toLocaleString()}</p>
            </div>
          </>
        )}
      </Card>
    )}
    <Legal>{LEGAL_TEXT.CALCULATION_NOTE}</Legal>
    <div className="flex gap-3">
      <Btn onClick={() => setStage('salary-info')} variant="secondary">
        <ChevronLeft className="w-4 h-4" /> {BUTTON_TEXT.BACK}
      </Btn>
      <Btn onClick={() => setStage('menu')}>
        {BUTTON_TEXT.MENU} <ChevronRight className="w-4 h-4" />
      </Btn>
    </div>
    <OhruruRecommend />
    <Footer />
  </Page>
);

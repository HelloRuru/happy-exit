/**
 * 權益確認頁面
 */

import { Page } from '../components/ui';
import { Card, Footer, OhruruRecommend, Progress, Legal, Enc, Btn, Row } from '../components/ui';
import {
  CoinIcon,
  UmbrellaIcon,
  BuildingIcon,
  ShieldIcon,
  FileIcon,
  ClipboardIcon,
  LockIcon,
  WalletIcon,
  AlertIcon,
  InfoIcon,
  ChevronLeft,
  ChevronRight,
} from '../components/icons';
import { ENCOURAGEMENT, BUTTON_TEXT, RIGHTS_SECTIONS } from '../constants';
import type { StageName, FormData, CalcResult } from '../types';

interface RightsPageProps {
  form: FormData;
  calc: CalcResult;
  setStage: (stage: StageName) => void;
}

export const RightsPage = ({ form, calc, setStage }: RightsPageProps) => (
  <Page>
    <Progress current={8} total={10} />
    <Enc icon={<CoinIcon className="w-5 h-5" />} text={ENCOURAGEMENT.RIGHTS} />
    <Card className="space-y-4">
      <h3 className="font-bold text-gray-800">法律權益確認</h3>

      <div className="bg-[#D4A5A5]/5 rounded-3xl p-3">
        <h4 className="font-medium text-sm mb-2 flex items-center gap-1">
          <UmbrellaIcon className="w-4 h-4" />
          {RIGHTS_SECTIONS.ANNUAL_LEAVE}
        </h4>
        <p className="text-sm">
          剩餘 <strong className="text-[#D4A5A5]">{calc.remainingLeave} 天</strong>
        </p>
        {form.monthlySalary > 0 && (
          <p className="text-sm">
            約 <strong className="text-green-600">${Math.round(calc.leaveCompensation).toLocaleString()}</strong>
          </p>
        )}
        <p className="text-xs text-gray-500 mt-1">未休完應折算工資</p>
      </div>

      {form.isInvoluntary && (
        <>
          <div className="bg-amber-50 rounded-3xl p-3 border-2 border-amber-200">
            <h4 className="font-bold text-sm mb-2 text-amber-800 flex items-center gap-1">
              <BuildingIcon className="w-4 h-4" />
              {RIGHTS_SECTIONS.COMPANY_PAYMENT}
            </h4>
            {form.monthlySalary > 0 ? (
              <>
                <Row>
                  <span className="text-sm min-w-0">資遣費</span>
                  <span className="font-bold text-amber-700 flex-shrink-0">
                    ${Math.round(calc.severancePay).toLocaleString()}
                  </span>
                </Row>
                <p className="text-xs text-gray-500">新制：年資×0.5個月薪，最高6個月</p>
                {calc.noticeWage > 0 && (
                  <>
                    <Row className="border-t pt-2">
                      <span className="text-sm min-w-0">預告工資</span>
                      <span className="font-bold text-amber-700 flex-shrink-0">
                        ${Math.round(calc.noticeWage).toLocaleString()}
                      </span>
                    </Row>
                    <p className="text-xs text-gray-500">公司未提前預告時須支付</p>
                  </>
                )}
                <div className="border-t pt-2 mt-2">
                  <Row>
                    <span className="text-sm font-medium min-w-0">小計</span>
                    <span className="font-bold text-amber-800 text-lg flex-shrink-0">
                      ${Math.round(calc.severancePay + calc.noticeWage + calc.leaveCompensation).toLocaleString()}
                    </span>
                  </Row>
                  <p className="text-xs text-gray-400">含特休折算 ${Math.round(calc.leaveCompensation).toLocaleString()}</p>
                </div>
              </>
            ) : (
              <p className="text-xs text-gray-500">請填入月薪以計算</p>
            )}
          </div>

          {form.insuranceYears >= 1 && (
            <div className="bg-blue-50 rounded-3xl p-3 border-2 border-blue-200">
              <h4 className="font-bold text-sm mb-2 text-blue-800 flex items-center gap-1">
                <ShieldIcon className="w-4 h-4" />
                {RIGHTS_SECTIONS.GOVERNMENT_BENEFIT}
              </h4>
              {(form.insuredSalary || form.monthlySalary) > 0 ? (
                <>
                  <Row>
                    <span className="text-sm min-w-0">失業給付（每月）</span>
                    <span className="font-bold text-blue-700 flex-shrink-0">
                      ${calc.unemploymentBenefit.toLocaleString()}
                    </span>
                  </Row>
                  <p className="text-xs text-gray-500 mt-1">
                    投保薪資60%{form.dependents > 0 ? `+扶養加給${form.dependents >= 2 ? '20' : '10'}%` : ''} ×{' '}
                    {calc.unemploymentMonths}個月
                  </p>
                  <Row>
                    <span className="text-sm min-w-0">最長可領</span>
                    <span className="font-bold text-blue-700 flex-shrink-0">{calc.unemploymentMonths} 個月</span>
                  </Row>
                  <div className="border-t pt-2 mt-2">
                    <Row>
                      <span className="text-sm font-medium min-w-0">總計可領</span>
                      <span className="font-bold text-blue-800 text-lg flex-shrink-0">
                        ${(calc.unemploymentBenefit * calc.unemploymentMonths).toLocaleString()}
                      </span>
                    </Row>
                  </div>
                </>
              ) : (
                <p className="text-xs text-gray-500">請填入薪資以計算</p>
              )}
              <p className="text-xs text-blue-600 mt-2 flex items-center gap-1">
                <AlertIcon className="w-3 h-3" />
                需就保年資滿1年且向就業服務站辦理
              </p>
            </div>
          )}

          {form.insuranceYears < 1 && (
            <div className="bg-gray-100 rounded-3xl p-3">
              <p className="text-xs text-gray-500 flex items-center gap-1">
                <InfoIcon className="w-3 h-3" />
                就保年資未滿1年無法申請失業給付，但仍可申請資遣費
              </p>
            </div>
          )}
        </>
      )}

      <div className="bg-red-50 rounded-3xl p-3">
        <h4 className="font-medium text-sm mb-2 flex items-center gap-1">
          <FileIcon className="w-4 h-4" />
          {RIGHTS_SECTIONS.CERTIFICATE}
        </h4>
        <ul className="text-xs text-gray-600 space-y-1">
          <li>• 公司有義務開立</li>
          <li>• 確認離職代碼正確（影響失業給付）</li>
          <li>• 非自願離職需記載正確條款</li>
        </ul>
      </div>

      <div className="bg-green-50 rounded-3xl p-3">
        <h4 className="font-medium text-sm mb-2 flex items-center gap-1">
          <ClipboardIcon className="w-4 h-4" />
          {RIGHTS_SECTIONS.SERVICE_PROOF}
        </h4>
        <ul className="text-xs text-gray-600 space-y-1">
          <li>• 依勞基法§19，僅記載到離職日、職位</li>
          <li>• 不得有任何不利評語</li>
        </ul>
      </div>

      <div className="bg-blue-50 rounded-3xl p-3">
        <h4 className="font-medium text-sm mb-2 flex items-center gap-1">
          <ShieldIcon className="w-4 h-4" />
          {RIGHTS_SECTIONS.INSURANCE}
        </h4>
        <ul className="text-xs text-gray-600 space-y-1">
          <li>• 離職當日退保</li>
          <li>• 空窗期可至區公所以第六類投保</li>
          <li>• 或依附配偶/父母眷屬保</li>
          {form.isInvoluntary && <li className="text-blue-600 font-medium">• 領失業給付期間健保費全額補助！</li>}
        </ul>
      </div>

      <div className="bg-purple-50 rounded-3xl p-3">
        <h4 className="font-medium text-sm mb-2 flex items-center gap-1">
          <LockIcon className="w-4 h-4" />
          {RIGHTS_SECTIONS.NON_COMPETE}
        </h4>
        <ul className="text-xs text-gray-600 space-y-1">
          <li>• 檢查合約是否有「月補償金」</li>
          <li>• 無補償金的競業條款多為無效</li>
        </ul>
      </div>

      <div className="bg-gray-50 rounded-3xl p-3">
        <h4 className="font-medium text-sm mb-2 flex items-center gap-1">
          <WalletIcon className="w-4 h-4" />
          {RIGHTS_SECTIONS.PENSION}
        </h4>
        <ul className="text-xs text-gray-600 space-y-1">
          <li>
            • 到
            <a
              href="https://edesk.bli.gov.tw/na/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#D4A5A5] underline"
            >
              勞保局e化服務
            </a>
            查詢
          </li>
          <li>• 確認公司每月有足額提繳</li>
        </ul>
      </div>
    </Card>
    <Legal>
      如有勞資爭議，可撥{' '}
      <a href="tel:1955" className="font-bold">
        1955
      </a>{' '}
      諮詢或向勞工局申請調解
    </Legal>
    <div className="flex gap-3">
      <Btn onClick={() => setStage('menu')} variant="secondary">
        <ChevronLeft className="w-4 h-4" /> {BUTTON_TEXT.BACK}
      </Btn>
      <Btn onClick={() => setStage('digital')}>
        數位安全 <ChevronRight className="w-4 h-4" />
      </Btn>
    </div>
    <OhruruRecommend />
    <Footer />
  </Page>
);

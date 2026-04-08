/**
 * 謀職假頁面
 */

import { Page } from '../components/ui';
import { Card, Footer, OhruruRecommend, Legal, Enc, Btn, Row, CopyBtn } from '../components/ui';
import { SearchIcon, ChevronLeft } from '../components/icons';
import { generateJobSearchLeaveRequest } from '../utils/letters';
import { ENCOURAGEMENT, BUTTON_TEXT, JOB_SEARCH_LEAVE_INFO } from '../constants';
import type { StageName, FormData, CalcResult } from '../types';

interface JobSearchPageProps {
  form: FormData;
  calc: CalcResult;
  copiedId: string | null;
  copy: (text: string, id: string) => void;
  setStage: (stage: StageName) => void;
}

export const JobSearchPage = ({ form, calc, copiedId, copy, setStage }: JobSearchPageProps) => {
  const req = generateJobSearchLeaveRequest(form, calc.jobSearchLeave);

  return (
    <Page>
      <Enc icon={<SearchIcon className="w-5 h-5" />} text={ENCOURAGEMENT.JOB_SEARCH} />
      <Card className="space-y-4">
        <Row>
          <div className="min-w-0">
            <h3 className="font-bold text-gray-800">{JOB_SEARCH_LEAVE_INFO.TITLE}</h3>
            <p className="text-xs text-gray-500">預告期每週2日有薪</p>
          </div>
          <span className="text-3xl font-bold text-[#D4A5A5] flex-shrink-0">{calc.jobSearchLeave} 天</span>
        </Row>
        <div>
          <Row className="mb-2">
            <span className="text-sm font-medium min-w-0">申請單範本</span>
            <CopyBtn text={req} id="jsl" copiedId={copiedId} onCopy={copy} />
          </Row>
          <pre className="whitespace-pre-wrap text-xs text-gray-700 bg-gray-50 rounded-3xl p-3 font-sans overflow-x-hidden">
            {req}
          </pre>
        </div>
      </Card>
      <Legal>《勞基法》§16-2：預告期間每週可請2日有薪假外出謀職</Legal>
      <div className="flex gap-3">
        <Btn onClick={() => setStage('menu')} variant="secondary">
          <ChevronLeft className="w-4 h-4" /> {BUTTON_TEXT.BACK}
        </Btn>
      </div>
      <OhruruRecommend />
      <Footer />
    </Page>
  );
};

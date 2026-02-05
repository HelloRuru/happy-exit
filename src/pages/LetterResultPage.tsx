/**
 * 離職信結果頁面
 */

import { Page } from '../components/ui';
import { Card, Footer, Progress, Enc, Btn, Row, CopyBtn } from '../components/ui';
import {
  FileIcon,
  BriefcaseIcon,
  BuildingIcon,
  HeartIcon,
  LinkIcon,
  ThumbsUpIcon,
  ChevronLeft,
  ChevronRight,
} from '../components/icons';
import {
  generateResignationLetter,
  generateSupervisorEmail,
  generateHREmail,
  generateColleagueEmail,
  generateVendorEmail,
  generateRecommendationRequest,
  generateLinkedInPost,
} from '../utils/letters';
import { ENCOURAGEMENT, BUTTON_TEXT } from '../constants';
import type { StageName, FormData, CalcResult } from '../types';

interface LetterResultPageProps {
  form: FormData;
  calc: CalcResult;
  copiedId: string | null;
  getLeaveDate: () => string;
  copy: (text: string, id: string) => void;
  setStage: (stage: StageName) => void;
}

export const LetterResultPage = ({
  form,
  calc,
  copiedId,
  getLeaveDate,
  copy,
  setStage,
}: LetterResultPageProps) => {
  const leaveDate = getLeaveDate();
  const letter = generateResignationLetter(form, leaveDate);

  const emails = [
    { t: '約主管面談', c: generateSupervisorEmail(form), id: 's', icon: <BriefcaseIcon className="w-4 h-4" /> },
    { t: '通知人資', c: generateHREmail(form, leaveDate), id: 'h', icon: <BuildingIcon className="w-4 h-4" /> },
    { t: '向同事道別', c: generateColleagueEmail(form, calc, leaveDate), id: 'c', icon: <HeartIcon className="w-4 h-4" /> },
    { t: '通知廠商', c: generateVendorEmail(form, leaveDate), id: 'v', icon: <LinkIcon className="w-4 h-4" /> },
    { t: '請求推薦', c: generateRecommendationRequest(form), id: 'ref', icon: <ThumbsUpIcon className="w-4 h-4" /> },
    { t: 'LinkedIn動態', c: generateLinkedInPost(form, calc), id: 'li', icon: <BriefcaseIcon className="w-4 h-4" /> },
  ];

  return (
    <Page>
      <Progress current={6} total={10} />
      <Enc icon={<FileIcon className="w-5 h-5" />} text={ENCOURAGEMENT.LETTER_RESULT} />
      <Card>
        <Row className="mb-2">
          <h3 className="font-bold text-gray-800 min-w-0">離職信</h3>
          <CopyBtn text={letter} id="letter" copiedId={copiedId} onCopy={copy} />
        </Row>
        <pre className="whitespace-pre-wrap text-sm text-gray-700 bg-gray-50 rounded-3xl p-3 font-sans max-h-48 overflow-y-auto overflow-x-hidden">
          {letter}
        </pre>
      </Card>
      <Card className="space-y-3">
        <h3 className="font-bold text-gray-800">Email範本</h3>
        {emails.map((e) => (
          <div key={e.id} className="border rounded-3xl p-2 overflow-hidden">
            <Row className="mb-1">
              <span className="text-sm font-medium min-w-0 truncate flex items-center gap-1">
                {e.icon}
                {e.t}
              </span>
              <CopyBtn text={e.c} id={e.id} copiedId={copiedId} onCopy={copy} />
            </Row>
            <pre className="whitespace-pre-wrap text-xs text-gray-600 bg-gray-50 rounded-xl p-2 font-sans max-h-32 overflow-y-auto overflow-x-hidden">
              {e.c}
            </pre>
          </div>
        ))}
      </Card>
      <div className="flex gap-3">
        <Btn onClick={() => setStage('letter-info')} variant="secondary">
          <ChevronLeft className="w-4 h-4" /> {BUTTON_TEXT.MODIFY}
        </Btn>
        <Btn onClick={() => setStage('menu')}>
          {BUTTON_TEXT.BACK} <ChevronRight className="w-4 h-4" />
        </Btn>
      </div>
      <Footer />
    </Page>
  );
};

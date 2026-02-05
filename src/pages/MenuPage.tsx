/**
 * 功能選單頁面
 */

import { Page } from '../components/ui';
import { Footer, Enc, Btn, Menu } from '../components/ui';
import {
  ClipboardIcon,
  PenIcon,
  MailIcon,
  SearchIcon,
  CoinIcon,
  KeyIcon,
  ChevronLeft,
  PartyIcon,
} from '../components/icons';
import type { StageName, FormData, CalcResult } from '../types';

interface MenuPageProps {
  form: FormData;
  calc: CalcResult;
  setStage: (stage: StageName) => void;
}

export const MenuPage = ({ form, calc, setStage }: MenuPageProps) => (
  <Page>
    <Enc icon={<ClipboardIcon className="w-5 h-5" />} text="選擇需要的功能" />
    <div className="space-y-3">
      <Menu
        icon={<PenIcon className="w-5 h-5" />}
        title="離職信產生器"
        desc="正式/親切/簡潔三種風格"
        onClick={() => setStage('letter-info')}
      />
      <Menu
        icon={<MailIcon className="w-5 h-5" />}
        title="Email範本"
        desc="約主管、通知人資、同事道別、廠商通知"
        onClick={() => setStage('letter-info')}
      />
      <Menu
        icon={<SearchIcon className="w-5 h-5" />}
        title="謀職假申請"
        desc={`預告期間每週2日有薪（${calc.jobSearchLeave}天）`}
        onClick={() => setStage('job-search')}
        badge={calc.jobSearchLeave > 0 ? '別忘了用' : undefined}
      />
      <Menu
        icon={<ClipboardIcon className="w-5 h-5" />}
        title="交接清單"
        desc="30項確認事項，可輸出CSV/Word"
        onClick={() => setStage('checklist')}
      />
      <Menu
        icon={<CoinIcon className="w-5 h-5" />}
        title="權益確認"
        desc="特休、資遣費、失業給付、文件"
        onClick={() => setStage('rights')}
        badge={form.isInvoluntary ? '重要' : undefined}
      />
      <Menu
        icon={<KeyIcon className="w-5 h-5" />}
        title="數位安全"
        desc="帳號換綁、作品集脫敏、足跡清除"
        onClick={() => setStage('digital')}
      />
    </div>
    <div className="flex gap-3 mt-4">
      <Btn onClick={() => setStage('result')} variant="secondary">
        <ChevronLeft className="w-4 h-4" /> 計算結果
      </Btn>
      <Btn onClick={() => setStage('complete')}>
        完成 <PartyIcon className="w-4 h-4" />
      </Btn>
    </div>
    <Footer />
  </Page>
);

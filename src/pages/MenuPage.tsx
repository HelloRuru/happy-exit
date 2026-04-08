/**
 * 功能選單頁面
 */

import { Page } from '../components/ui';
import { Footer, OhruruRecommend, Enc, Btn, Menu } from '../components/ui';
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
import { ENCOURAGEMENT, MENU_ITEMS, BUTTON_TEXT } from '../constants';
import type { StageName, FormData, CalcResult } from '../types';

interface MenuPageProps {
  form: FormData;
  calc: CalcResult;
  setStage: (stage: StageName) => void;
}

export const MenuPage = ({ form, calc, setStage }: MenuPageProps) => (
  <Page>
    <Enc icon={<ClipboardIcon className="w-5 h-5" />} text={ENCOURAGEMENT.MENU} />
    <div className="space-y-3">
      <Menu
        icon={<PenIcon className="w-5 h-5" />}
        title={MENU_ITEMS.LETTER_GENERATOR.title}
        desc={MENU_ITEMS.LETTER_GENERATOR.desc}
        onClick={() => setStage('letter-info')}
      />
      <Menu
        icon={<MailIcon className="w-5 h-5" />}
        title={MENU_ITEMS.EMAIL_TEMPLATES.title}
        desc={MENU_ITEMS.EMAIL_TEMPLATES.desc}
        onClick={() => setStage('letter-info')}
      />
      <Menu
        icon={<SearchIcon className="w-5 h-5" />}
        title={MENU_ITEMS.JOB_SEARCH_LEAVE.title}
        desc={MENU_ITEMS.JOB_SEARCH_LEAVE.descTemplate.replace('{days}', String(calc.jobSearchLeave))}
        onClick={() => setStage('job-search')}
        badge={calc.jobSearchLeave > 0 ? MENU_ITEMS.JOB_SEARCH_LEAVE.badge : undefined}
      />
      <Menu
        icon={<ClipboardIcon className="w-5 h-5" />}
        title={MENU_ITEMS.CHECKLIST.title}
        desc={MENU_ITEMS.CHECKLIST.desc}
        onClick={() => setStage('checklist')}
      />
      <Menu
        icon={<CoinIcon className="w-5 h-5" />}
        title={MENU_ITEMS.RIGHTS.title}
        desc={MENU_ITEMS.RIGHTS.desc}
        onClick={() => setStage('rights')}
        badge={form.isInvoluntary ? MENU_ITEMS.RIGHTS.badge : undefined}
      />
      <Menu
        icon={<KeyIcon className="w-5 h-5" />}
        title={MENU_ITEMS.DIGITAL_SECURITY.title}
        desc={MENU_ITEMS.DIGITAL_SECURITY.desc}
        onClick={() => setStage('digital')}
      />
    </div>
    <div className="flex gap-3 mt-4">
      <Btn onClick={() => setStage('result')} variant="secondary">
        <ChevronLeft className="w-4 h-4" /> {BUTTON_TEXT.CALCULATE}
      </Btn>
      <Btn onClick={() => setStage('complete')}>
        {BUTTON_TEXT.COMPLETE} <PartyIcon className="w-4 h-4" />
      </Btn>
    </div>
    <OhruruRecommend />
    <Footer />
  </Page>
);

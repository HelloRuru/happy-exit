/**
 * 完成頁面
 */

import { Page } from '../components/ui';
import { Card, Footer } from '../components/ui';
import { PartyIcon, StarIcon, ClipboardIcon, InfoIcon, HomeIcon } from '../components/icons';
import { COMPLETE_CONTENT } from '../constants';
import type { StageName } from '../types';

interface CompletePageProps {
  setStage: (stage: StageName) => void;
  reset: () => void;
}

export const CompletePage = ({ setStage, reset }: CompletePageProps) => (
  <Page>
    <div className="text-center space-y-4 py-8">
      <div className="w-20 h-20 mx-auto bg-[#D4A5A5]/10 rounded-full flex items-center justify-center">
        <PartyIcon className="w-12 h-12 text-[#D4A5A5]" />
      </div>
      <h1 className="text-2xl font-bold text-[#D4A5A5]">恭喜完成離職準備！</h1>
      <p className="text-gray-600">祝新旅程順利</p>
      <div className="bg-gradient-to-r from-[#D4A5A5]/20 to-[#B8A9C9]/20 rounded-3xl p-4">
        <p className="text-[#D4A5A5] flex items-center justify-center gap-1">
          每一個結束，都是新開始。
          <br />
          勇敢追夢！
          <StarIcon className="w-4 h-4" />
        </p>
      </div>
      <Card className="text-left">
        <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-1">
          <ClipboardIcon className="w-4 h-4" />
          最後確認
        </h3>
        <ul className="space-y-1 text-sm text-gray-600">
          <li className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-gray-300 rounded" />
            離職證明書
          </li>
          <li className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-gray-300 rounded" />
            服務證明書
          </li>
          <li className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-gray-300 rounded" />
            薪資/特休已結算
          </li>
          <li className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-gray-300 rounded" />
            勞健保轉出單
          </li>
          <li className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-gray-300 rounded" />
            物品歸還/帶走
          </li>
          <li className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-gray-300 rounded" />
            同事道別
          </li>
        </ul>
      </Card>
      <div className="bg-blue-50 rounded-3xl p-4 text-left">
        <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-1">
          <InfoIcon className="w-4 h-4" />
          空窗期提醒
        </h3>
        <ul className="space-y-1 text-xs text-gray-600">
          <li>• 健保可至區公所第六類加保</li>
          <li>• 非自願離職可申請失業給付</li>
          <li>• 建議休息1-2週再求職</li>
        </ul>
      </div>
      <div className="flex flex-col gap-2">
        <button
          onClick={() => setStage('menu')}
          className="w-full bg-[#D4A5A5] text-white py-3 rounded-full font-medium flex items-center justify-center gap-2 min-h-[44px]"
        >
          <HomeIcon className="w-4 h-4" />
          返回功能
        </button>
        <button onClick={reset} className="w-full bg-gray-100 text-gray-600 py-3 rounded-full font-medium min-h-[44px]">
          重新開始
        </button>
      </div>
    </div>
    <Footer />
  </Page>
);

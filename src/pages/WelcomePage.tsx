/**
 * Welcome Page
 */

import { Card, Privacy } from '../components/ui';
import { Page } from '../components/ui';
import { StarIcon, CheckIcon, SunIcon } from '../components/icons';
import type { StageName } from '../types';

interface WelcomePageProps {
  setStage: (stage: StageName) => void;
}

export const WelcomePage = ({ setStage }: WelcomePageProps) => (
  <Page>
    <div className="text-center space-y-4 py-6">
      <h1 className="text-3xl sm:text-4xl font-bold text-[#D4A5A5]">
        離職全能導航幫手
      </h1>
      <p className="text-lg text-gray-600 flex items-center justify-center gap-2">
        <StarIcon className="w-5 h-5 text-[#B8A9C9]" />
        新的開始，從溫暖的告別開始
      </p>
      <div className="bg-gradient-to-r from-[#D4A5A5]/20 to-[#B8A9C9]/20 rounded-3xl p-4">
        <p className="text-[#D4A5A5]">
          每一段旅程都有終點。
          <br />
          讓我們一起好好規劃這個轉變。
        </p>
      </div>
      <Card className="text-left">
        <h3 className="font-bold text-gray-800 mb-2">功能：</h3>
        <ul className="space-y-1 text-sm text-gray-600">
          <li className="flex items-center gap-2">
            <CheckIcon className="w-4 h-4 text-[#D4A5A5] flex-shrink-0" />
            計算預告期、特休、資遣費
          </li>
          <li className="flex items-center gap-2">
            <CheckIcon className="w-4 h-4 text-[#D4A5A5] flex-shrink-0" />
            確認法律權益
          </li>
          <li className="flex items-center gap-2">
            <CheckIcon className="w-4 h-4 text-[#D4A5A5] flex-shrink-0" />
            離職信與Email範本
          </li>
          <li className="flex items-center gap-2">
            <CheckIcon className="w-4 h-4 text-[#D4A5A5] flex-shrink-0" />
            完整交接清單（可輸出）
          </li>
          <li className="flex items-center gap-2">
            <CheckIcon className="w-4 h-4 text-[#D4A5A5] flex-shrink-0" />
            數位安全指南
          </li>
        </ul>
      </Card>
      <button
        onClick={() => setStage('join-date')}
        className="w-full bg-[#D4A5A5] text-white py-3 rounded-full font-medium flex items-center justify-center gap-2 min-h-[44px]"
      >
        <SunIcon className="w-5 h-5" />
        開始規劃
      </button>
      <Privacy />
    </div>
  </Page>
);

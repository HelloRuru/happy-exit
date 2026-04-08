/**
 * 數位安全頁面
 */

import { Page } from '../components/ui';
import { Card, Footer, OhruruRecommend, Progress, Warn, Enc, Btn } from '../components/ui';
import {
  KeyIcon,
  AlertIcon,
  LinkIcon,
  TrashIcon,
  FolderIcon,
  BrushIcon,
  FileIcon,
  CheckIcon,
  ChevronLeft,
  PartyIcon,
} from '../components/icons';
import { ENCOURAGEMENT, LEGAL_TEXT, BUTTON_TEXT, DIGITAL_SECURITY_SECTIONS, FILE_NAMING_EXAMPLE, EXTERNAL_SERVICES } from '../constants';
import type { StageName } from '../types';

interface DigitalSecurityPageProps {
  setStage: (stage: StageName) => void;
}

export const DigitalSecurityPage = ({ setStage }: DigitalSecurityPageProps) => (
  <Page>
    <Progress current={9} total={10} />
    <Enc icon={<KeyIcon className="w-5 h-5" />} text={ENCOURAGEMENT.DIGITAL_SECURITY} />
    <Card className="space-y-4">
      <h3 className="font-bold text-gray-800">數位安全檢查</h3>

      <div className="bg-red-50 rounded-3xl p-3">
        <h4 className="font-medium text-sm mb-2 text-red-700 flex items-center gap-1">
          <AlertIcon className="w-4 h-4" />
          {DIGITAL_SECURITY_SECTIONS.EMAIL_CLEANUP}
        </h4>
        <ul className="text-xs text-gray-600 space-y-1">
          <li>1. 搜尋：面試、薪資、體檢、私人、offer</li>
          <li>2. 刪除相關郵件</li>
          <li>3. 清空垃圾桶（Hard Delete）</li>
          <li>4. 清空「已刪除」與「草稿」</li>
        </ul>
      </div>

      <div className="bg-amber-50 rounded-3xl p-3">
        <h4 className="font-medium text-sm mb-2 flex items-center gap-1">
          <LinkIcon className="w-4 h-4" />
          {DIGITAL_SECURITY_SECTIONS.ACCOUNT_MIGRATION}
        </h4>
        <p className="text-xs text-gray-600 mb-2">公司信箱註冊的服務改綁個人信箱：</p>
        <div className="flex flex-wrap gap-1">
          {EXTERNAL_SERVICES.map((s) => (
            <span key={s} className="text-xs bg-white px-2 py-1 rounded">
              {s}
            </span>
          ))}
        </div>
      </div>

      <div className="bg-blue-50 rounded-3xl p-3">
        <h4 className="font-medium text-sm mb-2 flex items-center gap-1">
          <TrashIcon className="w-4 h-4" />
          {DIGITAL_SECURITY_SECTIONS.BROWSER_CLEANUP}
        </h4>
        <ul className="text-xs text-gray-600 space-y-1">
          <li>• 登出 Chrome/Edge 帳號</li>
          <li>• 清除已儲存密碼</li>
          <li>• 清除信用卡資訊</li>
          <li>• 清除瀏覽紀錄與 Cookies</li>
        </ul>
      </div>

      <div className="bg-green-50 rounded-3xl p-3">
        <h4 className="font-medium text-sm mb-2 flex items-center gap-1">
          <FolderIcon className="w-4 h-4" />
          {DIGITAL_SECURITY_SECTIONS.BACKUP}
        </h4>
        <p className="text-xs text-gray-600 flex items-center gap-1">
          <CheckIcon className="w-3 h-3 text-green-600" />
          可保留：個人模板、SOP流程、學習筆記
        </p>
        <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
          <AlertIcon className="w-3 h-3" />
          不能帶：公司機密、客戶資料、專案原始檔
        </p>
      </div>

      <div className="bg-purple-50 rounded-3xl p-3">
        <h4 className="font-medium text-sm mb-2 flex items-center gap-1">
          <BrushIcon className="w-4 h-4" />
          {DIGITAL_SECURITY_SECTIONS.PORTFOLIO}
        </h4>
        <ul className="text-xs text-gray-600 space-y-1">
          <li>• 數據轉百分比（營收100萬→成長30%）</li>
          <li>• 模糊化Logo與品牌名稱</li>
          <li>• 確認不違反NDA</li>
        </ul>
      </div>

      <div className="bg-gray-50 rounded-3xl p-3">
        <h4 className="font-medium text-sm mb-2 flex items-center gap-1">
          <FileIcon className="w-4 h-4" />
          {DIGITAL_SECURITY_SECTIONS.FILE_NAMING}
        </h4>
        <code className="text-xs bg-white px-2 py-1 rounded block break-all">
          {FILE_NAMING_EXAMPLE}
        </code>
      </div>
    </Card>
    <Warn>{LEGAL_TEXT.CONFIDENTIAL_WARNING}</Warn>
    <div className="flex gap-3">
      <Btn onClick={() => setStage('menu')} variant="secondary">
        <ChevronLeft className="w-4 h-4" /> {BUTTON_TEXT.BACK}
      </Btn>
      <Btn onClick={() => setStage('complete')}>
        {BUTTON_TEXT.COMPLETE} <PartyIcon className="w-4 h-4" />
      </Btn>
    </div>
    <OhruruRecommend />
    <Footer />
  </Page>
);

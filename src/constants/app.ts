/**
 * App Constants
 * =============
 * 離職計算相關常數與預設資料
 */

export const REASON_OPTIONS = [
  { id: 'career', label: '職涯發展' },
  { id: 'family', label: '家庭因素' },
  { id: 'health', label: '健康因素' },
  { id: 'study', label: '進修學習' },
  { id: 'relocation', label: '搬遷通勤' },
  { id: 'other', label: '其他' },
] as const;

export const REASON_MAP: Record<string, string> = {
  career: '職涯發展',
  family: '家庭因素',
  health: '健康因素',
  study: '進修學習',
  relocation: '搬遷通勤',
  other: '個人因素',
};

export const TONE_OPTIONS = [
  { value: 'formal', label: '正式' },
  { value: 'friendly', label: '親切' },
  { value: 'simple', label: '簡潔' },
] as const;

export const DEFAULT_CHECKLIST = [
  { id: 'c1', text: '送出書面離職信', checked: false, category: '法律權益', priority: 'must' as const },
  { id: 'c2', text: '確認離職日期已核准', checked: false, category: '法律權益', priority: 'must' as const },
  { id: 'c3', text: '索取離職證明書（確認代碼）', checked: false, category: '法律權益', priority: 'must' as const, note: '非自願離職需確認代碼符合失業給付' },
  { id: 'c4', text: '索取服務證明書', checked: false, category: '法律權益', priority: 'must' as const, note: '依勞基法§19' },
  { id: 'c5', text: '確認特休結算方式與金額', checked: false, category: '法律權益', priority: 'must' as const },
  { id: 'c6', text: '確認薪資結算日期與金額', checked: false, category: '法律權益', priority: 'must' as const },
  { id: 'c7', text: '確認勞健保轉出單', checked: false, category: '法律權益', priority: 'must' as const },
  { id: 'c8', text: '檢查勞邀6%最後提繳紀錄', checked: false, category: '法律權益', priority: 'must' as const, note: '到勞保局e化服務查詢' },
  { id: 'c9', text: '下載薪資單/扣繳憑單（近兩年）', checked: false, category: '法律權益', priority: 'must' as const, note: '房貸申請與報稅憑證' },
  { id: 'c10', text: '確認競業禁止條款是否有效', checked: false, category: '法律權益', priority: 'should' as const, note: '無月補償金者多為無效' },
  { id: 'c11', text: '使用謀職假', checked: false, category: '法律權益', priority: 'should' as const },
  { id: 'c12', text: '列出目前負責的工作清單', checked: false, category: '工作交接', priority: 'must' as const },
  { id: 'c13', text: '整理專案文件資料', checked: false, category: '工作交接', priority: 'must' as const },
  { id: 'c14', text: '寫好交接文件', checked: false, category: '工作交接', priority: 'must' as const },
  { id: 'c15', text: '與接手同事開交接會議', checked: false, category: '工作交接', priority: 'must' as const },
  { id: 'c16', text: '確認帳號密碼已交接', checked: false, category: '工作交接', priority: 'must' as const },
  { id: 'c17', text: '交接檔案結構化命名', checked: false, category: '工作交接', priority: 'should' as const, note: 'YYYYMMDD_專案名_交接版' },
  { id: 'c18', text: '備份個人方法論/SOP/模板', checked: false, category: '數位安全', priority: 'must' as const, note: '保留技能而非公司資料' },
  { id: 'c19', text: '外部帳號換綁個人信箱', checked: false, category: '數位安全', priority: 'must' as const, note: 'Notion,Figma,Canva等' },
  { id: 'c20', text: '公司信箱關鍵字清除', checked: false, category: '數位安全', priority: 'must' as const, note: '面試、薪資、體檢、私人' },
  { id: 'c21', text: '清空垃圾桶Hard Delete', checked: false, category: '數位安全', priority: 'must' as const },
  { id: 'c22', text: '登出瀏覽器/清除密碼Cookies', checked: false, category: '數位安全', priority: 'must' as const },
  { id: 'c23', text: '作品集去識別化處理', checked: false, category: '數位安全', priority: 'should' as const, note: '數據轉百分比' },
  { id: 'c24', text: '歸還員工證/門禁卡', checked: false, category: '物品歸還', priority: 'must' as const },
  { id: 'c25', text: '歸還公司電腦設備', checked: false, category: '物品歸還', priority: 'must' as const },
  { id: 'c26', text: '清空個人物品', checked: false, category: '物品歸還', priority: 'must' as const },
  { id: 'c27', text: '與主管離職面談', checked: false, category: '人際關係', priority: 'must' as const },
  { id: 'c28', text: '向同事道別', checked: false, category: '人際關係', priority: 'should' as const },
  { id: 'c29', text: '寄Farewell Email', checked: false, category: '人際關係', priority: 'should' as const },
  { id: 'c30', text: '請求LinkedIn推薦', checked: false, category: '人際關係', priority: 'optional' as const },
];

export const CHECKLIST_CATEGORIES = ['法律權益', '工作交接', '數位安全', '物品歸還', '人際關係'] as const;

export const EXTERNAL_SERVICES = ['Notion', 'Figma', 'Canva', 'Slack', 'Trello', 'GitHub'];

export const DEPENDENT_OPTIONS = [
  { value: 0, label: '0人' },
  { value: 1, label: '1人（+10%）' },
  { value: 2, label: '2人（+20%）' },
  { value: 3, label: '3人（+20%）' },
];

export const INSURANCE_YEARS_OPTIONS = [
  { value: 0, label: '未滿1年' },
  { value: 1, label: '1年以上' },
];

export const TOTAL_PAGES = 10;
export const STORAGE_KEY = 'resignV3';

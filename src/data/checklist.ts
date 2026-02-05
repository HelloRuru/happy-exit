/**
 * 離職清單預設資料
 */

import type { ChecklistItem } from '../types';

export const defaultChecklist: ChecklistItem[] = [
  // 法律權益
  { id: 'c1', text: '送出書面離職信', checked: false, category: '法律權益', priority: 'must' },
  { id: 'c2', text: '確認離職日期已核准', checked: false, category: '法律權益', priority: 'must' },
  { id: 'c3', text: '索取離職證明書（確認代碼）', checked: false, category: '法律權益', priority: 'must', note: '非自願離職需確認代碼符合失業給付' },
  { id: 'c4', text: '索取服務證明書', checked: false, category: '法律權益', priority: 'must', note: '依勞基法§19' },
  { id: 'c5', text: '確認特休結算方式與金額', checked: false, category: '法律權益', priority: 'must' },
  { id: 'c6', text: '確認薪資結算日期與金額', checked: false, category: '法律權益', priority: 'must' },
  { id: 'c7', text: '確認勞健保轉出單', checked: false, category: '法律權益', priority: 'must' },
  { id: 'c8', text: '檢查勞退6%最後提繳紀錄', checked: false, category: '法律權益', priority: 'must', note: '到勞保局e化服務查詢' },
  { id: 'c9', text: '下載薪資單/扣繳憑單（近兩年）', checked: false, category: '法律權益', priority: 'must', note: '房貸申請與報稅憑證' },
  { id: 'c10', text: '確認競業禁止條款是否有效', checked: false, category: '法律權益', priority: 'should', note: '無月補償金者多為無效' },
  { id: 'c11', text: '使用謀職假', checked: false, category: '法律權益', priority: 'should' },

  // 工作交接
  { id: 'c12', text: '列出目前負責的工作清單', checked: false, category: '工作交接', priority: 'must' },
  { id: 'c13', text: '整理專案文件資料', checked: false, category: '工作交接', priority: 'must' },
  { id: 'c14', text: '寫好交接文件', checked: false, category: '工作交接', priority: 'must' },
  { id: 'c15', text: '與接手同事開交接會議', checked: false, category: '工作交接', priority: 'must' },
  { id: 'c16', text: '確認帳號密碼已交接', checked: false, category: '工作交接', priority: 'must' },
  { id: 'c17', text: '交接檔案結構化命名', checked: false, category: '工作交接', priority: 'should', note: 'YYYYMMDD_專案名_交接版' },

  // 數位安全
  { id: 'c18', text: '備份個人方法論/SOP/模板', checked: false, category: '數位安全', priority: 'must', note: '保留技能而非公司資料' },
  { id: 'c19', text: '外部帳號換綁個人信箱', checked: false, category: '數位安全', priority: 'must', note: 'Notion,Figma,Canva等' },
  { id: 'c20', text: '公司信箱關鍵字清除', checked: false, category: '數位安全', priority: 'must', note: '面試、薪資、體檢、私人' },
  { id: 'c21', text: '清空垃圾桶Hard Delete', checked: false, category: '數位安全', priority: 'must' },
  { id: 'c22', text: '登出瀏覽器/清除密碼Cookies', checked: false, category: '數位安全', priority: 'must' },
  { id: 'c23', text: '作品集去識別化處理', checked: false, category: '數位安全', priority: 'should', note: '數據轉百分比' },

  // 物品歸還
  { id: 'c24', text: '歸還員工證/門禁卡', checked: false, category: '物品歸還', priority: 'must' },
  { id: 'c25', text: '歸還公司電腦設備', checked: false, category: '物品歸還', priority: 'must' },
  { id: 'c26', text: '清空個人物品', checked: false, category: '物品歸還', priority: 'must' },

  // 人際關係
  { id: 'c27', text: '與主管離職面談', checked: false, category: '人際關係', priority: 'must' },
  { id: 'c28', text: '向同事道別', checked: false, category: '人際關係', priority: 'should' },
  { id: 'c29', text: '寄Farewell Email', checked: false, category: '人際關係', priority: 'should' },
  { id: 'c30', text: '請求LinkedIn推薦', checked: false, category: '人際關係', priority: 'optional' },
];

export const checklistCategories = ['法律權益', '工作交接', '數位安全', '物品歸還', '人際關係'];

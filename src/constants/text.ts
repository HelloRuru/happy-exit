/**
 * UI Text Constants
 * =================
 * 頁面文字、提示訊息、標籤等
 */

// 鼓勵訊息（Enc 元件使用）
export const ENCOURAGEMENT = {
  JOIN_DATE: '改變需要勇氣，你已經踏出第一步。',
  LEAVE_DATE: '給自己充足的時間說再見。',
  SALARY_INFO: '薪資資訊（選填）有助計算特休折算與失業補助',
  RESULT: '計算結果',
  MENU: '選擇需要的功能',
  LETTER_INFO: '填寫資訊生成離職信',
  LETTER_RESULT: '離職文件準備好了！',
  JOB_SEARCH: '謀職假是你的法定權利！',
  CHECKLIST: '確保不遺漏！',
  RIGHTS: '確認你的權益！',
  DIGITAL_SECURITY: '數位安全與體面轉身',
} as const;

// 歡迎頁內容
export const WELCOME_CONTENT = {
  TITLE: '離職全能導航幫手',
  SUBTITLE: '新的開始，從溫暖的告別開始',
  DESCRIPTION: '每一段旅程都有終點。\n讓我們一起好好規劃這個轉變。',
  START_BUTTON: '開始規劃',
  FEATURES: [
    '計算預告期、特休、資遣費',
    '確認法律權益',
    '離職信與Email範本',
    '完整交接清單（可輸出）',
    '數位安全指南',
  ],
} as const;

// 功能選單項目
export const MENU_ITEMS = {
  LETTER_GENERATOR: {
    title: '離職信產生器',
    desc: '正式/親切/簡潔三種風格',
  },
  EMAIL_TEMPLATES: {
    title: 'Email範本',
    desc: '約主管、通知人資、同事道別、廠商通知',
  },
  JOB_SEARCH_LEAVE: {
    title: '謀職假申請',
    descTemplate: '預告期間每週2日有薪（{days}天）',
    badge: '別忘了用',
  },
  CHECKLIST: {
    title: '交接清單',
    desc: '30項確認事項，可輸出CSV/Word',
  },
  RIGHTS: {
    title: '權益確認',
    desc: '特休、資遣費、失業給付、文件',
    badge: '重要',
  },
  DIGITAL_SECURITY: {
    title: '數位安全',
    desc: '帳號換綁、作品集脫敏、足跡清除',
  },
} as const;

// 法律提示文字
export const LEGAL_TEXT = {
  CALCULATION_NOTE: '計算依《勞基法》與《就業保險法》，實際金額以公司與勞保局為準。',
  DISPUTE_NOTE: '如有勞資爭議，可撥 1955 諮詢或向勞工局申請調解',
  CONFIDENTIAL_WARNING: '帶走公司機密可能違反勞動契約及法規',
} as const;

// 表單標籤
export const FORM_LABELS = {
  JOIN_DATE: '到職日期',
  LEAVE_DATE: '預計最後上班日',
  MONTHLY_SALARY: '月薪（選填）',
  INSURED_SALARY: '勞保投保薪資（選填）',
  USED_ANNUAL_LEAVE: '今年已用特休天數',
  INVOLUNTARY: '非自願離職',
  INSURANCE_YEARS: '就業保險年資',
  DEPENDENTS: '扶養親屬人數（無謀生能力）',
  OVER_45: '45歲以上（可領9個月）',
  DISABILITY: '身心障礙者（可領9個月）',
  COMPANY: '公司名稱',
  DEPARTMENT: '部門',
  POSITION: '職稱',
  SUPERVISOR: '主管姓名（選填）',
  EMPLOYEE: '您的姓名',
  REASON: '離職原因（可複選）',
  TONE: '語氣風格',
  HAS_HANDOVER: '已有交接人選',
  GRATITUDE: '感謝的話（選填）',
} as const;

// 表單提示文字
export const FORM_HINTS = {
  MONTHLY_SALARY: '用於計算特休折算、資遣費',
  INSURED_SALARY: '未填則以月薪估算失業給付',
  INVOLUNTARY_DESC: '公司資遣、裁員、歇業等（可領資遣費+失業給付）',
} as const;

// 表單 Placeholder
export const FORM_PLACEHOLDERS = {
  MONTHLY_SALARY: '例如 45000',
  INSURED_SALARY: '通常≤月薪，例如 45800',
  COMPANY: '股份有限公司',
  DEPARTMENT: '產品部',
  POSITION: '資深專員',
  SUPERVISOR: '王經理',
  EMPLOYEE: '王小明',
  GRATITUDE: '感謝公司這段時間的栽培...',
} as const;

// 按鈕文字
export const BUTTON_TEXT = {
  BACK: '返回',
  NEXT: '下一步',
  CALCULATE: '計算結果',
  MENU: '功能選單',
  COMPLETE: '完成',
  GENERATE: '生成',
  MODIFY: '修改',
  COPY: '複製',
  COPIED: '已複製',
  EXPORT_CSV: '匯出 CSV',
  EXPORT_HTML: '匯出清單',
  HOME: '回首頁',
} as const;

// 離職日期頁面
export const LEAVE_DATE_OPTIONS = {
  KNOWN: {
    label: '是，已決定最後上班日',
    hint: '會計算最晚提離職日期',
  },
  UNKNOWN: {
    label: '還沒，想先了解預告期',
    hint: '會計算最快能離職的日期',
  },
} as const;

// 權益頁面標題
export const RIGHTS_SECTIONS = {
  ANNUAL_LEAVE: '特休結算',
  COMPANY_PAYMENT: '公司應給付',
  GOVERNMENT_BENEFIT: '政府失業補助',
  CERTIFICATE: '離職證明書',
  SERVICE_PROOF: '服務證明書',
  INSURANCE: '勞健保',
  NON_COMPETE: '競業禁止',
  PENSION: '勞退6%',
} as const;

// 數位安全頁面標題
export const DIGITAL_SECURITY_SECTIONS = {
  EMAIL_CLEANUP: '必做：公司信箱清理',
  ACCOUNT_MIGRATION: '外部帳號換綁',
  BROWSER_CLEANUP: '瀏覽器清理',
  BACKUP: '方法論備份',
  PORTFOLIO: '作品集去識別化',
  FILE_NAMING: '交接檔案命名',
} as const;

// Email 搜尋關鍵字
export const EMAIL_SEARCH_KEYWORDS = ['面試', '薪資', '體檢', '私人', 'offer'] as const;

// 交接檔案命名範例
export const FILE_NAMING_EXAMPLE = 'YYYYMMDD_專案名稱_交接版_v1.0';

// 完成頁面
export const COMPLETE_CONTENT = {
  TITLE: '祝你前程似錦！',
  SUBTITLE: '下一站，會更好。',
  REMINDERS: [
    '離職最後一天再次確認所有文件',
    '保持專業，好聚好散',
    '給自己一些休息時間',
  ],
  FEEDBACK_QUESTION: '覺得這個工具有幫助嗎？',
} as const;

// 謀職假說明
export const JOB_SEARCH_LEAVE_INFO = {
  TITLE: '謀職假說明',
  DESCRIPTION: '預告期間內，勞工得於每週請假2日外出謀職，薪資照給。',
  LAW_REFERENCE: '依勞基法第16條第2項',
  NOTES: [
    '需於預告期間內使用',
    '每週最多2日',
    '薪資照給',
    '需提前告知雇主',
  ],
} as const;

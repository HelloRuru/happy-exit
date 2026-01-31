import { useState, useEffect, ReactNode } from 'react';

// ============================================================
// Design System v1.4 Constants
// 主色: #D4A5A5 (Rose) | 次色: #B8A9C9 (Lavender) | 圓角: 24px
// ============================================================
const PRIMARY = '#D4A5A5';
const SECONDARY = '#B8A9C9';

// ============================================================
// SVG Icons (Design System v1.4: 線條風格，禁止 Emoji)
// ============================================================
const ChevronRight = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="2">
    <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ChevronLeft = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="2">
    <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const InfoIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01" strokeLinecap="round"/>
  </svg>
);

const LockIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="2">
    <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
  </svg>
);

const CopyIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="2">
    <rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
  </svg>
);

const CheckIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="2">
    <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const HomeIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="2">
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/>
  </svg>
);

const DownloadIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="2">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7,10 12,15 17,10"/><line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);

const AlertIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="2">
    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
    <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
);

const ShieldIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="2">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);

const FileIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="2">
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/>
  </svg>
);

const SproutIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="2">
    <path d="M12 22V8" strokeLinecap="round"/>
    <path d="M5 8c0-3.5 2.5-6 7-6 4.5 0 7 2.5 7 6" strokeLinecap="round"/>
    <path d="M12 8c-3 0-5.5-1.5-6.5-4" strokeLinecap="round"/>
    <path d="M12 8c3 0 5.5-1.5 6.5-4" strokeLinecap="round"/>
  </svg>
);

const CalendarIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);

const ChartIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
  </svg>
);

const ClipboardIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="2">
    <path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2"/>
    <rect x="8" y="2" width="8" height="4" rx="1"/>
  </svg>
);

const CoinIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/><path d="M12 6v12M8 10h8M8 14h8" strokeLinecap="round"/>
  </svg>
);

const PenIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="2">
    <path d="M12 19l7-7 3 3-7 7H12v-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/>
    <path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/>
  </svg>
);

const SunIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
);

const SearchIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);

const UmbrellaIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="2">
    <path d="M23 12a11.05 11.05 0 0 0-22 0zm-5 7a3 3 0 0 1-6 0v-7"/>
  </svg>
);

const HeartIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="2">
    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
  </svg>
);

const MailIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="2">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

const BriefcaseIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="2">
    <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/>
  </svg>
);

const BuildingIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="2">
    <rect x="4" y="2" width="16" height="20" rx="2"/>
    <line x1="9" y1="6" x2="9" y2="6.01"/><line x1="15" y1="6" x2="15" y2="6.01"/>
    <line x1="9" y1="10" x2="9" y2="10.01"/><line x1="15" y1="10" x2="15" y2="10.01"/>
    <line x1="9" y1="14" x2="9" y2="14.01"/><line x1="15" y1="14" x2="15" y2="14.01"/>
    <path d="M9 18h6v4H9z"/>
  </svg>
);

const WalletIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="2">
    <rect x="2" y="5" width="20" height="14" rx="2"/><path d="M18 9h2v6h-2"/><circle cx="17" cy="12" r="1"/>
  </svg>
);

const StarIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="2">
    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
  </svg>
);

const LinkIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="2">
    <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/>
    <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/>
  </svg>
);

const KeyIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="2">
    <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/>
  </svg>
);

const TrashIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="2">
    <polyline points="3,6 5,6 21,6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
  </svg>
);

const FolderIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="2">
    <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/>
  </svg>
);

const BrushIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="2">
    <path d="M9.06 11.9l8.07-8.06a2.85 2.85 0 114.03 4.03l-8.06 8.08"/>
    <path d="M7.07 14.94c-1.66 0-3 1.35-3 3.02 0 1.33-2.5 1.52-2 2.02 1.08 1.1 2.49 2.02 4 2.02 2.2 0 4-1.8 4-4.04a3.01 3.01 0 00-3-3.02z"/>
  </svg>
);

const PartyIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="2">
    <path d="M2 22l1-7 4 4-4 3z"/>
    <path d="M5.45 14.55C7.17 12.83 9.83 12 12 12c3.87 0 7-2.69 7-6 0-.81-.16-1.59-.45-2.3"/>
    <circle cx="8" cy="4" r="1"/><circle cx="19" cy="8" r="1"/><circle cx="12" cy="2" r="1"/>
  </svg>
);

const ThumbsUpIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="2">
    <path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3zM7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3"/>
  </svg>
);

// ============================================================
// Reusable UI Components
// ============================================================
const Privacy = () => (
  <div className="flex items-center justify-center gap-2 text-xs text-gray-500 py-2">
    <LockIcon className="w-3 h-3"/><span>資料僅存在你的瀏覽器</span>
  </div>
);

const Legal = ({ children }: { children: ReactNode }) => (
  <div className="bg-amber-50 border-l-4 border-amber-400 p-3 rounded-r-3xl overflow-hidden">
    <div className="flex items-start gap-2">
      <InfoIcon className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5"/>
      <div className="text-xs text-amber-800 min-w-0">{children}</div>
    </div>
  </div>
);

const Warn = ({ children }: { children: ReactNode }) => (
  <div className="bg-red-50 border-l-4 border-red-400 p-3 rounded-r-3xl overflow-hidden">
    <div className="flex items-start gap-2">
      <AlertIcon className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5"/>
      <div className="text-xs text-red-800 min-w-0">{children}</div>
    </div>
  </div>
);

const Footer = () => (
  <div className="mt-4 p-3 bg-white/80 rounded-3xl border border-gray-100 text-center overflow-hidden">
    <p className="text-xs text-gray-600 flex items-center justify-center gap-1">
      <AlertIcon className="w-3 h-3 text-amber-500"/>
      依《勞基法》計算，僅供參考。諮詢請洽 <a href="tel:1955" className={`text-[${PRIMARY}] font-bold`}>1955</a>
    </p>
    <Privacy/>
    <p className="text-xs text-gray-400 mt-2">
      © 2026 Kaoru Tsai. All Rights Reserved. | <a href="mailto:hello@helloruru.com" className={`hover:text-[${PRIMARY}]`}>hello@helloruru.com</a>
    </p>
  </div>
);

const Page = ({ children }: { children: ReactNode }) => (
  <div className={`min-h-screen w-full bg-gradient-to-br from-[#FFF9F0] to-[${PRIMARY}]/10 p-3 sm:p-4 md:p-6 overflow-x-hidden`}>
    <div className="w-full max-w-2xl mx-auto space-y-4">{children}</div>
  </div>
);

const Btn = ({ onClick, disabled, variant = 'primary', children }: { onClick: () => void; disabled?: boolean; variant?: string; children: ReactNode }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`flex-1 py-3 px-4 rounded-3xl font-medium text-sm transition-all flex items-center justify-center gap-1 min-w-0 min-h-[44px] ${
      variant === 'primary'
        ? `bg-[${PRIMARY}] text-white hover:bg-[${PRIMARY}]/90 disabled:bg-gray-300 disabled:cursor-not-allowed`
        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
    }`}
  >
    {children}
  </button>
);

const Progress = ({ n, t }: { n: number; t: number }) => (
  <div className="flex items-center gap-2 mb-2">
    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
      <div className={`h-full bg-[${PRIMARY}] transition-all`} style={{ width: `${(n / t) * 100}%` }}/>
    </div>
    <span className="text-xs text-gray-500 flex-shrink-0">{n}/{t}</span>
  </div>
);

const Enc = ({ icon, text }: { icon?: ReactNode; text: string }) => (
  <div className={`bg-gradient-to-r from-[${PRIMARY}]/20 to-[${SECONDARY}]/20 rounded-3xl p-3 overflow-hidden`}>
    <p className={`text-[${PRIMARY}] flex items-center gap-2 text-sm`}>{icon}<span>{text}</span></p>
  </div>
);

const Menu = ({ icon, title, desc, onClick, badge }: { icon: ReactNode; title: string; desc: string; onClick: () => void; badge?: string }) => (
  <button
    onClick={onClick}
    className="w-full bg-white rounded-3xl p-4 shadow-sm hover:shadow-md transition-all text-left flex items-start gap-3 border border-gray-100 overflow-hidden min-h-[44px]"
  >
    <div className={`w-10 h-10 rounded-full bg-[${PRIMARY}]/10 flex items-center justify-center text-[${PRIMARY}] flex-shrink-0`}>{icon}</div>
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-2 flex-wrap">
        <h3 className="font-bold text-gray-800">{title}</h3>
        {badge && <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full flex-shrink-0">{badge}</span>}
      </div>
      <p className="text-xs text-gray-500 mt-1 break-words">{desc}</p>
    </div>
    <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0"/>
  </button>
);

const CopyBtn = ({ text, id, copiedId, onCopy }: { text: string; id: string; copiedId: string | null; onCopy: (t: string, id: string) => void }) => (
  <button
    onClick={() => onCopy(text, id)}
    className={`flex items-center gap-1 px-3 py-1.5 bg-[${PRIMARY}] text-white rounded-lg text-xs hover:bg-[${PRIMARY}]/90 flex-shrink-0 whitespace-nowrap min-h-[44px]`}
  >
    {copiedId === id ? <CheckIcon className="w-3 h-3"/> : <CopyIcon className="w-3 h-3"/>}
    {copiedId === id ? '已複製' : '複製'}
  </button>
);

const Card = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <div className={`bg-white rounded-3xl p-4 shadow-lg overflow-hidden ${className}`}>{children}</div>
);

const Row = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <div className={`flex justify-between items-center gap-2 ${className}`}>{children}</div>
);


// ============================================================
// Types & Interfaces
// ============================================================
interface ChecklistItem {
  id: string;
  text: string;
  checked: boolean;
  category: string;
  priority: 'must' | 'should' | 'optional';
  note?: string;
}

// ============================================================
// Main App Component
// ============================================================
function App() {
  const [stage, setStage] = useState('welcome');
  const [dateMode, setDateMode] = useState<'known' | 'unknown'>('known');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  
  const [form, setForm] = useState({
    joinDate: '',
    leaveDate: '',
    company: '',
    department: '',
    position: '',
    supervisorName: '',
    employeeName: '',
    reasons: [] as string[],
    reasonOther: '',
    tone: 'friendly' as const,
    hasHandover: true,
    gratitude: '',
    monthlySalary: 0,
    insuredSalary: 0,
    usedAnnualLeave: 0,
    isInvoluntary: false,
    dependents: 0,
    isOver45: false,
    hasDisability: false,
    insuranceYears: 1,
  });

  const [calc, setCalc] = useState({
    tenure: { years: 0, months: 0, days: 0 },
    noticeRequired: 0,
    deadlineToResign: '',
    earliestLeaveDate: '',
    annualLeave: 0,
    jobSearchLeave: 0,
    remainingLeave: 0,
    leaveCompensation: 0,
    severancePay: 0,
    noticeWage: 0,
    unemploymentBenefit: 0,
    unemploymentMonths: 0,
    trainingAllowance: 0,
    totalGovernmentBenefit: 0,
  });

  const defaultChecklist: ChecklistItem[] = [
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
    { id: 'c12', text: '列出目前負責的工作清單', checked: false, category: '工作交接', priority: 'must' },
    { id: 'c13', text: '整理專案文件資料', checked: false, category: '工作交接', priority: 'must' },
    { id: 'c14', text: '寫好交接文件', checked: false, category: '工作交接', priority: 'must' },
    { id: 'c15', text: '與接手同事開交接會議', checked: false, category: '工作交接', priority: 'must' },
    { id: 'c16', text: '確認帳號密碼已交接', checked: false, category: '工作交接', priority: 'must' },
    { id: 'c17', text: '交接檔案結構化命名', checked: false, category: '工作交接', priority: 'should', note: 'YYYYMMDD_專案名_交接版' },
    { id: 'c18', text: '備份個人方法論/SOP/模板', checked: false, category: '數位安全', priority: 'must', note: '保留技能而非公司資料' },
    { id: 'c19', text: '外部帳號換綁個人信箱', checked: false, category: '數位安全', priority: 'must', note: 'Notion,Figma,Canva等' },
    { id: 'c20', text: '公司信箱關鍵字清除', checked: false, category: '數位安全', priority: 'must', note: '面試、薪資、體檢、私人' },
    { id: 'c21', text: '清空垃圾桶Hard Delete', checked: false, category: '數位安全', priority: 'must' },
    { id: 'c22', text: '登出瀏覽器/清除密碼Cookies', checked: false, category: '數位安全', priority: 'must' },
    { id: 'c23', text: '作品集去識別化處理', checked: false, category: '數位安全', priority: 'should', note: '數據轉百分比' },
    { id: 'c24', text: '歸還員工證/門禁卡', checked: false, category: '物品歸還', priority: 'must' },
    { id: 'c25', text: '歸還公司電腦設備', checked: false, category: '物品歸還', priority: 'must' },
    { id: 'c26', text: '清空個人物品', checked: false, category: '物品歸還', priority: 'must' },
    { id: 'c27', text: '與主管離職面談', checked: false, category: '人際關係', priority: 'must' },
    { id: 'c28', text: '向同事道別', checked: false, category: '人際關係', priority: 'should' },
    { id: 'c29', text: '寄Farewell Email', checked: false, category: '人際關係', priority: 'should' },
    { id: 'c30', text: '請求LinkedIn推薦', checked: false, category: '人際關係', priority: 'optional' },
  ];

  const [checklist, setChecklist] = useState<ChecklistItem[]>(defaultChecklist);

  // LocalStorage Persistence
  useEffect(() => {
    const saved = localStorage.getItem('resignV3');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (data.stage) setStage(data.stage);
        if (data.dateMode) setDateMode(data.dateMode);
        if (data.form) setForm(prev => ({ ...prev, ...data.form }));
        if (data.calc) setCalc(prev => ({ ...prev, ...data.calc }));
        if (data.checklist) setChecklist(data.checklist);
      } catch { /* ignore */ }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('resignV3', JSON.stringify({ stage, dateMode, form, calc, checklist }));
  }, [stage, dateMode, form, calc, checklist]);

  // Calculation Functions
  const calcTenure = (joinDate: string, endDate: string) => {
    if (!joinDate || !endDate) return { years: 0, months: 0, days: 0 };
    const jd = new Date(joinDate);
    const ed = new Date(endDate);
    let years = ed.getFullYear() - jd.getFullYear();
    let months = ed.getMonth() - jd.getMonth();
    let days = ed.getDate() - jd.getDate();
    if (days < 0) { months--; days += new Date(ed.getFullYear(), ed.getMonth(), 0).getDate(); }
    if (months < 0) { years--; months += 12; }
    return { years: Math.max(0, years), months: Math.max(0, months), days: Math.max(0, days) };
  };

  const getNotice = (joinDate: string, endDate: string) => {
    const tenure = calcTenure(joinDate, endDate);
    const totalMonths = tenure.years * 12 + tenure.months;
    if (totalMonths < 3) return 0;
    if (totalMonths < 12) return 10;
    if (totalMonths < 36) return 20;
    return 30;
  };

  const calcAnnual = (tenure: { years: number; months: number }) => {
    const totalMonths = tenure.years * 12 + tenure.months;
    if (totalMonths < 6) return 0;
    if (totalMonths < 12) return 3;
    if (totalMonths < 24) return 7;
    if (totalMonths < 36) return 10;
    if (totalMonths < 60) return 14;
    if (totalMonths < 120) return 15;
    return Math.min(30, 15 + Math.floor((totalMonths - 120) / 12));
  };

  const calcJobSearch = (noticeDays: number) => noticeDays === 0 ? 0 : Math.ceil(noticeDays / 7) * 2;
  const calcSeverance = (tenure: { years: number; months: number }, salary: number) => Math.min(((tenure.years * 12 + tenure.months) / 12) * 0.5 * salary, salary * 6);

  const doCalc = (joinDate: string, leaveDate: string, isKnownDate: boolean) => {
    if (!joinDate) return;
    const refDate = leaveDate || new Date().toISOString().split('T')[0];
    const tenure = calcTenure(joinDate, refDate);
    const notice = getNotice(joinDate, refDate);
    const annual = calcAnnual(tenure);
    const jobSearch = calcJobSearch(notice);
    const remaining = Math.max(0, annual - form.usedAnnualLeave);
    const daily = form.monthlySalary / 30;
    const leaveComp = remaining * daily;
    const severance = form.isInvoluntary ? calcSeverance(tenure, form.monthlySalary) : 0;
    const noticeWage = form.isInvoluntary ? notice * daily : 0;
    const insured = form.insuredSalary || form.monthlySalary;
    const baseRate = 0.6;
    const dependentRate = Math.min(form.dependents * 0.1, 0.2);
    const monthlyUnemployment = form.isInvoluntary && form.insuranceYears >= 1 ? Math.round(insured * (baseRate + dependentRate)) : 0;
    const unemploymentMonths = form.isOver45 || form.hasDisability ? 9 : 6;

    const baseCalc = {
      tenure, noticeRequired: notice, annualLeave: annual, jobSearchLeave: jobSearch, remainingLeave: remaining,
      leaveCompensation: leaveComp, severancePay: severance, noticeWage,
      unemploymentBenefit: monthlyUnemployment, unemploymentMonths, trainingAllowance: monthlyUnemployment,
      totalGovernmentBenefit: monthlyUnemployment * unemploymentMonths,
    };

    if (isKnownDate && leaveDate) {
      const d = new Date(leaveDate);
      d.setDate(d.getDate() - notice);
      setCalc({ ...baseCalc, deadlineToResign: d.toISOString().split('T')[0], earliestLeaveDate: '' });
    } else {
      const d = new Date(refDate);
      d.setDate(d.getDate() + notice);
      setCalc({ ...baseCalc, deadlineToResign: '', earliestLeaveDate: d.toISOString().split('T')[0] });
    }
  };


  // --- Helper Functions ---
  const copy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const reset = () => {
    if (confirm('確定重新開始？')) {
      localStorage.removeItem('resignV3');
      location.reload();
    }
  };

  const getLeaveDate = () => dateMode === 'known' ? form.leaveDate : (calc.earliestLeaveDate || new Date().toISOString().split('T')[0]);
  const updateForm = <K extends keyof typeof form>(key: K, value: typeof form[K]) => setForm(prev => ({ ...prev, [key]: value }));

  // --- Export Functions ---
  const exportCSV = (items: ChecklistItem[]) => {
    const rows = [['項目', '分類', '優先度', '備註', '狀態'], ...items.map(i => [i.text, i.category, i.priority === 'must' ? '必做' : i.priority === 'should' ? '建議' : '可選', i.note || '', i.checked ? '✓' : ''])];
    const blob = new Blob(['\uFEFF' + rows.map(r => r.map(c => `"${c}"`).join(',')).join('\n')], { type: 'text/csv;charset=utf-8;' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = '離職清單.csv'; a.click();
  };

  const exportHTML = (items: ChecklistItem[]) => {
    const cats = [...new Set(items.map(i => i.category))];
    const html = `<!DOCTYPE html><html lang="zh-TW"><head><meta charset="UTF-8"><title>離職清單</title></head><body><h1>離職交接清單</h1><p>產生日期：${new Date().toLocaleDateString('zh-TW')}</p>${cats.map(c => `<h2>${c}</h2>${items.filter(i => i.category === c).map(i => `<div>${i.text}${i.note ? ` (${i.note})` : ''}</div>`).join('')}`).join('')}</body></html>`;
    const blob = new Blob([html], { type: 'text/html;charset=utf-8;' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = '離職清單.html'; a.click();
  };

  // --- Letter Generation ---
  const reasonMap: Record<string, string> = { career: '職涯發展', family: '家庭因素', health: '健康因素', study: '進修學習', relocation: '搬遷通勤', other: '個人因素' };
  const getReasonText = () => form.reasons.length === 0 ? '個人生涯規劃' : form.reasons.map(r => r === 'other' ? (form.reasonOther || '個人因素') : reasonMap[r]).join('、');
  const ld = () => { const d = getLeaveDate(); return d ? new Date(d).toLocaleDateString('zh-TW') : '（待定）'; };

  const genLetter = () => {
    if (form.tone === 'formal') return `${form.supervisorName || '主管'}鈞鑒：\n\n本人${form.employeeName || ''}因${getReasonText()}，擬於 ${ld()} 離職。\n\n${form.gratitude || '在職期間承蒙指導，謹致謝忱。'}${form.hasHandover ? '\n\n離職前將完成工作交接，確保業務順利銜接。' : ''}\n\n敬請核准。\n\n此致\n${form.company || '公司'}${form.department ? ' ' + form.department : ''}\n\n${form.employeeName || '員工'}\n${new Date().toLocaleDateString('zh-TW')}`;
    if (form.tone === 'simple') return `${form.supervisorName || '主管'}您好，\n\n因${getReasonText()}，我預計 ${ld()} 離職。${form.hasHandover ? '會完成交接。' : ''}\n\n${form.gratitude || '謝謝這段時間的照顧。'}\n\n${form.employeeName || ''}`;
    return `${form.supervisorName || '主管'}您好：\n\n經過慎重考慮，因${getReasonText()}，我決定離開目前的職位。\n\n預計最後工作日為 ${ld()}。\n\n${form.gratitude || '感謝您這段時間的指導與照顧，讓我學習成長很多。'}${form.hasHandover ? '\n\n在離職前，我會確實完成手邊工作的交接，讓後續業務能順利進行。' : ''}\n\n再次感謝，祝團隊順利！\n\n${form.employeeName || ''}`;
  };

  const genSupervisor = () => `${form.supervisorName || '主管'}您好：\n\n有件事想當面向您報告，想跟您約個時間談談。\n\n請問這週什麼時候方便？\n\n${form.employeeName || ''}`;
  const genHR = () => `人資同仁您好：\n\n我是${form.department ? form.department + '的' : ''}${form.employeeName || '員工'}，已向主管提出離職申請。\n\n預計最後工作日：${ld()}\n\n煩請協助後續離職手續，謝謝！\n\n${form.employeeName || ''}`;
  const genColleague = () => `各位同事：\n\n在這邊跟大家說聲再見！\n\n${calc.tenure.years > 0 || calc.tenure.months > 0 ? `這${calc.tenure.years > 0 ? calc.tenure.years + '年' : ''}${calc.tenure.months > 0 ? calc.tenure.months + '個月' : ''}` : '這段時間'}，感謝大家的照顧與合作。\n\n我的最後工作日是 ${ld()}。\n\n希望未來還有機會再見！\n\n祝大家工作順利\n\n${form.employeeName || ''}`;
  const genVendor = () => `您好：\n\n我是${form.company || '公司'}${form.department || ''}的${form.employeeName || '窗口'}。\n\n因職務異動，我將於 ${ld()} 離職。\n\n後續業務將由同事接手，届時會再通知新窗口聯繫方式。\n\n感謝您一直以來的配合！\n\n${form.employeeName || ''}`;
  const genJobSearch = () => `主旨：謀職假申請\n\n${form.supervisorName || '主管'}您好：\n\n依《勞基法》第16條第2項，於預告期間申請謀職假。\n\n申請天數：${calc.jobSearchLeave} 天（預告期每週2日）\n預計使用日期：＿＿＿＿\n\n懇請核准，謝謝！\n\n${form.employeeName || ''}`;
  const genLinkedIn = () => `【新的旅程】\n\n經過 ${calc.tenure.years > 0 ? calc.tenure.years + ' 年' : ''}${calc.tenure.months > 0 ? calc.tenure.months + ' 個月' : ''}，我即將離開 ${form.company || '現職'}，展開下一篇章。\n\n感謝所有一起奮鬥的夥伴們！\n\n#職涯 #感謝 #新開始`;
  const genRef = () => `${form.supervisorName || '主管'} 您好：\n\n在我離開前，想請教一件事。\n\n這段時間在您帶領下學到很多，不知是否方便在 LinkedIn 上給我一段推薦？\n\n這對我職涯發展很有幫助。\n\n如果不方便，完全沒關係！\n\n謝謝！\n${form.employeeName || ''}`;


  // ============================================
  // SECTION 5: Page Renders
  // ============================================

  // --- Welcome Page ---
  if (stage === 'welcome') return (
    <Page>
      <div className="text-center space-y-4 py-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#D4A5A5]">離職全能導航幫手</h1>
        <p className="text-lg text-gray-600 flex items-center justify-center gap-2"><StarIcon className="w-5 h-5 text-[#B8A9C9]"/>新的開始，從溫暖的告別開始</p>
        <div className="bg-gradient-to-r from-[#D4A5A5]/20 to-[#B8A9C9]/20 rounded-3xl p-4"><p className="text-[#D4A5A5]">每一段旅程都有終點。<br/>讓我們一起好好規劃這個轉變。</p></div>
        <Card className="text-left">
          <h3 className="font-bold text-gray-800 mb-2">功能：</h3>
          <ul className="space-y-1 text-sm text-gray-600">
            <li className="flex items-center gap-2"><CheckIcon className="w-4 h-4 text-[#D4A5A5] flex-shrink-0"/>計算預告期、特休、資遣費</li>
            <li className="flex items-center gap-2"><CheckIcon className="w-4 h-4 text-[#D4A5A5] flex-shrink-0"/>確認法律權益</li>
            <li className="flex items-center gap-2"><CheckIcon className="w-4 h-4 text-[#D4A5A5] flex-shrink-0"/>離職信與Email範本</li>
            <li className="flex items-center gap-2"><CheckIcon className="w-4 h-4 text-[#D4A5A5] flex-shrink-0"/>完整交接清單（可輸出）</li>
            <li className="flex items-center gap-2"><CheckIcon className="w-4 h-4 text-[#D4A5A5] flex-shrink-0"/>數位安全指南</li>
          </ul>
        </Card>
        <button onClick={() => setStage('join-date')} className="w-full bg-[#D4A5A5] text-white py-3 rounded-full font-medium flex items-center justify-center gap-2 min-h-[44px]"><SunIcon className="w-5 h-5"/>開始規劃</button>
        <Privacy/>
      </div>
    </Page>
  );

  // --- Join Date Page ---
  if (stage === 'join-date') return (
    <Page>
      <Progress n={1} t={10}/>
      <Enc icon={<SproutIcon className="w-5 h-5"/>} text="改變需要勇氣，你已經踏出第一步。"/>
      <Card>
        <label className="block text-lg font-bold text-gray-800 mb-1">到職日期？</label>
        <p className="text-xs text-gray-500 mb-3">大概日期即可</p>
        <input type="date" value={form.joinDate} onChange={e => updateForm('joinDate', e.target.value)} className="w-full max-w-full px-3 py-2.5 border-2 border-[#D4A5A5]/30 rounded-3xl focus:outline-none focus:border-[#D4A5A5] box-border text-base"/>
      </Card>
      <Legal>依《勞基法》§84-2，年資自受僱日起算。</Legal>
      <div className="flex gap-3">
        <Btn onClick={() => setStage('welcome')} variant="secondary"><ChevronLeft className="w-4 h-4"/></Btn>
        <Btn onClick={() => setStage('leave-date')} disabled={!form.joinDate}>下一步 <ChevronRight className="w-4 h-4"/></Btn>
      </div>
      <Footer/>
    </Page>
  );

  // --- Leave Date Page ---
  if (stage === 'leave-date') {
    const ct = calcTenure(form.joinDate, new Date().toISOString().split('T')[0]);
    return (
      <Page>
        <Progress n={2} t={10}/>
        <Enc icon={<CalendarIcon className="w-5 h-5"/>} text="給自己充足的時間說再見。"/>
        <Card className="space-y-4">
          <div>
            <div className="text-sm text-gray-500">到職日期</div>
            <div className="text-xl font-bold text-[#D4A5A5] bg-[#D4A5A5]/10 rounded-3xl p-3 text-center">{new Date(form.joinDate).toLocaleDateString('zh-TW')}</div>
            <div className="text-center mt-1 text-sm text-gray-600">年資約 {ct.years} 年 {ct.months} 個月</div>
          </div>
          <div className="border-t pt-4">
            <h3 className="font-bold text-gray-800 mb-3">決定離職日期了嗎？</h3>
            <div className="space-y-2">
              <label className={`block p-3 border-2 rounded-3xl cursor-pointer overflow-hidden ${dateMode === 'known' ? 'border-[#D4A5A5] bg-[#D4A5A5]/5' : 'border-gray-200'}`}>
                <div className="flex items-start gap-3">
                  <input type="radio" checked={dateMode === 'known'} onChange={() => setDateMode('known')} className="mt-1 flex-shrink-0"/>
                  <div className="flex-1 min-w-0"><div className="font-bold text-sm flex items-center gap-1"><CheckIcon className="w-4 h-4 text-[#D4A5A5]"/>是，已決定最後上班日</div><div className="text-xs text-gray-500">會計算最晚提離職日期</div></div>
                </div>
              </label>
              <label className={`block p-3 border-2 rounded-3xl cursor-pointer overflow-hidden ${dateMode === 'unknown' ? 'border-[#D4A5A5] bg-[#D4A5A5]/5' : 'border-gray-200'}`}>
                <div className="flex items-start gap-3">
                  <input type="radio" checked={dateMode === 'unknown'} onChange={() => setDateMode('unknown')} className="mt-1 flex-shrink-0"/>
                  <div className="flex-1 min-w-0"><div className="font-bold text-sm flex items-center gap-1"><InfoIcon className="w-4 h-4 text-[#B8A9C9]"/>還沒，想先了解預告期</div><div className="text-xs text-gray-500">會計算最快能離職的日期</div></div>
                </div>
              </label>
            </div>
          </div>
          {dateMode === 'known' && <div><label className="block text-sm font-medium text-gray-700 mb-1">預計最後上班日</label><input type="date" value={form.leaveDate} onChange={e => updateForm('leaveDate', e.target.value)} className="w-full max-w-full px-3 py-2.5 border-2 border-[#D4A5A5]/30 rounded-3xl focus:outline-none focus:border-[#D4A5A5] box-border text-base"/></div>}
        </Card>
        <div className="flex gap-3">
          <Btn onClick={() => setStage('join-date')} variant="secondary"><ChevronLeft className="w-4 h-4"/> 返回</Btn>
          <Btn onClick={() => { doCalc(form.joinDate, form.leaveDate, dateMode === 'known'); setStage('salary-info'); }} disabled={dateMode === 'known' && !form.leaveDate}>下一步 <ChevronRight className="w-4 h-4"/></Btn>
        </div>
        <Footer/>
      </Page>
    );
  }


  // --- Salary Info Page ---
  if (stage === 'salary-info') return (
    <Page>
      <Progress n={3} t={10}/>
      <Enc icon={<CoinIcon className="w-5 h-5"/>} text="薪資資訊（選填）有助計算特休折算與失業補助"/>
      <Card className="space-y-4">
        <div><label className="block text-sm font-medium text-gray-700 mb-1">月薪（選填）</label><input type="number" placeholder="例如 45000" value={form.monthlySalary || ''} onChange={e => updateForm('monthlySalary', parseInt(e.target.value) || 0)} className="w-full px-3 py-2.5 border-2 border-[#D4A5A5]/30 rounded-3xl focus:outline-none focus:border-[#D4A5A5] text-base"/><p className="text-xs text-gray-400 mt-1">用於計算特休折算、資遣費</p></div>
        <div><label className="block text-sm font-medium text-gray-700 mb-1">勞保投保薪資（選填）</label><input type="number" placeholder="通常≤月薪，例如 45800" value={form.insuredSalary || ''} onChange={e => updateForm('insuredSalary', parseInt(e.target.value) || 0)} className="w-full px-3 py-2.5 border-2 border-[#D4A5A5]/30 rounded-3xl focus:outline-none focus:border-[#D4A5A5] text-base"/><p className="text-xs text-gray-400 mt-1">未填則以月薪估算失業給付</p></div>
        <div><label className="block text-sm font-medium text-gray-700 mb-1">今年已用特休天數</label><input type="number" placeholder="0" value={form.usedAnnualLeave || ''} onChange={e => updateForm('usedAnnualLeave', parseInt(e.target.value) || 0)} className="w-full px-3 py-2.5 border-2 border-[#D4A5A5]/30 rounded-3xl focus:outline-none focus:border-[#D4A5A5] text-base"/></div>
        <div className="border-t pt-4"><label className="flex items-start gap-2 cursor-pointer"><input type="checkbox" checked={form.isInvoluntary} onChange={e => updateForm('isInvoluntary', e.target.checked)} className="mt-1 flex-shrink-0"/><div className="min-w-0"><span className="font-bold text-sm">非自願離職</span><p className="text-xs text-gray-500 break-words">公司資遣、裁員、歇業等（可領資遣費+失業給付）</p></div></label></div>
        {form.isInvoluntary && (
          <div className="bg-blue-50 rounded-3xl p-3 space-y-3">
            <h4 className="font-bold text-sm text-blue-800 flex items-center gap-1"><ShieldIcon className="w-4 h-4"/>失業給付資格</h4>
            <div><label className="block text-xs text-gray-600 mb-1">就業保險年資</label><select value={form.insuranceYears} onChange={e => updateForm('insuranceYears', parseInt(e.target.value))} className="w-full px-3 py-2 border rounded-3xl text-base"><option value={0}>未滿1年</option><option value={1}>1年以上</option></select></div>
            <div><label className="block text-xs text-gray-600 mb-1">扶養親屬人數（無謀生能力）</label><select value={form.dependents} onChange={e => updateForm('dependents', parseInt(e.target.value))} className="w-full px-3 py-2 border rounded-3xl text-base">{[0, 1, 2, 3].map(n => <option key={n} value={n}>{n}人{n > 0 ? `（+${Math.min(n * 10, 20)}%）` : ''}</option>)}</select></div>
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.isOver45} onChange={e => updateForm('isOver45', e.target.checked)} className="flex-shrink-0"/>45歲以上（可領9個月）</label>
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.hasDisability} onChange={e => updateForm('hasDisability', e.target.checked)} className="flex-shrink-0"/>身心障礙者（可領9個月）</label>
          </div>
        )}
      </Card>
      <div className="flex gap-3">
        <Btn onClick={() => setStage('leave-date')} variant="secondary"><ChevronLeft className="w-4 h-4"/> 返回</Btn>
        <Btn onClick={() => { doCalc(form.joinDate, form.leaveDate, dateMode === 'known'); setStage('result'); }}>計算結果 <ChevronRight className="w-4 h-4"/></Btn>
      </div>
      <Footer/>
    </Page>
  );

  // --- Result Page ---
  if (stage === 'result') return (
    <Page>
      <Progress n={4} t={10}/>
      <Enc icon={<ChartIcon className="w-5 h-5"/>} text="計算結果"/>
      <Card className="space-y-4">
        <Row><span className="text-gray-600 min-w-0">年資</span><span className="font-bold text-[#D4A5A5] text-xl flex-shrink-0">{calc.tenure.years}年 {calc.tenure.months}月 {calc.tenure.days}天</span></Row>
        <Row><span className="text-gray-600 min-w-0">法定預告期</span><span className="font-bold text-xl flex-shrink-0">{calc.noticeRequired} 天</span></Row>
        {dateMode === 'known' && calc.deadlineToResign && <div className="bg-amber-50 rounded-3xl p-3"><Row><span className="text-amber-800 font-medium min-w-0 flex items-center gap-1"><AlertIcon className="w-4 h-4"/>最晚送出離職</span><span className="font-bold text-amber-700 text-xl flex-shrink-0">{new Date(calc.deadlineToResign).toLocaleDateString('zh-TW')}</span></Row><p className="text-xs text-amber-600 mt-1">在這天前告知，才能如期離開</p></div>}
        {dateMode === 'unknown' && calc.earliestLeaveDate && <div className="bg-green-50 rounded-3xl p-3"><Row><span className="text-green-800 font-medium min-w-0 flex items-center gap-1"><CalendarIcon className="w-4 h-4"/>今天提最快可離職</span><span className="font-bold text-green-700 text-xl flex-shrink-0">{new Date(calc.earliestLeaveDate).toLocaleDateString('zh-TW')}</span></Row></div>}
        <div className="border-t pt-4 space-y-3">
          <Row><span className="text-gray-600 min-w-0 flex items-center gap-1"><SearchIcon className="w-4 h-4"/>謀職假</span><span className="font-bold flex-shrink-0">{calc.jobSearchLeave} 天（有薪）</span></Row>
          <Row><span className="text-gray-600 min-w-0 flex items-center gap-1"><UmbrellaIcon className="w-4 h-4"/>特休額度</span><span className="font-bold flex-shrink-0">{calc.annualLeave} 天</span></Row>
          <Row><span className="text-gray-600 min-w-0">已使用</span><span className="flex-shrink-0">-{form.usedAnnualLeave} 天</span></Row>
          <Row><span className="text-gray-600 min-w-0">剩餘可折算</span><span className="font-bold text-[#D4A5A5] flex-shrink-0">{calc.remainingLeave} 天</span></Row>
          {form.monthlySalary > 0 && <Row><span className="text-gray-600 min-w-0 flex items-center gap-1"><CoinIcon className="w-4 h-4"/>特休折算</span><span className="font-bold text-green-600 flex-shrink-0">≈ ${Math.round(calc.leaveCompensation).toLocaleString()}</span></Row>}
        </div>
      </Card>
      {form.isInvoluntary && (
        <Card className="bg-gradient-to-br from-amber-50 to-orange-50 space-y-3">
          <h3 className="font-bold text-amber-800 flex items-center gap-1"><AlertIcon className="w-4 h-4"/>非自願離職權益</h3>
          {form.monthlySalary > 0 && <><Row><span className="text-gray-700 min-w-0">資遣費</span><span className="font-bold text-amber-700 flex-shrink-0">${Math.round(calc.severancePay).toLocaleString()}</span></Row><Row><span className="text-gray-700 min-w-0">預告工資</span><span className="font-bold text-amber-700 flex-shrink-0">${Math.round(calc.noticeWage).toLocaleString()}</span></Row></>}
          {form.insuranceYears >= 1 && <><div className="border-t pt-2"><Row><span className="text-gray-700 min-w-0">失業給付/月</span><span className="font-bold text-blue-700 flex-shrink-0">${calc.unemploymentBenefit.toLocaleString()}</span></Row><p className="text-xs text-gray-500 mt-1">投保薪資60%{form.dependents > 0 ? `+扶養${Math.min(form.dependents * 10, 20)}%` : ''} × {calc.unemploymentMonths}個月</p></div><Row><span className="text-gray-700 min-w-0">最長可領</span><span className="font-bold flex-shrink-0">{calc.unemploymentMonths} 個月</span></Row><div className="bg-white/50 rounded-lg p-2"><p className="text-xs text-gray-600 font-medium">政府補助總計約</p><p className="text-2xl font-bold text-blue-700">${calc.totalGovernmentBenefit.toLocaleString()}</p></div></>}
        </Card>
      )}
      <Legal>計算依《勞基法》與《就業保險法》，實際金額以公司與勞保局為準。</Legal>
      <div className="flex gap-3">
        <Btn onClick={() => setStage('salary-info')} variant="secondary"><ChevronLeft className="w-4 h-4"/> 返回</Btn>
        <Btn onClick={() => setStage('menu')}>功能選單 <ChevronRight className="w-4 h-4"/></Btn>
      </div>
      <Footer/>
    </Page>
  );

  // --- Menu Page ---
  if (stage === 'menu') return (
    <Page>
      <Enc icon={<ClipboardIcon className="w-5 h-5"/>} text="選擇需要的功能"/>
      <div className="space-y-3">
        <Menu icon={<PenIcon className="w-5 h-5"/>} title="離職信產生器" desc="正式/親切/簡潔三種風格" onClick={() => setStage('letter-info')}/>
        <Menu icon={<MailIcon className="w-5 h-5"/>} title="Email範本" desc="約主管、通知人資、同事道別、廠商通知" onClick={() => setStage('letter-info')}/>
        <Menu icon={<SearchIcon className="w-5 h-5"/>} title="謀職假申請" desc={`預告期間每週2日有薪（${calc.jobSearchLeave}天）`} onClick={() => setStage('job-search')} badge={calc.jobSearchLeave > 0 ? '別忘了用' : undefined}/>
        <Menu icon={<ClipboardIcon className="w-5 h-5"/>} title="交接清單" desc="30項確認事項，可輸出CSV/Word" onClick={() => setStage('checklist')}/>
        <Menu icon={<CoinIcon className="w-5 h-5"/>} title="權益確認" desc="特休、資遣費、失業給付、文件" onClick={() => setStage('rights')} badge={form.isInvoluntary ? '重要' : undefined}/>
        <Menu icon={<KeyIcon className="w-5 h-5"/>} title="數位安全" desc="帳號換綁、作品集脫敏、足跡清除" onClick={() => setStage('digital')}/>
      </div>
      <div className="flex gap-3 mt-4">
        <Btn onClick={() => setStage('result')} variant="secondary"><ChevronLeft className="w-4 h-4"/> 計算結果</Btn>
        <Btn onClick={() => setStage('complete')}>完成 <PartyIcon className="w-4 h-4"/></Btn>
      </div>
      <Footer/>
    </Page>
  );


  // --- Letter Info Page ---
  if (stage === 'letter-info') {
    const reasons = [{ id: 'career', l: '職涯發展' }, { id: 'family', l: '家庭因素' }, { id: 'health', l: '健康因素' }, { id: 'study', l: '進修學習' }, { id: 'relocation', l: '搬遷通勤' }, { id: 'other', l: '其他' }];
    const toggle = (id: string) => setForm(p => ({ ...p, reasons: p.reasons.includes(id) ? p.reasons.filter(r => r !== id) : [...p.reasons, id] }));
    return (
      <Page>
        <Progress n={5} t={10}/>
        <Enc icon={<PenIcon className="w-5 h-5"/>} text="填寫資訊生成離職信"/>
        <Card className="space-y-3">
          <p className="text-xs text-gray-500">皆為選填</p>
          <div className="grid grid-cols-2 gap-2">
            <input placeholder="你的姓名" value={form.employeeName} onChange={e => updateForm('employeeName', e.target.value)} className="px-3 py-2 border rounded-3xl text-base min-w-0"/>
            <input placeholder="主管稱呼" value={form.supervisorName} onChange={e => updateForm('supervisorName', e.target.value)} className="px-3 py-2 border rounded-3xl text-base min-w-0"/>
            <input placeholder="公司名稱" value={form.company} onChange={e => updateForm('company', e.target.value)} className="px-3 py-2 border rounded-3xl text-base min-w-0"/>
            <input placeholder="部門" value={form.department} onChange={e => updateForm('department', e.target.value)} className="px-3 py-2 border rounded-3xl text-base min-w-0"/>
            <input placeholder="職稱" value={form.position} onChange={e => updateForm('position', e.target.value)} className="col-span-2 px-3 py-2 border rounded-3xl text-base"/>
          </div>
          <div><label className="text-sm font-medium text-gray-700">離職原因（可複選）</label><div className="grid grid-cols-3 gap-1 mt-1">{reasons.map(r => <label key={r.id} className={`p-2 border rounded-3xl text-xs cursor-pointer text-center ${form.reasons.includes(r.id) ? 'border-[#D4A5A5] bg-[#D4A5A5]/5' : ''}`}><input type="checkbox" checked={form.reasons.includes(r.id)} onChange={() => toggle(r.id)} className="sr-only"/>{r.l}</label>)}</div>{form.reasons.includes('other') && <input placeholder="說明其他原因" value={form.reasonOther} onChange={e => updateForm('reasonOther', e.target.value)} className="w-full mt-2 px-3 py-2 border rounded-3xl text-base"/>}</div>
          <div><label className="text-sm font-medium text-gray-700">語氣</label><div className="flex gap-2 mt-1">{(['formal', 'friendly', 'simple'] as const).map(t => <label key={t} className={`flex-1 py-2 text-center text-sm rounded-full cursor-pointer border min-h-[44px] flex items-center justify-center ${form.tone === t ? 'bg-[#D4A5A5] text-white border-[#D4A5A5]' : 'border-gray-200'}`}><input type="radio" checked={form.tone === t} onChange={() => updateForm('tone', t)} className="sr-only"/>{{ formal: '正式', friendly: '親切', simple: '簡潔' }[t]}</label>)}</div></div>
          <textarea placeholder="感謝的話（選填）" value={form.gratitude} onChange={e => updateForm('gratitude', e.target.value)} rows={2} className="w-full px-3 py-2 border rounded-3xl text-base resize-none"/>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.hasHandover} onChange={e => updateForm('hasHandover', e.target.checked)} className="flex-shrink-0"/>加入交接承諾</label>
        </Card>
        <div className="flex gap-3">
          <Btn onClick={() => setStage('menu')} variant="secondary"><ChevronLeft className="w-4 h-4"/> 返回</Btn>
          <Btn onClick={() => setStage('letter-result')}>生成 <ChevronRight className="w-4 h-4"/></Btn>
        </div>
        <Footer/>
      </Page>
    );
  }

  // --- Letter Result Page ---
  if (stage === 'letter-result') {
    const letter = genLetter();
    return (
      <Page>
        <Progress n={6} t={10}/>
        <Enc icon={<FileIcon className="w-5 h-5"/>} text="離職文件準備好了！"/>
        <Card><Row className="mb-2"><h3 className="font-bold text-gray-800 min-w-0">離職信</h3><CopyBtn text={letter} id="letter" copiedId={copiedId} onCopy={copy}/></Row><pre className="whitespace-pre-wrap text-sm text-gray-700 bg-gray-50 rounded-3xl p-3 font-sans max-h-48 overflow-y-auto overflow-x-hidden">{letter}</pre></Card>
        <Card className="space-y-3">
          <h3 className="font-bold text-gray-800">Email範本</h3>
          {[{ t: '約主管面談', c: genSupervisor(), id: 's', icon: <BriefcaseIcon className="w-4 h-4"/> }, { t: '通知人資', c: genHR(), id: 'h', icon: <BuildingIcon className="w-4 h-4"/> }, { t: '向同事道別', c: genColleague(), id: 'c', icon: <HeartIcon className="w-4 h-4"/> }, { t: '通知廠商', c: genVendor(), id: 'v', icon: <LinkIcon className="w-4 h-4"/> }, { t: '請求推薦', c: genRef(), id: 'ref', icon: <ThumbsUpIcon className="w-4 h-4"/> }, { t: 'LinkedIn動態', c: genLinkedIn(), id: 'li', icon: <BriefcaseIcon className="w-4 h-4"/> }].map(e => <div key={e.id} className="border rounded-3xl p-2 overflow-hidden"><Row className="mb-1"><span className="text-sm font-medium min-w-0 truncate flex items-center gap-1">{e.icon}{e.t}</span><CopyBtn text={e.c} id={e.id} copiedId={copiedId} onCopy={copy}/></Row><pre className="whitespace-pre-wrap text-xs text-gray-600 bg-gray-50 rounded-xl p-2 font-sans max-h-32 overflow-y-auto overflow-x-hidden">{e.c}</pre></div>)}
        </Card>
        <div className="flex gap-3">
          <Btn onClick={() => setStage('letter-info')} variant="secondary"><ChevronLeft className="w-4 h-4"/> 修改</Btn>
          <Btn onClick={() => setStage('menu')}>返回 <ChevronRight className="w-4 h-4"/></Btn>
        </div>
        <Footer/>
      </Page>
    );
  }

  // --- Job Search Page ---
  if (stage === 'job-search') {
    const req = genJobSearch();
    return (
      <Page>
        <Enc icon={<SearchIcon className="w-5 h-5"/>} text="謀職假是你的法定權利！"/>
        <Card className="space-y-4">
          <Row><div className="min-w-0"><h3 className="font-bold text-gray-800">謀職假天數</h3><p className="text-xs text-gray-500">預告期每週2日有薪</p></div><span className="text-3xl font-bold text-[#D4A5A5] flex-shrink-0">{calc.jobSearchLeave} 天</span></Row>
          <div><Row className="mb-2"><span className="text-sm font-medium min-w-0">申請單範本</span><CopyBtn text={req} id="jsl" copiedId={copiedId} onCopy={copy}/></Row><pre className="whitespace-pre-wrap text-xs text-gray-700 bg-gray-50 rounded-3xl p-3 font-sans overflow-x-hidden">{req}</pre></div>
        </Card>
        <Legal>《勞基法》§16-2：預告期間每週可請2日有薪假外出謀職</Legal>
        <div className="flex gap-3"><Btn onClick={() => setStage('menu')} variant="secondary"><ChevronLeft className="w-4 h-4"/> 返回</Btn></div>
        <Footer/>
      </Page>
    );
  }


  // --- Checklist Page ---
  if (stage === 'checklist') {
    const cats = ['法律權益', '工作交接', '數位安全', '物品歸還', '人際關係'];
    const toggleCheck = (id: string) => setChecklist(p => p.map(i => i.id === id ? { ...i, checked: !i.checked } : i));
    const done = checklist.filter(i => i.checked).length;
    const unchecked = checklist.filter(i => !i.checked);
    return (
      <Page>
        <Progress n={7} t={10}/>
        <Enc icon={<CheckIcon className="w-5 h-5"/>} text="確保不遺漏！"/>
        <Card>
          <Row className="mb-2"><h3 className="font-bold text-gray-800 min-w-0">離職交接清單</h3><span className="text-sm text-[#D4A5A5] flex-shrink-0">{done}/{checklist.length}</span></Row>
          <div className="w-full h-2 bg-gray-200 rounded-full mb-4 overflow-hidden"><div className="h-full bg-gradient-to-r from-[#D4A5A5] to-[#B8A9C9]" style={{ width: `${(done / checklist.length) * 100}%` }}/></div>
          <div className="space-y-4 max-h-80 overflow-y-auto">
            {cats.map(cat => <div key={cat}><h4 className="text-xs font-bold text-[#D4A5A5] mb-2 sticky top-0 bg-white py-1">{cat}</h4><div className="space-y-1">{checklist.filter(i => i.category === cat).map(i => <label key={i.id} className={`flex items-start gap-2 p-2 rounded-3xl cursor-pointer ${i.checked ? 'bg-green-50' : 'hover:bg-gray-50'} ${i.priority === 'must' ? 'border-l-2 border-red-400' : i.priority === 'should' ? 'border-l-2 border-amber-400' : ''}`}><input type="checkbox" checked={i.checked} onChange={() => toggleCheck(i.id)} className="w-4 h-4 mt-0.5 flex-shrink-0"/><div className="flex-1 min-w-0"><span className={`text-sm ${i.checked ? 'text-gray-400 line-through' : ''}`}>{i.text}</span>{i.note && <p className="text-xs text-gray-400 mt-0.5 break-words">{i.note}</p>}</div></label>)}</div></div>)}
          </div>
        </Card>
        <Card><h3 className="font-bold text-gray-800 mb-3 flex items-center gap-1"><DownloadIcon className="w-4 h-4"/>輸出未完成項目</h3><div className="grid grid-cols-2 gap-2"><button onClick={() => exportCSV(unchecked)} className="flex items-center justify-center gap-2 p-3 border rounded-3xl hover:bg-gray-50 min-h-[44px]"><DownloadIcon className="w-4 h-4 text-green-600 flex-shrink-0"/><span className="text-sm">Excel (CSV)</span></button><button onClick={() => exportHTML(unchecked)} className="flex items-center justify-center gap-2 p-3 border rounded-3xl hover:bg-gray-50 min-h-[44px]"><DownloadIcon className="w-4 h-4 text-blue-600 flex-shrink-0"/><span className="text-sm">Word (HTML)</span></button></div><p className="text-xs text-gray-500 mt-2 text-center">CSV可用Excel/Google Sheets開啟，HTML可用Word開啟</p></Card>
        <div className="flex gap-3">
          <Btn onClick={() => setStage('menu')} variant="secondary"><ChevronLeft className="w-4 h-4"/> 返回</Btn>
          <Btn onClick={() => setStage('rights')}>確認權益 <ChevronRight className="w-4 h-4"/></Btn>
        </div>
        <Footer/>
      </Page>
    );
  }

  // --- Rights Page ---
  if (stage === 'rights') return (
    <Page>
      <Progress n={8} t={10}/>
      <Enc icon={<CoinIcon className="w-5 h-5"/>} text="確認你的權益！"/>
      <Card className="space-y-4">
        <h3 className="font-bold text-gray-800">法律權益確認</h3>
        <div className="bg-[#D4A5A5]/5 rounded-3xl p-3"><h4 className="font-medium text-sm mb-2 flex items-center gap-1"><UmbrellaIcon className="w-4 h-4"/>特休結算</h4><p className="text-sm">剩餘 <strong className="text-[#D4A5A5]">{calc.remainingLeave} 天</strong></p>{form.monthlySalary > 0 && <p className="text-sm">約 <strong className="text-green-600">${Math.round(calc.leaveCompensation).toLocaleString()}</strong></p>}<p className="text-xs text-gray-500 mt-1">未休完應折算工資</p></div>
        {form.isInvoluntary && <>
          <div className="bg-amber-50 rounded-3xl p-3 border-2 border-amber-200"><h4 className="font-bold text-sm mb-2 text-amber-800 flex items-center gap-1"><BuildingIcon className="w-4 h-4"/>公司應給付</h4>{form.monthlySalary > 0 ? <><Row><span className="text-sm min-w-0">資遣費</span><span className="font-bold text-amber-700 flex-shrink-0">${Math.round(calc.severancePay).toLocaleString()}</span></Row><p className="text-xs text-gray-500">新制：年資×0.5個月薪，最高6個月</p>{calc.noticeWage > 0 && <><Row className="border-t pt-2"><span className="text-sm min-w-0">預告工資</span><span className="font-bold text-amber-700 flex-shrink-0">${Math.round(calc.noticeWage).toLocaleString()}</span></Row><p className="text-xs text-gray-500">公司未提前預告時須支付</p></>}<div className="border-t pt-2 mt-2"><Row><span className="text-sm font-medium min-w-0">小計</span><span className="font-bold text-amber-800 text-lg flex-shrink-0">${Math.round(calc.severancePay + calc.noticeWage + calc.leaveCompensation).toLocaleString()}</span></Row><p className="text-xs text-gray-400">含特休折算 ${Math.round(calc.leaveCompensation).toLocaleString()}</p></div></> : <p className="text-xs text-gray-500">請填入月薪以計算</p>}</div>
          {form.insuranceYears >= 1 && <div className="bg-blue-50 rounded-3xl p-3 border-2 border-blue-200"><h4 className="font-bold text-sm mb-2 text-blue-800 flex items-center gap-1"><ShieldIcon className="w-4 h-4"/>政府失業補助</h4>{(form.insuredSalary || form.monthlySalary) > 0 ? <><Row><span className="text-sm min-w-0">失業給付（每月）</span><span className="font-bold text-blue-700 flex-shrink-0">${calc.unemploymentBenefit.toLocaleString()}</span></Row><p className="text-xs text-gray-500 mt-1">投保薪資60%{form.dependents > 0 ? `+扶養加給${form.dependents >= 2 ? '20' : '10'}%` : ''} × {calc.unemploymentMonths}個月</p><Row><span className="text-sm min-w-0">最長可領</span><span className="font-bold text-blue-700 flex-shrink-0">{calc.unemploymentMonths} 個月</span></Row><div className="border-t pt-2 mt-2"><Row><span className="text-sm font-medium min-w-0">總計可領</span><span className="font-bold text-blue-800 text-lg flex-shrink-0">${(calc.unemploymentBenefit * calc.unemploymentMonths).toLocaleString()}</span></Row></div></> : <p className="text-xs text-gray-500">請填入薪資以計算</p>}<p className="text-xs text-blue-600 mt-2 flex items-center gap-1"><AlertIcon className="w-3 h-3"/>需就保年資滿1年且向就業服務站辦理</p></div>}
          {form.insuranceYears < 1 && <div className="bg-gray-100 rounded-3xl p-3"><p className="text-xs text-gray-500 flex items-center gap-1"><InfoIcon className="w-3 h-3"/>就保年資未滿1年無法申請失業給付，但仍可申請資遣費</p></div>}
        </>}
        <div className="bg-red-50 rounded-3xl p-3"><h4 className="font-medium text-sm mb-2 flex items-center gap-1"><FileIcon className="w-4 h-4"/>離職證明書</h4><ul className="text-xs text-gray-600 space-y-1"><li>• 公司有義務開立</li><li>• 確認離職代碼正確（影響失業給付）</li><li>• 非自願離職需記載正確條款</li></ul></div>
        <div className="bg-green-50 rounded-3xl p-3"><h4 className="font-medium text-sm mb-2 flex items-center gap-1"><ClipboardIcon className="w-4 h-4"/>服務證明書</h4><ul className="text-xs text-gray-600 space-y-1"><li>• 依勞基法§19，僅記載到離職日、職位</li><li>• 不得有任何不利評語</li></ul></div>
        <div className="bg-blue-50 rounded-3xl p-3"><h4 className="font-medium text-sm mb-2 flex items-center gap-1"><ShieldIcon className="w-4 h-4"/>勞健保</h4><ul className="text-xs text-gray-600 space-y-1"><li>• 離職當日退保</li><li>• 空窗期可至區公所以第六類投保</li><li>• 或依附配偶/父母眷屬保</li>{form.isInvoluntary && <li className="text-blue-600 font-medium">• 領失業給付期間健保費全額補助！</li>}</ul></div>
        <div className="bg-purple-50 rounded-3xl p-3"><h4 className="font-medium text-sm mb-2 flex items-center gap-1"><LockIcon className="w-4 h-4"/>競業禁止</h4><ul className="text-xs text-gray-600 space-y-1"><li>• 檢查合約是否有「月補償金」</li><li>• 無補償金的競業條款多為無效</li></ul></div>
        <div className="bg-gray-50 rounded-3xl p-3"><h4 className="font-medium text-sm mb-2 flex items-center gap-1"><WalletIcon className="w-4 h-4"/>勞退6%</h4><ul className="text-xs text-gray-600 space-y-1"><li>• 到<a href="https://edesk.bli.gov.tw/na/" target="_blank" rel="noopener noreferrer" className="text-[#D4A5A5] underline">勞保局e化服務</a>查詢</li><li>• 確認公司每月有足額提繳</li></ul></div>
      </Card>
      <Legal>如有勞資爭議，可撥 <a href="tel:1955" className="font-bold">1955</a> 諮詢或向勞工局申請調解</Legal>
      <div className="flex gap-3">
        <Btn onClick={() => setStage('menu')} variant="secondary"><ChevronLeft className="w-4 h-4"/> 返回</Btn>
        <Btn onClick={() => setStage('digital')}>數位安全 <ChevronRight className="w-4 h-4"/></Btn>
      </div>
      <Footer/>
    </Page>
  );


  // --- Digital Security Page ---
  if (stage === 'digital') return (
    <Page>
      <Progress n={9} t={10}/>
      <Enc icon={<KeyIcon className="w-5 h-5"/>} text="數位安全與體面轉身"/>
      <Card className="space-y-4">
        <h3 className="font-bold text-gray-800">數位安全檢查</h3>
        <div className="bg-red-50 rounded-3xl p-3"><h4 className="font-medium text-sm mb-2 text-red-700 flex items-center gap-1"><AlertIcon className="w-4 h-4"/>必做：公司信箱清理</h4><ul className="text-xs text-gray-600 space-y-1"><li>1. 搜尋：面試、薪資、體檢、私人、offer</li><li>2. 刪除相關郵件</li><li>3. 清空垃圾桶（Hard Delete）</li><li>4. 清空「已刪除」與「草稿」</li></ul></div>
        <div className="bg-amber-50 rounded-3xl p-3"><h4 className="font-medium text-sm mb-2 flex items-center gap-1"><LinkIcon className="w-4 h-4"/>外部帳號換綁</h4><p className="text-xs text-gray-600 mb-2">公司信箱註冊的服務改綁個人信箱：</p><div className="flex flex-wrap gap-1">{['Notion', 'Figma', 'Canva', 'Slack', 'Trello', 'GitHub'].map(s => <span key={s} className="text-xs bg-white px-2 py-1 rounded">{s}</span>)}</div></div>
        <div className="bg-blue-50 rounded-3xl p-3"><h4 className="font-medium text-sm mb-2 flex items-center gap-1"><TrashIcon className="w-4 h-4"/>瀏覽器清理</h4><ul className="text-xs text-gray-600 space-y-1"><li>• 登出 Chrome/Edge 帳號</li><li>• 清除已儲存密碼</li><li>• 清除信用卡資訊</li><li>• 清除瀏覽紀錄與 Cookies</li></ul></div>
        <div className="bg-green-50 rounded-3xl p-3"><h4 className="font-medium text-sm mb-2 flex items-center gap-1"><FolderIcon className="w-4 h-4"/>方法論備份</h4><p className="text-xs text-gray-600 flex items-center gap-1"><CheckIcon className="w-3 h-3 text-green-600"/>可保留：個人模板、SOP流程、學習筆記</p><p className="text-xs text-red-600 mt-1 flex items-center gap-1"><AlertIcon className="w-3 h-3"/>不能帶：公司機密、客戶資料、專案原始檔</p></div>
        <div className="bg-purple-50 rounded-3xl p-3"><h4 className="font-medium text-sm mb-2 flex items-center gap-1"><BrushIcon className="w-4 h-4"/>作品集去識別化</h4><ul className="text-xs text-gray-600 space-y-1"><li>• 數據轉百分比（營收100萬→成長30%）</li><li>• 模糊化Logo與品牌名稱</li><li>• 確認不違反NDA</li></ul></div>
        <div className="bg-gray-50 rounded-3xl p-3"><h4 className="font-medium text-sm mb-2 flex items-center gap-1"><FileIcon className="w-4 h-4"/>交接檔案命名</h4><code className="text-xs bg-white px-2 py-1 rounded block break-all">YYYYMMDD_專案名稱_交接版_v1.0</code></div>
      </Card>
      <Warn>帶走公司機密可能違反勞動契約及法規</Warn>
      <div className="flex gap-3">
        <Btn onClick={() => setStage('menu')} variant="secondary"><ChevronLeft className="w-4 h-4"/> 返回</Btn>
        <Btn onClick={() => setStage('complete')}>完成 <PartyIcon className="w-4 h-4"/></Btn>
      </div>
      <Footer/>
    </Page>
  );

  // --- Complete Page ---
  if (stage === 'complete') return (
    <Page>
      <div className="text-center space-y-4 py-8">
        <div className="w-20 h-20 mx-auto bg-[#D4A5A5]/10 rounded-full flex items-center justify-center"><PartyIcon className="w-12 h-12 text-[#D4A5A5]"/></div>
        <h1 className="text-2xl font-bold text-[#D4A5A5]">恭喜完成離職準備！</h1>
        <p className="text-gray-600">祝新旅程順利</p>
        <div className="bg-gradient-to-r from-[#D4A5A5]/20 to-[#B8A9C9]/20 rounded-3xl p-4"><p className="text-[#D4A5A5] flex items-center justify-center gap-1">每一個結束，都是新開始。<br/>勇敢追夢！<StarIcon className="w-4 h-4"/></p></div>
        <Card className="text-left">
          <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-1"><ClipboardIcon className="w-4 h-4"/>最後確認</h3>
          <ul className="space-y-1 text-sm text-gray-600">
            <li className="flex items-center gap-2"><div className="w-4 h-4 border-2 border-gray-300 rounded"/>離職證明書</li>
            <li className="flex items-center gap-2"><div className="w-4 h-4 border-2 border-gray-300 rounded"/>服務證明書</li>
            <li className="flex items-center gap-2"><div className="w-4 h-4 border-2 border-gray-300 rounded"/>薪資/特休已結算</li>
            <li className="flex items-center gap-2"><div className="w-4 h-4 border-2 border-gray-300 rounded"/>勞健保轉出單</li>
            <li className="flex items-center gap-2"><div className="w-4 h-4 border-2 border-gray-300 rounded"/>物品歸還/帶走</li>
            <li className="flex items-center gap-2"><div className="w-4 h-4 border-2 border-gray-300 rounded"/>同事道別</li>
          </ul>
        </Card>
        <div className="bg-blue-50 rounded-3xl p-4 text-left">
          <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-1"><InfoIcon className="w-4 h-4"/>空窗期提醒</h3>
          <ul className="space-y-1 text-xs text-gray-600"><li>• 健保可至區公所第六類加保</li><li>• 非自願離職可申請失業給付</li><li>• 建議休息1-2週再求職</li></ul>
        </div>
        <div className="flex flex-col gap-2">
          <button onClick={() => setStage('menu')} className="w-full bg-[#D4A5A5] text-white py-3 rounded-full font-medium flex items-center justify-center gap-2 min-h-[44px]"><HomeIcon className="w-4 h-4"/>返回功能</button>
          <button onClick={reset} className="w-full bg-gray-100 text-gray-600 py-3 rounded-full font-medium min-h-[44px]">重新開始</button>
        </div>
      </div>
      <Footer/>
    </Page>
  );

  return null;
}

export default App;

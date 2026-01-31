/**
 * UI Components - Design System v1.4
 * 圓角: 24px | 主色: #D4A5A5 | 次色: #B8A9C9
 */
import React, { ReactNode } from 'react';
import { LockIcon, AlertIcon, InfoIcon, ChevronRight, CopyIcon, CheckIcon } from '../icons';

export const Page: React.FC<{ children: ReactNode }> = ({ children }) => (
  <div className="min-h-screen w-full bg-gradient-to-br from-[#FFF9F0] to-[#D4A5A5]/10 p-3 sm:p-4 md:p-6 overflow-x-hidden">
    <div className="w-full max-w-2xl mx-auto space-y-4">{children}</div>
  </div>
);

export const Card: React.FC<{ children: ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`bg-white rounded-3xl p-4 shadow-lg overflow-hidden ${className}`}>{children}</div>
);

export const Row: React.FC<{ children: ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`flex justify-between items-center gap-2 ${className}`}>{children}</div>
);

export const Btn: React.FC<{ onClick: () => void; disabled?: boolean; variant?: 'primary' | 'secondary'; children: ReactNode }> = ({ onClick, disabled, variant = 'primary', children }) => (
  <button onClick={onClick} disabled={disabled} className={`flex-1 py-3 px-4 rounded-3xl font-medium text-sm transition-all flex items-center justify-center gap-1 min-w-0 min-h-[44px] ${variant === 'primary' ? 'bg-[#D4A5A5] text-white hover:bg-[#D4A5A5]/90 disabled:bg-gray-300 disabled:cursor-not-allowed' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{children}</button>
);

export const CopyBtn: React.FC<{ text: string; id: string; copiedId: string | null; onCopy: (text: string, id: string) => void }> = ({ text, id, copiedId, onCopy }) => (
  <button onClick={() => onCopy(text, id)} className="flex items-center gap-1 px-3 py-1.5 bg-[#D4A5A5] text-white rounded-lg text-xs hover:bg-[#D4A5A5]/90 flex-shrink-0 whitespace-nowrap min-h-[44px]">
    {copiedId === id ? <CheckIcon className="w-3 h-3" /> : <CopyIcon className="w-3 h-3" />}
    {copiedId === id ? '已複製' : '複製'}
  </button>
);

export const Progress: React.FC<{ current: number; total: number }> = ({ current, total }) => (
  <div className="flex items-center gap-2 mb-2">
    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
      <div className="h-full bg-[#D4A5A5] transition-all" style={{ width: `${(current / total) * 100}%` }} />
    </div>
    <span className="text-xs text-gray-500 flex-shrink-0">{current}/{total}</span>
  </div>
);

export const Enc: React.FC<{ icon?: ReactNode; text: string }> = ({ icon, text }) => (
  <div className="bg-gradient-to-r from-[#D4A5A5]/20 to-[#B8A9C9]/20 rounded-3xl p-3 overflow-hidden">
    <p className="text-[#D4A5A5] flex items-center gap-2 text-sm">{icon}<span>{text}</span></p>
  </div>
);

export const Legal: React.FC<{ children: ReactNode }> = ({ children }) => (
  <div className="bg-amber-50 border-l-4 border-amber-400 p-3 rounded-r-3xl overflow-hidden">
    <div className="flex items-start gap-2"><InfoIcon className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" /><div className="text-xs text-amber-800 min-w-0">{children}</div></div>
  </div>
);

export const Warn: React.FC<{ children: ReactNode }> = ({ children }) => (
  <div className="bg-red-50 border-l-4 border-red-400 p-3 rounded-r-3xl overflow-hidden">
    <div className="flex items-start gap-2"><AlertIcon className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" /><div className="text-xs text-red-800 min-w-0">{children}</div></div>
  </div>
);

export const Privacy: React.FC = () => (
  <div className="flex items-center justify-center gap-2 text-xs text-gray-500 py-2"><LockIcon className="w-3 h-3" /><span>資料僅存在你的瀏覽器</span></div>
);

export const Menu: React.FC<{ icon: ReactNode; title: string; desc: string; onClick: () => void; badge?: string }> = ({ icon, title, desc, onClick, badge }) => (
  <button onClick={onClick} className="w-full bg-white rounded-3xl p-4 shadow-sm hover:shadow-md transition-all text-left flex items-start gap-3 border border-gray-100 overflow-hidden min-h-[44px]">
    <div className="w-10 h-10 rounded-full bg-[#D4A5A5]/10 flex items-center justify-center text-[#D4A5A5] flex-shrink-0">{icon}</div>
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-2 flex-wrap"><h3 className="font-bold text-gray-800">{title}</h3>{badge && <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full flex-shrink-0">{badge}</span>}</div>
      <p className="text-xs text-gray-500 mt-1 break-words">{desc}</p>
    </div>
    <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
  </button>
);

export const Footer: React.FC = () => (
  <div className="mt-4 p-3 bg-white/80 rounded-3xl border border-gray-100 text-center overflow-hidden">
    <p className="text-xs text-gray-600 flex items-center justify-center gap-1"><AlertIcon className="w-3 h-3 text-amber-500" />依《勞基法》計算，僅供參考。諮詢請洽 <a href="tel:1955" className="text-[#D4A5A5] font-bold">1955</a></p>
    <Privacy />
    <p className="text-xs text-gray-400 mt-2">© {new Date().getFullYear()} Kaoru Tsai. All Rights Reserved. | <a href="mailto:hello@helloruru.com" className="hover:text-[#D4A5A5]">hello@helloruru.com</a></p>
  </div>
);

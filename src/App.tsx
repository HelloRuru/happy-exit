/**
 * Happy Exit App
 * ==============
 * 離職全能導航幫手
 * 
 * Design System v1.4
 * - 主色: #D4A5A5 (Rose)
 * - 次色: #B8A9C9 (Lavender)
 * - 圓角: 24px
 * - 標題: 獅尾四季春加糖
 * - 內文: 獅尾四季春
 * - 12px以下: Noto Sans TC
 * - Icon: SVG 線條風格
 */

import { useState, useEffect, ReactNode } from 'react';

// Import from modules
import { 
  COLORS, 
  DEFAULT_CHECKLIST, 
  CHECKLIST_CATEGORIES,
  REASON_OPTIONS,
  TONE_OPTIONS,
  DEPENDENT_OPTIONS,
  INSURANCE_YEARS_OPTIONS,
  EXTERNAL_SERVICES,
  TOTAL_PAGES,
  STORAGE_KEY,
} from './constants';

import type { 
  ChecklistItem, 
  FormData, 
  CalcResult, 
  DateMode, 
  StageName,
  Tenure,
} from './types';

import {
  calcTenure,
  getNoticeRequired,
  calcAnnualLeave,
  calcJobSearchLeave,
  calcSeverancePay,
  calcUnemploymentBenefit,
  getUnemploymentMonths,
  performCalculation,
  getEmptyCalcResult,
} from './utils/calculations';

import {
  getReasonText,
  formatDateTW,
  getLeaveDate as getLeaveDateUtil,
  generateResignationLetter,
  generateSupervisorEmail,
  generateHREmail,
  generateColleagueEmail,
  generateVendorEmail,
  generateJobSearchLeaveRequest,
  generateLinkedInPost,
  generateRecommendationRequest,
} from './utils/letters';

import {
  exportToCSV,
  exportToHTML,
} from './utils/export';

// Import Icons
import {
  ChevronRight, ChevronLeft, InfoIcon, LockIcon, CopyIcon, CheckIcon,
  HomeIcon, DownloadIcon, AlertIcon, ShieldIcon, FileIcon, SproutIcon,
  CalendarIcon, ChartIcon, ClipboardIcon, CoinIcon, PenIcon, SunIcon,
  SearchIcon, UmbrellaIcon, HeartIcon, MailIcon, BriefcaseIcon, BuildingIcon,
  WalletIcon, StarIcon, LinkIcon, KeyIcon, TrashIcon, FolderIcon, BrushIcon,
  PartyIcon, ThumbsUpIcon,
} from './components/icons';

// Import UI Components
import {
  Page, Card, Row, Btn, CopyBtn, Progress, Enc, Legal, Warn, Privacy, Menu, Footer,
} from './components/ui';


// ============================================================
// Main App Component
// ============================================================
function App() {
  const [stage, setStage] = useState<StageName>('welcome');
  const [dateMode, setDateMode] = useState<DateMode>('known');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  
  const [form, setForm] = useState<FormData>({
    joinDate: '',
    leaveDate: '',
    company: '',
    department: '',
    position: '',
    supervisorName: '',
    employeeName: '',
    reasons: [],
    reasonOther: '',
    tone: 'friendly',
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

  const [calc, setCalc] = useState<CalcResult>(getEmptyCalcResult());
  const [checklist, setChecklist] = useState<ChecklistItem[]>(DEFAULT_CHECKLIST);

  // LocalStorage Persistence
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
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
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ stage, dateMode, form, calc, checklist }));
  }, [stage, dateMode, form, calc, checklist]);

  // Helper Functions
  const doCalc = () => {
    const result = performCalculation(form, dateMode);
    setCalc(result);
  };

  const copy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const reset = () => {
    if (confirm('確定重新開始？')) {
      localStorage.removeItem(STORAGE_KEY);
      location.reload();
    }
  };

  const getLeaveDate = () => dateMode === 'known' ? form.leaveDate : (calc.earliestLeaveDate || new Date().toISOString().split('T')[0]);
  const updateForm = <K extends keyof FormData>(key: K, value: FormData[K]) => setForm(prev => ({ ...prev, [key]: value }));
  const toggleCheck = (id: string) => setChecklist(p => p.map(i => i.id === id ? { ...i, checked: !i.checked } : i));

  // Letter Generators using utilities
  const ld = () => formatDateTW(getLeaveDate());
  const genLetter = () => generateResignationLetter(form, getLeaveDate(), form.tone);
  const genSupervisor = () => generateSupervisorEmail(form);
  const genHR = () => generateHREmail(form, getLeaveDate());
  const genColleague = () => generateColleagueEmail(form, calc, getLeaveDate());
  const genVendor = () => generateVendorEmail(form, getLeaveDate());
  const genJobSearch = () => generateJobSearchLeaveRequest(form, calc.jobSearchLeave);
  const genLinkedIn = () => generateLinkedInPost(form, calc);
  const genRef = () => generateRecommendationRequest(form);

  // Export handlers
  const handleExportCSV = () => exportToCSV(checklist.filter(i => !i.checked));
  const handleExportHTML = () => exportToHTML(checklist.filter(i => !i.checked));


  // ============================================
  // PAGE RENDERS
  // ============================================

  // --- Welcome Page ---
  if (stage === 'welcome') return (
    <Page>
      <div className="text-center space-y-4 py-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#D4A5A5] font-heading">離職全能導航幫手</h1>
        <p className="text-lg text-gray-600 flex items-center justify-center gap-2"><StarIcon className="w-5 h-5 text-[#B8A9C9]"/>新的開始，從溫暖的告別開始</p>
        <div className="bg-gradient-to-r from-[#D4A5A5]/20 to-[#B8A9C9]/20 rounded-3xl p-4"><p className="text-[#D4A5A5]">每一段旅程都有終點。<br/>讓我們一起好好規劃這個轉變。</p></div>
        <Card className="text-left">
          <h3 className="font-bold text-gray-800 mb-2 font-heading">功能：</h3>
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
      <Progress current={1} total={TOTAL_PAGES}/>
      <Enc icon={<SproutIcon className="w-5 h-5"/>} text="改變需要勇氣，你已經踏出第一步。"/>
      <Card>
        <label className="block text-lg font-bold text-gray-800 mb-1 font-heading">到職日期？</label>
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
        <Progress current={2} total={TOTAL_PAGES}/>
        <Enc icon={<CalendarIcon className="w-5 h-5"/>} text="給自己充足的時間說再見。"/>
        <Card className="space-y-4">
          <div>
            <div className="text-sm text-gray-500">到職日期</div>
            <div className="text-xl font-bold text-[#D4A5A5] bg-[#D4A5A5]/10 rounded-3xl p-3 text-center">{new Date(form.joinDate).toLocaleDateString('zh-TW')}</div>
            <div className="text-center mt-1 text-sm text-gray-600">年資約 {ct.years} 年 {ct.months} 個月</div>
          </div>
          <div className="border-t pt-4">
            <h3 className="font-bold text-gray-800 mb-3 font-heading">決定離職日期了嗎？</h3>
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
          <Btn onClick={() => { doCalc(); setStage('salary-info'); }} disabled={dateMode === 'known' && !form.leaveDate}>下一步 <ChevronRight className="w-4 h-4"/></Btn>
        </div>
        <Footer/>
      </Page>
    );
  }


  // --- Salary Info Page ---
  if (stage === 'salary-info') return (
    <Page>
      <Progress current={3} total={TOTAL_PAGES}/>
      <Enc icon={<CoinIcon className="w-5 h-5"/>} text="薪資資訊（選填）有助計算特休折算與失業補助"/>
      <Card className="space-y-4">
        <div><label className="block text-sm font-medium text-gray-700 mb-1">月薪（選填）</label><input type="number" placeholder="例如 45000" value={form.monthlySalary || ''} onChange={e => updateForm('monthlySalary', parseInt(e.target.value) || 0)} className="w-full px-3 py-2.5 border-2 border-[#D4A5A5]/30 rounded-3xl focus:outline-none focus:border-[#D4A5A5] text-base"/><p className="text-xs text-gray-400 mt-1">用於計算特休折算、資遣費</p></div>
        <div><label className="block text-sm font-medium text-gray-700 mb-1">勞保投保薪資（選填）</label><input type="number" placeholder="通常≤月薪，例如 45800" value={form.insuredSalary || ''} onChange={e => updateForm('insuredSalary', parseInt(e.target.value) || 0)} className="w-full px-3 py-2.5 border-2 border-[#D4A5A5]/30 rounded-3xl focus:outline-none focus:border-[#D4A5A5] text-base"/><p className="text-xs text-gray-400 mt-1">未填則以月薪估算失業給付</p></div>
        <div><label className="block text-sm font-medium text-gray-700 mb-1">今年已用特休天數</label><input type="number" placeholder="0" value={form.usedAnnualLeave || ''} onChange={e => updateForm('usedAnnualLeave', parseInt(e.target.value) || 0)} className="w-full px-3 py-2.5 border-2 border-[#D4A5A5]/30 rounded-3xl focus:outline-none focus:border-[#D4A5A5] text-base"/></div>
        <div className="border-t pt-4"><label className="flex items-start gap-2 cursor-pointer"><input type="checkbox" checked={form.isInvoluntary} onChange={e => updateForm('isInvoluntary', e.target.checked)} className="mt-1 flex-shrink-0"/><div className="min-w-0"><span className="font-bold text-sm">非自願離職</span><p className="text-xs text-gray-500 break-words">公司資遣、裁員、歇業等（可領資遣費+失業給付）</p></div></label></div>
        {form.isInvoluntary && (
          <div className="bg-blue-50 rounded-3xl p-3 space-y-3">
            <h4 className="font-bold text-sm text-blue-800 flex items-center gap-1"><ShieldIcon className="w-4 h-4"/>失業給付資格</h4>
            <div><label className="block text-xs text-gray-600 mb-1">就業保險年資</label><select value={form.insuranceYears} onChange={e => updateForm('insuranceYears', parseInt(e.target.value))} className="w-full px-3 py-2 border rounded-3xl text-base">{INSURANCE_YEARS_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}</select></div>
            <div><label className="block text-xs text-gray-600 mb-1">扶養親屬人數（無謀生能力）</label><select value={form.dependents} onChange={e => updateForm('dependents', parseInt(e.target.value))} className="w-full px-3 py-2 border rounded-3xl text-base">{DEPENDENT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}</select></div>
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.isOver45} onChange={e => updateForm('isOver45', e.target.checked)} className="flex-shrink-0"/>45歲以上（可領9個月）</label>
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.hasDisability} onChange={e => updateForm('hasDisability', e.target.checked)} className="flex-shrink-0"/>身心障礙者（可領9個月）</label>
          </div>
        )}
      </Card>
      <div className="flex gap-3">
        <Btn onClick={() => setStage('leave-date')} variant="secondary"><ChevronLeft className="w-4 h-4"/> 返回</Btn>
        <Btn onClick={() => { doCalc(); setStage('result'); }}>計算結果 <ChevronRight className="w-4 h-4"/></Btn>
      </div>
      <Footer/>
    </Page>
  );

  // --- Result Page ---
  if (stage === 'result') return (
    <Page>
      <Progress current={4} total={TOTAL_PAGES}/>
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
          <h3 className="font-bold text-amber-800 flex items-center gap-1 font-heading"><AlertIcon className="w-4 h-4"/>非自願離職權益</h3>
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
    const toggle = (id: string) => setForm(p => ({ ...p, reasons: p.reasons.includes(id) ? p.reasons.filter(r => r !== id) : [...p.reasons, id] }));
    return (
      <Page>
        <Progress current={5} total={TOTAL_PAGES}/>
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
          <div><label className="text-sm font-medium text-gray-700">離職原因（可複選）</label><div className="grid grid-cols-3 gap-1 mt-1">{REASON_OPTIONS.map(r => <label key={r.id} className={`p-2 border rounded-3xl text-xs cursor-pointer text-center ${form.reasons.includes(r.id) ? 'border-[#D4A5A5] bg-[#D4A5A5]/5' : ''}`}><input type="checkbox" checked={form.reasons.includes(r.id)} onChange={() => toggle(r.id)} className="sr-only"/>{r.label}</label>)}</div>{form.reasons.includes('other') && <input placeholder="說明其他原因" value={form.reasonOther} onChange={e => updateForm('reasonOther', e.target.value)} className="w-full mt-2 px-3 py-2 border rounded-3xl text-base"/>}</div>
          <div><label className="text-sm font-medium text-gray-700">語氣</label><div className="flex gap-2 mt-1">{TONE_OPTIONS.map(t => <label key={t.value} className={`flex-1 py-2 text-center text-sm rounded-full cursor-pointer border min-h-[44px] flex items-center justify-center ${form.tone === t.value ? 'bg-[#D4A5A5] text-white border-[#D4A5A5]' : 'border-gray-200'}`}><input type="radio" checked={form.tone === t.value} onChange={() => updateForm('tone', t.value)} className="sr-only"/>{t.label}</label>)}</div></div>
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
        <Progress current={6} total={TOTAL_PAGES}/>
        <Enc icon={<FileIcon className="w-5 h-5"/>} text="離職文件準備好了！"/>
        <Card><Row className="mb-2"><h3 className="font-bold text-gray-800 min-w-0 font-heading">離職信</h3><CopyBtn text={letter} id="letter" copiedId={copiedId} onCopy={copy}/></Row><pre className="whitespace-pre-wrap text-sm text-gray-700 bg-gray-50 rounded-3xl p-3 font-sans max-h-48 overflow-y-auto overflow-x-hidden">{letter}</pre></Card>
        <Card className="space-y-3">
          <h3 className="font-bold text-gray-800 font-heading">Email範本</h3>
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
          <Row><div className="min-w-0"><h3 className="font-bold text-gray-800 font-heading">謀職假天數</h3><p className="text-xs text-gray-500">預告期每週2日有薪</p></div><span className="text-3xl font-bold text-[#D4A5A5] flex-shrink-0">{calc.jobSearchLeave} 天</span></Row>
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
    const done = checklist.filter(i => i.checked).length;
    const unchecked = checklist.filter(i => !i.checked);
    return (
      <Page>
        <Progress current={7} total={TOTAL_PAGES}/>
        <Enc icon={<CheckIcon className="w-5 h-5"/>} text="確保不遺漏！"/>
        <Card>
          <Row className="mb-2"><h3 className="font-bold text-gray-800 min-w-0 font-heading">離職交接清單</h3><span className="text-sm text-[#D4A5A5] flex-shrink-0">{done}/{checklist.length}</span></Row>
          <div className="w-full h-2 bg-gray-200 rounded-full mb-4 overflow-hidden"><div className="h-full bg-gradient-to-r from-[#D4A5A5] to-[#B8A9C9]" style={{ width: `${(done / checklist.length) * 100}%` }}/></div>
          <div className="space-y-4 max-h-80 overflow-y-auto">
            {CHECKLIST_CATEGORIES.map(cat => <div key={cat}><h4 className="text-xs font-bold text-[#D4A5A5] mb-2 sticky top-0 bg-white py-1">{cat}</h4><div className="space-y-1">{checklist.filter(i => i.category === cat).map(i => <label key={i.id} className={`flex items-start gap-2 p-2 rounded-3xl cursor-pointer ${i.checked ? 'bg-green-50' : 'hover:bg-gray-50'} ${i.priority === 'must' ? 'border-l-2 border-red-400' : i.priority === 'should' ? 'border-l-2 border-amber-400' : ''}`}><input type="checkbox" checked={i.checked} onChange={() => toggleCheck(i.id)} className="w-4 h-4 mt-0.5 flex-shrink-0"/><div className="flex-1 min-w-0"><span className={`text-sm ${i.checked ? 'text-gray-400 line-through' : ''}`}>{i.text}</span>{i.note && <p className="text-xs text-gray-400 mt-0.5 break-words">{i.note}</p>}</div></label>)}</div></div>)}
          </div>
        </Card>
        <Card><h3 className="font-bold text-gray-800 mb-3 flex items-center gap-1 font-heading"><DownloadIcon className="w-4 h-4"/>輸出未完成項目</h3><div className="grid grid-cols-2 gap-2"><button onClick={handleExportCSV} className="flex items-center justify-center gap-2 p-3 border rounded-3xl hover:bg-gray-50 min-h-[44px]"><DownloadIcon className="w-4 h-4 text-green-600 flex-shrink-0"/><span className="text-sm">Excel (CSV)</span></button><button onClick={handleExportHTML} className="flex items-center justify-center gap-2 p-3 border rounded-3xl hover:bg-gray-50 min-h-[44px]"><DownloadIcon className="w-4 h-4 text-blue-600 flex-shrink-0"/><span className="text-sm">Word (HTML)</span></button></div><p className="text-xs text-gray-500 mt-2 text-center">CSV可用Excel/Google Sheets開啟，HTML可用Word開啟</p></Card>
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
      <Progress current={8} total={TOTAL_PAGES}/>
      <Enc icon={<CoinIcon className="w-5 h-5"/>} text="確認你的權益！"/>
      <Card className="space-y-4">
        <h3 className="font-bold text-gray-800 font-heading">法律權益確認</h3>
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
      <Progress current={9} total={TOTAL_PAGES}/>
      <Enc icon={<KeyIcon className="w-5 h-5"/>} text="數位安全與體面轉身"/>
      <Card className="space-y-4">
        <h3 className="font-bold text-gray-800 font-heading">數位安全檢查</h3>
        <div className="bg-red-50 rounded-3xl p-3"><h4 className="font-medium text-sm mb-2 text-red-700 flex items-center gap-1"><AlertIcon className="w-4 h-4"/>必做：公司信箱清理</h4><ul className="text-xs text-gray-600 space-y-1"><li>1. 搜尋：面試、薪資、體檢、私人、offer</li><li>2. 刪除相關郵件</li><li>3. 清空垃圾桶（Hard Delete）</li><li>4. 清空「已刪除」與「草稿」</li></ul></div>
        <div className="bg-amber-50 rounded-3xl p-3"><h4 className="font-medium text-sm mb-2 flex items-center gap-1"><LinkIcon className="w-4 h-4"/>外部帳號換綁</h4><p className="text-xs text-gray-600 mb-2">公司信箱註冊的服務改綁個人信箱：</p><div className="flex flex-wrap gap-1">{EXTERNAL_SERVICES.map(s => <span key={s} className="text-xs bg-white px-2 py-1 rounded">{s}</span>)}</div></div>
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
        <h1 className="text-2xl font-bold text-[#D4A5A5] font-heading">恭喜完成離職準備！</h1>
        <p className="text-gray-600">祝新旅程順利</p>
        <div className="bg-gradient-to-r from-[#D4A5A5]/20 to-[#B8A9C9]/20 rounded-3xl p-4"><p className="text-[#D4A5A5] flex items-center justify-center gap-1">每一個結束，都是新開始。<br/>勇敢追夢！<StarIcon className="w-4 h-4"/></p></div>
        <Card className="text-left">
          <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-1 font-heading"><ClipboardIcon className="w-4 h-4"/>最後確認</h3>
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
          <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-1 font-heading"><InfoIcon className="w-4 h-4"/>空窗期提醒</h3>
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

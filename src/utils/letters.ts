import type { FormData, CalcResult, ToneType } from '../types';
import { REASON_MAP } from '../constants';

export function getReasonText(form: FormData): string {
  if (form.reasons.length === 0) return '個人生涯規劃';
  return form.reasons.map(r => r === 'other' ? (form.reasonOther || '個人因素') : REASON_MAP[r]).join('、');
}

export function formatDateTW(d: string): string { return d ? new Date(d).toLocaleDateString('zh-TW') : '（待定）'; }
export function getLeaveDate(f: FormData, c: CalcResult, m: 'known' | 'unknown'): string { return m === 'known' ? f.leaveDate : (c.earliestLeaveDate || new Date().toISOString().split('T')[0]); }

export function generateResignationLetter(f: FormData, ld: string, tone: ToneType = 'friendly'): string {
  const d = formatDateTW(ld), r = getReasonText(f);
  if (tone === 'formal') return `${f.supervisorName || '主管'}鈣鑒：\n\n本人${f.employeeName || ''}因${r}，擬於 ${d} 離職。\n\n${f.gratitude || '在職期間承蒙指導，謹致謝忱。'}${f.hasHandover ? '\n\n離職前將完成工作交接，確保業務順利銜接。' : ''}\n\n敬請核准。\n\n此致\n${f.company || '公司'}${f.department ? ' ' + f.department : ''}\n\n${f.employeeName || '員工'}\n${new Date().toLocaleDateString('zh-TW')}`;
  if (tone === 'simple') return `${f.supervisorName || '主管'}您好，\n\n因${r}，我預計 ${d} 離職。${f.hasHandover ? '會完成交接。' : ''}\n\n${f.gratitude || '謝謝這段時間的照顧。'}\n\n${f.employeeName || ''}`;
  return `${f.supervisorName || '主管'}您好：\n\n經過慎重考慮，因${r}，我決定離開目前的職位。\n\n預計最後工作日為 ${d}。\n\n${f.gratitude || '感謝您這段時間的指導與照顧，讓我學習成長很多。'}${f.hasHandover ? '\n\n在離職前，我會確實完成手邊工作的交接，讓後續業務能順利進行。' : ''}\n\n再次感謝，祝團隊順利！\n\n${f.employeeName || ''}`;
}

export function generateSupervisorEmail(f: FormData): string { return `${f.supervisorName || '主管'}您好：\n\n有件事想當面向您報告，想跟您約個時間談談。\n\n請問這週什麼時候方便？\n\n${f.employeeName || ''}`; }
export function generateHREmail(f: FormData, ld: string): string { return `人資同仁您好：\n\n我是${f.department ? f.department + '的' : ''}${f.employeeName || '員工'}，已向主管提出離職申請。\n\n預計最後工作日：${formatDateTW(ld)}\n\n煩請協助後續離職手續，謝謝！\n\n${f.employeeName || ''}`; }
export function generateColleagueEmail(f: FormData, c: CalcResult, ld: string): string {
  const t = c.tenure.years > 0 || c.tenure.months > 0 ? `這${c.tenure.years > 0 ? c.tenure.years + '年' : ''}${c.tenure.months > 0 ? c.tenure.months + '個月' : ''}` : '這段時間';
  return `各位同事：\n\n在這邊跟大家說聲再見！\n\n${t}，感謝大家的照顧與合作。\n\n我的最後工作日是 ${formatDateTW(ld)}。\n\n希望未來還有機會再見！\n\n祝大家工作順利\n\n${f.employeeName || ''}`;
}
export function generateVendorEmail(f: FormData, ld: string): string { return `您好：\n\n我是${f.company || '公司'}${f.department || ''}的${f.employeeName || '窗口'}。\n\n因職務異動，我將於 ${formatDateTW(ld)} 離職。\n\n後續業務將由同事接手，屆時會再通知新窗口聯繫方式。\n\n感謝您一直以來的配合！\n\n${f.employeeName || ''}`; }
export function generateJobSearchLeaveRequest(f: FormData, days: number): string { return `主旨：謀職假申請\n\n${f.supervisorName || '主管'}您好：\n\n依《勞基法》第16條第2項，於預告期間申請謀職假。\n\n申請天數：${days} 天（預告期每週2日）\n預計使用日期：＿＿＿＿\n\n懇請核准，謝謝！\n\n${f.employeeName || ''}`; }
export function generateLinkedInPost(f: FormData, c: CalcResult): string {
  const t = c.tenure.years > 0 ? `${c.tenure.years} 年` : '' + (c.tenure.months > 0 ? `${c.tenure.months} 個月` : '');
  return `【新的旅程】\n\n經過 ${t}，我即將離開 ${f.company || '現職'}，展開下一篇章。\n\n感謝所有一起奮鬥的夥伴們！\n\n#職涯 #感謝 #新開始`;
}
export function generateRecommendationRequest(f: FormData): string { return `${f.supervisorName || '主管'} 您好：\n\n在我離開前，想請教一件事。\n\n這段時間在您帶領下學到很多，不知是否方便在 LinkedIn 上給我一段推薦？\n\n這對我職涯發展很有幫助。\n\n如果不方便，完全沒關係！\n\n謝謝！\n${f.employeeName || ''}`; }

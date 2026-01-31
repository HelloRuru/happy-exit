/**
 * Letter Generation Utilities
 * 離職信與各類 Email 範本生成
 */
import type { FormData, CalcResult, ToneType } from '../types';
import { REASON_MAP } from '../constants';

export function getReasonText(form: FormData): string {
  if (form.reasons.length === 0) return '個人生涯規劃';
  return form.reasons.map(r => r === 'other' ? (form.reasonOther || '個人因素') : REASON_MAP[r]).join('、');
}

export function formatDateTW(dateStr: string): string {
  if (!dateStr) return '（待定）';
  return new Date(dateStr).toLocaleDateString('zh-TW');
}

export function getLeaveDate(form: FormData, calc: CalcResult, dateMode: 'known' | 'unknown'): string {
  return dateMode === 'known' ? form.leaveDate : (calc.earliestLeaveDate || new Date().toISOString().split('T')[0]);
}

export function generateResignationLetter(form: FormData, leaveDate: string, tone: ToneType = 'friendly'): string {
  const ld = formatDateTW(leaveDate);
  const reason = getReasonText(form);
  if (tone === 'formal') {
    return [`${form.supervisorName || '主管'}鈣鑒：`, '', `本人${form.employeeName || ''}因${reason}，擬於 ${ld} 離職。`, '', form.gratitude || '在職期間承蒙指導，謹致謝忱。', form.hasHandover ? '\n離職前將完成工作交接，確保業務順利銜接。' : '', '', '敬請核准。', '', '此致', `${form.company || '公司'}${form.department ? ' ' + form.department : ''}`, '', form.employeeName || '員工', new Date().toLocaleDateString('zh-TW')].filter(Boolean).join('\n');
  }
  if (tone === 'simple') {
    return [`${form.supervisorName || '主管'}您好，`, '', `因${reason}，我預計 ${ld} 離職。${form.hasHandover ? '會完成交接。' : ''}`, '', form.gratitude || '謝謝這段時間的照顧。', '', form.employeeName || ''].join('\n');
  }
  return [`${form.supervisorName || '主管'}您好：`, '', `經過慎重考慮，因${reason}，我決定離開目前的職位。`, '', `預計最後工作日為 ${ld}。`, '', form.gratitude || '感謝您這段時間的指導與照顧，讓我學習成長很多。', form.hasHandover ? '\n在離職前，我會確實完成手邊工作的交接，讓後續業務能順利進行。' : '', '', '再次感謝，祝團隊順利！', '', form.employeeName || ''].filter(Boolean).join('\n');
}

export function generateSupervisorEmail(form: FormData): string {
  return [`${form.supervisorName || '主管'}您好：`, '', '有件事想當面向您報告，想跟您約個時間談談。', '', '請問這週什麼時候方便？', '', form.employeeName || ''].join('\n');
}

export function generateHREmail(form: FormData, leaveDate: string): string {
  const ld = formatDateTW(leaveDate);
  return ['人資同仁您好：', '', `我是${form.department ? form.department + '的' : ''}${form.employeeName || '員工'}，已向主管提出離職申請。`, '', `預計最後工作日：${ld}`, '', '煩請協助後續離職手續，謝謝！', '', form.employeeName || ''].join('\n');
}

export function generateColleagueEmail(form: FormData, calc: CalcResult, leaveDate: string): string {
  const ld = formatDateTW(leaveDate);
  const tenureText = calc.tenure.years > 0 || calc.tenure.months > 0 ? `這${calc.tenure.years > 0 ? calc.tenure.years + '年' : ''}${calc.tenure.months > 0 ? calc.tenure.months + '個月' : ''}` : '這段時間';
  return ['各位同事：', '', '在這邊跟大家說聲再見！', '', `${tenureText}，感謝大家的照顧與合作。`, '', `我的最後工作日是 ${ld}。`, '', '希望未來還有機會再見！', '', '祝大家工作順利', '', form.employeeName || ''].join('\n');
}

export function generateVendorEmail(form: FormData, leaveDate: string): string {
  const ld = formatDateTW(leaveDate);
  return ['您好：', '', `我是${form.company || '公司'}${form.department || ''}的${form.employeeName || '窗口'}。`, '', `因職務異動，我將於 ${ld} 離職。`, '', '後續業務將由同事接手，屆時會再通知新窗口聯繫方式。', '', '感謝您一直以來的配合！', '', form.employeeName || ''].join('\n');
}

export function generateJobSearchLeaveRequest(form: FormData, jobSearchDays: number): string {
  return ['主旨：謀職假申請', '', `${form.supervisorName || '主管'}您好：`, '', '依《勞基法》第16條第2項，於預告期間申請謀職假。', '', `申請天數：${jobSearchDays} 天（預告期每顱2日）`, '預計使用日期：＿＿＿＿', '', '懇請核准，謝謝！', '', form.employeeName || ''].join('\n');
}

export function generateLinkedInPost(form: FormData, calc: CalcResult): string {
  const tenureText = calc.tenure.years > 0 ? `${calc.tenure.years} 年` : '' + (calc.tenure.months > 0 ? `${calc.tenure.months} 個月` : '');
  return ['【新的旅程】', '', `經過 ${tenureText}，我即將離開 ${form.company || '現職'}，展開下一篇章。`, '', '感謝所有一起奮鬥的夥伴們！', '', '#職涯 #感謝 #新開始'].join('\n');
}

export function generateRecommendationRequest(form: FormData): string {
  return [`${form.supervisorName || '主管'} 您好：`, '', '在我離開前，想請教一件事。', '', '這段時間在您帶領下學到很多，不知是否方便在 LinkedIn 上給我一段推薦？', '', '這對我職涯發展很有幫助。', '', '如果不方便，完全沒關係！', '', '謝謝！', form.employeeName || ''].join('\n');
}

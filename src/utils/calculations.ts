import type { Tenure, FormData, CalcResult, DateMode } from '../types';

export function calcTenure(joinDate: string, endDate: string): Tenure {
  if (!joinDate || !endDate) return { years: 0, months: 0, days: 0 };
  const jd = new Date(joinDate), ed = new Date(endDate);
  let years = ed.getFullYear() - jd.getFullYear();
  let months = ed.getMonth() - jd.getMonth();
  let days = ed.getDate() - jd.getDate();
  if (days < 0) { months--; days += new Date(ed.getFullYear(), ed.getMonth(), 0).getDate(); }
  if (months < 0) { years--; months += 12; }
  return { years: Math.max(0, years), months: Math.max(0, months), days: Math.max(0, days) };
}

export function getNoticeRequired(joinDate: string, endDate: string): number {
  const t = calcTenure(joinDate, endDate), m = t.years * 12 + t.months;
  if (m < 3) return 0; if (m < 12) return 10; if (m < 36) return 20; return 30;
}

export function calcAnnualLeave(tenure: Tenure): number {
  const m = tenure.years * 12 + tenure.months;
  if (m < 6) return 0; if (m < 12) return 3; if (m < 24) return 7;
  if (m < 36) return 10; if (m < 60) return 14; if (m < 120) return 15;
  return Math.min(30, 15 + Math.floor((m - 120) / 12));
}

export function calcJobSearchLeave(noticeDays: number): number {
  return noticeDays === 0 ? 0 : Math.ceil(noticeDays / 7) * 2;
}

export function calcSeverancePay(tenure: Tenure, monthlySalary: number): number {
  const m = tenure.years * 12 + tenure.months;
  return Math.min((m / 12) * 0.5 * monthlySalary, monthlySalary * 6);
}

export function calcUnemploymentBenefit(insuredSalary: number, dependents: number): number {
  return Math.round(insuredSalary * (0.6 + Math.min(dependents * 0.1, 0.2)));
}

export function getUnemploymentMonths(isOver45: boolean, hasDisability: boolean): number {
  return isOver45 || hasDisability ? 9 : 6;
}

export function performCalculation(form: FormData, dateMode: DateMode): CalcResult {
  if (!form.joinDate) return getEmptyCalcResult();
  const ref = form.leaveDate || new Date().toISOString().split('T')[0];
  const t = calcTenure(form.joinDate, ref), n = getNoticeRequired(form.joinDate, ref);
  const a = calcAnnualLeave(t), js = calcJobSearchLeave(n), rem = Math.max(0, a - form.usedAnnualLeave);
  const d = form.monthlySalary / 30, lc = rem * d;
  const sev = form.isInvoluntary ? calcSeverancePay(t, form.monthlySalary) : 0;
  const nw = form.isInvoluntary ? n * d : 0;
  const ins = form.insuredSalary || form.monthlySalary;
  const ub = form.isInvoluntary && form.insuranceYears >= 1 ? calcUnemploymentBenefit(ins, form.dependents) : 0;
  const um = getUnemploymentMonths(form.isOver45, form.hasDisability);
  const r: CalcResult = { tenure: t, noticeRequired: n, annualLeave: a, jobSearchLeave: js, remainingLeave: rem,
    leaveCompensation: lc, severancePay: sev, noticeWage: nw, unemploymentBenefit: ub, unemploymentMonths: um,
    trainingAllowance: ub, totalGovernmentBenefit: ub * um, deadlineToResign: '', earliestLeaveDate: '' };
  if (dateMode === 'known' && form.leaveDate) { const x = new Date(form.leaveDate); x.setDate(x.getDate() - n); r.deadlineToResign = x.toISOString().split('T')[0]; }
  else { const x = new Date(ref); x.setDate(x.getDate() + n); r.earliestLeaveDate = x.toISOString().split('T')[0]; }
  return r;
}

export function getEmptyCalcResult(): CalcResult {
  return { tenure: { years: 0, months: 0, days: 0 }, noticeRequired: 0, deadlineToResign: '', earliestLeaveDate: '',
    annualLeave: 0, jobSearchLeave: 0, remainingLeave: 0, leaveCompensation: 0, severancePay: 0, noticeWage: 0,
    unemploymentBenefit: 0, unemploymentMonths: 0, trainingAllowance: 0, totalGovernmentBenefit: 0 };
}

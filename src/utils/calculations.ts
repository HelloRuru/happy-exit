/**
 * Calculation Utilities
 * 依《勞基法》與《就業保險法》計算
 */

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
  const tenure = calcTenure(joinDate, endDate);
  const totalMonths = tenure.years * 12 + tenure.months;
  if (totalMonths < 3) return 0;
  if (totalMonths < 12) return 10;
  if (totalMonths < 36) return 20;
  return 30;
}

export function calcAnnualLeave(tenure: Tenure): number {
  const totalMonths = tenure.years * 12 + tenure.months;
  if (totalMonths < 6) return 0;
  if (totalMonths < 12) return 3;
  if (totalMonths < 24) return 7;
  if (totalMonths < 36) return 10;
  if (totalMonths < 60) return 14;
  if (totalMonths < 120) return 15;
  return Math.min(30, 15 + Math.floor((totalMonths - 120) / 12));
}

export function calcJobSearchLeave(noticeDays: number): number {
  return noticeDays === 0 ? 0 : Math.ceil(noticeDays / 7) * 2;
}

export function calcSeverancePay(tenure: Tenure, monthlySalary: number): number {
  const totalMonths = tenure.years * 12 + tenure.months;
  return Math.min((totalMonths / 12) * 0.5 * monthlySalary, monthlySalary * 6);
}

export function calcUnemploymentBenefit(insuredSalary: number, dependents: number): number {
  const baseRate = 0.6;
  const dependentRate = Math.min(dependents * 0.1, 0.2);
  return Math.round(insuredSalary * (baseRate + dependentRate));
}

export function getUnemploymentMonths(isOver45: boolean, hasDisability: boolean): number {
  return isOver45 || hasDisability ? 9 : 6;
}

export function performCalculation(form: FormData, dateMode: DateMode): CalcResult {
  const { joinDate, leaveDate } = form;
  if (!joinDate) return getEmptyCalcResult();
  const refDate = leaveDate || new Date().toISOString().split('T')[0];
  const tenure = calcTenure(joinDate, refDate);
  const notice = getNoticeRequired(joinDate, refDate);
  const annual = calcAnnualLeave(tenure);
  const jobSearch = calcJobSearchLeave(notice);
  const remaining = Math.max(0, annual - form.usedAnnualLeave);
  const daily = form.monthlySalary / 30;
  const leaveComp = remaining * daily;
  const severance = form.isInvoluntary ? calcSeverancePay(tenure, form.monthlySalary) : 0;
  const noticeWage = form.isInvoluntary ? notice * daily : 0;
  const insured = form.insuredSalary || form.monthlySalary;
  const monthlyUnemployment = form.isInvoluntary && form.insuranceYears >= 1 ? calcUnemploymentBenefit(insured, form.dependents) : 0;
  const unemploymentMonths = getUnemploymentMonths(form.isOver45, form.hasDisability);
  const baseCalc: CalcResult = {
    tenure, noticeRequired: notice, annualLeave: annual, jobSearchLeave: jobSearch,
    remainingLeave: remaining, leaveCompensation: leaveComp, severancePay: severance,
    noticeWage, unemploymentBenefit: monthlyUnemployment, unemploymentMonths,
    trainingAllowance: monthlyUnemployment, totalGovernmentBenefit: monthlyUnemployment * unemploymentMonths,
    deadlineToResign: '', earliestLeaveDate: '',
  };
  if (dateMode === 'known' && leaveDate) {
    const d = new Date(leaveDate); d.setDate(d.getDate() - notice);
    baseCalc.deadlineToResign = d.toISOString().split('T')[0];
  } else {
    const d = new Date(refDate); d.setDate(d.getDate() + notice);
    baseCalc.earliestLeaveDate = d.toISOString().split('T')[0];
  }
  return baseCalc;
}

export function getEmptyCalcResult(): CalcResult {
  return {
    tenure: { years: 0, months: 0, days: 0 }, noticeRequired: 0, deadlineToResign: '',
    earliestLeaveDate: '', annualLeave: 0, jobSearchLeave: 0, remainingLeave: 0,
    leaveCompensation: 0, severancePay: 0, noticeWage: 0, unemploymentBenefit: 0,
    unemploymentMonths: 0, trainingAllowance: 0, totalGovernmentBenefit: 0,
  };
}

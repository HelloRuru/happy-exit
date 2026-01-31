export type Priority = 'must' | 'should' | 'optional';

export interface ChecklistItem {
  id: string;
  text: string;
  checked: boolean;
  category: string;
  priority: Priority;
  note?: string;
}

export type ToneType = 'formal' | 'friendly' | 'simple';
export type DateMode = 'known' | 'unknown';

export interface FormData {
  joinDate: string;
  leaveDate: string;
  company: string;
  department: string;
  position: string;
  supervisorName: string;
  employeeName: string;
  reasons: string[];
  reasonOther: string;
  tone: ToneType;
  hasHandover: boolean;
  gratitude: string;
  monthlySalary: number;
  insuredSalary: number;
  usedAnnualLeave: number;
  isInvoluntary: boolean;
  dependents: number;
  isOver45: boolean;
  hasDisability: boolean;
  insuranceYears: number;
}

export interface Tenure {
  years: number;
  months: number;
  days: number;
}

export interface CalcResult {
  tenure: Tenure;
  noticeRequired: number;
  deadlineToResign: string;
  earliestLeaveDate: string;
  annualLeave: number;
  jobSearchLeave: number;
  remainingLeave: number;
  leaveCompensation: number;
  severancePay: number;
  noticeWage: number;
  unemploymentBenefit: number;
  unemploymentMonths: number;
  trainingAllowance: number;
  totalGovernmentBenefit: number;
}

export type StageName = 
  | 'welcome' | 'join-date' | 'leave-date' | 'salary-info'
  | 'result' | 'menu' | 'letter-info' | 'letter-result'
  | 'job-search' | 'checklist' | 'rights' | 'digital' | 'complete';

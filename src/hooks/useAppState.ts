/**
 * App State Hook - 狀態管理
 */
import { useState, useEffect } from 'react';
import type { FormData, CalcResult, ChecklistItem, StageName, DateMode } from '../types';
import { DEFAULT_CHECKLIST, STORAGE_KEY } from '../constants';
import { performCalculation, getEmptyCalcResult } from '../utils/calculations';

export function useAppState() {
  const [stage, setStage] = useState<StageName>('welcome');
  const [dateMode, setDateMode] = useState<DateMode>('known');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  
  const [form, setForm] = useState<FormData>({
    joinDate: '', leaveDate: '', company: '', department: '', position: '',
    supervisorName: '', employeeName: '', reasons: [], reasonOther: '',
    tone: 'friendly', hasHandover: true, gratitude: '', monthlySalary: 0,
    insuredSalary: 0, usedAnnualLeave: 0, isInvoluntary: false,
    dependents: 0, isOver45: false, hasDisability: false, insuranceYears: 1,
  });

  const [calc, setCalc] = useState<CalcResult>(getEmptyCalcResult());
  const [checklist, setChecklist] = useState<ChecklistItem[]>(DEFAULT_CHECKLIST);

  // LocalStorage
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

  const doCalc = () => setCalc(performCalculation(form, dateMode));
  const copy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };
  const reset = () => { if (confirm('確定重新開始？')) { localStorage.removeItem(STORAGE_KEY); location.reload(); } };
  const updateForm = <K extends keyof FormData>(key: K, value: FormData[K]) => setForm(prev => ({ ...prev, [key]: value }));
  const toggleCheck = (id: string) => setChecklist(p => p.map(i => i.id === id ? { ...i, checked: !i.checked } : i));
  const getLeaveDate = () => dateMode === 'known' ? form.leaveDate : (calc.earliestLeaveDate || new Date().toISOString().split('T')[0]);

  return {
    stage, setStage, dateMode, setDateMode, copiedId, form, calc, checklist,
    doCalc, copy, reset, updateForm, toggleCheck, getLeaveDate,
  };
}

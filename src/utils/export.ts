/**
 * Export Utilities - CSV/HTML
 */
import type { ChecklistItem } from '../types';

export function exportToCSV(items: ChecklistItem[]): void {
  const headers = ['項目', '分類', '優先度', '備註', '狀態'];
  const priorityMap = { must: '必做', should: '建議', optional: '可選' };
  const rows = items.map(item => [item.text, item.category, priorityMap[item.priority], item.note || '', item.checked ? '✓' : '']);
  const csvContent = [headers, ...rows].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
  const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
  downloadBlob(blob, '離職清單.csv');
}

export function exportToHTML(items: ChecklistItem[]): void {
  const categories = [...new Set(items.map(i => i.category))];
  const html = `<!DOCTYPE html><html lang="zh-TW"><head><meta charset="UTF-8"><title>離職清單</title><style>body{font-family:'Microsoft JhengHei',sans-serif;padding:20px}h1{color:#D4A5A5}h2{color:#B8A9C9;margin-top:20px}.item{margin:8px 0}.note{color:#888;font-size:12px}</style></head><body><h1>離職交接清單</h1><p>產生日期：${new Date().toLocaleDateString('zh-TW')}</p>${categories.map(cat => `<h2>${cat}</h2>${items.filter(i => i.category === cat).map(i => `<div class="item">□ ${i.text}${i.note ? `<span class="note">（${i.note}）</span>` : ''}</div>`).join('')}`).join('')}</body></html>`;
  const blob = new Blob([html], { type: 'text/html;charset=utf-8;' });
  downloadBlob(blob, '離職清單.html');
}

function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try { await navigator.clipboard.writeText(text); return true; } catch { return false; }
}

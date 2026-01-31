import type { ChecklistItem } from '../types';

export function exportToCSV(items: ChecklistItem[]): void {
  const h = ['項目', '分類', '優先度', '備註', '狀態'];
  const pm = { must: '必做', should: '建議', optional: '可選' };
  const r = items.map(i => [i.text, i.category, pm[i.priority], i.note || '', i.checked ? '✓' : '']);
  const c = [h, ...r].map(x => x.map(y => `"${y}"`).join(',')).join('\n');
  const b = new Blob(['\uFEFF' + c], { type: 'text/csv;charset=utf-8;' });
  dl(b, '離職清單.csv');
}

export function exportToHTML(items: ChecklistItem[]): void {
  const cats = [...new Set(items.map(i => i.category))];
  const html = `<!DOCTYPE html><html lang="zh-TW"><head><meta charset="UTF-8"><title>離職清單</title><style>body{font-family:'Microsoft JhengHei',sans-serif;padding:20px}h1{color:#D4A5A5}h2{color:#B8A9C9;margin-top:20px}.item{margin:8px 0}.note{color:#888;font-size:12px}</style></head><body><h1>離職交接清單</h1><p>產生日期：${new Date().toLocaleDateString('zh-TW')}</p>${cats.map(c => `<h2>${c}</h2>${items.filter(i => i.category === c).map(i => `<div class="item">□ ${i.text}${i.note ? `<span class="note">（${i.note}）</span>` : ''}</div>`).join('')}`).join('')}</body></html>`;
  const b = new Blob([html], { type: 'text/html;charset=utf-8;' });
  dl(b, '離職清單.html');
}

function dl(b: Blob, f: string) { const u = URL.createObjectURL(b), a = document.createElement('a'); a.href = u; a.download = f; a.click(); URL.revokeObjectURL(u); }
export async function copyToClipboard(t: string): Promise<boolean> { try { await navigator.clipboard.writeText(t); return true; } catch { return false; } }

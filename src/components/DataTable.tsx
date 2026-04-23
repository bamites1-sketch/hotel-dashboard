import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ChevronUp, ChevronDown, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import type { TableRow } from '../types';
import { Badge } from './ui/Badge';
import { Avatar } from './ui/Avatar';
import { formatCurrency, formatDate } from '../lib/utils';

interface Props { data: TableRow[] }

type SortKey = keyof TableRow;
type SortDir = 'asc' | 'desc';

const statusVariant = { active: 'success', inactive: 'danger', pending: 'warning' } as const;

export const DataTable: React.FC<Props> = ({ data }) => {
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('name');
  const [sortDir, setSortDir] = useState<SortDir>('asc');
  const [page, setPage] = useState(1);
  const perPage = 8;

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return data.filter(r => r.name.toLowerCase().includes(q) || r.email.toLowerCase().includes(q) || r.role.toLowerCase().includes(q));
  }, [data, search]);

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      const av = a[sortKey]; const bv = b[sortKey];
      const cmp = typeof av === 'number' ? av - (bv as number) : String(av).localeCompare(String(bv));
      return sortDir === 'asc' ? cmp : -cmp;
    });
  }, [filtered, sortKey, sortDir]);

  const paginated = sorted.slice((page - 1) * perPage, page * perPage);
  const totalPages = Math.ceil(sorted.length / perPage);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('asc'); }
    setPage(1);
  };

  const SortIcon = ({ col }: { col: SortKey }) => (
    <span className="ml-1 inline-flex flex-col">
      <ChevronUp className={`w-3 h-3 ${sortKey === col && sortDir === 'asc' ? 'text-primary-500' : 'text-gray-300 dark:text-gray-600'}`} />
      <ChevronDown className={`w-3 h-3 -mt-1 ${sortKey === col && sortDir === 'desc' ? 'text-primary-500' : 'text-gray-300 dark:text-gray-600'}`} />
    </span>
  );

  return (
    <div className="card overflow-hidden">
      {/* Search */}
      <div className="p-4 border-b border-gray-100 dark:border-gray-800">
        <div className="relative max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="search" placeholder="Search users..." value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }}
            className="input-field pl-9 py-2 text-sm"
            aria-label="Search users"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm" role="table">
          <thead>
            <tr className="border-b border-gray-100 dark:border-gray-800">
              {[
                { key: 'name' as SortKey, label: 'User' },
                { key: 'role' as SortKey, label: 'Role' },
                { key: 'status' as SortKey, label: 'Status' },
                { key: 'revenue' as SortKey, label: 'Revenue' },
                { key: 'joined' as SortKey, label: 'Joined' },
              ].map(col => (
                <th key={col.key} className="text-left px-4 py-3 font-semibold text-gray-500 dark:text-gray-400 cursor-pointer hover:text-gray-900 dark:hover:text-gray-100 transition-colors select-none"
                  onClick={() => handleSort(col.key)} scope="col">
                  <span className="flex items-center">{col.label}<SortIcon col={col.key} /></span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginated.map((row, i) => (
              <motion.tr key={row.id} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
                className="border-b border-gray-50 dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Avatar name={row.name} size="sm" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-gray-100">{row.name}</p>
                      <p className="text-xs text-gray-500">{row.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{row.role}</td>
                <td className="px-4 py-3">
                  <Badge variant={statusVariant[row.status]}>{row.status}</Badge>
                </td>
                <td className="px-4 py-3 font-medium text-gray-900 dark:text-gray-100">{formatCurrency(row.revenue)}</td>
                <td className="px-4 py-3 text-gray-500">{formatDate(row.joined)}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100 dark:border-gray-800">
        <p className="text-sm text-gray-500">Showing {(page - 1) * perPage + 1}–{Math.min(page * perPage, sorted.length)} of {sorted.length}</p>
        <div className="flex items-center gap-1">
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
            className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors" aria-label="Previous page">
            <ChevronLeft className="w-4 h-4" />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
            <button key={p} onClick={() => setPage(p)}
              className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${p === page ? 'bg-primary-500 text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400'}`}
              aria-label={`Page ${p}`} aria-current={p === page ? 'page' : undefined}>
              {p}
            </button>
          ))}
          <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
            className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors" aria-label="Next page">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

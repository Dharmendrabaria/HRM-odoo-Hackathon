import { useState, useMemo } from "react";
import { Search, ChevronLeft, ChevronRight, SlidersHorizontal, Download } from "lucide-react";
import Button from "../common/Button";
import Input from "../common/Input";
import { cn } from "../../utils/cn";

const DataTable = ({ columns, data, actions, onRowClick, filterOptions, selectable = false, onSelectionChange }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [selectedRows, setSelectedRows] = useState([]);

  const filteredData = useMemo(() => {
    return data.filter((item) =>
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [data, searchTerm]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allIds = currentData.map(d => d.id);
      setSelectedRows(allIds);
      onSelectionChange && onSelectionChange(allIds);
    } else {
      setSelectedRows([]);
      onSelectionChange && onSelectionChange([]);
    }
  };

  const handleSelectRow = (id) => {
    const newSelection = selectedRows.includes(id)
      ? selectedRows.filter(rowId => rowId !== id)
      : [...selectedRows, id];
    setSelectedRows(newSelection);
    onSelectionChange && onSelectionChange(newSelection);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="relative w-full md:w-80 group">
           <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors" />
           <input
             type="text"
             placeholder="Filter records..."
             className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-primary outline-none focus:ring-2 focus:ring-slate-900/5 focus:border-slate-900 transition-all shadow-subtle"
             value={searchTerm}
             onChange={(e) => setSearchTerm(e.target.value)}
           />
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
            {filterOptions}
            {actions}
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-subtle">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-black text-muted uppercase tracking-widest">
                {selectable && (
                    <th className="py-4 px-6 w-12">
                        <input type="checkbox" onChange={handleSelectAll} checked={selectedRows.length === currentData.length && currentData.length > 0} className="w-4 h-4 rounded-md border-slate-200 text-primary focus:ring-primary bg-white" />
                    </th>
                )}
                {columns.map((col) => (
                  <th key={col.key} className={cn("py-4 px-6", col.className)}>
                    {col.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {currentData.length > 0 ? (
                currentData.map((row, idx) => (
                  <tr
                    key={row.id || idx}
                    onClick={() => onRowClick && onRowClick(row)}
                    className={cn(
                      "hover:bg-slate-50/50 transition-colors group",
                      idx % 2 !== 0 && "bg-slate-50/20",
                      onRowClick && "cursor-pointer"
                    )}
                  >
                     {selectable && (
                        <td className="py-4 px-6" onClick={(e) => e.stopPropagation()}>
                            <input type="checkbox" checked={selectedRows.includes(row.id)} onChange={() => handleSelectRow(row.id)} className="w-4 h-4 rounded-md border-slate-200 text-primary focus:ring-primary" />
                        </td>
                    )}
                    {columns.map((col) => (
                      <td key={col.key} className={cn("py-4 px-6 text-sm text-primary font-medium", col.className)}>
                        {col.render ? col.render(row) : row[col.key]}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length + (selectable ? 1 : 0)} className="py-20 text-center text-muted text-xs italic font-medium">
                    No matching records found in database.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 bg-slate-50/30 border-t border-slate-100">
            <p className="text-[10px] font-black text-muted uppercase tracking-widest">
              Record <span className="text-primary font-bold">{(currentPage - 1) * itemsPerPage + 1}</span> to{" "}
              <span className="text-primary font-bold">{Math.min(currentPage * itemsPerPage, filteredData.length)}</span> of{" "}
              <span className="text-primary font-bold">{filteredData.length}</span> entries
            </p>
            <div className="flex gap-1">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-subtle"
                title="Previous Batch"
              >
                <ChevronLeft size={16} className="text-primary" />
              </button>
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-subtle"
                title="Next Batch"
              >
                <ChevronRight size={16} className="text-primary" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataTable;

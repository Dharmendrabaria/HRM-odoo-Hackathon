import React from "react";
import PageWrapper from "../../components/layout/PageWrapper";
import OrgChart from "../../components/orgchart/OrgChart";
import { Search, Filter, Share2, Download, Users } from "lucide-react";
import Button from "../../components/common/Button";

const OrgChartPage = () => {
  return (
    <PageWrapper>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2 opacity-50">
            <Users size={14} className="text-primary" />
            <span className="text-primary font-black tracking-[0.2em] text-[10px] uppercase">Corporate Tree</span>
          </div>
          <h1 className="text-4xl font-black text-primary tracking-tighter">Organizational Hierarchy</h1>
          <p className="text-muted text-sm mt-1 font-medium leading-relaxed">Structural visualization of reporting lines and operational units.</p>
        </div>

        <div className="flex gap-3">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder="Search personnel or role..." 
              className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-slate-900/5 focus:border-slate-900 transition-all text-xs font-bold text-primary w-64"
            />
          </div>
          <Button variant="secondary" className="p-2.5">
            <Share2 size={16} />
          </Button>
          <Button variant="secondary" className="p-2.5">
            <Download size={16} />
          </Button>
        </div>
      </div>

      <div className="h-px bg-slate-100 mb-8"></div>

      <div className="bg-slate-50/50 rounded-xl border border-slate-200 border-dashed p-4 min-h-[750px] overflow-hidden">
        <OrgChart />
      </div>
    </PageWrapper>
  );
};

export default OrgChartPage;

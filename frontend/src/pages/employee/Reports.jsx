import PageWrapper from "../../components/layout/PageWrapper";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import { FileText, Download } from "lucide-react";

const EmployeeReports = () => {
  const reports = [
    { title: "Monthly Attendance Report", desc: "Detailed log of check-in and check-out times for the current month." },
    { title: "Annual Leave Summary", desc: "Overview of taken and remaining leaves for the fiscal year." },
    { title: "Salary Slips (YTD)", desc: "Consolidated payslips from Jan to present." },
    { title: "Tax Deduction Statement", desc: "Estimated tax breakdown and savings proofs." },
  ];

  return (
    <PageWrapper>
       <h1 className="text-2xl font-bold text-gray-900 mb-6">Reports & Documents</h1>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reports.map((report, idx) => (
             <Card key={idx} className="flex flex-col justify-between">
                <div>
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-gray-100 rounded-lg text-gray-600">
                            <FileText size={20} />
                        </div>
                        <h3 className="font-semibold text-gray-900">{report.title}</h3>
                    </div>
                    <p className="text-gray-500 text-sm mb-6">{report.desc}</p>
                </div>
                <Button variant="outline" className="flex items-center justify-center gap-2">
                    <Download size={16} /> Download PDF
                </Button>
             </Card>
          ))}
       </div>
    </PageWrapper>
  );
};

export default EmployeeReports;

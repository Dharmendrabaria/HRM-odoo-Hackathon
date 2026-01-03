import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../../components/layout/PageWrapper";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import Badge from "../../components/common/Badge";
import Modal from "../../components/common/Modal";
import Input from "../../components/common/Input";
import DataTable from "../../components/tables/DataTable";
import { Plus, Edit2, Trash2, MoreVertical, CheckSquare, XSquare, UserPlus, Filter } from "lucide-react";
import { useToast } from "../../context/ToastContext";
import api from "../../services/api";

const AdminEmployees = () => {
    const navigate = useNavigate();
    const { addToast } = useToast();
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedRows, setSelectedRows] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingEmp, setEditingEmp] = useState(null);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const { data } = await api.get('/users');
                if (data.success) {
                  // Transform backend data to match current structure if needed, or use as is
                  const mapped = data.data.map(u => ({
                      id: u._id,
                      name: u.name,
                      email: u.email,
                      avatar: u.profileImage, // Ensure backend sends this profileImage
                      role: u.role,
                      department: u.department,
                      designation: u.designation,
                      status: u.status
                  }));
                  setEmployees(mapped);
                }
            } catch (error) {
                console.error("Failed to fetch employees", error);
                addToast("Failed to load employee directory", "error");
            } finally {
                setLoading(false);
            }
        };

        fetchEmployees();
    }, []);

    const handleDelete = (id) => {
        if(window.confirm("Confirm deletion of this personnel record?")) {
            setEmployees(employees.filter(e => e.id !== id));
            addToast("Record purged from database", "success");
        }
    };

    const handleBulkDelete = () => {
        if(window.confirm(`Formally delete ${selectedRows.length} selected records?`)) {
            setEmployees(employees.filter(e => !selectedRows.includes(e.id)));
            setSelectedRows([]);
            addToast("Batch operation successful", "success");
        }
    };

    const handleSave = (e) => {
        e.preventDefault();
        setIsModalOpen(false);
        addToast("Personnel documentation updated", "success");
    };

    const columns = [
        {
            key: "name",
            header: "Personnel Identifier",
            render: (row) => (
                <div className="flex items-center gap-3">
                    <img src={row.avatar || `https://ui-avatars.com/api/?name=${row.name}&background=0f172a&color=fff`} alt="" className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200" />
                    <div className="min-w-0">
                        <p className="text-sm font-bold text-primary truncate">{row.name}</p>
                        <p className="text-[10px] text-muted font-bold uppercase tracking-tight truncate">{row.email}</p>
                    </div>
                </div>
            )
        },
        { 
            key: "department", 
            header: "Assigned Unit",
            render: (row) => <span className="text-[11px] font-black text-muted uppercase tracking-widest">{row.department}</span>
        },
        { 
            key: "status", 
            header: "Operational Status", 
            render: (row) => <Badge variant="success">Active Service</Badge> 
        },
        {
            key: "actions",
            header: "Governance",
            className: "text-right",
            render: (row) => (
                <div className="flex justify-end gap-1">
                     <button className="p-2 text-slate-300 hover:text-primary transition-colors" onClick={(e) => { e.stopPropagation(); setEditingEmp(row); setIsModalOpen(true); }}>
                        <Edit2 size={14} />
                    </button>
                    <button className="p-2 text-slate-300 hover:text-error transition-colors" onClick={(e) => { e.stopPropagation(); handleDelete(row.id); }}>
                        <Trash2 size={14} />
                    </button>
                </div>
            )
        }
    ];

    return (
        <div className="space-y-6 md:space-y-8 animate-in fade-in duration-500">
             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                   <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground">Personnel Directory</h1>
                   <p className="text-muted text-xs md:text-sm mt-0.5">Global management of institutional service-agreements</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                    {selectedRows.length > 0 && (
                        <Button variant="danger" size="md" onClick={handleBulkDelete} className="w-full sm:w-auto">
                             Purge Batch ({selectedRows.length})
                        </Button>
                    )}
                    <Button variant="primary" size="md" className="flex items-center gap-2 w-full sm:w-auto" onClick={() => navigate("/admin/onboarding")}>
                        <UserPlus size={18} /> 
                        <span>Add Personnel</span>
                    </Button>
                </div>
            </div>

            <DataTable 
                columns={columns} 
                data={employees} 
                selectable
                onSelectionChange={setSelectedRows}
                filterOptions={
                    <select className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-primary outline-none focus:ring-2 focus:ring-slate-900/5 focus:border-slate-900 transition-all shadow-subtle min-w-[200px]">
                        <option value="">Sort by Unit: All</option>
                        <option value="Engineering">Engineering Division</option>
                        <option value="HR">Human Resources</option>
                        <option value="Design">Creative Studio</option>
                    </select>
                }
            />

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingEmp ? "Modify Personnel Record" : "Enact New Record"}>
                <form onSubmit={handleSave} className="space-y-6">
                    <Input label="Legal Name" defaultValue={editingEmp?.name} placeholder="John Doe" />
                    <Input label="Institutional Email" defaultValue={editingEmp?.email} placeholder="john@company.com" />
                    <div className="grid grid-cols-2 gap-4">
                        <Input label="Departmental Unit" defaultValue={editingEmp?.department} placeholder="Engineering" />
                        <Input label="Official Designation" defaultValue={editingEmp?.designation} placeholder="Software Engineer" />
                    </div>
                    <div className="flex justify-end gap-3 pt-6 border-t border-slate-50">
                        <Button variant="secondary" type="button" onClick={() => setIsModalOpen(false)}>Dismiss</Button>
                        <Button type="submit">Finalize Record</Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default AdminEmployees;

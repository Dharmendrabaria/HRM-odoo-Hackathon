import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../components/common/Card";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import { useToast } from "../../context/ToastContext";
import { Upload, ArrowRight, ArrowLeft, ShieldCheck, User, LifeBuoy, FileText } from "lucide-react";
import { cn } from "../../utils/cn";

const CompleteProfile = () => {
    const navigate = useNavigate();
    const { addToast } = useToast();
    const [step, setStep] = useState(1);
    
    const handleNext = () => {
        if(step < 3) setStep(step + 1);
        else {
            addToast("Personnel profile finalized", "success");
            navigate("/employee/dashboard");
        }
    };

    const steps = [
        { id: 1, title: "MetaData", icon: User },
        { id: 2, title: "Emergency", icon: LifeBuoy },
        { id: 3, title: "Artifacts", icon: FileText },
    ];

    return (
        <div className="min-h-screen bg-slate-50 py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                <div className="mb-12 text-center">
                    <div className="w-12 h-12 bg-white rounded-xl shadow-subtle border border-slate-100 flex items-center justify-center mx-auto mb-6">
                        <ShieldCheck size={24} className="text-primary" />
                    </div>
                    <h1 className="text-3xl font-black text-primary tracking-tighter">Identity Verification</h1>
                    <p className="text-muted text-sm mt-2 font-medium">Please finalize your institutional profile to activate your service credentials.</p>
                </div>

                <div className="flex justify-between items-center mb-12 px-4 relative">
                    <div className="absolute top-5 left-8 right-8 h-px bg-slate-100 -z-10"></div>
                    {steps.map((s, idx) => {
                        const Icon = s.icon;
                        const isActive = step >= s.id;
                        return (
                            <div key={s.id} className="flex flex-col items-center bg-slate-50 px-2">
                                <div className={cn(
                                    "w-10 h-10 rounded-lg flex items-center justify-center border transition-all duration-300",
                                    isActive 
                                        ? "bg-primary border-primary text-white shadow-premium scale-110" 
                                        : "bg-white border-slate-200 text-slate-300"
                                )}>
                                    <Icon size={18} />
                                </div>
                                <span className={cn(
                                    "text-[9px] font-black uppercase tracking-widest mt-3 transition-colors",
                                    step === s.id ? "text-primary" : "text-muted"
                                )}>{s.title}</span>
                            </div>
                        )
                    })}
                </div>

                <Card className="shadow-premium border-slate-200">
                    {step === 1 && (
                        <div className="space-y-8 animate-in slide-in-from-right-2 fade-in duration-300">
                             <div>
                                <h2 className="text-lg font-bold text-primary tracking-tight">Personnel Information</h2>
                                <p className="text-[10px] text-muted font-black uppercase tracking-widest mt-1">Institutional Identification Data</p>
                             </div>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Input label="Full Legal Identity" defaultValue="John Doe" />
                                <Input label="Contact Number" placeholder="+1 (555) 000-0000" />
                                <Input label="Chronological Origin (DOB)" type="date" />
                                <Input label="Residential Coordinates" placeholder="123 Sector, Corporate District" />
                             </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-8 animate-in slide-in-from-right-2 fade-in duration-300">
                             <div>
                                <h2 className="text-lg font-bold text-primary tracking-tight">Emergency Contingency</h2>
                                <p className="text-[10px] text-muted font-black uppercase tracking-widest mt-1">Incident Management Contact</p>
                             </div>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Input label="Proxy Identity" placeholder="Jane Doe" />
                                <Input label="Relational Status" placeholder="Spouse / Parent" />
                                <Input label="Contingency Contact" placeholder="+1 (555) 999-9999" />
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="space-y-8 animate-in slide-in-from-right-2 fade-in duration-300">
                            <div>
                                <h2 className="text-lg font-bold text-primary tracking-tight">Artifact Sequential Transmission</h2>
                                <p className="text-[10px] text-muted font-black uppercase tracking-widest mt-1">Verification Documentation</p>
                             </div>
                             <div className="border-2 border-dashed border-slate-200 rounded-lg p-12 text-center hover:border-primary hover:bg-slate-50/50 transition-all cursor-pointer group">
                                <Upload className="mx-auto text-slate-300 group-hover:text-primary mb-4 transition-colors" size={32} />
                                <p className="text-xs font-bold text-primary">Execute ID Proof Transmission</p>
                                <p className="text-[10px] text-muted font-black uppercase tracking-widest mt-2">Format: PNG, JPG, PDF (Limit 5MB)</p>
                            </div>
                        </div>
                    )}

                    <div className="mt-12 pt-8 border-t border-slate-100 flex justify-end gap-3">
                        {step > 1 && (
                            <Button variant="secondary" onClick={() => setStep(step - 1)} className="flex items-center gap-2">
                                <ArrowLeft size={16} /> Previous
                            </Button>
                        )}
                        <Button onClick={handleNext} className="flex items-center gap-2 px-8">
                            {step === 3 ? "Finalize Profile" : "Continue Sequence"} <ArrowRight size={16} />
                        </Button>
                    </div>
                </Card>

                <p className="mt-8 text-center text-[10px] text-muted font-black uppercase tracking-widest opacity-40">
                    DayFlow Governance Framework • Institutional Service Induction
                </p>
            </div>
        </div>
    );
};

export default CompleteProfile;

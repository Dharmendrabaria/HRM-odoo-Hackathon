import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../../components/layout/PageWrapper";
import Card from "../../components/common/Card";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import { useToast } from "../../context/ToastContext";
import { UserPlus, Mail, Briefcase, FileText, CheckCircle, ArrowRight, ArrowLeft, ShieldCheck } from "lucide-react";
import { cn } from "../../utils/cn";
import api from "../../services/api";

const OnboardingWizard = () => {
    const { addToast } = useToast();
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        firstName: "", 
        lastName: "", 
        email: "", 
        phone: "",
        employeeId: "",
        department: "", 
        designation: "", 
        joiningDate: "", 
        salary: "",
        password: "",
        confirmPassword: "",
        role: "employee"
    });

    const validateStep = (currentStep) => {
        const newErrors = {};
        
        if (currentStep === 1) {
            if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
            if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
            if (!formData.email.trim()) newErrors.email = "Email is required";
            else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format";
            if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
            if (!formData.employeeId.trim()) newErrors.employeeId = "Employee ID is required";
        }
        
        if (currentStep === 2) {
            if (!formData.department.trim()) newErrors.department = "Department is required";
            if (!formData.designation.trim()) newErrors.designation = "Designation is required";
            if (!formData.joiningDate) newErrors.joiningDate = "Joining date is required";
            if (!formData.password) newErrors.password = "Password is required";
            else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
            if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (validateStep(step)) {
            setStep(prev => prev + 1);
        }
    };
    
    const handleBack = () => setStep(prev => prev - 1);
    
    const handleSubmit = async () => {
        if (!validateStep(2)) return;
        
        try {
            setLoading(true);
            
            const employeeData = {
                name: `${formData.firstName} ${formData.lastName}`,
                email: formData.email,
                password: formData.password,
                employeeId: formData.employeeId,
                phone: formData.phone,
                department: formData.department,
                designation: formData.designation,
                role: formData.role,
                status: "active"
            };

            const { data } = await api.post('/auth/register', employeeData);
            
            if (data.success) {
                addToast(`Employee ${formData.firstName} ${formData.lastName} added successfully!`, "success");
                setStep(1);
                setFormData({
                    firstName: "", lastName: "", email: "", phone: "", employeeId: "",
                    department: "", designation: "", joiningDate: "", salary: "",
                    password: "", confirmPassword: "", role: "employee"
                });
                setErrors({});
                
                // Navigate back to employees page after 1.5 seconds
                setTimeout(() => navigate('/admin/employees'), 1500);
            }
        } catch (error) {
            console.error('Error adding employee:', error);
            const errorMsg = error.response?.data?.message || "Failed to add employee";
            addToast(errorMsg, "error");
        } finally {
            setLoading(false);
        }
    };

    const steps = [
        { id: 1, title: "Personal Info", icon: UserPlus },
        { id: 2, title: "Job & Security", icon: Briefcase },
    ];

    return (
        <PageWrapper>
            <div className="mb-8 max-w-4xl mx-auto">
              <div className="flex items-center gap-2 mb-2 opacity-50">
                <UserPlus size={14} className="text-primary" />
                <span className="text-primary font-black tracking-[0.2em] text-[10px] uppercase">Service Induction</span>
              </div>
              <h1 className="text-4xl font-black text-primary tracking-tighter">Onboarding Wizard</h1>
              <p className="text-muted text-sm mt-1 font-medium leading-relaxed">System-guided protocol for enrolling new personnel into institutional frameworks.</p>
            </div>

            <div className="flex justify-between items-center mb-12 max-w-4xl mx-auto px-4">
                {steps.map((s, idx) => {
                    const Icon = s.icon;
                    const isActive = step >= s.id;
                    const isCurrent = step === s.id;
                    return (
                        <div key={s.id} className="flex flex-col items-center relative z-10 flex-1">
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
                                isCurrent ? "text-primary" : "text-muted"
                            )}>{s.title}</span>
                            {idx !== steps.length - 1 && (
                                <div className={cn(
                                    "absolute top-5 left-[calc(50%+1.5rem)] w-[calc(100%-3rem)] h-px -z-10",
                                    step > s.id ? "bg-primary" : "bg-slate-100"
                                )}></div>
                            )}
                        </div>
                    )
                })}
            </div>

            <Card className="max-w-3xl mx-auto shadow-premium border-slate-200">
                {step === 1 && (
                    <div className="space-y-8 animate-in slide-in-from-right-2 fade-in duration-300">
                        <div>
                            <h2 className="text-xl font-bold text-primary tracking-tight">Personal Information</h2>
                            <p className="text-xs text-muted font-medium mt-1">Core employee details for the personnel record.</p>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <Input 
                                label="First Name" 
                                value={formData.firstName} 
                                onChange={e => setFormData({...formData, firstName: e.target.value})} 
                                placeholder="e.g. John"
                                error={errors.firstName}
                            />
                            <Input 
                                label="Last Name" 
                                value={formData.lastName} 
                                onChange={e => setFormData({...formData, lastName: e.target.value})} 
                                placeholder="e.g. Smith"
                                error={errors.lastName}
                            />
                            <Input 
                                label="Employee ID" 
                                value={formData.employeeId} 
                                onChange={e => setFormData({...formData, employeeId: e.target.value})} 
                                placeholder="e.g. EMP001"
                                error={errors.employeeId}
                            />
                            <Input 
                                label="Phone Number" 
                                value={formData.phone} 
                                onChange={e => setFormData({...formData, phone: e.target.value})} 
                                placeholder="+1 (000) 000-0000"
                                error={errors.phone}
                            />
                            <div className="col-span-2">
                                <Input 
                                    label="Email Address" 
                                    type="email" 
                                    value={formData.email} 
                                    onChange={e => setFormData({...formData, email: e.target.value})} 
                                    placeholder="email@company.com"
                                    error={errors.email}
                                />
                            </div>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="space-y-8 animate-in slide-in-from-right-2 fade-in duration-300">
                        <div>
                            <h2 className="text-xl font-bold text-primary tracking-tight">Job Details & Security</h2>
                            <p className="text-xs text-muted font-medium mt-1">Role assignment and account credentials.</p>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <Input 
                                label="Department" 
                                value={formData.department} 
                                onChange={e => setFormData({...formData, department: e.target.value})} 
                                placeholder="e.g. Engineering"
                                error={errors.department}
                            />
                            <Input 
                                label="Designation" 
                                value={formData.designation} 
                                onChange={e => setFormData({...formData, designation: e.target.value})} 
                                placeholder="e.g. Software Engineer"
                                error={errors.designation}
                            />
                            <Input 
                                label="Joining Date" 
                                type="date" 
                                value={formData.joiningDate} 
                                onChange={e => setFormData({...formData, joiningDate: e.target.value})}
                                error={errors.joiningDate}
                            />
                            <Input 
                                label="Annual Salary (Optional)" 
                                type="number" 
                                value={formData.salary} 
                                onChange={e => setFormData({...formData, salary: e.target.value})} 
                                placeholder="Enter annual salary"
                            />
                            <Input 
                                label="Password" 
                                type="password" 
                                value={formData.password} 
                                onChange={e => setFormData({...formData, password: e.target.value})} 
                                placeholder="Min. 6 characters"
                                error={errors.password}
                            />
                            <Input 
                                label="Confirm Password" 
                                type="password" 
                                value={formData.confirmPassword} 
                                onChange={e => setFormData({...formData, confirmPassword: e.target.value})} 
                                placeholder="Re-enter password"
                                error={errors.confirmPassword}
                            />
                        </div>
                    </div>
                )}

                <div className="flex justify-between mt-12 pt-8 border-t border-slate-100">
                    <Button variant="secondary" onClick={handleBack} disabled={step === 1 || loading} className="flex items-center gap-2">
                        <ArrowLeft size={16} /> Back
                    </Button>
                    <Button 
                        onClick={step === 2 ? handleSubmit : handleNext} 
                        disabled={loading}
                        className="flex items-center gap-2 px-8"
                    >
                        {loading ? "Adding Employee..." : (step === 2 ? "Add Employee" : "Continue")} 
                        {!loading && <ArrowRight size={16} />}
                    </Button>
                </div>
            </Card>
        </PageWrapper>
    );
};

export default OnboardingWizard;

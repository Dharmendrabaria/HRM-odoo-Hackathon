import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import PageWrapper from "../../components/layout/PageWrapper";
import Card from "../../components/common/Card";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import { User, Mail, Phone, MapPin, Briefcase, Calendar, ShieldCheck } from "lucide-react";
import Badge from "../../components/common/Badge";
import { cn } from "../../utils/cn";

const EmployeeProfile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    address: user?.address || "",
    phone: user?.phone || "",
    avatar: user?.avatar || "",
  });

  const handleSave = () => {
    setIsEditing(false);
    // Real API call would go here
  };

  return (
    <PageWrapper>
      <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-primary tracking-tighter">Personnel Profile</h1>
          <p className="text-muted text-sm mt-1">Manage institutional credentials and professional identity.</p>
        </div>
        <div className="flex gap-3">
          <Button 
            variant={"secondary"} 
            className="flex items-center gap-2"
          >
            <ShieldCheck size={16} /> Privacy
          </Button>
          <Button 
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          >
            {isEditing ? "Finalize Changes" : "Update Profile"}
          </Button>
        </div>
      </div>

      <div className="h-px bg-slate-100 mb-8"></div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <Card className="flex flex-col items-center group">
            <div className="relative mb-6">
              <img
                src={isEditing ? formData.avatar : (user?.avatar || `https://ui-avatars.com/api/?name=${user?.name}&background=0f172a&color=fff`)}
                alt="Profile"
                className="w-24 h-24 rounded-xl object-cover border border-slate-200 shadow-premium transition-transform group-hover:scale-105"
              />
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-success rounded-full ring-4 ring-white"></div>
            </div>
            
            <div className="text-center">
              <h2 className="text-lg font-bold text-primary">{user?.name}</h2>
              <p className="text-muted text-xs font-black uppercase tracking-widest mt-0.5">{user?.designation}</p>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-2">
              <Badge variant="info">Employee</Badge>
              <Badge variant="success">Active Status</Badge>
            </div>

            {isEditing && (
              <div className="mt-8 w-full">
                <Input 
                  label="Avatar URI" 
                  value={formData.avatar} 
                  onChange={(e) => setFormData({...formData, avatar: e.target.value})}
                  placeholder="Link to formal photograph..."
                />
              </div>
            )}
          </Card>

          <Card title="Quick Actions" subtitle="Institutional shortcuts">
             <div className="space-y-2">
                <Button variant="outline" className="w-full text-xs font-bold justify-start">Change Password</Button>
                <Button variant="outline" className="w-full text-xs font-bold justify-start">Download ID Card</Button>
                <Button variant="outline" className="w-full text-xs font-bold justify-start">Review Contract</Button>
             </div>
          </Card>
        </div>

        <div className="lg:col-span-3 space-y-6">
          <Card title="Institutional Information" subtitle="Official record of assignment and contact details">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 mt-4">
              <div className="space-y-1 group">
                <label className="text-[10px] font-black text-muted uppercase tracking-widest flex items-center gap-2 group-hover:text-primary transition-colors">
                  <User size={12}/> Legal Name
                </label>
                <p className="text-sm font-bold text-primary">{user?.name}</p>
              </div>

              <div className="space-y-1 group">
                <label className="text-[10px] font-black text-muted uppercase tracking-widest flex items-center gap-2 group-hover:text-primary transition-colors">
                  <Mail size={12}/> Institutional Email
                </label>
                <p className="text-sm font-bold text-primary underline decoration-slate-200 underline-offset-4">{user?.email}</p>
              </div>

              <div className="space-y-2 group">
                <label className="text-[10px] font-black text-muted uppercase tracking-widest flex items-center gap-2 group-hover:text-primary transition-colors">
                  <Phone size={12}/> Primary Contact
                </label>
                {isEditing ? (
                  <Input 
                    value={formData.phone} 
                    onChange={(e) => setFormData({...formData, phone: e.target.value})} 
                  />
                ) : (
                  <p className="text-sm font-bold text-primary">{user?.phone || formData.phone}</p>
                )}
              </div>

              <div className="space-y-2 group">
                <label className="text-[10px] font-black text-muted uppercase tracking-widest flex items-center gap-2 group-hover:text-primary transition-colors">
                  <MapPin size={12}/> Physical Address
                </label>
                 {isEditing ? (
                  <Input 
                    value={formData.address} 
                    onChange={(e) => setFormData({...formData, address: e.target.value})} 
                  />
                ) : (
                  <p className="text-sm font-bold text-primary">{user?.address || formData.address}</p>
                )}
              </div>
            </div>

            <div className="h-px bg-slate-50 my-10"></div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <div className="space-y-1 group">
                <label className="text-[10px] font-black text-muted uppercase tracking-widest flex items-center gap-2 group-hover:text-primary transition-colors">
                  <Briefcase size={12}/> Assigned Unit
                </label>
                <p className="text-sm font-bold text-primary">{user?.department}</p>
              </div>
               <div className="space-y-1 group">
                <label className="text-[10px] font-black text-muted uppercase tracking-widest flex items-center gap-2 group-hover:text-primary transition-colors">
                  <Calendar size={12}/> Commencement
                </label>
                <p className="text-sm font-bold text-primary">{user?.joinDate}</p>
              </div>
               <div className="space-y-1 group">
                <label className="text-[10px] font-black text-muted uppercase tracking-widest flex items-center gap-2 group-hover:text-primary transition-colors">
                  <Briefcase size={12}/> Unique Identifier
                </label>
                <p className="text-sm font-bold text-primary">#{user?.id}</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </PageWrapper>
  );
};

export default EmployeeProfile;

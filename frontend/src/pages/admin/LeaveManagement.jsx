import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import PageWrapper from "../../components/layout/PageWrapper";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import Badge from "../../components/common/Badge";
import Modal from "../../components/common/Modal";
import Input from "../../components/common/Input";
import { CheckCircle, XCircle, Clock, Filter, Search, Calendar, User } from "lucide-react";
import { format, parseISO } from "date-fns";
import api from "../../services/api";
import { cn } from "../../utils/cn";

const AdminLeaveManagement = () => {
  const { user } = useAuth();
  const { addToast } = useToast();
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [adminComment, setAdminComment] = useState('');
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    fetchLeaves();
  }, [filterStatus]);

  const fetchLeaves = async () => {
    try {
      setLoading(true);
      const queryParam = filterStatus !== 'all' ? `?status=${filterStatus}` : '';
      const { data } = await api.get(`/leaves${queryParam}`);
      
      if (data.success) {
        setLeaves(data.data);
      }
    } catch (error) {
      console.error('Error fetching leaves:', error);
      addToast('Failed to load leave requests', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (leaveId) => {
    if (!window.confirm('Are you sure you want to approve this leave request?')) return;

    try {
      setProcessing(true);
      const { data } = await api.put(`/leaves/${leaveId}`, {
        status: 'approved',
        adminComment: adminComment || 'Approved'
      });

      if (data.success) {
        addToast('Leave request approved successfully', 'success');
        fetchLeaves();
        setIsModalOpen(false);
        setAdminComment('');
      }
    } catch (error) {
      console.error('Error approving leave:', error);
      const errorMsg = error.response?.data?.message || 'Failed to approve leave';
      addToast(errorMsg, 'error');
    } finally {
      setProcessing(false);
    }
  };

  const handleReject = async (leaveId) => {
    if (!adminComment.trim()) {
      addToast('Please provide a reason for rejection', 'error');
      return;
    }

    if (!window.confirm('Are you sure you want to reject this leave request?')) return;

    try {
      setProcessing(true);
      const { data } = await api.put(`/leaves/${leaveId}`, {
        status: 'rejected',
        adminComment
      });

      if (data.success) {
        addToast('Leave request rejected', 'info');
        fetchLeaves();
        setIsModalOpen(false);
        setAdminComment('');
      }
    } catch (error) {
      console.error('Error rejecting leave:', error);
      const errorMsg = error.response?.data?.message || 'Failed to reject leave';
      addToast(errorMsg, 'error');
    } finally {
      setProcessing(false);
    }
  };

  const openLeaveModal = (leave) => {
    setSelectedLeave(leave);
    setAdminComment(leave.adminComment || '');
    setIsModalOpen(true);
  };

  const getStatusBadge = (status) => {
    const variants = {
      pending: 'warning',
      approved: 'success',
      rejected: 'danger'
    };
    return variants[status] || 'default';
  };

  const getLeaveTypeLabel = (type) => {
    const labels = {
      paid: 'Annual Leave',
      sick: 'Medical Leave',
      casual: 'Personal Leave',
      unpaid: 'Unpaid Leave'
    };
    return labels[type] || type;
  };

  const calculateDays = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
    return days;
  };

  const filteredLeaves = leaves.filter(leave => {
    const matchesSearch = 
      leave.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      leave.user?.employeeId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      leave.user?.department?.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch;
  });

  const stats = {
    total: leaves.length,
    pending: leaves.filter(l => l.status === 'pending').length,
    approved: leaves.filter(l => l.status === 'approved').length,
    rejected: leaves.filter(l => l.status === 'rejected').length
  };

  return (
    <PageWrapper>
      <div className="mb-6">
        <h1 className="text-3xl font-black text-primary tracking-tighter">Leave Management</h1>
        <p className="text-muted text-sm mt-1">Review and approve employee leave requests</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card className="border-l-4 border-l-blue-500">
          <p className="text-xs text-muted uppercase tracking-wider mb-1">Total Requests</p>
          <p className="text-2xl font-bold text-primary">{stats.total}</p>
        </Card>
        <Card className="border-l-4 border-l-warning">
          <p className="text-xs text-muted uppercase tracking-wider mb-1">Pending</p>
          <p className="text-2xl font-bold text-primary">{stats.pending}</p>
        </Card>
        <Card className="border-l-4 border-l-success">
          <p className="text-xs text-muted uppercase tracking-wider mb-1">Approved</p>
          <p className="text-2xl font-bold text-primary">{stats.approved}</p>
        </Card>
        <Card className="border-l-4 border-l-error">
          <p className="text-xs text-muted uppercase tracking-wider mb-1">Rejected</p>
          <p className="text-2xl font-bold text-primary">{stats.rejected}</p>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted w-4 h-4" />
              <input
                type="text"
                placeholder="Search by name, employee ID, or department..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Leave Requests Table */}
      <Card title="Leave Requests" subtitle="Review and manage employee time-off requests">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 text-left">
                <th className="pb-3 text-xs font-bold text-muted uppercase tracking-wider">Employee</th>
                <th className="pb-3 text-xs font-bold text-muted uppercase tracking-wider">Leave Type</th>
                <th className="pb-3 text-xs font-bold text-muted uppercase tracking-wider">Duration</th>
                <th className="pb-3 text-xs font-bold text-muted uppercase tracking-wider">Days</th>
                <th className="pb-3 text-xs font-bold text-muted uppercase tracking-wider">Status</th>
                <th className="pb-3 text-xs font-bold text-muted uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan="6" className="py-12 text-center text-muted">Loading...</td>
                </tr>
              ) : filteredLeaves.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-12 text-center text-muted italic">No leave requests found</td>
                </tr>
              ) : (
                filteredLeaves.map((leave) => (
                  <tr key={leave._id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white font-bold">
                          {leave.user?.name?.charAt(0) || 'U'}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-primary">{leave.user?.name}</p>
                          <p className="text-xs text-muted">{leave.user?.employeeId} • {leave.user?.department}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4">
                      <span className="text-sm font-medium text-primary capitalize">
                        {getLeaveTypeLabel(leave.leaveType)}
                      </span>
                    </td>
                    <td className="py-4">
                      <div className="text-sm text-muted">
                        <div>{format(parseISO(leave.startDate), 'MMM dd, yyyy')}</div>
                        <div className="text-xs">to {format(parseISO(leave.endDate), 'MMM dd, yyyy')}</div>
                      </div>
                    </td>
                    <td className="py-4">
                      <span className="text-sm font-bold text-primary">
                        {calculateDays(leave.startDate, leave.endDate)} days
                      </span>
                    </td>
                    <td className="py-4">
                      <Badge variant={getStatusBadge(leave.status)}>
                        {leave.status.charAt(0).toUpperCase() + leave.status.slice(1)}
                      </Badge>
                    </td>
                    <td className="py-4 text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openLeaveModal(leave)}
                      >
                        Review
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Review Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setAdminComment('');
        }}
        title="Review Leave Request"
      >
        {selectedLeave && (
          <div className="space-y-6">
            {/* Employee Info */}
            <div className="p-4 bg-slate-50 rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                  {selectedLeave.user?.name?.charAt(0) || 'U'}
                </div>
                <div>
                  <h3 className="font-bold text-primary">{selectedLeave.user?.name}</h3>
                  <p className="text-xs text-muted">{selectedLeave.user?.employeeId} • {selectedLeave.user?.designation}</p>
                </div>
              </div>
            </div>

            {/* Leave Details */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted uppercase tracking-wider mb-1">Leave Type</p>
                <p className="text-sm font-bold text-primary capitalize">{getLeaveTypeLabel(selectedLeave.leaveType)}</p>
              </div>
              <div>
                <p className="text-xs text-muted uppercase tracking-wider mb-1">Duration</p>
                <p className="text-sm font-bold text-primary">{calculateDays(selectedLeave.startDate, selectedLeave.endDate)} days</p>
              </div>
              <div>
                <p className="text-xs text-muted uppercase tracking-wider mb-1">Start Date</p>
                <p className="text-sm font-bold text-primary">{format(parseISO(selectedLeave.startDate), 'MMM dd, yyyy')}</p>
              </div>
              <div>
                <p className="text-xs text-muted uppercase tracking-wider mb-1">End Date</p>
                <p className="text-sm font-bold text-primary">{format(parseISO(selectedLeave.endDate), 'MMM dd, yyyy')}</p>
              </div>
            </div>

            {/* Reason */}
            <div>
              <p className="text-xs text-muted uppercase tracking-wider mb-2">Reason</p>
              <div className="p-3 bg-slate-50 rounded-lg">
                <p className="text-sm text-primary">{selectedLeave.reason}</p>
              </div>
            </div>

            {/* Admin Comment */}
            <div>
              <label className="text-xs text-muted uppercase tracking-wider mb-2 block">
                Admin Comment {selectedLeave.status === 'pending' && <span className="text-error">*</span>}
              </label>
              <textarea
                value={adminComment}
                onChange={(e) => setAdminComment(e.target.value)}
                placeholder="Add your comments here..."
                className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none min-h-[100px]"
                disabled={selectedLeave.status !== 'pending'}
              />
            </div>

            {/* Current Status */}
            <div className="flex items-center gap-2">
              <p className="text-xs text-muted uppercase tracking-wider">Current Status:</p>
              <Badge variant={getStatusBadge(selectedLeave.status)}>
                {selectedLeave.status.charAt(0).toUpperCase() + selectedLeave.status.slice(1)}
              </Badge>
            </div>

            {/* Action Buttons */}
            {selectedLeave.status === 'pending' && (
              <div className="flex gap-3 pt-4 border-t border-slate-100">
                <Button
                  variant="success"
                  className="flex-1 flex items-center justify-center gap-2"
                  onClick={() => handleApprove(selectedLeave._id)}
                  disabled={processing}
                >
                  <CheckCircle size={18} />
                  {processing ? 'Processing...' : 'Approve'}
                </Button>
                <Button
                  variant="danger"
                  className="flex-1 flex items-center justify-center gap-2"
                  onClick={() => handleReject(selectedLeave._id)}
                  disabled={processing}
                >
                  <XCircle size={18} />
                  {processing ? 'Processing...' : 'Reject'}
                </Button>
              </div>
            )}

            {selectedLeave.status !== 'pending' && (
              <div className="pt-4 border-t border-slate-100">
                <Button
                  variant="secondary"
                  className="w-full"
                  onClick={() => setIsModalOpen(false)}
                >
                  Close
                </Button>
              </div>
            )}
          </div>
        )}
      </Modal>
    </PageWrapper>
  );
};

export default AdminLeaveManagement;

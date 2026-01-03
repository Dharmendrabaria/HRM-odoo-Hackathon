import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { Camera, User, Mail, Phone, MapPin, Briefcase, Building2, Save, X } from 'lucide-react';

const AdminProfile = () => {
  const { user, logout, refreshUser } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    department: '',
    designation: '',
    profileImage: ''
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  // Fetch profile data
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('dayflow_token');
      console.log('🔑 Token from localStorage:', token);
      
      // Check if token exists
      if (!token) {
        console.log('❌ No token found in localStorage');
        setMessage({ type: 'error', text: 'Please login to continue' });
        setTimeout(() => {
          logout();
          navigate('/login');
        }, 1500);
        return;
      }

      console.log('📡 Fetching profile from API...');
      const response = await fetch('http://localhost:5000/api/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      console.log('📊 Response status:', response.status);
      const data = await response.json();
      console.log('📦 Response data:', data);
      
      if (data.success) {
        console.log('✅ Profile loaded successfully');
        setProfileData({
          name: data.data.name || '',
          email: data.data.email || '',
          phone: data.data.phone || '',
          address: data.data.address || '',
          department: data.data.department || '',
          designation: data.data.designation || '',
          profileImage: data.data.profileImage || ''
        });
      } else {
        // Handle auth errors
        if (response.status === 401) {
          console.log('🚫 401 Unauthorized - Token issue');
          console.log('Error message:', data.message);
          setMessage({ type: 'error', text: data.message || 'Session expired. Please login again.' });
          // Temporarily disabled for debugging
          // setTimeout(() => {
          //   logout();
          //   navigate('/login');
          // }, 1500);
        } else {
          console.log('⚠️ Other error:', data.message);
          setMessage({ type: 'error', text: data.message || 'Failed to load profile' });
        }
      }
    } catch (error) {
      console.error('💥 Error fetching profile:', error);
      setMessage({ type: 'error', text: 'Failed to load profile. Please try again.' });
    }
  };

  const handleInputChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = async () => {
    if (!selectedFile) return;

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('profileImage', selectedFile);

      const token = localStorage.getItem('dayflow_token');
      const response = await fetch('http://localhost:5000/api/profile/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setMessage({ type: 'success', text: 'Profile picture updated successfully!' });
        setProfileData({ ...profileData, profileImage: data.data.profileImage });
        setSelectedFile(null);
        setPreviewImage(null);
        // Refresh user data to update navbar
        await refreshUser();
      } else {
        setMessage({ type: 'error', text: data.message });
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      setMessage({ type: 'error', text: 'Failed to upload image' });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteImage = async () => {
    if (!confirm('Are you sure you want to delete your profile picture?')) return;

    try {
      setLoading(true);
      const token = localStorage.getItem('dayflow_token');
      const response = await fetch('http://localhost:5000/api/profile/picture', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (data.success) {
        setMessage({ type: 'success', text: 'Profile picture deleted successfully!' });
        setProfileData({ ...profileData, profileImage: '' });
        // Refresh user data to update navbar
        await refreshUser();
      } else {
        setMessage({ type: 'error', text: data.message });
      }
    } catch (error) {
      console.error('Error deleting image:', error);
      setMessage({ type: 'error', text: 'Failed to delete image' });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('dayflow_token');
      const response = await fetch('http://localhost:5000/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: profileData.name,
          email: profileData.email,
          phone: profileData.phone,
          address: profileData.address,
          department: profileData.department,
          designation: profileData.designation
        })
      });

      const data = await response.json();

      if (data.success) {
        setMessage({ type: 'success', text: 'Profile updated successfully!' });
        setIsEditing(false);
        fetchProfile();
      } else {
        setMessage({ type: 'error', text: data.message });
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage({ type: 'error', text: 'Failed to update profile' });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setSelectedFile(null);
    setPreviewImage(null);
    fetchProfile();
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
        <p className="text-gray-500 mt-1">Manage your account information</p>
      </div>

      {message.text && (
        <div className={`mb-4 p-4 rounded-lg ${
          message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
        }`}>
          {message.text}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Picture Card */}
        <Card className="lg:col-span-1">
          <div className="text-center">
            <div className="relative inline-block">
              <div className="w-40 h-40 rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mx-auto">
                {previewImage || profileData.profileImage ? (
                  <img
                    src={previewImage || `http://localhost:5000${profileData.profileImage}`}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-20 h-20 text-white" />
                )}
              </div>
              <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 transition-colors">
                <Camera className="w-5 h-5" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </label>
            </div>

            <h2 className="text-xl font-bold text-gray-900 mt-4">{profileData.name}</h2>
            <p className="text-sm text-gray-500">{profileData.designation}</p>
            <p className="text-xs text-gray-400 mt-1">{profileData.department}</p>

            {selectedFile && (
              <div className="mt-4 space-y-2">
                <Button
                  onClick={handleImageUpload}
                  disabled={loading}
                  className="w-full"
                  variant="primary"
                >
                  {loading ? 'Uploading...' : 'Upload Photo'}
                </Button>
                <Button
                  onClick={() => {
                    setSelectedFile(null);
                    setPreviewImage(null);
                  }}
                  variant="outline"
                  className="w-full"
                >
                  Cancel
                </Button>
              </div>
            )}

            {profileData.profileImage && !selectedFile && (
              <Button
                onClick={handleDeleteImage}
                disabled={loading}
                variant="outline"
                className="w-full mt-4 text-red-600 hover:bg-red-50"
              >
                Delete Photo
              </Button>
            )}
          </div>
        </Card>

        {/* Profile Information Card */}
        <Card className="lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-900">Profile Information</h3>
            {!isEditing ? (
              <Button onClick={() => setIsEditing(true)} variant="primary">
                Edit Profile
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button
                  onClick={handleUpdateProfile}
                  disabled={loading}
                  variant="primary"
                  className="flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  {loading ? 'Saving...' : 'Save'}
                </Button>
                <Button
                  onClick={handleCancel}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </Button>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <User className="w-4 h-4" />
                  Full Name
                </label>
                {isEditing ? (
                  <Input
                    name="name"
                    value={profileData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                  />
                ) : (
                  <p className="text-gray-900 font-medium">{profileData.name || 'Not set'}</p>
                )}
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Mail className="w-4 h-4" />
                  Email
                </label>
                {isEditing ? (
                  <Input
                    name="email"
                    type="email"
                    value={profileData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                  />
                ) : (
                  <p className="text-gray-900 font-medium">{profileData.email || 'Not set'}</p>
                )}
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Phone className="w-4 h-4" />
                  Phone
                </label>
                {isEditing ? (
                  <Input
                    name="phone"
                    value={profileData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter your phone number"
                  />
                ) : (
                  <p className="text-gray-900 font-medium">{profileData.phone || 'Not set'}</p>
                )}
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Briefcase className="w-4 h-4" />
                  Designation
                </label>
                {isEditing ? (
                  <Input
                    name="designation"
                    value={profileData.designation}
                    onChange={handleInputChange}
                    placeholder="Enter your designation"
                  />
                ) : (
                  <p className="text-gray-900 font-medium">{profileData.designation || 'Not set'}</p>
                )}
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Building2 className="w-4 h-4" />
                  Department
                </label>
                {isEditing ? (
                  <Input
                    name="department"
                    value={profileData.department}
                    onChange={handleInputChange}
                    placeholder="Enter your department"
                  />
                ) : (
                  <p className="text-gray-900 font-medium">{profileData.department || 'Not set'}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="w-4 h-4" />
                  Address
                </label>
                {isEditing ? (
                  <Input
                    name="address"
                    value={profileData.address}
                    onChange={handleInputChange}
                    placeholder="Enter your address"
                  />
                ) : (
                  <p className="text-gray-900 font-medium">{profileData.address || 'Not set'}</p>
                )}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminProfile;

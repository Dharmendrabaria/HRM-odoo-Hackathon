const User = require('../models/User');
const path = require('path');
const fs = require('fs');

// @desc    Get current user profile
// @route   GET /api/profile
// @access  Private
const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({
            success: true,
            data: user
        });
    } catch (error) {
        console.error('Get Profile Error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Update user profile
// @route   PUT /api/profile
// @access  Private
const updateProfile = async (req, res) => {
    try {
        const { name, email, department, designation, phone, address } = req.body;

        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update fields if provided
        if (name) user.name = name;
        if (email) user.email = email;
        if (department) user.department = department;
        if (designation) user.designation = designation;
        if (phone) user.phone = phone;
        if (address) user.address = address;

        const updatedUser = await user.save();

        res.json({
            success: true,
            message: 'Profile updated successfully',
            data: updatedUser
        });
    } catch (error) {
        console.error('Update Profile Error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Upload profile picture
// @route   POST /api/profile/upload
// @access  Private
const uploadProfilePicture = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Please upload an image file' });
        }

        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Delete old profile picture if exists
        if (user.profileImage) {
            const oldImagePath = path.join(__dirname, '../uploads/profiles', path.basename(user.profileImage));
            if (fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath);
            }
        }

        // Save new profile picture path
        user.profileImage = `/uploads/profiles/${req.file.filename}`;
        await user.save();

        res.json({
            success: true,
            message: 'Profile picture uploaded successfully',
            data: {
                profileImage: user.profileImage
            }
        });
    } catch (error) {
        console.error('Upload Profile Picture Error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Delete profile picture
// @route   DELETE /api/profile/picture
// @access  Private
const deleteProfilePicture = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (!user.profileImage) {
            return res.status(400).json({ message: 'No profile picture to delete' });
        }

        // Delete profile picture file
        const imagePath = path.join(__dirname, '../uploads/profiles', path.basename(user.profileImage));
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
        }

        // Remove from database
        user.profileImage = '';
        await user.save();

        res.json({
            success: true,
            message: 'Profile picture deleted successfully'
        });
    } catch (error) {
        console.error('Delete Profile Picture Error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    getProfile,
    updateProfile,
    uploadProfilePicture,
    deleteProfilePicture
};

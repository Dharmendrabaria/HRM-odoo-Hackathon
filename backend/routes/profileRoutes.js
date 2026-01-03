const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');
const {
    getProfile,
    updateProfile,
    uploadProfilePicture,
    deleteProfilePicture
} = require('../controllers/profileController');

// All routes are protected
router.use(protect);

// Profile routes
router.get('/', getProfile);
router.put('/', updateProfile);

// Profile picture routes
router.post('/upload', upload.single('profileImage'), uploadProfilePicture);
router.delete('/picture', deleteProfilePicture);

module.exports = router;

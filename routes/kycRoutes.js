const express = require('express');
const router = express.Router();
const kycController = require('../controllers/kycController');
const verifyToken = require('../middleware/verifyToken');
const multer = require('multer');
const path = require('path');

// File upload setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

router.post('/submit-kyc', verifyToken, upload.single('id_document'), kycController.submitKYC);
router.put('/update-kyc/:id', verifyToken, upload.single('id_document'), kycController.updateKYC);
router.get('/admin/kyc', verifyToken, kycController.getAdminKYC);
router.put('/admin/kyc/:id', verifyToken, kycController.updateKYCAdmin)
router.get('/kyc-status', verifyToken, kycController.getKYCStatus);
router.get('/admin/user-count',verifyToken, kycController.getUserCount);
module.exports = router;

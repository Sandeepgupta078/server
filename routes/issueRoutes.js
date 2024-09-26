const express = require('express');
const { reportIssue, getAllIssues } = require('../controllers/issueController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const router = express.Router();

router.post('/report', upload.single('image'), reportIssue);
router.get('/', getAllIssues);

module.exports = router;

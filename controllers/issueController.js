const Issue = require('../models/Issue');
const cloudinary = require('cloudinary').v2;

// Report an issue
exports.reportIssue = async (req, res) => {
  try {
    const { title, description, location, address, userId } = req.body;

    let imageUrl;
    if (req.file) {
      // Upload image to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);
      imageUrl = result.secure_url;
    }

    const issue = new Issue({
      title,
      description,
      image: imageUrl,
      location,
      address,
      user: userId,
    });

    await issue.save();
    res.status(201).json({ message: 'Issue reported' });
  } catch (error) {
    res.status(400).json({ error: 'Could not report issue' });
  }
};

// Get all issues
exports.getAllIssues = async (req, res) => {
  const issues = await Issue.find().populate('user', 'name email');
  res.json(issues);
};

// const mongoose = require('mongoose');

// const IssueSchema = new mongoose.Schema({
//   description: { type: String, required: true },
//   location: { type: String, required: true },
//   image: { type: String },
//   status: {
//     type: String,
//     enum: ['reported', 'in-progress', 'resolved'],
//     default: 'reported',
//   },
//   createdAt: { type: Date, default: Date.now },
// });

// module.exports = mongoose.model('Issue', IssueSchema);



const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String, // Cloudinary image URL
  location: {
    type: { type: String, default: 'Point' },
    coordinates: [Number],
  },
  address: String,
  status: { type: String, default: 'Pending' }, // Status of the issue
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const Issue = mongoose.model('Issue', issueSchema);
module.exports = Issue;


import mongoose from 'mongoose';

// one enquiry from the website contact form
const leadSchema = new mongoose.Schema(
  {
    business: { type: String, required: true, trim: true, maxlength: 120 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 160 },
    message: { type: String, required: true, trim: true, maxlength: 3000 },
    status: { type: String, enum: ['new', 'contacted', 'closed'], default: 'new' }
  },
  { timestamps: true }
);

export default mongoose.model('Lead', leadSchema);

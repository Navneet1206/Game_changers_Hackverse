import mongoose from 'mongoose';

const hospitalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  contactNumber: String,
  specialties: [String],
  services: [String]
}, {
  timestamps: true
});

export default mongoose.model('Hospital', hospitalSchema);
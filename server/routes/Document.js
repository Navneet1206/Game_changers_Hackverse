import express from 'express';
import Document from '../models/Document.js';
import { auth, authorize } from '../middleware/auth.js';

const router = express.Router();

// Upload a document
router.post('/', auth, authorize('doctor'), async (req, res) => {
  const { patientId, appointmentId, filePath, description } = req.body;
  const document = new Document({
    patientId,
    doctorId: req.user.id,
    appointmentId,
    filePath,
    description
  });

  try {
    await document.save();
    res.status(201).json(document);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get documents for a patient
router.get('/patient', auth, authorize('patient'), async (req, res) => {
  try {
    const documents = await Document.find({ patientId: req.user.id });
    res.json(documents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get documents for a doctor
router.get('/doctor', auth, authorize('doctor'), async (req, res) => {
  try {
    const documents = await Document.find({ doctorId: req.user.id });
    res.json(documents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
import express from 'express';
import Appointment from '../models/Appointment.js';
import Receipt from '../models/Receipt.js';
import { auth, authorize } from '../middleware/auth.js';

const router = express.Router();

// Create a new appointment
router.post('/', auth, authorize('patient'), async (req, res) => {
  const { doctorId, appointmentDate, notes } = req.body;
  const appointment = new Appointment({
    patientId: req.user.id,
    doctorId,
    appointmentDate,
    notes
  });

  try {
    await appointment.save();
    res.status(201).json(appointment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Generate receipt for an appointment
router.post('/:id/receipt', auth, authorize('doctor'), async (req, res) => {
  const { amount, details } = req.body;
  const appointment = await Appointment.findById(req.params.id);

  if (!appointment) {
    return res.status(404).json({ message: 'Appointment not found' });
  }

  const receipt = new Receipt({
    appointmentId: appointment._id,
    patientId: appointment.patientId,
    doctorId: appointment.doctorId,
    amount,
    details
  });

  try {
    await receipt.save();
    appointment.receipt = receipt._id;
    await appointment.save();
    res.status(201).json(receipt);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all appointments for a patient
router.get('/patient', auth, authorize('patient'), async (req, res) => {
  try {
    const appointments = await Appointment.find({ patientId: req.user.id }).populate('receipt');
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all appointments for a doctor
router.get('/doctor', auth, authorize('doctor'), async (req, res) => {
  try {
    const appointments = await Appointment.find({ doctorId: req.user.id }).populate('receipt');
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
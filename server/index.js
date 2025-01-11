const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const app = express();
const PORT = 3000;
const SECRET_KEY = 'your-secret-key';

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/healthhub', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Mongoose Schemas
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: { type: String, required: true },
  userType: { type: String, required: true },
  companyName: { type: String },
  contactPerson: { type: String },
  address: { type: String },
  phone: { type: String },
  specialization: { type: String },
  license: { type: String },
});

const appointmentSchema = new mongoose.Schema({
  appointmentId: { type: String, required: true, unique: true },
  patientEmail: { type: String, required: true },
  doctorEmail: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  status: { type: String, default: 'Scheduled' },
});

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);
const Appointment = mongoose.model('Appointment', appointmentSchema);
const Contact = mongoose.model('Contact', contactSchema);

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).json({ message: 'No token provided.' });

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Failed to authenticate token.' });

    req.userId = decoded.id;
    next();
  });
};

// Routes

// Signup
app.post('/api/auth/register', async (req, res) => {
  const { email, password, fullName, userType, companyName, contactPerson, address, phone, specialization, license } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      password: hashedPassword,
      fullName,
      userType,
      companyName,
      contactPerson,
      address,
      phone,
      specialization,
      license,
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
});

// Signin
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful', token, user });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
});

// Logout
app.post('/api/auth/logout', (req, res) => {
  res.status(200).json({ message: 'Logout successful' });
});

// Protected route example
app.get('/api/protected', verifyToken, (req, res) => {
  res.status(200).json({ message: 'This is a protected route', userId: req.userId });
});

// Book Appointment
app.post('/api/appointments/book', verifyToken, async (req, res) => {
  const { patientEmail, doctorEmail, date, time } = req.body;

  try {
    const appointmentId = uuidv4();
    const newAppointment = new Appointment({
      appointmentId,
      patientEmail,
      doctorEmail,
      date,
      time,
    });

    await newAppointment.save();

    // Generate receipt
    const receipt = {
      appointmentId,
      patientEmail,
      doctorEmail,
      date,
      time,
      status: 'Scheduled',
    };

    res.status(201).json({ message: 'Appointment booked successfully', receipt });
  } catch (error) {
    res.status(500).json({ message: 'Error booking appointment', error });
  }
});

// Register Company
app.post('/api/company/register', verifyToken, async (req, res) => {
  const { email, password, fullName, companyName, contactPerson, address, phone } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      password: hashedPassword,
      fullName,
      userType: 'company',
      companyName,
      contactPerson,
      address,
      phone,
    });

    await newUser.save();
    res.status(201).json({ message: 'Company registered successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Error registering company', error });
  }
});

// Contact Us
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const newContact = new Contact({
      name,
      email,
      message,
    });

    await newContact.save();
    res.status(201).json({ message: 'Message sent successfully', contact: newContact });
  } catch (error) {
    res.status(500).json({ message: 'Error sending message', error });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
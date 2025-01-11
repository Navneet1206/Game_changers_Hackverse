const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Joi = require('joi');

const app = express();
const PORT = 3000;
const SECRET_KEY = 'your-secret-key';

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/healthhub', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

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

const User = mongoose.model('User', userSchema);
const Appointment = mongoose.model('Appointment', appointmentSchema);

// Middleware to Verify JWT
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>
  if (!token) return res.status(403).json({ message: 'No token provided' });

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Token invalid or expired' });
    req.userId = decoded.id; // Set userId for subsequent handlers
    next();
  });
};

// Validation Schemas
const signupSchema = Joi.object({
  fullName: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  userType: Joi.string().valid('patient', 'doctor', 'hospital', 'lab', 'store').required(),
  specialization: Joi.when('userType', {
    is: 'doctor',
    then: Joi.string().min(3).required(),
    otherwise: Joi.string().allow('').optional(),
  }),
  license: Joi.string().allow('').optional(),
  address: Joi.string().allow('').optional(),
});

const signinSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

// Routes
// Register Route
app.post('/api/auth/register', async (req, res) => {
  console.log('Register Request Body:', req.body); // Debugging Log
  const { error } = signupSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) return res.status(400).json({ message: 'Email already exists' });

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({ ...req.body, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error Registering User:', error);
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
});

// Login Route
app.post('/api/auth/login', async (req, res) => {
  console.log('Login Request Body:', req.body); // Debugging log

  const { error } = signinSchema.validate(req.body);
  if (error) {
    console.error('Validation Error:', error.details[0].message);
    return res.status(400).json({ message: error.details[0].message });
  }

  const { email, password } = req.body;
  try {
    // Log when the email search starts
    console.log('Searching for user with email:', email);

    const user = await User.findOne({ email });
    if (!user) {
      console.error('User Not Found');
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Log when the password comparison starts
    console.log('Comparing password for user:', user.email);

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.error('Invalid Password');
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Log when JWT is generated
    console.log('Generating JWT for user:', user.email);

    const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: '1h' });
    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
        userType: user.userType,
      },
    });

    console.log('Login Successful for user:', user.email);
  } catch (err) {
    console.error('Error Logging In:', err);
    res.status(500).json({ message: 'Error logging in', error: err.message });
  }
});

// JWT Validation Route
app.get('/api/auth/validate', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ user });
  } catch (error) {
    console.error('Error Validating Token:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

// Start Server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

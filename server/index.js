const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path'); // Add this line
const multer = require('multer'); // Add multer for file uploads

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/'); // Save files in the 'uploads' directory
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Ensure the uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

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
  isEkycVerified: { type: Boolean, default: false }, // Add this field
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

const reportSchema = new mongoose.Schema({
  reportId: { type: String, required: true, unique: true },
  patientEmail: { type: String, required: true },
  doctorEmail: { type: String, required: true },
  testType: { type: String, required: true },
  result: { type: String, required: true },
  status: { type: String, default: 'Pending' },
});

const medicationSchema = new mongoose.Schema({
  medicationId: { type: String, required: true, unique: true },
  patientEmail: { type: String, required: true },
  name: { type: String, required: true },
  dosage: { type: String, required: true },
  frequency: { type: String, required: true },
  remaining: { type: Number, required: true },
});

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  submittedAt: { type: Date, default: Date.now },
});

const mediclaimSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  employeeId: { type: String, required: true },
  company: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  description: { type: String, required: true },
  healthHubDocument: { type: String }, // Store file path or URL
  doctorReceipt: { type: String }, // Store file path or URL
  submittedAt: { type: Date, default: Date.now },
});




const Mediclaim = mongoose.model('Mediclaim', mediclaimSchema);

const User = mongoose.model('User', userSchema);
const Appointment = mongoose.model('Appointment', appointmentSchema);
const Report = mongoose.model('Report', reportSchema);
const Medication = mongoose.model('Medication', medicationSchema);
const Contact = mongoose.model('Contact', contactSchema);

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
        isEkycVerified: user.isEkycVerified, 
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

// Dashboard Routes
// Doctor Dashboard
app.get('/api/doctor/:id/dashboard', verifyToken, async (req, res) => {
  try {
    const doctorId = req.params.id;
    const appointments = await Appointment.find({ doctorEmail: doctorId });
    const patientCount = await Appointment.distinct('patientEmail', { doctorEmail: doctorId }).countDocuments();
    const pendingReports = await Report.countDocuments({ doctorEmail: doctorId, status: 'Pending' });
    const averageWaitTime = 12; // Placeholder for actual calculation

    res.json({
      appointments,
      patientCount,
      pendingReports,
      averageWaitTime,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching doctor dashboard data', error: error.message });
  }
});

// Hospital Dashboard
app.get('/api/hospital/:id/dashboard', verifyToken, async (req, res) => {
  try {
    const hospitalId = req.params.id;
    const totalPatients = await Appointment.distinct('patientEmail', { hospitalId }).countDocuments();
    const emergencyCases = await Appointment.countDocuments({ hospitalId, status: 'Emergency' });
    const availableBeds = 42; // Placeholder for actual calculation
    const staffOnDuty = await User.countDocuments({ userType: 'staff', hospitalId });

    res.json({
      totalPatients,
      emergencyCases,
      availableBeds,
      staffOnDuty,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching hospital dashboard data', error: error.message });
  }
});

// Lab Dashboard
app.get('/api/lab/:id/dashboard', verifyToken, async (req, res) => {
  try {
    const labId = req.params.id;
    const pendingTests = await Report.countDocuments({ labId, status: 'Pending' });
    const reportsReady = await Report.countDocuments({ labId, status: 'Completed' });
    const averageProcessingTime = 45; // Placeholder for actual calculation
    const todaysPatients = await Appointment.distinct('patientEmail', { labId }).countDocuments();

    res.json({
      pendingTests,
      reportsReady,
      averageProcessingTime,
      todaysPatients,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching lab dashboard data', error: error.message });
  }
});

// Patient Dashboard
app.get('/api/patient/:id/dashboard', verifyToken, async (req, res) => {
  try {
    const patientId = req.params.id;
    const upcomingAppointments = await Appointment.find({ patientEmail: patientId, status: 'Scheduled' });
    const medications = await Medication.find({ patientEmail: patientId });
    const recentReports = await Report.countDocuments({ patientEmail: patientId });

    res.json({
      upcomingAppointments,
      medications,
      recentReports,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching patient dashboard data', error: error.message });
  }
});

// Store Dashboard
app.get('/api/store/:id/dashboard', verifyToken, async (req, res) => {
  try {
    const storeId = req.params.id;
    const totalProducts = 1234; // Placeholder for actual calculation
    const todaysOrders = 28; // Placeholder for actual calculation
    const revenueToday = 1459; // Placeholder for actual calculation
    const lowStockItems = await Medication.find({ remaining: { $lt: 10 } }); // Example for low stock

    res.json({
      totalProducts,
      todaysOrders,
      revenueToday,
      lowStockItems,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching store dashboard data', error: error.message });
  }
});

//Contact Route
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validation (simple example)
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newMessage = new Contact({ name, email, message });
    await newMessage.save();

    res.status(201).json({ message: 'Contact message submitted successfully' });
  } catch (error) {
    console.error('Error saving contact message:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});


const helveticaBold = 'Helvetica-Bold';
const helvetica = 'Helvetica';

app.post('/api/submit-claim', upload.fields([
  { name: 'healthHubDocument', maxCount: 1 },
  { name: 'doctorReceipt', maxCount: 1 },
]), async (req, res) => {
  try {
    const { fullName, employeeId, company, email, phoneNumber, description } = req.body;

    const healthHubDocument = req.files['healthHubDocument']?.[0]?.path || null;
    const doctorReceipt = req.files['doctorReceipt']?.[0]?.path || null;

    const doc = new PDFDocument({ size: 'A4', margin: 50 });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="MediClaim_Receipt.pdf"');
    doc.pipe(res);

    // Header Section
    doc.font(helveticaBold)
      .fontSize(24)
      .fillColor('#333')
      .text('MediClaim Receipt', { align: 'center' })
      .moveDown(1);

    doc.moveTo(50, 80).lineTo(550, 80).strokeColor('#666').lineWidth(1).stroke();

    // Claim Details Section
    doc.font(helveticaBold)
      .fontSize(16)
      .fillColor('#444')
      .text('Claim Details', { underline: true })
      .moveDown(0.5);

    doc.font(helvetica)
      .fontSize(12)
      .fillColor('#000')
      .text(`Name: ${fullName}`)
      .text(`Employee ID: ${employeeId}`)
      .text(`Company: ${company}`)
      .text(`Email: ${email}`)
      .text(`Phone: ${phoneNumber}`)
      .moveDown(1);

    // Description Section
    doc.font(helveticaBold)
      .fontSize(16)
      .fillColor('#444')
      .text('Health Problem Description', { underline: true })
      .moveDown(0.5);

    doc.font(helvetica)
      .fontSize(12)
      .fillColor('#000')
      .text(description, { width: 500, align: 'justify' })
      .moveDown(1.5);

    // Attached Documents Section
    doc.font(helveticaBold)
      .fontSize(16)
      .fillColor('#444')
      .text('Attached Documents', { underline: true })
      .moveDown(0.5);

    const addImage = (doc, title, imagePath) => {
      if (imagePath) {
        doc.font(helveticaBold)
          .fontSize(12)
          .fillColor('#000')
          .text(`${title}:`, { continued: false })
          .moveDown(0.3);

        try {
          doc.image(imagePath, {
            fit: [450, 300], // Ensure the image fits within these bounds
            align: 'center',
            valign: 'top',
          });
          doc.moveDown(1);
        } catch (error) {
          console.error(`Error loading ${title}:`, error);
          doc.font(helvetica)
            .fontSize(12)
            .fillColor('#FF0000')
            .text('Error loading image. Skipping this section.', { continued: false })
            .moveDown(1);
        }
      } else {
        doc.font(helvetica)
          .fontSize(12)
          .fillColor('#555')
          .text(`${title} not provided.`, { continued: false })
          .moveDown(1);
      }
    };

    // Add healthHubDocument
    addImage(doc, 'Health Hub Document', healthHubDocument);

    // Add doctorReceipt
    addImage(doc, 'Doctor Receipt', doctorReceipt);

    // Footer Section
    doc.moveTo(50, doc.page.height - 50).lineTo(550, doc.page.height - 50).strokeColor('#666').lineWidth(1).stroke();

    doc.font(helvetica)
      .fontSize(10)
      .fillColor('#555')
      .text('Thank you for using HealthHub MediClaim Services!', { align: 'center' })
      .text(`Generated on: ${new Date().toLocaleString()}`, { align: 'center' });

    doc.end();
  } catch (error) {
    console.error('Error generating receipt:', error);
    res.status(500).json({ message: 'Error generating receipt', error: error.message });
  }
});



app.post('/api/book-appointment', async (req, res) => {
  const { patientName, doctorName, appointmentDate, appointmentTime, reason } = req.body;

  // Save the appointment to the database
  const newAppointment = new Appointment({
    appointmentId: uuidv4(),
    patientEmail: req.body.email, // Assuming email is part of the request
    doctorEmail: req.body.doctorEmail, // Assuming doctorEmail is part of the request
    date: appointmentDate,
    time: appointmentTime,
    status: 'Scheduled',
  });

  try {
    await newAppointment.save();

    // Create a PDF document
    const doc = new PDFDocument();
    const filePath = `./appointments/${Date.now()}_${patientName}_Appointment_Receipt.pdf`;

    // Pipe the PDF to a file
    doc.pipe(fs.createWriteStream(filePath));

    // Add content to the PDF
    doc.fontSize(25).text('Appointment Receipt', { align: 'center' });
    doc.moveDown();
    doc.fontSize(15).text(`Patient Name: ${patientName}`);
    doc.text(`Doctor Name: ${doctorName}`);
    doc.text(`Appointment Date: ${appointmentDate}`);
    doc.text(`Appointment Time: ${appointmentTime}`);
    doc.text(`Reason for Visit: ${reason}`);
    doc.moveDown();
    doc.text('Thank you for using HealthHub Appointment Services!', { align: 'center' });

    // Finalize the PDF
    doc.end();

    // Wait for the PDF to be written to the file
    doc.on('finish', () => {
      res.download(filePath, 'Appointment_Receipt.pdf', (err) => {
        if (err) {
          console.error('Error sending PDF:', err);
          res.status(500).send('Error generating PDF');
        } else {
          // Delete the file after sending it
          fs.unlinkSync(filePath);
        }
      });
    });
  } catch (error) {
    console.error('Error saving appointment:', error);
    res.status(500).send('Error saving appointment');
  }
});

// Start Server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
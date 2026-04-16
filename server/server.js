
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const authRoutes = require('./routes/auth');
const eventRoutes = require('./routes/events');
const bookingRoutes = require('./routes/bookings');

const app = express();

// ✅ Middleware
app.use(express.json());

// ✅ CORS (open for now, restrict later)
app.use(cors());

// ✅ API Routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/bookings', bookingRoutes);

// ✅ Serve Frontend (Vite build)
const __dirname1 = path.resolve();

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname1, '../client/dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname1, '../client/dist', 'index.html'));
  });
}

// ✅ MongoDB Connection (NO localhost fallback in production)
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB Connected Successfully');
})
.catch((err) => {
  console.error('MongoDB Connection Error:', err);
});

// ✅ PORT (Render provides this automatically)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


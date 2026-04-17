require('dotenv').config();
const express = require('express');
const cors = require('cors');
const contactRouter = require('./routes/contact');
const projectsRouter = require('./routes/projects');

const app = express();
const PORT = process.env.PORT || 5001;

const allowedOrigins = process.env.CLIENT_ORIGIN
  ? process.env.CLIENT_ORIGIN.split(',').map((o) => o.trim())
  : true;
app.use(cors({ origin: allowedOrigins }));
app.use(express.json());

app.use('/api/contact', contactRouter);
app.use('/api/projects', projectsRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const contactRouter = require('./routes/contact');
const projectsRouter = require('./routes/projects');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.use('/api/contact', contactRouter);
app.use('/api/projects', projectsRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

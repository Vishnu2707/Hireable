const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { jobRoles } = require('./jobRoles'); // Import job roles and keywords
const natural = require('natural'); // NLP library

const app = express();
const PORT = process.env.PORT || 5001; // Change 5000 to 5001

app.use(bodyParser.json());

// Set up storage for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Endpoint to handle file upload and text extraction
app.post('/upload', upload.single('resume'), (req, res) => {
  const { jobRole, jobDescription } = req.body;
  const resumePath = req.file.path;
  const keywords = jobRoles[jobRole];

  // Read and process resume file
  fs.readFile(resumePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading file');
    }

    // Extract keywords from resume using NLP
    const tokenizer = new natural.WordTokenizer();
    const resumeTokens = tokenizer.tokenize(data.toLowerCase());

    // Count matched keywords
    let matchedKeywords = 0;
    keywords.forEach(keyword => {
      if (resumeTokens.includes(keyword.toLowerCase())) {
        matchedKeywords++;
      }
    });

    const matchPercentage = (matchedKeywords / keywords.length) * 100;
    res.json({ matchPercentage, matchedKeywords, totalKeywords: keywords.length });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

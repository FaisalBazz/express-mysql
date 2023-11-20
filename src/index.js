const express = require('express');
const multer = require('multer');
const { Storage } = require('@google-cloud/storage');

const app = express();
const port = 3000;

const storage = new Storage({
  projectId: 'coba-cloud-405406', // Ganti dengan ID proyek Google Cloud Anda
  keyFilename: './serviceaccountkey.json', // Ganti dengan path ke file kunci layanan Anda
});

const bucket = storage.bucket('express-storage-1'); // Ganti dengan nama bucket Anda

const multerStorage = multer.memoryStorage();
const upload = multer({ storage: multerStorage });

app.post('/upload', upload.single('photo'), (req, res) => {
  const file = req.file;
  const fileName = `${Date.now()}_${file.originalname}`;

  const blob = bucket.file(fileName);
  const blobStream = blob.createWriteStream({
    resumable: false,
    metadata: {
      contentType: file.mimetype,
    },
  });

  blobStream.on('error', (err) => {
    res.status(500).send('Error uploading file!');
  });

  blobStream.on('finish', () => {
    res.status(200).send('File uploaded!');
  });

  blobStream.end(file.buffer);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

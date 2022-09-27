import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import saveSeedRouter from './routes/saveSeedRoutes.js';
import productRouter from './routes/productRoutes.js';
import userRouter from './routes/userRoutes.js';

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Successful connection in MongoDB');
  })
  .catch((err) => {
    console.log('ERROR: ' + err);
  });

const app = express();

//So the form data in the post requestwill be converted in json object inside req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/seed', saveSeedRouter);
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);

//Express async handler for the error (userRoutes.js) in router.post
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Port is running at http://localhost:${port}`);
});

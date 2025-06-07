import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import authRouter from './routes/authRouter'; 

const app = express();
const PORT = 7070;

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(bodyParser.json());

app.use('/api/auth', authRouter);

app.listen(PORT, () => {
  console.log(`✅ Server ishlayapti: http://localhost:${PORT}`);
});

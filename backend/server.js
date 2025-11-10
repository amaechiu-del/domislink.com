import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());

app.get('/api/health', (_req, res) => res.status(200).send('ok'));

const PORT = process.env.PORT || 3001;
app.listen(PORT, '0.0.0.0', () => {
  console.log('Backend listening on', PORT);
});

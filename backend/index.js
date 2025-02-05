const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const authRouter = require('./routes/auth_routes');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: `http://localhost:5173`, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

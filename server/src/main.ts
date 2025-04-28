import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import feedRoutes from './routes/feed.routes';
import favouritesRoutes from './routes/favourites.routes';
import adminRoutes from './routes/admin.routes';
import session from 'express-session';
import cors from 'cors';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === 'production' },
  }),
);
app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/feed', feedRoutes);
app.use('/favourites', favouritesRoutes);
app.use('/admin', adminRoutes);
app.listen(3456, () => {
  console.log(`Server running on port ${port}`);
});

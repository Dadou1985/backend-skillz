import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { API_PREFIX } from './config/env.ts';
import { errorHandler } from './middlewares/error/error.middleware.ts';

import amenetyRoutes from './routes/amenety/amenety.routes.ts';
import roomAmenetiesRoutes from './routes/amenety/roomAmeneties.routes.ts';
import chatRoutes from './routes/chat/chat.routes.ts';
import chatMessageRoutes from './routes/chat/chatMessage.routes.ts';
import checkListRoutes from './routes/checkList/checkList.routes.ts';
import checkListItemsRoutes from './routes/checkList/checkListItem.routes.ts';
import feedbackRoutes from './routes/feedback/feedback.routes.ts';
import guestTokenRoutes from './routes/guestToken/guestToken.routes.ts';
import hotelRoutes from './routes/hotel/hotel.routes.ts';
import supportRoutes from './routes/support/support.routes.ts';
import businessUsersRoutes from './routes/user/businessUsers.routes.ts';
import guestUsersRoutes from './routes/user/guestUsers.routes.ts';

const app = express();

const allowedOrigins = [
    'https://mysweethotelpro.web.app', 
    'https://mysweethotel.eu', 
    'http://localhost:3000', 
  ];

app.use(cors({
    origin: allowedOrigins,
    credentials: true
}));
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(errorHandler);

app.use(`${API_PREFIX}amenety`, amenetyRoutes);
app.use(`${API_PREFIX}room-amenety`, roomAmenetiesRoutes);
app.use(`${API_PREFIX}chat`, chatRoutes);
app.use(`${API_PREFIX}chat-message`, chatMessageRoutes);
app.use(`${API_PREFIX}checklist`, checkListRoutes);
app.use(`${API_PREFIX}checklist-items`, checkListItemsRoutes);
app.use(`${API_PREFIX}feedback`, feedbackRoutes);
app.use(`${API_PREFIX}guest-token`, guestTokenRoutes);
app.use(`${API_PREFIX}hotel`, hotelRoutes);
app.use(`${API_PREFIX}support`, supportRoutes);
app.use(`${API_PREFIX}business-users`, businessUsersRoutes);
app.use(`${API_PREFIX}guest-users`, guestUsersRoutes);

app.get('/', (_, res) => {
    res.send('🟢 MSH Back Office API is running');
  });

export default app;
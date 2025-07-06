// import express ,{Request,Response} from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// // middlewares
// app.use(cors());
// app.use(express.json());

// app.get('/',(req : Request,res : Response)=>{
//     res.send('Hello from TS Express Server');
// });

// app.listen(PORT,()=>{
//     console.log(`I am running on port ${PORT}`);
// });




import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import adminRoutes from './src/routes/admin.routes';
import userRoutes from './src/routes/user.routes';
import jobRoutes from './src/routes/job.routes'
import conn from './src/config/db.config';
import applicationRoutes from './src/routes/application.routes';
import faqRoutes from './src/routes/faq.routes';
import bookmarkRoutes from './src/routes/bookmark.routes';
import conversationRoutes from './src/routes/conversation.routes';
import invoiceRoutes from './src/routes/invoice.routes';
import jobHistoryRoutes from './src/routes/jobHistory.routes';
import messageRoutes from './src/routes/message.routes';
import notificationRoutes from './src/routes/notification.routes';
import paymentMethodRoutes from './src/routes/payment.routes';
import projectRoutes from './src/routes/project.routes';
import authRoutes from './src/auth/auth.routes';
import reviewRoutes from './src/routes/review.routes';






dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
conn();

app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Hello from TS Express Server');
});


app.use('/',authRoutes)
app.use('/api/admin', adminRoutes);
app.use('/api/user',userRoutes);
app.use('/api/job',jobRoutes)
app.use('/api/application',applicationRoutes);
app.use('/api/faq', faqRoutes);
app.use('/api/bookmark', bookmarkRoutes);
app.use('/api/conversation', conversationRoutes);
app.use('/api/invoice', invoiceRoutes);
app.use('/api/job-history', jobHistoryRoutes);
app.use('/api', messageRoutes);
app.use('/api', notificationRoutes);
app.use('/api', paymentMethodRoutes);
app.use('/api/project', projectRoutes);
app.use('/api/review', reviewRoutes);


app.listen(PORT, () => {
    console.log(`I am running on port ${PORT}`);
});

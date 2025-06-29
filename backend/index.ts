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
import conn from './src/config/db.config';
import applicationRoutes from './src/routes/application.routes';
import faqRoutes from './src/routes/faq.routes'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
conn();

app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Hello from TS Express Server');
});


app.use('/api/admin', adminRoutes);
app.use('/api/application',applicationRoutes);
app.use('/api/faq',faqRoutes);




app.listen(PORT, () => {
    console.log(`I am running on port ${PORT}`);
});

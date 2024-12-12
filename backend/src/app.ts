import express, { Application, NextFunction, Request, Response, urlencoded } from 'express';
import cors from 'cors';
import globalErrorHandler from './middleware/globalErrorHandler';
import router from './app/routes';
import httpStatus from 'http-status';
import path from 'path';
const app: Application = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: true }));
// app.use('/images',express.static('public/uploads/images'));
// app.use(express.static('public'));
// app.use('/uploads', express.static('uploads'));
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));


// application router
app.use('/api/v1', router);


app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Plant Leave Detection Backend!')
})

app.use(globalErrorHandler);

//handle not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API Not Found',
      },
    ],
  });
  next();
});

export default app

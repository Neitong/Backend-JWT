import express from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import authMiddleware from './middleware/auth.middleware.js';
import cors from 'cors';

import { config } from 'dotenv';
config(); 


const app = express();
app.use(cors()); 
const port = process.env.PORT || 4000;

// Middleware
app.use(express.json());

// Swagger setup
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'School API',
      version: '1.0.0',
      description: 'A simple Express School API with Authentication',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    servers: [
      {
        url: `http://localhost:${port}`,
      },
    ],
  },
  apis: ['./routes/*.js'],
};

const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Routes
app.use('/users', authMiddleware, userRouter);
app.use('/auth', authRouter);

app.use((req, res, next) => {
  console.log('Body:', req.body);
  next();
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
  console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
});
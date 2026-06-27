// 1. Import the tools
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
// Import the custom function from our specialist file
import { connectToWhatsApp } from './src/bot/index.js'; 
import apiRouter from './src/routes/api.js';

// 2. Initializing the environment configuration variables (.env)
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// 3. Attach middlewares
app.use(cors());          // Allows frontend engineer to fetch data safely
app.use(express.json());  // Allows the app to parse incoming JSON request payloads
app.use('/api', apiRouter);  // Mount the API routes under the /api path

// 4. Create a safety checkpoint route
app.get('/', (req, res) => {
    res.send('Lumira Backend Server Running! 🚀');
});

// 5. Fire up the server on Port 3000
app.listen(PORT, () => {
    console.log(` [STEP 1]: Express server is successfully listening on port ${PORT}`);
    
    console.log(' [STEP 2]: Attempting to initialize Baileys WhatsApp Engine...');
    
    // Turn the key to run the function inside src/bot/index.js
    connectToWhatsApp().catch(err => {
        console.error('❌ WhatsApp Bot Error:', err);
    });
});

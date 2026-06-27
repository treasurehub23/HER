import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

// Pull the AI service URL from environment variables, with a fallback to a default URL
const AI_SERVICE_URL = process.env.AI_SERVICE_URL || 'https://lumira-9hoj.onrender.com';

/**
 * Sends message text to the Lumira AI to verify if a payment alert is real or fake
 * @param {string} textContent - The raw message from WhatsApp
 * @returns {Promise<object>} - The AI classification result
 */
export async function verifyAlertWithAI(textContent) {
    try {
        console.log(` [AI SERVICE]: Routing text to /verify-alert...`);
        const response = await axios.post(`${AI_SERVICE_URL}/verify-alert`, {
            text: textContent
        });
        return response.data; // This returns whatever JSON our AI engineer structured
    } catch (error) {
        console.error('❌ AI Service Verification Error:', error.message);
        throw error;
    }
}

/**
 * Sends text to the Lumira AI to parse a product sale log
 * @param {string} textContent - The raw chat order details
 * @returns {Promise<object>} - The parsed items, quantities, and totals
 */
export async function parseSaleWithAI(textContent) {
    try {
        console.log(` [AI SERVICE]: Routing text to /parse-sale...`);
        const response = await axios.post(`${AI_SERVICE_URL}/parse-sale`, {
            text: textContent
        });
        return response.data;
    } catch (error) {
        console.error('❌ AI Service Parsing Error:', error.message);
        throw error;
    }
}
import { verifyAlertWithAI, parseSaleWithAI } from '../services/ai.js';
import { supabase } from '../db/supabase.js';

/**
 * Main Message Router for Lumira Bot
 */
export async function handleIncomingMessage(sock, senderNumber, messageText) {
    const cleanText = messageText.trim();

    // 1. PAYMENT ALERT TRACK (.check)
    if (cleanText.toLowerCase().startsWith('.check')) {
        const textToAnalyze = cleanText.replace('.check', '').trim();
        await sock.sendMessage(senderNumber, { text: 'Analyzing verification details with Lumira AI... ⏳' });
        
        try {
            const aiResult = await verifyAlertWithAI(textToAnalyze);
            
            // Insert into the "alerts" table exactly as requested
            await supabase.from('alerts').insert([
                {
                    trader_phone: senderNumber,
                    alert_text: textToAnalyze,
                    verdict: aiResult.verdict || 'UNKNOWN', // 'real' or 'fake'
                    confidence: aiResult.confidence || 0,
                    timestamp: new Date()
                }
            ]);
            
            const reply = `🛡️ *Lumira Alert Verification*:\n\n` +
                          `Verdict: ${aiResult.verdict?.toUpperCase() || 'PROCESSED'}\n` +
                          `Confidence: ${aiResult.confidence || '100'}%\n` +
                          `Analysis: ${aiResult.analysis || 'Completed.'}`;
                          
            await sock.sendMessage(senderNumber, { text: reply });
        } catch (err) {
            console.error('Alert Logging Error:', err.message);
            await sock.sendMessage(senderNumber, { text: '❌ Service error checking alert.' });
        }
    }

    // 2. SALES RECORDING TRACK (.sale)
    else if (cleanText.toLowerCase().startsWith('.sale')) {
        const textToAnalyze = cleanText.replace('.sale', '').trim();
        await sock.sendMessage(senderNumber, { text: 'Processing sale record... 📝' });
        
        try {
            const aiResult = await parseSaleWithAI(textToAnalyze);
            
            // Insert into the "sales" table exactly matching your schema
            await supabase.from('sales').insert([
                {
                    trader_phone: senderNumber,
                    item: aiResult.item || 'Generic Item',
                    quantity: Number(aiResult.quantity) || 1,
                    amount: Number(aiResult.amount) || 0,
                    timestamp: new Date()
                }
            ]);

            await sock.sendMessage(senderNumber, { 
                text: `✅ *Sale Logged!*\n\nItem: ${aiResult.item}\nAmount: ₦${aiResult.amount}\nYour dashboard has been updated.` 
            });
        } catch (err) {
            console.error('Sales Logging Error:', err.message);
            await sock.sendMessage(senderNumber, { text: '❌ Failed to save sale entry.' });
        }
    }
    
    // 3. DEFAULT HELP RESPONSE
    else if (cleanText.toLowerCase() === 'hello' || cleanText.toLowerCase() === 'help') {
        await sock.sendMessage(senderNumber, { 
            text: '👋 Welcome to Lumira!\n\nUse *.check [text]* to verify an alert.\nUse *.sale [details]* to log a purchase.' 
        });
    }
}
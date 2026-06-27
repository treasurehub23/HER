import makeWASocket, { useMultiFileAuthState, DisconnectReason } from '@whiskeysockets/baileys';
import { Boom } from '@hapi/boom';
import pino from 'pino';
import qrcode from 'qrcode-terminal';
// Import the core router file
import { handleIncomingMessage } from './messageHandler.js';
import { initScheduler } from '../scheduler/reminders.js';

export async function connectToWhatsApp() {
    const { state, saveCreds } = await useMultiFileAuthState('whatsapp_auth_session');

    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: false, 
        logger: pino({ level: 'silent' })
    });

    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect, qr } = update;

        if (qr) {
            console.log('📱 Scan the QR code below to connect your WhatsApp account:');
            qrcode.generate(qr, { small: true });
        }

        if (connection === 'close') {
            const shouldReconnect = (lastDisconnect?.error instanceof Boom)?.output?.statusCode !== DisconnectReason.loggedOut;
            console.log('🔄 Connection closed, reconnecting: ', shouldReconnect);
            
            if (shouldReconnect) {
                connectToWhatsApp();
            }
        } else if (connection === 'open') {
            console.log('🚀 Lumira WhatsApp Bot is online and ready! ✅');
            initScheduler(sock); // Start the reminder scheduler after successful connection
        }
    });

    sock.ev.on('creds.update', saveCreds);

    // Direct all incoming streams to your structured message handler file
    sock.ev.on('messages.upsert', async (m) => {
        const msg = m.messages[0];
        if (!msg.message || msg.key.fromMe) return;

        const senderNumber = msg.key.remoteJid;
        const messageText = msg.message.conversation || msg.message.extendedTextMessage?.text;

        if (messageText) {
            console.log(`📩 Message stream incoming from [${senderNumber}]`);
            await handleIncomingMessage(sock, senderNumber, messageText);
        }
    });

    return sock;
}
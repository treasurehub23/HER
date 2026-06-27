import cron from 'node-cron';
import { supabase } from '../db/supabase.js';

/**
 * Boots background cron loops to monitor pending system events
 * @param {object} sock - The active Baileys WhatsApp connection socket instance
 */
export function initScheduler(sock) {
    console.log('⏰ [SCHEDULER SERVICE]: Reminder engine armed and active.');

    // Cron syntax '* * * * *' executes precisely every 60 seconds
    cron.schedule('* * * * *', async () => {
        const now = new Date().toISOString();

        try {
            // Read reminders matching the criteria outlined in your Phase 5 guidelines
            const { data: pendingReminders, error } = await supabase
                .from('reminders')
                .select('*')
                .eq('delivered', false)
                .lte('remind_at', now);

            if (error) throw error;

            if (pendingReminders && pendingReminders.length > 0) {
                console.log(`🔔 [SCHEDULER]: Found ${pendingReminders.length} pending notification tasks.`);

                for (const item of pendingReminders) {
                    const recipientJid = item.trader_phone.includes('@s.whatsapp.net') 
                        ? item.trader_phone 
                        : `${item.trader_phone.replace(/[^0-9]/g, '')}@s.whatsapp.net`;

                    // Push message out via our existing instance channel
                    await sock.sendMessage(recipientJid, {
                        text: `⏰ *Lumira System Reminder*:\n\n${item.message}`
                    });

                    // Update row log state to true so it doesn't duplicate
                    await supabase
                        .from('reminders')
                        .update({ delivered: true })
                        .eq('id', item.id);

                    console.log(`✅ [SCHEDULER]: Dispatched row index [${item.id}] successfully.`);
                }
            }
        } catch (err) {
            console.error('❌ Scheduler Loop Failure:', err.message);
        }
    });
}
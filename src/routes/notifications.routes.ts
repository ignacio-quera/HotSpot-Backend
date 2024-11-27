// src/routes/notificationRoutes.ts
import { Router } from 'express';
import { sendPushNotifications } from '../services/pushNotificationService';

const router = Router();

router.post('/send-notification', async (req, res) => {
  try {
    const { tokens, message } = req.body;

    if (!tokens || !message) {
      return res.status(400).json({ error: 'Tokens or message not provided' });
    }

    await sendPushNotifications(tokens, message);

    res.status(200).json({ success: 'Notifications sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to send notifications' });
  }
});

export default router;

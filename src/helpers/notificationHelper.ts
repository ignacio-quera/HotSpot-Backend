import { Expo } from 'expo-server-sdk';
const Event = require('../models/events');
const User = require('../models/user');

const expo = new Expo();

export const sendPushNotificationToUsers = async (eventId: string, title: string, body: string): Promise<void> => {
  try {
    const event = await Event.findById(eventId).populate('subscribers');
    if (!event) {
      console.error('Event not found');
      return;
    }

    const pushTokens = event.subscribers
      .map((subscriber: { pushToken?: string }) => subscriber.pushToken)
      .filter((token: string | undefined) => token !== undefined) as string[];

      const notifications = pushTokens.map((token) => ({
        to: token,
        title,
        body,
        data: { eventId },
      }));

    const chunks = expo.chunkPushNotifications(notifications);
    for (const chunk of chunks) {
      await expo.sendPushNotificationsAsync(chunk);
    }
  } catch (error) {
    console.error('Error sending push notifications:', error);
  }
};

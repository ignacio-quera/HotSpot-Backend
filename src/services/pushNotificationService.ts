// src/services/pushNotificationService.ts
import { Expo, ExpoPushMessage, ExpoPushTicket } from 'expo-server-sdk';

const expo = new Expo();

export const sendPushNotifications = async (
  pushTokens: string[],
  message: { title: string; body: string; data?: Record<string, unknown> }
): Promise<void> => {
  const messages: ExpoPushMessage[] = [];

  for (const token of pushTokens) {
    if (!Expo.isExpoPushToken(token)) {
      console.error(`Invalid push token: ${token}`);
      continue;
    }

    messages.push({
      to: token,
      sound: 'default',
      title: message.title,
      body: message.body,
      data: message.data || {},
    });
  }

  const chunks = expo.chunkPushNotifications(messages);
  const tickets: ExpoPushTicket[] = [];

  try {
    for (const chunk of chunks) {
      const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
      console.log('Ticket Chunk:', ticketChunk);
      tickets.push(...ticketChunk);
    }
  } catch (error) {
    console.error('Error sending notifications:', error);
  }
};

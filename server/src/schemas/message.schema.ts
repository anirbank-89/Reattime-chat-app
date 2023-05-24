import { object, string, array, ref } from 'yup';

export const addMessageSchema = object({
  body: object({
    from: string().required('Sender id is required'),
    to: string().required('Receiver id is required'),
    message: string().required('Message is required'),
  }),
});

export const getMessagesSchema = object({
  body: object({
    from: string().required('Sender id is required'),
    to: string().required('Receiver id is required'),
  }),
});

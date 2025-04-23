'use server';

import nodemailer from 'nodemailer';
import env from '@/config/env.config';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: env.EMAIL_USER,
    pass: env.EMAIL_PASS,
  },
});

export const sendMail = async (html: string) => {
  return await transporter.sendMail({
    from: env.EMAIL_USER,
    to: env.EMAIL_USER,
    subject: `Hello Software - Nowa wiadomość`,
    html,
  });
};

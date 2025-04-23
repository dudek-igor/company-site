'use server';

import nodemailer from 'nodemailer';
import { z } from 'zod';
import env from '@/config/env.config';

const phoneRegex = /^(\+?\d{1,3}[- ]?)?\(?\d{2,3}\)?[- ]?\d{3}[- ]?\d{3}$/;

const FormDataSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.union([z.literal(''), z.string().regex(phoneRegex)]),
  message: z.string().min(10),
});

type FormResponse = {
  success: boolean;
  errors?: Record<string, boolean>;
  values?: Partial<z.infer<typeof FormDataSchema>>;
};

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: env.EMAIL_USER,
    pass: env.EMAIL_PASS,
  },
});

export async function sendEmail(_prevState: FormResponse, formData: FormData): Promise<FormResponse> {
  const formValues = Object.fromEntries(formData.entries());

  const result = FormDataSchema.safeParse(formValues);

  if (!result.success) {
    const errors = result.error.formErrors.fieldErrors;
    return {
      success: false,
      errors: Object.fromEntries(Object.entries(errors).map(([key, value]) => [key, !!value?.[0]])),
      values: formValues,
    };
  }

  try {
    // throw new Error('asdasds');
    await transporter.sendMail({
      from: env.EMAIL_USER,
      to: env.EMAIL_USER,
      subject: `Hello Software - Nowa wiadomość od ${result.data.email}`,
      html: `<!DOCTYPE html><html><head><meta charset="UTF-8"></head><body style="font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;line-height:1.6;color:#333;max-width:600px;margin:0 auto;padding:20px"><div style="background-color:#4f46e5;color:white;padding:20px;text-align:center;border-radius:8px 8px 0 0"><h1>Nowa wiadomość z formularza kontaktowego</h1></div><div style="padding:25px;background-color:#f9fafb;border:1px solid #e5e7eb;border-top:none"><div style="margin-bottom:15px;padding-bottom:15px;border-bottom:1px solid #e5e7eb"><span style="font-weight:600;color:#4f46e5;display:inline-block;width:100px">Imię:</span><span>${result.data.name}</span></div><div style="margin-bottom:15px;padding-bottom:15px;border-bottom:1px solid #e5e7eb"><span style="font-weight:600;color:#4f46e5;display:inline-block;width:100px">Email:</span><span><a href="mailto:${result.data.email}" style="color:#4f46e5;text-decoration:none">${result.data.email}</a></span></div>${result.data.phone ? `<div style="margin-bottom:15px;padding-bottom:15px;border-bottom:1px solid #e5e7eb"><span style="font-weight:600;color:#4f46e5;display:inline-block;width:100px">Telefon:</span><span><a href="tel:${result.data.phone}" style="color:#4f46e5;text-decoration:none">${result.data.phone}</a></span></div>` : ''}<div style="margin-bottom:15px;padding-bottom:15px;border-bottom:none"><div style="margin-bottom:10px;font-weight:600;color:#4f46e5">Wiadomość:</div><div style="white-space:pre-line;background-color:white;padding:15px;border-radius:6px;border:1px solid #e5e7eb">${result.data.message}</div></div></div><div style="margin-top:20px;font-size:.8em;color:#6b7280;text-align:center"><p>Wiadomość wygenerowana automatycznie z formularza kontaktowego</p><p>© ${new Date().getFullYear()} Hello Software. Wszelkie prawa zastrzeżone.</p></div></body></html>`,
    });

    return { success: true };
  } catch (error) {
    console.error('Błąd wysyłania emaila:', error);
    return {
      success: false,
      values: formValues,
      errors: { general: true },
    };
  }
}

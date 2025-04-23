'use server';

import { z } from 'zod';
import { sendMail } from '@/libs';

const FormDataSchema = z.object({ email: z.string().email() });

type FormResponse = {
  success: boolean;
  error?: 'general' | 'email';
  values?: Partial<z.infer<typeof FormDataSchema>>;
};

export async function sendSubscriptionMail(_prevState: FormResponse, formData: FormData): Promise<FormResponse> {
  const formValues = Object.fromEntries(formData.entries());

  const result = FormDataSchema.safeParse(formValues);

  if (!result.success)
    return {
      success: false,
      error: 'email',
      values: formValues,
    };

  const html = `<!DOCTYPE html><html><head><meta charset="UTF-8"></head><body style="font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;line-height:1.6;color:#333;max-width:600px;margin:0 auto;padding:20px"><div style="background-color:#4f46e5;color:white;padding:20px;text-align:center;border-radius:8px 8px 0 0"><h1>Nowa subskrypcja newslettera</h1></div><div style="padding:25px;background-color:#f9fafb;border:1px solid #e5e7eb;border-top:none"><div style="margin-bottom:15px;padding-bottom:15px;border-bottom:none"><span style="font-weight:600;color:#4f46e5;display:inline-block;width:100px">Email:</span><span><a href="mailto:${result.data.email}}" style="color:#4f46e5;text-decoration:none">${result.data.email}}</a></span></div><div style="text-align:center;margin-top:20px;padding:15px;background-color:#eef2ff;border-radius:6px">Użytkownik potwierdził subskrypcję newslettera</div></div><div style="margin-top:20px;font-size:.8em;color:#6b7280;text-align:center"><p>Wiadomość wygenerowana automatycznie</p><p>© ${new Date().getFullYear()} Hello Software. Wszelkie prawa zastrzeżone.</p></div></body></html>`;

  try {
    await sendMail(html);
    return { success: true };
  } catch (error) {
    console.error('Błąd wysyłania emaila:', error);
    return {
      success: false,
      values: formValues,
      error: 'general',
    };
  }
}

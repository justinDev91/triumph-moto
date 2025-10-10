import Activate from '@/interfaces/email/activate';
import emailjs from '@emailjs/browser';

export default async function useActivateEmail({
  link,
  name,
  userEmail,
}: Activate): Promise<Number> {
  const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID as string;
  const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID as string;
  const userID = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
  const emailParams = {
    name,
    link,
    userEmail,
  };
  const response = await emailjs.send(
    serviceID,
    templateID,
    emailParams,
    userID,
  );
  return response.status;
}

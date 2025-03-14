import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");

export class MailService {
  static async sendVerificationEmail(email: string, verificationCode: string): Promise<void> {
    const msg = {
      to: email,
      from: "ferrodest1999@gmail.com",
      subject: "Verificación de Email",
      text: `Tu código de verificación es: ${verificationCode}`,
      html: `<p>Tu código de verificación es: <strong>${verificationCode}</strong></p>`,
    };

    try {
      await sgMail.send(msg);
    } catch (error) {
      console.error("Error enviando email", error);
      throw error;
    }
  }
}

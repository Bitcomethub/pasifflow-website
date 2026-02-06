import nodemailer from "nodemailer";

interface LeadData {
  fullName?: string;
  email: string;
  phone?: string;
  source?: string;
  budget?: string;
}

// Sanitize user input to prevent XSS in HTML emails
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function sendLeadNotification(data: LeadData) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD } = process.env;

  // If credentials are not set, log and skip (prevents crashing if not configured)
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASSWORD) {
    console.warn("SMTP credentials not set. Skipping lead notification email.");
    return;
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT) || 587,
    secure: Number(SMTP_PORT) === 465, // true for 465, false for other ports
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASSWORD,
    },
  });

  const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "info@pasiflow.com";

  const mailOptions = {
    from: `"Pasiflow System" <${SMTP_USER}>`,
    to: ADMIN_EMAIL, // Admin email from env
    subject: `🔔 Yeni Lead: ${data.fullName || "Yeni Kullanıcı"}`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
        <h2 style="color: #1a1a1a;">Yeni Potansiyel Müşteri (Lead)</h2>
        <p>Web sitesinden yeni bir kayıt veya form gönderimi alındı.</p>
        
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <tr style="background-color: #f9f9f9;">
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>Ad Soyad:</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">${escapeHtml(data.fullName || "-")}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>E-posta:</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;"><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></td>
          </tr>
          <tr style="background-color: #f9f9f9;">
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>Telefon:</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">${escapeHtml(data.phone || "-")}</td>
          </tr>
           <tr style="background-color: #fff;">
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>Kaynak:</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">${escapeHtml(data.source || "Signup / Lead Gen")}</td>
          </tr>
        </table>

        <p style="margin-top: 20px; font-size: 12px; color: #666;">
          Bu e-posta Pasiflow Web Sitesi tarafından otomatik olarak gönderilmiştir.
        </p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Lead notification sent to info@pasiflow.com for ${data.email}`);
  } catch (error) {
    console.error("Error sending lead notification:", error);
  }
}

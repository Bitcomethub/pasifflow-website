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
  } catch (error) {
    console.error("Error sending lead notification:", error);
  }
}

interface LlcLinkData {
  email: string;
  fullName: string;
  llcName: string;
  formationLink: string;
}

export async function sendLlcLinkEmail(data: LlcLinkData) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD } = process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASSWORD) {
    console.warn("SMTP credentials not set. Skipping LLC link email.");
    return;
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT) || 587,
    secure: Number(SMTP_PORT) === 465,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASSWORD,
    },
  });

  const mailOptions = {
    from: `"Pasiflow" <${SMTP_USER}>`,
    to: data.email,
    subject: `Your LLC Formation Link — Pasiflow`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
        <div style="text-align: center; margin-bottom: 32px;">
          <h1 style="color: #1F2328; font-size: 24px; margin: 0;">Pasiflow</h1>
          <p style="color: #C1A05E; font-size: 14px; margin: 4px 0 0;">LLC Formation Service</p>
        </div>

        <div style="background: #F8F8F6; border-radius: 12px; padding: 32px; margin-bottom: 24px;">
          <p style="color: #3D4852; font-size: 16px; margin: 0 0 16px;">
            Dear ${escapeHtml(data.fullName)},
          </p>
          <p style="color: #3D4852; font-size: 14px; line-height: 1.6; margin: 0 0 16px;">
            Your LLC formation for <strong>${escapeHtml(data.llcName)}</strong> is ready to proceed.
            Please click the button below to access your formation link:
          </p>

          <div style="text-align: center; margin: 24px 0;">
            <a href="${escapeHtml(data.formationLink)}"
               style="display: inline-block; background: #C1A05E; color: white; text-decoration: none;
                      padding: 14px 32px; border-radius: 8px; font-weight: bold; font-size: 14px;">
              Access Formation Link
            </a>
          </div>

          <p style="color: #6B7280; font-size: 12px; line-height: 1.6; margin: 16px 0 0;">
            If the button doesn't work, copy and paste this URL:<br/>
            <a href="${escapeHtml(data.formationLink)}" style="color: #C1A05E; word-break: break-all;">
              ${escapeHtml(data.formationLink)}
            </a>
          </p>
        </div>

        <p style="color: #6B7280; font-size: 12px; text-align: center;">
          This email was sent by Pasiflow LLC Formation Service.<br/>
          If you have questions, reply to this email or contact us at info@pasiflow.com
        </p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending LLC link email:", error);
  }
}

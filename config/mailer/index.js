import dotenv from 'dotenv';
dotenv.config();

import transport from './services/smtp/transport.js';
import templateRenderer from './renderer.js';

const sendMail = async (
  template,
  subject,
  to,
  data,
  from = process.env.FROM_MAIL,
  type = 'simple',
  attachmentBuffer = null,
  attachmentFilename = null
) => {
  try {
    const locals = {
      data,
      site_title: process.env.SITE_TITLE || '',
      email_logo: process.env.LOGO_PATH || '',
      current_year: new Date().getFullYear(),
    };

    const html = await templateRenderer.render(template, locals);

    const mailOptions = {
      from,
      to,
      subject,
      ...(type !== 'attachment' && { html }),
      ...(type === 'attachment' && attachmentBuffer && attachmentFilename && {
        attachments: [
          {
            filename: attachmentFilename,
            content: attachmentBuffer,
            contentType: 'application/pdf',
          },
        ],
      }),
    };

    const result = await transport.sendMail(mailOptions);
    console.log(`✅ Email sent to ${to} | Subject: "${subject}"`);
    return result;
  } catch (err) {
    console.error(`❌ Failed to send email to ${to} | Subject: "${subject}"`, err);
    return err;
  }
};

export default sendMail;

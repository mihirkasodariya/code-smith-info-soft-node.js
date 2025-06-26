import ejs from 'ejs';
import { readFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const mailer = await import(`./services/${process.env.MAIL_SERVICE}/index.js`)
  .then(mod => mod.default || mod)
  .catch(err => {
    console.error(`Failed to load mailer service "${process.env.MAIL_SERVICE}":`, err);
    throw err;
  });

const renderTemplate = async (templateName, data) => {
  const filePath = join(__dirname, 'templates', `${templateName}.ejs`);
  const templateContent = await readFile(filePath, 'utf-8');
  return ejs.render(templateContent, data);
};

const sendMail = async (template, subject, email, emailData, from = process.env.FROM_MAIL, type = 'simple', attachmentBuffer = null, attachmentFilename = null) => {
  try {
    const locals = {
      data: emailData,
      site_title: process.env.SITE_TITLE || '',
      email_logo: process.env.LOGO_PATH || '',
      current_year: new Date().getFullYear(),
    };
    const renderedTemplate = await renderTemplate(template, locals);
    const result = type === 'attachment' && attachmentBuffer && attachmentFilename ? mailer(email, from, subject, emailData, type, attachmentBuffer, attachmentFilename) : mailer(email, from, subject, renderedTemplate, 'simple');
    console.debug(`Email sent to ${email} | Subject: "${subject}"`);
    return result;
  } catch (error) {
    console.error(`Failed to send email to ${email} | Subject: "${subject}"`, error);
    return error;
  }
};

export default sendMail;








// import Email from 'email-templates';
// import { join } from 'path';
// import { fileURLToPath } from 'url';
// import { dirname } from 'path';
// import dotenv from 'dotenv';
// dotenv.config();

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// const mailer = await import(`./services/${process.env.MAIL_SERVICE}/index.js`).then(mod => mod.default || mod);

// const templateRenderer = new Email({
//   views: {
//     root: join(__dirname, 'templates'),
//     options: { extension: 'ejs' },
//   },
// });

// const sendMail = async (template, subject, email, emailData, from = process.env.FROM_MAIL, type = 'simple', attachmentBuffer = null, attachmentFilename = null) => {
//   try {
//     const locals = { data: emailData };
//     locals.site_title = process.env.SITE_TITLE || '';
//     locals.email_logo = process.env.LOGO_PATH || '';
//     locals.current_year = new Date().getFullYear();

//     const renderedTemplate = await templateRenderer.render(template, locals);

//     let result;
//     if (type === 'attachment' && attachmentBuffer && attachmentFilename) {
//       result = mailer(email, from, subject, emailData, type, attachmentBuffer, attachmentFilename);
//     } else {
//       result = mailer(email, from, subject, renderedTemplate, 'simple');
//     };
//     console.debug(`Email Sent Successfully to ${email} with Subject "${subject}"`);
//     return result;
//   } catch (error) {
//     console.error(`Error Sending Email to ${email} with Subject "${subject}":`, error);
//     return error;
//   };
// };
// export default sendMail;
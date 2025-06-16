import Email from 'email-templates';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const templateRenderer = new Email({
  views: {
    root: join(__dirname, 'templates'),
    options: { extension: 'ejs' },
  },
});

export default templateRenderer;

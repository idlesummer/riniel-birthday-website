// Builtin imports
import path from 'path';

// Library imports
import 'dotenv/config';
import express from 'express';
import exphbs from 'express-handlebars';

// Local file imports
import routes from '#routes/route-handler.js';

// Server setup and middleware
const PORT = process.env.PORT ?? 3000;
const app = express();
const hbs = exphbs.create({ extname: 'hbs' });
const viewsDirectoryPath = path.join(import.meta.dirname, 'views');
const publicDirectoryPath = path.join(import.meta.dirname, '../public');

// Server configurations
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', viewsDirectoryPath);
app.set('view cache', false);
app.use('/static', express.static(publicDirectoryPath));

// Router configuration
app.use(routes);

// Server startup
app.listen(PORT, async () => console.log(`App is now listening on port: ${PORT}`));

import { config } from 'dotenv';
import app from './app';

config(); // This enables dotenv configulations


const port = process.env.PORT || 5000;
app.listen(port, () => console.log('info', `Server is running on http://localhost:${port}`));
export default app;

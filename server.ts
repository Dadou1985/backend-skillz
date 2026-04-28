
import app from './src/app.ts';
import { PORT, NODE_ENV } from './src/config/env.ts';
import { createServer } from 'http';

const server = createServer(app);

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);

    if (NODE_ENV === 'development') {
        console.log('Running in development mode');
    } else {
        console.log('Running in production mode');
    }
});
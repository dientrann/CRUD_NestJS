import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
    SERVER_PORT:{
        HOST: process.env.HOST || 'localhost',
        PORT: parseInt(process.env.PORT) || 8301,
    },
    MONGO_URI: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/CRUD',
    KEY_TOKEN: process.env.KEY_TOKEN || '@@@',
    GENSALT: parseInt(process.env.GENSALT) || 10,
    SIZEPAGE: parseInt(process.env.SIZEPAGE) || 2,
}));



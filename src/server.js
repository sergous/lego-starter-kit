import polyfill from 'lego-starter-kit/utils/polyfill';
// import App from 'lego-starter-kit/CoreApp'
import App from 'lego-starter-kit/ReactApp';
import config from './config';
polyfill();
config.extendEnv(process.env.CONFIG_PATH || undefined);
const ctx = { config };
const app = new App(ctx);
app.start()

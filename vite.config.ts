// vite.config.ts
import path from 'path';
import { UserConfig } from 'vite';

const config: UserConfig = {
    css: {
        preprocessorOptions: {
            scss: {
                api: 'modern-compiler',
            },
        },
    },
    resolve: {
        alias: [
            { find: '@', replacement: path.resolve(__dirname, 'src') },
            { find: '@@', replacement: path.resolve(__dirname) },
        ],
    },
};
export default config;

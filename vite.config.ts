import { UserConfig, ConfigEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
// import styleImport from 'vite-plugin-style-import'
import { wrapperEnv } from './build/utils'
// import dotenv from 'dotenv'
import path from 'path'
import { resolve } from 'path';
import { loadEnv } from 'vite';

function pathResolve(dir: string) {
    return resolve(process.cwd(), '.', dir);
}

export default ({ command, mode }: ConfigEnv): UserConfig => {
    const root = process.cwd();
    const env = loadEnv(mode, root);
    const viteEnv = wrapperEnv(env);
    const { VITE_PORT, VITE_PUBLIC_PATH, VITE_DROP_CONSOLE } = viteEnv;
    const isBuild = command === 'build';
    console.log(isBuild);

    // const GVA_ENV = dotenv.parse(fs.readFileSync(`.env.${mode}`))
    return {
        base: VITE_PUBLIC_PATH,
        root,
        resolve: {
            alias: {
                '/@': path.resolve(__dirname, './src'),
                '/\/#\//': pathResolve('types') + '/',
            }
        },
        server: {
            port: VITE_PORT,
            // 是否自动在浏览器打开
            open: true,
            // 是否开启 https
            https: false,
            proxy: {
                '/api': {
                    target: 'http://localhost:9000/',
                    changeOrigin: true,
                    rewrite: (pathStr) => pathStr.replace('/api', '')
                }
            }
        },
        optimizeDeps: {
            include: [
                // "element-plus",
                // "element-plus/lib/locale/lang/zh-cn",
                // "dayjs/locale/zh-cn",
            ],
        },
        build: {
            target: 'es2015',
            terserOptions: {
                compress: {
                    keep_infinity: true,
                    // Used to delete console in production environment
                    drop_console: VITE_DROP_CONSOLE,
                },
            },
            // 压缩
            minify: "esbuild",
            assetsDir: "",
            outDir: `./dist/${process.env.VITE_ENV}`,
        },
        plugins: [
            vue(),
            // styleImport({
            //     libs: [{
            //         libraryName: 'element-plus',
            //         esModule: true,
            //         ensureStyleFile: true,
            //         resolveStyle: (name) => {
            //             name = name.slice(3)
            //             return `element-plus/packages/theme-chalk/src/${name}.scss`;
            //         },
            //         resolveComponent: (name) => {
            //             return `element-plus/lib/${name}`;
            //         },
            //     }]
            // })
        ]
    }
}
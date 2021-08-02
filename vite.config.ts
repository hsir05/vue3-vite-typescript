import { UserConfig, ConfigEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import styleImport from 'vite-plugin-style-import'
import { wrapperEnv } from './build/utils'
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

    return {
        base: VITE_PUBLIC_PATH,
        root,
        define: {
            'process.env': {}
        },
        resolve: {
            // 忽略后缀名的配置选项, 添加 .vue 选项时要记得原本默认忽略的选项也要手动写入
            extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
            alias: { 
                '/@': path.resolve(__dirname, './src'),
                '/\/#\//': pathResolve('types') + '/',
                'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js'
            }
        },
        server: {
            port: VITE_PORT,
            host: '0.0.0.0',
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
                '@iconify/iconify',
                'ant-design-vue/es/locale/zh_CN',
                'moment/dist/locale/zh-cn',
                'ant-design-vue/es/locale/en_US',
                'moment/dist/locale/eu',
            ],
            exclude: ['vue-demi'],
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
        css: {
            preprocessorOptions: {
                less: {
                    additionalData: `@import "src/assets/styles/index.less";`,
                    modifyVars: { // 更改主题在这里
                        'primary-color': '#52c41a',
                        'link-color': '#1DA57A',
                        'border-radius-base': '2px'
                    },
                    javascriptEnabled: true
                }
            }
        },
        plugins: [
            vue(),
            styleImport({
                libs: [{
                    libraryName: 'ant-design-vue',
                    esModule: true,
                    resolveStyle: (name) => {
                        return `ant-design-vue/es/${name}/style/css`;
                    },
                }]
            })
        ]
    }
}
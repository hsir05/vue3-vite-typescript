import { defineConfig, UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ mode }: UserConfig): UserConfig => {
    return {
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "src")
            }
        },
        plugins: [vue()],
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: `@import "src/assets/styles/index.scss";`
                }
            }
        },
        server: {
            open: true,
            proxy: {
                '/api/v1/chart': {
                    target: 'http://192.168.12.116:8887',
                    changeOrigin: true
                },
            }
        }
    }
})
// export default defineConfig( ({ mode }: UserConfig): UserConfig => {
//     // resolve: {
//     //     alias: {
//     //         "@": path.resolve(__dirname, "src")
//     //     }
//     // },
//   plugins: [vue()],
//     css: {
//         preprocessorOptions: {
//             scss: {
//                 additionalData: `@import "src/assets/styles/index.scss";`
//             }
//         }
//     },
//     server: {
//         open: true,
//         proxy: {
//             '/api/v1/chart': {
//                 target: 'http://192.168.12.116:8887',
//                 changeOrigin: true
//             },
//         }
//     }

// })
    
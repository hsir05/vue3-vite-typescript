const path = require('path')
const { generateTheme } = require('antd-theme-generator');

const options = {
    antDir: path.join(__dirname, '../node_modules/ant-design-vue'),
    stylesDir: path.join(__dirname, '../src/assets/styles'), // all files with .less extension will be processed
    varFile: path.join(__dirname, '../src/assets/styles/variables.less'), // default path is Ant Design default.less file
    mainLessFile: path.join(__dirname, "../src/assets/styles/main.less"),
    themeVariables: [
        "@primary-color",
        "@secondary-color",
        "@text-color",
        "@text-color-secondary",
        "@heading-color",
        "@layout-body-background",
        "@layout-header-background",
        "@border-radius-base"
    ],
    // if provided, file will be created with generated less/styles
    outputFilePath: path.join(__dirname, '../public/color.less'), 
    // An array of regex codes to match your custom color variable values so that code can identify that it's a valid color. Make sure your regex does not adds false positives
    customColorRegexArray: [/^fade\(.*\)$/],
}

generateTheme(options).then(less => {
    console.log('Theme generated successfully');
}).catch(error => {
    console.log('Error', error);
})
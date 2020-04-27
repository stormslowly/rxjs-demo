'use strict';
const path = require('path');
const transformFactory = require('ts-import-plugin');
const plugin = transformFactory([
    {
        libraryDirectory: '../_esm5/internal/operators',
        libraryName: 'rxjs/operators',
        camel2DashComponentName: false,
        transformToDefaultImport: false
    },
    {
        libraryDirectory: '../_esm5/internal/observable',
        libraryName: 'rxjs',
        camel2DashComponentName: false,
        transformToDefaultImport: false,
    }
])


module.exports = {
    devtool: 'inline-source-map',
    entry: './src/index.ts',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                options: {
                    transpileOnly: true,
                    getCustomTransformers: () => ({
                        before: [plugin]
                    }),
                    compilerOptions: {
                        module: 'ESNext'
                    }
                }

            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    }
};

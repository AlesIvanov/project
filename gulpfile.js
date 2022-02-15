const { src, dest, watch, series } = require('gulp');
const webpack = require("webpack-stream")
const sass = require("gulp-sass")(require('sass'))
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const dist = "C://OpenServer/domains/react-admin/admin"


const html = (cb) => {
    src("./app/src/*.html")
        .pipe(dest(dist))
        // .pipe(browserSync.stream())
    cb()
}

/*const copySass = (cd) => {
    src("./app/scss/style.scss")
        .pipe(sass().on('error', sass.logError))
        .pipe(dest(dist))
    cd()
}*/

const js = (cd) => {
    src("./app/src/main.js")
        .pipe(webpack({
            mode: 'development',
            output: {
                filename: 'script.js'
            },
            watch: false,
            devtool: "source-map",
            plugins: [new MiniCssExtractPlugin()],
            module: {
                rules: [
                    {
                        test: /\.m?js$/,
                        exclude: /(node_modules|bower_components)/,
                        use: {
                            loader: 'babel-loader',
                            options: {
                                presets: [
                                    ['@babel/preset-env',
                                        {
                                            debug: false,
                                            corejs: 3,
                                            useBuiltIns: "usage"
                                        }],
                                    "@babel/react"]
                            }
                        }
                    },
                    {
                        test: /\.css$/,
                        use: [MiniCssExtractPlugin.loader,'css-loader']
                    },
                    {
                        test: /\.s[ac]ss$/i,
                        use: [
                            // Creates `style` nodes from JS strings
                            "style-loader",
                            // Translates CSS into CommonJS
                            "css-loader",
                            // Compiles Sass to CSS
                            "sass-loader",
                        ],
                    },
                ]
            }
        }))
        .pipe(dest(dist))
    cd()
}

const api = (cd) => {
    src("./app/api/**/*.*")
        .pipe(dest(dist + '/api'))
    cd()
}

const assets = (cd) => {
    src("./app/assets/**/*.*")
        .pipe(dest(dist + '/assets'))
    cd()
}

const watcher = () => {
    watch("./app/src/*.html", html)
    watch("./app/src/main.js", js)
    watch("./app/scss/style.scss", js)
    watch("./app/css/style.css", js)
    watch("./app/api/**/*.*", api)
    watch("./app/assets/**/*.*", assets)
}

module.exports = {
    html,
    // copySass,
    js,
    api,
    assets,
    watch: watcher,
    dev : series(
        html,
        // copySass,
        js,
        api,
        assets,
        watcher
    ),
    build: series(
        html,
        // copySass,
        js,
        api,
        assets,
    )
}
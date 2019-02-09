# vue-project-cli
vue project command line tool

# 使用
```
Usage: vp [options] [command]

Options:
  -v, --version  output the version number
  -h, --help     output usage information

Commands:
  dev            项目开发
  build          项目构建
  inspect        查看项目配置
  help [cmd]     display help for [cmd]
```
```
Usage: vp-dev [options]

Options:
  --mode <mode>     项目模式，根据此值选择 webpack 配置，可选项：development、production。 (default: "development")
  --node-env <env>  设置 process.env.NODE_ENV 的值，默认与 mode 为相同值。
  -h, --help        output usage information
```
```
Usage: vp-build [options]

Options:
  --mode <mode>     项目模式，根据此值选择 webpack 配置，可选项：development、production。 (default: "production")
  --node-env <env>  设置 process.env.NODE_ENV 的值，默认与 mode 为相同值。
  -h, --help        output usage information
```
```
Usage: vp-inspect [options]

Options:
  --mode <mode>     项目模式，根据此值选择 webpack 配置，可选项：development、production。 (default: "production")
  --node-env <env>  设置 process.env.NODE_ENV 的值，默认与 mode 为相同值。
  -h, --help        output usage information
```

# 开发过程问题记录
- autoprefixer、babel-plugin-syntax-dynamic-import、babel-preset-env、babel-preset-stage-3、babel-preset-vue、babel-eslint 等模块必须安装在项目的 node_modules 中才有效，猜测与 post-css、babel、eslint 等模块内部机制有关。
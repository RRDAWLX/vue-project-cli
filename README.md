# vue-project-cli
vue project command line tool

# 开发过程问题记录
- autoprefixer、babel-plugin-syntax-dynamic-import、babel-preset-env、babel-preset-stage-3、babel-preset-vue、babel-eslint 等模块必须安装在项目的 node_modules 中才有效，猜测与 post-css、babel、eslint 等模块内部机制有关。
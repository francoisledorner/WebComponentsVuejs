//webpack.config.js
{
    test: /\.scss$/,
    use: [
      'vue-style-loader',
      'css-loader',
      {
        loader: 'sass-loader',
        options: {
          data: `
          @import "./src/styles/std-grey";
          @import "./src/styles/std-blue";
          @import "./src/styles/std-table";
          @import "./src/styles/std-tree-table";          
          `
        }
      }
    ]
  }


const sassVars = require(__dirname + "/src/style/std-pastille.js");


module.exports = {
      {
        test: /\.scss$/,
        use: [{
            loader: "style-loader"
        }, {
            loader: "css-loader"
        }, {
            loader: "sass-loader"
            options: {
              functions: {
                "get($keys)": function(keys) {
                  keys = keys.getValue().split(".");
                  let result = sassVars;
                  let i;
                  for (i = 0; i < keys.length; i++) {
                    result = result[keys[i]];
                  }
                  result = sassUtils.castToSass(result);
                  return result;
                }
              }
            }
        }]
      }
    }
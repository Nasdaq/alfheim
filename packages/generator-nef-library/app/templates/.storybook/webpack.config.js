const path = require("path");

module.exports = ({ config, mode }) => {
  // mode has a value of 'DEVELOPMENT' or 'PRODUCTION'
  // You can change the configuration based on that.
  // 'PRODUCTION' is used when building the static version of storybook.

  // make changes as needed
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: require.resolve("awesome-typescript-loader"),
    options: {
      getCustomTransformers: path.join(
        __dirname,
        "./webpack.ts-transformers.js"
      )
    }
  });

  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    include: path.resolve(__dirname, "../src"),
    use: [require.resolve("react-docgen-typescript-loader")]
  });

  config.module.rules.push({
    test: /\.stories.tsx?$/,
    loaders: [
      {
        loader: require.resolve("@storybook/addon-storysource/loader"),
        options: { parser: "typescript" }
      }
    ],
    enforce: "pre"
  });

  config.resolve.extensions.push(".ts", ".tsx");

  // Return the altered config
  return config;
};

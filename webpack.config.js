const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = {
  output: {
    uniqueName: 'lab',
    publicPath: 'auto',
    module: true, // ✅ required for ESM
    scriptType: 'module',
  },
  experiments: {
   outputModule: true, // ✅ required for ESM
  },
  ...withModuleFederationPlugin({
    library: { type: 'module' }, // ✅ required for ESM

  name: 'lab',
    filename: 'lab-remoteEntry.js',

    exposes: {
      './AppModule': './src/app/app.module.ts',
    },

    shared: {
      ...shareAll({
        singleton: true,
        strictVersion: true,
        requiredVersion: 'auto',
      }),
    },
  }),
};

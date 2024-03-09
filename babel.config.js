module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ['react-native-paper/babel',[
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@components': './components',
          '@screens': './screens',
          '@utils': './utils',
          '@assets': './assets',
          '@config': './config',
          '@services': './services',
          '@hooks': './hooks',
          '@constants': './constants',
        },
      },
    ]]
  };
};

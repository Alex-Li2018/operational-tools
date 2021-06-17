module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset',
  ],
  plugins: [
    [
      'import',
      {
        libraryName: 'element-plus',
        customStyleName: (name) => {
          const title = name.slice(3);
          return `element-plus/packages/theme-chalk/src/${title}.scss`;
        },
      },
    ],
  ],
};

const reactToolboxVariables = {
  'color-text': '#444548',
  /* Note that you can use global colors and variables */
  'color-primary': '#364147',
  'button-height': '30px',
  'color-accent': '#f44336'
};
module.exports = {
  plugins: {
    'postcss-import': {
      root: __dirname,
    },
    'postcss-mixins': {},
    'postcss-each': {},
    'postcss-cssnext': {
              features: {
          customProperties: {
            variables: reactToolboxVariables,
            },
        },

    }
  },
};

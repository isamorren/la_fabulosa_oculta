module.exports = {
  root: true,
  extends: ['@filmverse/eslint-config'],
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
}

module.exports = {
  extends: "eslint:recommended",
  parser: "babel-eslint",
  plugins: ["react"],
  rules: {
    "no-unused-vars": "off",
    "no-empty": "off",
    "no-console": "off",
    "no-undef": "off",
    "no-useless-escape": "off",
    "no-extra-boolean-cast": "off"
  }
};
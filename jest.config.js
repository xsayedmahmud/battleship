module.exports = {
  verbose: true,
  collectCoverage: true,
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "\\.(css)$": "identity-obj-proxy",
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "/__mocks__/fileMock.js",
  },
  transform: {
    "\\.[jt]sx?$": "babel-jest",
  },
};

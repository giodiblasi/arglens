const parsingError = () => ({
  either: error => error(),
});

const parsingSuccess = value => ({
  either: (err, success) => success(value),
});

module.exports = {
  parsingError,
  parsingSuccess,
};

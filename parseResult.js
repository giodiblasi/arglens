const parsingError = value => ({
  either: error => error(value),
});

const parsingSuccess = value => ({
  either: (err, success) => success(value),
});

module.exports = {
  parsingError,
  parsingSuccess,
};

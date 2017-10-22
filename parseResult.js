const parsingError = () => error => error();

const parsingSuccess = value => (err, success) => success(value);

module.exports = {
  parsingError,
  parsingSuccess,
};

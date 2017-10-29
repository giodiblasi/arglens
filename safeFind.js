const eitherFind = (findMethod, criteria) => {
  const result = findMethod();
  return {
    result,
    either: (onFail, onSuccess) =>
      (criteria(result) ? onSuccess(result) : onFail(result)),
  };
};

module.exports = eitherFind;

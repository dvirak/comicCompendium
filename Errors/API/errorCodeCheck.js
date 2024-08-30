function errorCodeCheck(res, errorCode) {
  return res.redirect(`https://httpstat.us/${errorCode}`);
}

module.exports = errorCodeCheck;

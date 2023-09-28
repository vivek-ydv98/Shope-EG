const passport = require("passport");

exports.isAuth = (req, res, next) => {
  return passport.authenticate("jwt");
};

exports.sanitizeUser = (user) => {
  return { id: user.id, role: user.role };
};

exports.cookieExtractor = function (req) {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["jwt"];
  }
  ///
  // token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MGViOGRiOTJjZjQxYTZjMjVjNmQyNyIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjk1OTA0MDk4fQ.sjYuV1tlPI1DF4xzaHb4wsaOKTXr8eRSKjSsHiTSc3w";
  return token;
};

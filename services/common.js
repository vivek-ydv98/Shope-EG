const passport = require("passport");
const nodemailer = require("nodemailer");

// Email
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: { user: "vivekyadav8101998@gmail.com", pass: process.env.MAIL_PASSWORD },
});

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
  //this is temporary token for testing without cookie
  // token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MGViOGRiOTJjZjQxYTZjMjVjNmQyNyIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjk1OTA0MDk4fQ.sjYuV1tlPI1DF4xzaHb4wsaOKTXr8eRSKjSsHiTSc3w";
  return token;
};

// send mail with defined transport object
exports.sendMail = async ({ to, subject, text, html }) => {
  const info = await transporter.sendMail({
    from: '"E-commerce" <vivekyadav8101998@gmail.com>',
    to: to,
    subject: subject,
    text: text,
    html: html,
  });
  return info;
};

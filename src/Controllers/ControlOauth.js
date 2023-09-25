const { createToken } = require("../Midleware/jwt");

exports.loginSucces = (req, res, next) => {
  if (req.user) {
    const accessToken = createToken(req.user.username || req.user.displayName);
    res.cookie("accessToken", accessToken, {
      maxAge: 60 * 60 * 30, // Maksimum usia cookie dalam detik
      httpOnly: true, // Cookie hanya dapat diakses melalui HTTP (tidak dapat diakses melalui JavaScript)
      signed: true, // Cookie ditandatangani untuk menghindari perubahan oleh pengguna
      sameSite: "strict", // Pengaturan SameSite untuk keamanan
      secure: true, // Aktifkan secure untuk penggunaan HTTPS
      expires: new Date(Date.now() + 30 * 60 * 1000), // Waktu kedaluwarsa cookie
      // domain: "example.com", // Ganti dengan domain Anda
    });
    res.status(200).json({
      succes: true,
      message: "success",
      status: 200,
      user: req.user,
      //!bisa pasang jwt
      //   cookie:req.cookies
    });
  }
};

exports.Logout = (req, res, next) => {
  req.logout();
  res.redirect("http://localhost:3000/Login");
};

exports.LoginError = (req, res, next) => {
  res.status(401).json({
    succes: false,
    message: "failure",
    status: 401,
  });
};

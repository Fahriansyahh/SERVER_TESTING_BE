const { validationResult, cookie } = require("express-validator");
const {
  users,
  CreateUsers,
  UpdateUser,
  DeleteUser,
} = require("../models/user");
const bcrypt = require("bcrypt");
const { createToken } = require("../Midleware/jwt");

exports.Login = async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    const [data] = await users();
    const acounts = data.filter((data) => {
      return data.username === username;
    });
    if (acounts.length > 0 && acounts[0].password) {
      bcrypt.compare(password, acounts[0].password, function (err, result) {
        if (!err) {
          if (result) {
            // Password sesuai, lakukan tindakan selanjutnya
            const accessToken = createToken(acounts[0]);
            res.cookie("accessToken", accessToken, {
              maxAge: 60 * 60 * 30, // Maksimum usia cookie dalam detik
              httpOnly: true, // Cookie hanya dapat diakses melalui HTTP (tidak dapat diakses melalui JavaScript)
              signed: true, // Cookie ditandatangani untuk menghindari perubahan oleh pengguna
              sameSite: "strict", // Pengaturan SameSite untuk keamanan
              secure: true, // Aktifkan secure untuk penggunaan HTTPS
              expires: new Date(Date.now() + 30 * 60 * 1000), // Waktu kedaluwarsa cookie
            });

            res.status(200).json({
              message: "login successful",
              status: 200,
            });
          } else {
            // Password tidak sesuai
            res.status(401).json({
              message: "Invalid password",
              status: 401,
            });
          }
        } else {
          console.log(err); // Handle kesalahan yang mungkin terjadi saat membandingkan
          res.status(500).json({
            message: "Error comparing passwords",
            status: 500,
          });
        }
      });
    } else {
      res.status(500).json({
        message: "Invalid username or password",
        status: 500,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(400).status(500).json({
      error: "server error",
      status: 400,
    });
  }
};

exports.Create = async (req, res, next) => {
  const body = req.body;
  const errors = validationResult(req);

  try {
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Validation errors",
        data: errors.array(),
        status: 400,
      });
    }

    const [data] = await users();
    const username = body.username;
    const accounts = data.filter((data) => {
      return data.username === username;
    });

    if (accounts.length === 0) {
      // Jika akun tidak ada, hash password dan simpan ke database
      bcrypt.hash(body.password, 10, async (err, hash) => {
        if (err) {
          return res.status(500).json({
            message: "Hash error",
            data: body,
            status: 500,
          });
        }

        // Simpan akun baru ke database
        try {
          await CreateUsers(body, hash);
          body.password = hash;
          res.status(201).json({
            message: "Create Users Success",
            data: body,
            status: 201,
          });
        } catch (error) {
          console.error(error);
          res.status(500).json({
            error: "Create Users failed",
            status: 500,
          });
        }
      });
    } else {
      res.status(401).json({
        message: "Username already exists",
        data: body,
        status: 401,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Server error",
      status: 500,
    });
  }
};
exports.getAll = async (req, res, next) => {
  try {
    const [data] = await users();
    // Menghapus kolom 'password' dari objek data menggunakan spread operator
    const responseData = data.map(({ password, ...rest }) => rest);

    res.status(200).json({
      data: responseData,
      message: "get All",
      status: 200,
    });
  } catch (error) {
    console.error(error);
    res.status(400).status(500).json({
      error: "server error",
      status: 400,
    });
  }
};

exports.Update = async (req, res, next) => {
  const body = req.body;
  const params = req.params.id;
  const errors = validationResult(req);
  try {
    if (errors.isEmpty()) {
      await UpdateUser(body, params); // Menunggu hingga promise diselesaikan
      res.status(200).json({
        message: "Update User Success",
        data: body,
        status: 200,
      });
    } else {
      res.status(401).json({
        message: "validaton error",
        data: errors.array(),
        status: 401,
      });
    }
  } catch (error) {
    res.status(400).status(500).json({
      error: "server error",
      status: 400,
    });
  }
};

exports.Delete = async (req, res, next) => {
  const params = req.params.idDelete;
  try {
    await DeleteUser(params);
    res.status(200).json({
      message: `Delete User Success`,
      status: 200,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      error: "Delete User failed",
      status: 400,
    });
  }
};

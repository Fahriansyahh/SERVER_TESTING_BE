//! setup tanpa sequlize
// //!penulisan tidak boleh di {pool} harus seperti di bawah
const pool = require("../config/database");

const users = () => {
  const querySql = "SELECT * FROM user";

  return pool.execute(querySql);
};

const CreateUsers = (body, hash) => {
  const querySql = "INSERT INTO user (username, password) VALUES (?, ?)";
  const values = [body.username, hash];

  return pool.execute(querySql, values);
};
const UpdateUser = (body, id) => {
  const querySql = `UPDATE user SET username=?, password=? WHERE username=?`;
  const values = [body.username, body.password, id];
  return pool.execute(querySql, values);
};

const DeleteUser = (id) => {
  const querySql = `DELETE FROM user WHERE username= ?`;
  return pool.execute(querySql, [id]);
};

module.exports = {
  users,
  CreateUsers,
  UpdateUser,
  DeleteUser,
};

// //! setup sequelize
// const { DataTypes } = require("sequelize");
// const database = require("../config/database");

// const User = database.define(
//   "user",
//   {
//     username: {
//       type: DataTypes.STRING(30), // Sesuaikan dengan panjang VARCHAR di basis data
//       allowNull: false, // Jika tidak boleh kosong
//     },
//     password: {
//       type: DataTypes.STRING(70), // Sesuaikan dengan panjang VARCHAR di basis data
//     },
//   },
//   {
//     timestamps: false,
//   }
// );
// User.removeAttribute("id");

// module.exports = User;

const bcrypt = require("bcryptjs");

const users = [
    {
        username: "admin",
        email: "admin@gmail.com",
        password: bcrypt.hashSync("pass", 10),
        isAdmin: true,
    },
];

module.exports = users;

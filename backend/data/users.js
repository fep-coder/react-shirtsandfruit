const bcrypt = require("bcryptjs");

const users = [
    {
        username: "admin",
        email: "admin@gmail.com",
        password: bcrypt.hashSync("pass", 10),
        isAdmin: true,
    },
    {
        username: "john",
        email: "john@gmail.com",
        password: bcrypt.hashSync("pass", 10),
        isAdmin: false,
    },
    {
        username: "mary",
        email: "mary@gmail.com",
        password: bcrypt.hashSync("pass", 10),
        isAdmin: false,
    },
];

module.exports = users;

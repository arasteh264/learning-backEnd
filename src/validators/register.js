const Validator = require("fastest-validator");
const v = new Validator();

const schema = {
  name: { type: "string", min: 3, max: 255 },
  userName: { type: "string", min: 3, max: 100 },
  email: { type: "email", min: 10, max: 100 },
  password: { type: "string", min: 8, max: 100 },
  phone: { type: "string", length: 11 },
  confirmPassword: { type: "equal", field: "password" },
  $$strict: true,
};

module.exports = v.compile(schema);

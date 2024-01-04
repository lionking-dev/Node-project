const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { SECRET } = require("../../../config");
const { validateEmail,  findOneAndPopulate} = require("../../../helpers");
const Joi = require("joi");

const schema = Joi.object({
  full_name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{6,30}$")),
});

const loginUser = async (req, res) => {
  const { email, password, full_name } = req.query;
  try {
    const validate = await schema.validateAsync(req.query);
    const checkedUser = await validateEmail (
      "user",
      email
    );
    const user = checkedUser[0];
    if (user) {
      const passwordIsValid = bcrypt.compareSync(password, user.password);
      let username = full_name.replace(/\s/g, '');

      if (!passwordIsValid || user.username !== username) {
        return res
          .status(404)
          .send({ status: 400, message: "Invalid Email or Password or Full Name !" });
      }


      const user_info = await findOneAndPopulate('user', {profile : user.profile}, 'profile');

      user_info.password = undefined;

      var token = jwt.sign({ id: user_info._id }, SECRET);
      res.status(200).send({ status: 200, user_info, token });
    } else {
      return res
        .status(404)
        .send({ status: 404, message: "User does not exist!" });
    }
  } catch (e) {
    res.status(400).send({ status: 400, message: e.message });
  }
};

module.exports = loginUser;


const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { SECRET } = require("../../../config");
const { insertNewDocument, findOne, findOneAndPopulate, checkUserPhotoBySizeAndFormat } = require("../../../helpers");
const Joi = require("joi");
const path = require('path');

const schema = Joi.object({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  email: Joi.string().email().required(),
  username: Joi.string().required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{6,30}$")),
  gender: Joi.string().required(),
  avatar: Joi.string().required(),
});


const registerUser = async (req, res) => {
  const { email, password } = req.body;
  const filename = path.basename(req.file.path);
  const newData = {
    ...req.body,
    username: req.body.first_name + req.body.last_name,
    avatar: filename,
  };
  
  try {

    const checkPhoto = await checkUserPhotoBySizeAndFormat(req.file.path);

    if (!checkPhoto) {
      return res
        .status(404)
        .send({ status: 404, message: "Photos can be uploaded up to 10MB, and only .jpg and png extensions are allowed." });
    }

    const validate = await schema.validateAsync(newData);

    const check_user_exist = await findOne("user", { email });
    if (check_user_exist) {
      return res
        .status(404)
        .send({ status: 404, message: "User already exist!" });
    }

    const new_user_profile = {
      first_name: newData.first_name,
      last_name: newData.last_name,
      gender: newData.gender,
      avatar: newData.avatar,
    };

    const user_profile = await insertNewDocument("profile", new_user_profile);

    const new_user = {
      email: newData.email,
      username: newData.username,
      password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
      profile: user_profile._id
    };

    const user = await insertNewDocument("user", new_user);

    const user_info = await findOneAndPopulate('user', {profile : user_profile._id}, 'profile');

    let token = jwt.sign({ id: user_info._id }, SECRET);

    user_info.password = undefined;
    return res.status(200).send({ status: 200, user_info, token });
  } catch (e) {
    return res.status(400).send({ status: 400, message: e.message });
  }
};

module.exports = registerUser;

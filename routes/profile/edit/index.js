const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { SECRET } = require("../../../config");
const { updateDocument, findOne, findOneAndPopulate, checkUserPhotoBySizeAndFormat } = require("../../../helpers");
const Joi = require("joi");
const path = require('path');

const schema = Joi.object({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  email: Joi.string().email().required(),
  username: Joi.string().required(),
  gender: Joi.string().required(),
  avatar: Joi.string().required(),
});

const editUser = async (req, res) => {
  const { id } = req.params;
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
    const checkedUser = await findOne (
      "user",
      {_id: id}
    );
    
    if (checkedUser) {

      const user = await updateDocument('user', {_id: id}, {email : newData.email, username: newData.username} );
      const user_profile = await updateDocument('profile', {_id: user.profile}, {first_name : newData.first_name, last_name: newData.last_name, gender: newData.gender, avatar: newData.avatar} );
      const user_info = await findOneAndPopulate('user', {profile : user_profile._id}, 'profile');

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

module.exports = editUser;

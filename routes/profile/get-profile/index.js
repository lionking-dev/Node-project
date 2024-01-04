const { findOneAndPopulate } = require("../../../helpers");

const getProfile = async (req, res) => {
  try {
    const { id } = req.params;

    const user_profile = await findOneAndPopulate('user', {_id : id}, 'profile');
    
    res.status(200).send({ status: 200, user_profile });
    
  } catch (e) {
    res.status(400).send({ status: 400, message: e.message });
  }
};

module.exports = getProfile;

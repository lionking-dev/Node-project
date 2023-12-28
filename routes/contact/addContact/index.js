const { insertNewDocument, findOne } = require("../../../helpers");

const addContact = async (req, res) => {
  const { name, phone, email, memo } = req.body;
  console.log(req.body)
  try {

    const check_contact_exist = await findOne("contacts", { phone });
    if (check_contact_exist) {
      // User already exist!
      return res
        .status(404)
        .send({ status: 404, message: "ユーザーはすでに存在します!" });
    }

    const new_contacts = {
      name: name,
      phone: phone,
      email: email,
      memo: memo,
      created_at: new Date(),
      updated_at: new Date(),
    };
    const contacts = await insertNewDocument("contacts", new_contacts);
    // Successfully registered!
    return res.status(200).send({ status: 200, message: "正常に登録されました!"});
  } catch (e) {
    return res.status(400).send({ status: 400, message: e.message });
  }
};

module.exports = addContact;

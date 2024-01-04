const { findPopulateSortAndLimit } = require("../../../helpers");
const Joi = require("joi");

const userPagination = async (req, res) => {

  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = 10;

    const searchQuery = {}; // You can customize your search query
    const populateQuery = 'profile';
    const selectQuery = '';
    const sortedBy = { createdAt: -1 }; // Sorting by createdAt in descending order
    const skip = page || 1;
    const limit = parseInt(req.query.limit) || 10;

    const profiles = await findPopulateSortAndLimit(
      'user',
      searchQuery,
      populateQuery,
      selectQuery,
      sortedBy,
      skip,
      limit
    );

    return res.status(200).send({ status: 200, profiles });
  } catch (e) {
    res.status(400).send({ status: 400, message: e.message });
  }
};

module.exports = userPagination;

const Models = require("../models");
const fs = require("fs");
const sizeOf = require('image-size');
const { storage } = require("../lib");
const { model } = require("mongoose");

const find = async (modelDb, queryObj) =>
  await Models[modelDb].find(queryObj).exec();

const findOne = async (modelDb, queryObj) =>
  await Models[modelDb].findOne(queryObj).exec();

const findOneAndSelect = async (modelDb, queryObj, selectQuery) =>
  await Models[modelDb].findOne(queryObj).select(selectQuery).exec();

const insertNewDocument = async (modelDb, storeObj) => {
  let data = new Models[modelDb](storeObj);
  return await data.save();
};

const validateEmail = async(modelDb, email) => 
  await Models[modelDb].find({email: email}).lean();


const updateDocument = async (modelDb, updateQuery, setQuery) =>
  await Models[modelDb].findOneAndUpdate(
    updateQuery,
    { $set: setQuery },
    { new: true }
  );

const customUpdate = async (modelDb, updateQuery, setQuery) =>
  await Models[modelDb].updateOne(updateQuery, setQuery);

const pushIntoArray = async (modelDb, updateQuery, setQuery) =>
  await Models[modelDb].findOneAndUpdate(
    updateQuery,
    { $addToSet: setQuery },
    { new: true }
  );

const deleteDocument = async (modelDb, deleteQuery) =>
  await Models[modelDb].deleteOne(deleteQuery);

const findOneAndPopulate = async (
  modelDb,
  searchQuery,
  populateQuery,
  selectQuery
) =>
  await Models[modelDb]
    .findOne(searchQuery)
    .populate({ path: populateQuery, select: selectQuery })
    .lean();

const findAndPopulate = async (
  modelDb,
  searchQuery,
  populateQuery,
  selectQuery
) =>
  await Models[modelDb]
    .find(searchQuery)
    .populate({ path: populateQuery, select: selectQuery })
    .lean();

const findPopulateSortAndLimit = async (
  modelDb,
  searchQuery,
  populateQuery,
  selectQuery,
  sortedBy,
  skip,
  limit
) =>
  await Models[modelDb]
    .find(searchQuery)
    .populate({ path: populateQuery, select: selectQuery })
    .sort(sortedBy)
    .skip(skip)
    .limit(limit)
    .lean();

const findSliceAndPopulate = async (
  modelDb,
  searchQuery,
  sliceQuery,
  populateQuery,
  selectQuery
) =>
  await Models[modelDb]
    .find(searchQuery, sliceQuery)
    .populate({ path: populateQuery, select: selectQuery })
    .lean();

const findAndPopulateNested = async (modelDb, searchQuery, populate) =>
  await Models[modelDb].find(searchQuery).populate(populate).lean();

const findSliceAndPopulateNested = async (
  modelDb,
  searchQuery,
  sliceQuery,
  populate
) =>
  await Models[modelDb].find(searchQuery, sliceQuery).populate(populate).lean();

const getAggregate = async (modelDb, aggregateQuery) =>
  await Models[modelDb].aggregate(aggregateQuery);

const findOneSliceAndPopulate = async (
  modelDb,
  searchQuery,
  sliceQuery,
  populateQuery,
  selectQuery
) =>
  await Models[modelDb]
    .findOne(searchQuery, sliceQuery)
    .populate({ path: populateQuery, select: selectQuery })
    .lean();

const findOneSliceAndCustomPopulate = async (
  modelDb,
  searchQuery,
  sliceQuery,
  customQuery
) =>
  await Models[modelDb]
    .findOne(searchQuery, sliceQuery)
    .populate(customQuery)
    .lean();

const getDataWithLimit = async (modelDb, searchQuery, sortedBy, skip, limit) =>
  await Models[modelDb]
    .find(searchQuery)
    .sort(sortedBy)
    .skip(skip)
    .limit(limit)
    .exec();

const getDataSelectWithLimit = async (
  modelDb,
  searchQuery,
  selectQuery,
  sortedBy,
  skip,
  limit
) =>
  await Models[modelDb]
    .find(searchQuery)
    .select(selectQuery)
    .sort(sortedBy)
    .skip(skip)
    .limit(limit)
    .exec();

const checkUserPhotoBySizeAndFormat = async (filePath) => {
  try {
    // Read the file size
    const stats = fs.statSync(filePath);
    const fileSizeInBytes = stats.size;
    const fileSizeInMB = fileSizeInBytes / (1024 * 1024); // Convert to MB

    // Check file format using the image-size library
    const dimensions = sizeOf(filePath);
    const format = dimensions.type; // 'jpg' or 'png'

    // Check conditions (up to 10 MB, JPG or PNG)
    if (fileSizeInMB <= 10 && (format === 'jpg' || format === 'png')) {
      console.log(`File passed: ${filePath}`);
      console.log(`File size: ${fileSizeInMB} MB`);
      console.log(`File format: ${format}`);
      return true;
    } else {
      console.log(`File failed: ${filePath}`);
      console.log(`File size: ${fileSizeInMB} MB`);
      console.log(`File format: ${format}`);
      return false;
    }
  } catch (error) {
    console.error(`Error reading file: ${filePath}`);
    console.error(error);
  }
}

module.exports = {
  find,
  findOne,
  insertNewDocument,
  updateDocument,
  deleteDocument,
  findOneAndPopulate,
  findAndPopulate,
  pushIntoArray,
  findAndPopulateNested,
  customUpdate,
  getAggregate,
  findOneSliceAndPopulate,
  findOneSliceAndCustomPopulate,
  getDataWithLimit,
  getDataSelectWithLimit,
  findSliceAndPopulateNested,
  findSliceAndPopulate,
  findOneAndSelect,
  findPopulateSortAndLimit,
  validateEmail,
  checkUserPhotoBySizeAndFormat
};

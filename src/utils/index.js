const _ = require("lodash");

const getInfoData = ({ fields = [], object = {} }) => {
  return _.pick(object, fields);
};

//loai bo cac field truyen vao nhung null
const removeUnderfinedObjectKey = (obj) => {
  Object.keys(obj).forEach((key) => {
    if (obj[key] == null) delete obj[key];
  });

  return obj;
};

module.exports = { getInfoData, removeUnderfinedObjectKey };

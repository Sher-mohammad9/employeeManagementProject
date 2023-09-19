const employeeModel = require("../database/model/employeeModel");

class ApiFeatures {
  constructor(query, queryObj) {
    this.query = query;
    this.queryObj = queryObj;
  }

  filter() {
    const copyQueryObj = { ...this.queryObj };
    const mongodbkey = [...Object.keys(employeeModel.schema.obj)];
    const queryKey = [...Object.keys(copyQueryObj)];
    queryKey.forEach((key) => {
      if (!mongodbkey.includes(key)) {
        delete copyQueryObj[key];
      }
    });
    const qoueryString = JSON.stringify(copyQueryObj);
    const queryReplace = qoueryString.replace(
      /\b(gte|gt|lte|lt|eq)\b/gi,
      (match) => `$${match}`
    );
    const queryObje = JSON.parse(queryReplace);
    this.query = this.query.find(queryObje);
    return this;
  }

  sort() {
    if (this.queryObj.sort) {
      const sortBy = this.queryObj.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-salary");
    }
    return this;
  }

  limitField() {
    if (this.queryObj.field) {
      const limitFields = this.queryObj.field.split(",").join(" ");
      this.query = this.query.select(limitFields);
    } else {
      this.query.select("-__v");
    }
    return this;
  }

  async paginate() {
    const page = this.queryObj.page || 1;
    const limit = this.queryObj.limit || 2;
    const skip = (limit - page) * limit;
    const countDucoment = await employeeModel.countDocuments();
    if (skip > countDucoment) {
      throw new Error("This page not found");
    }
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

module.exports = ApiFeatures;

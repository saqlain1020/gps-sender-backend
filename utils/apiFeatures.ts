import { FilterQuery, Query } from "mongoose";
import { QueryObj } from "../types";


class APIFeatures {
  query: Query<any, any, any>;
  queryObj: QueryObj;
  constructor(query: Query<any, any, any>, queryObj: QueryObj) {
    this.query = query;
    this.queryObj = queryObj;
  }
  filter() {
    var { page, sort, limit, fields, ...restQuery } = this.queryObj;
    var queryStr = JSON.stringify(restQuery);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in|search|text)\b/g, (match) => `$${match}`);
    var queryParsed: FilterQuery<any> = JSON.parse(queryStr);
    // console.log(queryStr)
    this.query = this.query.find(queryParsed);
    return this;
  }
  sort() {
    if (this.queryObj.sort) {
      console.log(this.queryObj);
      var sortBy = this.queryObj.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }
  limitFields() {
    if (this.queryObj.fields) {
      var fields = this.queryObj.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v");
    }
    return this;
  }
  paginate() {
    var page = parseInt(this.queryObj?.page!) || 1;
    var limit = parseInt(this.queryObj?.limit!) || 9;
    var skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
  get() {
    return this.query;
  }
}
export default APIFeatures;

"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
class APIFeatures {
    constructor(query, queryObj) {
        this.query = query;
        this.queryObj = queryObj;
    }
    filter() {
        var _a = this.queryObj, { page, sort, limit, fields } = _a, restQuery = __rest(_a, ["page", "sort", "limit", "fields"]);
        var queryStr = JSON.stringify(restQuery);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in|search|text)\b/g, (match) => `$${match}`);
        var queryParsed = JSON.parse(queryStr);
        // console.log(queryStr)
        this.query = this.query.find(queryParsed);
        return this;
    }
    sort() {
        if (this.queryObj.sort) {
            console.log(this.queryObj);
            var sortBy = this.queryObj.sort.split(",").join(" ");
            this.query = this.query.sort(sortBy);
        }
        else {
            this.query = this.query.sort("-createdAt");
        }
        return this;
    }
    limitFields() {
        if (this.queryObj.fields) {
            var fields = this.queryObj.fields.split(",").join(" ");
            this.query = this.query.select(fields);
        }
        else {
            this.query = this.query.select("-__v");
        }
        return this;
    }
    paginate() {
        var _a, _b;
        var page = parseInt((_a = this.queryObj) === null || _a === void 0 ? void 0 : _a.page) || 1;
        var limit = parseInt((_b = this.queryObj) === null || _b === void 0 ? void 0 : _b.limit) || 10;
        var skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit);
        return this;
    }
    get() {
        return this.query;
    }
}
exports.default = APIFeatures;
//# sourceMappingURL=apiFeatures.js.map
const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const AuthorSchema = new mongoose.Schema({
  first_name: { type: String, required: true, maxLength: 100 },
  family_name: { type: String, required: true, maxLength: 100 },
  date_of_birth: { type: Date },
  date_of_death: { type: Date },
});

AuthorSchema.virtual("name").get(function () {
  let fullname = "";
  if (this.first_name && this.family_name) {
    fullname = `${this.family_name}, ${this.first_name}`;
  }

  return fullname;
});

// Virtual for author's URL
AuthorSchema.virtual("url").get(function () {
  return `/catalog/author/${this._id}`;
});

AuthorSchema.virtual("date_of_birth_formatted").get(function () {
  if (this.date_of_birth)
    return DateTime.fromJSDate(this.date_of_birth).toLocaleString(
      DateTime.DATE_MED
    );

  return "";
});

AuthorSchema.virtual("date_of_death_formatted").get(function () {
  if (this.date_of_death)
    return DateTime.fromJSDate(this.date_of_death).toLocaleString(
      DateTime.DATE_MED
    );

  return "";
});

// Export model
module.exports = mongoose.model("Author", AuthorSchema);

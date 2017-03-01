// Function returns true if any data is missing or doesn't contain the correct number of fields
module.exports.formError = function (data) {
  if (!data.firstName || !data.lastName || !data.email || Object.keys(data).length !== 3) {
    return true;
  } return false;
}

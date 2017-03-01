module.exports.formError = function (data) {
  if (!data.firstName || !data.lastName || !data.email || Object.keys(data).length !== 3) {
    return true;
  } return false;
}

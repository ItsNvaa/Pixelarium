/* The code defines a constant variable named `message` which is an object containing various error
messages. Each error message is assigned to a specific key, such as `notFound`, `badRequest`,
`cannotDelete`, etc. These error messages are meant to be used in error handling scenarios, where
they can be accessed and displayed to the user based on the specific error that occurred. */
const messege = {
  notFound: "Oops! The data you are looking for could not be found.",
  badRequest:
    "Oops! Your request cannot be processed due to a bad request. Please check your input and try again.",
  cannotDelete: "Failed to delete user, please try again later.",
  wrongRequestID: "The ID was not valid.",
  emptyFields: "The input fields must be filled.",
  unsupportedImageExt: "The image file extension was not supported.",
  unsupportedImageFileSize: "The image file size must be less than 5mb.",
  unprocessable:
    "The content you provided could not be processed due to errors in the data. Please review your input and make sure it meets the required format and criteria.",
  unauth:
    "You are not authorized to access this resource. Please provide valid credentials or authentication.",
};

export default messege;

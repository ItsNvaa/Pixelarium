import moment from "moment";
import ErrorResponses, { ErrorResponse } from "./interfaces/error-response";
import dateFormat from "@/constant/date-format";
import errorMessege from "@/constant/default-error-messege";
import http from "@/constant/code";

/**
 * The function `instance` creates an `ErrorResponse` object with a current date using the provided
 * parameters.
 * @param  - The `instance` function takes an object as a parameter with the following properties:
 * @returns An object of type ErrorResponse is being returned. The object includes the properties
 * TypeError, messege, code, and date. The TypeError property is assigned the value of the name
 * parameter, the messege property is assigned the value of the messege parameter, the code property is
 * assigned the value of the code parameter, and the date property is assigned the current date
 * formatted using the moment library with
 */
export function instance({
  TypeError: name,
  code,
  messege,
}: Omit<ErrorResponse, "date" | "status">): ErrorResponse {
  return {
    TypeError: name,
    messege,
    code,
    date: moment(new Date()).format(dateFormat),
    status: "KO",
  };
}

/* This code block is exporting an object that contains several functions, each representing a
different type of error response. These functions are used to create specific error responses with
predefined error types, status codes, and error messages. */
export default {
  badRequest: (messege?: string) =>
    instance({
      code: http.StatusBadRequest,
      messege: errorMessege.badRequest || messege!,
      TypeError: "Bad Request",
    }),
  notFound: (messege?: string) =>
    instance({
      code: http.StatusNotFound,
      messege: errorMessege.notFound || messege!,
      TypeError: "Not Found",
    }),
  unauthorized: (messege?: string) =>
    instance({
      code: http.StatusUnauthorized,
      messege: errorMessege.unauth || messege!,
      TypeError: "Unauthorized",
    }),
  unprocessableContent: (messege?: string) =>
    instance({
      code: http.StatusUnprocessableEntity,
      messege: errorMessege.unprocessable || messege!,
      TypeError: "Unprocessable Entity",
    }),
  internalServerError: (messege?: string) =>
    instance({
      code: http.StatusInternalServerError,
      messege: errorMessege.internalServerError || messege!,
      TypeError: "Internal Server Error",
    }),
} satisfies ErrorResponses;
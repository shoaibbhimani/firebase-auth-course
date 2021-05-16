import * as Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";

const signupSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .error((errors) => {
      errors.forEach((err) => {
        if (err.code === "string.empty") {
          err.message = "Email is required field";
        } else if (err.code === "string.email") {
          err.message = "Please Enter a valid email";
        }
      });
      return errors;
    }),
  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9@#]{3,30}$"))
    .error((errors) => {
      errors.forEach((err) => {
        if (err.code === "string.empty") {
          err.message = "password is required field";
        } else if (err.code === "string.pattern.field") {
          err.message = "password must be character, number or @#";
        }
      });

      return errors;
    }),
  repeat_password: Joi.string()
    .required()
    .valid(Joi.ref("password"))
    .error((errors) => {
      errors.forEach((err) => {
        if (err.code === "string.empty") {
          err.message = "password is required field";
        } else if (err.code === "any.only") {
          err.message = "Password and Repeat password do not match";
        }
      });

      return errors;
    }),
});

export const signupResolver = joiResolver(signupSchema);

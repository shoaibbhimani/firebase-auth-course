import * as Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";

const loginSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .message("Please enter a valid email"),
  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9@#]{3,30}$"))
    .message("Please enter a valid password")
});

export const loginResolver = joiResolver(loginSchema);

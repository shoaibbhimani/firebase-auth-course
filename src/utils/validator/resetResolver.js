import * as Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";

const resetPassword = Joi.object({
  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9@#]{3,30}$"))
    .message("Please enter a valid password")
});

export const resetPasswordResolver = joiResolver(resetPassword);

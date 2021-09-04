import * as Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";

const forgotPasswordSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .message("Please enter a valid email")
});

export const forgotPasswordResolver = joiResolver(forgotPasswordSchema);

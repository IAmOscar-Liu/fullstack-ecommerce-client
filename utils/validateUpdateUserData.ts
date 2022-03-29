import { Account } from "../generated/graphql";
import { ProfileForm } from "../types";

export const validateUpdateUserData = (
  { name, email, phone, address, description, image }: ProfileForm,
  account: Account
) => {
  if (
    name === account.name &&
    email === account.email &&
    phone === (account.phone || "") &&
    address === (account.address || "") &&
    description === (account.description || "") &&
    !image
  )
    return false;
  return true;
};

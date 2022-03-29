import { Account, UserUpdateData } from "../generated/graphql"
import { ProfileForm } from "../types";


export const setUserUpdateData = (profileForm: ProfileForm, user: Account) => {
    const userUpdateData: UserUpdateData = {};

    if (profileForm.name !== user.name) userUpdateData.name = profileForm.name;

    if (profileForm.address !== user.address) userUpdateData.address = profileForm.address;

    if (profileForm.email !== user.email) userUpdateData.email = profileForm.email;

    if (profileForm.description !== user.description) userUpdateData.description = profileForm.description;

    if (profileForm.phone !== user.phone) userUpdateData.phone = profileForm.phone;

    return userUpdateData;
}
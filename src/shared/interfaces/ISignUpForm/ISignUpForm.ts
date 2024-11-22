import { IUserBase } from "../IUserBase";

export type ISignUpForm = Omit<IUserBase, 'id' | 'role'> & {
    password: string;
};
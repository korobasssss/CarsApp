import { IUserBase } from "../IUserBase";

export type IUserFormData = Omit<IUserBase, 'id' | 'email' | 'role'>;
import { ERole } from "@/shared/enums";

export interface IUserBase {
    id: string,
    name: string,
    surname: string,
    patronymic: string,
    email: string,
    birthDate: string,
    role: ERole
}
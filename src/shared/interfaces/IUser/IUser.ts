import { ERole } from "@/shared/enums";

export interface IUser {
    id: string,
    name: string,
    surname: string,
    patronymic: string,
    email: string,
    birthDate: string,
    role: ERole
}
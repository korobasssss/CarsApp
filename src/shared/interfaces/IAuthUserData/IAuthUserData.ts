import { ERole } from "@/shared/enums";

export interface IAuthUserData {
    accessToken: string | null
    role : ERole | null
}
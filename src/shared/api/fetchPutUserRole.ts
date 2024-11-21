import { instanceToken } from "./base";
import { ERole } from "../enums";

export const axiosPutUserRole = async (id: string, role: ERole): Promise<void> => {
    const response = await instanceToken.patch<void>(`Users/${id}/role`, role)
    return response.data;
}

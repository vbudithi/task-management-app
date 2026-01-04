import apiClient from "./apiClient";
import { ForgotPasswordDto, LoginDto, RegisterDto, ResetPasswordDto, TokenResponseDto, UpdateProfileDto } from "@/types/auth";

export async function loginUser(credentitals:LoginDto):Promise<TokenResponseDto>{
   const response = await apiClient.post<TokenResponseDto>("UserAuth/login", credentitals,{ withCredentials: true });
   return response.data;
}

export async function registerUser(data:RegisterDto) {
 await apiClient.post("UserAuth/register", data);
}

export async function refreshToken():Promise<string>{
    const response = await apiClient.post<TokenResponseDto>("UserAuth/refresh",{
       withCredentials: true
    
    });
    return response.data.token;
}

export async function forgotPassword(data:ForgotPasswordDto){
    await apiClient.post("Password/forgot", data, { withCredentials: true });
}
export async function resetPassword(data:ResetPasswordDto){
    return await apiClient.post("Password/reset", data, { withCredentials: true });
}

export function logoutUser(){
     return apiClient.post("UserAuth/logout", {}, { withCredentials: true });
}

export function getProfile(){
    return apiClient.get("UserAuth/profile");
}
export async function updateProfile(data:UpdateProfileDto){
    return await apiClient.put("UserAuth/updateProfile", data);
}
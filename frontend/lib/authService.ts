import apiClient from "./apiClient";
import { ForgotPasswordDto, LoginDto, RegisterDto, ResetPasswordDto, TokenResponseDto, UpdateProfileDto } from "@/types/auth";

export async function loginUser(credentitals:LoginDto):Promise<TokenResponseDto>{
   const response = await apiClient.post<TokenResponseDto>("UserAuth/login", credentitals);
   localStorage.setItem("accessToken",  response.data.token);
   localStorage.setItem("refreshToken", response.data.refreshToken);
   return response.data;
}

export async function registerUser(data:RegisterDto) {
 await apiClient.post("UserAuth/register", data);
}

export async function refreshToken():Promise<string>{
    const storedRefreshToken = localStorage.getItem("refreshToken");
    if(!storedRefreshToken)
        throw new Error("No refresh token found");
    const response = await apiClient.post<TokenResponseDto>("UserAuth/refresh",{
        refreshToken : storedRefreshToken
    
    });
    localStorage.setItem("accessToken", response.data.token);
    return response.data.token;
}

export async function forgotPassword(data:ForgotPasswordDto){
    await apiClient.post("Password/forgot", data);
}
export async function resetPassword(data:ResetPasswordDto){
    return await apiClient.post("Password/reset", data);
}

export function logoutUser(){
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
}

export function getProfile(){
    return apiClient.get("UserAuth/profile");
}
export async function updateProfile(data:UpdateProfileDto){
    return await apiClient.put("UserAuth/updateProfile", data);
}


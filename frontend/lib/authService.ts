import apiClient from "./apiClient";
import { ForgotPasswordDto, LoginDto, RegisterDto, ResetPasswordDto, TokenResponseDto } from "@/types/auth";

export async function loginUser(credentitals:LoginDto):Promise<TokenResponseDto>{
   const response = await apiClient.post<TokenResponseDto>("UserAuth/login", credentitals);
   localStorage.setItem("accessToken",  response.data.Token);
   localStorage.setItem("refreshToken", response.data.RefreshToken);
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
    localStorage.setItem("accessToken", response.data.Token);
    return response.data.Token;
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
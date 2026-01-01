import apiClient from "./apiClient";
import { ForgotPasswordDto, LoginDto, RegisterDto, TokenResponseDto } from "@/types/auth";

export async function loginUser(credentitals:LoginDto):Promise<TokenResponseDto>{
   const response = await apiClient.post<TokenResponseDto>("UserAuth/Login", credentitals);
   localStorage.setItem("accessToken",  response.data.Token);
   localStorage.setItem("refreshToken", response.data.RefreshToken);
   return response.data;
}

export async function registerUser(data:RegisterDto) {
 await apiClient.post("UserAuth/Register", data);
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

export function logoutUser(){
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
}
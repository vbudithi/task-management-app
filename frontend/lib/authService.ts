import apiClient from "./apiClient";
import { LoginDto, RegisterDto, TokenResponseDto } from "@/types/auth";

export async function loginUser(credentitals:LoginDto):Promise<TokenResponseDto>{
   const response = await apiClient.post<TokenResponseDto>("UserAuth/Login", credentitals);
   localStorage.setItem("accessToken",  response.data.Token);
   localStorage.setItem("refreshToken", response.data.RefreshToken);
   return response.data;
}
export async function registerUser(data:RegisterDto):Promise<void> {
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
export function logoutUser():void{
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
}
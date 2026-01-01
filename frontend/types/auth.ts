// Payload sent to the API when logging in.
export interface LoginDto{
    LoginInput:string;
    Password:string;
}

// Payload used to register a new user.
export interface RegisterDto{
    FirstName:string;
    LastName:string;
    Email:string;
    Username:string;
    Password:String;
}

// Tokens returned by the API after successful authentication.
export interface TokenResponseDto{
    Token:string;
    RefreshToken:string;
}

// Payload for requesting a password reset link.
export interface ForgotPasswordDto{
    Email:string;
}

// Payload for resetting the password using the email token.
export interface ResetPasswordDto{
    Token:string;
    NewPassword:string;
}
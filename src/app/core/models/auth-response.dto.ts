export class AuthResponseDTO {
    access_token: string;
    access_token_expires_at: Date;
    refresh_token: string;
    refresh_token_expires_at: Date;
  
    constructor(data: any) {
      this.access_token = data.access_token;
      this.access_token_expires_at = new Date(data.access_token_expires_at);
      this.refresh_token = data.refresh_token;
      this.refresh_token_expires_at = new Date(data.refresh_token_expires_at);
    }
  
    // Puedes agregar métodos adicionales si es necesario
    isAccessTokenExpired(): boolean {
      return new Date() > this.access_token_expires_at;
    }
  
    isRefreshTokenExpired(): boolean {
      return new Date() > this.refresh_token_expires_at;
    }
  }
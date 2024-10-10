import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AccountDto } from '@core/models/account-response.dto';
import { AuthResponseDTO } from '@core/models/auth-response.dto';
import { JwtPayloadDto } from '@core/models/jwt-payload.dto';
import { RegisterDto } from '@core/models/register.dto';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, catchError, Observable, of, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private LOGIN_URL = `${environment.APIR_URL}/oauth/token`;
  private REGISTER_URL = `${environment.APIR_URL}/oauth/registration`;
  private ACCOUNTS_URL = `${environment.APIR_URL}/accounts`;

  private currentAuthSubject: BehaviorSubject<AuthResponseDTO>;
  public currentAuth: Observable<AuthResponseDTO>;
  private currentAccountSubject: BehaviorSubject<AccountDto>;
  public currentAccount: Observable<AccountDto>;

  constructor(private http: HttpClient) {
    this.currentAuthSubject = new BehaviorSubject<AuthResponseDTO>(
      JSON.parse(localStorage.getItem('currentAuth') || '{}')
    );
    this.currentAccountSubject = new BehaviorSubject<AccountDto>(
      JSON.parse(localStorage.getItem('currentAccount') || '{}')
    );
    this.currentAuth = this.currentAuthSubject.asObservable();
    this.currentAccount = this.currentAccountSubject.asObservable();
  }

  public get currentAuthValue(): AuthResponseDTO {
    return this.currentAuthSubject.value;
  }

  public get currentAccountValue(): AccountDto {
    return this.currentAccountSubject.value;
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });
  }

  loginCustom(credentials: any): Observable<AuthResponseDTO> {
    const headers = this.getHeaders();
    return this.http.post<AuthResponseDTO>(this.LOGIN_URL, credentials, { headers });
  }

  registration(registerDto: RegisterDto) {
    const headers = this.getHeaders();
    return this.http.post<String[]>(this.REGISTER_URL, registerDto, { headers })
  }

  setAccounts(authResponse: AuthResponseDTO) {
    localStorage.setItem('currentAuth', JSON.stringify(authResponse));
    this.currentAuthSubject.next(authResponse);

    this.accountByUsername(authResponse.access_token)
    .subscribe(accountData => {
      localStorage.setItem('currentAccount', JSON.stringify(accountData));
      this.currentAccountSubject.next(accountData);
    });
  }

  accountByUsername(accessToken: string): Observable<AccountDto> {
    const payload = this.decodeToken(accessToken);
    const identifier = payload?.current_account?.identifier;
    const headers = this.getHeaders();

    return this.http.get<AccountDto>(`${this.ACCOUNTS_URL}/${identifier}`, { headers })
      .pipe(
        catchError(error => {
          console.error('Error fetching account:', error);
          return throwError(error);
        })
      );
  }

  error(message: string) {
    return throwError(message);
  }

  logout() {
    localStorage.removeItem('currentAuth');
    localStorage.removeItem('currentAccount');
    this.currentAuthSubject.next(this.currentAuthValue);
    this.currentAccountSubject.next(this.currentAccountValue);
    return of({ success: false });
  }

  decodeToken(accessToken: string): JwtPayloadDto {
    const decodedToken = jwtDecode(accessToken);
    return decodedToken as JwtPayloadDto;
  }

}
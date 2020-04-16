import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {User} from '../../shared/models/user';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {catchError, finalize, switchMap, tap} from 'rxjs/operators';
import {UsersService} from './users.service';
import {ErrorService} from './error.service';
import {LoaderService} from './loader.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  public readonly user$: Observable<User | null> = this.user.asObservable();

  constructor(private httpClient: HttpClient,
              private  usersService: UsersService,
              private errorService: ErrorService,
              private loaderService: LoaderService, private router: Router) { }

  public login(pEmail: string, pPassword: string): Observable<User | null> {

    const API_KEY: string = environment.firebase.apiKey;
    const API_AUTH_BASEURL: string = environment.firebase.auth.baseURL;
    const url = `${API_AUTH_BASEURL}/verifyPassword?key=${API_KEY}`;

    const data = {
      email: pEmail,
      password: pPassword,
      returnSecureToken: true
    };

    const httpOptions = {
      headers: new HttpHeaders({'Content-type': 'application/json'})
    };

    this.loaderService.setLoading(true);

    return this.httpClient.post<User>(url, data, httpOptions).pipe(
      switchMap((pData: any) => {
        const userId: string = pData.localId;
        const jwt: string = pData.idToken;
        return this.usersService.get(userId, jwt);
      }),
      tap(user => this.user.next(user)),
      catchError(error => this.errorService.handleError(error)),
      finalize(() => this.loaderService.setLoading(false))
    );
  }

  public register(pName: string, pEmail: string, pPassword: string): Observable<User | null> {

    const API_KEY: string = environment.firebase.apiKey;
    const API_AUTH_BASEURL: string = environment.firebase.auth.baseURL;
    const url = `${API_AUTH_BASEURL}/signupNewUser?key=${API_KEY}`;

    const data = {
      email: pEmail,
      password: pPassword,
      returnSecureToken: true
    };

    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }

    this.loaderService.setLoading(true);

    return this.httpClient.post<User>(url, data, httpOptions).pipe(
      switchMap((pData: any) => {
        const jwt: string = pData.idToken;
        const user = new User({
          id: pData.localId,
          name: pName,
          email: pData.email
        });
        return this.usersService.save(user, jwt);
      }),
      tap(user => this.user.next(user)),
      catchError(error => this.errorService.handleError(error)),
      finalize(() => this.loaderService.setLoading(false))
    );
  }

  public logout(): void {
    this.user.next(null);
    this.router.navigate(['/login']);
  }
}

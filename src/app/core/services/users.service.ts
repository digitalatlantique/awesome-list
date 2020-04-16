import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../../shared/models/user';
import {Observable, of} from 'rxjs';
import {environment} from '../../../environments/environment';
import {switchMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient: HttpClient) { }

  get(userId: string, jwt: string): Observable<User | null> {

    const BASE_URL: string = environment.firebase.firestore.baseURL;
    const API_KEY: string = environment.firebase.apiKey;

    const url = `${BASE_URL}:runQuery?key=${API_KEY}`;

    const data = this.getStructuredQuery(userId);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        Authorization: `Bearer ${jwt}`
      })
    };

    return this.httpClient.post(url, data, httpOptions).pipe(
      switchMap((pData: any) => {
        return of(this.getUserFromFirestore(pData[0].document.fields));
      })
    );
  }

  save(user: User, jwt: string): Observable<User | null> {

    const BASE_URL: string = environment.firebase.firestore.baseURL;
    const API_KEY: string = environment.firebase.apiKey;

    const url = `${BASE_URL}/users?key=${API_KEY}`;
    const data = this.getDataForFirestore(user);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`
      })
    };

    return this.httpClient.post(url, data, httpOptions).pipe(
      switchMap((pData: any) => {
        return of(this.getUserFromFirestore(pData.fields));
      })
    );
  }

  private getStructuredQuery(userId: string): Object {
    return {
      structuredQuery: {
        from: [{
          collectionId: 'users'
        }],
        where: {
          fieldFilter: {
            field: { fieldPath: 'id' },
            op: 'EQUAL',
            value: { stringValue: userId }
          }
        },
        limit: 1
      }
    };
  }

  private getUserFromFirestore(fields): User {

    return new User({
      id: fields.id.stringValue,
      name: fields.name.stringValue,
      email: fields.email.stringValue,
      avatar: fields.avatar.stringValue,
      pomodoroDuration: fields.pomodoroDuration.integerValue

    });
  }

  private getDataForFirestore(user: User): Object {
    return {
      fields: {
        id: {stringValue: user.id },
        name: {stringValue: user.name},
        email: {stringValue: user.email},
        avatar: {stringValue: user.avatar},
        pomodoroDuration: {integerValue: user.pomodoroDuration}
      }
    };
  }
}

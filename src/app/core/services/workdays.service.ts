import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Workday} from '../../shared/models/workday';
import {environment} from '../../../environments/environment';
import {Task} from '../../shared/models/task';
import {ToastrService} from './toastr.service';
import {ErrorService} from './error.service';
import {LoaderService} from './loader.service';
import {catchError, finalize, switchMap, tap} from 'rxjs/operators';
import {DateService} from './date.service';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkdaysService {

  constructor(private httpClient: HttpClient,
              private toastrService: ToastrService,
              private errorService: ErrorService,
              private loaderService: LoaderService,
              private dateService: DateService) { }

  save(workday: Workday) {
    const BASE_URL = environment.firebase.firestore.baseURL;
    const API_KEY = environment.firebase.apiKey;
    const url = `${BASE_URL}/workdays?key=${API_KEY}`;
    const data = this.getWorkdayForFirestore(workday);
    const jwt = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`
      })
    };

    this.loaderService.setLoading(true);

    return this.httpClient.post(url, data, httpOptions).pipe(
      tap(_ => this.toastrService.showToastr({
        category: 'success',
        message: 'Votre journée de travail a été enregistré avec succès.'
      })),
      catchError(error => this.errorService.handleError(error)),
      finalize(() => this.loaderService.setLoading(false))
    );
  }

  update(workday: Workday) {
    const BASE_URL = environment.firebase.firestore.baseURL;
    const API_KEY = environment.firebase.apiKey;
    const url = `${BASE_URL}/workdays/${workday.id}?key=${API_KEY}&currentDocument.exists=true`;
    const data = this.getWorkdayForFirestore(workday);
    const jwt = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`
      })
    };

    this.loaderService.setLoading(true);

    return this.httpClient.patch(url, data, httpOptions).pipe(
      tap(_ => this.toastrService.showToastr({
        category: 'success',
        message: 'Journée de travail sauvegardé avec succès.'
      })),
      catchError(error => this.errorService.handleError(error)),
      finalize(() => this.loaderService.setLoading(false))
    );
  }

  getWorkDayByUser(userId: string): any {
    const BASE_URL = environment.firebase.firestore.baseURL;
    const API_KEY = environment.firebase.apiKey;
    const url = `${BASE_URL}:runQuery?key=${API_KEY}`;
    const data = this.getWorkdayByUserQuery(userId);
    const jwt: string = localStorage.getItem('token');

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`
      })
    };


    console.log('userid : ' + userId);


    return this.httpClient.post(url, data, httpOptions).pipe(
      switchMap((workdaysData: any) => {


        console.log('workadaysData : ' + workdaysData);


        const workdays: Workday[] = [];
        workdaysData.forEach(pData => {
          const workday: Workday = this.getWorkdayFromFirestore(pData.document.name, pData.document.field);




          workdays.push(workday);
        })
        return of(workdays);
      }),
      catchError(error => this.errorService.handleError(error))
    );
  }

  getWorkdayByDate(date: string): Observable<Workday | null> {
    const BASE_URL = environment.firebase.firestore.baseURL;
    const API_KEY = environment.firebase.apiKey;
    const url = `${BASE_URL}:runQuery?key=${API_KEY}`;
    const data = this.getStructuredQuery(date);
    const jwt = localStorage.getItem('token');

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`
      })
    };

    return this.httpClient.post(url, data, httpOptions).pipe(
      switchMap((pData: any) => {
        const document = pData[0].document;
        if (!document) {
          return of(null);
        }
        return of(this.getWorkdayFromFirestore(document.name, document.fields));
      })
    );

  }

  private getWorkdayByUserQuery(userId: string) {
    return {
      structuredQuery: {
        from: [{
          collectionId: 'workdays'
        }],
        where: {
          fieldFilter: {
            field: {fieldPath: 'userId'},
            op: 'EQUAL',
            value: {stringValue: userId}
          }
        },
        orderBy: [{
          field: {
            fieldPath: 'dueDate',
            direction: 'DESCENDING'
          }
        }]
      }
    };
  }

  private getStructuredQuery(date: string): any {
    return {
      structuredQuery: {
        from: [{
          collectionId: 'workdays'
        }],
        where: {
          fieldFilter: {
            field: {fieldPath: 'displayDate'},
            op: 'EQUAL',
            value: {stringValue: date}
          }
        },
        limit: 1
      }
    };
  }

  private getWorkdayForFirestore(workday: Workday): any {

    const date: number = new Date(workday.dueDate).getTime();
    const cDisplayDate: string = this.dateService.getDisplayDate(new Date(workday.dueDate));
    const cTasks: any = this.getTaskListForFirestore(workday.tasks);

    return {
      fields: {
        dueDate: { integerValue: date },
        displayDate: { stringValue: cDisplayDate },
        tasks: cTasks,
        notes: { stringValue: workday.notes },
        userId: { stringValue: workday.userId }
      }
    };
  }

  private getWorkdayFromFirestore(name, fields): Workday {

    const cTasks: Task[] = [];
    const workdayId: string = name.split('/')[6];

    fields.tasks.arrayValue.values.forEach(data => {

      const task: Task = new Task({
        title: data.mapValue.fields.title.stringValue,
        completed: data.mapValue.fields.completed.booleanValue,
        done: data.mapValue.fields.done.integerValue,
        todo: data.mapValue.fields.todo.integerValue
      });
      cTasks.push(task);
    });

    return new Workday({
      id: workdayId,
      userId: fields.userId.stringValue,
      notes: fields.notes.stringValue,
      displayDate: fields.displayDate.stringValue,
      dueDate: fields.dueDate.integerValue,
      tasks: cTasks
    });
  }

  private getTaskListForFirestore(tasks: Task[]): any {
    const taskList = {
      arrayValue: {
        values: []
      }
    };
    tasks.forEach(task => {
      taskList.arrayValue.values.push(this.getTaskForFirestore(task));
    });
    return taskList;
  }

  private getTaskForFirestore(task: Task): any {
    return {
      mapValue: {
        fields: {
          title: {stringValue: task.title},
          todo: {integerValue: task.todo},
          done: {integerValue: task.done},
          completed: {booleanValue: false}
        }
      }
    };
  }
}

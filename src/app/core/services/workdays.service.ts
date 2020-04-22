import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Workday} from '../../shared/models/workday';
import {environment} from '../../../environments/environment';
import {Task} from '../../shared/models/task';
import {ToastrService} from './toastr.service';
import {ErrorService} from './error.service';
import {LoaderService} from './loader.service';
import {catchError, finalize, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WorkdaysService {

  constructor(private httpClient: HttpClient,
              private toastrService: ToastrService,
              private errorService: ErrorService,
              private loaderService: LoaderService) { }

  save(workday: Workday) {
    const BASE_URL = environment.firebase.firestore.baseURL;
    const API_KEY = environment.firebase.apiKey;
    const url = `${BASE_URL}/workdays?key=${API_KEY}`;
    const data = this.getWorkdayForFirestore(workday);
    const jwt = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Autorization: `Bearer ${jwt}`
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

  private getWorkdayForFirestore(workday: Workday): Object {

    const date: number = new Date(workday.dueDate).getTime();
    const cTasks: Object = this.getTaskListForFirestore(workday.tasks);

    return {
      fields: {
        dueDate: { integerValue: date },
        tasks: cTasks,
        notes: { stringValue: workday.notes },
        userId: { stringValue: workday.userId }
      }
    };
  }

  private getTaskListForFirestore(tasks: Task[]): Object {
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

  private getTaskForFirestore(task: Task): Object {
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

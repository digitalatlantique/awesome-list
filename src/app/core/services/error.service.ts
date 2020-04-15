import { Injectable } from '@angular/core';
import {ToastrService} from './toastr.service';
import {throwError} from 'rxjs';
import {Error} from '../../shared/models/error.enum'

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private toastrService: ToastrService, ) { }

  public handleError(error) {

    let cMessage = error.error.error.message;

    if (cMessage in Error) {
      cMessage = Error[cMessage];
    }

    this.toastrService.showToastr({
      category: 'danger',
      message: cMessage
    });
    return throwError(error);
  }
}

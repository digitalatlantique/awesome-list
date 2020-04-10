import { Component, OnInit } from '@angular/core';
import {ToastrService} from '../../services/toastr.service';
import {Observable} from 'rxjs';
import {Toastr} from '../../../shared/models/toastr';

@Component({
  selector: 'al-toastr',
  templateUrl: './toastr.component.html',
  styleUrls: ['./toastr.component.scss']
})
export class ToastrComponent implements OnInit {

  public toastr$: Observable<Toastr | null>;

  constructor(private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.toastr$ = this.toastrService.toastr$;
  }

  onCloseToastr() {
    this.toastrService.closeTaostr();
  }

}

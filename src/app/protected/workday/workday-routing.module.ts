import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WorkdayComponent} from './workday/workday.component';

const routes: Routes = [
  { path: '', component: WorkdayComponent}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkdayRoutingModule {

}

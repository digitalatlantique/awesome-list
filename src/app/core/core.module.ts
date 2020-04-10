import {NgModule, Optional, SkipSelf} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicModule } from '../public/public.module';
import { ProtectedModule } from '../protected/protected.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LoaderComponent } from './components/loader/loader.component';
import { ToastrComponent } from './components/toastr/toastr.component';
import {AlertModule} from 'ngx-bootstrap';



@NgModule({
  declarations: [NavbarComponent, FooterComponent, PageNotFoundComponent, LoaderComponent, ToastrComponent],
  imports: [
    CommonModule,
    PublicModule,
    ProtectedModule,
    BrowserAnimationsModule,
    AlertModule
  ],
  exports: [NavbarComponent, FooterComponent, PageNotFoundComponent, LoaderComponent, ToastrComponent]
})
export class CoreModule {

  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {

    if (parentModule) {
      throw new Error('Core module is already loaded.');
    }
  }
}

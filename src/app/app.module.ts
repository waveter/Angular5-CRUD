import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';
import { AppComponent } from './app.component';
import { TableComponent } from './table/table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BackendApiService } from './_services/backend-api.service';
import { HttpClientModule } from '@angular/common/http';
import { NgxLoadingModule } from 'ngx-loading';
import {ButtonModule} from 'primeng/button';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {DialogModule} from 'primeng/dialog';
import {ConfirmationService} from 'primeng/api';
import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {BlockUIModule} from 'primeng/blockui';
import { DialogComponent } from './dialog/dialog.component';
import {DropdownModule} from 'primeng/dropdown';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    TableModule,
    CheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ButtonModule,
    NgxLoadingModule.forRoot({}),
    ToastModule.forRoot(),
    BrowserAnimationsModule,
    ConfirmDialogModule,
    DialogModule,
    InputTextModule,
    InputTextareaModule,
    BlockUIModule,
    DropdownModule
  ],
  providers: [BackendApiService,
    ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }

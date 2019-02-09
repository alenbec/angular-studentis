import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { OverviewComponent } from './overview.component';
import { EditComponent } from './edit/edit.component';
import { DetailsComponent } from './details/details.component';

import { TableModule} from 'primeng/table';
import { BlockUIModule} from 'primeng/blockui';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MessageModule } from 'primeng/message';
import { DropdownModule } from 'primeng/dropdown';
import { PanelModule } from 'primeng/panel';
import { PickListModule } from 'primeng/picklist';

const routes: Routes = [
  { path: 'new', component: EditComponent },
  { path: ':id', component: DetailsComponent },
  { path: ':id/edit', component: EditComponent },
  { path: '', component: OverviewComponent }
]

@NgModule({
  declarations: [
    OverviewComponent,
    EditComponent,
    DetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TableModule,
    BlockUIModule,
    ConfirmDialogModule,
    ToastModule,
    ReactiveFormsModule,
    MessageModule,
    DropdownModule,
    PanelModule,
    PickListModule,
    FormsModule
  ],
  providers: [
    ConfirmationService
  ]
})
export class OverviewModule { }

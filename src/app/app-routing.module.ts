import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SheetComponent } from './sheet/sheet.component';

const routes: Routes = [
  {path: 'sheet', component: SheetComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

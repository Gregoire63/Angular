import { Routes } from '@angular/router';
import { HomeComponent } from './application/home/home.component';

import { ChecklistComponent } from './application/checklist/checklist.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { AuthGuard } from './guards/auth.guard'

export const routes: Routes = [
{ path: '', component: HomeComponent },
{ path: 'checklist', component: ChecklistComponent, canActivate: [AuthGuard] },
{ path: '**', component: PageNotFoundComponent },
];
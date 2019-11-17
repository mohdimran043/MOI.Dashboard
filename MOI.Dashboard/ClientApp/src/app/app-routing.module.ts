import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './theme/layout/admin/admin.component';
import { AuthComponent } from './theme/layout/auth/auth.component';

//#region Patrol Services
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth-guard.service';
//#endregion

//#region Patrol Components
import { QuicknavComponent } from './theme/shared/quicknav/quicknav.component';
import { PagenotfoundComponent } from '../app/ui/shared/pagenotfound/pagenotfound.component';
import { PagenotauthorizedComponent } from '../app/ui/shared/pagenotauthorized/pagenotauthorized.component';
import { AddapplicationComponent } from './ui/components/manage/addapplication/addapplication.component';
import { AddroleComponent } from './ui/components/manage/addrole/addrole.component';
import { AddapplicationuserComponent } from './ui/components/manage/addapplicationuser/addapplicationuser.component';
import { applicationlistresolver } from './resolve/applicationlistresolver';
//#endregion

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        redirectTo: 'auth/signin',
        pathMatch: 'full'
      },
      {
        path: 'auth',
        loadChildren: () => import('./ui/components/authentication/authentication.module').then(m => m.AuthenticationModule)
      }
    ]
  },
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'search',
        component: QuicknavComponent
      },
      {
        path: 'manage',
        children: [
          {
            path: 'addapplication',
            component: AddapplicationComponent
          },
          {
            path: 'addrole',
            component: AddroleComponent,
            resolve: { applist: applicationlistresolver }
          },
          {
            path: 'addnewuser',
            component: AddapplicationuserComponent,
            resolve: { applist: applicationlistresolver }
          }
        ]
      },
    ]
  },
  { path: 'notauthorized', component: PagenotauthorizedComponent, data: { title: 'Page Not Authorized' } },
  { path: '**', component: PagenotfoundComponent, data: { title: 'Page Not Found' } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthService, AuthGuard]
})
export class AppRoutingModule { }

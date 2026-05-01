import { Routes } from '@angular/router';
import { authGuard } from '@auth/guards/auth.guard';

import { LayoutComponent } from '@shared/components/layout/layout.component';
import { NotFoundComponent } from '@info/pages/not-found/not-found.component'

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () => import ('@products/pages/list/list.component')
      },
      {
        path: 'product/:id',
        loadComponent: () => import ('@products/pages/product-detail/product-detail.component')
      },
      {
        path: 'about',
        loadComponent: () => import ('@info//pages/about/about.component')
      },
    ]
  },
  {
    path: 'login',
    loadComponent: () => import('@auth/pages/login/login.component')
  },
  {
    path: 'register',
    loadComponent: () => import('@auth/pages/register/register.component')
  },
  {
    path: 'profile',
    loadComponent: () => import('@auth/pages/profile/profile.component'),
    canActivate: [authGuard]
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

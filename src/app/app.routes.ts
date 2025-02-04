import { Routes } from '@angular/router';

import { LayoutComponent } from '@shared/components/layout/layout.component';
import { ListComponent } from '@products/pages/list/list.component'
import { ProductDetailComponent } from '@products/pages/product-detail/product-detail.component'
import { AboutComponent } from '@info//pages/about/about.component'
import { NotFoundComponent } from '@info/pages/not-found/not-found.component'

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: ListComponent
      },
      {
        path: 'product/:id',
        component: ProductDetailComponent
      },
      {
        path: 'about',
        component: AboutComponent
      },
    ]
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

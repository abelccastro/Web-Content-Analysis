import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

/**
 * AppModule
 * @author: MK
 */
export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, { useHash: true });

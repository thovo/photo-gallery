import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path: 'photos',
		loadChildren: () => import('./photos/photos.module').then((m) => m.PhotosPageModule),
	},
	{
		path: 'photo/:id',
		loadChildren: () => import('./photo/photo.module').then((m) => m.PhotoPageModule),
	},
	{ path: '', redirectTo: 'photos', pathMatch: 'full' },
];
@NgModule({
	imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
	exports: [RouterModule],
})
export class AppRoutingModule {}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Photo, PhotosService } from '../services/photos.service';

@Component({
	selector: 'app-photo',
	templateUrl: './photo.page.html',
	styleUrls: ['./photo.page.scss'],
})
export class PhotoPage implements OnInit {
	id: string;
	photo$: Observable<Photo>;

	constructor(private route: ActivatedRoute, private photosService: PhotosService) {
		this.route.queryParams.subscribe(() => {
			this.id = this.route.snapshot.paramMap.get('id');
			if (this.id) {
				this.photo$ = this.photosService.getPhotoDetail(this.id);
			}
		});
	}

	ngOnInit() {}
}

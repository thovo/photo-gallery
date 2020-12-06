import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonInfiniteScroll } from '@ionic/angular';
import { Photo, PhotosService } from '../services/photos.service';

@Component({
	selector: 'app-photos',
	templateUrl: './photos.page.html',
	styleUrls: ['./photos.page.scss'],
})
export class PhotosPage implements OnInit {
	photos: Photo[] = [];
	photosBackup: Photo[] = [];
	searchText: string;
	@ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

	constructor(private photosService: PhotosService, private router: Router) {}

	ngOnInit() {
		this.photosService.getPhotos().subscribe((photos) => {
			this.photosBackup = [...this.photosBackup, ...photos];
			this.photos = [...this.photosBackup, ...photos];
		});
	}

	navigateToPhotoDetail(id: string) {
		this.router.navigate([`/photo/${id}`]);
	}

	filterList(event) {
		this.photos = [...this.photosBackup];
		this.searchText = event.srcElement.value;
		if (!this.searchText) {
			this.infiniteScroll.disabled = false;
			return;
		}
		this.infiniteScroll.disabled = true;
		this.photos = this.photos.filter((photo) => {
			if (photo.author && this.searchText) {
				return photo.author.toLowerCase().indexOf(this.searchText.toLowerCase()) > -1;
			}
		});
	}

	loadData(event) {
		setTimeout(() => {
			this.photosService.getPhotos().subscribe((photos) => {
				this.photosBackup = [...this.photosBackup, ...photos];
				this.photos = [...this.photosBackup, ...photos];
				event.target.complete();
			});
			// App logic to determine if all data is loaded
			// and disable the infinite scroll
			if (this.photosBackup.length == 500) {
				event.target.disabled = true;
			}
		}, 200);
	}
}

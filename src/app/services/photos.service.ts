import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export type Photo = {
	id: string;
	author: string;
	width: number;
	height: number;
	url: string;
	download_url: string;
};

@Injectable({
	providedIn: 'root',
})
export class PhotosService {
	API_URL = 'https://picsum.photos/';
	page = 1;

	constructor(private http: HttpClient) {}

	getPhotos(): Observable<Photo[]> {
		const url = this.API_URL + `v2/list?page=${this.page}&limit=10`;
		this.page++;
		return this.http.get<Photo[]>(url);
	}

	getPhotoDetail(id: string): Observable<Photo> {
		const url = this.API_URL + `id/${id}/info`;
		return this.http.get<Photo>(url);
	}
}

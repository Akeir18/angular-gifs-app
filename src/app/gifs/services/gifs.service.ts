import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchedGifs } from '../interfaces/gifs.interfaces';


@Injectable({ providedIn: 'root' })
export class GifsService {

  public gifsList: Gif[] = [];

  private _tagsHistory: string[] = [];
  private apiKey: string = 'ElJYe5vk0bdDPtunw31Q61kfBcI7cy3z';
  private serviceUrl = 'https://api.giphy.com/v1/gifs';

  constructor(private http: HttpClient) {
    this.loadLocalStorage();
    this.searchLastTag()
    console.log('Tags loaded');
  }

  get tagHistory() {
    return [...this._tagsHistory];
  }

  private organizeHistory(tag: string) {
    tag = tag.toLowerCase();

    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag)
    }

    this._tagsHistory.unshift(tag);

    this._tagsHistory = this._tagsHistory.splice(0, 10);

    this.saveLocalStorage();
  }

  private saveLocalStorage(): void {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  }

  private loadLocalStorage(): void {
    if (!localStorage.getItem('history')) return;

    this._tagsHistory = JSON.parse(localStorage.getItem('history')!);
  }

  private searchLastTag() {
    if (this._tagsHistory.length === 0) return;
    this.searchTag(this._tagsHistory[0]);
  }

  async searchTag(tag: string): Promise<void> {
    if (tag.length === 0) return;

    this.organizeHistory(tag);

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('q', tag)
      .set('limit', '10');

    this.http.get<SearchedGifs>(`${this.serviceUrl}/search`, { params })
      .subscribe(resp => {
        this.gifsList = resp.data;
      });

  }

}

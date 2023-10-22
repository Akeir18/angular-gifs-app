import { Component, ViewChild, ElementRef } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  template: `
    <h5> Buscar: </h5>
    <input type="text" class="form-control" placeholder="Buscar gifs..." (keyup.enter)="searchTag()" #txtTagInput>
  `
})
export class SearchBoxComponent {

  @ViewChild('txtTagInput')
  public inputTag!: ElementRef<HTMLInputElement>;

  constructor(private gifsService: GifsService) { }

  searchTag() {
    const newTag = this.inputTag.nativeElement.value;

    this.gifsService.searchTag(newTag);

    this.inputTag.nativeElement.value = '';
  }
}

import { CommonModule } from '@angular/common';
import { Component, Input, OnInit,Output,EventEmitter } from '@angular/core';
import { Data } from '../../interface/Data';
import { FormsModule } from '@angular/forms';
import { CardComponent } from '../card/card.component';
@Component({
  selector: 'app-accordion',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardComponent
  ],
  templateUrl: './accordion.component.html',
  styleUrl: './accordion.component.scss'
})
export class AccordionComponent implements OnInit {
  public movieGenres: Set<string> = new Set<string>();
  public genreFilteredData: Set<string> = new Set<string>();
  public initialData!:Data[];
  public searchMovie='';
  @Input() public mData!:Data[];

  @Output() genresSelected = new EventEmitter<string[]>();
  @Output() sentData = new EventEmitter<Data[]>();
  
  isClicked: boolean = false;
  @Output() clickedStatus = new EventEmitter<boolean>();
  
  accordionData = [
    {
      title: 'Filter',
      open: false,
      checkboxes: [
        { label: 'Option 1', checked: false },
      ],
    }
  ];
  ngOnInit(): void {
    this.initialData = this.mData;
    this.mData.forEach(movie => {
      const genresArray = movie.Genre.split(',').map(genre => genre.trim());
      genresArray.forEach(genre => this.movieGenres.add(genre));
    });
  }
  filterMovie() {
    this.mData = this.initialData;
    
      this.mData = this.mData.filter(movie => {
        const matchesSearch = movie.Title.toLowerCase().includes(this.searchMovie.toLowerCase());
      
        if (this.genreFilteredData.size != 0) {
          const genresArray = movie.Genre.split(',').map(genre => genre.trim());
          const matchesGenres = genresArray.some(genre => this.genreFilteredData.has(genre));
        return matchesSearch && matchesGenres;
      }
      return matchesSearch;
    });
    this.sentData.emit(this.mData)
  }
  toggleAccordion(item: any) {
    item.open = !item.open;
    this.isClicked = !this.isClicked;  // Toggle the value
    this.clickedStatus.emit(this.isClicked);  // Emit the updated value to parent
  }
  onCheckboxChange(genre: string, event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.checked) {
      this.genreFilteredData.add(genre);
    } else {
      this.genreFilteredData.delete(genre);
    }
    this.filterMovie();
  }
}

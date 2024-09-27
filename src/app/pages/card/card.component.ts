import { MoviesData } from './../../../constants/user.constant';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { Data } from '../../interface/Data';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MatCardModule, CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() public movieData!:Data ;
  // mData:Data[] = MoviesData;
  // @Output() mData = new EventEmitter<Data>();

  selectedImage: string | null = null;

  // Function to open the modal and display the selected image
  openImageModal(img: string) {
    this.selectedImage = img;
  }

  // Function to close the modal
  closeModal() {
    this.selectedImage = null;
  }
}
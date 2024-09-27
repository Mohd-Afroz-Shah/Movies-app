import { Component, Input, OnInit } from '@angular/core';
import { Data } from '../../interface/Data';
import { CardComponent } from '../card/card.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AccordionComponent } from '../accordion/accordion.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CardComponent,FormsModule,CommonModule,AccordionComponent,MatCheckboxModule,MatExpansionModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})

export class SearchComponent implements OnInit {
  @Input() public mData!:Data[];
  searchText ='';
  isClicked=false;
  public reset=false;
  public tempData!:Data[]
  
  public intialData!:Data[]
  isAccordionClicked: boolean = false;
  receivedData: Data[] = [];  // To store the data received from the child

  onReceiveData(data: Data[]) {
    this.receivedData = data; 
  }
  onClickedStatusChange(isClicked: boolean) {
    this.isAccordionClicked = isClicked;
  }

  ngOnInit(): void {
    this.tempData = this.mData;
    this.intialData=this.mData;
  }
  resetData(){
    this.reset=true;
  }
  searchUser() {
    this.mData=this.tempData
    if (this.searchText === '') {
      alert('please enter');
    }
    this.mData = this.mData.filter((x) => {
      return x.Title.toLowerCase().includes(this.searchText);
    });
  }

}

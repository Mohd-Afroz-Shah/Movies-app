import { MoviesData } from './../constants/user.constant';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardComponent } from './pages/card/card.component';
import { SearchComponent } from './pages/search/search.component';
import { Data } from './interface/Data';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,SearchComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  title = 'y';
  mData:Data[] = MoviesData;
  searchText ='';
  searchUser() {
    if (this.searchText === '') {
      alert('please enter');
    }
    this.mData = this.mData.filter((x) => {
      return x.Title.includes(this.searchText);
    });
  }
}
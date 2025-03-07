import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [HttpClientModule, FormsModule, RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'todoapp';
  readonly APIUrl = 'http://localhost:5038/api/todoapp/';

  counterbutton = '0';
  testValue = 'd';
  test = 'zahra';
  constructor(private http: HttpClient) {}
  notes: any = [];
  message = '';
  input1 = 0;
  input2 = 0;

  sayMessage() {
    var tester = 0;
    tester = 1;

    if (this.input1 > this.input2) {
      this.message = `${this.input1} is bigger than ${this.input2}`;
    } else if (this.input1 < this.input2) {
      this.message = `${this.input1} is smaller than ${this.input2}`;
    } else if (this.input1 === this.input2) {
      this.message = `${this.input1} is equal to ${this.input2}`;
    }
  }
  increaseButton() {
    this.counterbutton = parseInt(this.counterbutton) + 1 + '';
  }
  switchName() {
    if (this.test === 'kurosh') {
      this.test = 'zahra';
    } else {
      this.test = 'kurosh';
    }
  }
  refreshNotes() {
    this.http.get(this.APIUrl + 'GetNotes').subscribe((data) => {
      this.notes = data;
    });
  }

  ngOnInit() {
    this.refreshNotes();
  }

  addNotes() {
    var newNotes = (<HTMLInputElement>document.getElementById('newNotes'))
      .value;
    var formData = new FormData();
    formData.append('newNotes', newNotes);
    this.http.post(this.APIUrl + 'AddNotes', formData).subscribe((data) => {
      alert(data);
      this.refreshNotes();
    });
  }

  deleteNotes(id: any) {
    this.http.delete(this.APIUrl + 'DeleteNotes?id=' + id).subscribe((data) => {
      alert(data);
      this.refreshNotes();
    });
  }
}

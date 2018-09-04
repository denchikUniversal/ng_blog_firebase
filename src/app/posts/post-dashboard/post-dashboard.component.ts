import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-dashboard',
  templateUrl: './post-dashboard.component.html',
  styleUrls: ['./post-dashboard.component.css']
})
export class PostDashboardComponent implements OnInit {

  title: string;
  image: string = null;
  content: string;

  constructor() { }

  ngOnInit() {
  }

  createPost() {
    const data = {
      content: this.content,
      image: this.image,
      published: new Date(),
      title: this.title
    }
  }

}

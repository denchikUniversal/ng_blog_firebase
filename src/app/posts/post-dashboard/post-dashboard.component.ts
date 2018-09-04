import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-dashboard',
  templateUrl: './post-dashboard.component.html',
  styleUrls: ['./post-dashboard.component.css']
})
export class PostDashboardComponent implements OnInit {

  title: string;
  image: string = null;
  content: string;

  constructor(private auth: AuthService, private postService: PostService) { }

  ngOnInit() {
  }

  createPost() {
    const data = {
      author: this.auth.authState.displayName || this.auth.authState.email,
      authorId: this.auth.currentUserId,
      content: this.content,
      image: this.image,
      published: new Date(),
      title: this.title
    }
    this.postService.create(data)
  }

}

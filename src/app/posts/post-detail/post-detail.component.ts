import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../post.service';
import { Post } from '../post';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {

  post: Post;

  constructor(private route: ActivatedRoute, private postService: PostService) { }

  ngOnInit() {
    this.getPost()
    console.log(this)
  }

  getPost() {
    const id = this.route.snapshot.paramMap.get('id')
    return this.postService.getPostData(id).subscribe( data => this.post = data)
  }

}

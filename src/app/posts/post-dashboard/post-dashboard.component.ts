import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { PostService } from '../post.service';
import { Observable } from 'rxjs';
import { AngularFireStorage } from 'angularfire2/storage';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-post-dashboard',
  templateUrl: './post-dashboard.component.html',
  styleUrls: ['./post-dashboard.component.css']
})
export class PostDashboardComponent implements OnInit {

  title: string;
  image: string;
  content: string;

  buttonText: string = "Create Post";

  uploadPercent: Observable<number>
  downloadURL: Observable<string>

  constructor(private auth: AuthService, 
    private postService: PostService,
    private storage: AngularFireStorage,
    private router: Router) { }

  ngOnInit() {
  }

  createPost() {
    const data = {
      author: this.auth.authState.displayName || this.auth.authState.email,
      authorId: this.auth.currentUserId,
      content: this.content,
      image: this.image || null,
      published: new Date(),
      title: this.title
    }
    this.postService.create(data)
    this.title = "";
    this.content = "";
    this.buttonText = "Post Created";
    this.image = "";
    setTimeout(() => this.buttonText = "Create Post", 3000)
    this.router.navigate[('/blog')]
  }

  uploadImage(event) {
    const file = event.target.files[0];
    const path = `posts/${file.name}`;
    if(file.type.split('/')[0] !== 'image'){
      return alert('Only image file')
    } else {
      const task = this.storage.upload(path, file);
      const ref = this.storage.ref(path);
      this.uploadPercent = task.percentageChanges();
      console.log('Image uploaded!');
      task.snapshotChanges().pipe(
        finalize(() => {
          this.downloadURL = ref.getDownloadURL()
          this.downloadURL.subscribe(url => (this.image = url));
        })
      )
      .subscribe();
    }
  }
  

}

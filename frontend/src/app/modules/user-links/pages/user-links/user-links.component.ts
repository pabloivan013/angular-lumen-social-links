import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SocialLink } from 'src/app/models/social-link.model';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-links',
  templateUrl: './user-links.component.html',
  styles: [],
})
export class UserLinksComponent implements OnInit {
  username: string;

  loadingUser: boolean = false;
  loadingLinks: boolean = false;

  successUser: boolean = false;
  userErrorMessage: string;
  successLinks: boolean = false;

  user: User = new User();

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.username = this.route.snapshot.paramMap.get('username');
    console.log('username: ', this.username);

    this.loadingUser = true;
    this.successUser = false;
    this.userService.getUserByName(this.username).subscribe(
      (user: User) => {
        Object.assign(this.user, user);
        console.log('user: ', user);
        this.loadingUser = false;
        this.successUser = true;
      },
      (error) => {
        console.log('Error getUser: ', error);
        this.loadingUser = false;
        if (error.status == 404) 
          this.userErrorMessage = 'User not found';
        else 
          this.userErrorMessage = 'Server error';
      }
    );

    this.loadingLinks = true;
    this.successLinks = false;
    this.userService.getUserLinksByName(this.username).subscribe(
      (links: SocialLink[]) => {
        this.user.socialLinks = links;
        console.log('links: ', links);
        this.loadingLinks = false;
        this.successLinks = true;
      },
      (error) => {
        console.log('Error getUserLinks: ', error);
        this.loadingLinks = false;
      }
    );
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { SocialLink } from 'src/app/models/social-link.model';
import { User } from 'src/app/models/user.model';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/user.service';
import { AppSettings } from '../../../../app.settings';

@Component({
  selector: 'app-social-link-display',
  templateUrl: './social-link-display.component.html',
  styles: [],
})
export class SocialLinkDisplayComponent implements OnInit {
  @Input() user: User;

  authenticated: boolean = false;
  successLoadLinks: boolean = false;
  loadingLinks: boolean = false;
  loadingSave: boolean = false;

  constructor(
    public auth: AuthService,
    private userService: UserService,
    private snackBarService: SnackbarService
  ) { }

  ngOnInit() {
    this.user.socialLinks.push(new SocialLink());
    this.auth.isAuthenticated$.subscribe(
      (auth) => {
        this.authenticated = auth;
        this.loadSocialLinks();
      },
      (error) => console.log('Error auth: ', error)
    );
  }

  onReload(event) {
    this.loadSocialLinks();
  }

  loadSocialLinks() {
    if (this.authenticated) {
      this.user.socialLinks = this.filterValidLinks(this.user.socialLinks);
      this.loadingLinks = true;
      this.successLoadLinks = false;

      this.userService.getUserLinks().subscribe(
        (links: SocialLink[]) => {
          this.user.socialLinks = this.user.socialLinks.concat(links);
          this.loadingLinks = false;
          this.successLoadLinks = true;
          this.snackBarService.success('Social links loaded.');
        },
        (error) => {
          console.log('Error getuserLinks: ', error);
          this.loadingLinks = false;
          if (error.status == AppSettings.VALIDATOR_CODE && error.error.sub) {
            // User not found in db, need to be created before save links
            this.successLoadLinks = true;
          } else {
            // Server failed
            this.successLoadLinks = false;
            this.snackBarService.error('Error loading social links');
          }
        }
      );
    }
  }

  validLink(link: SocialLink): boolean {
    return (link.name.length > 0 && link.url.length > 0);
  }

  filterValidLinks(links: SocialLink[]) {
    return links.filter(link => this.validLink(link))
  }

  addSocialLink() {
    this.user.socialLinks.push(new SocialLink());
  }

  updateSocialLinkPos(socialLink: SocialLink, pos: number) {
    socialLink.position = pos;
  }

  deleteLink(link: SocialLink) {
    const index = this.user.socialLinks.indexOf(link)
    this.user.socialLinks.splice(index, 1)
  }

  saveUserLinks() {
    if (!this.authenticated) {
      this.snackBarService.error('Login before save');
      return;
    }

    if (
      this.filterValidLinks(this.user.socialLinks).length !=
      this.user.socialLinks.length
    ) {
      this.snackBarService.error('Links should have a NAME and URL');
      return;
    }

    this.loadingSave = true;

    this.userService.saveUserLinks(this.user).subscribe(
      (res) => {
        console.log('saveUserLinks: ', res);
        this.loadingSave = false;
        this.snackBarService.success('Links Saved');
      },
      (error) => {
        console.log('Error saveUserLinks: ', error);
        this.loadingSave = false;
        let errorMessage = 'Error occurred while saving.';
        if (error.status == AppSettings.VALIDATOR_CODE && error.error.sub) {
          // Validator error
          errorMessage = error.error.sub[0];
        }
        this.snackBarService.error(errorMessage);
      }
    );
  }
}

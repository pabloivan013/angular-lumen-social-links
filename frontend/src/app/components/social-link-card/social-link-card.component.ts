import { Component, Input, OnInit } from '@angular/core';
import { SocialLink } from 'src/app/models/social-link.model';

@Component({
  selector: 'app-social-link-card',
  templateUrl: './social-link-card.component.html',
  styleUrls: ['./social-link-card.component.scss'],
  styles: [
  ]
})
export class SocialLinkCardComponent implements OnInit {

  @Input() socialLink: SocialLink;
  
  constructor() { }

  ngOnInit(): void {
  }

  openLink() {
    let url: string = '';
    if (!/^http[s]?:\/\//.test(this.socialLink.url)) {
        url += 'http://';
    }
    url += this.socialLink.url;
    window.open(url, "_blank")
  }

}

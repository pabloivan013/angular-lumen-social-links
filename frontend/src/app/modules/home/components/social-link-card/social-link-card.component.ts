import { EventEmitter, Output } from '@angular/core';
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
  @Output() onDeleteLink = new EventEmitter<SocialLink>()
  color: string

  constructor() { }

  ngOnInit(): void {
  }

  deleteLink() {
    this.onDeleteLink.emit(this.socialLink);
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

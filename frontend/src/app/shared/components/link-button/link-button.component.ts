import { Component, Input, OnInit } from '@angular/core';
import { SocialLink } from 'src/app/models/social-link.model';

@Component({
  selector: 'app-link-button',
  templateUrl: './link-button.component.html',
  styleUrls: ['./link-button.component.scss']
})
export class LinkButtonComponent implements OnInit {

  @Input() link: SocialLink

  constructor() { }

  ngOnInit(): void {
  }

  openLink() {
    let url: string = '';
    if (!/^http[s]?:\/\//.test(this.link.url)) {
        url += 'http://';
    }
    url += this.link.url;
    window.open(url, "_blank")
  }

}

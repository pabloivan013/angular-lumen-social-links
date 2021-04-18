import { ClipboardModule } from '@angular/cdk/clipboard';
import { Component, Input, OnInit } from '@angular/core';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-share-link',
  templateUrl: './share-link.component.html',
  styleUrls: ['./share-link.component.scss']
})
export class ShareLinkComponent implements OnInit {

  @Input() url: string

  constructor(private snackBarService: SnackbarService ) { }

  ngOnInit(): void {
    this.url = this.url.toLowerCase()
  }

  copied() {
    this.snackBarService.success("URL copied")
  }

}

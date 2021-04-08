import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styles: [
  ]
})
export class LoadingComponent implements OnInit {

  @Input() message: string

  constructor() { }

  ngOnInit(): void {
  }

}

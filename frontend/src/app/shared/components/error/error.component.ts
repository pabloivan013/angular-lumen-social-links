import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styles: [
  ]
})
export class ErrorComponent implements OnInit {

  @Input() message: String
  @Output() reload: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  reloadRefresh() {
    this.reload.emit(null)
  }

}

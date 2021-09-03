import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { IMessage } from './message.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'front-end';

  constructor(private appService: AppService) {}

  ngOnInit() {
    this.appService
      .getAppName()
      .subscribe((message: IMessage) => (this.title = message.name));
  }
}

import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

declare var require: any;

@Component({
  selector: 'ept-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  githubRepositoryUrl: string;
  projectVersion: string;
  projectAuthor: string;

  ngOnInit(): void {
    this.getGithubRepositoryUrl();
  }

  getGithubRepositoryUrl(): void {
    try {
      const packageInfo = require('../../package.json');

      this.githubRepositoryUrl = packageInfo.repository.url;
      this.projectVersion = packageInfo.version;
      this.projectAuthor = packageInfo.author.split(' <')[0];
    } catch (e) { }
  }
}

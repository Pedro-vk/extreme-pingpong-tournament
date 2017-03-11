import { browser, element, by } from 'protractor';

export class ExtremePingpongTournamentPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('ept-root h1')).getText();
  }
}

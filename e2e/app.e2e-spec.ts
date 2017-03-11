import { ExtremePingpongTournamentPage } from './app.po';

describe('extreme-pingpong-tournament App', () => {
  let page: ExtremePingpongTournamentPage;

  beforeEach(() => {
    page = new ExtremePingpongTournamentPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('ept works!');
  });
});

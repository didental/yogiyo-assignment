import { ChainablePromiseElement } from 'webdriverio';

import Page from './page';


class SearchResultPage extends Page {
  /**
   * define selectors using getter methods
   */
  public get categories() {
    return $(`li[ng-repeat='ct in session_storage.categories'] > span`);
  }

  public async getCategoryNames() {
    await this.categories
  }

}

export default new SearchResultPage();

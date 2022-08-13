import { ChainablePromiseElement } from 'webdriverio';

import Page from './page';


class SearchResultPage extends Page {
  /**
   * define selectors using getter methods
   */
  public get showCategoryBtn() {
    return $('#category-menu');
  }
  public get categories() {
    return $$(`ul > li > span.category-name.ng-binding`);
  }

  public async isCategoryHidden() {
    return await (await this.showCategoryBtn).isClickable()
  }

  public async getCategoryNames() {
    if (this.isCategoryHidden()) {
      await (await this.showCategoryBtn).click();
    }

    let categories = await this.categories.map(el => el.getText());
    // console.log(categories);
    return categories;
  }


}

export default new SearchResultPage();

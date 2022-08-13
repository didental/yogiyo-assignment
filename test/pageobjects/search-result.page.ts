import { ChainablePromiseElement } from 'webdriverio';

import Page from './page';


export interface Store {
  name: string;
  star: number;
  reviewNum: number;
  minPrice: number;
  minDeiliveryTime: number;
}

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

  public get sortSelectBox() {
    return $('.list-option > div > select');
  }

  public async toggleCategory() {
    if (await (await this.showCategoryBtn).isClickable()) {
      await (await this.showCategoryBtn).click();
    }
  }

  public async getCategoryNames() {
    await this.toggleCategory();

    let categories = await this.categories.map(el => el.getText());
    // console.log(categories);

    await this.toggleCategory();
    return categories;
  }

  /**
   * 
   * @param by 기본 정렬순 / 별점순 / 리뷰 많은순 / 최소 주문 금액순 / 거리순 / 배달 시간순
   */
  public async sortBy(by: string) {
    const availableBy = ['기본 정렬순', '별점순', '리뷰 많은순', '최소 주문 금액순', '거리순', '배달 시간순'];
    if (availableBy.indexOf(by) < 0) {
      console.log(`정렬 방법 오류: ${by}`);
      console.log(`가능한 정렬 방법: ${availableBy}`);
      return;
    }

    await (await this.sortSelectBox).selectByVisibleText(by);
  }

  public async getStoresInfo() {
    const storeBoxSelector = '.item.clearfix';
    const storeNameSelector = `div[ng-bind='restaurant.name']`;
    const storeStarSelector = `.ico-star1.ng-binding`;
    const storeReviewNumSelector = `.review_num.ng-binding`;
    const storeMinPriceSelector = `.min-price.ng-binding`;
    const storeDeiliveryTimeSelector = `.delivery-time.ng-binding`;

    await (await $(storeBoxSelector)).waitForExist();
    let storeBoxes = await $$(storeBoxSelector);
    let storeInfos: Store[] = []
    for await (let storeBox of storeBoxes) {
      let name = await (await storeBox.$(storeNameSelector)).getText();
      let starText = await (await storeBox.$(storeStarSelector)).getText();
      let star = Number.parseFloat(starText.replace(/[^\d\.]*/g, ''));
      let reviewText = await (await storeBox.$(storeReviewNumSelector)).getText();
      let reviewNum = Number.parseInt(reviewText.replace(/[^\d\.]*/g, ''));
      let minPriceText = await (await storeBox.$(storeMinPriceSelector)).getText();
      let minPrice = Number.parseInt(minPriceText.replace(/[^\d\.]*/g, ''));
      let deiliveryTimeText = await (await storeBox.$(storeDeiliveryTimeSelector)).getText();
      let minDeiliveryTime = Number.parseInt(deiliveryTimeText.split('~')[0]);
      storeInfos.push({ name, star, reviewNum, minPrice, minDeiliveryTime });
    }

    return storeInfos;
  }


}

export default new SearchResultPage();

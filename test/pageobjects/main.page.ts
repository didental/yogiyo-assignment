import { ChainablePromiseElement } from 'webdriverio';

import Page from './page';


class MainPage extends Page {
  /**
   * define selectors using getter methods
   */
  public get addressInput() {
    return $(`input[type='search']`);
  }

  public get addressSearchBtn() {
    return $('#button_search_address');
  }

  public async setAddress(address: string) {
    await this.addressInput.setValue(address);
    await this.addressSearchBtn.click();
    
    // wait for display srp page
    await (await $('.item.clearfix')).waitForDisplayed();
  }

}

export default new MainPage();

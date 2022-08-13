import { ChainablePromiseElement } from 'webdriverio';

import Page from './page';


class MainPage extends Page {
    /**
     * define selectors using getter methods
     */
    public get addressInput () {
        return $(`input[type='search']`);
    }

    public get addressSearchBtn () {
        return $('#button_search_address');
    }

    public get btnSubmit () {
        return $('button[type="submit"]');
    }

    public async setAddress (address: string) {
        await this.addressInput.setValue(address);
    }

}

export default new MainPage();

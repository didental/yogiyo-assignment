import MainPage from '../pageobjects/main.page';

describe('My Login application', () => {
  before(async () => {
    await MainPage.open('https://www.yogiyo.co.kr/mobile/#/');

    await MainPage.setAddress('판교대장로77');
    await MainPage.addressSearchBtn.click();
  });

  it('Should display catogories', async () => {

  });
});



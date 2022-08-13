import MainPage from '../pageobjects/main.page';
import searchResultPage from '../pageobjects/search-result.page';
import SearchResultPage from '../pageobjects/search-result.page';

function isDescendingArray(array: number[]) {
  let prevValue = array[0]
  return array.every((value) => {
    if (value > prevValue) {
      return false;
    } else {
      prevValue = value;
      return true;
    }
  });
}

function isAscendingOrder(array: number[]) {
  let prevValue = array[0]
  return array.every((value) => {
    if (value < prevValue) {
      return false;
    } else {
      prevValue = value;
      return true;
    }
  });
}

describe('My Login application', () => {
  before(async () => {
    await MainPage.open('https://www.yogiyo.co.kr/mobile/#/');

    await MainPage.setAddress('판교대장로77');
  });

  it('Should display catogories', async () => {

    const categoryShouldDisplay = (await browser.getWindowSize()).width < 992 ?
      [
        '음식점 전체보기', '1인분 주문', '프랜차이즈', '치킨',
        '피자/양식', '중국집', '한식', '일식/돈까스',
        '족발/보쌈', '야식', '분식', '카페/디저트', '편의점/마트'
      ] :
      [
        '전체보기', '1인분 주문', '프랜차이즈', '치킨',
        '피자/양식', '중국집', '한식', '일식/돈까스',
        '족발/보쌈', '야식', '분식', '카페/디저트', '편의점/마트'
      ]
    let categoryDisplayed = await SearchResultPage.getCategoryNames();
    expect(categoryDisplayed).toStrictEqual(categoryShouldDisplay);
  });

  it('Should display sorted stores by 별점', async () => {
    await SearchResultPage.sortBy('별점순');

    let stores = await SearchResultPage.getStoresInfo();
    console.log(stores);
    expect(isDescendingArray(stores.map(store => store.star))).toBe(true);
  });

  
});



import { Selector } from 'testcafe';

const TEST_URL = process.env.TEST_URL;


fixture('/').page(`${TEST_URL}/`);

test(`should display the page correctly`, async (t) => {
  await t
    .navigateTo(TEST_URL)
    .expect(Selector('a').withText('events').exists).ok()
    .expect(Selector('a').withText('Make a request').exists).ok()
});

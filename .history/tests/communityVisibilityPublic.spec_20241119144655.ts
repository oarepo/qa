import { test, expect } from '../utils/fixtures';
import { qase } from 'playwright-qase-reporter';
import { NewCommunity } from '../pages/newCommunityPage';

test.describe('New Upload', () => {
  let newCommunity: NewCommunity;

  test.beforeEach(async ({ loggedInPage, uploadPage, createCommunityAndUploadFile }) => {
    newCommunity = new NewCommunity(loggedInPage);
  });

  test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status === 'failed') {
      await page.screenshot({ path: `screenshots/${testInfo.title}.png` });
    }
  });

  test(qase(24, 'Community Visibility - Public'), async ({ uploadPage }) => {

    // Navigate to the 'Communities' page
    await uploadPage.waitForTwoSeconds();
    await newCommunity.navigateToCommunities();

  });
});

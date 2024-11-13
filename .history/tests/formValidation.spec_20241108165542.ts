import { test, expect } from '../utils/fixtures';
import { UploadPage } from '../pages/uploadPage';
import { testData } from '../data/testData';
import { qase } from 'playwright-qase-reporter';

test.describe('New Upload', () => {
  let uploadPage: UploadPage;
  let currentlySelectedType: string | null = null; // Track the currently selected resource type

  test.beforeEach(async ({ loggedInPage }) => {
    uploadPage = new UploadPage(loggedInPage); // Use the logged-in page
    await uploadPage.navigateToUploadSection(); // Navigate to the upload section
  });

  test(qase(22, 'Form Validation'), async () => {  

    // Upload a file
    await uploadPage.uploadRandomFile();

    // Click the Publish button
    await uploadPage.clickPublish();
    await uploadPage.clickPublishOnConfirmation();

    // Verify validation error messages are displayed
    await uploadPage.verifyValidationErrors();

    // Fill in the record details
    await uploadPage.fillTitle(testData.upload.recordTitle());
    await uploadPage.fillFamilyName(testData.upload.familyName());
    await uploadPage.selectDOIOption(true);
    await uploadPage.selectResourceType(currentlySelectedType);

    // Click the Publish button + confirm
    await uploadPage.clickPublish();
  });
});

import { test, expect } from '../utils/fixtures';
import { UploadPage } from '../pages/uploadPage';
import { testData } from '../data/testData';
import { qase } from 'playwright-qase-reporter';

test.describe('New Upload', () => {
  let uploadPage: UploadPage;

  test.beforeEach(async ({ loggedInPage }) => {
    uploadPage = new UploadPage(loggedInPage); // Use the logged-in page
  });

  test(qase(58, 'Upload a file successfully'), async () => {  

    const fileCount = 6; // Change this number to upload more or fewer files

    const currentlySelectedType = "your-type";

    // Fill in the form once (Title, Family Name, DOI, Resource Type)
    await uploadPage.navigateToUploadSection();
    await uploadPage.fillTitle(testData.upload.recordTitle());
    await uploadPage.fillFamilyName(testData.upload.familyName());
    await uploadPage.selectDOIOption(true); // Adjust based on your test needs
    await uploadPage.selectResourceType(currentlySelectedType);

    // Upload multiple files
    for (let i = 0; i < fileCount; i++) {
      await uploadPage.uploadRandomFile();  // Upload each file
      await uploadPage.waitForTwoSeconds(); // Optionally wait between uploads (adjust as needed)
    }

    // After all files are uploaded, click publish
    await uploadPage.clickPublish();           // Click the Publish button
    await uploadPage.clickPublishOnConfirmation(); // Confirm publishing

  });
});
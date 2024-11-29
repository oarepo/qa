// Import the required modules
import { faker } from '@faker-js/faker';

/**
 * Test Data:
 * Test data files store the input values and expected outputs used across test cases. 
 * They help separate the test logic from the data, ensuring tests remain flexible 
 * and reusable. By keeping data like form inputs, URLs, or expected messages in 
 * dedicated files, you can easily update and manage values without changing the 
 * test logic. This approach also allows for dynamic data generation using 
 * libraries like Faker, and ensures test cases remain clean and focused on 
 * behavior rather than hardcoded values.
 */

// Test data for tests, static hardcoded and also autogenerated by faker
// Direct URLS for a quick navigation
const login = process.env.INVENIO_USER_EMAIL ? process.env.INVENIO_USER_EMAIL : 'petr.brablc@gmail.com' 
//'petr.brablc@cesnet.cz'
const password = process.env.INVENIO_USER_PASSWORD ? process.env.INVENIO_USER_PASSWORD : '123456'
export const testData = {
  
  // User credentials for login - hardcoded
  email:login,
  password: password,

  // User credentials for login - generated by faker
  randomEmail: () => faker.internet.email(),
  randomPassword: () => faker.internet.password(),

   // Email of an existing user for invitation to a community !!!
   existingUserEmail: 'petr.brablc@cesnet.cz',

  // Generate a random embargo reason
  randomEmbargoReason: () => faker.lorem.sentence(),

  // New upload test data
  upload: {
    recordTitle: () => faker.lorem.sentence(), // Function to generate a random title
    familyName: () => faker.lorem.word(), // Function to generate a random family name
    recordDescription: () => faker.lorem.paragraph(), // Function to generate a random description
    communityName: () => faker.lorem.word(), // Function to generate a random community name
    communityIdentifier: () => faker.lorem.word(), // Function to generate a random community identifier

    // Dynamic resource type - Select randomly from a list, ensuring it's not the same as the currently selected type
    resourceType: (currentlySelected: string | null = null): string => {
      const resourceTypes = [
        'Image', 
        'Video', 
        'Dataset', 
        'Other', 
        'Audio', 
        'Software', 
        'Workflow', 
        'Poster', 
        'Model', 
        'Lesson', 
        'Event'
      ];

      // Filter out the currently selected type from the available types
      const availableTypes = currentlySelected 
        ? resourceTypes.filter(type => type !== currentlySelected) 
        : resourceTypes;

      // Select a random type from the available types
      return faker.helpers.arrayElement(availableTypes);
    },
  },

  // Data for export selection tests
  export: {
    style: 'Harvard', // Hardcoded style option for the test
    exportOption: 'JSON-LD' // Hardcoded export option for the test
  },

  // Method to get today's date plus one day in YYYY-MM-DD format
  getDatePlusOne: (): string => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    // Format the date as YYYY-MM-DD
    const year = tomorrow.getFullYear();
    const month = String(tomorrow.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(tomorrow.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  },

  // Method to get today's date in YYYY-MM-DD format
  getTodayDate: (): string => {
    const today = new Date();
    const year = today.getFullYear(); // Get the full 4-digit year
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(today.getDate()).padStart(2, '0'); // Pad the day with 0 if single digit

    return `${year}-${month}-${day}`;
  }
};
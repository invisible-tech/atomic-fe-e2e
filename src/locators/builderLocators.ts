export const builderLocators = {
  // Textarea locators
  promptTextarea: 'textarea[placeholder="Type a message..."]',
  assistantTextarea: 'textarea[placeholder="Type a message..."]', // alias for backward compatibility
  
  // Button locators
  sendButton: 'button[type="submit"][aria-label="Send message"]',
  acceptButton: 'button:has-text("Accept")',
  
  // Stage/Title locators
  stageTexts: '.truncate.font-semibold',
  stageTitles: '.truncate.font-semibold', // alias for the test
};
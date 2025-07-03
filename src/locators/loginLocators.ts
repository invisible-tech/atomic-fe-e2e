export const loginLocators = {
  // Auth0 locators
  signInWithAuth0Button: 'button:has-text("Sign in with Auth0")',
  continueWithGoogleButton: 'button:has-text("Continue with Google")',
  
  // Google login locators
  emailInput: 'input[type="email"]',
  emailOrPhoneInput: '[aria-label="Email or phone"]',
  passwordInput: 'input[type="password"]',
  enterPasswordInput: '[aria-label="Enter your password"]',
  nextButton: 'button:has-text("Next")',
  
  // 2FA locators
  twoFactorCodeInput: '[aria-label="Enter code"]',
  
  // Success indicators
  //pageHeadings: 'h1, h2, h3, h4',
  pageHeadings: 'h1.text-xl.font-semibold:has-text("Overview")'
};
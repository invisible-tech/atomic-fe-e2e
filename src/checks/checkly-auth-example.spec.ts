import { test, expect } from '../fixtures/auth.fixture'

test.describe('Checkly Auth Example', () => {
  test('should authenticate and access processes page', async ({ authenticatedPage }) => {
    
    await expect(authenticatedPage.getByRole('heading', { name: 'Processes' })).toBeVisible()
    
    const processesHeading = authenticatedPage.getByRole('heading', { name: 'Processes' })
    await expect(processesHeading).toBeVisible()
    
    console.log('Successfully authenticated and verified processes page visibility in Checkly')
  })
  
  test('should handle authenticated navigation', async ({ authenticatedPage }) => {
    await expect(authenticatedPage.getByRole('heading', { name: 'Processes' })).toBeVisible()
    
    const pageTitle = await authenticatedPage.title()
    expect(pageTitle).toContain('Invisible')
    
    console.log('Successfully verified authenticated navigation in Checkly')
  })
})
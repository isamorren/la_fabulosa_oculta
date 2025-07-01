import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
  test('should load and display the main heading', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/Filmverse/)
    
    const heading = page.getByRole('heading', { level: 1 })
    await expect(heading).toBeVisible()
  })

  test('should navigate to film review', async ({ page }) => {
    await page.goto('/')
    
    const firstFilmCard = page.locator('[data-testid="film-card"]').first()
    await firstFilmCard.click()
    
    await expect(page).toHaveURL(/\/films\//)
  })

  test('should have working dark mode toggle', async ({ page }) => {
    await page.goto('/')
    
    const darkModeToggle = page.getByRole('button', { name: /toggle theme/i })
    await darkModeToggle.click()
    
    await expect(page.locator('html')).toHaveClass(/dark/)
  })
})
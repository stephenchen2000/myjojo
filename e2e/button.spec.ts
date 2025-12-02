import { test, expect } from '@playwright/test';

test.describe('Button 组件 E2E 测试', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('应该显示按钮', async ({ page }) => {
    // 等待页面加载
    await page.waitForLoadState('networkidle');
    
    // 验证按钮存在
    const buttons = page.locator('button');
    await expect(buttons.first()).toBeVisible();
  });

  test('应该能够点击按钮', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    
    const button = page.locator('button').first();
    await button.click();
    
    // 验证点击后的行为（根据你的实际应用调整）
    // 例如：await expect(page.locator('.counter')).toContainText('1');
  });

  test('按钮应该有正确的样式', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    
    const button = page.locator('button.btn-primary').first();
    
    // 验证按钮可见且有正确的类名
    await expect(button).toBeVisible();
    await expect(button).toHaveClass(/btn-primary/);
  });
});


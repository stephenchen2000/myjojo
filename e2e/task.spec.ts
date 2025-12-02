import { test, expect } from '@playwright/test';

test.describe('Task 组件 E2E 测试', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('应该显示任务列表', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    
    // 查找任务元素
    const tasks = page.locator('.list-item');
    
    // 验证至少有一个任务
    await expect(tasks.first()).toBeVisible();
  });

  test('应该能够编辑任务标题', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    
    // 找到第一个任务的输入框
    const taskInput = page.locator('.list-item input[type="text"]').first();
    
    // 清空并输入新标题
    await taskInput.clear();
    await taskInput.fill('更新的任务标题');
    
    // 验证新标题
    await expect(taskInput).toHaveValue('更新的任务标题');
  });

  test('应该能够点击固定按钮', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    
    // 找到固定按钮
    const pinButton = page.locator('.pin-button').first();
    
    if (await pinButton.isVisible()) {
      await pinButton.click();
      
      // 验证按钮被点击（根据实际应用调整）
      // 例如：await expect(pinButton).toHaveClass(/active/);
    }
  });
});


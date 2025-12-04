import { test, expect } from '@playwright/test';
import { ButtonPage } from './pages/ButtonPage';

test.describe('ButtonPage 业务测试', () => {
  let buttonPage: ButtonPage;

  test.beforeEach(async ({ page }) => {
    buttonPage = new ButtonPage(page);
    await buttonPage.goto();
  });

  test('应该正确显示 Button 页面', async () => {
    // 验证页面标题
    await expect(buttonPage.pageTitle).toContainText('Button 组件展示');
    
    // 验证页面描述
    await expect(buttonPage.pageDescription).toBeVisible();
    
    // 验证返回首页链接
    await expect(buttonPage.backToHomeLink).toBeVisible();
  });

  test('应该能通过导航返回首页', async ({ page }) => {
    // 点击返回首页
    await buttonPage.goBackToHome();
    
    // 验证跳转到首页
    await expect(page).toHaveURL('/');
    await expect(page.locator('h1')).toContainText('组件展示中心');
  });

  test.describe('按钮变体业务测试', () => {
    test('应该显示所有按钮变体', async () => {
      await expect(buttonPage.primaryVariantButton).toBeVisible();
      await expect(buttonPage.secondaryVariantButton).toBeVisible();
      await expect(buttonPage.dangerVariantButton).toBeVisible();
    });

    test('Primary 按钮点击应该弹出提示', async ({ page }) => {
      // 监听 alert
      page.once('dialog', async dialog => {
        expect(dialog.message()).toContain('Primary clicked!');
        await dialog.accept();
      });
      
      await buttonPage.clickPrimaryVariant();
    });

    test('Secondary 按钮点击应该弹出提示', async ({ page }) => {
      page.once('dialog', async dialog => {
        expect(dialog.message()).toContain('Secondary clicked!');
        await dialog.accept();
      });
      
      await buttonPage.clickSecondaryVariant();
    });

    test('Danger 按钮点击应该弹出提示', async ({ page }) => {
      page.once('dialog', async dialog => {
        expect(dialog.message()).toContain('Danger clicked!');
        await dialog.accept();
      });
      
      await buttonPage.clickDangerVariant();
    });
  });

  test.describe('按钮尺寸业务测试', () => {
    test('应该显示所有尺寸的按钮', async () => {
      await expect(buttonPage.smallSizeButton).toBeVisible();
      await expect(buttonPage.mediumSizeButton).toBeVisible();
      await expect(buttonPage.largeSizeButton).toBeVisible();
    });

    test('Small 按钮应该有 btn-small 样式类', async () => {
      const classes = await buttonPage.getButtonClasses(buttonPage.smallSizeButton);
      expect(classes).toContain('btn-small');
    });

    test('Large 按钮应该有 btn-large 样式类', async () => {
      const classes = await buttonPage.getButtonClasses(buttonPage.largeSizeButton);
      expect(classes).toContain('btn-large');
    });
  });

  test.describe('按钮状态业务测试', () => {
    test('正常按钮应该可以点击', async () => {
      await expect(buttonPage.normalButton).toBeEnabled();
    });

    test('禁用按钮应该不可点击', async () => {
      await expect(buttonPage.disabledButton).toBeDisabled();
      
      // 使用 Page Object 方法验证
      const isDisabled = await buttonPage.isButtonDisabled();
      expect(isDisabled).toBe(true);
    });
  });

  test.describe('计数器业务功能测试', () => {
    test('计数器初始值应该为 0', async () => {
      const value = await buttonPage.getCounterValue();
      expect(value).toBe(0);
    });

    test('点击增加按钮应该增加计数', async () => {
      // 点击增加按钮 3 次
      await buttonPage.clickIncrease(3);
      
      // 验证计数变为 3
      const value = await buttonPage.getCounterValue();
      expect(value).toBe(3);
    });

    test('点击减少按钮应该减少计数', async () => {
      // 先增加到 5
      await buttonPage.clickIncrease(5);
      
      // 减少 2 次
      await buttonPage.clickDecrease(2);
      
      // 验证计数为 3
      const value = await buttonPage.getCounterValue();
      expect(value).toBe(3);
    });

    test('点击重置按钮应该将计数重置为 0', async () => {
      // 先增加到 10
      await buttonPage.clickIncrease(10);
      expect(await buttonPage.getCounterValue()).toBe(10);
      
      // 点击重置
      await buttonPage.clickReset();
      
      // 验证计数为 0
      const value = await buttonPage.getCounterValue();
      expect(value).toBe(0);
    });

    test('使用 setCounterTo 方法设置计数器值', async () => {
      // 设置为 7
      await buttonPage.setCounterTo(7);
      expect(await buttonPage.getCounterValue()).toBe(7);
      
      // 设置为 3（从 7 减到 3）
      await buttonPage.setCounterTo(3);
      expect(await buttonPage.getCounterValue()).toBe(3);
      
      // 设置为 10（从 3 加到 10）
      await buttonPage.setCounterTo(10);
      expect(await buttonPage.getCounterValue()).toBe(10);
    });

    test('完整的计数器操作流程', async () => {
      // 1. 验证初始值
      expect(await buttonPage.getCounterValue()).toBe(0);
      
      // 2. 增加到 5
      await buttonPage.clickIncrease(5);
      expect(await buttonPage.getCounterValue()).toBe(5);
      
      // 3. 减少 2
      await buttonPage.clickDecrease(2);
      expect(await buttonPage.getCounterValue()).toBe(3);
      
      // 4. 再增加 4
      await buttonPage.clickIncrease(4);
      expect(await buttonPage.getCounterValue()).toBe(7);
      
      // 5. 重置
      await buttonPage.clickReset();
      expect(await buttonPage.getCounterValue()).toBe(0);
    });

    test('计数器可以处理负数', async () => {
      // 从 0 开始减少 3 次
      await buttonPage.clickDecrease(3);
      
      // 验证计数为 -3
      const value = await buttonPage.getCounterValue();
      expect(value).toBe(-3);
    });
  });

  test.describe('组合示例业务测试', () => {
    test('应该显示所有尺寸和变体的组合', async () => {
      await expect(buttonPage.smallPrimaryButton).toBeVisible();
      await expect(buttonPage.mediumSecondaryButton).toBeVisible();
      await expect(buttonPage.largeDangerButton).toBeVisible();
    });

    test('Small Primary 按钮应该有正确的样式类', async () => {
      const classes = await buttonPage.getButtonClasses(buttonPage.smallPrimaryButton);
      expect(classes).toContain('btn-small');
      expect(classes).toContain('btn-primary');
    });

    test('Large Danger 按钮应该有正确的样式类', async () => {
      const classes = await buttonPage.getButtonClasses(buttonPage.largeDangerButton);
      expect(classes).toContain('btn-large');
      expect(classes).toContain('btn-danger');
    });
  });

  test.describe('使用说明业务测试', () => {
    test('应该显示使用说明部分', async () => {
      await expect(buttonPage.usageGuideTitle).toBeVisible();
    });

    test('应该能滚动到使用说明部分', async () => {
      // 滚动到使用说明
      await buttonPage.scrollToUsageGuide();
      
      // 验证使用说明在视口中
      await expect(buttonPage.usageGuideTitle).toBeInViewport();
    });
  });

  test.describe('综合业务场景测试', () => {
    test('用户浏览不同按钮并使用计数器的完整流程', async ({ page }) => {
      // 1. 用户查看 Primary 按钮
      await expect(buttonPage.primaryVariantButton).toBeVisible();
      
      // 2. 用户查看不同尺寸的按钮
      await expect(buttonPage.smallSizeButton).toBeVisible();
      await expect(buttonPage.largeSizeButton).toBeVisible();
      
      // 3. 用户使用计数器
      await buttonPage.clickIncrease(3);
      expect(await buttonPage.getCounterValue()).toBe(3);
      
      // 4. 用户重置计数器
      await buttonPage.clickReset();
      expect(await buttonPage.getCounterValue()).toBe(0);
      
      // 5. 用户滚动查看使用说明
      await buttonPage.scrollToUsageGuide();
      await expect(buttonPage.usageGuideTitle).toBeInViewport();
      
      // 6. 用户返回首页
      await buttonPage.goBackToHome();
      await expect(page).toHaveURL('/');
    });

    test('用户测试计数器的边界情况', async () => {
      // 测试大数值
      await buttonPage.setCounterTo(100);
      expect(await buttonPage.getCounterValue()).toBe(100);
      
      // 测试负数
      await buttonPage.setCounterTo(-50);
      expect(await buttonPage.getCounterValue()).toBe(-50);
      
      // 测试 0
      await buttonPage.setCounterTo(0);
      expect(await buttonPage.getCounterValue()).toBe(0);
    });

    test('用户快速连续操作计数器', async () => {
      // 快速增加
      await buttonPage.clickIncrease(10);
      
      // 快速减少
      await buttonPage.clickDecrease(5);
      
      // 验证最终值
      expect(await buttonPage.getCounterValue()).toBe(5);
      
      // 重置
      await buttonPage.clickReset();
      expect(await buttonPage.getCounterValue()).toBe(0);
    });
  });

  test('验证 Page Object 的 verifyPageTitle 方法', async () => {
    const isValid = await buttonPage.verifyPageTitle();
    expect(isValid).toBe(true);
  });
});


import { Page, Locator } from '@playwright/test';

/**
 * ButtonPage Page Object
 * 封装 Button 页面的元素和操作
 */
export class ButtonPage {
  readonly page: Page;
  
  // 导航元素
  readonly backToHomeLink: Locator;
  readonly pageTitle: Locator;
  readonly pageDescription: Locator;

  // 按钮变体区域
  readonly primaryVariantButton: Locator;
  readonly secondaryVariantButton: Locator;
  readonly dangerVariantButton: Locator;

  // 按钮尺寸区域
  readonly smallSizeButton: Locator;
  readonly mediumSizeButton: Locator;
  readonly largeSizeButton: Locator;

  // 按钮状态区域
  readonly normalButton: Locator;
  readonly disabledButton: Locator;

  // 计数器区域
  readonly counterDisplay: Locator;
  readonly increaseButton: Locator;
  readonly decreaseButton: Locator;
  readonly resetButton: Locator;

  // 组合示例区域
  readonly smallPrimaryButton: Locator;
  readonly mediumSecondaryButton: Locator;
  readonly largeDangerButton: Locator;

  // 使用说明区域
  readonly usageGuideTitle: Locator;

  constructor(page: Page) {
    this.page = page;

    // 导航元素
    this.backToHomeLink = page.getByRole('link', { name: /返回首页/i });
    this.pageTitle = page.locator('h1');
    this.pageDescription = page.locator('text=这是一个可复用的按钮组件');

    // 按钮变体
    this.primaryVariantButton = page.getByRole('button', { name: /Primary 按钮/i });
    this.secondaryVariantButton = page.getByRole('button', { name: /Secondary 按钮/i });
    this.dangerVariantButton = page.getByRole('button', { name: /Danger 按钮/i });

    // 按钮尺寸
    this.smallSizeButton = page.getByRole('button', { name: /^Small$/i });
    this.mediumSizeButton = page.getByRole('button', { name: /Medium \(默认\)/i });
    this.largeSizeButton = page.getByRole('button', { name: /^Large$/i });

    // 按钮状态
    this.normalButton = page.getByRole('button', { name: /正常按钮/i });
    this.disabledButton = page.getByRole('button', { name: /禁用按钮/i });

    // 计数器
    this.counterDisplay = page.locator('section:has-text("交互示例") p').first();
    this.increaseButton = page.getByRole('button', { name: /增加/i });
    this.decreaseButton = page.getByRole('button', { name: /减少/i });
    this.resetButton = page.getByRole('button', { name: /重置/i });

    // 组合示例
    this.smallPrimaryButton = page.getByRole('button', { name: /Small Primary/i });
    this.mediumSecondaryButton = page.getByRole('button', { name: /Medium Secondary/i });
    this.largeDangerButton = page.getByRole('button', { name: /Large Danger/i });

    // 使用说明
    this.usageGuideTitle = page.locator('h3', { hasText: '💡 使用说明' });
  }

  /**
   * 导航到 Button 页面
   */
  async goto() {
    await this.page.goto('/button');
  }

  /**
   * 点击返回首页
   */
  async goBackToHome() {
    await this.backToHomeLink.click();
  }

  /**
   * 获取计数器当前值
   */
  async getCounterValue(): Promise<number> {
    const text = await this.counterDisplay.textContent();
    return parseInt(text?.trim() || '0', 10);
  }

  /**
   * 点击增加按钮 n 次
   */
  async clickIncrease(times: number = 1) {
    for (let i = 0; i < times; i++) {
      await this.increaseButton.click();
    }
  }

  /**
   * 点击减少按钮 n 次
   */
  async clickDecrease(times: number = 1) {
    for (let i = 0; i < times; i++) {
      await this.decreaseButton.click();
    }
  }

  /**
   * 点击重置按钮
   */
  async clickReset() {
    await this.resetButton.click();
  }

  /**
   * 将计数器设置为指定值
   */
  async setCounterTo(value: number) {
    const currentValue = await this.getCounterValue();
    const diff = value - currentValue;
    
    if (diff > 0) {
      await this.clickIncrease(diff);
    } else if (diff < 0) {
      await this.clickDecrease(Math.abs(diff));
    }
  }

  /**
   * 点击 Primary 变体按钮（会触发 alert）
   */
  async clickPrimaryVariant() {
    await this.primaryVariantButton.click();
  }

  /**
   * 点击 Secondary 变体按钮（会触发 alert）
   */
  async clickSecondaryVariant() {
    await this.secondaryVariantButton.click();
  }

  /**
   * 点击 Danger 变体按钮（会触发 alert）
   */
  async clickDangerVariant() {
    await this.dangerVariantButton.click();
  }

  /**
   * 验证页面标题是否正确
   */
  async verifyPageTitle(): Promise<boolean> {
    const titleText = await this.pageTitle.textContent();
    return titleText?.includes('Button 组件展示') || false;
  }

  /**
   * 检查按钮是否禁用
   */
  async isButtonDisabled(): Promise<boolean> {
    return await this.disabledButton.isDisabled();
  }

  /**
   * 获取按钮的 CSS 类名
   */
  async getButtonClasses(button: Locator): Promise<string> {
    return await button.getAttribute('class') || '';
  }

  /**
   * 滚动到使用说明部分
   */
  async scrollToUsageGuide() {
    await this.usageGuideTitle.scrollIntoViewIfNeeded();
  }
}


# 🎭 全新项目设置 E2E 端到端测试 (Playwright)

> 📌 **前提条件**：已有 React 项目（不依赖 Storybook）

## E2E 测试 vs 其他测试

| 测试类型 | 测试范围 | 运行环境 | 速度 |
|----------|----------|----------|------|
| 渲染/交互/a11y | 单个组件 | 隔离的 Storybook | ⚡ 快 |
| 视觉回归 | 单个组件截图 | Chromatic 云端 | 🐢 慢 |
| **E2E 测试** | **完整应用流程** | **真实浏览器** | 🐢 慢 |

E2E 测试模拟真实用户操作，测试完整的用户流程（登录→操作→验证）。

---

## 步骤 1: 安装 Playwright

```bash
npm install -D @playwright/test playwright
```

## 步骤 2: 安装浏览器

```bash
npx playwright install
```

> 💡 这会安装 Chromium、Firefox、WebKit 三个浏览器

只安装特定浏览器：

```bash
npx playwright install chromium
npx playwright install firefox
npx playwright install webkit
```

---

## 步骤 3: 创建配置文件（playwright.config.ts）

```ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // 测试目录
  testDir: './e2e',
  testMatch: '**/*.spec.{ts,tsx}',

  // 超时设置
  timeout: 30 * 1000,        // 单个测试 30 秒
  expect: {
    timeout: 5000,           // 断言超时 5 秒
  },

  // 并行与重试
  fullyParallel: true,
  forbidOnly: !!process.env.CI,           // CI 中禁止 .only
  retries: process.env.CI ? 2 : 0,        // CI 中重试 2 次
  workers: process.env.CI ? 1 : undefined, // CI 中单线程

  // 报告输出
  reporter: [
    ['html'],                              // HTML 报告
    ['list'],                              // 控制台列表
    ['json', { outputFile: 'test-results/results.json' }],
  ],

  // 全局配置
  use: {
    baseURL: 'http://localhost:5173',      // 应用地址
    screenshot: 'only-on-failure',         // 失败时截图
    video: 'retain-on-failure',            // 失败时录制视频
    trace: 'on-first-retry',               // 重试时记录 trace
    viewport: { width: 1280, height: 720 },
  },

  // 多浏览器测试
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],

  // 🔑 自动启动开发服务器
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
});
```

---

## 步骤 4: 创建测试目录结构

```
e2e/
├── pages/              # Page Object Model
│   └── LoginPage.ts
├── helpers/            # 辅助函数
│   └── api-helpers.ts
├── button.spec.ts      # 测试文件
└── task.spec.ts
```

---

## 步骤 5: 编写测试文件（e2e/button.spec.ts）

```ts
import { test, expect } from '@playwright/test';

test.describe('Button 组件 E2E 测试', () => {
  // 每个测试前访问首页
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('应该显示按钮', async ({ page }) => {
    // 等待页面加载完成
    await page.waitForLoadState('networkidle');

    // 验证按钮存在
    const buttons = page.locator('button');
    await expect(buttons.first()).toBeVisible();
  });

  test('应该能够点击按钮', async ({ page }) => {
    await page.waitForLoadState('networkidle');

    const button = page.locator('button').first();
    await button.click();

    // 验证点击后的行为
    // await expect(page.locator('.counter')).toContainText('1');
  });

  test('按钮应该有正确的样式', async ({ page }) => {
    await page.waitForLoadState('networkidle');

    const button = page.locator('button.btn-primary').first();

    await expect(button).toBeVisible();
    await expect(button).toHaveClass(/btn-primary/);
  });
});
```

---

## 步骤 6: 添加测试脚本（package.json）

```json
{
  "scripts": {
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "test:e2e:headed": "playwright test --headed",
    "test:e2e:debug": "playwright test --debug",
    "test:e2e:report": "playwright show-report",
    "test:e2e:codegen": "playwright codegen http://localhost:5173"
  }
}
```

---

## 步骤 7: 运行测试

```bash
# 运行所有 E2E 测试
npm run test:e2e

# 在 UI 模式下运行（可视化调试）
npm run test:e2e:ui

# 显示浏览器窗口
npm run test:e2e:headed

# 调试模式
npm run test:e2e:debug

# 查看测试报告
npm run test:e2e:report
```

---

## 🎯 Page Object Model (POM) 模式

### 创建 Page Object（e2e/pages/LoginPage.ts）

```ts
import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator('input[name="email"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.submitButton = page.locator('button[type="submit"]');
    this.errorMessage = page.locator('.error-message');
  }

  async goto() {
    await this.page.goto('/login');
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }

  async getErrorMessage(): Promise<string | null> {
    return await this.errorMessage.textContent();
  }
}
```

### 使用 Page Object

```ts
import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';

test('用户登录流程', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login('user@example.com', 'password123');

  // 验证登录成功
  await expect(page).toHaveURL('/dashboard');
});
```

---

## 🔧 API Mock（e2e/helpers/api-helpers.ts）

```ts
import { Page } from '@playwright/test';

interface User {
  name: string;
  email?: string;
  token?: string;
}

interface Task {
  id: string;
  title: string;
  state: 'TASK_INBOX' | 'TASK_PINNED' | 'TASK_ARCHIVED';
}

// Mock 认证接口
export async function mockAuth(page: Page, user: User = { name: 'Test User' }) {
  await page.route('**/authenticate', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        user: { ...user, token: user.token || 'fake-token' },
      }),
    });
  });
}

// Mock 任务列表接口
export async function mockTasks(page: Page, tasks: Task[] = []) {
  await page.route('**/tasks', async (route) => {
    if (route.request().method() === 'GET') {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ tasks }),
      });
    } else {
      await route.continue();
    }
  });
}
```

### 使用 Mock

```ts
import { test, expect } from '@playwright/test';
import { mockAuth, mockTasks } from './helpers/api-helpers';

test('显示任务列表', async ({ page }) => {
  // 设置 Mock
  await mockAuth(page, { name: 'Test User' });
  await mockTasks(page, [
    { id: '1', title: '任务一', state: 'TASK_INBOX' },
    { id: '2', title: '任务二', state: 'TASK_PINNED' },
  ]);

  await page.goto('/tasks');

  // 验证任务显示
  await expect(page.locator('.task-item')).toHaveCount(2);
});
```

---

## 🔍 常用 API 速查

### 定位元素

| 方法 | 用途 |
|------|------|
| `page.locator('button')` | CSS 选择器 |
| `page.getByRole('button', { name: '提交' })` | 按角色 |
| `page.getByText('Hello')` | 按文本 |
| `page.getByLabel('邮箱')` | 按 label |
| `page.getByPlaceholder('请输入')` | 按 placeholder |
| `page.getByTestId('submit-btn')` | 按 data-testid |

### 操作元素

| 方法 | 用途 |
|------|------|
| `locator.click()` | 点击 |
| `locator.dblclick()` | 双击 |
| `locator.fill('text')` | 填充输入框 |
| `locator.clear()` | 清空输入框 |
| `locator.type('text')` | 逐字符输入 |
| `locator.press('Enter')` | 按键 |
| `locator.hover()` | 悬停 |
| `locator.check()` | 勾选复选框 |
| `locator.selectOption('value')` | 下拉选择 |

### 断言

| 方法 | 用途 |
|------|------|
| `expect(locator).toBeVisible()` | 可见 |
| `expect(locator).toBeHidden()` | 隐藏 |
| `expect(locator).toBeEnabled()` | 启用 |
| `expect(locator).toBeDisabled()` | 禁用 |
| `expect(locator).toHaveText('text')` | 文本内容 |
| `expect(locator).toHaveValue('value')` | 输入值 |
| `expect(locator).toHaveClass(/class/)` | 类名 |
| `expect(locator).toHaveCount(n)` | 元素数量 |
| `expect(page).toHaveURL('/path')` | URL |
| `expect(page).toHaveTitle('Title')` | 页面标题 |

### 等待

| 方法 | 用途 |
|------|------|
| `page.waitForLoadState('networkidle')` | 网络空闲 |
| `page.waitForURL('/path')` | URL 变化 |
| `page.waitForSelector('.element')` | 元素出现 |
| `page.waitForResponse('**/api')` | API 响应 |
| `page.waitForTimeout(1000)` | 固定等待（避免使用） |

---

## 🛠️ 代码生成器

Playwright 提供代码生成工具，自动录制操作生成测试代码：

```bash
npm run test:e2e:codegen
```

或指定 URL：

```bash
npx playwright codegen http://localhost:5173
```

---

## 🚀 GitHub Actions 集成

```yaml
name: 'E2E Tests'

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test-e2e:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        browser: [chromium, firefox, webkit]
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: 安装依赖
        run: npm ci

      - name: 安装 Playwright 浏览器
        run: npx playwright install --with-deps ${{ matrix.browser }}

      - name: 🎭 运行 E2E 测试
        run: npm run test:e2e -- --project=${{ matrix.browser }}

      - name: 上传测试报告
        uses: actions/upload-artifact@v4
        if: always()
        with:
          name: playwright-report-${{ matrix.browser }}
          path: playwright-report/
          retention-days: 30
```

---

## 📋 快速检查清单

| 步骤 | 内容 | 命令/文件 |
|------|------|----------|
| 1 | 安装 Playwright | `npm install -D @playwright/test playwright` |
| 2 | 安装浏览器 | `npx playwright install` |
| 3 | 创建配置 | `playwright.config.ts` |
| 4 | 创建目录 | `e2e/` 目录结构 |
| 5 | 编写测试 | `*.spec.ts` 文件 |
| 6 | 配置脚本 | package.json scripts |
| 7 | 运行测试 | `npm run test:e2e` |

---

## 🎯 完整测试体系总结

| 测试类型 | 工具 | 测试对象 | 运行命令 |
|----------|------|----------|----------|
| 渲染测试 | Vitest + Storybook | 组件能否渲染 | `npm run test:render` |
| 交互测试 | Vitest + Storybook | 组件交互行为 | `npm run test:interaction` |
| a11y 测试 | Vitest + axe-core | 无障碍合规 | `npm run test:a11y` |
| 视觉测试 | Chromatic | UI 像素对比 | `npm run chromatic` |
| **E2E 测试** | **Playwright** | **完整用户流程** | `npm run test:e2e` |

```
        测试金字塔
        
           /\
          /E2E\           ← Playwright (最慢，最少)
         /------\
        / Visual \        ← Chromatic
       /----------\
      / a11y | Int \      ← Vitest + Storybook
     /--------------\
    /    Render      \    ← Vitest + Storybook (最快，最多)
   /------------------\
```

---

## ⚠️ 常见问题

### Q: 测试超时失败？

增加超时时间：

```ts
test('慢速测试', async ({ page }) => {
  test.setTimeout(60000);  // 60 秒
  // ...
});
```

### Q: 元素找不到？

1. 使用 `await page.waitForSelector('.element')`
2. 检查元素是否在 iframe 中
3. 使用 UI 模式调试：`npm run test:e2e:ui`

### Q: CI 中测试不稳定？

1. 增加重试次数：`retries: 2`
2. 使用 `waitForLoadState('networkidle')`
3. Mock 不稳定的 API

---

## 🔗 相关资源

- [Playwright 官网](https://playwright.dev/)
- [Playwright 文档](https://playwright.dev/docs/intro)
- [Playwright VS Code 扩展](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright)


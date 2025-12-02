# 🎨 全新项目设置视觉回归测试 (Chromatic)

> 📌 **前提条件**：已完成 [Render.md](./Render.md) 中的步骤 1-4（Storybook 已安装）

## Chromatic 是什么？

Chromatic 是一个**云端视觉回归测试**服务，它会：
1. 📸 为每个 Story 截图
2. 🔍 与基线（baseline）像素级对比
3. 🚨 检测 UI 变化并通知你审核

| 特点 | 说明 |
|------|------|
| 云端服务 | 不需要本地存储截图 |
| 与 Storybook 集成 | 自动发现所有 Stories |
| 团队协作 | 支持审核、批准变更 |
| CI/CD 集成 | GitHub Actions 等 |

---

## 步骤 5: 注册 Chromatic 账号

### 5.1 访问 Chromatic 官网

前往 [https://www.chromatic.com/](https://www.chromatic.com/)

### 5.2 使用 GitHub 登录

点击 **"Sign in with GitHub"**，授权 Chromatic 访问你的仓库。

### 5.3 创建项目

1. 点击 **"Add project"**
2. 选择你的 GitHub 仓库
3. 获取 **Project Token**（形如 `chpt_xxxxxxxxxxxx`）

> ⚠️ **重要**：保存好你的 Project Token！

---

## 步骤 6: 安装依赖

```bash
npm install -D chromatic @chromatic-com/storybook
```

---

## 步骤 7: 配置 Storybook addon（.storybook/main.ts）

```ts
import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@chromatic-com/storybook',  // 🔑 添加 Chromatic addon
    '@storybook/addon-vitest',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
  ],
  framework: '@storybook/react-vite',
};

export default config;
```

---

## 步骤 8: 添加测试脚本（package.json）

```json
{
  "scripts": {
    "chromatic": "npx chromatic --project-token=<你的-project-token>"
  }
}
```

> 💡 将 `<你的-project-token>` 替换为你在步骤 5.3 获取的 token

### 更安全的方式：使用环境变量

```json
{
  "scripts": {
    "chromatic": "npx chromatic"
  }
}
```

然后在命令行运行时传入 token：

```bash
CHROMATIC_PROJECT_TOKEN=chpt_xxx npm run chromatic
```

---

## 步骤 9: 首次运行（建立基线）

```bash
npm run chromatic
```

首次运行会：
1. 构建 Storybook
2. 上传到 Chromatic 云端
3. 为所有 Stories 截图作为**基线（baseline）**

成功后会显示类似：

```
✔ Build 1 passed!

View your Storybook: https://xxx.chromatic.com/build?h=xxx
View your changes: https://xxx.chromatic.com/changes?h=xxx
```

---

## 步骤 10: 日常使用

### 10.1 修改代码后运行

```bash
npm run chromatic
```

Chromatic 会对比新截图与基线，检测变化。

### 10.2 审核变化

1. 打开 Chromatic 提供的链接
2. 查看 UI 变化的 diff
3. **Accept** 接受变更（更新基线）或 **Deny** 拒绝

---

## 🔧 常用命令行参数

```bash
# 跳过构建，使用已有的 storybook-static
npx chromatic --storybook-build-dir=storybook-static

# 自动接受所有变更（CI 中慎用）
npx chromatic --auto-accept-changes

# 只在 main 分支自动接受
npx chromatic --auto-accept-changes="main"

# 退出码：发现变化时不报错
npx chromatic --exit-zero-on-changes

# 仅测试特定 Stories
npx chromatic --only-story-names="Components/Button/*"

# 调试模式
npx chromatic --debug
```

---

## 🚀 GitHub Actions 集成

### 创建 .github/workflows/chromatic.yml

```yaml
name: 'Chromatic'

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  chromatic:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout 代码
        uses: actions/checkout@v4
        with:
          fetch-depth: 0  # 🔑 必须获取完整历史

      - name: 设置 Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: 安装依赖
        run: npm ci

      - name: 🎨 运行 Chromatic
        uses: chromaui/action@latest
        with:
          projectToken: ${{ secrets.CHROMATIC_PROJECT_TOKEN }}
          # 可选配置
          # autoAcceptChanges: "main"  # main 分支自动接受
          # exitZeroOnChanges: true    # 有变化时不失败
```

### 配置 GitHub Secret

1. 进入 GitHub 仓库 → **Settings** → **Secrets and variables** → **Actions**
2. 点击 **"New repository secret"**
3. Name: `CHROMATIC_PROJECT_TOKEN`
4. Value: 你的 project token

---

## ⚙️ 针对特定 Story 配置

### 禁用视觉测试

```jsx
export const SkipSnapshot = {
  args: { /* ... */ },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};
```

### 设置视口尺寸

```jsx
export const Mobile = {
  args: { /* ... */ },
  parameters: {
    chromatic: { viewports: [320, 768, 1200] },
  },
};
```

### 延迟截图（等待动画）

```jsx
export const Animated = {
  args: { /* ... */ },
  parameters: {
    chromatic: { delay: 500 },  // 等待 500ms
  },
};
```

### 忽略特定差异区域

```jsx
export const WithDynamicContent = {
  args: { /* ... */ },
  parameters: {
    chromatic: {
      diffThreshold: 0.2,  // 允许 20% 差异
    },
  },
};
```

---

## 📋 快速检查清单

| 步骤 | 内容 | 说明 |
|------|------|------|
| 1-4 | 基础设置 | 参考 Render.md |
| 5 | 注册账号 | chromatic.com + 获取 token |
| 6 | 安装依赖 | `chromatic` + `@chromatic-com/storybook` |
| 7 | 配置 addon | 添加到 .storybook/main.ts |
| 8 | 配置脚本 | 添加 `chromatic` 命令 |
| 9 | 首次运行 | 建立基线截图 |
| 10 | 日常使用 | 对比变化 + 审核 |

---

## 🎯 与其他测试的对比

| 测试类型 | 运行位置 | 检测内容 | 速度 |
|----------|----------|----------|------|
| **渲染测试** | 本地 | 组件能否渲染 | ⚡ 快 |
| **交互测试** | 本地 | 用户操作 | ⚡ 快 |
| **a11y 测试** | 本地 | 无障碍合规 | ⚡ 快 |
| **视觉测试** | ☁️ 云端 | 像素级 UI 变化 | 🐢 慢 |
| **E2E 测试** | 本地 | 完整用户流程 | 🐢 慢 |

---

## 💰 Chromatic 定价

| 计划 | 快照数/月 | 价格 |
|------|-----------|------|
| **Free** | 5,000 | $0 |
| **Pro** | 35,000+ | $149+/月 |

> 💡 **提示**：开源项目可申请免费额度！

---

## ⚠️ 常见问题

### Q: 截图数量太多，免费额度不够？

使用 `--only-changed` 只测试变化的 Stories：

```bash
npx chromatic --only-changed
```

### Q: 动态内容导致误报？

1. 使用 `delay` 等待内容稳定
2. 使用 `diffThreshold` 允许一定差异
3. Mock 动态数据（时间、随机数等）

### Q: CI 中如何获取 token？

使用 GitHub Secrets，**不要**硬编码在代码中！

```yaml
env:
  CHROMATIC_PROJECT_TOKEN: ${{ secrets.CHROMATIC_PROJECT_TOKEN }}
```

---

## 🔗 相关资源

- [Chromatic 官网](https://www.chromatic.com/)
- [Chromatic 文档](https://www.chromatic.com/docs/)
- [Storybook Visual Testing](https://storybook.js.org/docs/writing-tests/visual-testing)


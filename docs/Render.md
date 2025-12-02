# 🖼️ 渲染测试（Render Test）

## 概述

渲染测试验证组件在不同 props 下能否正确渲染，是测试金字塔的最底层。

- **测试内容**：组件显示、样式变体、不同尺寸
- **不包含**：用户交互、点击事件（这些在交互测试中覆盖）
- **特点**：速度最快，数量最多

> ⚠️ **前提条件**：请先完成 [Developer.md](./Developer.md) 中的开发阶段

---

## 步骤 1: 安装测试依赖

```bash
npm install -D vitest @vitest/browser @vitest/browser-playwright
npm install -D @storybook/addon-vitest @storybook/test
npm install -D playwright cross-env
npx playwright install chromium
```

---

## 步骤 2: 配置 Vite（vite.config.ts）

```ts
/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';

const dirname = typeof __dirname !== 'undefined' 
  ? __dirname 
  : path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  test: {
    projects: [{
      extends: true,
      plugins: [
        storybookTest({
          configDir: path.join(dirname, '.storybook')
        })
      ],
      test: {
        name: 'storybook',
        browser: {
          enabled: true,
          headless: true,
          provider: playwright({}),
          instances: [{
            browser: 'chromium'
          }]
        },
        setupFiles: ['.storybook/vitest.setup.ts']
      }
    }]
  }
});
```

---

## 步骤 3: 配置 Storybook（.storybook/main.ts）

```ts
import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: [
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-vitest",
    "@storybook/addon-docs",
  ],
  framework: "@storybook/react-vite"
};

export default config;
```

---

## 步骤 4: 配置测试 Setup（.storybook/vitest.setup.ts）

```ts
import { setProjectAnnotations } from '@storybook/react-vite';
import * as projectAnnotations from './preview';

setProjectAnnotations([projectAnnotations]);
```

---

## 步骤 5: 配置预览（.storybook/preview.ts）

```ts
import type { Preview } from '@storybook/react-vite'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      // 渲染测试时跳过 a11y 检查
      test: import.meta.env.VITE_SKIP_A11Y ? 'off' : 'error',
    }
  },
};

export default preview;
```

---

## 步骤 6: 添加测试脚本（package.json）

```json
{
  "scripts": {
    "test:render": "cross-env VITE_SKIP_A11Y=true vitest --project=storybook --run --reporter=verbose --testNamePattern=\"^((?!Interaction|Edit|Archived|Default).)*$\""
  }
}
```

### 脚本说明

| 参数 | 说明 |
|------|------|
| `cross-env VITE_SKIP_A11Y=true` | 跳过 a11y 检查，专注渲染测试 |
| `--project=storybook` | 使用 storybook 测试项目 |
| `--run` | 单次运行（非 watch 模式） |
| `--testNamePattern` | 过滤掉交互测试（包含 play 函数的 stories） |

---

## 步骤 7: 运行渲染测试

> 💡 **说明**：渲染测试直接复用 [Developer.md](./Developer.md) 中创建的 Stories 文件。
> 
> 开发阶段的 Stories（只有 `args`，没有 `play` 函数）就是渲染测试的测试用例。

```bash
npm run test:render
```

### 预期输出

```
📄 Running render tests only...

 ✓ src/components/Button.stories.jsx (6 tests)
   ✓ Components/Button > Primary
   ✓ Components/Button > Secondary
   ✓ Components/Button > Danger
   ✓ Components/Button > Small
   ✓ Components/Button > Large
   ✓ Components/Button > Disabled

 ✓ src/components/Task.stories.jsx (2 tests)
   ✓ Components/Task > Pinned
   ✓ Components/Task > LongTitle

 Test Files  2 passed (2)
      Tests  8 passed (8)
```

---

## 📋 渲染测试检查清单

| 步骤 | 内容 | 完成 |
|------|------|:----:|
| 1 | 安装测试依赖 | ☐ |
| 2 | 配置 vite.config.ts | ☐ |
| 3 | 配置 .storybook/main.ts | ☐ |
| 4 | 配置 .storybook/vitest.setup.ts | ☐ |
| 5 | 配置 .storybook/preview.ts | ☐ |
| 6 | 添加 test:render 脚本 | ☐ |
| 7 | 运行测试验证 | ☐ |

> 📝 **注意**：Stories 文件在开发阶段已创建，渲染测试直接复用。

---

## 🎯 渲染测试 vs 交互测试

| 特性 | 渲染测试 | 交互测试 |
|------|----------|----------|
| **目的** | 验证组件正确显示 | 验证用户操作响应 |
| **play 函数** | ❌ 不需要 | ✅ 必须有 |
| **测试内容** | props 变体、样式 | 点击、输入、悬停 |
| **速度** | ⚡ 最快 | 🔄 较慢 |
| **命令** | `npm run test:render` | `npm run test:interaction` |

---

## ⏭️ 下一步

渲染测试完成后，进入交互测试：

→ [Interaction.md](./Interaction.md)

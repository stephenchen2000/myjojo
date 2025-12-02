# 🚀 全新项目设置渲染测试

## 步骤 1: 创建 React 项目

```bash
npm create vite@latest my-app -- --template react
cd my-app
npm install
```

## 步骤 2: 安装 Storybook

```bash
npx storybook@latest init
```

## 步骤 3: 安装测试依赖

```bash
npm install -D vitest @vitest/browser @vitest/browser-playwright
npm install -D @storybook/addon-vitest @storybook/test
npm install -D playwright cross-env
npx playwright install chromium
```

## 步骤 4: 添加测试脚本（package.json）

```json
{
  "scripts": {
    "test:render": "cross-env VITE_SKIP_A11Y=true vitest --project=storybook --run --testNamePattern=\"^((?!Interaction|Edit|Archived|Default).)*$\""
  }
}
```

## 步骤 5: 编写 Story（src/components/Button.stories.jsx）

```jsx
import Button from './Button';

export default {
  component: Button,
  title: 'Components/Button',
};

// 渲染测试 - 不需要 play 函数
export const Primary = {
  args: { label: 'Primary', variant: 'primary' },
};

export const Secondary = {
  args: { label: 'Secondary', variant: 'secondary' },
};

export const Large = {
  args: { label: 'Large', size: 'large' },
};
```

## 步骤 6: 运行测试

```bash
npm run test:render
```

---

## 📋 快速检查清单

| 步骤 | 内容 | 命令 |
|------|------|------|
| 1 | 创建项目 | `npm create vite@latest` |
| 2 | 安装 Storybook | `npx storybook@latest init` |
| 3 | 安装测试依赖 | `npm install -D ...` |
| 4 | 配置脚本 | 编辑 package.json |
| 5 | 编写 Stories | 创建 *.stories.jsx |
| 6 | 运行测试 | `npm run test:render` |

> 💡 **提示**：你已经有详细的 test-render.md 文档，里面包含完整的配置文件内容（vite.config.ts、.storybook/main.ts 等）。


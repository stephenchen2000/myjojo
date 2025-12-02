# 🖱️ 全新项目设置交互测试

> 📌 **前提条件**：已完成 [Render.md](./Render.md) 中的步骤 1-4

## 在渲染测试基础上，交互测试额外需要：

| 区别 | 渲染测试 | 交互测试 |
|------|----------|----------|
| play 函数 | ❌ 不需要 | ✅ 必须有 |
| 测试工具 | 仅渲染 | userEvent, expect, fn |
| 测试内容 | 组件是否渲染 | 用户交互行为 |

---

## 步骤 5: 编写交互测试 Story

### 基础示例（src/components/Button.stories.jsx）

```jsx
import { within, expect, userEvent, fn } from '@storybook/test';
import Button from './Button';

export default {
  component: Button,
  title: 'Components/Button',
};

// ✅ 交互测试 - 需要 play 函数
export const PrimaryInteraction = {
  args: {
    label: 'Primary Button',
    variant: 'primary',
    onClick: fn(),  // 🔑 使用 fn() 创建 mock 函数
  },
  play: async ({ args, canvasElement }) => {
    // 重置 mock 函数，避免重复运行时累积调用次数
    args.onClick.mockClear();
    
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /primary button/i });
    
    // 测试按钮存在
    await expect(button).toBeInTheDocument();
    
    // 测试点击事件
    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalledTimes(1);
  },
};

// ✅ 禁用状态交互测试
export const DisabledInteraction = {
  args: {
    label: 'Disabled Button',
    disabled: true,
    onClick: fn(),
  },
  play: async ({ args, canvasElement }) => {
    args.onClick.mockClear();
    
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');
    
    // 验证按钮禁用
    await expect(button).toBeDisabled();
    
    // 尝试点击（不应触发）
    await userEvent.click(button);
    await expect(args.onClick).not.toHaveBeenCalled();
  },
};
```

### 进阶示例 - 表单输入测试

```jsx
export const EditTitle = {
  args: {
    task: {
      id: '5',
      title: 'Original title',
      state: 'TASK_INBOX',
    },
    onEditTitle: fn(),
  },
  play: async ({ args, canvasElement }) => {
    args.onEditTitle.mockClear();
    
    const canvas = within(canvasElement);
    const input = canvas.getByDisplayValue('Original title');
    
    // 清空并输入新标题
    await userEvent.clear(input);
    await userEvent.type(input, 'New title');
    
    // 验证回调被调用
    await expect(args.onEditTitle).toHaveBeenCalled();
  },
};
```

---

## 步骤 6: 添加测试脚本（package.json）

```json
{
  "scripts": {
    "test:interaction": "cross-env VITE_SKIP_A11Y=true vitest --project=storybook --run --testNamePattern=\"Interaction|Edit|Archived|Default\""
  }
}
```

---

## 步骤 7: 运行测试

```bash
npm run test:interaction
```

---

## 🔧 常用 API 速查

### 从 `@storybook/test` 导入

```jsx
import { within, expect, userEvent, fn } from '@storybook/test';
```

### 查询元素

| 方法 | 用途 |
|------|------|
| `canvas.getByRole('button')` | 按角色查找 |
| `canvas.getByText('Submit')` | 按文本查找 |
| `canvas.getByLabelText('Email')` | 按标签查找 |
| `canvas.getByDisplayValue('hello')` | 按输入值查找 |
| `canvas.queryByText('...')` | 查找（不存在返回 null） |

### 用户操作

| 方法 | 用途 |
|------|------|
| `userEvent.click(element)` | 点击 |
| `userEvent.dblClick(element)` | 双击 |
| `userEvent.type(input, 'text')` | 输入文本 |
| `userEvent.clear(input)` | 清空输入 |
| `userEvent.hover(element)` | 悬停 |
| `userEvent.keyboard('{Enter}')` | 按键 |

### 断言

| 方法 | 用途 |
|------|------|
| `expect(el).toBeInTheDocument()` | 存在于文档 |
| `expect(el).toBeDisabled()` | 禁用状态 |
| `expect(el).toHaveClass('active')` | 包含类名 |
| `expect(el).toHaveValue('text')` | 输入框值 |
| `expect(fn).toHaveBeenCalled()` | 函数被调用 |
| `expect(fn).toHaveBeenCalledWith(arg)` | 函数参数 |
| `expect(fn).toHaveBeenCalledTimes(n)` | 调用次数 |

---

## 📋 快速检查清单

| 步骤 | 内容 | 说明 |
|------|------|------|
| 1-4 | 基础设置 | 参考 Render.md |
| 5 | 编写 Story | 添加 `play` 函数 |
| 6 | 配置脚本 | 添加 `test:interaction` |
| 7 | 运行测试 | `npm run test:interaction` |

---

## ⚠️ 注意事项

1. **命名约定**：交互测试的 Story 名称应包含 `Interaction`、`Edit`、`Archived` 或 `Default`
2. **Mock 重置**：在 `play` 函数开头调用 `args.onClick.mockClear()` 避免测试累积
3. **异步等待**：所有断言和操作都要用 `await`

> 💡 **提示**：交互测试会在 Storybook 的 Interactions 面板中显示每一步的执行结果，方便调试。


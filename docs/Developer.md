# 🛠️ 开发阶段 - 组件驱动开发

## 概述

在进行测试之前，我们需要先完成组件的开发。本文档指导如何使用 Storybook 进行组件驱动开发（CDD）。

---

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

## 步骤 3: 安装开发依赖

```bash
npm install prop-types
```

---

## 步骤 4: 创建组件

### 4.1 组件文件（src/components/Button.jsx）

```jsx
import PropTypes from 'prop-types';
import './Button.css';

export default function Button({ 
  label, 
  onClick, 
  variant = 'primary', 
  size = 'medium',
  disabled = false 
}) {
  return (
    <button
      className={`btn btn-${variant} btn-${size}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
    >
      {label}
    </button>
  );
}

Button.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  disabled: PropTypes.bool,
};
```

### 4.2 样式文件（src/components/Button.css）

```css
.btn {
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease;
}

/* 尺寸变体 */
.btn-small { padding: 6px 12px; font-size: 12px; }
.btn-medium { padding: 10px 20px; font-size: 14px; }
.btn-large { padding: 14px 28px; font-size: 16px; }

/* 颜色变体 */
.btn-primary { background: #2563eb; color: white; }
.btn-primary:hover { background: #1d4ed8; }

.btn-secondary { background: #6b7280; color: white; }
.btn-secondary:hover { background: #4b5563; }

.btn-danger { background: #dc2626; color: white; }
.btn-danger:hover { background: #b91c1c; }

/* 禁用状态 */
.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
```

---

## 步骤 5: 创建 Story

### src/components/Button.stories.jsx

```jsx
import Button from './Button';

export default {
  component: Button,
  title: 'Components/Button',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'danger'],
    },
    size: {
      control: 'select', 
      options: ['small', 'medium', 'large'],
    },
  },
};

// 基础变体
export const Primary = {
  args: { label: 'Primary Button', variant: 'primary' },
};

export const Secondary = {
  args: { label: 'Secondary Button', variant: 'secondary' },
};

export const Danger = {
  args: { label: 'Danger Button', variant: 'danger' },
};

// 尺寸变体
export const Small = {
  args: { label: 'Small', size: 'small' },
};

export const Large = {
  args: { label: 'Large', size: 'large' },
};

// 状态变体
export const Disabled = {
  args: { label: 'Disabled', disabled: true },
};
```

---

## 步骤 6: 创建 Task 组件

### 6.1 组件文件（src/components/Task.jsx）

```jsx
import PropTypes from 'prop-types';
import './Task.css';

export default function Task({
  task: { id, title, state },
  onArchiveTask,
  onTogglePinTask,
  onEditTitle,
}) {
  return (
    <div
      className={`list-item ${state}`}
      role="listitem"
      aria-label={`task-${id}`}
    >
      <label
        htmlFor={`checked-${id}`}
        aria-label={`archiveTask-${id}`}
        className="checkbox"
      >
        <input
          type="checkbox"
          disabled={true}
          name="checked"
          id={`archiveTask-${id}`}
          checked={state === 'TASK_ARCHIVED'}
        />
        <span
          className="checkbox-custom"
          onClick={() => onArchiveTask(id)}
          role="button"
          aria-label={`archiveButton-${id}`}
        />
      </label>

      <label htmlFor={`title-${id}`} aria-label={title} className="title">
        <input
          type="text"
          value={title}
          name="title"
          id={`title-${id}`}
          placeholder="Input title"
          onChange={(e) => onEditTitle(e.target.value, id)}
        />
      </label>

      {state !== 'TASK_ARCHIVED' && (
        <button
          className="pin-button"
          onClick={() => onTogglePinTask(id)}
          id={`pinTask-${id}`}
          aria-label={state === 'TASK_PINNED' ? 'unpin' : 'pin'}
        >
          <span className="icon-star" />
        </button>
      )}
    </div>
  );
}

Task.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
  }),
  onArchiveTask: PropTypes.func.isRequired,
  onTogglePinTask: PropTypes.func.isRequired,
  onEditTitle: PropTypes.func.isRequired,
};
```

### 6.2 样式文件（src/components/Task.css）

```css
.list-item {
  display: flex;
  align-items: center;
  padding: 16px;
  background-color: white;
  border-bottom: 1px solid #e0e0e0;
  gap: 12px;
}

.list-item.TASK_ARCHIVED {
  opacity: 0.5;
}

.checkbox {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.checkbox input {
  display: none;
}

.checkbox-custom {
  width: 20px;
  height: 20px;
  border: 2px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
}

.list-item.TASK_ARCHIVED .checkbox-custom {
  background-color: #1ea7fd;
  border-color: #1ea7fd;
}

.title {
  flex: 1;
}

.title input {
  width: 100%;
  border: none;
  padding: 8px;
  font-size: 14px;
}

.title input:focus {
  outline: 2px solid #1ea7fd;
  border-radius: 4px;
}

.pin-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
}

.icon-star::before {
  content: '⭐';
}

.list-item.TASK_PINNED .icon-star::before {
  content: '📌';
}
```

### 6.3 Story 文件（src/components/Task.stories.jsx）

```jsx
import { fn } from '@storybook/test';
import Task from './Task';

export default {
  component: Task,
  title: 'Components/Task',
  args: {
    onArchiveTask: fn(),
    onTogglePinTask: fn(),
    onEditTitle: fn(),
  },
};

// 默认状态
export const Default = {
  args: {
    task: {
      id: '1',
      title: 'Buy milk',
      state: 'TASK_INBOX',
    },
  },
};

// 固定状态
export const Pinned = {
  args: {
    task: {
      id: '2',
      title: 'QA dropdown',
      state: 'TASK_PINNED',
    },
  },
};

// 归档状态
export const Archived = {
  args: {
    task: {
      id: '3',
      title: 'Write schema for account menu',
      state: 'TASK_ARCHIVED',
    },
  },
};

// 长标题测试
export const LongTitle = {
  args: {
    task: {
      id: '4',
      title: 'This task name is extremely long and should be handled properly',
      state: 'TASK_INBOX',
    },
  },
};
```

---

---

## 步骤 7: 应用入口文件

### 7.1 HTML 入口（index.html）

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>my-app</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

### 7.2 React 入口（src/main.tsx）

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

### 7.3 根组件（src/App.tsx）

```tsx
import { useState } from 'react'
import Button from './components/Button'
import Task from './components/Task'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Storybook Components Demo</h1>
      
      <section style={{ marginTop: '2rem' }}>
        <h2>Buttons</h2>
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <Button label="Primary" variant="primary" onClick={() => alert('Primary clicked!')} />
          <Button label="Secondary" variant="secondary" onClick={() => alert('Secondary clicked!')} />
          <Button label="Danger" variant="danger" onClick={() => alert('Danger clicked!')} />
        </div>
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2>Counter</h2>
        <Button 
          label={`Count is ${count}`} 
          onClick={() => setCount(count + 1)} 
        />
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2>Tasks</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem', maxWidth: '400px' }}>
          <Task 
            task={{ id: '1', title: 'Learn Storybook', state: 'TASK_INBOX' }}
            onArchiveTask={(id) => console.log('archived', id)}
            onTogglePinTask={(id) => console.log('pinned', id)}
            onEditTitle={(title, id) => console.log('edit', title, id)}
          />
          <Task 
            task={{ id: '2', title: 'Build components', state: 'TASK_PINNED' }}
            onArchiveTask={(id) => console.log('archived', id)}
            onTogglePinTask={(id) => console.log('pinned', id)}
            onEditTitle={(title, id) => console.log('edit', title, id)}
          />
          <Task 
            task={{ id: '3', title: 'Write tests', state: 'TASK_ARCHIVED' }}
            onArchiveTask={(id) => console.log('archived', id)}
            onTogglePinTask={(id) => console.log('pinned', id)}
            onEditTitle={(title, id) => console.log('edit', title, id)}
          />
        </div>
      </section>
    </div>
  )
}

export default App
```

---

## 步骤 8: 启动开发服务器

### 启动应用

```bash
npm run dev
```

浏览器打开 http://localhost:5173 查看完整应用

### 启动 Storybook

```bash
npm run storybook
```

浏览器打开 http://localhost:6006，你可以：
- 📖 查看所有组件变体
- 🎛️ 使用 Controls 面板调试 props
- 📝 查看自动生成的文档

---

## 📋 开发检查清单

| 步骤 | 内容 | 完成 |
|------|------|:----:|
| 1 | 创建项目 | ☐ |
| 2 | 安装 Storybook | ☐ |
| 3 | 安装开发依赖 (prop-types) | ☐ |
| 4 | 创建 Button 组件 (.jsx + .css) | ☐ |
| 5 | 创建 Button Stories | ☐ |
| 6 | 创建 Task 组件 (.jsx + .css) | ☐ |
| 7 | 配置入口文件 (index.html + main.tsx + App.tsx) | ☐ |
| 8 | 启动开发服务器验证应用 | ☐ |
| 9 | 启动 Storybook 验证组件 | ☐ |

---

## 📁 项目结构

```
my-app/
├── index.html                  # HTML 入口
├── src/
│   ├── main.tsx                # React 入口
│   ├── App.tsx                 # 根组件
│   ├── components/
│   │   ├── Button.jsx          # Button 组件逻辑
│   │   ├── Button.css          # Button 组件样式
│   │   ├── Button.stories.jsx  # Button Stories
│   │   ├── Task.jsx            # Task 组件逻辑
│   │   ├── Task.css            # Task 组件样式
│   │   └── Task.stories.jsx    # Task Stories
│   └── ...
├── .storybook/
│   ├── main.ts                 # Storybook 配置
│   └── preview.ts              # 预览配置
├── public/
│   └── vite.svg                # 静态资源
└── package.json
```

---

## ⏭️ 下一步

开发完成后，进入测试阶段：

1. **渲染测试** → [Render.md](./Render.md)
2. **交互测试** → [Interaction.md](./Interaction.md)
3. **可访问性测试** → [a11y.md](./a11y.md)
4. **视觉回归测试** → [chromatic.md](./chromatic.md)
5. **E2E 测试** → [Playwright.md](./Playwright.md)

> 💡 **组件驱动开发 (CDD)**：先在 Storybook 中独立开发和验证组件，再集成到应用中。


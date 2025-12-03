/**
 * ============================================
 * Button 组件的 Storybook Stories 文件
 * ============================================
 * 
 * Storybook 是一个用于独立开发和测试 UI 组件的工具。
 * 
 * 什么是 Story？
 * - Story 是组件在特定状态下的一个实例
 * - 每个 Story 展示组件的一种用法或状态
 * - 可以在 Storybook 界面中交互式地查看和测试
 * 
 * 文件命名规范：
 * - 组件文件：Button.jsx
 * - Story文件：Button.stories.jsx（必须以.stories.jsx/.stories.tsx结尾）
 * 
 * 学习要点：
 * 1. 如何编写 Story 来展示组件的不同状态
 * 2. 如何配置 Storybook 控件
 * 3. 如何编写交互测试（play function）
 */

// ========================================
// 导入依赖
// ========================================

/**
 * 从 @storybook/test 导入测试工具
 * 
 * within: 创建一个作用域，用于在特定元素内查询
 * expect: 断言函数，用于验证预期结果
 * userEvent: 模拟用户交互（点击、输入等）
 * fn: 创建mock函数，用于追踪函数调用
 */
import { within, expect, userEvent, fn } from '@storybook/test';

/**
 * 导入要编写 Story 的组件
 */
import Button from './Button';

// ========================================
// 默认导出 - Story 元数据配置
// ========================================

/**
 * 默认导出定义了这个 Stories 文件的元数据
 * Storybook 会读取这个配置来正确显示和组织你的 Stories
 */
export default {
  /**
   * component: 指定这个 Stories 文件对应的组件
   * Storybook 会用它来自动推断 props 类型和文档
   */
  component: Button,
  
  /**
   * title: 在 Storybook 侧边栏中显示的路径
   * 'Components/Button' 表示：
   *   - 在 "Components" 文件夹下
   *   - 显示名称为 "Button"
   * 这帮助你组织大型项目中的众多组件
   */
  title: 'Components/Button',
  
  /**
   * tags: 为组件添加标签
   * 'autodocs' 标签会自动生成组件文档页面
   * 文档包含：
   *   - 组件描述
   *   - Props 表格
   *   - 所有 Stories 的预览
   */
  tags: ['autodocs'],
  
  /**
   * argTypes: 配置 Storybook 控件面板
   * 
   * 控件面板让你可以在浏览器中实时修改组件的 props，
   * 看到不同参数下组件的表现。
   * 
   * 'control' 定义控件类型：
   *   - 'select': 下拉选择框
   *   - 'text': 文本输入框
   *   - 'boolean': 开关
   *   - 'number': 数字输入框
   *   - 'color': 颜色选择器
   *   等等...
   */
  argTypes: {
    // variant 属性使用下拉选择框
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'danger'],
    },
    // size 属性使用下拉选择框
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    // 其他属性（label, onClick, disabled）会根据 PropTypes 自动推断控件
  },
};

// ========================================
// 具名导出 - 各个 Stories
// ========================================

/**
 * 每个具名导出就是一个 Story
 * 
 * Story 对象的结构：
 * {
 *   args: { ... },      // 传给组件的 props
 *   play: async () => {},  // 可选：交互测试函数
 *   parameters: { ... },   // 可选：Story 级别的参数
 *   decorators: [ ... ],   // 可选：包装组件的装饰器
 * }
 */

// ========================================
// 颜色变体 Stories
// ========================================

/**
 * Primary Story - 展示主要按钮
 * 
 * 命名建议：
 * - 使用 PascalCase（首字母大写）
 * - 名称要描述这个 Story 展示的状态
 * - Storybook 会将 PascalCase 转换为空格分隔的标题
 *   例如：PrimaryButton -> "Primary Button"
 */
export const Primary = {
  /**
   * args 对象定义传给组件的 props
   * 相当于：<Button label="Primary Button" variant="primary" />
   */
  args: {
    label: 'Primary Button',
    variant: 'primary',
  },
};

/**
 * Secondary Story - 展示次要按钮
 */
export const Secondary = {
  args: {
    label: 'Secondary Button',
    variant: 'secondary',
  },
};

/**
 * Danger Story - 展示危险/删除按钮
 */
export const Danger = {
  args: {
    label: 'Delete',
    variant: 'danger',
  },
};

// ========================================
// 尺寸变体 Stories
// ========================================

/**
 * Small Story - 展示小尺寸按钮
 */
export const Small = {
  args: {
    label: 'Small Button',
    size: 'small',
  },
};

/**
 * Large Story - 展示大尺寸按钮
 */
export const Large = {
  args: {
    label: 'Large Button',
    size: 'large',
  },
};

// ========================================
// 状态变体 Stories
// ========================================

/**
 * Disabled Story - 展示禁用状态的按钮
 */
export const Disabled = {
  args: {
    label: 'Disabled Button',
    disabled: true,
  },
};

// ========================================
// 交互测试 Stories
// ========================================

/**
 * PrimaryInteraction Story - 带交互测试的按钮
 * 
 * Storybook 的 play 函数可以编写交互测试，
 * 测试会在 Story 加载后自动执行。
 * 
 * 这非常适合：
 * - 组件交互测试
 * - 用户流程验证
 * - 可视化测试过程（可以在 Storybook 中看到测试执行）
 */
export const PrimaryInteraction = {
  args: {
    label: 'Primary Button',
    variant: 'primary',
    /**
     * fn() 创建一个 mock 函数（模拟函数）
     * 
     * Mock 函数可以：
     * - 追踪被调用的次数
     * - 记录调用时的参数
     * - 模拟返回值
     * 
     * 这让我们可以验证 onClick 是否被正确调用
     */
    onClick: fn(),
  },
  
  /**
   * play 函数 - 交互测试
   * 
   * @param {Object} context - 测试上下文
   * @param {Object} context.args - 当前 Story 的 args
   * @param {HTMLElement} context.canvasElement - Story 渲染的容器元素
   * 
   * play 函数是异步的，可以使用 await 等待用户交互完成
   */
  play: async ({ args, canvasElement }) => {
    /**
     * 重置 mock 函数的调用记录
     * 
     * 为什么需要？
     * Storybook 可能会多次运行 Story（热重载、切换Story等），
     * 如果不重置，之前的调用次数会累积，导致测试失败
     */
    args.onClick.mockClear();
    
    /**
     * within(element) 创建一个查询作用域
     * 
     * 返回的 canvas 对象提供了 Testing Library 的查询方法：
     * - getByRole: 通过角色查询（推荐，符合无障碍标准）
     * - getByText: 通过文本内容查询
     * - getByTestId: 通过 data-testid 查询
     * - getByLabelText: 通过 label 查询
     * 等等...
     */
    const canvas = within(canvasElement);
    
    /**
     * getByRole 通过元素的 ARIA 角色查询
     * 
     * 'button' 是按钮的角色
     * { name: /primary button/i } 进一步通过可访问名称过滤
     * /primary button/i 是正则表达式，i 表示不区分大小写
     */
    const button = canvas.getByRole('button', { name: /primary button/i });
    
    /**
     * 断言：验证按钮存在于文档中
     * 
     * expect(元素).toBeInTheDocument() 
     * 这是 Testing Library 提供的 DOM 断言
     */
    await expect(button).toBeInTheDocument();
    
    /**
     * userEvent.click() 模拟用户点击
     * 
     * userEvent 比 fireEvent 更真实地模拟用户行为：
     * - 触发完整的事件序列（mousedown, focus, mouseup, click）
     * - 考虑元素的可见性和可交互性
     */
    await userEvent.click(button);
    
    /**
     * 断言：验证 onClick 被调用了恰好 1 次
     * 
     * toHaveBeenCalledTimes(n) 验证 mock 函数的调用次数
     */
    await expect(args.onClick).toHaveBeenCalledTimes(1);
  },
};

/**
 * DisabledInteraction Story - 测试禁用按钮的行为
 * 
 * 这个测试验证：
 * 1. 按钮确实处于禁用状态
 * 2. 点击禁用按钮不会触发 onClick
 */
export const DisabledInteraction = {
  args: {
    label: 'Disabled Button',
    disabled: true,
    onClick: fn(),
  },
  play: async ({ args, canvasElement }) => {
    // 重置 mock 函数
    args.onClick.mockClear();
    
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');
    
    /**
     * 断言：验证按钮是禁用的
     * 
     * toBeDisabled() 检查元素的 disabled 属性
     */
    await expect(button).toBeDisabled();
    
    /**
     * 尝试点击禁用的按钮
     * 
     * 虽然按钮禁用了，userEvent.click 仍会尝试点击
     * 但浏览器会阻止禁用按钮的点击事件
     */
    await userEvent.click(button);
    
    /**
     * 断言：验证 onClick 没有被调用
     * 
     * not.toHaveBeenCalled() 验证函数从未被调用
     * 这证明了禁用按钮正确阻止了点击事件
     */
    await expect(args.onClick).not.toHaveBeenCalled();
  },
};
/**
 * ============================================
 * Button 组件
 * ============================================
 * 
 * 这是一个可复用的按钮组件，展示了React组件开发的核心概念：
 * 1. 函数式组件 (Functional Component)
 * 2. Props（属性）传递
 * 3. 默认参数值
 * 4. CSS类名动态组合
 * 5. PropTypes 类型检查
 */

// ========================================
// 导入依赖
// ========================================

/**
 * PropTypes 是 React 的运行时类型检查库
 * 虽然 TypeScript 可以在编译时检查类型，
 * 但 PropTypes 可以在运行时验证 props，
 * 对于纯 JavaScript 项目非常有用
 */
import PropTypes from 'prop-types';

/**
 * 导入组件的CSS样式
 * 在React中，可以直接import CSS文件，
 * 打包工具（如Vite、Webpack）会自动处理
 */
import './Button.css';

// ========================================
// 组件定义
// ========================================

/**
 * Button 组件 - 可复用的按钮UI组件
 * 
 * 这是一个"函数式组件"（Functional Component），
 * 是React推荐的组件写法。函数接收props作为参数，
 * 返回JSX（React的模板语法）。
 * 
 * @param {Object} props - 组件属性对象
 * @param {string} props.label - 按钮显示的文字（必填）
 * @param {Function} props.onClick - 点击事件处理函数（可选）
 * @param {string} props.variant - 按钮变体：'primary'|'secondary'|'danger'
 * @param {string} props.size - 按钮尺寸：'small'|'medium'|'large'
 * @param {boolean} props.disabled - 是否禁用按钮
 * 
 * @returns {JSX.Element} 返回按钮元素
 * 
 * 使用示例：
 * <Button label="点击我" onClick={() => alert('clicked!')} />
 * <Button label="删除" variant="danger" size="small" />
 * <Button label="禁用按钮" disabled={true} />
 */
export default function Button({ 
  // 使用解构赋值从props对象中提取各个属性
  // 等号后面是默认值，当调用者没有传入该prop时使用
  label,                    // 按钮文字，必填，无默认值
  onClick,                  // 点击回调，可选
  variant = 'primary',      // 默认使用主要样式
  size = 'medium',          // 默认使用中等尺寸
  disabled = false          // 默认不禁用
}) {
  /**
   * 返回JSX - React的模板语法
   * 
   * JSX看起来像HTML，但实际上是JavaScript
   * 它会被Babel转译成 React.createElement() 调用
   */
  return (
    <button
      /**
       * className 动态组合
       * 
       * 使用模板字符串（反引号）动态生成类名
       * 例如：variant='primary', size='medium' 时
       * 生成的className为："btn btn-primary btn-medium"
       * 
       * 这种模式让我们可以根据props动态应用不同的CSS样式
       */
      className={`btn btn-${variant} btn-${size}`}
      
      /**
       * 事件处理
       * 
       * onClick 是React的事件处理属性
       * 注意：React使用驼峰命名（onClick），而不是HTML的全小写（onclick）
       * 我们直接将父组件传入的onClick函数绑定到按钮上
       */
      onClick={onClick}
      
      /**
       * disabled 属性
       * 
       * 当disabled为true时，按钮变为不可点击状态
       * React会自动将布尔值true渲染为 disabled 属性
       * false时则不会添加该属性
       */
      disabled={disabled}
      
      /**
       * aria-label 无障碍属性
       * 
       * 为屏幕阅读器提供按钮的描述文字
       * 这是Web可访问性(a11y)的重要实践
       * 帮助视障用户理解按钮的用途
       */
      aria-label={label}
    >
      {/**
       * JSX中使用花括号 {} 来插入JavaScript表达式
       * 这里将label变量的值作为按钮的文字内容
       */}
      {label}
    </button>
  );
}

// ========================================
// PropTypes 类型定义
// ========================================

/**
 * PropTypes 定义了组件期望接收的props的类型
 * 
 * 这样做的好处：
 * 1. 开发时如果传入错误类型，控制台会显示警告
 * 2. 作为组件的文档，告诉其他开发者如何使用
 * 3. 支持IDE的智能提示
 * 
 * 注意：PropTypes只在开发环境生效，生产环境会被移除
 */
Button.propTypes = {
  /**
   * .isRequired 表示这个prop是必须的
   * 如果调用组件时没有传入label，控制台会显示警告
   */
  label: PropTypes.string.isRequired,
  
  /**
   * PropTypes.func 表示期望一个函数
   * 没有.isRequired，所以是可选的
   */
  onClick: PropTypes.func,
  
  /**
   * PropTypes.oneOf() 限制值只能是数组中的某一个
   * 如果传入 variant="success"（不在列表中），会显示警告
   */
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger']),
  
  /**
   * 尺寸也限制为三个预定义值之一
   */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  
  /**
   * PropTypes.bool 表示布尔值
   */
  disabled: PropTypes.bool,
};
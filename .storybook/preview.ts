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
      // 'error' - 命令行测试时 a11y 违规会导致测试失败
      // 'todo' - 只在 Storybook UI 显示警告，不影响测试
      // 'off' - 完全跳过 a11y 检查
      test: import.meta.env.VITE_SKIP_A11Y ? 'off' : 'error',
    }
  },
  
  // 根据环境变量决定是否执行 play 函数
  loaders: import.meta.env.VITE_SKIP_PLAY ? [
    async () => {
      // 返回空对象，阻止 play 函数执行
      return {};
    }
  ] : undefined,
};

export default preview;
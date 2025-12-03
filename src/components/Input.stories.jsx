import { fn } from '@storybook/test';
import Input from './Input';

export default {
  component: Input,
  title: 'Components/Input',
};

// 默认输入框
export const Default = {
  args: {
    placeholder: '请输入内容',
    onChange: fn(),
  },
};

// 带初始值
export const WithValue = {
  args: {
    value: 'Hello World',
    onChange: fn(),
  },
};

// 禁用状态
export const Disabled = {
  args: {
    value: '不可编辑',
    disabled: true,
  },
};


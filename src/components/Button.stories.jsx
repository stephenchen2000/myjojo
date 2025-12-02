import { within, expect, userEvent, fn } from '@storybook/test';
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

// 基础按钮
export const Primary = {
  args: {
    label: 'Primary Button',
    variant: 'primary',
  },
};

export const Secondary = {
  args: {
    label: 'Secondary Button',
    variant: 'secondary',
  },
};

export const Danger = {
  args: {
    label: 'Delete',
    variant: 'danger',
  },
};

// 不同尺寸
export const Small = {
  args: {
    label: 'Small Button',
    size: 'small',
  },
};

export const Large = {
  args: {
    label: 'Large Button',
    size: 'large',
  },
};

// 禁用状态
export const Disabled = {
  args: {
    label: 'Disabled Button',
    disabled: true,
  },
};

// 基础交互测试
export const PrimaryInteraction = {
  args: {
    label: 'Primary Button',
    variant: 'primary',
    onClick: fn(),
  },
  play: async ({ args, canvasElement }) => {
    // 重置 mock 函数，避免 Storybook 重复运行时累积调用次数
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

// 禁用状态测试
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
    
    // 验证按钮禁用
    await expect(button).toBeDisabled();
    
    // 尝试点击（不应触发）
    await userEvent.click(button);
    await expect(args.onClick).not.toHaveBeenCalled();
  },
};
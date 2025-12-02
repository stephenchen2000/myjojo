import { fn, expect, userEvent, within } from '@storybook/test';
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

export const Default = {
  args: {
    task: {
      id: '1',
      title: 'Buy milk',
      state: 'TASK_INBOX',
    },
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    
    // 测试任务标题显示
    const input = canvas.getByDisplayValue('Buy milk');
    await expect(input).toBeInTheDocument();
    
    // 测试归档按钮
    const archiveButton = canvas.getByLabelText(/archiveButton-1/);
    await userEvent.click(archiveButton);
    await expect(args.onArchiveTask).toHaveBeenCalledWith('1');
    
    // 测试固定按钮
    const pinButton = canvas.getByLabelText(/pin/);
    await userEvent.click(pinButton);
    await expect(args.onTogglePinTask).toHaveBeenCalledWith('1');
  },
};

export const Pinned = {
  args: {
    task: {
      id: '2',
      title: 'QA dropdown',
      state: 'TASK_PINNED',
    },
  },
};

export const Archived = {
  args: {
    task: {
      id: '3',
      title: 'Write schema for account menu',
      state: 'TASK_ARCHIVED',
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // 验证归档状态
    const task = canvas.getByRole('listitem');
    await expect(task).toHaveClass(/TASK_ARCHIVED/);
    
    // 验证固定按钮不显示
    const pinButton = canvas.queryByLabelText(/pin/);
    expect(pinButton).not.toBeInTheDocument();
  },
};

// 长标题测试
export const LongTitle = {
  args: {
    task: {
      id: '4',
      title: 'This task name is extremely long and should be handled properly without breaking the layout or causing overflow issues',
      state: 'TASK_INBOX',
    },
  },
};

// 编辑标题测试
export const EditTitle = {
  args: {
    task: {
      id: '5',
      title: 'Original title',
      state: 'TASK_INBOX',
    },
  },
  play: async ({ args, canvasElement }) => {
    // 重置 mock 函数
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
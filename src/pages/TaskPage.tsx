import { useState } from 'react';
import { Link } from 'react-router-dom';
// @ts-ignore - JSX component without types
import Task from '../components/Task';

/**
 * Task 组件展示页面
 * 展示任务管理组件的各种状态和交互
 */
export default function TaskPage() {
  const [tasks, setTasks] = useState([
    { id: '1', title: '学习 React 基础', state: 'TASK_INBOX' },
    { id: '2', title: '构建组件库', state: 'TASK_PINNED' },
    { id: '3', title: '编写测试用例', state: 'TASK_INBOX' },
    { id: '4', title: '完成项目文档', state: 'TASK_ARCHIVED' },
    { id: '5', title: '代码审查', state: 'TASK_PINNED' },
  ]);

  // 归档任务
  const handleArchiveTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, state: 'TASK_ARCHIVED' } : task
    ));
  };

  // 切换固定状态
  const handleTogglePinTask = (id: string) => {
    setTasks(tasks.map(task => {
      if (task.id === id) {
        return {
          ...task,
          state: task.state === 'TASK_PINNED' ? 'TASK_INBOX' : 'TASK_PINNED'
        };
      }
      return task;
    }));
  };

  // 编辑任务标题
  const handleEditTitle = (title: string, id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, title } : task
    ));
  };

  // 添加新任务
  const handleAddTask = () => {
    const newTask = {
      id: Date.now().toString(),
      title: `新任务 ${tasks.length + 1}`,
      state: 'TASK_INBOX'
    };
    setTasks([...tasks, newTask]);
  };

  // 按状态筛选任务
  const inboxTasks = tasks.filter(t => t.state === 'TASK_INBOX');
  const pinnedTasks = tasks.filter(t => t.state === 'TASK_PINNED');
  const archivedTasks = tasks.filter(t => t.state === 'TASK_ARCHIVED');

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      {/* 导航返回 */}
      <Link to="/" style={{ 
        color: '#667eea', 
        textDecoration: 'none',
        fontSize: '0.9rem',
        display: 'inline-block',
        marginBottom: '1rem'
      }}>
        ← 返回首页
      </Link>

      <h1 style={{ color: '#1a202c', marginBottom: '0.5rem' }}>Task 组件展示</h1>
      <p style={{ color: '#718096', marginBottom: '2rem' }}>
        一个完整的任务管理组件，支持编辑、固定和归档操作
      </p>

      {/* 统计信息 */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1rem',
        marginBottom: '2rem'
      }}>
        <div style={{ 
          padding: '1.5rem', 
          background: '#ebf4ff', 
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#4299e1' }}>
            {inboxTasks.length}
          </div>
          <div style={{ color: '#2c5282', marginTop: '0.5rem' }}>收件箱任务</div>
        </div>
        <div style={{ 
          padding: '1.5rem', 
          background: '#fef5e7', 
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#f6ad55' }}>
            {pinnedTasks.length}
          </div>
          <div style={{ color: '#7c2d12', marginTop: '0.5rem' }}>固定任务</div>
        </div>
        <div style={{ 
          padding: '1.5rem', 
          background: '#f0fdf4', 
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#48bb78' }}>
            {archivedTasks.length}
          </div>
          <div style={{ color: '#22543d', marginTop: '0.5rem' }}>已归档任务</div>
        </div>
      </div>

      {/* 添加任务按钮 */}
      <div style={{ marginBottom: '2rem' }}>
        <button
          onClick={handleAddTask}
          style={{
            padding: '0.75rem 1.5rem',
            background: '#667eea',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: '600'
          }}
        >
          + 添加新任务
        </button>
      </div>

      {/* 固定任务 */}
      {pinnedTasks.length > 0 && (
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ color: '#2d3748', fontSize: '1.5rem', marginBottom: '1rem' }}>
            📌 固定任务
          </h2>
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '1rem', 
            maxWidth: '600px' 
          }}>
            {pinnedTasks.map(task => (
              <Task
                key={task.id}
                task={task}
                onArchiveTask={handleArchiveTask}
                onTogglePinTask={handleTogglePinTask}
                onEditTitle={handleEditTitle}
              />
            ))}
          </div>
        </section>
      )}

      {/* 收件箱任务 */}
      {inboxTasks.length > 0 && (
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ color: '#2d3748', fontSize: '1.5rem', marginBottom: '1rem' }}>
            📥 收件箱任务
          </h2>
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '1rem', 
            maxWidth: '600px' 
          }}>
            {inboxTasks.map(task => (
              <Task
                key={task.id}
                task={task}
                onArchiveTask={handleArchiveTask}
                onTogglePinTask={handleTogglePinTask}
                onEditTitle={handleEditTitle}
              />
            ))}
          </div>
        </section>
      )}

      {/* 已归档任务 */}
      {archivedTasks.length > 0 && (
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ color: '#2d3748', fontSize: '1.5rem', marginBottom: '1rem' }}>
            ✅ 已归档任务
          </h2>
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '1rem', 
            maxWidth: '600px' 
          }}>
            {archivedTasks.map(task => (
              <Task
                key={task.id}
                task={task}
                onArchiveTask={handleArchiveTask}
                onTogglePinTask={handleTogglePinTask}
                onEditTitle={handleEditTitle}
              />
            ))}
          </div>
        </section>
      )}

      {/* 任务状态说明 */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ color: '#2d3748', fontSize: '1.5rem', marginBottom: '1rem' }}>
          任务状态说明
        </h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1rem'
        }}>
          <div style={{ padding: '1rem', background: '#f7fafc', borderRadius: '6px' }}>
            <h3 style={{ color: '#2d3748', marginTop: 0 }}>📥 TASK_INBOX</h3>
            <p style={{ color: '#718096', lineHeight: '1.6' }}>
              收件箱状态，新创建的任务默认处于此状态。可以编辑、固定或归档。
            </p>
          </div>
          <div style={{ padding: '1rem', background: '#fef5e7', borderRadius: '6px' }}>
            <h3 style={{ color: '#2d3748', marginTop: 0 }}>📌 TASK_PINNED</h3>
            <p style={{ color: '#718096', lineHeight: '1.6' }}>
              固定状态，重要的任务可以固定到顶部。点击固定图标可切换状态。
            </p>
          </div>
          <div style={{ padding: '1rem', background: '#f0fdf4', borderRadius: '6px' }}>
            <h3 style={{ color: '#2d3748', marginTop: 0 }}>✅ TASK_ARCHIVED</h3>
            <p style={{ color: '#718096', lineHeight: '1.6' }}>
              已归档状态，完成的任务会移到归档区。归档后任务变为只读。
            </p>
          </div>
        </div>
      </section>

      {/* 使用说明 */}
      <section style={{ 
        background: '#ebf4ff', 
        padding: '1.5rem', 
        borderRadius: '8px',
        borderLeft: '4px solid #4299e1'
      }}>
        <h3 style={{ color: '#2c5282', marginTop: 0 }}>💡 使用说明</h3>
        <ul style={{ color: '#2c5282', lineHeight: '1.8' }}>
          <li><code>task</code>: 任务对象，包含 id, title, state 属性</li>
          <li><code>onArchiveTask</code>: 归档任务的回调函数</li>
          <li><code>onTogglePinTask</code>: 切换固定状态的回调函数</li>
          <li><code>onEditTitle</code>: 编辑任务标题的回调函数</li>
        </ul>
        <div style={{ 
          marginTop: '1rem', 
          padding: '1rem', 
          background: 'white', 
          borderRadius: '4px',
          fontFamily: 'monospace',
          fontSize: '0.9rem'
        }}>
          <strong>操作提示：</strong><br />
          • 点击任务标题可以编辑<br />
          • 点击星星图标可以固定/取消固定<br />
          • 点击归档按钮可以归档任务<br />
          • 归档后的任务会显示为禁用状态
        </div>
      </section>
    </div>
  );
}


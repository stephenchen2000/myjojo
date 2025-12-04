import { useState } from 'react'
// @ts-ignore - JSX component without types
import Button from './components/Button'
// @ts-ignore - JSX component without types
import Task from './components/Task'

function App() {
  const [count, setCount] = useState(0)
  
  // 添加任务状态管理
  const [tasks, setTasks] = useState([
    { id: '1', title: 'Learn Storybook', state: 'TASK_INBOX' },
    { id: '2', title: 'Build components', state: 'TASK_PINNED' },
    { id: '3', title: 'Write tests', state: 'TASK_ARCHIVED' },
  ])

  // 处理任务标题编辑
  const handleEditTitle = (title: string, id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, title } : task
    ))
  }

  // 处理任务归档
  const handleArchiveTask = (id: string) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, state: 'TASK_ARCHIVED' } : task
    ))
  }

  // 处理任务固定
  const handleTogglePinTask = (id: string) => {
    setTasks(tasks.map(task => {
      if (task.id === id) {
        return {
          ...task,
          state: task.state === 'TASK_PINNED' ? 'TASK_INBOX' : 'TASK_PINNED'
        }
      }
      return task
    }))
  }

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
          {tasks.map(task => (
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
    </div>
  )
}

export default App


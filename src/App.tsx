import { useState } from 'react'
// @ts-ignore - JSX component without types
import Button from './components/Button'
// @ts-ignore - JSX component without types
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
            onArchiveTask={(id: string) => console.log('archived', id)}
            onTogglePinTask={(id: string) => console.log('pinned', id)}
            onEditTitle={(title: string, id: string) => console.log('edit', title, id)}
          />
          <Task 
            task={{ id: '2', title: 'Build components', state: 'TASK_PINNED' }}
            onArchiveTask={(id: string) => console.log('archived', id)}
            onTogglePinTask={(id: string) => console.log('pinned', id)}
            onEditTitle={(title: string, id: string) => console.log('edit', title, id)}
          />
          <Task 
            task={{ id: '3', title: 'Write tests', state: 'TASK_ARCHIVED' }}
            onArchiveTask={(id: string) => console.log('archived', id)}
            onTogglePinTask={(id: string) => console.log('pinned', id)}
            onEditTitle={(title: string, id: string) => console.log('edit', title, id)}
          />
        </div>
      </section>
    </div>
  )
}

export default App


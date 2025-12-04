import { useState } from 'react';
import { Link } from 'react-router-dom';
// @ts-ignore - JSX component without types
import Button from '../components/Button';

/**
 * Button 组件展示页面
 * 展示各种 Button 的用法和状态
 */
export default function ButtonPage() {
  const [count, setCount] = useState(0);

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

      <h1 style={{ color: '#1a202c', marginBottom: '0.5rem' }}>Button 组件展示</h1>
      <p style={{ color: '#718096', marginBottom: '2rem' }}>
        这是一个可复用的按钮组件，支持多种变体和尺寸
      </p>

      {/* 按钮变体 */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ color: '#2d3748', fontSize: '1.5rem', marginBottom: '1rem' }}>
          按钮变体 (Variants)
        </h2>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Button 
            label="Primary 按钮" 
            variant="primary" 
            onClick={() => alert('Primary clicked!')} 
          />
          <Button 
            label="Secondary 按钮" 
            variant="secondary" 
            onClick={() => alert('Secondary clicked!')} 
          />
          <Button 
            label="Danger 按钮" 
            variant="danger" 
            onClick={() => alert('Danger clicked!')} 
          />
        </div>
      </section>

      {/* 按钮尺寸 */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ color: '#2d3748', fontSize: '1.5rem', marginBottom: '1rem' }}>
          按钮尺寸 (Sizes)
        </h2>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <Button 
            label="Small" 
            size="small" 
            onClick={() => alert('Small button!')} 
          />
          <Button 
            label="Medium (默认)" 
            size="medium" 
            onClick={() => alert('Medium button!')} 
          />
          <Button 
            label="Large" 
            size="large" 
            onClick={() => alert('Large button!')} 
          />
        </div>
      </section>

      {/* 按钮状态 */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ color: '#2d3748', fontSize: '1.5rem', marginBottom: '1rem' }}>
          按钮状态 (States)
        </h2>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Button 
            label="正常按钮" 
            variant="primary" 
            onClick={() => alert('Normal button!')} 
          />
          <Button 
            label="禁用按钮" 
            variant="primary" 
            disabled={true} 
          />
        </div>
      </section>

      {/* 交互示例 */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ color: '#2d3748', fontSize: '1.5rem', marginBottom: '1rem' }}>
          交互示例 - 计数器
        </h2>
        <div style={{ 
          padding: '2rem', 
          background: '#f7fafc', 
          borderRadius: '8px',
          display: 'inline-block'
        }}>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2d3748', marginBottom: '1rem' }}>
            {count}
          </p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Button 
              label="增加" 
              variant="primary"
              onClick={() => setCount(count + 1)} 
            />
            <Button 
              label="减少" 
              variant="secondary"
              onClick={() => setCount(count - 1)} 
            />
            <Button 
              label="重置" 
              variant="danger"
              onClick={() => setCount(0)} 
            />
          </div>
        </div>
      </section>

      {/* 组合示例 */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ color: '#2d3748', fontSize: '1.5rem', marginBottom: '1rem' }}>
          不同尺寸 + 不同变体
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Button label="Small Primary" size="small" variant="primary" />
            <Button label="Small Secondary" size="small" variant="secondary" />
            <Button label="Small Danger" size="small" variant="danger" />
          </div>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Button label="Medium Primary" size="medium" variant="primary" />
            <Button label="Medium Secondary" size="medium" variant="secondary" />
            <Button label="Medium Danger" size="medium" variant="danger" />
          </div>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Button label="Large Primary" size="large" variant="primary" />
            <Button label="Large Secondary" size="large" variant="secondary" />
            <Button label="Large Danger" size="large" variant="danger" />
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
          <li><code>variant</code>: 'primary' | 'secondary' | 'danger'</li>
          <li><code>size</code>: 'small' | 'medium' | 'large'</li>
          <li><code>disabled</code>: boolean - 是否禁用按钮</li>
          <li><code>onClick</code>: function - 点击事件处理函数</li>
        </ul>
      </section>
    </div>
  );
}


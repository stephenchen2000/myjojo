import { useState } from 'react';
import { Link } from 'react-router-dom';
// @ts-ignore - JSX component without types
import Input from '../components/Input';
// @ts-ignore - JSX component without types
import Button from '../components/Button';

/**
 * Input 组件展示页面
 * 展示各种 Input 的用法和状态
 */
export default function InputPage() {
  const [basicValue, setBasicValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    message: ''
  });

  const handleFormSubmit = () => {
    alert(`提交表单:\n用户名: ${formData.username}\n邮箱: ${formData.email}\n留言: ${formData.message}`);
  };

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

      <h1 style={{ color: '#1a202c', marginBottom: '0.5rem' }}>Input 组件展示</h1>
      <p style={{ color: '#718096', marginBottom: '2rem' }}>
        这是一个简单的输入框组件，支持多种输入场景
      </p>

      {/* 基础输入框 */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ color: '#2d3748', fontSize: '1.5rem', marginBottom: '1rem' }}>
          基础输入框
        </h2>
        <div style={{ maxWidth: '400px' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
            输入内容：
          </label>
          <Input 
            value={basicValue}
            onChange={(e) => setBasicValue(e.target.value)}
            placeholder="请输入文字..."
          />
          <p style={{ marginTop: '0.5rem', color: '#718096', fontSize: '0.9rem' }}>
            当前输入: <strong>{basicValue || '(空)'}</strong>
          </p>
        </div>
      </section>

      {/* 不同类型的输入框 */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ color: '#2d3748', fontSize: '1.5rem', marginBottom: '1rem' }}>
          不同 Placeholder 示例
        </h2>
        <div style={{ maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
              邮箱：
            </label>
            <Input 
              value={emailValue}
              onChange={(e) => setEmailValue(e.target.value)}
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
              搜索：
            </label>
            <Input 
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="搜索内容..."
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
              密码：
            </label>
            <Input 
              value={passwordValue}
              onChange={(e) => setPasswordValue(e.target.value)}
              placeholder="输入密码"
            />
          </div>
        </div>
      </section>

      {/* 禁用状态 */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ color: '#2d3748', fontSize: '1.5rem', marginBottom: '1rem' }}>
          禁用状态
        </h2>
        <div style={{ maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
              正常输入框：
            </label>
            <Input 
              value="可以编辑的内容"
              onChange={(e) => console.log(e.target.value)}
              placeholder="正常输入"
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
              禁用的输入框：
            </label>
            <Input 
              value="不可编辑的内容"
              onChange={(e) => console.log(e.target.value)}
              placeholder="禁用输入"
              disabled={true}
            />
          </div>
        </div>
      </section>

      {/* 表单示例 */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ color: '#2d3748', fontSize: '1.5rem', marginBottom: '1rem' }}>
          表单示例
        </h2>
        <div style={{ 
          maxWidth: '500px', 
          padding: '2rem', 
          background: '#f7fafc', 
          borderRadius: '8px'
        }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
              用户名 *
            </label>
            <Input 
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              placeholder="请输入用户名"
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
              邮箱 *
            </label>
            <Input 
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="your@email.com"
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
              留言
            </label>
            <Input 
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="留言内容 (可选)"
            />
          </div>

          <Button 
            label="提交表单" 
            variant="primary"
            onClick={handleFormSubmit}
          />
        </div>
      </section>

      {/* 实时验证示例 */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ color: '#2d3748', fontSize: '1.5rem', marginBottom: '1rem' }}>
          实时验证示例
        </h2>
        <div style={{ maxWidth: '400px' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
            输入长度验证（最多10个字符）：
          </label>
          <Input 
            value={basicValue.slice(0, 10)}
            onChange={(e) => setBasicValue(e.target.value.slice(0, 10))}
            placeholder="最多10个字符"
          />
          <div style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>
            <span style={{ color: basicValue.length >= 10 ? '#e53e3e' : '#718096' }}>
              {basicValue.length} / 10 字符
            </span>
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
          <li><code>value</code>: string - 输入框的值（受控组件）</li>
          <li><code>onChange</code>: function - 输入变化时的回调函数</li>
          <li><code>placeholder</code>: string - 占位符文本</li>
          <li><code>disabled</code>: boolean - 是否禁用输入框</li>
        </ul>
      </section>
    </div>
  );
}


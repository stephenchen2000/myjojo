import { Link } from 'react-router-dom';

/**
 * 首页 - 组件导航页面
 * 提供到各个组件展示页面的链接
 */
export default function HomePage() {
  const pages = [
    {
      title: 'Button 组件',
      description: '按钮组件，支持多种变体、尺寸和状态',
      path: '/button',
      icon: '🔘',
      color: '#667eea',
      bgColor: '#ebf4ff'
    },
    {
      title: 'Input 组件',
      description: '输入框组件，用于表单数据输入',
      path: '/input',
      icon: '✏️',
      color: '#48bb78',
      bgColor: '#f0fdf4'
    },
    {
      title: 'Task 组件',
      description: '任务管理组件，支持编辑、固定和归档',
      path: '/task',
      icon: '✅',
      color: '#f6ad55',
      bgColor: '#fef5e7'
    }
  ];

  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '4rem 2rem'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* 页面标题 */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h1 style={{ 
            color: 'white', 
            fontSize: '3rem', 
            margin: '0 0 1rem 0',
            fontWeight: '800'
          }}>
            组件展示中心
          </h1>
          <p style={{ 
            color: 'rgba(255, 255, 255, 0.9)', 
            fontSize: '1.25rem',
            margin: 0
          }}>
            探索我们的 React 组件库
          </p>
        </div>

        {/* 组件卡片网格 */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem',
          marginBottom: '3rem'
        }}>
          {pages.map(page => (
            <Link
              key={page.path}
              to={page.path}
              style={{
                textDecoration: 'none',
                color: 'inherit'
              }}
            >
              <div style={{
                background: 'white',
                borderRadius: '16px',
                padding: '2rem',
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.1)';
              }}
              >
                {/* 背景装饰 */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '150px',
                  height: '150px',
                  background: page.bgColor,
                  borderRadius: '0 0 0 100%',
                  opacity: 0.5
                }} />

                {/* 图标 */}
                <div style={{
                  fontSize: '4rem',
                  marginBottom: '1rem',
                  position: 'relative',
                  zIndex: 1
                }}>
                  {page.icon}
                </div>

                {/* 标题 */}
                <h2 style={{
                  color: '#1a202c',
                  fontSize: '1.75rem',
                  margin: '0 0 0.5rem 0',
                  fontWeight: '700',
                  position: 'relative',
                  zIndex: 1
                }}>
                  {page.title}
                </h2>

                {/* 描述 */}
                <p style={{
                  color: '#718096',
                  fontSize: '1rem',
                  lineHeight: '1.6',
                  margin: '0 0 1.5rem 0',
                  flex: 1,
                  position: 'relative',
                  zIndex: 1
                }}>
                  {page.description}
                </p>

                {/* 查看按钮 */}
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: page.color,
                  fontWeight: '600',
                  fontSize: '1rem',
                  position: 'relative',
                  zIndex: 1
                }}>
                  查看详情
                  <span style={{ transition: 'transform 0.3s ease' }}>→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* 项目信息 */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: '12px',
          padding: '2rem',
          color: 'white',
          textAlign: 'center'
        }}>
          <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.5rem' }}>
            🚀 关于这个项目
          </h3>
          <p style={{ 
            margin: '0 0 1.5rem 0', 
            lineHeight: '1.8',
            opacity: 0.9
          }}>
            这是一个基于 React + TypeScript + Vite 构建的组件库展示项目。<br />
            使用 Storybook 进行组件开发，Playwright 进行 E2E 测试。
          </p>
          <div style={{ 
            display: 'flex', 
            gap: '1rem', 
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <div style={{ 
              padding: '0.5rem 1rem', 
              background: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '20px',
              fontSize: '0.9rem'
            }}>
              React 19
            </div>
            <div style={{ 
              padding: '0.5rem 1rem', 
              background: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '20px',
              fontSize: '0.9rem'
            }}>
              TypeScript
            </div>
            <div style={{ 
              padding: '0.5rem 1rem', 
              background: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '20px',
              fontSize: '0.9rem'
            }}>
              Vite
            </div>
            <div style={{ 
              padding: '0.5rem 1rem', 
              background: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '20px',
              fontSize: '0.9rem'
            }}>
              Storybook
            </div>
            <div style={{ 
              padding: '0.5rem 1rem', 
              background: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '20px',
              fontSize: '0.9rem'
            }}>
              Playwright
            </div>
          </div>
        </div>

        {/* 底部导航提示 */}
        <div style={{
          marginTop: '3rem',
          textAlign: 'center',
          color: 'rgba(255, 255, 255, 0.8)',
          fontSize: '0.9rem'
        }}>
          <p>点击上方卡片探索各个组件的详细用法 ✨</p>
        </div>
      </div>
    </div>
  );
}


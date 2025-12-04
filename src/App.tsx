import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ButtonPage from './pages/ButtonPage';
import InputPage from './pages/InputPage';
import TaskPage from './pages/TaskPage';

/**
 * App 组件 - 应用的主入口
 * 配置路由和页面导航
 */
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/button" element={<ButtonPage />} />
        <Route path="/input" element={<InputPage />} />
        <Route path="/task" element={<TaskPage />} />
      </Routes>
    </Router>
  );
}

export default App;

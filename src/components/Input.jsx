/**
 * Input 组件 - 最简单的输入框
 */
import PropTypes from 'prop-types';
import './Input.css';

export default function Input({
  value,
  onChange,
  placeholder = '请输入...',
  disabled = false,
}) {
  // 🔴 断点1：组件渲染时暂停
  debugger;

  // 处理输入变化
  const handleChange = (e) => {
    // 🔴 断点2：输入时暂停，可以查看 e.target.value
    debugger;
    onChange?.(e);
  };

  return (
    <input
      className="input"
      type="text"
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      disabled={disabled}
    />
  );
}

Input.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
};


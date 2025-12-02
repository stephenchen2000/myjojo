import PropTypes from 'prop-types';
import './Task.css';

export default function Task({
  task: { id, title, state },
  onArchiveTask,
  onTogglePinTask,
  onEditTitle,
}) {
  return (
    <div
      className={`list-item ${state}`}
      role="listitem"
      aria-label={`task-${id}`}
    >
      <label
        htmlFor={`checked-${id}`}
        aria-label={`archiveTask-${id}`}
        className="checkbox"
      >
        <input
          type="checkbox"
          disabled={true}
          name="checked"
          id={`archiveTask-${id}`}
          checked={state === 'TASK_ARCHIVED'}
        />
        <span
          className="checkbox-custom"
          onClick={() => onArchiveTask(id)}
          role="button"
          aria-label={`archiveButton-${id}`}
        />
      </label>

      <label htmlFor={`title-${id}`} aria-label={title} className="title">
        <input
          type="text"
          value={title}
          name="title"
          id={`title-${id}`}
          placeholder="Input title"
          onChange={(e) => onEditTitle(e.target.value, id)}
        />
      </label>

      {state !== 'TASK_ARCHIVED' && (
        <button
          className="pin-button"
          onClick={() => onTogglePinTask(id)}
          id={`pinTask-${id}`}
          aria-label={state === 'TASK_PINNED' ? 'unpin' : 'pin'}
        >
          <span className="icon-star" />
        </button>
      )}
    </div>
  );
}

Task.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
  }),
  onArchiveTask: PropTypes.func.isRequired,
  onTogglePinTask: PropTypes.func.isRequired,
  onEditTitle: PropTypes.func.isRequired,
};
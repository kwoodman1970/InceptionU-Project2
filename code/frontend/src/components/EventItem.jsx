export function EventItem({ completed, id, title, toggleEvent, deleteEvent }) {
  return (
    <li>
      <label>
        <input
          type="checkbox"
          checked={completed}
          onChange={(e) => toggleEvent(id, e.target.checked)}
        />
        {title}
      </label>
      <button onClick={() => deleteEvent(id)} className="btn btn-danger">
        Delete Event
      </button>
    </li>
  );
}

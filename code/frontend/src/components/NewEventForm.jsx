import { useState } from "react";

export function NewEventForm({ onSubmit }) {
  {
    /* this line is destructuring*/
  }
  const [newEvent, setNewEvent] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (newEvent === " ") return;

    onSubmit(newEvent);

    setNewEvent("");
  }

  return (
    <form onSubmit={handleSubmit} className="sport-event-form">
      <div className="event-row">
        <label htmlFor="event">Add Event</label>
        <input
          value={newEvent}
          onChange={(e) => setNewEvent(e.target.value)}
          type="text"
          id="event"
        />
      </div>
      <button className="btn">Add</button>
    </form>
  );
}

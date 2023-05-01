import { useEffect, useState } from "react";
import { NewEventForm } from "./components/NewEventForm";
import { EventList } from "./components/EventList";

export default function App2() {
  const [events, setEvents] = useState(() => {
    const localValue = localStorage.getItem("ITEMS");
    if (localValue == null) return [];

    return JSON.parse(localValue);
  });

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(events));
  }, [events]);

  function addEvent(title) {
    setEvents((currentEvents) => {
      return [
        ...currentEvents,
        { id: crypto.randomUUID(), title, completed: false },
      ];
    });
  }

  function toggleEvent(id, completed) {
    setEvents((currentEvents) => {
      return currentEvents.map((event) => {
        if (event.id === id) {
          return { ...event, completed };
        }

        return event;
      });
    });
  }

  function deleteEvent(id) {
    setEvents((currentEvents) => {
      return currentEvents.filter((event) => event.id !== id);
    });
  }

  return (
    <>
      <NewEventForm onSubmit={addEvent} />
      <h1 className="header">event List</h1>
      <EventList
        events={events}
        toggleEvent={toggleEvent}
        deleteEvent={deleteEvent}
      />
    </>
  );
}

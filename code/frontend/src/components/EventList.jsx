import { EventItem } from "./EventItem";

export function EventList({ events, toggleEvent, deleteEvent }) {
  return (
    <ul className="list">
      {events.length === 0 && "No Listed Events"}{" "}
      {/*this is called short
    circuiting*/}
      {events.map((event) => {
        return (
          <EventItem
            id={event.id}
            completed={event.completed}
            title={event.title}
            key={event.id}
            toggleEvent={toggleEvent}
            deleteEvent={deleteEvent}
          />
        );
      })}
    </ul>
  );
}

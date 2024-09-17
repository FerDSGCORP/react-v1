import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import {
    IconTema,
    IconNotificationAction,
    IconBell
} from '../components/Icons'

function MenuNotifications() {
    const [date, setDate] = useState(new Date());
    const [events, setEvents] = useState([
        { date: new Date(2024, 8, 18), title: 'Cumpleaños de Juan' },
        { date: new Date(2024, 8, 20), title: 'Reunión de trabajo' },
        { date: new Date(2024, 8, 25), title: 'Cita con el doctor' }
    ]);

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [eventTitle, setEventTitle] = useState("");

    // Función para agregar un nuevo evento
    const addEvent = () => {
        const newEvent = { date: selectedDate, title: eventTitle };
        setEvents([...events, newEvent]);
        setEventTitle("");
    };

    // Función para mostrar contenido en las celdas con eventos
    const tileContent = ({ date, view }) => {
        if (view === 'month') {
            const eventForDate = events.find(event => event.date.toDateString() === date.toDateString());
            return eventForDate ? <p className="event-marker">{eventForDate.title}</p> : null;
        }
    };

    return (
        <div className='container__notificationExpand'>
                <div className="actionAside">
                <i><IconNotificationAction /></i>
            </div>
            <div className="container_calendar">
                {/* <input
                    type="text"
                    placeholder="Título del evento"
                    value={eventTitle}
                    onChange={e => setEventTitle(e.target.value)}
                />
                <button onClick={addEvent}>Agregar Evento</button> */}
                <Calendar
                    onChange={setDate}
                    value={date}
                    // tileContent={tileContent}
                />
                <ul className="calendar_list">
                    {events.map((event, index) => (
                        <li key={index}>
                            &nbsp;
                            {/* {event.date.toDateString()}: */}
                             {event.title}
                        </li>
                    ))}
                </ul>
                <div className="container__notifications">
                    <div className="banner">
                        <span>NOTIFICACIONES</span>
                    </div>
                    <div className="list_notifications">
                        <ul>
                            <li className="notification">
                                <IconBell/>
                                <span>Envío de carta de instrucción el 08/08/2024</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default MenuNotifications
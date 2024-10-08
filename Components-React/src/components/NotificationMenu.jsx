import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {
    IconNotificationAction,
    IconBell,
    IconAddEvent
} from '../components/Icons';

const localizer = momentLocalizer(moment);

function MenuNotifications() {
    const [events, setEvents] = useState([
        {
            title: 'Cumpleaños de Juan',
            start: new Date(2024, 9, 18),
            end: new Date(2024, 9, 20), // Evento de 3 días
            allDay: true,
        },
        {
            title: 'Reunión de trabajo',
            start: new Date(2024, 9, 20),
            end: new Date(2024, 9, 21),
            allDay: true,
        },
        {
            title: 'Cita con el doctor',
            start: new Date(2024, 9, 25),
            end: new Date(2024, 9, 25),
            allDay: true,
        }
    ]);

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [eventTitle, setEventTitle] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Función para agregar un nuevo evento
    const addEvent = () => {
        const newEvent = {
            title: eventTitle,
            start: selectedDate,
            end: selectedDate,
            allDay: true
        };
        setEvents([...events, newEvent]);
        setEventTitle("");
        setIsModalOpen(false); // Cierra el modal después de agregar
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <div className='container__notificationExpand'>
                <div className="actionAside">
                    <i><IconNotificationAction /></i>
                </div>
                <div className="container_calendar">
                    <button className='--btn-icon-text --ml-auto' onClick={openModal}>
                        Agregar Evento <IconAddEvent />
                    </button>

                    <div style={{ height: 500 }}>
                        <Calendar
                            localizer={localizer}
                            events={events}
                            startAccessor="start"
                            endAccessor="end"
                            style={{ height: 500 }}
                        />
                    </div>

                    <ul className="calendar_list">
                        {events.map((event, index) => (
                            <li key={index}>
                                {event.start.toDateString()} - {event.end.toDateString()}: {event.title}
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
                                    <IconBell />
                                    <span>Envío de carta de instrucción el 08/08/2024</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <div className='modal-content-head'>
                            <h2>Agregar Evento</h2>
                            <button type='button' className="close-button" onClick={closeModal}>&times;</button>
                        </div>
                        <div className="container__content --content__modal__column">
                            <div className="container__field">
                                <span>Tema de Agenda</span>
                                <input
                                    type="text"
                                    value={eventTitle}
                                    onChange={(e) => setEventTitle(e.target.value)}
                                />
                            </div>
                            <div className="container__field">
                                <span>Fecha/Hora Inicio</span>
                                <input
                                    type="datetime-local"
                                    onChange={(e) => setSelectedDate(new Date(e.target.value))}
                                />
                            </div>
                            <div className="container__btn">
                                <button onClick={addEvent} className="btn --btn-azul">Guardar</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default MenuNotifications;

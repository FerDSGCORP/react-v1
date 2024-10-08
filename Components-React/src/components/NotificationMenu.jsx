import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import {
    IconTema,
    IconNotificationAction,
    IconBell,
    IconAddEvent
} from '../components/Icons'

function MenuNotifications() {
    const [date, setDate] = useState(new Date());
    const [events, setEvents] = useState([
        { date: new Date(2024, 9, 18), title: 'Cumpleaños de Juan' },
        { date: new Date(2024, 9, 20), title: 'Reunión de trabajo' },
        { date: new Date(2024, 9, 25), title: 'Cita con el doctor' }
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



    const [isModalOpen, setIsModalOpen] = useState(false);
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

                <button className='--btn-icon-text --ml-auto' onClick={openModal}>Agregar Evento
                    <IconAddEvent/>
                </button>
                    {/* <input
                    type="text"
                    placeholder="Título del evento"
                    value={eventTitle}
                    onChange={e => setEventTitle(e.target.value)}
                />
                 */}
                    <Calendar
                        onChange={setDate}
                        value={date}
                        tileContent={tileContent}
                    />
                    <ul className="calendar_list">
                        {events.map((event, index) => (
                            <li key={index}>
                                &nbsp;
                                {event.date.toDateString()}:
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
                            <input type="text" name="" id="TituloAgenda" />
                        </div>
                        <div className="container__field">
                            <span>Fecha/Hora Inicio</span>
                            <input type="datetime-local" name="" id="FechaInicio" />
                        </div>
                        <div className="container__field">
                            <span>Fecha/Hora Término</span>
                            <input type="datetime-local" name="" id="FechaFin" />
                        </div>
                        <div className="container__field">
                            <span>Prioridad</span>
                            <select name="selectPrioridad" id="selectPrioridad">
                                <option value="" selected>Selecciona una opción</option>
                                <option value="Alta">Alta</option>
                                <option value="Media">Media</option>
                                <option value="Baja">Baja</option>
                            </select>
                        </div>
                        <div className="container__field">
                            <span>Descripción</span>
                            <textarea name="" id="" rows="5"></textarea>
                        </div>
                        <div className="container__field container__btn">
                            <button className="btn --btn-azul">Guardar</button>
                        </div>
                    </div>

                </div>
            </div>
           )} 
        </>
    );
}
export default MenuNotifications
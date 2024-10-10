import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/es'; // Importa la localización en español
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {
    IconNotificationAction,
    IconBell,
    IconAddEvent,
    IconcalendarMenu
} from '../components/Icons';

// Configura moment para español
moment.locale('es');

function MenuNotifications() {
    
const localizer = momentLocalizer(moment);
const [isMenuHidden, setIsMenuHidden] = useState(false);

const toggleMenu = () => {
    setIsMenuHidden(!isMenuHidden);
};

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

    const [modalData, setModalData] = useState({ title: "", start: "", end: "" });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState("Editar Evento");

    // Agregar un nuevo evento
    const addEvent = () => {
        const newEvent = {
            title: modalData.title,
            start: new Date(modalData.start),
            end: new Date(modalData.end),
            allDay: true
        };
        setEvents([...events, newEvent]);
        setModalData({ title: "", start: "", end: "" });
        setIsModalOpen(false);
    };

    // Abrir modal para editar evento
    const handleEventClick = (event) => {
        setModalData({
            title: event.title,
            start: moment(event.start).format("YYYY-MM-DDTHH:mm"),
            end: moment(event.end).format("YYYY-MM-DDTHH:mm")
        });
        setModalTitle("Editar Evento");
        setIsModalOpen(true);
    };

    // Abrir modal para nuevo evento
    const handleNewEvent = () => {
        setModalData({
            title: "",
            start: moment(new Date()).format("YYYY-MM-DDTHH:mm"),
            end: moment(new Date()).format("YYYY-MM-DDTHH:mm")
        });
        setModalTitle("Nuevo Evento");
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    // Definir los mensajes en español para el calendario
    const messages = {
        next: "Siguiente",
        previous: "Anterior",
        today: "Hoy",
        month: "Mes",
        week: "Semana",
        day: "Día",
        agenda: "Agenda",
        date: "Fecha",
        time: "Hora",
        event: "Evento",
        allDay: "Todo el día",
        noEventsInRange: "No hay eventos en este rango.",
        showMore: (total) => `+ Ver más (${total})`
    };

    // Formato de fechas en español usando moment
    const formats = {
        dateFormat: 'DD', // Formato de día
        dayFormat: (date, culture, localizer) => moment(date).format('ddd'), // Formato para días abreviados
        weekdayFormat: (date, culture, localizer) => moment(date).format('dddd'), // Formato para días completos
        monthHeaderFormat: (date, culture, localizer) => moment(date).format('MMMM YYYY'), // Formato para el encabezado de meses
    };
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 1200) {
                setIsMenuHidden(true); 
            } else {
                setIsMenuHidden(false); 
            }
        };
    
        handleResize();
    
        window.addEventListener('resize', handleResize);
    
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    return (
        <>
           <div className={`container__notificationExpand ${isMenuHidden ? 'hide' : ''}`}>
                <div className="actionAside">
                    <i id='hideMenu' onClick={toggleMenu}><IconNotificationAction /></i>
                </div>
                <div className="container_calendar">
                    <button id='newEvent' className='--btn-icon-text --ml-auto' onClick={handleNewEvent}>
                        Agregar Evento <IconAddEvent />
                    </button>

                    <div style={{ height: 350 }}>
                        <Calendar
                            localizer={localizer}
                            events={events}
                            startAccessor="start"
                            endAccessor="end"
                            style={{ height: 350 }}
                            onSelectEvent={handleEventClick}
                            messages={messages}  
                            formats={formats}   
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
            <div className={`container__menuSmall ${isMenuHidden ? '' : 'hide'}`} onClick={toggleMenu}>
                <div className="bell">
                    <IconBell />
                </div>
                <div className="line"></div>
                <div className="calendar">
                    <IconcalendarMenu />
                </div>
            </div>
            {isModalOpen && (
            <div className="modal">
                <div className="modal-content">
                    <div className='modal-content-head'>
                        <h2 id='titleModal'>{modalTitle}</h2> {/* Cambia el título según sea necesario */}
                        <button type='button' className="close-button" onClick={closeModal}>&times;</button>
                    </div>
                    <div className="container__content"> {/* Estilo comentado: --content__modal__column */}
                        <div className="container__field">
                            <p>Número de contrato</p>
                            <input
                                type="text"
                                id="TituloAgenda"
                                value={modalData.title}
                                onChange={(e) => setModalData({ ...modalData, title: e.target.value })}
                            />
                        </div>
                        <div className="container__field">
                            <p>Tema de reunión</p>
                            <select>
                                <option>1</option>
                                <option>2</option>
                            </select>
                        </div>
                        <div className="container__field">
                            <p>Descripción</p>
                            <input
                                type="text"
                                id="TituloAgenda"
                                value={modalData.title}
                                onChange={(e) => setModalData({ ...modalData, title: e.target.value })}
                            />
                        </div>
                        <div className="container__field">
                            <p>Fecha/Hora Inicio</p>
                            <input
                                type="datetime-local"
                                id="FechaInicio"
                                value={modalData.start}
                                onChange={(e) => setModalData({ ...modalData, start: e.target.value })}
                            />
                        </div>
                        <div className="container__field">
                            <p>Fecha/Hora Término</p>
                            <input
                                type="datetime-local"
                                id="FechaFin"
                                value={modalData.end}
                                onChange={(e) => setModalData({ ...modalData, end: e.target.value })}
                            />
                        </div>
                        <div className="container__field">
                            <p>Prioridad</p>
                            <select>
                                <option>1</option>
                                <option>2</option>
                            </select>
                        </div>
                        <div className="container__field __checkbox">
                            <p>Enviar por correo</p>
                            <input 
                                type="checkbox" 
                            />
                        </div>
                        <div className="container__field">
                            <p>Perfil</p>
                            <select>
                                <option>1</option>
                                <option>2</option>
                            </select>
                        </div>
                        <div className="container__btn">
                            <button className="btn --btn-azul" onClick={addEvent}>Guardar</button> {/* Guardar evento nuevo */}
                        </div>
                    </div>
                </div>
            </div>
            )}
        </>
    );
}

export default MenuNotifications;

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
            numeroDeContrato: 1,
            title: 'Cumpleaños de Juan', // Usamos 'title' en lugar de 'temaDeAgenda'
            descripcion: 'Descripcion',
            fechaHoraInicio: new Date(2024, 9, 18),
            fechaHoraTermino: new Date(2024, 9, 20),
            CvetipoPrioridad: 'Alta',
            numeroDePerfil: 2
        }
    ]);

    const [modalData, setModalData] = useState({
        numeroDeContrato: '',
        temaDeAgenda: '',
        descripcion: '',
        fechaHoraInicio: '',
        fechaHoraTermino: '',
        CvetipoPrioridad: '',
        numeroDePerfil: ''
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState("Editar Evento");

    // Agregar un nuevo evento
    const addEvent = () => {
        const newEvent = {
            numeroDeContrato: modalData.numeroDeContrato,
            title: modalData.temaDeAgenda, // Usamos temaDeAgenda como el título que se muestra en el calendario
            descripcion: modalData.descripcion,
            fechaHoraInicio: new Date(modalData.fechaHoraInicio),
            fechaHoraTermino: new Date(modalData.fechaHoraTermino),
            CvetipoPrioridad: modalData.CvetipoPrioridad,
            numeroDePerfil: modalData.numeroDePerfil
        };
        setEvents([...events, newEvent]);
        setModalData({
            numeroDeContrato: '',
            temaDeAgenda: '',
            descripcion: '',
            fechaHoraInicio: '',
            fechaHoraTermino: '',
            CvetipoPrioridad: '',
            numeroDePerfil: ''
        });
        setIsModalOpen(false);
    };

    // Abrir modal para editar evento
    const handleEventClick = (event) => {
        setModalData({
            numeroDeContrato: event.numeroDeContrato,
            temaDeAgenda: event.title, // temaDeAgenda se almacena en title
            descripcion: event.descripcion,
            fechaHoraInicio: moment(event.fechaHoraInicio).format("YYYY-MM-DDTHH:mm"),
            fechaHoraTermino: moment(event.fechaHoraTermino).format("YYYY-MM-DDTHH:mm"),
            CvetipoPrioridad: event.CvetipoPrioridad,
            numeroDePerfil: event.numeroDePerfil
        });
        setModalTitle("Editar Evento");
        setIsModalOpen(true);
    };

    // Abrir modal para nuevo evento
    const handleNewEvent = () => {
        setModalData({
            numeroDeContrato: '',
            temaDeAgenda: '',
            descripcion: '',
            fechaHoraInicio: moment(new Date()).format("YYYY-MM-DDTHH:mm"),
            fechaHoraTermino: moment(new Date()).format("YYYY-MM-DDTHH:mm"),
            CvetipoPrioridad: '',
            numeroDePerfil: ''
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
                            startAccessor="fechaHoraInicio"
                            endAccessor="fechaHoraTermino"
                            style={{ height: 350 }}
                            onSelectEvent={handleEventClick}
                            messages={messages}
                            formats={formats}
                        />
                    </div>

                    <ul className="calendar_list">
                        {events.map((event, index) => (
                            <li key={index}>
                                {new Date(event.fechaHoraInicio).toDateString()} - {new Date(event.fechaHoraTermino).toDateString()}: {event.title}
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
                            <h2 id='titleModal'>{modalTitle}</h2>
                            <button type='button' className="close-button" onClick={closeModal}>&times;</button>
                        </div>
                        <div className="container__content">
                            <div className="container__field">
                                <p>Número de contrato</p>
                                <input
                                    type="text"
                                    id="numeroDeContrato"
                                    value={modalData.numeroDeContrato}
                                    onChange={(e) => setModalData({ ...modalData, numeroDeContrato: e.target.value })}
                                />
                            </div>
                            <div className="container__field">
                                <p>Tema de reunión</p>
                                <input
                                    type="text"
                                    id="temaDeAgenda"
                                    value={modalData.temaDeAgenda}
                                    onChange={(e) => setModalData({ ...modalData, temaDeAgenda: e.target.value })}
                                />
                            </div>
                            <div className="container__field">
                                <p>Descripción</p>
                                <input
                                    type="text"
                                    id="descripcion"
                                    value={modalData.descripcion}
                                    onChange={(e) => setModalData({ ...modalData, descripcion: e.target.value })}
                                />
                            </div>
                            <div className="container__field">
                                <p>Fecha/Hora Inicio</p>
                                <input
                                    type="datetime-local"
                                    id="fechaHoraInicio"
                                    value={modalData.fechaHoraInicio}
                                    onChange={(e) => setModalData({ ...modalData, fechaHoraInicio: e.target.value })}
                                />
                            </div>
                            <div className="container__field">
                                <p>Fecha/Hora Término</p>
                                <input
                                    type="datetime-local"
                                    id="fechaHoraTermino"
                                    value={modalData.fechaHoraTermino}
                                    onChange={(e) => setModalData({ ...modalData, fechaHoraTermino: e.target.value })}
                                />
                            </div>
                            <div className="container__field">
                                <p>Prioridad</p>
                                <select
                                    id="CvetipoPrioridad"
                                    value={modalData.CvetipoPrioridad}
                                    onChange={(e) => setModalData({ ...modalData, CvetipoPrioridad: e.target.value })}
                                >
                                    <option value="Alta">Alta</option>
                                    <option value="Media">Media</option>
                                    <option value="Baja">Baja</option>
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
                                <select
                                    id="numeroDePerfil"
                                    value={modalData.numeroDePerfil}
                                    onChange={(e) => setModalData({ ...modalData, numeroDePerfil: e.target.value })}
                                >
                                    <option value="1">Perfil 1</option>
                                    <option value="2">Perfil 2</option>
                                </select>
                            </div>
                            <div className="container__btn">
                                <button className="btn --btn-azul" onClick={addEvent}>Guardar</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default MenuNotifications;

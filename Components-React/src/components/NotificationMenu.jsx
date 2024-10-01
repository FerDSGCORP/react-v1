import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import {
    IconNotificationAction,
    IconBell,
    IconcalendarMenu
} from '../components/Icons';

function MenuNotifications() {
    const [date, setDate] = useState(new Date());
    const [events, setEvents] = useState([
        { date: new Date(2024, 8, 18), title: 'Cumpleaños de Juan' },
        { date: new Date(2024, 8, 20), title: 'Reunión de trabajo' },
        { date: new Date(2024, 8, 25), title: 'Cita con el doctor' }
    ]);

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [eventTitle, setEventTitle] = useState(""); 
    
    const [isMenuHidden, setIsMenuHidden] = useState(false);

    const toggleMenu = () => {
        setIsMenuHidden(!isMenuHidden);
    };

    const addEvent = () => {
        const newEvent = { date: selectedDate, title: eventTitle };
        setEvents([...events, newEvent]);
        setEventTitle("");
    };

    const tileContent = ({ date, view }) => {
        if (view === 'month') {
            const eventForDate = events.find(event => event.date.toDateString() === date.toDateString());
            return eventForDate ? <p className="event-marker">{eventForDate.title}</p> : null;
        }
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
                    <Calendar
                        onChange={setDate}
                        value={date}
                    />
                    {/* <ul className="calendar_list">
                        {events.map((event, index) => (
                            <li key={index}>
                                {event.title}
                            </li>
                        ))}
                    </ul> */}
                    <div className="container__notifications">
                        <div className="banner">
                            <span>NOTIFICACIONES</span>
                        </div>
                        <div className="list_notifications">
                            <ul>
                                {/* <li className="notification">
                                    <IconBell />
                                    <span>Envío de carta de instrucción el 08/08/2024</span>
                                </li> */}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contenedor del menú pequeño */}
            <div className={`container__menuSmall ${isMenuHidden ? '' : 'hide'}`} onClick={toggleMenu}>
                <div className="bell">
                    <IconBell />
                </div>
                <div className="line"></div>
                <div className="calendar">
                    <IconcalendarMenu />
                </div>
            </div>
        </>
    );
}

export default MenuNotifications;

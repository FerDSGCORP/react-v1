import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter'; // Importa Link y useLocation de wouter
import clienteLogo from '../assets/img/Logotipo.png';
import {
    IconHome,
    IconAsideAction,
    IconArrowDown,
    IconBenes,
    IconCerrarSesion,
    IconSitPat,
    IconGestionCuentas,
    IconFideicomiso,
    IconInstrucciones,
    IconPerfilUsuario,
    IconPersonas
} from './Icons.jsx';

const AsideMenu = () => {
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [isCollapsed, setIsCollapsed] = useState(false); // Estado para manejar el colapso del aside
    const [location, setLocation] = useLocation(); // Obtener la ruta actual y función para cambiarla
    const userData = JSON.parse(localStorage.getItem('userData'));
    const userName = userData?.nombreDeUsuario;

    const handleDropdownClick = (index) => {
        setActiveDropdown(activeDropdown === index ? null : index);
    };

    const handleAsideToggle = () => {
        setIsCollapsed(!isCollapsed); // Alterna entre colapsado y expandido
    };

    const handleLogout = () => {
        localStorage.clear(); // Limpiar localStorage
        sessionStorage.clear(); // Limpiar sessionStorage
        setLocation('/'); // Redirigir a la página de inicio
    };

    // Detecta cambios en el tamaño de la pantalla y también el cambio de ruta
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 1200 || location === '/' || location === '/Home/' || location === '/home/') {
                setIsCollapsed(true); // Colapsa el aside si la ruta es '/' o '/home'

            } else {
                setIsCollapsed(false);
            }
        };

        // Ejecutar la función en el primer render
        handleResize();

        // Agregar el event listener para cambios de tamaño
        window.addEventListener('resize', handleResize);

        // Limpiar el event listener al desmontar el componente
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [location]); // El efecto debe depender también de la ruta actual

    // Condicional para agregar o remover la clase 'hide'
    const asideListClassName = location === '/' || location === '/Home/' || location === '/home/' ? 'aside_list hide' : 'aside_list';

    // Condicional para mostrar u ocultar IconAsideAction
    const showIconAsideAction = location !== '/' && location !== '/home/' || location !== '/Home/';

    return (
        <aside className={isCollapsed ? 'collapse' : ''}>
            {showIconAsideAction && (
                <div className="actionAside" onClick={handleAsideToggle}>
                    <i><IconAsideAction /></i>
                </div>
            )}
            <div className="head_aside">
                <div className="head_aside_logoCliente">
                    <img src={clienteLogo} alt="Logo del cliente" />
                </div>
                <div className="head_aside_title">Portal Cliente</div>
                <div className="head_aside_userName">
                    <b>Usuario: <br /><span>{userName}</span></b>
                </div>
            </div>
            <nav className='aside_container_list'>
                <ul className={asideListClassName}>
                    <li className="aside_list_link">
                        <Link href="/Home/">
                            <i><IconHome />
                                <div className='tooltip'>
                                    <h4>Home</h4>
                                </div>
                            </i>
                            <span>Home</span>
                        </Link>
                    </li>
                </ul>
                <ul className='footerList'>
                    <li className="aside_list_link">
                        <Link href="/Home/user-perfil">
                        <i><IconPerfilUsuario />
                            <div className='tooltip'>
                                <h4>Perfil de usuario</h4>
                            </div>
                        </i>
                        <span>Perfil de usuario</span>
                        </Link>
              
                    </li>
                    <li className="aside_list_link" id='cerrarSesion' onClick={handleLogout}>
                        <i><IconCerrarSesion />
                            <div className='tooltip'>
                                <h4>Cerrar sesión</h4>
                            </div>
                        </i>
                        <span>Cerrar sesión</span>
                    </li>
                </ul>
            </nav>
        </aside>
    );
};

export default AsideMenu;

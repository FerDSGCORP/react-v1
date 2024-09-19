import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom'; // Importa useLocation
import clienteLogo from '../assets/img/Logotipo.png';
import {
    IconHome,
    IconAsideAction,
    IconArrowDown,
    IconBenes,
    IconCerrarSesion,
    IconEdoCuentas,
    IconGestionCuentas,
    IconInfoFideicomiso,
    IconInstrucciones,
    IconPerfilUsuario,
    IconPersonas
} from './Icons.jsx';

const AsideMenu = () => {
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [isCollapsed, setIsCollapsed] = useState(false); // Estado para manejar el colapso del aside
    const location = useLocation(); // Obtener la ruta actual

    const handleDropdownClick = (index) => {
        setActiveDropdown(activeDropdown === index ? null : index);
    };

    const handleAsideToggle = () => {
        setIsCollapsed(!isCollapsed); // Alterna entre colapsado y expandido
    };

    // Detecta cambios en el tamaño de la pantalla y también el cambio de ruta
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 1200 || location.pathname === '/' || location.pathname === '/home') {
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
    }, [location.pathname]); // El efecto debe depender también de la ruta actual

    // Condicional para agregar o remover la clase 'hide'
    const asideListClassName = location.pathname === '/' || location.pathname === '/home' ? 'aside_list hide' : 'aside_list';

    // Condicional para mostrar u ocultar IconAsideAction
    const showIconAsideAction = location.pathname !== '/' && location.pathname !== '/home';

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
                    <b>Usuario: <br /><span>Jesús Sebastián Anaya Vera</span></b>
                </div>
            </div>
            <nav className='aside_container_list'>
                <ul className='aside_list'> {/* Clase condicional */}
                    <li className="aside_list_link">
                        <Link to="/">
                            <i><IconHome /></i>
                            <span>Home</span>
                        </Link>
                    </li>
                    <li className="aside_list_link">
                        <Link to="/fideicomiso-info">
                            <i><IconInfoFideicomiso /></i>
                            <span>Información de fideicomiso</span>
                        </Link>
                    </li>
                    <li className={`aside_list_link dropdown ${activeDropdown === 0 ? 'dropdown-Active' : ''}`}
                        onClick={() => handleDropdownClick(0)}>
                        <label className="aside_list_link_content">
                            <label className='--d-flex --align-center --gap-10'>
                                <i><IconGestionCuentas /></i>
                                <span>Gestión de Cuentas e <br />Inversiones</span>
                            </label>
                            <i><IconArrowDown /></i>
                        </label>
                        <ul className='dropdown__container__menu'>
                            <li><Link to="/cuentas-info">Información de cuentas</Link></li>
                            <li><Link to="/contrato-inversion">Contrato de inversión</Link></li>
                        </ul>
                    </li>
                    <li className={`aside_list_link dropdown ${activeDropdown === 1 ? 'dropdown-Active' : ''}`}
                        onClick={() => handleDropdownClick(1)}>
                        <label className="aside_list_link_content">
                            <label className='--d-flex --align-center --gap-10'>
                                <i><IconPersonas /></i>
                                <span>Personas</span>
                            </label>
                            <i><IconArrowDown /></i>
                        </label>
                        <ul className='dropdown__container__menu'>
                            <li><Link to="/fideicomitentes">Fideicomitentes</Link></li>
                            <li><Link to="/fideicomisarios">Fideicomisarios</Link></li>
                            <li><Link to="/terceros">Terceros</Link></li>
                        </ul>
                    </li>
                    <li className={`aside_list_link dropdown ${activeDropdown === 2 ? 'dropdown-Active' : ''}`}
                        onClick={() => handleDropdownClick(2)}>
                        <label className="aside_list_link_content">
                            <label className='--d-flex --align-center --gap-10'>
                                <i><IconInstrucciones /></i>
                                <span>Instrucciones</span>
                            </label>
                            <i><IconArrowDown /></i>
                        </label>
                        <ul className='dropdown__container__menu'>
                            <li><Link to="/instrucciones-pago">Instrucciones de pago</Link></li>
                            <li><Link to="/carta-instruccion">Carta Instrucción</Link></li>
                        </ul>
                    </li>
                    <li className="aside_list_link">
                        <Link to="/bienes-fideicomitidos">
                            <i><IconBenes /></i>
                            <span>Bienes fideicomitidos</span>
                        </Link>
                    </li>
                    <li className="aside_list_link">
                        <Link to="/edo-cuentas">
                            <i><IconEdoCuentas /></i>
                            <span>Estado de situación patrimonial</span>
                        </Link>
                    </li>
                </ul>
                <ul className='footerList'>
                    <li className="aside_list_link">
                        <Link to="/perfil-usuario">
                            <i><IconPerfilUsuario /></i>
                            <span>Perfil de usuario</span>
                        </Link>
                    </li>
                    <li className="aside_list_link">
                        <Link to="/cerrar-sesion">
                            <i><IconCerrarSesion /></i>
                            <span>Cerrar sesión</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </aside>
    );
};

export default AsideMenu;

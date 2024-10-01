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
    const [location] = useLocation(); // Obtener la ruta actual
    const userData =  JSON.parse(localStorage.getItem('userData'));
    const userName=userData.nombreDeUsuario;
    const handleDropdownClick = (index) => {
        setActiveDropdown(activeDropdown === index ? null : index);
    };

    const handleAsideToggle = () => {
        setIsCollapsed(!isCollapsed); // Alterna entre colapsado y expandido
    };
    
    // Detecta cambios en el tamaño de la pantalla y también el cambio de ruta
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 1200 || location === '/' || location === '/home') {
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
    const asideListClassName = location === '/' || location === '/home' ? 'aside_list hide' : 'aside_list';

    // Condicional para mostrar u ocultar IconAsideAction
    const showIconAsideAction = location !== '/' && location !== '/home';

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
                    <li className="aside_list_link">
                        <Link href="/fideicomiso-info">
                            <i><IconFideicomiso />
                                <div className='tooltip'>
                                    <h4>Información del fideicomiso</h4>
                                </div>
                            </i>
                            <span>Información de fideicomiso</span>
                        </Link>
                    </li>
                    <li className={`aside_list_link dropdown ${activeDropdown === 0 ? 'dropdown-Active' : ''}`}
                        onClick={() => handleDropdownClick(0)}>
                        <label className="aside_list_link_content">
                            <label className='--d-flex --align-center --gap-10'>
                                <i><IconGestionCuentas />
                                    <div className='tooltip'>
                                        <h4>Gestión de cuentas e inversiones</h4>
                                    </div>
                                </i>
                                <span>Gestión de Cuentas e <br />Inversiones</span>
                            </label>
                            <i><IconArrowDown /></i>
                        </label>
                        <ul className='dropdown__container__menu'>
                            <li><Link href="/cuentas-info">Información de cuentas</Link></li>
                            <li><Link href="/contrato-inversion">Contrato de inversión</Link></li>
                        </ul>
                    </li>
                    <li className={`aside_list_link dropdown ${activeDropdown === 1 ? 'dropdown-Active' : ''}`}
                        onClick={() => handleDropdownClick(1)}>
                        <label className="aside_list_link_content">
                            <label className='--d-flex --align-center --gap-10'>
                                <i><IconPersonas />
                                    <div className='tooltip'>
                                        <h4>Personas</h4>
                                    </div>
                                </i>
                                <span>Personas</span>
                            </label>
                            <i><IconArrowDown /></i>
                        </label>
                        <ul className='dropdown__container__menu'>
                            <li><Link href="/fideicomitentes">Fideicomitentes</Link></li>
                            <li><Link href="/fideicomisarios">Fideicomisarios</Link></li>
                            <li><Link href="/terceros">Terceros</Link></li>
                        </ul>
                    </li>
                    <li className={`aside_list_link dropdown ${activeDropdown === 2 ? 'dropdown-Active' : ''}`}
                        onClick={() => handleDropdownClick(2)}>
                        <label className="aside_list_link_content">
                            <label className='--d-flex --align-center --gap-10'>
                                <i><IconInstrucciones />
                                    <div className='tooltip'>
                                        <h4>Instrucciones</h4>
                                    </div>
                                </i>
                                <span>Instrucciones</span>
                            </label>
                            <i><IconArrowDown /></i>
                        </label>
                        <ul className='dropdown__container__menu'>
                            <li><Link href="/instrucciones-pago">Instrucciones de pago</Link></li>
                            <li><Link href="/carta-instruccion">Carta Instrucción</Link></li>
                        </ul>
                    </li>
                    <li className="aside_list_link">
                        <Link href="/bienes-fideicomitidos">
                            <i><IconBenes />
                                <div className='tooltip'>
                                    <h4>Bienes fideicomitidos</h4>
                                </div>
                            </i>
                            <span>Bienes fideicomitidos</span>
                        </Link>
                    </li>
                    <li className="aside_list_link">
                        <Link href="/edo-cuentas">
                            <i><IconSitPat />
                                <div className='tooltip'>
                                    <h4>Estado de situación patrimonial</h4>
                                </div>
                            </i>
                            <span>Estado de situación patrimonial</span>
                        </Link>
                    </li>
                </ul>
                <ul className='footerList'>
                    <li className="aside_list_link">
                        <Link href="/perfil-usuario">
                            <i><IconPerfilUsuario />
                                <div className='tooltip'>
                                    <h4>Perfil de usuario</h4>
                                </div>
                            </i>
                            <span>Perfil de usuario</span>
                        </Link>
                    </li>
                    <li className="aside_list_link">
                        <Link href="/cerrar-sesion">
                            <i><IconCerrarSesion />
                                <div className='tooltip'>
                                    <h4>Cerrar sesión</h4>
                                </div>
                            </i>
                            <span>Cerrar sesión</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </aside>
    );
};

export default AsideMenu;

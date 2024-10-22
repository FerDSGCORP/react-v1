import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import clienteLogo from '../assets/img/Logotipo.png';
import useMenuService from '../services/useFetchMenu.jsx';
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
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [location, setLocation] = useLocation();
    const { data: menuData, loading, error } = useMenuService();
    const userData = JSON.parse(localStorage.getItem('userData'));
    const userName = userData?.nombreDeUsuario;

    const idFidSelect = localStorage.getItem('idFidSelect');

    const handleDropdownClick = (index) => {
        setActiveDropdown(activeDropdown === index ? null : index);
    };

    const handleAsideToggle = () => {
        setIsCollapsed(!isCollapsed);
    };

    const handleLogout = () => {
        localStorage.clear();
        sessionStorage.clear();
        setLocation('/');
    };

    const handleMenuItemClick = () => {
        setActiveDropdown(null);
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 1200 || location === '/' || location === '/Home/' || location === '/home/') {
                setIsCollapsed(true);
            } else {
                setIsCollapsed(false);
            }
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [location]);

    const asideListClassName = location === '/' || location === '/Home/' || location === '/home/' ? 'aside_list hide' : 'aside_list';

    const showIconAsideAction = location !== '/' && location !== '/home/' || location !== '/Home/';

    if (loading) {
        return <div>Cargando menú...</div>;
    }

    if (error) {
        return <div>Error al cargar el menú: {error}</div>;
    }

    const cleanPath = (path) => {
        const lowerPath = path.toLowerCase();
        
        if (lowerPath === '/home/' || lowerPath === '/home/user-perfil/') {
            return path;
        }
    
        return idFidSelect ? `${path}/${idFidSelect}` : path;
    };

    const renderMenu = () => {
        return menuData.map((item, index) => (
            <li
                key={index}
                className={`aside_list_link ${item.subItems ? 'dropdown' : ''} ${activeDropdown === index ? 'dropdown-Active' : ''}`}
            >
                {item.subItems ? (
                    <div onClick={() => handleDropdownClick(index)}>
                        <i>
                            {React.createElement(eval(item.icon))}
                            <div className='tooltip'>
                                <h4>{item.toolTip}</h4>
                            </div>
                        </i>
                        <span>{item.name}</span>
                        <i><IconArrowDown /></i>
                    </div>
                ) : (
                    <Link href={cleanPath(item.link)}>
                        <div>
                            <i>
                                {React.createElement(eval(item.icon))}
                                <div className='tooltip'>
                                    <h4>{item.toolTip}</h4>
                                </div>
                            </i>
                            <span>{item.name}</span>
                        </div>
                    </Link>
                )}

                {item.subItems && activeDropdown === index && (
                    <ul className='dropdown__container__menu'>
                        {item.subItems.map((subItem, subIndex) => (
                            <li key={subIndex} onClick={handleMenuItemClick}>
                                <Link href={cleanPath(subItem.link)}>
                                    {subItem.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </li>
        ));
    };

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
                    {renderMenu()}
                </ul>
                <ul className='footerList'>
                    <li className="aside_list_link">
                        <Link href={cleanPath(`/Home/user-perfil/`)}>
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

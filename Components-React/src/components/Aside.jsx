import React, { useState, useEffect } from 'react';
import clienteLogo from '../assets/img/Logotipo.png'
import {
    IconHome,
    IconAsideAction,
    IconArrowDown,
    IconBenes,
    Iconcalendar,
    IconCerrarSesion,
    IconEdoCuentas,
    IconGestionCuentas,
    IconInfoFideicomiso,
    IconInstrucciones,
    IconPerfilUsuario,
    IconPersonas
} from './Icons.jsx'

const AsideMenu = () => {
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [isCollapsed, setIsCollapsed] = useState(false); // Estado para manejar el colapso del aside

    const handleDropdownClick = (index) => {
        setActiveDropdown(activeDropdown === index ? null : index);
    };

    const handleAsideToggle = () => {
        setIsCollapsed(!isCollapsed); // Alterna entre colapsado y expandido
    };

    // Detecta cambios en el tamaño de la pantalla
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 1200) {
                setIsCollapsed(true);
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
    }, []);

    return (
        <aside className={isCollapsed ? 'collapse' : ''}>
            <div className="actionAside" onClick={handleAsideToggle}>
                <i><IconAsideAction /></i>
            </div>
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
                <ul className="aside_list">
                    <li className="aside_list_link">
                        <i><IconHome /></i>
                        <span>Home</span>
                    </li>
                    <li className="aside_list_link">
                        <i><IconInfoFideicomiso /></i>
                        <span>Información de fideicomiso</span>
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
                            <li>Información de cuentas</li>
                            <li>Contrato de inversión</li>
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
                            <li>Fideicomitentes</li>
                            <li>Fideicomisarios</li>
                            <li>Terceros</li>
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
                            <li>Instrucciones de pago</li>
                            <li>Carta Instrucción</li>
                        </ul>
                    </li>
                    <li className="aside_list_link">
                        <i><IconBenes /></i>
                        <span>Bienes fideicomitidos</span>
                    </li>
                    <li className="aside_list_link">
                        <i><IconEdoCuentas /></i>
                        <span>Estado de situación patrimonial</span>
                    </li>
                </ul>
                <ul className='footerList'>
                    <li className="aside_list_link">
                        <i><IconPerfilUsuario /></i>
                        <span>Perfil de usuario</span>
                    </li>
                    <li className="aside_list_link">
                        <i><IconCerrarSesion /></i>
                        <span>Cerrar sesión</span>
                    </li>
                </ul>
            </nav>
        </aside>
    );
};

export default AsideMenu;

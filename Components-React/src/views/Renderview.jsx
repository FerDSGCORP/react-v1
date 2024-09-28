import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AsideMenu from '../components/Aside'
import ContentBodyRender from '../components/ContentBodyRender'
import MenuNotifications from '../components/NotificationMenu'
import Footer from '../components/Footer'
import ReportarProblema from '../components/reportarProblema';
import '../assets/styles/style.css'


function RenderView() {
    return (
        <Router>
        <main className='container__render'>
            <div className="header">
                <div className='header-img'></div>
                </div>
            <div className="container__aside">
                <AsideMenu />
            </div>
            <div className="container__bodyRender">
                <ContentBodyRender />
            </div>
            <div className="container__notifications">
                <MenuNotifications />
            </div>
        </main>
        <ReportarProblema/>
        <Footer />
    </Router>
    );
}

export default RenderView
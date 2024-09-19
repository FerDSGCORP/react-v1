import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AsideMenu from '../components/Aside'
import ContentBodyRender from '../components/ContentBodyRender'
import MenuNotifications from '../components/NotificationMenu'
import Footer from '../components/Footer'


function RenderView() {
    return (
        <Router>
        <main className='container__render'>
            <div className="header"><div className='header-img'></div></div>
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
        <Footer />
    </Router>
    );
}

export default RenderView
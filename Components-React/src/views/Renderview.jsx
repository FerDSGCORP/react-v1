import React from 'react';
import AsideMenu from '../components/Aside'
import ContentBodyRender from '../components/ContentBodyRender'
import MenuNotifications from '../components/NotificationMenu'


function RenderView() {
    return (
    <main className='container__render'>
        <div className="container__aside">
        <AsideMenu/>
        </div>
        <div className="container__bodyRender">
        <ContentBodyRender/>
        </div>
        <div className="container__notifications">
        <MenuNotifications/>
        </div>
    </main>
    );
}

export default RenderView
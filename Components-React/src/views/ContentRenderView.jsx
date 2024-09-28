
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Button from '../components/Buttons'
import Home from './Home'
import MainComponent from './TableView'
import DetalleFideicomiso from './DetalleFideicomiso'


function ContentRenderView() {
    return (
        <div className='bodyView'>
             <Routes>
                <Route path="/" element={< MainComponent/>} />
                <Route path="/fideicomiso-info/:idFid" element={<DetalleFideicomiso />} />
            </Routes>
        </div>
    );
}

export default ContentRenderView

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainComponent from './TableView'
import DetalleFideicomiso from './DetalleFideicomiso'
import MisFIdeicomisosCrd from '../components/MisFideicomisos'


function ContentRenderView() {
    return (
        <div className='bodyView'>
             <Routes>
                <Route path="/" element={< MainComponent/>} />
                <Route path="/home-fid" element={< MisFIdeicomisosCrd/>} />
                <Route path="/fideicomiso-info/:idFid" element={<DetalleFideicomiso />} />
            </Routes>
        </div>
    );
}

export default ContentRenderView
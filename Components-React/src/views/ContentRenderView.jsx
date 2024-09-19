
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Button from '../components/Buttons'
import Home from './Home'
import DetalleFideicomiso from './DetalleFideicomiso'


function ContentRenderView() {
    return (
        <div>
             <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/fideicomiso-info" element={<DetalleFideicomiso />} />
            </Routes>
        </div>
    );
}

export default ContentRenderView
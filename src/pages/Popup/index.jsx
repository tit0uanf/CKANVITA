import React from 'react';
import { createRoot } from 'react-dom/client';
import '../../fonts/Mona Sans/Mona-Sans.woff2';
import Popup from './Popup';
import './index.css';
const container = document.getElementById('app-container');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<Popup />);

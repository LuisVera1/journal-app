import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';
import { JournalApp } from './JournalApp.jsx';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
	<BrowserRouter>
		<React.StrictMode>
			<JournalApp />
		</React.StrictMode>
	</BrowserRouter>
);

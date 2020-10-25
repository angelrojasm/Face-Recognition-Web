import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
	const [message, setMessage] = useState(null);

	async function getHelloMessage() {
		let message = await fetch('/hello');
		let result = await message.text();
		setMessage(result);
	}

	useEffect(() => {
		getHelloMessage();
	}, []);

	return <>{message === null ? 'Loading...' : message}</>;
}

export default App;

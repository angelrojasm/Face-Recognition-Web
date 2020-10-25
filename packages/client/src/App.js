import React, { useState, useEffect } from 'react';
import AddFaceForm from './components/AddFaceForm';
import FindFaceForm from './components/FindFaceForm'
import './App.css';

function App() {
    const [message, setMessage] = useState(null);

    async function getHelloMessage() {
        let message = await fetch('/hello');
        let result = await message.text();
        setMessage(result);
    }

    useEffect(() => {
        // getHelloMessage();
    }, []);

    return (
        <>
            <AddFaceForm />
			<hr/>
			<FindFaceForm/>
        </>
    );
}

export default App;

import React, { useState } from 'react';
import useForm from '../hooks/useForm';

const FindFaceForm = () => {
    const initialState = { face: null };
    const [form, setForm] = useForm(initialState);
    const [faceData, setFaceData] = useState(null);

    async function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('face', form.face);

        const res = await fetch('/find-face', {
            method: 'POST',
            body: formData,
        });

        if (res.status === 200) {
            const data = await res.json();
            setFaceData({ ...data });
        } else {
            console.log('sad');
            alert('No faces found, sorry 😞');
        }
    }

    return (
        <div>
            <h2>Find A Person</h2>
            <form onSubmit={handleSubmit}>
                <label>Face</label>
                <input
                    onChange={setForm}
                    type="file"
                    name="face"
                    placeholder="Face"
                    style={{ display: 'block' }}
                />
                <button type="submit">Submit</button>
            </form>
            <div
                style={{
                    height: '300px',
                    width: '300px',
                    border: '1px solid white',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                {faceData === null ? (
                    <p>result</p>
                ) : (
                    <div className="result-container">
                        <img src={`data:image/png;base64,${faceData.file}`} />
                        <p>It's {faceData.name.replace(/_/g, ' ')}!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FindFaceForm;

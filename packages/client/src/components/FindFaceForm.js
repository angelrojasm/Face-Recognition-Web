import React, {useState} from 'react';
import useForm from '../hooks/useForm';

const FindFaceForm = () => {
    const initialState = { name: '', face: null };
    const [form, setForm] = useForm(initialState);
    const [face, setFace] = useState(null)

    async function handleSubmit(e) {
        e.preventDefault();
        const res = await fetch('/find-face', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(form)
        })

        //TODO: setFace to the response containing the image
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
                {face === null ? <p>result</p> : <p>There should be an image here!</p>}
            </div>
        </div>
    );
};

export default FindFaceForm;

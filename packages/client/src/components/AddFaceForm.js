import React from 'react';
import useForm from '../hooks/useForm';

const AddFaceForm = () => {
    const initialState = { name: '', face: null };
    const [form, setForm] = useForm(initialState);

    async function handleSubmit(e) {
        e.preventDefault();
        const res = await fetch('/find-face', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(form)
        })

        alert("Submitted")
    }

    return (
        <div>
            <h2>Upload a person</h2>
            <form onSubmit={handleSubmit}>
                <label>Face</label>
                <input
                    onChange={setForm}
                    type="file"
                    name="face"
                    placeholder="Face"
                    style={{ display: 'block' }}
                />
                <label>Name</label>
                <input
                    onChange={setForm}
                    type="text"
                    name="name"
                    placeholder="Name"
                    style={{ display: 'block' }}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default AddFaceForm;

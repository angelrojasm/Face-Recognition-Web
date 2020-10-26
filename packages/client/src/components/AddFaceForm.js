import React from 'react';
import useForm from '../hooks/useForm';

const AddFaceForm = () => {
    const initialState = { name: '', face: null };
    const [form, setForm] = useForm(initialState);

    async function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('face', form.face);
        formData.append('name', form.name.replace(/ /g, '_'));

        const res = await fetch('/add-face', {
            method: 'POST',
            body: formData,
        });

        alert('Submitted');
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

import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'

import api from '../../services/api';
import './styles.css'
import logoImg from '../../assets/logo.svg';

export default function Register() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    const ongId = localStorage.getItem('ongId');
    const history = useHistory();

    async function handleNewIncident(evt) {
        evt.preventDefault();

        const data = {
            title,
            description,
            value
        };

        try {
            await api.post('incidents', data, {
                headers: {
                    Authorization: ongId
                }
            });

            history.push('/profile');
        } catch(err) {
            alert(`An error ocurred: ${err}`)
        }
    }

    return (
        <div className="new-incident">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be the Hero"/>
                    <h1>Register a new case</h1>
                    <p>
                        Describe what your need is, so we can find a hero to help you out.
                    </p>

                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size="16" color="#e02041" />
                        Back to your cases
                    </Link>
                </section>

                <form onSubmit={handleNewIncident}>
                    <input  
                        type="text" 
                        placeholder="Case title"
                        value={title}
                        onChange={ evt => setTitle(evt.target.value) }    
                    />
                    <textarea 
                        placeholde="Case description" 
                        value={description}
                        onChange={ evt => setDescription(evt.target.value) }
                    />
                    <input 
                        type="text" 
                        placeholder="Value"
                        value={value}
                        onChange={ evt => setValue(evt.target.value) }    
                    />

                    <button className="button" type="submit">Register</button>
                </form>
            </div>
        </div>
    )
}
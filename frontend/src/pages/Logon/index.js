import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api';
import './styles.css';
import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';

export default function Logon() {
    const [id, setId] = useState();
    const history = useHistory();

    async function handleLogin(evt) {
        evt.preventDefault();

        try {
            const response = await api.post('sessions', { id });
            
            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name);

            history.push('/profile');
        } catch(err) {
            alert(`An error ocurred: ${err}`)
        }
    }

    return(
        <div className="logon-container">
            
            <section className="form">
                <img src={logoImg} alt="Be the hero"/>

                <form onSubmit={handleLogin}>
                    <h1>Logon to Be the Hero</h1>

                    <input 
                        type="text" 
                        placeholder="Enter your NGO ID"
                        value={id}
                        onChange = {evt => setId(evt.target.value)} 
                    />
                    <button className="button" type="submit">Logon</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size="16" color="#e02041" />
                        I do not have an account
                    </Link>
                </form>

            </section>

            <img src={heroesImg} alt="Be a hero for your community"/>
        </div>
    );
}
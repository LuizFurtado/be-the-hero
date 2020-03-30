import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'

import api from '../../services/api';
import './styles.css'
import logoImg from '../../assets/logo.svg';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');

    const history = useHistory();

    async function handleRegister(evt) {
        evt.preventDefault();

        const data = {
            name,
            email,
            whatsapp,
            city,
            uf
        };

        try {
            const response = await api.post('ongs', data);

            alert(`Your access ID is ${response.data.id}. Keep it safe!`);

            history.push('/');
            
        } catch(err) {
            alert(`An error ocurred: ${err}`);
        }
        
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be the Hero"/>
                    <h1>Register</h1>
                    <p>
                        Register to our platform and help people to find out how to help your NGO.
                    </p>

                    <Link className="back-link" to="/">
                        <FiArrowLeft size="16" color="#e02041" />
                        Back to Logon
                    </Link>
                </section>

                <form onSubmit={handleRegister}>
                    <input 
                        type="text" 
                        placeholder="Your NGO name"
                        value={name}
                        onChange={evt => setName(evt.target.value)}
                    />
                    <input 
                        type="email"
                        placeholder="email@ngo.com"
                        value={email}
                        onChange={evt => setEmail(evt.target.value)}    
                    />
                    <input 
                        type="text" 
                        placeholder="Whatsapp contact"
                        value={whatsapp}
                        onChange={evt => setWhatsapp(evt.target.value)}
                    />

                    <div className="input-group">
                        <input 
                            type="text" 
                            placeholder="City"
                            value={city}
                            onChange={evt => setCity(evt.target.value)}    
                        />
                        <input 
                            type="text" 
                            placeholder="UF"
                            value={uf}
                            onChange={evt => setUf(evt.target.value)} 
                            style={{ width: 80 }} 
                        />
                    </div>
                    <button className="button" type="submit">Register</button>
                </form>
            </div>
        </div>
    )
}
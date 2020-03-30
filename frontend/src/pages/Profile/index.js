import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import './styles.css';
import logoImg from '../../assets/logo.svg';
import api from '../../services/api';

export default function Profille() {
    const [incidents, setIncidents] = useState([]);
    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');
    const history = useHistory();

    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ongId
            }
        }).then(res => {
            setIncidents(res.data);
        });
    }, [ongId]);

    async function handleDeleteIncident(id) {
        try {
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId
                }
            });

            setIncidents(incidents.filter(incident => incident.id !== id));
        } catch(err) {
            alert(`An error ocurred: ${err}`);
        }
    }

    function handleLogout() {
        localStorage.clear();
        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be the Hero"/>
                <span>Welcome, {ongName}</span>

                <Link className="button" to="/incidents/new" >Register new case</Link>
                <button onClick={handleLogout}>
                    <FiPower size="18" color="#e02041" />
                </button>
            </header>

            <h1>Your registered cases</h1>

            <ul>
                {incidents.map(incident => (
                <li key={incident.id}>
                    <strong>CASE:</strong>
                    <p>{incident.title}</p>
                    <strong>DESCRIPTION:</strong>
                    <p>{incident.description}</p>
                    <strong>VALUE:</strong>
                    <p>{Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(incident.value)}</p>

                    <button onClick={() => handleDeleteIncident(incident.id)} type="button">
                        <FiTrash2 size={20} color="#a8a8b3" />
                    </button>
                </li>
                ))}
            </ul>
        </div>
    )
}
import React, { useState, useEffect } from 'react';
import '../../src/App.css';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, orderBy, query } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAs1Doh3H0AVh0xHUe3llAw8MlJgTcFr_o",
    authDomain: "second-cf038.firebaseapp.com",
    projectId: "second-cf038",
    storageBucket: "second-cf038.appspot.com",
    messagingSenderId: "418355371537",
    appId: "1:418355371537:web:f77f0905f7bb26998a5bb0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function Customer() {
    const [details, setDetails] = useState([]);
    const [dataLoading, setDataLoading] = useState(true);
    const navigate = useNavigate();

    const fetchDetails = async () => {
        setDataLoading(true);
        const q = query(collection(db, 'website'), orderBy('timestamp', 'desc'));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setDetails(data);
        setDataLoading(false);
    };

    useEffect(() => {
        fetchDetails();
    }, []);

    const selectCard = (data) => {
        navigate(`/details`, { state: { data } });
    };

    const phoneNumber = '+923351288999';
    const message = '';
    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    let admin = localStorage.getItem('isAdmin')
    function login() {
        if (admin) {
            localStorage.removeItem('isAdmin')
            location.reload()
        }
        else {
            navigate(`/login`)
        }
    }
    return (
        <div className="App">
            <nav>
                <h1>Lovely Steps</h1>
                {admin && <button onClick={() => { navigate(`/home`) }}>Home</button>}
                <button onClick={login}>{admin ? 'Logout' : 'Login'}</button>


            </nav>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                <button id='whatsappContact'>
                    <FontAwesomeIcon icon={faWhatsapp} />
                </button>
            </a>
            <div className="cards">
                {dataLoading ? (
                    <div className='loader'></div>
                ) : (
                    details.map((item) => (
                        <div onClick={() => selectCard(item)} key={item.id} className="card">
                            <img src={item.imageUrl} alt="Uploaded" />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Customer;

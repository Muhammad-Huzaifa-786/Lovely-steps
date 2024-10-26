import React from 'react';
import { useLocation } from 'react-router-dom';
import '../../src/App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShare } from '@fortawesome/free-solid-svg-icons';


function Details() {
    let locate = useLocation();
    let state = locate.state.data;

    const phoneNumber = '923156565918'; // Replace with the actual number in international format
    const message = `Check out this image: ${state.imageUrl}`; // Message including the image URL

    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    return (
        <div className='flex'>
            {state && (
                <div id='detailimg' key={state.id}>
                    <img src={state.imageUrl} alt="Uploaded" />
                </div>
            )} <br />
            Share image url on WhatsApp  <span> </span>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faShare} />
            </a>

        </div>
    );
}

export default Details;

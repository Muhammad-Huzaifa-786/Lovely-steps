import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../src/App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShare, faLink } from '@fortawesome/free-solid-svg-icons';

function Details() {
    const locate = useLocation();
    const state = locate.state?.data; // Optional chaining to avoid errors
let navigate = useNavigate()
    const phoneNumber = '923351288999';
    const imageUrl = state?.imageUrl; // Optional chaining
    const message = `Check out this image: ${imageUrl}`; // Message to send

    const handleShareImage = async () => {
        if (imageUrl) {
            try {
                // Fetch the image as a Blob
                const response = await fetch(imageUrl);
                const blob = await response.blob();

                // Create a file object
                const file = new File([blob], 'shared-image.png', { type: blob.type });

                // Check if the Web Share API is supported
                if (navigator.share) {
                    await navigator.share({
                        title: 'Image Share',
                        text: message,
                        files: [file],
                    });
                } else {
                    alert('Web Share API not supported on this browser.');
                }
            } catch (error) {
                console.error('Error sharing image:', error);
            }
        }
    };

    const handleSendUrlToWhatsApp = () => {
        if (imageUrl) {
            const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
            window.open(whatsappLink, '_blank');
        }
    };

    return (
        <div className='flex'>

            <nav>
                <h1>Lovely Steps</h1>
                {<button onClick={() => { navigate(`/customer`) }}>Home</button>}
            </nav>

            {state && (
                <div id='detailimg' key={state.id}>
                    <img src={imageUrl} alt="Uploaded visual content" />
                </div>
            )}
            <br />
            <button style={{ width: '80px' }} onClick={handleShareImage}>
                Share Image <FontAwesomeIcon icon={faShare} />
            </button>
            <button style={{ width: '80px', marginLeft: '10px' }} onClick={handleSendUrlToWhatsApp}>
                Send URL <FontAwesomeIcon icon={faLink} />
            </button>
        </div>
    );
}

export default Details;

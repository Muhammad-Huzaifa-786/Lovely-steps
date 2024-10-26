import React, { useState, useEffect, useRef } from 'react';
import '../../src/App.css';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, orderBy, query , doc, deleteDoc  } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';



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

function Home() {
  const [imageUrl, setImageUrl] = useState('');
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const fileRef = useRef(null);
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

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setLoading(true);
    const cloudName = "dgfckzk91"; // Replace with your Cloudinary cloud name
    const uploadPreset = "huzaifa"; // Replace with your Cloudinary upload preset

    const formData = new FormData();
    formData.append('file', file);
    formData.append("upload_preset", uploadPreset);

    try {
      const res = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formData);
      setImageUrl(res.data.secure_url);
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setLoading(false);
    }
  };

  const selectCard = (data) => {
    navigate(`/details`, { state: { data } });
  };

  const handleSave = async () => {
    if (!imageUrl) return;

    setLoading(true);
    try {
      await addDoc(collection(db, 'website'), {
        imageUrl,
        timestamp: new Date(),
      });
      setImageUrl('');
      setModalOpen(false);
      await fetchDetails();
    } catch (error) {
      console.error("Error adding document:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChooseClick = () => {
    fileRef.current.click();
  };
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    });
  
    if (result.isConfirmed) {
      try {
        const docRef = doc(db, 'website', id); // Create a reference to the document
        await deleteDoc(docRef); // Delete the document
        await fetchDetails(); // Refresh the data after deletion
  
        Swal.fire(
          'Deleted!',
          'Your Photo has been deleted.',
          'success'
        );
      } catch (error) {
        console.error("Error deleting document:", error);
        Swal.fire(
          'Error!',
          'There was a problem deleting your file.',
          'error'
        );
      }
    }
  };

  const phoneNumber = '+923156565918';
  const message = '';
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  let admin = localStorage.getItem('isAdmin')

  return (
    <div className="App">
      <nav>
        <h1>Lovely Steps</h1>
        {admin && <button style={{ width: '40px' }} onClick={() => { navigate(`/customer`) }}><FontAwesomeIcon icon={faPaperPlane} /></button>}
        <button onClick={() => setModalOpen(true)}>Add Image</button>
        {loading && <div>Loading...</div>}
      </nav>
      <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
        <button id='whatsappContact'>
          <FontAwesomeIcon icon={faWhatsapp} />
        </button>
      </a>
      {modalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setModalOpen(false)}>&times;</span>
            {imageUrl ? (
              <button onClick={handleSave} disabled={loading}>Add</button>
            ) : (
              <>
                <input
                  style={{ display: 'none' }}
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
                <button onClick={handleChooseClick}>Choose Image</button>
              </>
            )}
          </div>
        </div>
      )}
      <div className="cards">
        {dataLoading ? (
          <div className='loader'></div>
        ) : (
          details.map((item) => (
            <div onClick={() => selectCard(item)} key={item.id} className="card">
              <img src={item.imageUrl} alt="Uploaded" /><br />
              <button onClick={(e) => { e.stopPropagation(); handleDelete(item.id); }}>
                Delete
              </button>
            </div>
          ))
        )}
      </div>

    </div>
  );
}

export default Home;

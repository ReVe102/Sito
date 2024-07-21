import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Share from './share/Share';
import PostLogin from './PostLogin';
import Notifications from './Notifications'; 
import './Profilo.css';
import QRCode from 'qrcode.react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import axios from 'axios';
import io from 'socket.io-client';

const socket = io('https://sito-be.onrender.com');

const Profilo = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paragrafo, setParagrafo] = useState('panoramica');
  const [notifications, setNotifications] = useState([]);
  const [newNotificationsCount, setNewNotificationsCount] = useState(0);

  const handleDelete = async (postId, postType) => {
    try {
      const token = window.localStorage.getItem('token');
      if (!token) {
        throw new Error('Token non trovato');
      }
      const response = await axios.delete(`https://sito-be.onrender.com/posts/${postType}/${postId}`, {
        headers: {
          Authorization: token
        }  
      });
      if (response.status === 200) {
        //se l'id del post è diverso, il post è mantenuto nell'array altrimenti è rimosso
        setUserPosts(userPosts.filter(post => post._id !== postId)); 
      }
    } catch (error) {
      console.error('Errore durante eliminazione del post', error);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = window.localStorage.getItem('token');
        if (!token) {
          throw new Error('Token non trovato');
        }

        const userDataResponse = await axios.post('https://sito-be.onrender.com/userData', { token });  
        if (userDataResponse.data.status === 'error' && userDataResponse.data.data === 'token expired') {
          alert('Token scaduto. Effettua il login.');
          window.localStorage.clear();
          navigate('/Login');
        } else {
          setUserData(userDataResponse.data.data);
          window.localStorage.setItem('userData', JSON.stringify(userDataResponse.data.data));

          const postsResponse = await axios.get('https://sito-be.onrender.com/posts/profilo', {
            headers: {
              Authorization: token
            }
          });

          //a e b elementi dell'array che devono essere confrontati. calcola la differenza tra le due date. differenza positiva => b è più recente di a
          // differenza negativa => a più recente di b. il confronto è fatto implicitamente da sort
          const sortedPosts = postsResponse.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setUserPosts(sortedPosts);  
        }
        setLoading(false); 
      } catch (error) {
        console.error('Errore nel recuperare i dati dell\'utente', error);
        setLoading(false);
      }
    };

    const fetchNotifications = async () => {
      try {
        const response = await axios.get('https://sito-be.onrender.com/notifications');
        setNotifications(response.data);
      } catch (error) {
        console.error('Errore nel recuperare le notifiche', error);
      }
    };

    fetchUserData();
    fetchNotifications();

    socket.on('notification', (data) => {
      setNotifications((prevNotifications) => [...prevNotifications, data]);
      setNewNotificationsCount((prevCount) => prevCount + 1); // Incrementa il contatore
    });

    return () => {
      socket.off('notification'); // Rimuove ascoltatore precedentemente registrato nell'evento notification
    };
  }, [navigate]);

  useEffect(() => {
    if (userData) {
      socket.emit('join', userData._id); 
    }
  }, [userData]);   

  const resetNewNotificationsCount = () => {
    setNewNotificationsCount(0);
  };

  const logout = () => {
    window.localStorage.clear();
    navigate('/Login');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userData) {
    return <div>Dati utente non disponibili.</div>;
  }

  return (
    <div className="container">
      <div className="buttons">
        <div className="left-buttons">
          <Link to="/feedAziende" className="navbarButton">Business Area</Link>
          <Link to="/feedPrivati" className="navbarButton">Employee Area</Link>
          {userData.status === "azienda" && (
            <Notifications newNotificationsCount={newNotificationsCount} resetNewNotificationsCount={resetNewNotificationsCount} /> 
          )}
        </div>
        <div className="right-button">
          <button className="navbarButton" onClick={logout}>Logout</button>
        </div>
      </div>
      <div className="header">
        <img src={userData.image || "/default-pfp-1.jpg"} alt="Profile" />
        <div className="nomeutente">
          <h1>{userData.name}</h1>
          <br />
        </div>
        <br />
      </div>

      <div className='info-notifiche'>
        {userData.status === "privato" && (
          <div className="footer">
            <div className="leftbar">
              <div className="titoloLeftbar">
              <h2 className="titoloInfo">Informazioni 
              <i className="bi bi-pencil-square" id="iconamodifica" onClick={() => navigate("/updateUser", { state: userData })}></i></h2>
              </div>
              <div className="formsx">
              <button className="btn btn-primary mb-2 btn-dark-text" onClick={() => setParagrafo("panoramica")}>Panoramica</button>
              <button className="btn btn-primary mb-2 btn-dark-text" onClick={() => setParagrafo("lavoro")}>Lavoro</button>
              <button className="btn btn-primary mb-2 btn-dark-text" onClick={() => setParagrafo("istruzione")}>Istruzione</button>
              <button className="btn btn-primary mb-2 btn-dark-text" onClick={() => setParagrafo("certificazioni")}>Certificazioni</button>
              <button className="btn btn-primary mb-2 btn-dark-text" onClick={() => setParagrafo("informazioni di contatto")}>Informazioni di contatto</button>
              </div>
            </div>
            <div className="vertical-line"></div>
            <div className="paragrafo">
              <h2>{paragrafo}</h2>
              <div className="testo">
                {paragrafo === "panoramica" && (
                  <ul>
                    <li><b>{userData.impiego}</b></li>
                    <li>Vive a: {userData.luogoresidenza}</li>
                    <li>Nato a: {userData.luogonascita}</li>
                    <li>Posizione lavorativa ricercata: {userData.posizionelavorativaricercata}</li>
                  </ul>
                )}
                {paragrafo === "lavoro" && (
                  <ul>
                    <li>Esperienza lavorativa più recente: {userData.ultimolavoro}</li>
                    <li>Esperienze lavorative precedenti: {userData.lavoriprecedenti}</li>
                  </ul>
                )}
                {paragrafo === "istruzione" && (
                  <ul>
                    <li>Scuola secondaria: {userData.indirizzosuperiore}</li>
                    {userData.corsodilaurea && <li>Università: {userData.corsodilaurea}</li>}
                  </ul>
                )}
                {paragrafo === "certificazioni" && (
                  <ul>
                    <li>Lingua madre: {userData.linguamadre}</li>
                    <li>Altre lingue: {userData.altrelingue}</li>
                    {userData.certificazionilinguistiche && <li>Certificazioni linguistiche: {userData.certificazionilinguistiche}</li>}
                    {userData.certificazioniinformatiche && <li>Certificazioni informatiche: {userData.certificazioniinformatiche}</li>}
                  </ul>
                )}
                {paragrafo === "informazioni di contatto" && (
                  <ul>
                    <li>Email: {userData.email}</li>
                    <li>Cellulare: {userData.cellulare}</li>
                  </ul>
                )}
              </div>
            </div>
          </div>
        )}
        {userData.status === "azienda" && (
          <div className="footer">
            <div className="leftbar">
              <div className="titoloLeftbar">
                <h2>Informazioni 
                <i className="bi bi-pencil-square" id="iconamodifica" onClick={() => navigate("/updateUser", { state: userData })}></i></h2>
              </div>
              <div className="formsx">
                <button className="btn btn-primary mb-2 bpn-dark-text" onClick={() => setParagrafo("panoramica")}>Panoramica</button>
                <button className="btn btn-primary mb-2 bpn-dark-text" onClick={() => setParagrafo("profilo aziendale")}>Profilo Aziendale</button>
                <button className="btn btn-primary mb-2 bpn-dark-text" onClick={() => setParagrafo("dettagli organizzativi")}>Dettagli organizzativi</button>
                <button className="btn btn-primary mb-2 bpn-dark-text" onClick={() => setParagrafo("contatti e sedi")}>Contatti e sedi</button>
              </div>
            </div>
            <div className="vertical-line"></div>
            <div className="paragrafo">
              <h2>{paragrafo}</h2>
              <div className="testo">
                {paragrafo === "panoramica" && (
                  <ul>
                    <li>Nome azienda: {userData.name}</li>
                    <li>Sede legale: {userData.sedelegale}</li>
                    <li>Fondata da: {userData.fondatori}</li>
                    <li>Premi: {userData.premi}</li>
                    <li>Sito web: {userData.sitoweb}</li>
                  </ul>
                )}
                {paragrafo === "profilo aziendale" && (
                  <ul>
                    <li>Descrizione: {userData.descrizione}</li>
                    <li>Target: {userData.clienteladiriferimento}</li>
                    <li>Numero dipendenti: {userData.numerodipendenti}</li>
                    <li>Fatturato annuale: {userData.fatturatoannuale}</li>
                    <li>Mercati: {userData.mercati}</li>
                  </ul>
                )}
                {paragrafo === "dettagli organizzativi" && (
                  <ul>
                    <li>Settore: {userData.settore}</li>
                    <li>Fondatori: {userData.fondatori}</li>
                    <li>CEO: {userData.ceo}</li>
                    <li>Struttura societaria: {userData.strutturasocietaria}</li>
                    <li>Certificazioni: {userData.certificazioni}</li>
                    <li>Premi: {userData.premi}</li>
                  </ul>
                )}
                {paragrafo === "contatti e sedi" && (
                  <ul>
                    <li>Sede legale: {userData.sedelegale}</li>
                    <li>Sedi operative: {userData.sedioperative}</li>
                    <li>Telefono: {userData.telefono}</li>
                    <li>Email: {userData.email}</li>
                    <li>Sito web: {userData.sitoweb}</li>
                  </ul>
                )}
              </div>
            </div>
          </div>
        )}
        
      </div>
      <div className="mainbar">
        <Share />
      </div>
      {userPosts.map((post) => (
      <div key={post._id}>
      <PostLogin post={post} handleDelete={handleDelete} postType={userData.status === 'azienda' ? 'azienda' : 'privato'}/>
      </div>
))}
    </div>
  );
};

export default Profilo;

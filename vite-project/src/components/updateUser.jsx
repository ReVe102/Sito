import { useLocation } from "react-router"
import React, { useState, useEffect } from 'react';
import "./updateUser.css";


function UpdateUser(){

    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: "",
        biografia: "",
        datanascita: "",
        impiego: "",
        ultimolavoro: "",
        lavoriprecedenti: "",
        indirizzosuperiore: "",
        corsodilaurea: "",
        posizionelavorativaricercata: "",
        luogonascita: "",
        luogoresidenza: "",
        cellulare: "",
        linguamadre:"",
        altrelingue:"",
        image: "",
        descrizione: "",
        cienteladiriferimento: "",
        numerodipendenti: "",
        fatturatoannuale: "",
        mercati: "",
        settore: "",
        fondatori: "",
        ceo: "",
        strutturasocietaria: "",
        certificazioni: "",
        premi: "",
        sedelegale: "",
        sedioperative: "",
        telefono: "",
        sitoweb: "",
        status:"",
    });

    const location=useLocation()

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setUserData(prevState => ({
                    ...prevState,
                    image: reader.result
                }));
            };
            reader.onerror = error => {
                console.error("Error: ", error);
            };
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    

    useEffect(() => {
        fetch("https://sito-be.onrender.com/userData", {
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                token: window.localStorage.getItem("token")
            }),
        }).then((res) => res.json())
            .then((data) => {
                console.log(data, "userData");
                setUserData(data.data);
                if(data.data=="token expired"){
                    alert("token scaduto. fai Log in ")
                     window.localStorage.clear();
                     window.location.href="./Login"
                }
            });
    }, []);

    const updateData=()=>{
        console.log(userData.email)
    
            fetch("https://sito-be.onrender.com/updateUser", {
                method: "POST",
                crossDomain: true,
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify(userData),
            }).then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    window.location.href="/Profilo"
                    
                });
    
        
    }


    return(

        <div className="wrapper d-flex align-items-center justify-content-center w-100">
            <div className="updateuser custom-rounded p-4 custom-background w-50">
                <h2 className='mt-4 text-center'>Modifica Profilo</h2>
                <div className="form-group w-100">
                <div className='input-container'>
                <input
                    type="text"
                    id="nome"
                    name="name"
                    className='input h-100'
                    required
                    placeholder=" "
                    defaultValue={userData.name}
                    onChange={handleChange}
                />
                <label for="nome" class="input-label">Nome completo</label>
            </div>

            <div className="input-container">
                <input
                    type="text"
                    id="email"
                    name="email"
                    className='input h-100'
                    disabled
                    placeholder=" "
                    defaultValue={userData.email}
                />
                <label for="email" class="input-label">E-mail</label>
            </div>

            <div className="input-container">
                <input
                    type="date"
                    id="datanascita"
                    name="datanascita"
                    required
                    className='input h-100'
                    placeholder=" "
                    defaultValue={userData.datanascita}
                    onChange={handleChange}
                />
                <label for="datanascita" class="input-label">Data di nascita</label>
            </div>

            {userData.status === "privato" && (
                <>
                    <div className="input-container">
                        <input
                            type="text"
                            id="biografia"
                            className='input h-100'
                            name="biografia"
                            required
                            placeholder=" "
                            defaultValue={userData.biografia}
                            onChange={handleChange}
                        />
                        <label for="biografia" class="input-label">Biografia</label>
                    </div>

                    <div className="input-container">
                        <input
                            type="text"
                            id="impiego"
                            name="impiego"
                            className='input h-100'
                            required
                            placeholder=" "
                            defaultValue={userData.impiego}
                            onChange={handleChange}
                        />
                        <label for="impiego" class="input-label">Impiego</label>
                    </div>

                    <div className="input-container">
                        <input
                            type="text"
                            id="ultimolavoro"
                            className='input h-100'
                            name="ultimolavoro"
                            required
                            placeholder=" "
                            defaultValue={userData.ultimolavoro}
                            onChange={handleChange}
                        />
                        <label for="ultimolavoro" class="input-label">Ultimo lavoro</label>
                    </div>
                

                    <div className="input-container">
                        <input
                            type="text"
                            id="lavoriprecedenti"
                            name="lavoriprecedenti"
                            className='input h-100'
                            required
                            placeholder=" "
                            defaultValue={userData.lavoriprecedenti}
                            onChange={handleChange}
                        />
                        <label for="lavoriprecedenti" class="input-label">Lavori precedenti</label>
                    </div>
                    <div className="input-container">
                        <input
                            type="text"
                            id="linguamadre"
                            className='input h-100'
                            name="linguamadre"
                            required
                            placeholder=" "
                            defaultValue={userData.linguamadre}
                            onChange={handleChange}
                        />
                        <label for="linguamadre" class="input-label">Lingua madre</label>
                    </div>
                    <div className="input-container">
                        <input
                            type="text"
                            id="altrelingue"
                            className='input h-100'
                            name="altrelingue"
                            required
                            placeholder=" "
                            defaultValue={userData.altrelingue}
                            onChange={handleChange}
                        />
                        <label for="altrelingue" class="input-label">Altre lingue</label>
                    </div>

                    <div className="input-container">
                        <input
                            type="text"
                            id="indirizzosuperiore"
                            name="indirizzosuperiore"
                            className='input h-100'
                            required
                            placeholder=" "
                            defaultValue={userData.indirizzosuperiore}
                            onChange={handleChange}
                        />
                        <label for="indirizzosuperiore" class="input-label">Indirizzo superiore</label>
                    </div>

                    <div className="input-container">
                        <input
                            type="text"
                            id="corsodilaurea"
                            name="corsodilaurea"
                            required
                            className='input h-100'
                            placeholder=" "
                            defaultValue={userData.corsodilaurea}
                            onChange={handleChange}
                        />
                        <label for="corsodilaurea" class="input-label">Corso di laurea</label>
                    </div>

                    <div className="input-container">
                        <input
                            type="text"
                            id="posizionelavorativaricercata"
                            name="posizionelavorativaricercata"
                            className='input h-100'
                            required
                            placeholder=" "
                            defaultValue={userData.posizionelavorativaricercata}
                            onChange={handleChange}
                        />
                        <label for="posizionelavorativaricercata" class="input-label">Posizione lavorativa ricercata</label>
                    </div>

                    <div className="input-container">
                        <input
                            type="text"
                            id="luogonascita"
                            name="luogonascita"
                            className='input h-100'
                            required
                            placeholder=" "
                            defaultValue={userData.luogonascita}
                            onChange={handleChange}
                        />
                        <label for="luogonascita" class="input-label">Luogo di nascita</label>
                    </div>

                    <div className="input-container">
                        <input
                            type="text"
                            id="luogoresidenza"
                            name="luogoresidenza"
                            className='input h-100'
                            required
                            placeholder=" "
                            defaultValue={userData.luogoresidenza}
                            onChange={handleChange}
                        />
                        <label for="luogoresidenza" class="input-label">Luogo di residenza</label>
                    </div>

                    <div className="input-container">
                        <input
                            type="text"
                            id="cellulare"
                            name="cellulare"
                            className='input h-100'
                            required
                            placeholder=" "
                            defaultValue={userData.cellulare}
                            onChange={handleChange}
                        />
                        <label for="cellulare" class="input-label">Cellulare</label>
                    </div>
                </>
            )}

            {userData.status === "azienda" && (
                <>
                    <div className="input-container">
                        <input
                            type="text"
                            id="descrizione"
                            name="descrizione"
                            className='input h-100'
                            defaultValue={userData.descrizione}
                            required
                            placeholder=" "
                            onChange={handleChange}
                        />
                        <label for="descrizione" class="input-label">Descrizione</label>
                    </div>

                    <div className="input-container">
                        <input
                            type="text"
                            id="cienteladiriferimento"
                            name="cienteladiriferimento"
                            className='input h-100'
                            onChange={handleChange}
                            defaultValue={userData.cienteladiriferimento}
                            required
                            placeholder=" "
                        />
                        <label for="cienteladiriferimento" class="input-label">Clientela di riferimento</label>
                    </div>

                    <div className="input-container">
                        <input
                            type="text"
                            id="numerodipendenti"
                            className='input h-100'
                            name="numerodipendenti"
                            onChange={handleChange}
                            defaultValue={userData.numerodipendenti}
                            required
                            placeholder=" "
                        />
                        <label for="numerodipendenti" class="input-label">Numero di dipendenti</label>
                    </div>

                    <div className="input-container">
                        <input
                            type="text"
                            id="fatturatoannuale"
                            className='input h-100'
                            name="fatturatoannuale"
                            onChange={handleChange}
                            defaultValue={userData.fatturatoannuale}
                            required
                            placeholder=" "
                        />
                        <label for="fatturatoannuale" class="input-label">Fatturato annuale</label>
                    </div>

                    <div className="input-container">
                        <input
                            type="text"
                            id="mercati"
                            className='input h-100'
                            name="mercati"
                            onChange={handleChange}
                            required
                            defaultValue={userData.mercati}
                            placeholder=" "
                        />
                        <label for="mercati" class="input-label">Mercati</label>
                    </div>

                    <div className="input-container">
                        <input
                            type="text"
                            id="settore"
                            className='input h-100'
                            name="settore"
                            onChange={handleChange}
                            defaultValue={userData.settore}
                            required
                            placeholder=" "
                        />
                        <label for="settore" class="input-label">Settore</label>
                    </div>

                    <div className="input-container">
                        <input
                            type="text"
                            className='input h-100'
                            id="fondatori"
                            name="fondatori"
                            defaultValue={userData.fondatori}
                            onChange={handleChange}
                            required
                            placeholder=" "
                        />
                        <label for="fondatori" class="input-label">Fondatori</label>
                    </div>

                    <div className="input-container">
                        <input
                            type="text"
                            defaultValue={userData.ceo}
                            id="ceo"
                            className='input h-100'
                            name="ceo"
                            onChange={handleChange}
                            required
                            placeholder=" "
                        />
                        <label for="ceo" class="input-label">CEO</label>
                    </div>

                    <div className="input-container">
                        <input
                            type="text"
                            id="strutturasocietaria"
                            name="strutturasocietaria"
                            onChange={handleChange}
                            className='input h-100'
                            required
                            defaultValue={userData.strutturasocietaria}
                            placeholder=" "
                        />
                        <label for="strutturasocietaria" class="input-label">Struttura societaria</label>
                    </div>

                    <div className="input-container">
                        <input
                            type="text"
                            id="certificazioni"
                            className='input h-100'
                            name="certificazioni"
                            defaultValue={userData.certificazioni}
                            onChange={handleChange}
                            required
                            placeholder=" "
                        />
                        <label for="certificazioni" class="input-label">Certificazioni</label>
                    </div>

                    <div className="input-container">
                        <input
                            type="text"
                            id="premi"
                            name="premi"
                            className='input h-100'
                            onChange={handleChange}
                            defaultValue={userData.premi}
                            required
                            placeholder=" "
                        />
                        <label for="premi" class="input-label">Premi</label>
                    </div>

                    <div className="input-container">
                        <input
                            type="text"
                            className='input h-100'
                            id="luogonascita"
                            name="luogonascita"
                            onChange={handleChange}
                            defaultValue={userData.luogonascita}
                            required
                            placeholder=" "
                        />
                        <label for="luogonascita" class="input-label">Luogo di nascita</label>
                    </div>

                    <div className="input-container">
                        <input
                            type="text"
                            className='input h-100'
                            id="sedelegale"
                            name="sedelegale"
                            defaultValue={userData.sedelegale}
                            onChange={handleChange}
                            required
                            placeholder=" "
                        />
                        <label for="sedelegale" class="input-label">Sede legale</label>
                    </div>

                    <div className="input-container">
                        <input
                            type="text"
                            id="sedioperative"
                            name="sedioperative"
                            onChange={handleChange}
                            className='input h-100'
                            defaultValue={userData.sedioperative}
                            required
                            placeholder=" "
                        />
                        <label for="sedioperative" class="input-label">Sedi operative</label>
                    </div>

                    <div className="input-container">
                        <input
                            type="text"
                            id="telefono"
                            name="telefono"
                            className='input h-100'
                            onChange={handleChange}
                            required
                            defaultValue={userData.telefono}
                            placeholder=" "
                        />
                        <label for="telefono" class="input-label">Telefono</label>
                    </div>

                    <div className="input-container">
                        <input
                            type="text"
                            id="sitoweb"
                            name="sitoweb"
                            className='input h-100'
                            defaultValue={userData.sitoweb}
                            onChange={handleChange}
                            required
                            placeholder=" "
                        />
                        <label for="sitoweb" class="input-label">Sito web</label>
                    </div>
                </>
            )}

            <div className="input-container">
                <input
                    accept="image/*"
                    type="file"
                    className='input h-100'
                    onChange={handleFileChange}
                />
                <label for="file" class="input-label">Carica immagine</label>
            </div>
                    
                        <button onClick={updateData} className="btn btn-success w-50 mt-4" >Update details</button>
                </div>
            </div>
        </div>
            

                        

                
                
                
            


    )



}

export default UpdateUser
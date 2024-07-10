import { Component } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./Login.css"
import React, { useState } from "react";

import password_icon from '../assets/password.png'
import email_icon from '../assets/person.png'
import 'bootstrap/dist/css/bootstrap.min.css'


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("privato")
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);

    fetch("https://sito-be.onrender.com/login", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email,
        password,
        status
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userLogin");
        if (data.status === "ok") {
          window.localStorage.setItem("token", data.data);
          window.localStorage.setItem("loggedIn", true);

          // Recupera i dati dell'utente e salvali nel localStorage
          fetch("https://sito-be.onrender.com/userData", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
              token: data.data
            }),
          }).then((res) => res.json())
            .then((userData) => {
              window.localStorage.setItem("userData", JSON.stringify(userData.data));
              navigate("/Profilo");
            });
        } else {
          const errorData = data.status
          setErrorMessage("errore: "+ errorData)
        }
      });
  };

  //La classe needs-validation è aggiunta al form per indicare che il form richiede la convalida.
          //La classe was-validated è aggiunta condizionalmente per applicare gli stili di convalida una volta che l’utente ha tentato di inviare il form.
  return (
    <div className="wrapper d-flex align-items-center justify-content-center w-100">
      <div className='login custom-rounded p-4 custom-background'>
        <h2 className="mb-4 text-center">Accedi</h2>
        <div className="form-group">  
          <form onSubmit={handleSubmit} action="input" method="post">
            <div className="inputs mb-3">

            <div className="input was-validated w-100 h-100">
              <img src={email_icon} alt=""/>
              <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="E-mail"
              />
              
            </div>

            <div className="input was-validated w-100 h-100">
              <img src={password_icon} alt=""/>
              <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
            
            </div>
            
            
            </div>
            
            
            <select
              id="status"
              name="status"
              class="custom-select"
              onChange={(e) => setStatus(e.target.value)}
              required
            >
              <option value="privato">Privato</option>
              <option value="azienda">Azienda</option>
            </select>
            
            

            <button type="submit" className='btn btn-success w-100 mt-3'>Accedi</button>
            {errorMessage && (
              <div className="alert alert-danger" role="alert">
                {errorMessage}
              </div>
            )}
          </form>
        </div>
        <div className="domanda">Non hai un account?
          <a href="/register"> Registrati</a>
        </div>
      </div>
    </div>
  );
}

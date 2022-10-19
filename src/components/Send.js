import './AppPage.css';
import './Main.css';

import React, { useState } from "react";
import {
    useParams
} from 'react-router-dom';
import Header from './Navbar'


const Main = () => {
    const [darkMode, setDarkMode] = React.useState(false);
    const [data, setData] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        const json = localStorage.getItem("site-dark-mode");
        const currentMode = JSON.parse(json);
        if (currentMode) {
            document.body.classList.add("dark");
        } else {
            document.body.classList.remove("dark");
        }
    }, []);

    let { id } = useParams();
    React.useEffect(() => {
        const url = `${process.env.REACT_APP_API}/apps/id/${id}`;
        fetch(url)
            .then((response) => response.json())
            .then((json) => setData(json))
            .catch((error) => console.log(error));
    }, []);

    React.useEffect(() => {
        if (data.length !== 0) {
            setIsLoading(false);
        }
        //console.log(data);
    }, [data]);

    return (
        <div>
            <Header />
            <div>
                <h2>Send App</h2>
                <a class="sendapp">How to send an application? <br /><br />
                    <a class="formurl" href="https://github.com/blazap/blazap-db/issues/new?assignees=octocat&labels=send+app&template=SEND-APP.yml&title=%5BSend+App%5D%3A+">Click here to go to the form</a>
                </a>
            </div>
        </div>
    );
}
export default Main;
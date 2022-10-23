import './Main.css';

import React, { useState } from "react";
import Header from './Navbar'
import { Link } from "react-router-dom"

const Main = () => {

    // All states
    const [isLoading, setIsLoading] = React.useState(false);
    const [data, setData] = React.useState([]);
    
    React.useEffect(() => {
        const json = localStorage.getItem("site-dark-mode");
        const currentMode = JSON.parse(json);
        if (currentMode) {
            document.body.classList.add("dark");
        } else {
            document.body.classList.remove("dark");
        }
    }, []);







    React.useEffect(() => {
        const jsonFav = localStorage.getItem("fav");
        const current = JSON.parse(jsonFav);
        if (current === null) {
            setData([])
        } else {
            setData(current)
        }

    }, []);

    return (
        <div>
            <Header />
            <div>
                <h2>Favourites</h2>
            </div>
            <div class="apps">
                {isLoading ? (
                    <h1>Loading...</h1>
                ) : (
                    data.map((user) => (
                        <div class="app">
                            <div class={user._id}>
                                <div class="appimg">
                                    <Link to={`/app/${user.id}`} className="site-title">

                                        <a><img class="imgapp" src={user.imageUrl} /></a>
                                    </Link>
                                </div>
                                <a class="name">{user.name}</a><br />
                                <a class="shared">Shared by {user.shared}</a>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
export default Main;
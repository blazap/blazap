import './AppPage.css';
import './Main.css';

import React, { useState, useRef } from "react";
import useLocalStorage from 'react-use-localstorage';

import {
    useParams
} from 'react-router-dom';
import Header from './Navbar'


const Main = () => {
    const [data, setData] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [storageItem, setStorageItem] = useLocalStorage(
        'fav',
        JSON.stringify([]),
    )
    
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

    const storagedArray = useRef(JSON.parse(storageItem))
    const isFavourited = storagedArray.current.find(e => e.id == id);
    const addFav = () => {
        if (!isFavourited) {
            storagedArray.current.push(data)
            setStorageItem(JSON.stringify(storagedArray.current))
            console.log("yes")
        } else {
            const indexFavouritedId = storagedArray.current.indexOf(data)
            storagedArray.current.splice(indexFavouritedId, 1)
            setStorageItem(JSON.stringify(storagedArray.current))
            console.log("no")

        }
    }
    return (
        <div>
            <Header />
            <div>
                {isLoading ? (
                    <h1>Loading...</h1>
                ) : (

                    <div class="appPage">

                        <div class="pageImg">
                            <img class="appImg" src={data.imageUrl} />
                            <h2 class="appName">{data.name}</h2>
                            <h3 class="appShared">Shared by {data.shared}</h3>
                        </div>

                        <a class="description"><h3>Description:</h3> {data.description}</a>
                        <button class="formbtn" onClick={() => window.location.href = data.webUrl}>Visit {data.lower}</button>
                        {isFavourited ? (
                            <button onClick={addFav}>Remove from Favorites</button>
                        ) : (
                            <button onClick={addFav}>Add Favorites</button>
                        )}
                        <a class="convert" href={process.env.REACT_APP_DOWNLOADS_REDIRECT}>or convert it to a normal app</a>
                    </div>

                )}
            </div>
        </div>
    );
}
export default Main;
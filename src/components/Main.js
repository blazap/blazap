import './Main.css';

import React, { useState } from "react";
import Header from './Navbar'
import { Link } from "react-router-dom"

const Main = () => {

  // All states
  const [isLoading, setIsLoading] = React.useState(true);
  const [data, setData] = React.useState([]);
  const [showText, setText] = useState("All")
  const changeText = (text) => setText(text);
  const [showDarkText, setDarkText] = useState("Toggle Dark Mode")
  const changeDarkText = (text) => setDarkText(text);
  const [darkMode, setDarkMode] = React.useState(false);

  // Set automatic dark or light mode in the page
  React.useEffect(() => {
    // Reads the localStorage to view if has the site-dark-mode enabled
    const json = localStorage.getItem("site-dark-mode");
    const currentMode = JSON.parse(json);
    if (currentMode) {
      setDarkMode(true);
    } else {
      setDarkMode(false);
    }
  }, []);

  React.useEffect(() => {
    // Set the dark mode or light mode when the user clicks on the button
    if (darkMode) {
      // Turn on dark mode
      document.body.classList.add("dark");
      changeDarkText("Toggle Light Mode")
    } else {
      // Turn on light mode
      document.body.classList.remove("dark");
      changeDarkText("Toggle Dark Mode")
    }
    const json = JSON.stringify(darkMode);
    localStorage.setItem("site-dark-mode", json);
  }, [darkMode]);

  // Set the category function
  const setCategory = (category) => {

    const url = `${process.env.REACT_APP_API}/apps/category/${category}`;
    fetch(url)
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.log(error));


    if (data.length !== 0) {
      setIsLoading(false);
    }
  }

  // Set all apps (always show the recents first, but you can configure it on the API)
  const setAll = () => {

    const url = `${process.env.REACT_APP_API}/apps`;
    fetch(url)
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.log(error));


    if (data.length !== 0) {
      setIsLoading(false);
    }
    //console.log(data);
    changeText("All")


  }
  // When press enter in the input, shows the apps
  let inputHandler = (e) => {
    if (e.key === "Enter") {
      const value = e.target.value
      const lower = value.toLowerCase()
      const url = `${process.env.REACT_APP_API}/apps/search/${lower}`;
      fetch(url)
        .then((response) => response.json())
        .then((json) => setData(json))
        .catch((error) => console.log(error));


      if (data.length !== 0) {
        setIsLoading(false);
      }
      //console.log(data);

    }
  };

  // Show all apps without user action
  React.useEffect(() => {
    const url = `${process.env.REACT_APP_API}/apps`;
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
        <h2>Store</h2>
      </div>
      <div className="search">
        <input
          placeholder='Search'
          onKeyPress={inputHandler}
        />
      </div>
      <div class="category">
        <button onClick={setAll}>All</button>
        <button onClick={() => { setCategory("ide"); changeText("IDE"); }}>IDE</button>
        <button onClick={() => { setCategory("api"); changeText("API's"); }}>API's</button>
        <button onClick={() => { setCategory("video"); changeText("Video Editors"); }}>Video Editors</button>
        <button onClick={() => { setCategory("text"); changeText("Text Editors"); }}>Text Editors</button>
        <button onClick={() => { setCategory("design"); changeText("Design"); }}>Design</button>
        <button onClick={() => { setCategory("vm"); changeText("Virtual Machines"); }}>Virtual Machines</button>
      </div>
      <div>
        <button onClick={() => setDarkMode(!darkMode)}>{showDarkText}</button>
      </div>
      <h2>{showText}</h2>

      <div class="apps">
        {isLoading ? (
          <h1>Loading...</h1>
        ) : (
          data.map((user) => (
            <div class="app">
              <div class={user._id}>
                <div class="appimg">
                  <Link to={`app/${user.id}`} className="site-title">

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
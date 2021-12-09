import React, { useState } from "react";
import "./HomeView.css";
import {Link, useLocation, useParams} from 'react-router-dom';


const HomeView = (props) => {

    //state value when using react router

    const [filteredData, setFilteredData] = useState([]);
    const [wordEntered, setWordEntered] = useState("");


    const handleFilter = (e) => {
    const searchSong = e.target.value;
        setWordEntered(searchSong);
            const newFilter = props.songs.filter((value) => {
                return value.title.toLowerCase().includes(searchSong.toLowerCase());
    });

    if (searchSong === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };


    return (
        <div className="background">

        <div className="minibox"> Play Browser

            <div className="searchInputs"> Title: {" "}
                <input
                    type="text"
                    placeholder=""
                    value={wordEntered}
                    onChange={handleFilter}

                />
      {filteredData.length !== 0 && (
        <div className="songResult">
          {filteredData.map((value, key) => {

            return (
                <p>
                  {value.title}
                </p>
            );
          })}
        </div>
      )}
    </div>
          <Link to = {{
              pathname: '/default',
              state: {
                  fromHomeView: filteredData
              }
          }}>


          <button>Show Matching Plays</button>
          </Link>


          <Link to = {{
              pathname: '/default',
              state: {
                  fromHomeView: null
              }
              }}>
          <button>Show All Plays</button>

          </Link>
    </div>
    </div>
  );
}

export default HomeView;

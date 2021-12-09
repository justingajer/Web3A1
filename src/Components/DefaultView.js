import React, {useState} from "react";
import PlayList from "./PlayList";
import PlayFilter from "./PlayFilter";
import * as cloneDeep from 'lodash/cloneDeep';
import Header from "./Header";
import Favourites from "./Favourites";
import {useParams, useLocation} from 'react-router-dom';
import {useLocalStorage} from "../Hooks/useLocalStorage";
import './DefaultView.css';

const DefaultView = (props) =>{

        const location = useLocation()
        const [locationState, changeLocationState] = useState(null);

        if(typeof location.state != "undefined"){
                const {fromHomeView} = location.state;
                if (fromHomeView != null) changeLocationState(fromHomeView);
        }
        const [favouritesVisibility, editFavouritesVisibility] = useState(true);

        const toggleVisibility=()=>{
                if(favouritesVisibility)
                        editFavouritesVisibility(false);
                else
                        editFavouritesVisibility(true);
        }

        const playlist=locationState===null ? props.plays : locationState;

        return (
                <div className="container">
                <div className="header">
                <Header/>
                </div>
                <div className="favourites">
                <Favourites favourites={props.favs} visible={favouritesVisibility} remove={props.removeFav} toggle={toggleVisibility}/>
                </div>
                <div className="playfilter">
                <PlayFilter genres={[...new Set(props.plays.map(p=>p.genre))]} filter={props.filter} reset={props.restore}/>
                </div>
                <div className="playlist">
                <PlayList plays={playlist} search={props.search} sort={props.sort} addFav={props.addFav}/>
            </div>
            </div>
        )
}
export default DefaultView;

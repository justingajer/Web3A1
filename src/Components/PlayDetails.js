import React from 'react'
import Header from "./Header";
import PlayTitle from "./PlayTitle";
import Tabs from "./Tabs";
import {useState, useEffect} from "react";
import {useLocation, useParams} from "react-router-dom";
import {useLocalStorage} from "../Hooks/useLocalStorage";
import Loader from "react-loader-spinner";
import Tab from "./Tab";

const PlayDetails = (props) => {
    const {play:id} = useParams();
    const location = useLocation();
    const {play:details} = location.state;
    // const [isFetching, stopFetching] = useState(true);


    //checking to see if the api retreived the characters and text

    // useEffect(()=> {
    //     const url = `https://www.randyconnolly.com//funwebdev/3rd/api/shakespeare/play.php?name=${id}`; //url to fetch data with props id
    //     if (play === null && details.filename != ""){
    //         fetch(url)
    //             .then(resp=>{
    //             if (resp.ok) {
    //                 return resp.json();
    //             }
    //             else {
    //                 throw new Error("Fetch failed");
    //             }
    //         }).then(data=>{
    //             setPlay(data);
    //             stopFetching(false);
    //         })
    //             .catch(error=>console.error(error));
    //     } else {
    //         stopFetching(false);
    //     }
    //
    // }, [id, play, setPlay])
    //
    // const handleTabChange = (tab)=>{
    //
    // }

    // if (isFetching){
    //     return <Loader type="Circles" color="#00BFFF" height="50vh" width="50vh"/>
    // }
    // else
    // {
        return (
            <div className="container">
                <div className="header">
                <Header/>
                </div>
                <div className="playtitle">
                <PlayTitle play={details} addFav={props.addFav}/>
                </div>
                <div className="tab">
                <Tab play={details} id={id}/>
                </div>
            </div>
        )
    // }
}


export default PlayDetails;

import {useLocalStorage} from "../Hooks/useLocalStorage";
import {useEffect, useState} from "react";
import Tabs from "./Tabs";
import Loader from "react-loader-spinner";

const Tab = (props)=>{

    const [play, setPlay] = useLocalStorage(props.id, null);
    const [current, changeCurrent] = useState("Details");
    const [isFetching, stopFetching] = useState(true);
    const [buttons, changeButtons] = useState([]);
    const [tabProps, changeTabProps] = useState({})
    useEffect(()=> {
        const url = `https://www.randyconnolly.com//funwebdev/3rd/api/shakespeare/play.php?name=${props.id}`; //url to fetch data with props id
        if (play === null && props.play.filename !== ""){
            fetch(url)
                .then(resp=>{
                    if (resp.ok) {
                        return resp.json();
                    }
                    else {
                        throw new Error("Fetch failed");
                    }
                }).then(data=>{
                setPlay(data);
                checkButtons();
                changeTabProps({details: props.play, tabName: "Details"});
                stopFetching(false);
            })
                .catch(error=>console.error(error));
        } else {
            stopFetching(false);
            checkButtons();
            changeTabProps({details: props.play, tabName: "Details"});
        }

    }, [props.id, play, setPlay]);

    const checkButtons = ()=>{
        if (props.play.filename === ""){
            changeButtons(["Details"]);
        } else {
            changeButtons(["Details", "Characters", "Text"]);
        }
    }

    const handleTabChange = (e)=>{
        if(e.target.value === "Details")
            changeTabProps({details: props.play, tabName: "Details"});
        else if(e.target.value === "Characters")
            changeTabProps({details: play.persona, tabName: "Characters"});
        else if(e.target.value === "Text")
            changeTabProps({details: play.acts, tabName: "Text"});

    }
    if (isFetching)
        return <Loader type="Circles" color="#00BFFF" height="50vh" width="50vh"/>
    else {
        return (
            <div>
                <span>{buttons.map(b => <button onClick={handleTabChange}>{b}</button>)}</span>
                <Tabs {...tabProps}/>
            </div>
        )
    }
}

export default Tab;

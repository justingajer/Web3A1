import './App.css';
import {Route, Switch} from 'react-router-dom';
import {useState, useEffect} from "react";
import DefaultView from "./Components/DefaultView";
import {useLocalStorage} from "./Hooks/useLocalStorage";
import * as cloneDeep from "lodash/cloneDeep";
import Loader from "react-loader-spinner";
import HomeView from "./Components/HomeView";
import PlayDetails from "./Components/PlayDetails";
import Tabs from "./Components/Tabs";

function App() {

    //local storage logic inspired by https://blog.logrocket.com/using-localstorage-react-hooks/
    const [fullPlaysList, setFullPlaysList] = useLocalStorage("plays", []);
    //fullPlaysList contains the entire list unedited of plays as fetched from the api/local storage, while plays will be
    //altered by filter/sort/restorePlays functions and passed to other components as props
    const [plays, updatePlays] = useState([]);
    const [isFetching, stopFetching] = useState(true);
    const [favourites, editFavourites] = useLocalStorage("fav",[]);

    useEffect(()=> {
        const url = "https://www.randyconnolly.com//funwebdev/3rd/api/shakespeare/list.php"; //url to fetch data
        if (fullPlaysList.length === 0) { //only fetches if local storage doesn't exist
            fetch(url)
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error("Fetch failed");
                    }
                })
                .then(data => {
                    //places fetched data in state & local storage
                    setFullPlaysList(data.sort((a, b) => a.title>b.title ? 1 : -1));
                    updatePlays(data.sort((a, b) => a.title>b.title ? 1 : -1));
                    stopFetching(false);
                })
                .catch(error => console.error(error));
        } else {
            updatePlays(fullPlaysList);
            stopFetching(false);
        }
    }, [fullPlaysList, setFullPlaysList])

    const sort = (e)=> {
        //cloning plays list
        const sortedPlays = cloneDeep(plays);
        let sortBy;
        //if sorting by year, sets sortBy variable to likelyDate
        //otherwise, sortBy variable is set to title
        if(e.target.textContent.toLowerCase() === "year")
            sortBy="likelyDate";
        else
            sortBy=e.target.textContent.toLowerCase();
        sortedPlays.sort((a, b) => a[sortBy]>b[sortBy] ? 1 : -1);
        updatePlays(sortedPlays);
    }

    //uses fullPlaysList state variable to reset plays
    const restorePlays = ()=>{
        updatePlays(fullPlaysList);
    }
    const removeFavourite=(id)=>{
        const favouritesCopy = cloneDeep(favourites);
        const favToDelete=favouritesCopy.findIndex(f=>f.id === id);
        favouritesCopy.splice(favToDelete, 1);
        editFavourites(favouritesCopy);
    }
    const addFavourite=(play)=>{
        const exists = favourites.find(f=>f.id === play.id);
        if (typeof exists === 'undefined')
        {
            const favouritesCopy = cloneDeep(favourites);
            favouritesCopy.push(play);
            editFavourites(favouritesCopy);
        } else
            alert("Play already in Favourites list");
    }
    const filter = filters =>{
        //function to filter list by dates
        const filterPlaysByDate = (before, after, filteredPlays) => {
            //only returns plays whose years are between before and after years when both are specified,
            //or only matches the parameters of one when the other is missing
            return filteredPlays.filter((p)=> (before > p.likelyDate && p.likelyDate > after) ||
                (typeof after === "undefined" && p.likelyDate < before) ||
                (typeof before === "undefined" && p.likelyDate > after));
        }
        //function to filter by title and/or genre
        const filterPlaysByTitleGenre = (titleString, genre, filteredPlays) =>{
            //only returns plays that match both title and genre when both are specified,
            //or only matches the parameters of one when the other is missing
            return filteredPlays.filter(p=> (p.title.toLowerCase().includes(titleString) && p.genre === genre) ||
                (typeof genre === "undefined" && p.title.toLowerCase().includes(titleString)) ||
                (typeof titleString === "undefined" && p.genre === genre));
        }
        //initial value of filteredPlays set to fullPlaysList in case user does multiple filter requests in a row without
        //clearing initial filters
        let filteredPlays = cloneDeep(fullPlaysList);
        //only filters by title or genre if at least one is specified
        if (typeof filters.title != "undefined" || typeof filters.genre != "undefined"){
            const filterTitleGenre = cloneDeep(filteredPlays);
            filteredPlays = filterPlaysByTitleGenre(filters.title.toLowerCase(), filters.genre, filterTitleGenre);
        }

        //only filters by dates if either before or after year is specified
        if (typeof filters.before != "undefined" || typeof filters.after != "undefined"){
            const filterByDate = cloneDeep(filteredPlays);
            filteredPlays = filterPlaysByDate(filters.before, filters.after, filterByDate);
        }

        //sets the list of filtered plays to state
        updatePlays(filteredPlays);
    }
    //while fetching data, displays loading symbol
    if (isFetching && plays.length === 0){
        return <Loader type="Circles" color="#00BFFF" height="50vh" width="50vh"/>
    } else{
        return (
            <div className="App">
                {/*<DefaultView plays={plays} restore={restorePlays} filter={filter} sort={sort}/>*/}
                {/*  commented out for now so nothing breaks while testing*/}

                <Route path="/" exact>
                    <HomeView songs={fullPlaysList} />
                </Route>
                <Route path="/HomeView" exact>
                     <HomeView songs={fullPlaysList} />
                 </Route>
                <Route path='/default' exact>
                    <DefaultView plays={plays} restore={restorePlays} filter={filter} sort={sort} favs={favourites} addFav={addFavourite} removeFav={removeFavourite} />
                </Route>
                <Switch>
                    {/*<Route path="/:play/details" exact component={<Tabs head="Details"/>}/>*/}
                    {/*<Route path="/:play/characters" exact component={<Tabs head="Characters"/>}/>*/}
                    <Route path='/:play/details'>
                        <PlayDetails addFav={addFavourite}/>
                    </Route>
                </Switch>
            </div>
        );
    }

}

export default App;

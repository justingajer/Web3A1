import FavItem from "./FavItem";

const Favourites= props=>{
    const visible=()=>{
        if (props.visible)
            return "block";
        else
            return "none";
    }
    return(
        <div>
            <button onClick={props.toggle}>Show/hide Favourites List</button>
            <h2 style={{display: visible()}}>Favourites</h2>
            <ul style={{display: visible()}}>
                {props.favourites.map(f=><FavItem key={f.id} play={f} remove={props.remove}/>)}
            </ul>
        </div>
    )
}
export default Favourites;

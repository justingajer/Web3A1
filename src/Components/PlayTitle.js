import React from 'react';
import {Link} from 'react-router-dom';
import {GiChainedHeart} from "react-icons/gi";

const PlayTitle= props => {
    const handleClick = ()=>{
        props.addFav(props.play);
    }

return(
    <div className="default">
            <h2> {props.play.title} </h2>
            <div>
                {props.play.synopsis}
            </div>

            <Link to={{
                pathname: "/default",
                state:{
                    fromHomeView: null
                }
            }}>
                <button>Close</button>
            </Link>
            <button onClick={handleClick}><GiChainedHeart/></button>
    </div>

)
}

export default PlayTitle;

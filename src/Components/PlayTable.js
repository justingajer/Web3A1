import PlayRow from "./PlayRow";
const PlayTable=props=>{
    return(
        <table>
            <tbody>
            <tr>
                <th onClick={props.sort}>Title</th>
                <th onClick={props.sort}>Year</th>
            </tr>
            {props.plays.map(p=><PlayRow play={p} key={p.id} addFav={props.addFav}/>)}
            </tbody>
        </table>
    )
}
export default PlayTable;

import {createRef} from "react";

const PlayFilter=props=>{
    //creating references for form fields
    const before = createRef();
    const beforeYear = createRef();
    const after = createRef();
    const afterYear = createRef();
    const title = createRef();
    const genre = createRef();

    const handleSubmit =(e) => {

        e.preventDefault();

        const filters = {};
        //only adds inputted parameters
        if (before.current.checked && beforeYear.current.value.length > 0) filters.before = beforeYear.current.value;
        if (after.current.checked && afterYear.current.value.length > 0) filters.after = afterYear.current.value;
        if (title.current.value.length > 0) filters.title = title.current.value;
        if (genre.current.value.length > 0) filters.genre = genre.current.value;
        //if no parameters are given, sends an alert,
        //otherwise calls passed filter function
        if (Object.keys(filters).length === 0)
            alert("Error: please input some filter parameters")
        else {
            props.filter(filters);
        }
    }

    return(
        <form onSubmit={handleSubmit} onReset={props.reset}>
            <h2>Filters</h2>
            <div>
                <p><label>Title</label></p>
            <input name="title" ref={title} type='text'/>
            </div>
            <div>
                <p><label>Year</label></p>
                <p><input name="before" ref={before} type='radio'/>Before <input type="number" ref={beforeYear} name="beforeYear"/></p>
                <p><input name="after" ref={after} type='radio'/>After <input type='number' ref={afterYear} name="afterYear"/></p>
            </div>
            <div>
                <p><label>Genre</label></p>
                <select ref={genre} name="genre">
                    <option/>
                    {props.genres.map(g=><option value={g} key={g}>{g}</option>)}
                </select>
            </div>
            <input type="submit" value="Filter"/>
            <input type="reset" value="Clear"/>
        </form>
    )

}
export default PlayFilter;

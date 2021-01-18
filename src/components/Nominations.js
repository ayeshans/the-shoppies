import React from 'react';
import './Nominations.css';

function Nominations(props) {

    let films = props.films;
    let finishOption = films.length === 5;
    let onUndoNominate = props.onUndoNominate.bind(this);
    let onFinalSubmit = props.onFinalSubmit.bind(this);
         
    return(
        <div className="nominationsContainer">
            <div className="nominationsHeader">
                <h4> Nominations </h4>
                <form onSubmit={(e) => onFinalSubmit(e)}>
                    <button type="submit" disabled={!finishOption} className={finishOption ? "allow-submit" : "disable-submit"}>Submit</button>
                </form>  
            </div>
            <div>
                {finishOption && <p className="info">You can now submit your nominations.</p>}
                <ul>
                    {films.map((obj, idx) => {
                        return(
                            <div key={`${idx}`} className="movieEntry">
                                <li> {obj.Title} ({obj.Year}) </li>
                                <button className="allow-submit" onClick={() => onUndoNominate(obj.Title, obj.Year)} > Remove </button>
                            </div>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}

export default Nominations;
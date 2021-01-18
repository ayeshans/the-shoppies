import React from 'react';
import './ResultsPanel.css';

function ResultsPanel(props) {
    let options = props.options;
    let optionsLength = props.optionsLength;
    let onNominate = props.onNominate.bind(this);
    let hasStarted = props.search;
    let tooManySelected = props.tooManySelected;

    onNominate = (title, year) => {
        props.onNominate(title, year);
    }
    
    return(
        <div className="panelContainer">
            {hasStarted && <h4> Results for "{props.title}" </h4>}     
            {(hasStarted)
                ? (<div>
                    {(optionsLength > 0)
                        ? 
                        (<div className="optionsList">
                            {tooManySelected && <p className="error"> You may only select 5 films. </p>}
                            <ul>
                                {options.map((obj, idx) => 
                                    <div key={`${idx}`} >
                                        <div className="movieEntry">
                                            <li> {obj.Title} ({obj.Year}) </li>
                                            {props.films.some(film => (obj.Title === film.Title) && (obj.Year === film.Year))
                                                ? (<button disabled={true} className="disable-submit"> Nominate </button>) 
                                                : (<button disabled={false} className="allow-submit" onClick={() => {onNominate(obj.Title, obj.Year)}}> Nominate </button>)
                                            }
                                        </div>
                                    </div>
                                )}
                            </ul>
                        </div>)
                        : (<p className="error"> No results found - try entering the full movie name, or check for spelling errors.</p>)}
                </div>)
                : ( (props.submitted)
                        ? (<div><p className="success"> Your nominations were submitted! </p></div>)
                        : ((<div>
                            <h4>Search Results</h4>
                            <p className="info"> You can nominate {5-props.films.length} more movies. </p>
                        </div>))
                )
            }
        </div>
    )
}

export default ResultsPanel;
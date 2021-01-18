import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import './SearchPanel.css';

function SearchPanel(props) {
    return(
        <div className="searchContainer">
            <form className="searchForm">
                <p> Movie Title </p>
                <Input className="textbox" 
                    startAdornment={
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      }
                    placeholder="Enter movie title here" 
                    type="text" 
                    value={props.title} 
                    onChange={e => props.onChange(e.target.value)}
                />
            </form>
        </div>
    )
}

export default SearchPanel;
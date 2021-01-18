import axios from 'axios';
import React, { Component } from 'react';
import './Dashboard.css';
import SearchPanel from './SearchPanel';
import ResultsPanel from './ResultsPanel';
import Nominations from './Nominations';

class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            films: [],
            title: "",
            search: false,
            options: [],
            submitted: false, 
            tooManySelected: false
        };
    }

    /* Functions for the Search Panel */

    searchHandleChange = (value) => {
        this.setState({
            title: value,
            search: value.length !== 0,
            submitted: false,
            tooManySelected: false
        }, () => 
            this.getSearchResults()
        );
    }

    getSearchResults = () => {
        if (this.state.search) {
            axios.get(`https://www.omdbapi.com/?s=${this.state.title}&type=movie&apikey=799f7e71`)
                .then(response => this.setOptions(response.data))
                .catch(e => {console.log(e)});
        } else {
            this.setState({
                options: []
            })
        }
    }

    setOptions = (data) => {
        if (data.hasOwnProperty("Search")) {
            let currData = data["Search"];
            currData = currData.sort((a, b) => parseFloat(b.Year)-parseFloat(a.Year))
            for (var obj in currData) {
                for (var key in currData[obj]) {
                    if (key !== "Title" && key !== "Year") {
                        delete currData[obj][key];
                    }
                }
            }
            this.setState({
                options: currData
            })
        } else {
            this.setState({
                options: []
            })
        }
    }

    /* Functions for the Results Panel */
    handleNomination = (title, year) => {
        if (this.state.films.length === 5) {
            this.setState({
                tooManySelected: true
            })
        } else {
            this.setState({
                films: this.state.films.concat({Title:title, Year:year}),
            })
        }
    }

    /* Functions for the Nominations Panel */
    handleUndoNominate = (title, year) => {
        this.setState({films: this.state.films.filter(function(obj) { 
            return ((obj.Title !== title) || (obj.Year !== year))  
        })});
        this.setState({
            tooManySelected:false
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({
            films: [],
            title: "",
            search: false,
            options: [],
            submitted: true,
            tooManySelected: false
        })
    }

    render() {
        return(
            <div className="main-container">
                <h1> The Shoppies </h1>
                <div className="grid-container">
                    <SearchPanel 
                        title={this.state.submitted ? "" : this.state.title} 
                        onChange={this.searchHandleChange} 
                        submitted={this.state.submitted} 
                    />
                    <ResultsPanel 
                        title={this.state.title} 
                        films={this.state.films} 
                        search={this.state.search} 
                        options={this.state.options ? this.state.options : []} 
                        optionsLength={this.state.options ? this.state.options.length : 0} 
                        onNominate={this.handleNomination} 
                        submitted={this.state.submitted}
                        tooManySelected={this.state.tooManySelected}
                    />
                    <Nominations 
                        films={this.state.films} 
                        onUndoNominate={this.handleUndoNominate} 
                        onFinalSubmit={this.handleSubmit}
                    />
                </div>
            </div>
        )
    }
}

export default Dashboard;
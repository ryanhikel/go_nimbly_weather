import React, { Component } from 'react';
import './App.css';

class App extends Component {
  // Initialize state
  constructor(props) {
    super(props);
    this.state = {
      weather: []
    }
    this.onFormChange = this.onFormChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onFormChange(evt) {
    const element = evt.target;
    const name = element.name;
    const value = element.value;
    const newState = {};
    newState[name] = value;
    this.setState(newState);
  }

  onFormSubmit(evt) {
    evt.preventDefault();
    fetch(`/api/weather/${this.state.city}`)
      .then(res => res.json())
      .then(data => {
        this.setState({ weather: data.consolidated_weather, location: data.title })
      });

  }

  render() {
    console.log(this.state);
    return (
      <div className="App container">
        <fieldset>
          <form onChange={this.onFormChange} onSubmit={this.onFormSubmit}>
            <input name="city" type="text" className="ghost-input" placeholder="Enter a City" required />
            <input type="submit" className="ghost-button" value="Get Weather" />
          </form>
        </fieldset>
        {/* Render the passwords if we have them */}
        {this.state.weather.length > 0 ? (
          <div>
            <h1>{this.state.location} Weather</h1>
            <ul className="forecast">
              {this.state.weather.map((day, index) =>
                <li key={index}>
                  {day.applicable_date} - {day.weather_state_name}
                </li>
              )}
            </ul>
          </div>
        ) : (
            // Render a helpful message otherwise
            <div>
              <h1>No data :(</h1>
            </div>
          )}
      </div>
    );
  }
}

export default App;
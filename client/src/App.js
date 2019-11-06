import React, { Component } from 'react';
import './App.css';

class App extends Component {
  // Initialize state
  constructor(props){
    super(props);
    this.state = {
      weather: []
    }
  }

  // Fetch passwords after first mount
  componentDidMount() {
    this.getWeather();
  }

  getWeather(){
    // Get the passwords and store them in state
    fetch('/weather')
      .then(res => res.json())
      .then(weather => this.setState({weather: weather.consolidated_weather}));
  }

  render() {
    console.log(this.state.weather);
    return (
      <div className="App">
        {/* Render the passwords if we have them */}
        {this.state.weather.length ? (
          <div>
            <h1>London Weather</h1>
            <ul className="forecast">
              {this.state.weather.map((data, index) =>
                <li key={index}>
                  {data.applicable_date}
                </li>
              )}
            </ul>
            <button
              className="more"
              onClick={this.getWeather}>
              Get More
            </button>
          </div>
        ) : (
            // Render a helpful message otherwise
            <div>
              <h1>No passwords :(</h1>
              <button
                className="more"
                onClick={this.getWeather}>
                Try Again?
            </button>
            </div>
          )}
      </div>
    );
  }
}

export default App;
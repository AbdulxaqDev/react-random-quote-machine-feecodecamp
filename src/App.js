import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quotes: null,
      quote: "",
      author: "",
      color: '',
    };
    this.getQuotes = this.getQuotes.bind(this);
    this.newQuote = this.newQuote.bind(this);
    this.colors = ["#ffce0b", "#e83f68", "#ab3e8f", "#0092d6", "#00a989", '#0e8523', '#2b92eb', '#0911e0', '#7a00f9', '#b47ef4'];
  }

  newQuote() {
    if (this.state.quotes) {
      let newQuote =
        this.state.quotes[Math.floor(Math.random() * this.state.quotes.length)];
      this.setState({
        quote: newQuote.text,
        author: newQuote.author ? newQuote.author : "Unknown",
        color: this.colors[Math.floor(Math.random() * 11)]
      });
    }
  }

  async getQuotes() {
    const apiUrl = "https://type.fit/api/quotes";
    try {
      const response = await fetch(apiUrl);
      const apiQuotes = await response.json();
      // console.log(apiQuotes.length);
      this.setState({
        quotes: apiQuotes,
      });
      this.newQuote();
    } catch (error) {
      // Catch Error Here
      console.log(error);
    }
  }

  componentDidMount() {
    this.getQuotes();
  }

  render() {
    return (
      <div className="App" style={{ backgroundColor: this.state.color }}>
        <div id="quote-box">
          {this.state.quotes ? (
            <>
              <p style={{ color: this.state.color }} id="text">
                "{this.state.quote}
              </p>
              <p style={{ color: this.state.color }} id="author">
                -{this.state.author}
              </p>
              <div className="btns">
                <a
                  style={{ backgroundColor: this.state.color }}
                  href="https://twitter.com/intent/tweet"
                  id="tweet-quote"
                  target="_blank"
                >
                  Tweet quote
                </a>
                <button
                  style={{ backgroundColor: this.state.color }}
                  onClick={this.newQuote}
                  id="new-quote"
                >
                  New quote
                </button>
              </div>
            </>
          ) : (
            <h1 style={{ color: this.state.color }}>Loading</h1>
          )}
        </div>
      </div>
    );
  }
}

export default App;

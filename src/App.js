import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    searchContent: "",
    photosNum:"",
    photosSize:"",
    searchPhotos: [],
  }
  
  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }
  

  addPictures = () => {
    const searchContent = this.state.searchContent 
    const options = {
    headers: {
        Authorization: 'Client-ID e812c00541b9eab2133726929969cbe4988bb9a652eb237c0003c41f96f63773' //const myAPIkeys
    }
}
const outputPhotos = (photos) => {
  const photoElement = document.getElementById("test")
   let htmlString = "";
  for (const photo of photos.results) {
      htmlString += `
      <figure class="images" alt="${searchContent}">
       <img src=${photo.urls.small}>
       <figcaption>${searchContent} by ${photo.user.name}</figcaption>
       </figure>`
  }
  document.getElementById("test").innerHTML = htmlString;
}

fetch(`https://api.unsplash.com/search/photos?orientation=${this.state.photosSize}&per_page=${this.state.photosNum}&query=${searchContent}`, options)
  .then(resp => resp.json())
  .then(outputPhotos)

  }


  render() {
    return (
      <div className='App'>
        <h1>Unsplash Search</h1>
        <div>
          <input
             type='text' 
             name='searchContent' 
             value={this.state.searchContent} 
             onChange={this.handleChange}
             placeholder="What do you want to search?"
             />
          <button className='submitButton' type='submit' onClick={this.addPictures}>Click Me!</button>
          <select name="photosNum" value={this.state.photosNum} onChange={this.handleChange}>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
          </select>
          <select name="photosSize" value={this.state.photosSize} onChange={this.handleChange}>
              <option value="">all</option>
              <option value="landscape">landscape</option>
              <option value="portrait">portrait</option>
              <option value="squarish">squarish</option>
          </select>
          <ul className='photos-list'>
        <div id='test'></div>
        </ul>
        </div>
      </div>
    )
  }
}

export default App;

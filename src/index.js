import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './components/search_bar';
import YTSearch from 'youtube-api-search';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
import _ from 'lodash';
const API_KEY = 'AIzaSyDLY0ty_ucwsi4BAAPDAUktptv6ULGCvGs';


// Create new component
// Component produces some HTML

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { videos: [], selectedVideo: null };
        this.videoSearch('kate upton');
    }

    videoSearch(term) {
        YTSearch({ key: API_KEY, term: term }, (videos) => {
            this.setState({
                videos: videos, 
                selectedVideo: videos[0]
            });
        });
    }

    render() {
        const videoSearch = _.debounce((term) => {this.videoSearch(term) }, 300)

        return (
            <div>
                <SearchBar onSearchTermChange={videoSearch}/>
                <VideoDetail video={this.state.selectedVideo} />
                <VideoList 
                    onVideoSelect = {selectedVideo => this.setState({selectedVideo})}
                    videos={this.state.videos} />
            </div>);
    }
}

// Take component's HTML and render in the DOM
ReactDOM.render(<App />, document.querySelector('.container'));

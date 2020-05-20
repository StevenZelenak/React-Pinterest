import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

import fbConnection from '../helpers/data/connection';

import './App.scss';

import Auth from '../components/Auth/Auth';
import BoardContainer from '../components/BoardContainer/BoardContainer';
import MyNavBar from '../components/MyNavbar/MyNavbar';
import SingleBoard from '../components/SingleBoard/SingleBoard';

fbConnection();

class App extends React.Component {
  state = {
    authed: false,
    singleBoardId: '',
  }

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authed: true });
      } else {
        this.setState({ authed: false });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  setSingleBoard = (boardId) => {
    this.setState({ singleBoardId: boardId });
  }

  render() {
    const loadComponent = () => {
      let componentToLoad = '';
      if (this.state.authed && this.state.singleBoardId.length === 0) {
        componentToLoad = <BoardContainer setSingleBoard={this.setSingleBoard}/>;
      } else if (this.state.authed && this.state.singleBoardId.length > 0) {
        componentToLoad = <SingleBoard boardId={this.state.singleBoardId} setSingleBoard={this.setSingleBoard}/>;
      } else {
        componentToLoad = <Auth/>;
      }
      return componentToLoad;
    };

    return (
      <div className="App">
        <MyNavBar authed={this.state.authed}/>
        <h1>React Pinterest</h1>
        {loadComponent()}
      </div>
    );
  }
}

export default App;

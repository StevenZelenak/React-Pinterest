import React from 'react';
import PropTypes from 'prop-types';
import './BoardContainer.scss';
import boardsData from '../../helpers/data/boardsData';
import authData from '../../helpers/data/authData';
import Board from '../Board/Board';
import smash from '../../helpers/data/smash';


class BoardContainer extends React.Component {
  static propTypes = {
    setSingleBoard: PropTypes.func.isRequired,
  }

  state = {
    boards: [],
  }

  getAllBoards = () => {
    boardsData.getBoardByUid(authData.getUid())
      .then((boards) => this.setState({ boards }))
      .catch((err) => console.error('unable to get all boards: ', err));
  }

  componentDidMount() {
    this.getAllBoards();
  }

  removeBoard = (boardId) => {
    smash.completelyRemoveBoard(boardId)
      .then(() => this.getAllBoards())
      .catch((err) => console.error('unable to delete full board: ', err));
  }

  render() {
    const { boards } = this.state;
    const makeBoards = boards.map((board) => <Board key={board.id} board={board} setSingleBoard={this.props.setSingleBoard} removeBoard={this.removeBoard}/>);
    return (
      <div className="BoardContainer">
        <h2>Boards</h2>
        <div className="d-flex flex-wrap">
          {makeBoards}
        </div>
      </div>
    );
  }
}

export default BoardContainer;

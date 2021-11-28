import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

const X = 'X', O = 'O', EMPTY = '';
var nums = [' ',' ',' ',' ',' ',' ',' ',' ',' '];
var currentPlayer = X;
var player = EMPTY;
var CPU = EMPTY;
var playerTurn = true;
var matchResult = "GOING";

class App extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div>
        <Board nums={nums}/>
      </div>

    );
  }
}

function getCPUPos(arr){
  var av = [];
  for (var i in arr){
    if (arr[i] === ' '){
      av.push(i);
    }
  }return av[Math.floor(Math.random()*av.length)];
}

function getMatchResult(curr){
  if (nums[0] === curr && nums[1] === curr && nums[2] === curr) return (player === curr ? "Player '" : "CPU '") + nums[2] + "' Win!";
  if (nums[3] === curr && nums[4] === curr && nums[5] === curr) return (player === curr ? "Player '" : "CPU '") + nums[5] + "' Win!";
  if (nums[6] === curr && nums[7] === curr && nums[8] === curr) return (player === curr ? "Player '" : "CPU '") + nums[8] + "' Win!";

  if (nums[0] === curr && nums[3] === curr && nums[6] === curr) return (player === curr ? "Player '" : "CPU '") + nums[6] + "' Win!";
  if (nums[1] === curr && nums[4] === curr && nums[7] === curr) return (player === curr ? "Player '" : "CPU '") + nums[7] + "' Win!";
  if (nums[2] === curr && nums[5] === curr && nums[8] === curr) return (player === curr ? "Player '" : "CPU '") + nums[8] + "' Win!";

  if (nums[0] === curr && nums[4] === curr && nums[8] === curr) return (player === curr ? "Player '" : "CPU '") + nums[8] + "' Win!";
  if (nums[2] === curr && nums[4] === curr && nums[6] === curr) return (player === curr ? "Player '" : "CPU '") + nums[6] + "' Win!";

  for (var i in nums){
    if (nums[i] === ' ') return "GOING";
  }
  return "Match Tied!";
}

class Square extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      val: props.val,
      index: props.index
    }
    this.onPlayerClick = this.onPlayerClick.bind(this);
  }

  onPlayerClick(e){
    if (nums[this.state.index] === ' '){
      this.setState({val: player});
      nums[this.state.index] = player;
      matchResult = getMatchResult(player);
      if (matchResult === 'GOING'){
        nums[getCPUPos(nums)] = CPU;
        matchResult = getMatchResult(CPU);
      }console.log(nums);
    }
    
  }

  render(){

    return (

      <div className='square col' onClick={this.onPlayerClick}>{this.props.val}</div>
    )
  }
}

class ChooseXO extends React.Component{
  constructor(props) {
    super(props);
    this.setPlayer = this.setPlayer.bind(this);
    this.reloadMatch = this.reloadMatch.bind(this);
  }

  reloadMatch(e){
    nums = [' ',' ',' ',' ',' ',' ',' ',' ',' '];
    currentPlayer = X;
    player = EMPTY;
    CPU = EMPTY;
    playerTurn = true;
    matchResult = "GOING";
  }

  setPlayer(e){
    player = e.target.innerText;
    CPU = player === X ? O : X;
    document.getElementById('choose').style.display = 'none';
  }

  render(){
    if (matchResult === 'GOING'){
      return (
      <div className='choose' id='choose'>
        <p>Choose your avatar!</p>
        <div>
        <span onClick={this.setPlayer}>{X}</span>
        <span onClick={this.setPlayer}>{O}</span>
        </div>
      </div>
      )
    }else{
      document.getElementById('choose').style.display = 'block';
      return (
      <div className='choose' id='choose'>
        <h6 id='matchText'>{matchResult}</h6>
        <h5 id='retBtn' onClick={this.reloadMatch}>Retry</h5>
      </div>
      )
    }
    
  }
}

class Board extends React.Component{
  constructor(props) {
    super(props);
    this.state = {  
      nums: props.nums
    }
    this.updateBoard = this.updateBoard.bind(this);
    this.reset = this.reset.bind(this);
  }

  updateBoard(e){
    this.setState({nums: nums});
  }

  reset(e){
    nums = [' ',' ',' ',' ',' ',' ',' ',' ',' '];
    currentPlayer = X;
    player = EMPTY;
    CPU = EMPTY;
    playerTurn = true;
    matchResult = "GOING";
    document.getElementById('choose').style.display = 'block';
  }

  render(){
    return ( 
    <div onClick={this.updateBoard}>
      <ChooseXO />
      <div className='board'>
        <div className='row' style={{marginTop: '-2px'}}>
          <Square index={0} val={this.state.nums[0]} />
          <Square index={1} val={this.state.nums[1]} />
          <Square index={2} val={this.state.nums[2]} />
        </div>
        <div className='row'>
          <Square index={3} val={this.state.nums[3]} />
          <Square index={4} val={this.state.nums[4]} />
          <Square index={5} val={this.state.nums[5]} />
        </div>
        <div className='row'>
          <Square index={6} val={this.state.nums[6]} />
          <Square index={7} val={this.state.nums[7]} />
          <Square index={8} val={this.state.nums[8]} />
        </div>
      </div>
      <div id='reset' onClick={this.reset}>Reset</div>
      <div id='playerAv'>Player: {player}</div>
    </div>
    )
  }
}

ReactDOM.render(<App/>,document.getElementById('root'));
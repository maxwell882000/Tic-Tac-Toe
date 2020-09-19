import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) // creates the button so we can click on it and X or O will appear 
{
    return(
      <button 
      className="square" // to style our button through css
      onClick={props.onClick}
      >
        {props.value} 
      </button>                     
    );
  
}

class Board extends React.Component {
  

  renderSquare(i) {// helper function to reduce code in our application
    return <Square 
    value={this.props.squares[i]}
    onClick={()=>this.props.onClick(i)} 
    />;
  }

  render() {
    
    return (  //creates 3x3 matrix which becomes our board for game 
              // we pass the unique indexes for one button 
      <div>
        <div className="board-row"> 
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}


class Game extends React.Component 
{
  
  constructor(props){  // to inherit proporties  
    super(props);
    this.state = {  //create the state for storing data
      history: [
        {squares: Array(9).fill(null)}, // there we store our X and O
      ],
      stepNumber: 0, // for returning to begining of the game or  to neccessary move 
      xIsNext:true, // alter between X and O 
    }
  }
  
  
  handleClick(i){
    const history = 
    this.state.history.slice(0,  // just copying existing array 
    this.state.stepNumber+1);

    const current = 
    history[history.length-1];
    const squares =
    current.squares.slice();
    
    console.log(squares[i]);
    
    if(calculateWinner(squares))
        {
          return;
        }

    if (!squares[i]){
    squares[i]=this.state.xIsNext ? 'X' : 'O';
    
    this.setState(
      {
        history:  history.concat([ // join array 
          {
            squares:squares,
          }
        ]),
        stepNumber: history.length,
        xIsNext:  !this.state.xIsNext,
      }); 
    }
   }

  
  jumpTo(step)
  {
    this.setState( // when we returning it is choose right step 
      {
        stepNumber: step,
        xIsNext: (step%2)===0,
      }
    )
  }
  
  
  
  render()
  {
    const history = this.state.history; 
    const current =
    history[this.state.stepNumber]; 
    const  winner = 
    calculateWinner(current.squares);

    const moves = history.map((step,move) =>
    {
      const desc = move ? 
      'Go to move # ' + move : 'Go to game start';
      return(
        <li key={move}> 
          <button onClick= {() => 
          this.jumpTo(move)}>{desc}
          </button>
        </li>
      )
    }
    )

    let status;
    if (winner)
    {
      status='Winner : ' + winner;
    }
    else 
    {
      status = 'Next player: '+ 
      (this.state.xIsNext ? 'X': 'O');
    }
    return(
      <div className="game" >
        <div className="game-board" >
          <Board
          squares={current.squares}
          onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
        <div>{status}</div>
    <div> {moves}</div>
        </div>
      </div>
    );
  }
}
 
 ReactDOM.render(
   <Game />,
   document.getElementById('root')
 );
 
 function calculateWinner (squares)
{
  const lines = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
  ];
  for(let i=0;i<lines.length;i++)
  {
    const [a,b,c] = lines[i];
      if(squares[a]&& 
      squares[a]===squares[b]&&
      squares[a]===squares[c])
      {
        return squares[a];
      }
  }
return null;
}  
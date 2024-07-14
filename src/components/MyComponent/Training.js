import {Component} from "react";


export class Training extends Component {
  constructor(props) {
    super(props);
    this.state = {text: '', inputText: '', mode:'view'};
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }
  
  handleChange(e) {
    this.setState({ inputText: e.target.value });
  }
  
  handleSave() {
    this.setState({text: this.state.inputText, mode: 'view'});
  }

  handleEdit() {
    this.setState({mode: 'edit'});
  }
  
  render () {
    const view = this.state.mode === 'view';
    
    return (
      <div>
        <p>Text: {this.state.text}</p>
        
        {
          // view
          // ? null
          // : (
          //   <p>
          //     <input
          //       onChange={this.handleChange}
          //       value={this.state.inputText} />
          //   </p>
          // )
          !view && (
            <p>
                <input
                  onChange={this.handleChange}
                  value={this.state.inputText} />
              </p>
            )
        }
        
        <button
          onClick={
            view 
              ? this.handleEdit 
              : this.handleSave
          }
        >
          {view ? 'Edit' : 'Save'}
        </button>
      </div>
      

    );
  }
}

class Number extends Component {
  constructor(props) {
    super(props);
  }
  
  componentDidUpdate() {
    console.log('componentDidUpdate');
  }
  
  render() {
    if(this.props.number % 2 === 0) {
        return (
            <div>
                <h1>{this.props.number}</h1>
            </div>
        );
    } else {
      return null;
    }
  }
}

export class Mycounter extends Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 }
  }
  
  onClick(e) {
    this.setState(prevState => ({
      count: prevState.count + 1
    }));
  }

  render() {
    return (
      <div>
        <Number number={this.state.count} />
        <button onClick={this.onClick.bind(this)}>Count</button>
      </div>
    )
  }
}


// function Doubler() {
//   const [num, setNum] = React.useState(1);

//   return (
//     <div>
//       <p>{num}</p>
//       <button onClick={() => setNum(num * 2)}>
//         Double
//       </button>
//     </div>
//   );
// }

// function Doubler() {
//   const [num, setNum] = React.useState(1);
//     const showButton = num <= 8;
//     const button = <button onClick={() => setNum(num * 2)}>Double</button>;
  
//     return (
//       <div>
//         <p>{num}</p>
//         {showButton && button}
//       </div>
//     );
//   }

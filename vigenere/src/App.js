import React, { Component } from 'react';
import './App.css';
import {ALPHABET, DECODE, ENCODE, STANDARD, AUTO, FULL, EXTENDED, SUPER} from './constant.js';
import Select from 'react-select';
import Vigenere from './utils/index.js'
import {
  Container, Col,Row,
  Button
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const random = require('random')
const seedrandom = require('seedrandom')

const styles = {
  container: base => ({
    ...base,
    flex: 1
  })
};

const options = [
  { value: STANDARD, label: 'Vigenere Standard' },
  { value: AUTO, label: 'Auto key Vigenere' },
  { value: FULL, label: 'Full vigenere' },
  { value: EXTENDED, label: 'ASCII Vigenere' },
  { value: SUPER, label: 'Custom Vigenere' }
]


function create2DArray(rows, columns, value = (x, y) => 0) {
  var array = new Array(rows);
  for (var i = 0; i < rows; i++) {
    array[i] = new Array(columns);
    for (var j = 0; j < columns; j++) {
      array[i][j] = value(i, j);
    }
  }

  return array;
}



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      key: '',
      output: '',
      choosen:''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleKeyChange = this.handleKeyChange.bind(this);
    this.handleOutputChange = this.handleOutputChange.bind(this);
    this.handleChoosen = this.handleChoosen.bind(this);
    this.encode = this.encode.bind(this);
    this.decode = this.decode.bind(this);

  }
  handleInputChange(event) {
    this.setState({ input: (event.target.value) })
  }
  handleOutputChange(event) {
    this.setState({ output: event.target.value })
  }
  handleKeyChange(event) {
    this.setState({ key: event.target.value })
  }


  handleChoosen = selectedOption => {
    this.setState({
      choosen: selectedOption
    });
  };



  encode() {
    let output;

     if (this.state.choosen.value === AUTO ){

       output = Vigenere.vigenereAuto(this.state.input,this.state.key,ENCODE);
     } else if(this.state.choosen.value === STANDARD ){
      output = Vigenere.vigenereStandard(this.state.input,this.state.key,ENCODE);
     } else {
      output = Vigenere.extendedVigenere(this.state.input,this.state.key,ENCODE);
     }

     this.setState({
      output: output
    })

    }

  decode() {
     let output ="";
     if (this.state.choosen.value === AUTO ){

       output = Vigenere.vigenereAuto(this.state.input,this.state.key,DECODE);
     } else if(this.state.choosen.value === STANDARD ){
      output = Vigenere.vigenereStandard(this.state.input,this.state.key,DECODE);
     } else {
      output = Vigenere.extendedVigenere(this.state.input,this.state.key,DECODE);
     }
     
     this.setState({
      output: output
    })  
    
  }

    render() {
      return (
        <div className="row" style={{ background: '#262626' }}>
            <div className='col-sm-9' style={{ padding: '3rem', minHeight: '100vh', background: 'white', margin: 'auto' }}>
              <h2>Vigenère cipher</h2>
              <Col>
                <div style={{width: '300px'}}>
                  <Select
                          required
                          styles="width: '300px' "
                          value={this.state.choosen}
                          onChange={this.handleChoosen}
                          options={options}

                  />
                </div>
        
              </Col> 
              <p></p>
              
              <Col>
                  <h4>Key:   </h4>
                    <input type="text" id="key" onChange={this.handleKeyChange} />
                </Col>
                <p></p>
              <Col>
              <h4>Text   </h4>
                  <textarea id="input" value={this.state.input} onChange={this.handleInputChange} cols={40} rows={10} className="textarea" />
              </Col>

              <p></p>
              <Row>
                  <Col sm={{ size: 'auto', offset: 1 }}>
                    <Button onClick={this.encode} color="primary">Encode</Button>
                  </Col>
                  <Col sm={{ size: 'auto', offset: 1 }}>
                    <Button onClick={this.decode} color="warning">Decode</Button>
                  </Col>
              </Row>
                <p></p>
                <Col>
                  <p></p>
                  <h4>Result</h4>
                  <p></p>
                    <textarea value={this.state.output} onChange={this.handleOutputChange} cols={80} rows={10} className="textarea" id="output" />
                </Col>
            </div>
          </div>
           

     
      
       
      );
    };
  }
  export default App;
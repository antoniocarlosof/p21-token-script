import Web3 from 'web3';
import { Component } from 'react';
import './App.css';

class App extends Component {
  componentDidMount() {
    this.loadBlockchainData()
  }

  async loadBlockchainData() {
    const web3Connection = new Web3(Web3.givenProvider || "http://localhost:8545")

    const accounts = await web3Connection.eth.getAccounts()
    this.setState({ account: accounts[0]})
  }

  constructor(props) {
    super(props)
    this.state = { 
      account: '',
      loading: true
    }

    this.allowSystem = this.allowSystem.bind(this)
    this.buy = this.buy.bind(this)
    this.offer = this.offer.bind(this)
  }
  
  return (

  );
}

export default App;

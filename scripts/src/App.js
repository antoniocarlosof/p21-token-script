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

    const smartContract = new web3Connection.eth.Contract(TODO_LIST_ABI, TODO_LIST_ADDRESS)
    this.setState({ smartContract })
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
  
  allowSystem(amount){
    this.setState({ loading: true })
    this.state.smartContract.methods.allowSystem(amount).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
  }

  buy(id, amountToBuy){
    this.setState({ loading: true })
    this.state.smartContract.methods.buy(id, amountToBuy).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
  }

  offer(amount, paymentWei){
    this.setState({ loading: true })
    this.state.smartContract.methods.offer(amount, paymentWei).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
  }

  return (

  );
}

export default App;

import Web3 from 'web3';
import { Component } from 'react';
import './App.css';
import offerList from './config.js';

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

    const offers = await smartContract.methods.offerList().call()
    this.setState({ offers })

    this.setState({ loading: false })
  }

  constructor(props) {
    super(props)
    this.state = { 
      account: '',
      offers: [],
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

  render(){  
    return (
      <div>
        <div className='container-fluid'>
          <div className='row'>
            <main role='main' className='col-4 align-self-center justify-content-center'>
              {
                this.state.loading
                ? <div id="loader" className="text-center">
                    <p className="text-center">Loading...</p>
                  </div>
                : <offerList list={this.state.offers} buy={this.buy}/>
              }
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

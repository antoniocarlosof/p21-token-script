import Web3 from 'web3';
import { Component } from 'react';
import { OFFER_LIST_ABI, OFFER_LIST_ADDRESS } from './config.js';

class Sell extends Component{
    componentDidMount() {
        this.loadBlockchainData()
      }
    
      async loadBlockchainData() {
        const web3Connection = new Web3(Web3.givenProvider || "http://localhost:8545")
    
        const accounts = await web3Connection.eth.getAccounts()
        this.setState({ account: accounts[0]})
    
        const smartContract = new web3Connection.eth.Contract(OFFER_LIST_ABI, OFFER_LIST_ADDRESS)
        this.setState({ smartContract })
    
        const balance = await smartContract.methods.balanceOf(this.state.account).call()
        const amountOffered = await smartContract.methods.amountOffered(this.state.account).call()
        this.setState({ balance, amountOffered })
    
        this.setState({ loading: false })
      }
    
      constructor(props) {
        super(props)
        this.state = { 
          account: '',
          amountOffered: '',
          balance: '',
          loading: true
        }

        this.offer = this.offer.bind(this)
      }

      offer(amount, paymentWei){
        this.setState({ loading: true })
        this.state.smartContract.methods.offer(amount, paymentWei).send({ from: this.state.account })
        .once('receipt', (receipt) => {
          this.setState({ loading: false })
        })
      }

      render() {
        return(

        );
      }
}

export default Sell;
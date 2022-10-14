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
        
        const offerCount = await smartContract.methods.offerCount().call()
    
        for(var i = 0; i < offerCount; i++){
          const offer = await smartContract.methods.offerList(i).call()
          if (offer.amountOfTokens > 0){
            this.setState({
              offers: [...this.state.offers, offer]
            })
          }
        }
    
        this.setState({ loading: false })
      }
    
      constructor(props) {
        super(props)
        this.state = { 
          account: '',
          offers: [],
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
            
        )
      }
}

export default Sell;
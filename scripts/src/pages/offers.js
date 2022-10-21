import Web3 from 'web3';
import { Component } from 'react';
import '../App.css';
import OfferList from './offerlist.js';
import { OFFER_LIST_ABI, OFFER_LIST_ADDRESS } from './config.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

class Offers extends Component {
  componentDidMount() {
    this.loadBlockchainData()
  }

  async loadBlockchainData() {
    const web3Connection = new Web3(Web3.givenProvider)

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

    console.log(this.state.offers)

    this.setState({ loading: false })
  }

  constructor(props) {
    super(props)
    this.state = { 
      account: '',
      offers: [],
      loading: true
    }

    this.buy = this.buy.bind(this)
  }

  buy(id, amountToBuy){
    this.setState({ loading: true })
    const web3Connection = new Web3(Web3.givenProvider || "http://localhost:8545")
    const offer = this.state.offers[id]
    const valueDollar = parseInt(amountToBuy)*parseInt(offer.pricePerToken)
    const valueEther = valueDollar/1300
    const valueToSend = web3Connection.utils.toWei(valueEther.toString(), "ether")
    this.state.smartContract.methods.buy(id, amountToBuy).send({ from: this.state.account, value: valueToSend})
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
  }

  render(){  
    return (
      <div>
        <div className='container-fluid'>
          <div className='row mt-4'>
            <main role='main' className='align-self-center justify-content-center'>
              {
                this.state.loading
                ? <div id="loader" className="text-center">
                    <FontAwesomeIcon icon={faSpinner} size='2x'></FontAwesomeIcon>
                  </div>
                : <OfferList offers={this.state.offers} buy={this.buy}/>
              }
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default Offers;
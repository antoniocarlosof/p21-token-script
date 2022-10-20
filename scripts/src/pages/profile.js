import { Component } from 'react';
import Web3 from 'web3';
import { OFFER_LIST_ABI, OFFER_LIST_ADDRESS } from './config.js';

class Profile extends Component {
    componentDidMount() {
        this.loadBlockchainData()
    }
    
    async loadBlockchainData() {
    const web3Connection = new Web3(Web3.givenProvider)

    const accounts = await web3Connection.eth.getAccounts()
    this.setState({ account: accounts[0]})

    const smartContract = new web3Connection.eth.Contract(OFFER_LIST_ABI, OFFER_LIST_ADDRESS)
    this.setState({ smartContract })

    const balance = await smartContract.methods.balanceOf(accounts[0]).call()
    const amountOffered = await smartContract.methods.amountOffered(accounts[0]).call()
    this.setState({ balance, amountOffered })

    const offerCount = await smartContract.methods.offerCount().call()

    for(var i = 0; i < offerCount; i++){
        const offer = await smartContract.methods.offerList(i).call()

        if (offer.amountOfTokens > 0 && offer.owner === accounts[0]){
            this.setState({
                userOffers: [...this.state.userOffers, offer]
            })
        }
    }

    console.log(this.state.userOffers)

    this.setState({ loading: false })
    }

    constructor(props) {
    super(props)
    this.state = { 
        account: '',
        amountOffered: '',
        balance: '',
        userOffers: [],
        loading: true
    }

    //this.offer = this.offer.bind(this)
    }

    render() {
        return(
            <div>
                <div className='container-fluid mt-4'>
                    <div className='col-md-6 offset-md-3'>
                        <h5 className='text-start text-success'>Address: {this.state.account}</h5>
                        <h5 className='text-start text-success'>Balance: {this.state.balance}</h5>
                        <h5 className='text-start text-success'>Offered tokens: {this.state.amountOffered}</h5>
                        
                        <div className='mt-4'>
                            <h4 className='text-center text-success'>My offers</h4>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;
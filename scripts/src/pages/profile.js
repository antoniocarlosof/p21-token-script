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

    //this.offer = this.offer.bind(this)
    }

    render() {
        return(
            <div>
                <div className='container-fluid mt-4'>
                    <div className='col-md-6 offset-md-3'>
                        <h5 className='text-start text-success'>Address: {}</h5>
                        <h5 className='text-start text-success'>Balance: {}</h5>
                        <h5 className='text-start text-success'>Available tokens: {}</h5>
                        <h5 className='text-start text-success'>My offers: {}</h5>
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;
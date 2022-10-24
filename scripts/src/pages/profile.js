import { Component } from 'react';
import Web3 from 'web3';
import '../App.css';
import { OFFER_LIST_ABI, OFFER_LIST_ADDRESS } from './config.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

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

    //console.log(this.state.userOffers)

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

        this.withdraw = this.withdraw.bind(this)
    }

    withdraw(amount) {
        this.setState({ loading: true })
        this.state.smartContract.methods.withdrawOffer(this.state.offer.id, amount)
        .send({ from: this.state.account})
        .once('receipt', (receipt) => {
            this.setState({ loading: false, cancel: false})
        })
    }

    render() {
        return(
            <div>
                <div className='container-fluid mt-4'>
                    <div className='col-md-6 offset-md-3'>
                        <h5 className='text-start text-success'>Address: {this.state.account}</h5>
                        <h5 className='text-start text-success'>Balance: {this.state.balance}</h5>
                        <h5 className='text-start text-success'>Offered tokens: {this.state.amountOffered}</h5>
                        
                        <div className='my-4'>
                            <h4 className='text-center text-success'>My offers</h4>
                        </div>

                        <div className='row'>
                            <div>
                            {
                                this.state.cancel
                                ? <div className='card my-2 border-danger text-danger'>
                                    <div className='card-header bg-transparent border-danger'>
                                        <FontAwesomeIcon icon={faTriangleExclamation} size='lg'></FontAwesomeIcon>
                                    </div>
                                    <div className='card-body'>
                                        <p className='card-text'>You are about to withdraw your offer from the offers list. Do you want to proceed?</p>
                                        <div className='row mb-2'>
                                            <div className='col-auto'>
                                                <p className='card-text text-end'>Withdraw</p>
                                            </div>
                                            <div className='col-auto'>
                                                <input
                                                    type='number'
                                                    className='form-control'
                                                    max={this.state.offer.amountOfTokens}
                                                    min={1}
                                                    onChange={(input) => this.setState({amount: input.target.value})}>
                                                </input>
                                            </div>
                                            <div className='col-auto'>
                                                <p className='card-text text-end'>tokens.</p>
                                            </div>
                                        </div>
                                        <button
                                            type='button'
                                            className='btn btn-outline-danger'
                                            onClick={(event) => this.withdraw(this.state.amount)}>Continue</button>
                                    </div>
                                </div>
                                : <div></div>
                            }
                            </div>
                            {
                            this.state.loading
                            ? <div className='d-flex justify-content-center'>
                                <div id="loader" className="spinner-border text-success" role='status'>
                                    <span class="visually-hidden">Loading...</span>
                                </div>
                            </div>
                            : <table className='table  text-center'>
                                <thead>
                                    <tr className='table-success'>
                                        <th scope='col'>Address</th>
                                        <th scope='col'>Price</th>
                                        <th scope='col'>Amount of tokens</th>
                                        <th scope='col'>#</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.userOffers?.map((offer) => {
                                            return(
                                                <tr>
                                                    <td>{offer.owner}</td>
                                                    <td>{offer.pricePerToken}</td>
                                                    <td>{offer.amountOfTokens}</td>
                                                    <td><button 
                                                        type="button" 
                                                        className="btn btn-danger" 
                                                        onClick={(event) => this.setState({ cancel: true, offer: offer })}>Cancel offer</button></td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;
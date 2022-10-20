import Web3 from 'web3';
import { Component } from 'react';
import { OFFER_LIST_ABI, OFFER_LIST_ADDRESS } from './config.js';
import { Link } from 'react-router-dom';

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

        this.offer = this.offer.bind(this)
      }

      offer(amount, paymentDollar){
        this.setState({ loading: true })
        this.state.smartContract.methods.offer(amount, paymentDollar).send({ from: this.state.account })
        .once('receipt', (receipt) => {
          this.setState({ loading: false })
        })
      }

      render() {
        return(
          <div>
            <div className='container-fluid'>
              <div className='row justify-content-center mt-4'>
                <div className='col-6'>
                  <h5 className='text-start text-success'><em>Address: </em>{this.state.account}</h5>
                  <h5 className='text-start text-success'><em>Balance: </em>{this.state.balance}</h5>
                  <h5 className='text-start text-success'><em>Amount available: </em>{this.state.balance - this.state.amountOffered}</h5>

                  <div className='mt-2'>
                    <h4 className='text-center'><em>Make an offer!</em></h4>

                    <p>Tokens</p>
                    <input
                      type='number'
                      className='form-control'
                      id='tokens'
                      min={1}
                      max={this.state.balance - this.state.amountOffered}
                      onChange={(input) => this.setState({newOffer: input.target.value})}></input>

                    <p>Price per token - USD</p>
                    <input
                      type='number'
                      className='form-control'
                      id='price'
                      min={0}
                      onChange={(input) => this.setState({offerPrice: input.target.value})}></input>

                    <button
                      type='button'
                      className='btn btn-success'
                      onClick={(event) => this.offer(this.state.newOffer, this.state.offerPrice)}>Offer</button>
                      
                    <Link
                      type='button'
                      className='btn btn-danger'
                      to='/'>Voltar</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }
}

export default Sell;
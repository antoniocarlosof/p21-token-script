import { Component } from 'react';
import { Link } from "react-router-dom";

class OfferList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showOffer: false
        }
    }

    render(){
        return(
            <div>
                <div className='row'>
                        <div className='col-6'>
                            <table className='table'>
                                <thead>
                                    <tr className='table-success'>
                                        <th scope='col'>Address</th>
                                        <th scope='col'>Price</th>
                                        <th scope='col'>Tokens available</th>
                                        <th scope='col'>#</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.props.offers?.map((offer) => {
                                            return(
                                                <tr>
                                                    <td>{offer.owner}</td>
                                                    <td>{offer.pricePerToken}</td>
                                                    <td>{offer.amountOfTokens}</td>
                                                    <td><button 
                                                        type="button" 
                                                        className="btn btn-success" 
                                                        onClick={(event) => this.setState({ showOffer: true, offer: offer })}>See offer</button></td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                            <Link
                                type='button'
                                className='btn btn-danger'
                                to='/'>Voltar</Link>
                        </div>
                        <div className='col-6'>
                        {
                            this.state.showOffer
                            ? <div className='m2'>
                                <h5 className='text-start'><em>Address:</em> {this.state.offer.owner}</h5>
                                <h5 className='text-start'><em>Tokens available:</em> {this.state.offer.amountOfTokens}</h5>
                                <h5 className='text-start'><em>Price of each token:</em> {this.state.offer.pricePerToken} USD</h5>
                                <input 
                                    type='number'  
                                    max={this.state.offer.amountOfTokens} 
                                    min={1} 
                                    id='amountToBuy'
                                    onChange={(input) => this.setState({amount: input.target.value})}></input>
                                <button
                                    type='button'
                                    className='btn btn-success'
                                    onClick={(event) => this.props.buy(this.state.offer.id, this.state.amount)}>Buy</button>
                            </div>
                            : <div>Choose an offer</div>
                        }
                        </div>
                </div> 
            </div>  
        );
    }
}

export default OfferList;
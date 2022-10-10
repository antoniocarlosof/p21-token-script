import { Component } from 'react';

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
                <div className='container'>
                    <div className='row'>
                        <div className='col-3'>
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
                                                        onClick={this.setState({ showOffer: true, offer: offer })}>See offer</button></td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                        <div className='col-3'>
                        {
                            this.state.showOffer
                            ? <div className='m2'>
                                <h5 className='text-start'><em>Address:</em> {this.state.offer.owner}</h5>
                                <h5 className='text-start'><em>Tokens available:</em> {this.state.offer.amountOfTokens}</h5>
                                <h5 className='text-start'><em>Price of each token:</em> {this.state.offer.pricePerToken} USD</h5>
                                <input 
                                    type='number' 
                                    value={1} 
                                    max={this.state.offer.amountOfTokens} 
                                    min={1} 
                                    id='amountToBuy'
                                    onChange={(input) => this.amount = input}></input>
                                <button
                                    type='button'
                                    className='btn-success'
                                    onClick={(event) => this.props.buy(this.state.offer.id, this.amount.value)}>Buy</button>
                            </div>
                            : <div></div>
                        }
                        </div>
                    </div>
                </div> 
            </div>  
        );
    }
}

export default OfferList;
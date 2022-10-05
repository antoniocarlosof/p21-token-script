import { Component } from 'react';

class OfferList extends Component {
    render(){
        return(
            <div>
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
                        <tr>
                        {console.log(this.props.offers)}
                        {
                            this.props.offers?.map((offer, key) => {
                                return(
                                    <div key={key}>
                                        <td>{offer.owner}</td>
                                        <td>{offer.pricePerToken}</td>
                                        <td>{offer.amountOfTokens}</td>
                                        <td><button 
                                            type="button" 
                                            className="btn btn-success" 
                                            onClick={(event) => this.props.buy(offer.id, 1)}>Buy</button></td>
                                    </div>
                                )
                            })
                        }
                        </tr>
                    </tbody>
                </table>
            </div>    
        );
    }
}

export default OfferList;
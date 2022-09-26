import { Component } from 'react';

class offerList extends Component {
    render(){
      return(
        <div>
          <table className='table'>
            <thead>
              <tr className='table-success'>
                <th scope='col'>Address</th>
                <th scope='col'>Price</th>
                <th scope='col'>Tokens available</th>
              </tr>
            </thead>
          </table>
        </div>    
      );
    }
}

export default offerList;
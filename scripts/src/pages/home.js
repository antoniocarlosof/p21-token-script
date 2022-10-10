import { Component } from 'react';
import { Link } from "react-router-dom";

class Home extends Component{
    render(){
        return(
            <div className='container-fluid'>
                <div className='row justify-content-center'>
                    <div className='col-4'>
                        <Link
                            type='button'
                            className='btn btn-success'
                            to="/offers">Offers</Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;
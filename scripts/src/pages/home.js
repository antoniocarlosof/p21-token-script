import { Component } from 'react';

class Home extends Component{
    render(){
        return(
            <div className='container-fluid'>
                <div className='row justify-content-center text-center'>
                    <div className='col-4'>
                        <div className='my-5'>
                            <h1 className='text-success'>Welcome to the new era!</h1>
                        </div>
                        <div className='my-5'>
                            <h1 className='text-success'>Welcome to Web3!</h1>
                        </div>
                        <div className='my-5'>
                            <h1 className='text-success'>Welcome to tokenization!</h1>
                        </div>
                    </div>
                </div>
                <div className='row justify-content-center mt-5 text-center'>
                    <a
                        type='button'
                        className='btn btn-success btn-lg'
                        href='https://goerli.etherscan.io/address/0x87569c933d5535a564062be0a223391333f8b4d2'>Check out our smart contract on Etherscan!</a>            
                </div>
            </div>
        )
    }
}

export default Home;
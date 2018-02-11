import React, { Component } from 'react';

import injectWeb3 from '../injectWeb3';
import Loading from '../Loading';

class Coinbase extends Component {
  state = {
    coinbase: null
  };
  async componentWillMount () {
    const { web3 } = this.props;
    try {
      const coinbase = await web3.eth.getCoinbase();
      this.setState({ coinbase });
    } catch (e) {
      this.setState({
        coinbase: `Cannot get coinbase from ${web3.currentProvider.host}`
      });
    }
  }

  render () {
    return <p>Coinbase: {this.state.coinbase}</p>;
  }
}

export default injectWeb3({
  fallbackProvider: 'https://mainnet.infura.io',
  loading: Loading
})(Coinbase);

import React, { Component } from 'react';
import waitForWeb3 from './waitForWeb3';

const injectWeb3 = opts => InnerComponent =>
  class extends Component {
    state = {
      web3: null
    };

    async componentWillMount () {
      const web3 = await waitForWeb3(opts);
      this.setState({ web3 });
    }

    render () {
      const { web3 } = this.state;
      return web3 ? <InnerComponent web3={web3} /> : this.renderLoading();
    }

    renderLoading = () => {
      if (!opts || !opts.loading) return null;
      return <opts.loading />;
    };
  };

export default injectWeb3;

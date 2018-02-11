import React, { Component, isValidElement } from 'react';
import waitForWeb3 from './waitForWeb3';

const injectWeb3 = (opts = {}) => InnerComponent =>
  class extends Component {
    state = {
      web3: null
    };

    async componentWillMount () {
      const web3 = await waitForWeb3();
      this.setState({ web3 });
    }

    render () {
      const { web3 } = this.state;
      return web3 ? <InnerComponent web3={web3} /> : this.renderLoading();
    }

    renderLoading = () => {
      if (!opts.loading) return null;
      if (isValidElement(opts.loading)) return <opts.loading />;
      if (typeof opts.loading === 'function') return opts.loading();
    };
  };

export default injectWeb3;

# react-web3-hoc

React HOC which injects web3 as soon as it's ready.

## Usage

```jsx
import injectWeb3 from 'react-web3-hoc';

@injectWeb3()
export default class MyComponent extends Component {
  state = {
    coinbase: null
  };

  componentWillMount() {
    const { web3 } = this.props;
    web3.eth
      .getCoinbase() // Web3 v1.0 syntax
      .then(coinbase => this.setState({ coinbase }))
      .catch(() =>
        this.setState({
          coinbase: `Cannot get coinbase from ${web3.currentProvider.host}`
        })
      );
  }

  render() {
    return <p>Coinbase: {this.state.coinbase}</p>;
  }
}
```

Or without decorators:

```jsx
import injectWeb3 from 'react-web3-hoc';

class MyComponent extends Component {
  // ... same code as above
}

export default injectWeb3()(MyComponent);
```

This HOC will inject the web3 object as soon as it's loaded, and is available in the wrapped component via `this.props.web3`.

See the `example/` folder for a full app using `react-web3-hoc`.

## Install

```sh
yarn install react-web3-hoc
```

## API

You can pass in options into `injectWeb3`.

```jsx
@injectWeb3(opts)
export default class MyComponent extends Component {
  // ... component code
}
```

`injectWeb3` HOC accepts the following options, all optional.

* `fallbackProvider`, string (default: `'http://localhost:8545'`). The HOC will by default use `new Web3(window.web3.currentProvider)` as web3 instance. If `window.web3` is not present, then it will use `fallbackProvider` via HTTP.
* `loading`, React component or function (default: `null`). The component to show when web3 is not loaded yet.

## Testing

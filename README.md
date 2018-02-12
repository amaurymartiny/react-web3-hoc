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
    // The web3 instance will be available in this.props
    const { web3 } = this.props;
    // We can then do normal web3 api calls
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

## Install

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

## Contributing

### Bugs & Suggestions

Please file an issue if you find a bug while using this library, or if you have any idea on how to improve it.

### Hacking locally

```sh
git clone https://github.com/amaurymartiny/react-web3-hoc
cd react-web3-hoc
yarn install
yarn build --watch
```

The built files will live in the `build/` folder, and will rebuild whenever you modify a file. The `example` folder has a symlink `injectWeb3.js -> /build/`, so you can:

```sh
cd example
yarn install
yarn start
```

And you'll be able to test your code against the example app.

### Testing

All code in `src/` folder is tested, with a 100% coverage. The test framework is Jest, and React components are unit tested with enzyme.

All code is linted with semistandard style.

## License

MIT. See `LICENSE` file.

## Donations

If you like this project, I would really appreciate small donations. Here's my Ethereum address: `0xa395447BF15f7525484C0378c76627D45ADE0B96`.

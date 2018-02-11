# Example app with `react-web3-hoc`

## Getting Started

```sh
# Move to repo root folder
cd /path/to/react-web3-hoc
yarn build

# Go inside example/ folder
cd example/
yarn install
yarn start
```

## How it works

This project has been bootstrapped with `create-react-app`. The `Coinbase` component is wrapped by `react-web3-hoc` HOC, and prints the provider's coinbase as soon as web3 is ready. While web3 is loading, the `Loading` component is shown.

import Web3 from 'web3';

let web3js;

/**
 * Resolve with web3 instance
 * @param {function} resolve Resolve function to call with web3 as argument
 */
const resolveWeb3 = (resolve, opts) => {
  const options = {
    fallbackProvider: 'http://localhost:8545',
    ...opts
  };
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof window.web3 !== 'undefined') {
    // Use Mist/MetaMask's provider
    web3js = new Web3(window.web3.currentProvider);
  } else {
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    web3js = new Web3(
      new Web3.providers.HttpProvider(options.fallbackProvider)
    );
  }
  resolve(web3js);
};

/**
 * Return a promise which resolves with the web3 instance as soon as it's
 * available
 */
const waitForWeb3 = opts =>
  new Promise(resolve => {
    // If our web3js already exists, resolve immediately
    if (web3js) return resolve(web3js);

    // If an instance of web3 exist in window, resolve immediately
    if (typeof window.web3 !== 'undefined') return resolveWeb3(resolve, opts);

    // Wait until window has fully loaded to resolve web3
    // See https://github.com/MetaMask/faq/blob/master/DEVELOPERS.md#partly_sunny-web3---ethereum-browser-environment-check
    window.addEventListener('load', () => resolveWeb3(resolve, opts));
  });

export default waitForWeb3;

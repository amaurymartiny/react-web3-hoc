import Web3 from 'web3';

let web3js;

const waitForWeb3 = () =>
  new Promise((resolve, reject) => {
    // If web3js already exists, resolve immediately
    if (web3js) return resolve(web3js);

    // https://github.com/MetaMask/faq/blob/master/DEVELOPERS.md#partly_sunny-web3---ethereum-browser-environment-check
    window.addEventListener('load', () => {
      // Checking if Web3 has been injected by the browser (Mist/MetaMask)
      if (typeof window.web3 !== 'undefined') {
        // Use Mist/MetaMask's provider
        web3js = new Web3(window.web3.currentProvider);
      } else {
        // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
        web3js = new Web3(new Web3.providers.HttpProvider('http://infura.io'));
      }
      resolve(web3js);
    });
  });

export default waitForWeb3;

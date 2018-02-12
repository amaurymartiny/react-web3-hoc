beforeEach(() => {
  jest.resetModules();
});

it('should use http://localhost:8545 by default', async () => {
  const waitForWeb3 = require('./waitForWeb3').default;
  const web3 = await waitForWeb3();

  expect(web3.currentProvider.host).toBe('http://localhost:8545');
});

it('should handle a fallbackProvider', async () => {
  const waitForWeb3 = require('./waitForWeb3').default;
  const web3 = await waitForWeb3({ fallbackProvider: 'Foo' });

  expect(web3.currentProvider.host).toBe('Foo');
});

describe('when window.web3 is present', () => {
  beforeAll(() => {
    window.web3 = {
      currentProvider: {
        host: 'Bar'
      }
    };
  });

  it('should take provider from injected web3', async () => {
    const waitForWeb3 = require('./waitForWeb3').default;
    const web3 = await waitForWeb3();

    expect(web3.currentProvider.host).toBe('Bar');
  });

  afterAll(() => {
    delete window.web3;
  });
});

describe('when window takes time to load', () => {
  beforeAll(() => {
    Object.defineProperty(document, 'readyState', {
      value: 'loading',
      writable: true
    });
    window.addEventListener = (_, resolve) => setTimeout(resolve, 200);
  });

  it('should wait until window loads and fetch web3', async () => {
    const waitForWeb3 = require('./waitForWeb3').default;
    const web3 = await waitForWeb3();

    expect(web3).not.toBeNull();
  });

  afterAll(() => {
    Object.defineProperty(document, 'readyState', {
      value: 'complete',
      writable: true
    });
    // TODO restore window.addEventListener?
  });
});

describe('when calling multiple times waitForWeb3', () => {
  const waitForWeb3 = require('./waitForWeb3').default;
  let localWeb3;

  beforeAll(() => {
    return waitForWeb3().then(web3 => {
      localWeb3 = web3;
    });
  });

  it('should return the same web3 object upon future call', async () => {
    const web3 = await waitForWeb3();

    expect(web3).toBe(localWeb3);
  });
});

import React, { Component } from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

import injectWeb3 from '../injectWeb3';

const MyComponent = () => <div className='test'>Test</div>;

configure({ adapter: new Adapter() });

describe('when loading', () => {
  // injectWeb3(MyComponent) will by default show the loading component here,
  // because this.state.web3 is initialized to null in the HOC. See 'when
  // loaded' tests to see how to test a loaded MyComponent
  it('should return InnerComponent by default', () => {
    const WrappedComponent = injectWeb3({ fallbackProvider: 'Foo' })(
      MyComponent
    );
    const wrapper = mount(<WrappedComponent />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should return null if loading is specified as null', () => {
    const WrappedComponent = injectWeb3({
      fallbackProvider: 'Foo',
      loading: null
    })(MyComponent);
    const wrapper = mount(<WrappedComponent />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should return the loading function if present', () => {
    const WrappedComponent = injectWeb3({
      fallbackProvider: 'Foo',
      loading: () => <div>loading from function...</div>
    })(MyComponent);
    const wrapper = mount(<WrappedComponent />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should return the loading component if present', () => {
    class Loading extends Component {
      render () {
        return <div>loading from component...</div>;
      }
    }
    const WrappedComponent = injectWeb3({
      fallbackProvider: 'Foo',
      loading: Loading
    })(MyComponent);
    const wrapper = mount(<WrappedComponent />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

describe('when loaded', () => {
  it('should render correctly', async () => {
    const WrappedComponent = injectWeb3({ fallbackProvider: 'Foo' })(
      MyComponent
    );
    const wrapper = mount(<WrappedComponent />);
    await wrapper.instance().componentWillMount();
    wrapper.update();

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should have web3 as props', async () => {
    const WrappedComponent = injectWeb3({ fallbackProvider: 'Foo' })(
      MyComponent
    );
    const wrapper = mount(<WrappedComponent />);
    await wrapper.instance().componentWillMount();
    const InnerComponent = wrapper.update().find(MyComponent);

    expect(InnerComponent.props().web3.currentProvider.host).toBe('Foo');
  });
});

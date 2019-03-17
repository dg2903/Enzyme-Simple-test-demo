import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import App from './App';

Enzyme.configure({
  adapter: new EnzymeAdapter()
});

const setup = (props={}, state = null) => {
  const wrapper = shallow(<App {...props}/>);
  if(state) {
    wrapper.setState(state);
  }
  return wrapper
}

const findByTestAttr = (wrapper, value) => {
  return wrapper.find("[data-test='"+value+"']");
}

test('renders without error', () => {
  const wrapper = shallow(<App/>);
  const appComponent = wrapper.find("[data-test='component-app']");
  // console.log(wrapper.debug()); //print out the component as a string.
  expect(appComponent.length).toBe(1); //if "wrapper" creation has any error, this will fail.
});

test('render increment button', () => {
  const wrapper = setup();
  const button = findByTestAttr(wrapper, "increment-button");
  expect(button.length).toBe(1);
});

test('render coutner display', () => {
  const wrapper = setup();
  const display = findByTestAttr(wrapper, "counter-display");
  expect(display.length).toBe(1);
});

test('counter starts at 0', () => {
  const wrapper = setup();
  const initalCounterState = wrapper.state('counter'); //return a state of the component in wrapper
  expect(initalCounterState).toBe(0);
});

test('clicking increment button increase counter display', () => {
  const counter = 7;
  const wrapper = setup(null, {counter});
  //find the button
  const button = findByTestAttr(wrapper, 'increment-button');
  //click the button then update the component under-test to take in button click event.
  button.simulate('click');
  //find the counter
  const counterDisplay = findByTestAttr(wrapper, 'counter-display');
  expect(counterDisplay.text()).toContain(counter + 1);
});

test('render drecrement button', () => {
  const wrapper = setup();
  const decreamentButton = findByTestAttr(wrapper, "decrement-button");
  expect(decreamentButton.length).toBe(1);
});

test('clicking drecrement button decrease counter display', () => {
  const counter = 5;
  const wrapper = setup(null, {counter});
  const decreamentButton = findByTestAttr(wrapper, 'decrement-button');
  decreamentButton.simulate('click');
  const counterDisplay = findByTestAttr(wrapper, 'counter-display');
  expect(counterDisplay.text()).toContain(counter - 1);
});

test('trying to decrease counter below zero should not be possible', () => {
  const counter = 0;
  const wrapper = setup(null, {counter});
  const decreamentButton = findByTestAttr(wrapper, 'decrement-button');
  decreamentButton.simulate('click');
  const counterDisplay = findByTestAttr(wrapper, 'counter-display');
  expect(counterDisplay.text()).toContain(counter);
});

test('no error message display when counter reaches zero first time', () => {
  const counter = 0;
  const wrapper = setup(null, {counter});
  const errorDisplay = findByTestAttr(wrapper, 'error-display');
  expect(errorDisplay.length).toBe(0);
});

test('no error message display when counter goes from 1 to Zero', () => {
  const counter = 1;
  const wrapper = setup(null, {counter});
  const errorDisplay = findByTestAttr(wrapper, 'error-display');
  const decreamentButton = findByTestAttr(wrapper, 'decrement-button');
  //after this click, counter will reach zero for the first time.
  decreamentButton.simulate('click');
  expect(errorDisplay.length).toBe(0);
});

test('display error message when trying to go pass Zero', () => {
  const counter = 1;
  const wrapper = setup(null, {counter});
  const decreamentButton = findByTestAttr(wrapper, 'decrement-button');
  //after this click, counter will reach zero for the first time.
  decreamentButton.simulate('click');
  //after this click, display error message because we can't go below zero
  decreamentButton.simulate('click');
  const errorDisplay = findByTestAttr(wrapper, 'error-display');
  expect(errorDisplay.length).toBe(1);
});

test('error message dissapear when counter goes above zero', () => {
  const counter = 0;
  const wrapper = setup(null, {counter});
  const incrementButton = findByTestAttr(wrapper, 'increment-button');
  incrementButton.simulate('click');
  const errorDisplay = findByTestAttr(wrapper, 'error-display');
  expect(errorDisplay.length).toBe(0);
});

/* eslint-disable no-undef */
import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import UserProfile from './UserProfile';

configure({ adapter: new Adapter() });

describe('<UserProfile />', () => {
  const props = {
    profile: {
      firstName: '',
      lastName: '',
      company: '',
      department: '',
      position: '',
      email: '',
      isFetching: true,
    },
    handleChange: jest.fn(),
    handleSubmit: jest.fn(),
  };

  it('Should match snapshot', () => {
    const tree = shallow(<UserProfile {...props} />);
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('Should render 6 input tags', () => {
    const wrapper = shallow(<UserProfile {...props} />);
    const inputs = wrapper.find('input');
    expect(inputs.length).toBe(6);
  });

  it('Should work for submit', () => {
    const wrapper = shallow(<UserProfile {...props} />);
    const button = wrapper.find('button');
    button.simulate('click');
    expect(button.props().onClick).toHaveBeenCalledTimes(1);
  });
});

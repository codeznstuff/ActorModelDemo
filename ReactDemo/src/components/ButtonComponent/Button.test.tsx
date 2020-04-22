import React from 'react';
import { cleanup } from '@testing-library/react'
import { Button } from './Button';

import Enzyme, { shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

describe("ButtonComponent", () => {
    let button: ShallowWrapper;
    let mockClick: jest.Mock;
    beforeEach(() => {
        mockClick = jest.fn();
        button = shallow(<Button id="5" value="5" handleClick={mockClick} />)
    });
    it('Button Snapshot should match', () => {
        expect(button.debug()).toMatchSnapshot();
    })
    it('Button should have text equal to the value', () => {
        expect(button.text()).toBe("5");
    });
    it('Should call function on button click', async () => {
        button.simulate('click');
        expect(mockClick).toBeCalled();
    });

    afterEach(cleanup);
})


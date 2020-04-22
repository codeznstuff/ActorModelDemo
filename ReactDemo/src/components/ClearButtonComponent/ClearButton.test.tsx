import React from 'react';
import { cleanup } from '@testing-library/react'
import { ClearButton } from './ClearButton';
import Enzyme, { shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

describe("ClearButtonComponent", () => {
    let button: ShallowWrapper;
    let mockClick: jest.Mock;
    beforeEach(() => {
        mockClick = jest.fn();
        button = shallow(<ClearButton handleClear={mockClick} />);
    });
    it('Button Snapshot should match', () => {
        expect(button.debug()).toMatchSnapshot();
    })
    it('Button should have text equal to CLEAR', () => {
        expect(button.text()).toBe("CLEAR");
    });
    it('Should call function on button click', async () => {
        button.simulate('click')
        expect(mockClick).toBeCalled();
    });
    afterEach(cleanup);
})


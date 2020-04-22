import React from 'react';
import { cleanup } from '@testing-library/react'
import { Input } from './Input';
import Enzyme, { shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

describe("InputComponent", () => {
    let input: ShallowWrapper;
    beforeEach(() => {
        input = shallow(<Input previousInput={"PREVIOUS"} input={"CURRENT"} />);
    });
    it('Input Snapshot should match', () => {
        expect(input.debug()).toMatchSnapshot();
    })
    it('Input should have previous text equal to props', () => {
        expect(input.find('[data-testid="previous"]').text()).toBe("PREVIOUS")
    });
    it('Input should have current text equal to props', () => {
        expect(input.find('[data-testid="current"]').text()).toBe("CURRENT")
    });

    afterEach(cleanup);
})


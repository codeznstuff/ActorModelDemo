import React from 'react';
import { cleanup } from '@testing-library/react'
import Calculator from './Calculator';
import Enzyme, { shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

describe("CalculatorComponent", () => {
    let calc: ShallowWrapper;
    beforeEach(() => {
        calc = shallow(<Calculator />);
    });
    it('Calculator Snapshot should match', () => {
        expect(calc.debug()).toMatchSnapshot();
    })

    afterEach(cleanup);
})


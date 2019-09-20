import React from 'react';
import Main from '../Main.jsx';

const mockProps = {};

describe('Main snapshot', () => {
    it('should render correctly', () => {
        const wrapper = shallow(
            <Main {...mockProps}/>
        );

        expect(wrapper).matchSnapshot();
    });
});
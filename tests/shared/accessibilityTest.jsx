var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React from 'react';
import { mount } from 'enzyme';
import { axe } from 'jest-axe';
// eslint-disable-next-line jest/no-export
export default function accessibilityTest(Component) {
    describe(`accessibility`, () => {
        it(`component does not have any violations`, () => __awaiter(this, void 0, void 0, function* () {
            jest.useRealTimers();
            const wrapper = mount(<Component />);
            const results = yield axe(wrapper.getDOMNode());
            expect(results).toHaveNoViolations();
        }));
    });
}

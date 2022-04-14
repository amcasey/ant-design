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
import { render } from '@testing-library/react';
import { mount } from 'enzyme';
import { sleep } from '../utils';
// eslint-disable-next-line jest/no-export
export default function focusTest(Component, { refFocus = false, testLib = false } = {}) {
    describe('focus and blur', () => {
        let focused = false;
        let blurred = false;
        const mockFocus = jest.spyOn(HTMLElement.prototype, 'focus');
        const mockBlur = jest.spyOn(HTMLElement.prototype, 'blur');
        beforeAll(() => {
            if (refFocus) {
                mockFocus.mockImplementation(() => {
                    focused = true;
                });
                mockBlur.mockImplementation(() => {
                    blurred = true;
                });
            }
        });
        // ==================== React Test Lib ====================
        if (testLib) {
            it('Test: focus() and onFocus', () => {
                const handleFocus = jest.fn();
                const ref = React.createRef();
                const { unmount } = render(<Component onFocus={handleFocus} ref={ref}/>);
                ref.current.focus();
                expect(handleFocus).toHaveBeenCalled();
                unmount();
            });
            it('Test: blur() and onBlur', () => __awaiter(this, void 0, void 0, function* () {
                const handleBlur = jest.fn();
                const ref = React.createRef();
                const { unmount } = render(<Component ref={ref} onBlur={handleBlur}/>);
                ref.current.focus();
                ref.current.blur();
                expect(handleBlur).toHaveBeenCalled();
                unmount();
            }));
            it('Test: autoFocus', () => {
                const handleFocus = jest.fn();
                const { unmount } = render(<Component autoFocus onFocus={handleFocus}/>);
                expect(handleFocus).toHaveBeenCalled();
                unmount();
            });
            return;
        }
        // ======================== Enzyme ========================
        let container;
        beforeEach(() => {
            container = document.createElement('div');
            document.body.appendChild(container);
            focused = false;
            blurred = false;
        });
        afterAll(() => {
            mockFocus.mockRestore();
            mockBlur.mockRestore();
        });
        afterEach(() => {
            document.body.removeChild(container);
        });
        const getElement = (wrapper) => {
            let ele = wrapper.find('input').first();
            if (ele.length === 0) {
                ele = wrapper.find('button').first();
            }
            if (ele.length === 0) {
                ele = wrapper.find('textarea').first();
            }
            if (ele.length === 0) {
                ele = wrapper.find('div[tabIndex]').first();
            }
            return ele;
        };
        if (refFocus) {
            it('Ref: focus() and onFocus', () => {
                const onFocus = jest.fn();
                const ref = React.createRef();
                const wrapper = mount(<div>
            <Component onFocus={onFocus} ref={ref}/>
          </div>);
                ref.current.focus();
                expect(focused).toBeTruthy();
                getElement(wrapper).simulate('focus');
                expect(onFocus).toHaveBeenCalled();
            });
            it('Ref: blur() and onBlur', () => __awaiter(this, void 0, void 0, function* () {
                jest.useRealTimers();
                const onBlur = jest.fn();
                const ref = React.createRef();
                const wrapper = mount(<div>
            <Component onBlur={onBlur} ref={ref}/>
          </div>);
                ref.current.blur();
                expect(blurred).toBeTruthy();
                getElement(wrapper).simulate('blur');
                yield sleep(0);
                expect(onBlur).toHaveBeenCalled();
            }));
            it('Ref: autoFocus', () => {
                const onFocus = jest.fn();
                const wrapper = mount(<Component autoFocus onFocus={onFocus}/>);
                expect(focused).toBeTruthy();
                getElement(wrapper).simulate('focus');
                expect(onFocus).toHaveBeenCalled();
            });
        }
        else {
            it('focus() and onFocus', () => {
                const handleFocus = jest.fn();
                const wrapper = mount(<Component onFocus={handleFocus}/>, { attachTo: container });
                wrapper.instance().focus();
                expect(handleFocus).toHaveBeenCalled();
            });
            it('blur() and onBlur', () => __awaiter(this, void 0, void 0, function* () {
                jest.useRealTimers();
                const handleBlur = jest.fn();
                const wrapper = mount(<Component onBlur={handleBlur}/>, { attachTo: container });
                wrapper.instance().focus();
                yield sleep(0);
                wrapper.instance().blur();
                yield sleep(0);
                expect(handleBlur).toHaveBeenCalled();
            }));
            it('autoFocus', () => {
                const handleFocus = jest.fn();
                mount(<Component autoFocus onFocus={handleFocus}/>, { attachTo: container });
                expect(handleFocus).toHaveBeenCalled();
            });
        }
    });
}

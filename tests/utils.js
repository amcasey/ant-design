var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import MockDate from 'mockdate';
import { act } from 'react-dom/test-utils';
export function setMockDate(dateString = '2017-09-18T03:30:07.795') {
    MockDate.set(dateString);
}
export function resetMockDate() {
    MockDate.reset();
}
const globalTimeout = global.setTimeout;
export const sleep = (timeout = 0) => __awaiter(void 0, void 0, void 0, function* () {
    yield act(() => __awaiter(void 0, void 0, void 0, function* () {
        yield new Promise(resolve => {
            globalTimeout(resolve, timeout);
        });
    }));
});

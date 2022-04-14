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
// Reference: https://github.com/ant-design/ant-design/pull/24003#discussion_r427267386
// eslint-disable-next-line import/no-unresolved
import { configureToMatchImageSnapshot } from 'jest-image-snapshot';
import ReactDOMServer from 'react-dom/server';
import glob from 'glob';
import MockDate from 'mockdate';
import moment from 'moment';
const toMatchImageSnapshot = configureToMatchImageSnapshot({
    customSnapshotsDir: `${process.cwd()}/imageSnapshots`,
    customDiffDir: `${process.cwd()}/imageDiffSnapshots`,
});
expect.extend({ toMatchImageSnapshot });
// eslint-disable-next-line jest/no-export
export default function imageTest(component) {
    it('component image screenshot should correct', () => __awaiter(this, void 0, void 0, function* () {
        yield jestPuppeteer.resetPage();
        yield page.setRequestInterception(true);
        const onRequestHandle = (request) => {
            if (['image'].indexOf(request.resourceType()) !== -1) {
                request.abort();
            }
            else {
                request.continue();
            }
        };
        MockDate.set(moment('2016-11-22').valueOf());
        page.on('request', onRequestHandle);
        yield page.goto(`file://${process.cwd()}/tests/index.html`);
        yield page.addStyleTag({ path: `${process.cwd()}/dist/antd.css` });
        const html = ReactDOMServer.renderToString(component);
        yield page.evaluate(innerHTML => {
            document.querySelector('#root').innerHTML = innerHTML;
        }, html);
        const image = yield page.screenshot();
        expect(image).toMatchImageSnapshot();
        MockDate.reset();
        page.removeListener('request', onRequestHandle);
    }));
}
// eslint-disable-next-line jest/no-export
export function imageDemoTest(component, options = {}) {
    let testMethod = options.skip === true ? describe.skip : describe;
    const files = glob.sync(`./components/${component}/demo/*.md`);
    files.forEach(file => {
        if (Array.isArray(options.skip) && options.skip.some(c => file.includes(c))) {
            testMethod = test.skip;
        }
        testMethod(`Test ${file} image`, () => {
            // eslint-disable-next-line global-require,import/no-dynamic-require
            let Demo = require(`../.${file}`).default;
            if (typeof Demo === 'function') {
                Demo = <Demo />;
            }
            imageTest(Demo);
        });
    });
}

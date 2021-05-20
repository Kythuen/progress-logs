"use strict";
var TestProgressLog = require('../../../src/index');
beforeAll(function () {
    jest.spyOn(console, 'log');
});
describe('progress-log test', function () {
    test('test run default', function () {
        var progressLog = new TestProgressLog();
        expect(progressLog.queue).toHaveLength(0);
        progressLog.add('Linting', 'npm run lint');
        progressLog.add('Bundled created', 'npm run build');
        progressLog.add('Release', 'npm publish');
        expect(progressLog.queue).toHaveLength(3);
        progressLog.start();
        expect(progressLog.queue).toHaveLength(2);
        progressLog.next();
        expect(console.log).toHaveBeenCalledWith(expect.stringMatching(/✔️\[1\/3\] Linting \[npm run lint\]/));
        progressLog.next();
        expect(console.log).toHaveBeenCalledWith(expect.stringMatching(/✔️\[2\/3\] Bundled created \[npm run build\]/));
        progressLog.end(0);
        expect(console.log).toHaveBeenCalledWith(expect.stringMatching(/✔️\[3\/3\] Release \[npm publish\]/));
    });
    test('test run with options', function () {
        var defaultColor = {
            success: 'dim',
            fail: 'red',
            warning: 'yellow'
        };
        var defaultEmoji = {
            success: 'heavy_check_mark',
            fail: 'heavy_multiplication_x',
            warning: 'warning'
        };
        var progressLog = new TestProgressLog({ title: 'Run and Build', record: true, loadingEffect: 18 });
        expect(progressLog.options).toEqual({ title: 'Run and Build', record: true, loadingEffect: 18 });
        progressLog.add('Linting', 'npm run lint', { color: 'cyan', emoji: 'heart' });
        progressLog.add('Bundled created', 'npm run build', { color: { success: 'green', fail: 'yellow' } });
        progressLog.add('Release', 'npm publish');
        expect(progressLog.queue[0].colorData).toEqual(Object.assign({}, defaultColor, { success: 'cyan' }));
        expect(progressLog.queue[0].emojiData).toEqual(Object.assign({}, defaultEmoji, { success: 'heart' }));
        expect(progressLog.queue[1].colorData).toEqual(Object.assign({}, defaultColor, { success: 'green', fail: 'yellow' }));
        expect(progressLog.queue[2].emojiData).toEqual(Object.assign({}, defaultColor, { success: 'green', fail: 'yellow' }));
        // expect(progressLog.queue[1].emojiData).toEqual('yellow')
        // expect(progressLog.queue[1].emojiData.success).toEqual('heavy_check_mark')
        //
        // progressLog.start()
        // expect(progressLog.queue).toHaveLength(2)
        //
        // progressLog.next()
        // expect(console.log).toHaveBeenCalledWith(expect.stringMatching(/✔️\[1\/3\] Linting \[npm run lint\]/))
        //
        // progressLog.next()
        // expect(console.log).toHaveBeenCalledWith(expect.stringMatching(/✔️\[2\/3\] Bundled created \[npm run build\]/))
        //
        // progressLog.end(0)
        // expect(console.log).toHaveBeenCalledWith(expect.stringMatching(/✔️\[3\/3\] Release \[npm publish\]/))
    });
    // let progressLog: any
    // beforeAll(() => {
    //     progressLog = new TestProgressLog({ title: 'Build and Publish', record: true, loadingEffect: 19 })
    // })
    // test('test instance function', () => {
    //     expect(progressLog.add).toBeDefined()
    //     expect(progressLog.start).toBeDefined()
    //     expect(progressLog.next).toBeDefined()
    //     expect(progressLog.end).toBeDefined()
    // })
    // // test('test global config', () => {
    // //     progressLog.setGlobalLogEmoji({
    // //         success: 'heavy_multiplication_x'
    // //     })
    // //     progressLog.setGlobalLogColor({
    // //         success: 'green'
    // //     })
    // // })
    // test('test add log item', () => {
    //     expect(progressLog.queue).toHaveLength(0)
    //     progressLog.add('Linting', 'npm run lint')
    //     expect(progressLog.queue).toHaveLength(1)
    //     progressLog.add('Bundled created', 'npm run build')
    //     progressLog.add('Release', 'npm publish', { color: { success: 'cyan', fail: 'green' } })
    //     progressLog.add('Other', 'other command', { color: 'cyan', emoji: 'heart' })
    //     expect(progressLog.queue).toHaveLength(4)
    // })
    //
    // test('test running', () => {
    //     progressLog.start()
    //     expect(console.log).toHaveBeenCalledWith(expect.stringMatching(/Build and Publish/))
    //     expect(progressLog.queue).toHaveLength(3)
    //     progressLog.next()
    //     expect(console.log).toHaveBeenCalledWith(expect.stringMatching(/❤️\[1\/4\] Linting \[npm run lint\]/))
    //     expect(progressLog.queue).toHaveLength(2)
    //     progressLog.next()
    //     expect(console.log).toHaveBeenCalledWith(expect.stringMatching(/❤️\[2\/4\] Bundled created \[npm run build\]/))
    //     expect(progressLog.queue).toHaveLength(1)
    //     progressLog.next()
    //     expect(console.log).toHaveBeenCalledWith(expect.stringMatching(/✔️\[3\/4\] Release \[npm publish\]/))
    //     expect(progressLog.queue).toHaveLength(0)
    //     progressLog.end(0)
    //     expect(console.log).toHaveBeenCalledWith(expect.stringMatching(/❤️\[4\/4\] Other \[other command\]/))
    //     progressLog.next()
    // })
});

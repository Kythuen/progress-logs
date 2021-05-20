jest.spyOn(console, 'log')
const styles = require('ansi-styles')

const TestProgressLog = require('../../../src/index')

function getColorText(text: string, color: any) {
    return `${styles[color].open}${text}${styles[color].close}`
}

const defaultColor = {
    success: 'dim',
    fail: 'red',
    warning: 'yellow'
}
const defaultEmoji = {
    success: 'heavy_check_mark',
    fail: 'heavy_multiplication_x',
    warning: 'warning'
}

describe('Test for progress', () => {
    test('test construction option', () => {
        const options = { title: 'Run and Build', record: true, loadingEffect: 22 }
        const progressLog = new TestProgressLog(options)
        expect(progressLog.options).toEqual(options)
        expect(progressLog.queue).toHaveLength(0)
        progressLog.start()
        expect(console.log).toHaveBeenCalledWith(expect.stringMatching(/Run and Build/))
        progressLog.end()
        expect(console.log).toHaveBeenCalledWith(expect.stringMatching(/[Done]/))
    })
    test('test run default', () => {
        const progressLog = new TestProgressLog()
        expect(progressLog.queue).toHaveLength(0)
        progressLog.add('Linting', 'npm run lint')
        progressLog.add('Bundled created', 'npm run build')
        progressLog.add('Release', 'npm publish')
        expect(progressLog.queue).toHaveLength(3)

        progressLog.start()
        expect(progressLog.queue).toHaveLength(2)

        progressLog.next()
        expect(console.log).toHaveBeenCalledWith(expect.stringMatching(/✔️\[1\/3\] Linting \[npm run lint\]/))

        progressLog.next()
        expect(console.log).toHaveBeenCalledWith(expect.stringMatching(/✔️\[2\/3\] Bundled created \[npm run build\]/))

        progressLog.end(0)
        expect(console.log).toHaveBeenCalledWith(expect.stringMatching(/✔️\[3\/3\] Release \[npm publish\]/))
    })
    // test('test item options', () => {
    //         const options = { title: 'Run and Build', record: true, loadingEffect: 22 }
    //         const progressLog = new TestProgressLog(options)
    //         expect(progressLog.options).toEqual(options)
    //         expect(progressLog.queue).toHaveLength(0)
    //         progressLog.add('Title0', 'command 0', { color: 'red' })
    //         progressLog.add('Title1', 'command 1', { emoji: 'warning' })
    //         progressLog.add('Title2', 'command 2', { color: 'cyan', emoji: 'heart' })
    //         progressLog.add('Title3', 'command 3', { color: { success: 'green', fail: 'yellow' } })
    //         progressLog.add('Title4', 'command 4', { emoji: { success: 'heart', fail: 'heavy_multiplication_x' } })
    //         progressLog.add('Title5', 'command 5', {
    //             color: { success: 'green', fail: 'yellow' },
    //             emoji: { success: 'heart', fail: 'heavy_multiplication_x' }
    //         })
    //
    //         expect(progressLog.queue[0].colorData).toEqual(Object.assign({}, defaultColor, { success: 'red' }))
    //         expect(progressLog.queue[0].getPrintMessage()).toEqual(getColorText('[0/6] Title0 [command 0]...', 'gray'))
    //         expect(progressLog.queue[0].getPrintMessage(0)).toEqual(getColorText('✔️[0/6] Title0 [command 0]', 'red'))
    //
    //         expect(progressLog.queue[1].emojiData).toEqual(Object.assign({}, defaultEmoji, { success: 'warning' }))
    //         expect(progressLog.queue[1].getPrintMessage()).toEqual(getColorText('[0/6] Title1 [command 1]...', 'gray'))
    //         expect(progressLog.queue[1].getPrintMessage(0)).toEqual(getColorText('⚠️[0/6] Title1 [command 1]', 'dim'))
    //
    //         expect(progressLog.queue[2].colorData).toEqual(Object.assign({}, defaultColor, { success: 'cyan' }))
    //         expect(progressLog.queue[2].emojiData).toEqual(Object.assign({}, defaultEmoji, { success: 'heart' }))
    //         expect(progressLog.queue[2].getPrintMessage()).toEqual(getColorText('[0/6] Title2 [command 2]...', 'gray'))
    //         expect(progressLog.queue[2].getPrintMessage(0)).toEqual(getColorText('❤️[0/6] Title2 [command 2]', 'cyan'))
    //
    //         expect(progressLog.queue[3].colorData).toEqual(Object.assign({}, defaultColor, {
    //             success: 'green',
    //             fail: 'yellow'
    //         }))
    //         expect(progressLog.queue[3].emojiData).toEqual(defaultEmoji)
    //         expect(progressLog.queue[3].getPrintMessage()).toEqual(getColorText('[0/6] Title3 [command 3]...', 'gray'))
    //         expect(progressLog.queue[3].getPrintMessage(0)).toEqual(getColorText('✔️[0/6] Title3 [command 3]', 'green'))
    //
    //         expect(progressLog.queue[4].colorData).toEqual(defaultColor)
    //         expect(progressLog.queue[4].emojiData).toEqual(Object.assign({}, defaultEmoji, {
    //             success: 'heart',
    //             fail: 'heavy_multiplication_x'
    //         }))
    //         expect(progressLog.queue[4].getPrintMessage()).toEqual(getColorText('[0/6] Title4 [command 4]...', 'gray'))
    //         expect(progressLog.queue[4].getPrintMessage(0)).toEqual(getColorText('❤️[0/6] Title4 [command 4]', 'dim'))
    //
    //         expect(progressLog.queue[5].colorData).toEqual(Object.assign({}, defaultColor, {
    //             success: 'green',
    //             fail: 'yellow'
    //         }))
    //         expect(progressLog.queue[5].emojiData).toEqual(Object.assign({}, defaultEmoji, {
    //             success: 'heart',
    //             fail: 'heavy_multiplication_x'
    //         }))
    //         expect(progressLog.queue[5].getPrintMessage()).toEqual(getColorText('[0/6] Title5 [command 5]...', 'gray'))
    //         expect(progressLog.queue[5].getPrintMessage(0)).toEqual(getColorText('❤️[0/6] Title5 [command 5]', 'green'))
    //     })
    describe('test global options', () => {
        test('set with string', () => {
            const progressLog = new TestProgressLog()
            progressLog.setGlobalLogColor('blue')
            progressLog.setGlobalLogEmoji('warning')

            progressLog.add('Title0', 'command 0')
            progressLog.add('Title1', 'command 1')
            progressLog.add('Title2', 'command 2', { color: 'cyan', emoji: 'heart' })
            progressLog.add('Title3', 'command 3', { color: { success: 'green' }, emoji: { success: 'heart' } })

            expect(progressLog.queue[0].colorData).toEqual(Object.assign({}, defaultColor, { success: 'blue' }))
            expect(progressLog.queue[0].getPrintMessage()).toEqual(getColorText('[0/4] Title0 [command 0]...', 'gray'))
            expect(progressLog.queue[0].getPrintMessage(0)).toEqual(getColorText('⚠️[0/4] Title0 [command 0]', 'blue'))

            expect(progressLog.queue[1].emojiData).toEqual(Object.assign({}, defaultEmoji, { success: 'warning' }))
            expect(progressLog.queue[1].getPrintMessage()).toEqual(getColorText('[0/4] Title1 [command 1]...', 'gray'))
            expect(progressLog.queue[1].getPrintMessage(0)).toEqual(getColorText('⚠️[0/4] Title1 [command 1]', 'blue'))

            expect(progressLog.queue[2].colorData).toEqual(Object.assign({}, defaultColor, { success: 'cyan' }))
            expect(progressLog.queue[2].emojiData).toEqual(Object.assign({}, defaultEmoji, { success: 'heart' }))
            expect(progressLog.queue[2].getPrintMessage()).toEqual(getColorText('[0/4] Title2 [command 2]...', 'gray'))
            expect(progressLog.queue[2].getPrintMessage(0)).toEqual(getColorText('❤️[0/4] Title2 [command 2]', 'cyan'))

            expect(progressLog.queue[3].colorData).toEqual(Object.assign({}, defaultColor, { success: 'green' }))
            expect(progressLog.queue[3].emojiData).toEqual(Object.assign({}, defaultEmoji, { success: 'heart' }))
            expect(progressLog.queue[3].getPrintMessage()).toEqual(getColorText('[0/4] Title3 [command 3]...', 'gray'))
            expect(progressLog.queue[3].getPrintMessage(0)).toEqual(getColorText('❤️[0/4] Title3 [command 3]', 'green'))

        })
        test('set with object', () => {
            const progressLog = new TestProgressLog()
            progressLog.setGlobalLogColor({ success: 'blue' })
            progressLog.setGlobalLogEmoji({ success: 'warning' })

            progressLog.add('Title0', 'command 0')
            progressLog.add('Title1', 'command 1')

            expect(progressLog.queue[0].colorData).toEqual(Object.assign({}, defaultColor, { success: 'blue' }))
            expect(progressLog.queue[0].getPrintMessage()).toEqual(getColorText('[0/2] Title0 [command 0]...', 'gray'))
            expect(progressLog.queue[0].getPrintMessage(0)).toEqual(getColorText('⚠️[0/2] Title0 [command 0]', 'blue'))

            expect(progressLog.queue[1].emojiData).toEqual(Object.assign({}, defaultEmoji, { success: 'warning' }))
            expect(progressLog.queue[1].getPrintMessage()).toEqual(getColorText('[0/2] Title1 [command 1]...', 'gray'))
            expect(progressLog.queue[1].getPrintMessage(0)).toEqual(getColorText('⚠️[0/2] Title1 [command 1]', 'blue'))
        })
    })
})
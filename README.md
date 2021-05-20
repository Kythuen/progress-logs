<h1 align="center">Progress Log</h1>

<h4 align="center">Make your Node application running log formatting and clarity</h4>

<div align="center">
  <img alt="Header" src="doc/img/effect.png" width="88%">
</div>

<p align="center">
  <a target="_blank" rel="noopener noreferrer" href="https://camo.githubusercontent.com/8733716e2fd7444a0f383a9e5f43779a016bae35ddde4e1cc32a4f90bd9bb775/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f76657273696f6e2d312e322e332d626c7565"><img src="https://camo.githubusercontent.com/8733716e2fd7444a0f383a9e5f43779a016bae35ddde4e1cc32a4f90bd9bb775/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f76657273696f6e2d312e322e332d626c7565" alt="version" data-canonical-src="https://img.shields.io/badge/version-0.0.1-blue" style="max-width:100%;"></a>
  <a href="https://www.npmjs.com/package/progress-logs">
    <img alt="NPM Downloads" src="https://img.shields.io/npm/dt/progress-log.svg">
  </a>
  <a target="_blank" rel="noopener noreferrer" href="https://camo.githubusercontent.com/a91b4f5528c26920b6b8fa617267a7193a5bddd70a4d013dcf616c91af39fc22/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f636f7665726167652d38302532352d79656c6c6f77677265656e"><img src="https://camo.githubusercontent.com/a91b4f5528c26920b6b8fa617267a7193a5bddd70a4d013dcf616c91af39fc22/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f636f7665726167652d38302532352d79656c6c6f77677265656e" alt="coverage" data-canonical-src="https://img.shields.io/badge/coverage-80%25-yellowgreen" style="max-width:100%;"></a>
  <a href="https://travis-ci.com/klaussinani/progress-logs">
    <img alt="Build Status" src="https://travis-ci.com/kythuen/progress-log.svg?branch=master">
  </a>
</p>

### Translate
[中文文档](doc/md/README_ZH.md)

### Why use progress-log

When developing the node program, the program running log may sometimes be confused and scattered, which can not effectively distinguish.

`progress-log`can make your program log structured and clear. With dynamic loading effect, Emoji expression makes your blog more personalized and meaningful.


### How to use

It is easy to use `progress-log`, and you can add it into the existing code logic and get an effectively logs for your code.


##### 1. Create a progress log queue

```js
const ProgressLog = require('progress-log')

const progressLog = new ProgressLog({
    title: 'Build and publish',
    record: true,
    loadingEffect: 18
})
```

At this time，you can configure the log main title: `title`，either record the time or not: `record`，running effect: `loadingEffect`[default: 18, See here for more](https://github.com/helloIAmPau/node-spinner)。

##### 2. Add specific log items

```js
progressLog.add('Linting', 'npm run lint')
progressLog.add('Bundled created', 'npm run build')
progressLog.add('Release', 'npm publish')
```
Through this list, you can also clearly know the whole process of running the program.

When adding items, you can customize the emoji icon and color of success, warning, and failure for each log item.

See here for available emoji icons and colors： [emoji icons](./doc/json/all_emoji.json)、[colors](https://github.com/chalk/chalk#colors)

```js
// when incoming is string, default to specify the value of success status
progressLog.add('Linting', 'npm run lint', { color: 'green', emoji: 'heart'})

// when incoming is object, you can specify the respective values of success, failure and warning
progressLog.add('Linting', 'npm run lint', {
    color: { success: 'green', warning: 'yellow', error: 'red' },
    emoji: {success: 'heart', warning: 'heavy_multiplication_x', error: 'warning'}
})
```

##### 3. Adding log actions into your code
```js
progressLog.start()   // start the log item
progressLog.next()    // run next log item
progressLog.end(0)    // end with exit code. 0：success 1: fail 2：warning
```


### Customization

##### You can set the global success, warning and failure status emoji icons and colors with the follow method

```js
progressLog.setGlobalLogEmoji({
    success: 'heart',
    fail: 'heavy_multiplication_x'
})
progressLog.setGlobalLogColor({
    success: 'green'
})
```


### Emoji platform support

Due to the inconsistent support of Emoji in various platforms and terminals, it may lead to inconsistent display.

As my main development platform is `Windows`, so I had tried `Webstorm` 和 `VSCode` under `Windows` Platform. Founded that the 'vscode' terminal has better support for Emoji, while the 'webstorm' terminal is relatively poor. So I filter some available icon sets are provided here. You can choose them when you customize them.

[All available emoji icons](./doc/json/all_emoji.json)

[Available emoji icons for win32 webstorm](./doc/json/win32_webstorm_emoji.json)
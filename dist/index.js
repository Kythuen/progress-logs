"use strict";
var chalk = require('chalk');
var nodeEmoji = require('node-emoji');
var Spinner = require('cli-spinner').Spinner;
var total = 0;
var current = 0;
var loadingEffect = 18;
var StopExitCode;
(function (StopExitCode) {
    StopExitCode[StopExitCode["success"] = 0] = "success";
    StopExitCode[StopExitCode["fail"] = 1] = "fail";
    StopExitCode[StopExitCode["warning"] = 2] = "warning";
})(StopExitCode || (StopExitCode = {}));
var ProgressLog = /** @class */ (function () {
    function ProgressLog(options) {
        this.queue = [];
        this.currentLogItem = null;
        this.options = options;
        this.tracker = {
            start: null,
            stop: null
        };
        if ((options === null || options === void 0 ? void 0 : options.loadingEffect) !== undefined) {
            loadingEffect = options.loadingEffect;
        }
    }
    /**
     * Add log item into the log queue
     * @param title: the title of the log item
     * @param command: the command of the log item
     * @param options: the emoji config of the log item
     */
    ProgressLog.prototype.add = function (title, command, options) {
        if (command === void 0) { command = ''; }
        this.queue.push(new ProgressLogItem(title, command, options));
        total++;
    };
    /**
     * Start run the log queue
     */
    ProgressLog.prototype.start = function () {
        var _a, _b;
        if ((_a = this === null || this === void 0 ? void 0 : this.options) === null || _a === void 0 ? void 0 : _a.record) {
            this.startRecord();
        }
        if ((_b = this === null || this === void 0 ? void 0 : this.options) === null || _b === void 0 ? void 0 : _b.title) {
            console.log(chalk.bold.dim(this.options.title));
        }
        this.run();
    };
    /**
     * run next log item in the log queue
     */
    ProgressLog.prototype.next = function () {
        var _a, _b;
        console.log((_a = this.currentLogItem) === null || _a === void 0 ? void 0 : _a.stop);
        (_b = this.currentLogItem) === null || _b === void 0 ? void 0 : _b.stop(StopExitCode.success);
        this.run();
    };
    /**
     * Stop the log queue with exit code
     * @param exitCode exit status code
     */
    ProgressLog.prototype.end = function (exitCode) {
        var _a;
        (_a = this.currentLogItem) === null || _a === void 0 ? void 0 : _a.stop(exitCode);
        this.printRecord(exitCode);
    };
    /**
     * set global log item's emoji
     * @param options: the emoji options eg: { success: 'heart' }
     */
    ProgressLog.prototype.setGlobalLogEmoji = function (options) {
        ProgressLogItem.defaultEmojiOptions = Object.assign({}, ProgressLogItem.defaultEmojiOptions, options);
    };
    /**
     * set global log item's color
     * @param options: the emoji options eg: { success: 'green' }
     */
    ProgressLog.prototype.setGlobalLogColor = function (options) {
        ProgressLogItem.defaultColorOptions = Object.assign({}, ProgressLogItem.defaultColorOptions, options);
    };
    /**
     * Start the time record
     * @private
     */
    ProgressLog.prototype.startRecord = function () {
        if (!this.options.record)
            return;
        this.tracker.start = process.hrtime();
    };
    /**
     * Stop the time record
     * @private
     */
    ProgressLog.prototype.stopRecord = function () {
        if (!this.tracker.start) {
            throw new Error('Make sure to call startRecord before endTracking');
        }
        this.tracker.stop = process.hrtime(this.tracker.start);
    };
    /**
     * Compute the record time and print to console
     * @private
     */
    ProgressLog.prototype.printRecord = function (exitCode) {
        var _a, _b, _c;
        if ((_a = this.options) === null || _a === void 0 ? void 0 : _a.record) {
            this.stopRecord();
            var exitStatement = exitCode !== 0 ? " with exit " + chalk.yellow('code = ' + exitCode) : '';
            console.log(chalk.dim("[Done]" + exitStatement + " in " + chalk.blue(((((_b = this.tracker.stop) === null || _b === void 0 ? void 0 : _b[0]) * 1e9 + ((_c = this.tracker.stop) === null || _c === void 0 ? void 0 : _c[1])) / 1000000000).toFixed(3)) + " seconds"));
        }
    };
    /**
     * Run log queue start the log item
     */
    ProgressLog.prototype.run = function () {
        if (!this.queue.length) {
            this.printRecord();
            return;
        }
        current++;
        this.currentLogItem = this.queue.shift();
        this.currentLogItem.start();
    };
    return ProgressLog;
}());
var ProgressLogItem = /** @class */ (function () {
    function ProgressLogItem(title, command, options) {
        this.title = title;
        this.command = command;
        this.options = options;
        this.colorData = Object.assign({}, ProgressLogItem.defaultColorOptions);
        this.emojiData = Object.assign({}, ProgressLogItem.defaultEmojiOptions);
        this.init();
    }
    /**
     * Start log item
     */
    ProgressLogItem.prototype.start = function () {
        this.spinner = new Spinner(this.getPrintMessage());
        this.spinner.setSpinnerString(loadingEffect);
        this.spinner.start();
    };
    /**
     * Stop log item with exit code
     */
    ProgressLogItem.prototype.stop = function (exitCode) {
        this.spinner.stop(true);
        console.log(this.getPrintMessage(exitCode));
    };
    /**
     * generate print message with exit code
     * @param exitCode: exit status code
     * @private
     */
    ProgressLogItem.prototype.getPrintMessage = function (exitCode) {
        var prefix = this.getEmojiByExitCode(exitCode);
        var progress = "[" + current + "/" + total + "]";
        var message = " " + this.title + " [" + this.command + "]";
        if (exitCode !== undefined) {
            // @ts-ignore
            return chalk[this.colorData[StopExitCode[exitCode]]]("" + prefix + progress + message);
        }
        return chalk.grey("" + prefix + progress + message + "...");
    };
    /**
     * get status emoji by exit code
     * @private
     */
    ProgressLogItem.prototype.getEmojiByExitCode = function (exitCode) {
        if (exitCode === undefined)
            return '';
        // @ts-ignore
        return nodeEmoji.get(this.emojiData[StopExitCode[exitCode]]);
    };
    /**
     * init color and emoji config
     */
    ProgressLogItem.prototype.init = function () {
        if (!this.options)
            return;
        var _a = this.options, color = _a.color, emoji = _a.emoji;
        if (color && typeof color === 'string') {
            this.colorData.success = color;
        }
        else {
            this.colorData = Object.assign({}, this.colorData, color);
        }
        if (emoji && typeof emoji === 'string') {
            this.emojiData.success = emoji;
        }
        else {
            this.emojiData = Object.assign({}, this.emojiData, emoji);
        }
    };
    ProgressLogItem.defaultColorOptions = {
        success: 'dim',
        fail: 'red',
        warning: 'yellow'
    };
    ProgressLogItem.defaultEmojiOptions = {
        success: 'heavy_check_mark',
        fail: 'heavy_multiplication_x',
        warning: 'warning'
    };
    return ProgressLogItem;
}());
module.exports = ProgressLog;

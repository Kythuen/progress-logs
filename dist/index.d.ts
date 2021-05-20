declare const chalk: any;
declare const nodeEmoji: any;
declare const Spinner: any;
interface ProgressLogOptions {
    title?: string;
    record?: boolean;
    loadingEffect?: number;
}
interface ProgressLogItemOptions {
    color?: string | statusOptions;
    emoji?: string | statusOptions;
}
interface statusOptions {
    success: string;
    warning: string;
    fail: string;
}
declare let total: number;
declare let current: number;
declare let loadingEffect: number;
declare enum StopExitCode {
    success = 0,
    fail = 1,
    warning = 2
}
declare class ProgressLog {
    private queue;
    private currentLogItem;
    private tracker;
    private readonly options;
    constructor(options: ProgressLogOptions);
    /**
     * Add log item into the log queue
     * @param title: the title of the log item
     * @param command: the command of the log item
     * @param options: the emoji config of the log item
     */
    add(title: string, command?: string, options?: ProgressLogItemOptions): void;
    /**
     * Start run the log queue
     */
    start(): void;
    /**
     * run next log item in the log queue
     */
    next(): void;
    /**
     * Stop the log queue with exit code
     * @param exitCode exit status code
     */
    end(exitCode: StopExitCode): void;
    /**
     * set global log item's emoji
     * @param options: the emoji options eg: { success: 'heart' }
     */
    setGlobalLogEmoji(options: statusOptions): void;
    /**
     * set global log item's color
     * @param options: the emoji options eg: { success: 'green' }
     */
    setGlobalLogColor(options: statusOptions): void;
    /**
     * Start the time record
     * @private
     */
    private startRecord;
    /**
     * Stop the time record
     * @private
     */
    private stopRecord;
    /**
     * Compute the record time and print to console
     * @private
     */
    private printRecord;
    /**
     * Run log queue start the log item
     */
    private run;
}
declare class ProgressLogItem {
    private readonly title;
    private readonly command;
    private readonly options;
    private spinner;
    private colorData;
    private emojiData;
    static defaultColorOptions: {
        success: string;
        fail: string;
        warning: string;
    };
    static defaultEmojiOptions: {
        success: string;
        fail: string;
        warning: string;
    };
    constructor(title: string, command: string, options?: ProgressLogItemOptions);
    /**
     * Start log item
     */
    start(): void;
    /**
     * Stop log item with exit code
     */
    stop(exitCode: StopExitCode): void;
    /**
     * generate print message with exit code
     * @param exitCode: exit status code
     * @private
     */
    private getPrintMessage;
    /**
     * get status emoji by exit code
     * @private
     */
    private getEmojiByExitCode;
    /**
     * init color and emoji config
     */
    private init;
}

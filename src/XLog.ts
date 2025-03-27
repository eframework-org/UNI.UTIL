// Copyright (c) 2025 EFramework Organization. All rights reserved.
// Use of this source code is governed by a MIT-style
// license that can be found in the LICENSE file.

import { XEnv } from "./XEnv"
import { XString } from "./XString"
import { XTime } from "./XTime"

/**
 * XLog 提供了一个遵循 RFC5424 标准的日志系统，支持多级别输出和内置堆栈追踪。
 * 
 * 功能特性
 * - 支持多级别日志：基于RFC5424标准实现8个严重程度等级
 * - 提供格式化功能：支持使用占位符格式化日志信息
 * - 内置堆栈追踪：支持获取调用堆栈信息
 * 
 * 使用手册
 * 1. 记录不同级别的日志
 * 
 * 1.1 基本用法
 * ```typescript
 * // 记录各种级别的日志
 * XLog.Debug("调试信息");
 * XLog.Info("普通信息");
 * XLog.Notice("需要关注的信息");
 * XLog.Warn("警告信息");
 * XLog.Error("错误信息");
 * XLog.Critical("严重错误");
 * XLog.Alert("需要立即处理的错误");
 * XLog.Emergency("系统不可用");
 * ```
 * 
 * 1.2 使用格式化参数
 * ```typescript
 * // 使用占位符格式化日志
 * XLog.Info("用户 {0} 登录成功，等级: {1}", "张三", 10);
 * XLog.Error("加载文件 {0} 失败: {1}", "config.json", "文件不存在");
 * ```
 * 
 * 2. 异常处理
 * 
 * 2.1 记录异常信息
 * ```typescript
 * try {
 *     // 可能抛出异常的代码
 *     throw new Error("出现未知错误");
 * } catch (error) {
 *     // 输出异常信息
 *     XLog.Panic(error, "处理数据时出错");
 * }
 * ```
 * 
 * 2.2 获取堆栈信息
 * ```typescript
 * // 获取当前调用堆栈
 * const stackTrace = XLog.Trace();
 * XLog.Debug("当前堆栈: " + stackTrace);
 * 
 * // 指定堆栈层级和错误信息
 * const customTrace = XLog.Trace(1, "自定义错误");
 * XLog.Debug("自定义堆栈: " + customTrace);
 * ```
 * 
 * 3. 日志级别定义
 * 
 * 3.1 LevelType枚举
 * ```typescript
 * enum LevelType {
 *     Emergency = 0, // 紧急：系统不可用
 *     Alert = 1,     // 警报：需要立即采取行动
 *     Critical = 2,  // 严重：严重故障
 *     Error = 3,     // 错误：一般错误
 *     Warn = 4,      // 警告：潜在问题
 *     Notice = 5,    // 通知：重要但正常的情况
 *     Info = 6,      // 信息：一般信息
 *     Debug = 7      // 调试：调试信息
 * }
 * ```
 * 
 * 更多信息请参考模块文档。
 */
export namespace XLog {
    /**
     * 日志等级。
     * 基于 RFC5424 标准，包含结构化数据格式。
     * 指定了八个严重程度等级，用于表示记录事件的严重性或紧急程度。
     */
    export enum LevelType {
        /** 紧急（0）：系统不可用，通常用于灾难性故障。 */
        Emergency = 0,

        /** 警报（1）：必须立即采取行动，指示需要立即注意的情况。 */
        Alert = 1,

        /** 严重（2）：严重条件，指示需要立即注意的严重故障。 */
        Critical = 2,

        /** 错误（3）：错误条件，指示应该解决的错误。 */
        Error = 3,

        /** 警告（4）：警告条件，指示潜在问题，如果不解决可能会导致错误。 */
        Warn = 4,

        /** 通知（5）：正常但重要的情况，指示值得注意但不一定有问题的事件。 */
        Notice = 5,

        /** 信息（6）：信息消息，用于系统操作的一般信息。 */
        Info = 6,

        /** 调试（7）：调试级别的消息，用于调试和故障排除目的的消息。 */
        Debug = 7,
    }

    function anisBrush(color: string) {
        const pre = "\x1b["
        const reset = "\x1b[0m"
        return (text: string) => pre + color + "m" + text + reset
    }

    const ansiBrushes: Array<(text: string) => string> = [
        anisBrush("1;39"), // Emergency          black
        anisBrush("1;36"), // Alert              cyan
        anisBrush("1;35"), // Critical           magenta
        anisBrush("1;31"), // Error              red
        anisBrush("1;33"), // Warn               yellow
        anisBrush("1;32"), // Notice             green
        anisBrush("1;30"), // Info               grey
        anisBrush("1;34"), // Debug              blue
    ]

    function unityBrush(color: string) {
        return (text: string) => `<color=${color}><b>${text}</b></color>`
    }

    const unityBrushes: Array<(text: string) => string> = [
        unityBrush("black"), // Emergency
        unityBrush("cyan"), // Alert
        unityBrush("magenta"), // Critical
        unityBrush("red"), // Error
        unityBrush("yellow"), // Warn
        unityBrush("green"), // Notice
        unityBrush("grey"), // Info
        unityBrush("blue"), // Debug
    ]

    function htmlBrush(color: string) {
        return (text: string) => `<p style="color: ${color};><b>${text}</b></p>`
    }

    const htmlBrushes: Array<(text: string) => string> = [
        htmlBrush("black"), // Emergency
        htmlBrush("cyan"), // Alert
        htmlBrush("magenta"), // Critical
        htmlBrush("red"), // Error
        htmlBrush("yellow"), // Warn
        htmlBrush("grey"), // Notice
        htmlBrush("green"), // Info
        htmlBrush("blue"), // Debug
    ]

    const logLabels: Array<string> = [
        "[M]",
        "[A]",
        "[C]",
        "[E]",
        "[W]",
        "[N]",
        "[I]",
        "[D]",
    ]

    /**
     * 日志管道（VSCode）。
     */
    var vscodeChannel: any = null

    /**
     * 异常输出。
     * 
     * @param exception 异常信息。
     * @param extras 附加信息。
     */
    export function Panic(exception: Error, extras?: string) {
        console.error(exception, extras)
    }

    /**
     * 紧急（0）：系统不可用，通常用于灾难性故障。
     * 
     * @param data 日志内容。
     * @param args 格式参数。
     */
    export function Emergency(data: any, ...args: any[]) {
        Print(data, LevelType.Emergency, args)
    }

    /**
     * 警报（1）：必须立即采取行动，指示需要立即注意的情况。
     * 
     * @param data 日志内容。
     * @param args 格式参数。
     */
    export function Alert(data: any, ...args: any[]) {
        Print(data, LevelType.Alert, args)
    }

    /**
     * 严重（2）：严重条件，指示需要立即注意的严重故障。
     * 
     * @param data 日志内容。
     * @param args 格式参数。
     */
    export function Critical(data: any, ...args: any[]) {
        Print(data, LevelType.Critical, args)
    }

    /**
     * 记录错误级别日志。
     * 
     * @param data 日志内容。
     * @param args 格式参数。
     * @example
     * ```typescript
     * XLog.Error("Failed to load file: {0}", filename);
     * ```
     */
    export function Error(data: any, ...args: any[]) {
        Print(data, LevelType.Error, args)
    }

    /**
     * 记录警告级别日志。
     * 
     * @param data 日志内容。
     * @param args 格式参数。
     * @example
     * ```typescript
     * XLog.Warn("Memory usage high: {0}%", memoryUsage);
     * ```
     */
    export function Warn(data: any, ...args: any[]) {
        Print(data, LevelType.Warn, args)
    }

    /**
     * 通知（5）：正常但重要的情况，指示值得注意但不一定有问题的事件。
     * 
     * @param data 日志内容。
     * @param args 格式参数。
     */
    export function Notice(data: any, ...args: any[]) {
        Print(data, LevelType.Notice, args)
    }

    /**
     * 记录信息级别日志。
     * 
     * @param data 日志内容。
     * @param args 格式参数。
     * @example
     * ```typescript
     * XLog.Info("Application started, version: {0}", version);
     * ```
     */
    export function Info(data: any, ...args: any[]) {
        Print(data, LevelType.Info, args)
    }

    /**
     * 记录调试级别日志。
     * 
     * @param data 日志内容。
     * @param args 格式参数。
     * @example
     * ```typescript
     * XLog.Debug("Processing item {0} of {1}", current, total);
     * ```
     */
    export function Debug(data: any, ...args: any[]) {
        Print(data, LevelType.Debug, args)
    }

    const isUnityEditor: boolean = XEnv.IsUnity ? CS.UnityEngine.Application.isEditor : false
    const unityLogRegex = /at ([a-zA-Z0-9#$._ ]+ \()?([^\n\r\*\"\|\<\>]+(.js|.cjs|.mjs|.ts|.mts))\:([0-9]+)\:([0-9]+)\)?/g

    function genUnityLink(trace: string[]) {
        for (let i = 0; i < trace.length; i++) {
            unityLogRegex.lastIndex = 0 // 此处未考虑多线程的情况，是否有该使用场景待论证后补充
            const match = unityLogRegex.exec(trace[i])
            if (!match) continue
            const path = match[2], line = match[4] ?? "0", column = match[5] ?? "0"
            const search = `${path}:${line}:${column}`
            const npath = path.replace(/\\\\/g, "/").replace(/\\/g, "/")
            const nsearch = `${npath}:${line}:${column}`
            trace[i] = trace[i].replace(search, `<a href="${npath}" line="${line}" column="${column}">${nsearch}</a>`)
        }
    }

    /**
     * 处理日志。
     * 
     * @param fmt 日志格式。
     * @param level 日志等级。
     * @param args 格式化参数。
     */
    export function Print(fmt: any, level: LevelType, ...args: Array<any>) {
        try {
            if (!(fmt instanceof Boolean) && fmt) {
                const tm = XTime.Format(new Date(), "MM/dd hh:mm:ss.SSS")
                const fstr = `${typeof fmt == "string" ? XString.Format(fmt, args) : fmt}`
                if (XEnv.IsBrowser || XEnv.IsCocos) {
                    // VSCode Debug Console 和 Cocos Preview Editor不支持 ANSI 转义
                    // 浏览器支持 ANSI 转义
                    // 但是为了统一化，对level不作着色处理
                    const lstr = `[${tm}] ${logLabels[level]} ${fstr}`
                    if (level <= LevelType.Error) console.error(lstr)
                    else console.info(lstr)
                } else if (XEnv.IsCode) {
                    // VSCode Output Channel 不支持 ANSI 转义
                    const lstr = `[${tm}] ${logLabels[level]} ${fstr}`
                    if (vscodeChannel == null) {
                        const vscode = require("vscode")
                        vscodeChannel = vscode.window.createOutputChannel(XEnv.Product, { log: true })
                    }
                    if (level <= LevelType.Error) vscodeChannel.error(lstr)
                    else vscodeChannel.info(lstr)
                } else if (XEnv.IsNode) {
                    const lstr = `[${tm}] ${ansiBrushes[level](logLabels[level])} ${fstr}`
                    if (level <= LevelType.Error) console.error(lstr)
                    else console.info(lstr)
                } else if (XEnv.IsUnity) {
                    let lstr = `[${tm}] ${unityBrushes[level](logLabels[level])} ${fstr}`
                    if (isUnityEditor) {
                        const trace: string[] = new globalThis.Error().stack?.replace(/\r\n/g, "\n").split("\n").slice(2)
                        if (trace && trace.length > 0) {
                            genUnityLink(trace)
                            lstr += "\n" + trace.join("\n")
                        }
                    }
                    if (level <= LevelType.Error) CS.UnityEngine.Debug.LogError(lstr)
                    else CS.UnityEngine.Debug.Log(lstr)
                } else if (XEnv.IsUnreal) {
                    // todo
                }
            }
        } catch (error) { }
    }

    /**
     * 获取堆栈信息。
     * 
     * @param stack 堆栈层级。
     * @param err 错误信息。
     * @returns 堆栈信息。
     */
    export function Trace(stack?: number, err?: string): string {
        const trace: string[] = new globalThis.Error(err).stack?.replace(/\r\n/g, "\n").split("\n").slice(2 + (stack != null ? stack : 0))
        if (trace && trace.length > 0) {
            return trace.join("\n")
        }
        return ""
    }
}
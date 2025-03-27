// Copyright (c) 2025 EFramework Organization. All rights reserved.
// Use of this source code is governed by a MIT-style
// license that can be found in the LICENSE file.

/**
 * XUtility 提供了一组通用工具集，支持UUID生成、可执行文件查找和随机数生成等常用操作。
 * 
 * 功能特性
 * - UUID生成：符合RFC4122 v4标准的UUID生成
 * - 进程执行：提供配置子进程执行环境的选项
 * - 文件查找：在系统PATH和自定义路径中查找可执行文件
 * - 随机数生成：支持生成指定范围内的随机整数
 * 
 * 使用手册
 * 1. UUID生成
 * 
 * 1.1 基本用法
 * ```typescript
 * const uuid = XUtility.GenUUID(); // "550e8400-e29b-41d4-a716-446655440000"
 * ```
 * 
 * 2. 进程执行选项
 * 
 * 2.1 基本用法
 * ```typescript
 * const options = XUtility.ExecOpt("./project");
 * require("child_process").exec("npm install", options);
 * ```
 * 
 * 2.2 选项配置说明
 * - encoding: "utf8"
 * - timeout: 0（无超时限制）
 * - maxBuffer: 1GB
 * - killSignal: "SIGTERM"
 * - cwd: 指定的工作目录
 * - env: 继承自当前进程的环境变量
 * 
 * 3. 查找可执行文件
 * 
 * 3.1 基本用法
 * ```typescript
 * const gitPath = XUtility.FindBin("git", "C:/Program Files/Git/bin");
 * if (gitPath) {
 *     console.log("Git found at:", gitPath);
 * }
 * ```
 * 
 * 3.2 平台特性
 * - 在Windows系统上，会自动尝试查找带`.exe`和`.bat`扩展名的文件
 * - 支持在系统PATH和自定义路径中查找
 * 
 * 4. 随机数生成
 * 
 * 4.1 基本用法
 * ```typescript
 * const roll = XUtility.RandomRange(1, 6); // 生成1到6之间的随机数（骰子）
 * const percent = XUtility.RandomRange(0, 100); // 生成0到100之间的随机数（百分比）
 * ```
 * 
 * 更多信息请参考模块文档。
 */
export namespace XUtility {
    /**
     * 生成 UUID。
     * 生成符合 RFC4122 v4 标准的 UUID。
     * 
     * @returns 生成的 UUID 字符串。
     * @example
     * ```typescript
     * const uuid = XUtility.GenUUID(); // "550e8400-e29b-41d4-a716-446655440000"
     * ```
     */
    export function GenUUID(): string {
        let date = new Date().getTime()
        let uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
            let r = (date + Math.random() * 16) % 16 | 0
            date = Math.floor(date / 16)
            return (c == "x" ? r : (r & 0x3 | 0x8)).toString(16)
        })
        return uuid
    }

    /**
     * 生成进程执行选项。
     * 用于配置子进程的执行环境和参数。
     * 
     * @param cwd 工作目录路径。
     * @returns 进程执行选项对象。
     * @example
     * ```typescript
     * const options = XUtility.ExecOpt("./project");
     * require("child_process").exec("npm install", options);
     * ```
     */
    export function ExecOpt(cwd: string): any {
        return {
            encoding: "utf8",
            timeout: 0,
            maxBuffer: 1024 * 1024 * 1024,
            killSignal: "SIGTERM",
            cwd: cwd,
            env: process.env
        }
    }

    /**
     * 查找可执行文件。
     * 在系统 PATH 和指定目录中查找可执行文件。
     * 
     * @param cmd 可执行文件名。
     * @param extras 附加搜索路径列表。
     * @returns 可执行文件的完整路径，如果未找到则返回 null。
     * @example
     * ```typescript
     * const gitPath = XUtility.FindBin("git", "C:/Program Files/Git/bin");
     * if (gitPath) {
     *     console.log("Git found at:", gitPath);
     * }
     * ```
     */
    export function FindBin(cmd: string, ...extras: string[]): string {
        const path = require("path")
        const fs = require("fs")

        const names = process.platform == "win32" ? [cmd + ".exe", cmd + ".bat"] : [cmd]

        const env = process.env.PATH || ""
        const paths = env.split(path.delimiter)
        for (const part of paths) {
            for (const name of names) {
                const file = path.join(part, name)
                if (fs.existsSync(file) && fs.statSync(file).isFile()) {
                    return file
                }
            }
        }
        if (extras && extras.length > 0) {
            for (const extra of extras) {
                for (const name of names) {
                    const file = path.join(extra, name)
                    if (fs.existsSync(file) && fs.statSync(file).isFile()) {
                        return file
                    }
                }
            }
        }
        return null
    }

    /**
     * 生成指定范围内的随机整数。
     * 包含最小值和最大值。
     * 
     * @param min 最小值（闭区间）。
     * @param max 最大值（闭区间）。
     * @returns 生成的随机整数。
     * @example
     * ```typescript
     * const roll = XUtility.RandomRange(1, 6); // 生成1到6之间的随机数
     * const percent = XUtility.RandomRange(0, 100); // 生成0到100之间的随机数
     * ```
     */
    export function RandomRange(min: number, max: number): number {
        return parseInt((Math.random() * (max - min + 1) + min).toString(), 10)
    }
}
// Copyright (c) 2025 EFramework Organization. All rights reserved.
// Use of this source code is governed by a MIT-style
// license that can be found in the LICENSE file.

/**
 * 通用工具：UUID生成、进程执行、随机数等。
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
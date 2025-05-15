// Copyright (c) 2025 EFramework Organization. All rights reserved.
// Use of this source code is governed by a MIT-style
// license that can be found in the LICENSE file.

import { XEnv } from "./XEnv"

/**
 * XString 提供了字符串处理工具集，支持查找、替换、格式化以及编码转换等功能。
 * 
 * 功能特性
 * - 支持字符串基本操作：判空、查找、截取、分割等常用功能
 * - 提供字符串匹配检测：包含、前缀、后缀检查
 * - 实现字符串格式化：使用占位符进行文本格式化
 * - 提供编码转换：Base64 编码解码、文本与二进制互转
 * 
 * 使用手册
 * 1. 字符串基本操作
 * 
 * 1.1 判空与检查
 * ```typescript
 * // 检查字符串是否为空
 * XString.IsNullOrEmpty("");      // true
 * XString.IsNullOrEmpty(null);    // true
 * XString.IsNullOrEmpty("hello"); // false
 * 
 * // 字符串常量
 * const emptyStr = XString.Empty; // 空字符串
 * ```
 * 
 * 1.2 查找与索引
 * ```typescript
 * // 查找子字符串位置
 * XString.IndexOf("hello world", "world");   // 返回 6
 * XString.LastIndexOf("hello.world.js", "."); // 返回 10
 * 
 * // 检查是否包含子字符串
 * XString.Contains("hello world", "world");   // true
 * XString.Contains("hello world", "xyz");     // false
 * ```
 * 
 * 1.3 截取与分割
 * ```typescript
 * // 截取子字符串
 * XString.Sub("hello world", 0, 5);  // 返回 "hello"
 * 
 * // 分割字符串
 * XString.Split("a,b,c", ",");       // 返回 ["a", "b", "c"]
 * XString.Split("hello world", " ");  // 返回 ["hello", "world"]
 * ```
 * 
 * 2. 字符串处理
 * 
 * 2.1 修饰与替换
 * ```typescript
 * // 去除首尾空格
 * XString.Trim("  hello  ");  // 返回 "hello"
 * 
 * // 替换字符串
 * XString.Replace("hello world", "world", "universe");  // 返回 "hello universe"
 * ```
 * 
 * 2.2 前缀后缀检查
 * ```typescript
 * // 检查前缀
 * XString.StartsWith("hello world", "hello");  // true
 * XString.StartsWith("hello world", "world");  // false
 * 
 * // 检查后缀
 * XString.EndsWith("hello world", "world");    // true
 * XString.EndsWith("hello world", "hello");    // false
 * ```
 * 
 * 3. 字符串格式化
 * 
 * 3.1 使用占位符格式化
 * ```typescript
 * // 简单替换
 * XString.Format("Hello {0}!", "world");            // 返回 "Hello world!"
 * 
 * // 多参数替换
 * XString.Format("{0} + {1} = {2}", 1, 2, 3);       // 返回 "1 + 2 = 3"
 * 
 * // 复杂对象格式化
 * const user = { name: "张三" };
 * XString.Format("用户: {0}", user);                // 返回 "用户: [object Object]"
 * ```
 * 
 * 4. 版本号处理
 * 
 * 4.1 版本号转换
 * ```typescript
 * // 字符串版本号转为数字
 * XString.ToVersion("1.2.3");    // 返回数字表示
 * XString.ToVersion("v1.2");     // 同样可以处理
 * 
 * // 数字版本号转为字符串
 * XString.FromVersion(10203);    // 返回 "1.2.3"
 * ```
 * 
 * 5. 编码转换
 * 
 * 5.1 Base64编码
 * ```typescript
 * // 文本转Base64
 * XString.ToBase64("Hello");     // 返回 "SGVsbG8="
 * 
 * // Base64解码
 * XString.FromBase64("SGVsbG8="); // 返回 "Hello"
 * ```
 * 
 * 5.2 二进制转换
 * ```typescript
 * // 字符串转ArrayBuffer
 * const buffer = XString.ToBuffer("Hello");
 * 
 * // ArrayBuffer转字符串
 * const text = XString.FromBuffer(buffer);  // 返回 "Hello"
 * ```
 * 
 * 更多信息请参考模块文档。
 */
export namespace XString {
    /**
     * 空字符串。
     */
    export const Empty: string = ""

    /**
     * 判断字符串是否为空。
     * 
     * @param str 要检查的字符串。
     * @returns 如果字符串为 null、undefined 或空字符串返回 true。
     * @example
     * ```typescript
     * XString.IsNullOrEmpty(""); // true
     * XString.IsNullOrEmpty(null); // true
     * XString.IsNullOrEmpty("hello"); // false
     * ```
     */
    export function IsNullOrEmpty(str: string): boolean {
        return !str || str === ""
    }

    /**
     * 字符串索引。
     * 
     * @param str 源字符串。
     * @param sub 要查找的子字符串。
     * @returns 子字符串的索引，如果未找到返回 -1。
     * @example
     * ```typescript
     * XString.IndexOf("hello world", "world"); // 返回 6
     * XString.IndexOf("hello world", "xyz"); // 返回 -1
     * ```
     */
    export function IndexOf(str: string, sub: string): number {
        if (IsNullOrEmpty(str) == false && IsNullOrEmpty(sub) == false) {
            return str.indexOf(sub)
        }
        return -1
    }

    /**
     * 查找子字符串最后一次出现的位置。
     * 
     * @param str 源字符串。
     * @param sub 要查找的子字符串。
     * @returns 子字符串最后一次出现的索引，如果未找到返回 -1。
     * @example
     * ```typescript
     * XString.LastIndexOf("hello.world.js", "."); // 返回 10
     * XString.LastIndexOf("hello world", "o"); // 返回 7
     * ```
     */
    export function LastIndexOf(str: string, sub: string): number {
        if (IsNullOrEmpty(str) == false && IsNullOrEmpty(sub) == false) {
            return str.lastIndexOf(sub)
        }
        return -1
    }

    /**
     * 截取字符串的一部分。
     * 
     * @param str 源字符串。
     * @param start 起始位置。
     * @param end 结束位置（不包含）。
     * @returns 截取的子字符串。
     * @example
     * ```typescript
     * XString.Sub("hello world", 0, 5); // 返回 "hello"
     * ```
     */
    export function Sub(str: string, from: number, to: number): string {
        if (IsNullOrEmpty(str) == false) {
            return str.substring(from, to)
        }
        return null
    }

    /**
     * 字符串替换。
     * 
     * @param str 字符串实例。
     * @param from 源字符串。
     * @param to 目标字符串。
     * @returns 替换后的字符串。
     */
    export function Replace(str: string, from: string, to: string): string {
        if (IsNullOrEmpty(str) == false && IsNullOrEmpty(from) == false) {
            return str.replace(new RegExp(from, "gm"), to)
        }
        return str
    }

    /**
     * 字符串裁剪。
     * 
     * @param str 字符串实例。
     * @returns 裁剪后的字符串。
     */
    export function Trim(str: string): string {
        if (IsNullOrEmpty(str) == false) {
            return str.trim()
        }
        return str
    }

    /**
     * 字符串分割。
     * 
     * @param str 源字符串。
     * @param sep 分隔符。
     * @returns 分割后的子字符串数组。
     * @example
     * ```typescript
     * XString.Split("a,b,c", ","); // 返回 ["a", "b", "c"]
     * XString.Split("hello world", " "); // 返回 ["hello", "world"]
     * ```
     */
    export function Split(str: string, sep: string): string[] {
        if (IsNullOrEmpty(str) == false && IsNullOrEmpty(sep) == false) {
            return str.split(sep)
        }
        return null
    }

    /**
     * 字符串是否包含。
     * 
     * @param str 源字符串。
     * @param sub 要查找的子字符串。
     * @returns 是否包含指定的子字符串。
     * @example
     * ```typescript
     * XString.Contains("hello world", "world"); // 返回 true
     * XString.Contains("hello world", "xyz"); // 返回 false
     * ```
     */
    export function Contains(str: string, sub: string): boolean {
        return IndexOf(str, sub) >= 0
    }

    /**
     * 字符串头部匹配。
     * 
     * @param str 源字符串。
     * @param prefix 前缀字符串。
     * @returns 是否以指定字符串开头。
     * @example
     * ```typescript
     * XString.StartsWith("hello world", "hello"); // 返回 true
     * XString.StartsWith("hello world", "world"); // 返回 false
     * ```
     */
    export function StartsWith(str: string, prefix: string): boolean {
        return IndexOf(str, prefix) == 0
    }

    /**
     * 字符串尾部匹配。
     * 
     * @param str 源字符串。
     * @param suffix 后缀字符串。
     * @returns 是否以指定字符串结尾。
     * @example
     * ```typescript
     * XString.EndsWith("hello world", "world"); // 返回 true
     * XString.EndsWith("hello world", "hello"); // 返回 false
     * ```
     */
    export function EndsWith(str: string, suffix: string): boolean {
        if (IsNullOrEmpty(str) == false && IsNullOrEmpty(suffix) == false) {
            return str.endsWith(suffix)
        }
        return false
    }

    /**
     * 格式化字符串。
     * 使用 {n} 作为占位符，n 为参数索引。
     * 
     * @param format 格式字符串。
     * @param args 格式化参数。
     * @returns 格式化后的字符串。
     * @example
     * ```typescript
     * XString.Format("Hello {0}!", "world"); // 返回 "Hello world!"
     * XString.Format("{0} + {1} = {2}", 1, 2, 3); // 返回 "1 + 2 = 3"
     * ```
     */
    export function Format(fmt: string, ...args: Array<any>): string {
        if (fmt) {
            if (args.length > 0) {
                let index = 0
                const doReplace = (rplc: any) => {
                    if (rplc == null) rplc = "undefined"
                    if (rplc instanceof Array) {
                        for (let i = 0; i < rplc.length; i++) {
                            let temp = rplc[i]
                            doReplace(temp)
                        }
                    } else {
                        let str: string
                        let reg = new RegExp("({)" + index + "(})", "g")
                        if (typeof (rplc) == "string") {
                            str = <string>rplc
                        } else {
                            str = rplc.toString()
                        }
                        fmt = fmt.replace(reg, str)
                        index++
                    }
                }
                for (let i = 0; i < args.length; i++) {
                    let temp = args[i]
                    if (temp != null) {
                        doReplace(temp)
                    }
                }
            }
            return fmt
        } else {
            return null
        }
    }

    /**
     * 将字符串转换为版本号。
     * 支持多级版本号格式。
     * 
     * @param str 版本号字符串。
     * @returns 标准化的版本号字符串。
     * @example
     * ```typescript
     * XString.ToVersion("1.2.3"); // 返回 "1.2.3"
     * XString.ToVersion("v1.2"); // 返回 "1.2.0"
     * ```
     */
    export function ToVersion(version: string): number {
        if (IsNullOrEmpty(version)) {
            return -1
        }
        let strs: Array<string> = version.split(".")
        if (strs == null || strs.length == 0) {
            return -1
        } else {
            let finalVersion = 0
            let large = (strs.length - 1) * 2
            for (let i = 0; i < strs.length; i++) {
                let singleVersion = parseInt(strs[i])
                if (i == 0) {
                    finalVersion = (large == 0 ? singleVersion : singleVersion * (Math.pow(10, large)))
                } else if (i == strs.length - 1) {
                    finalVersion += singleVersion
                } else {
                    finalVersion += singleVersion * (Math.pow(10, large - i * 2))
                }
            }
            return finalVersion
        }
    }

    /**
     * 数字转版本号。
     * 
     * @param version 版本号数字。
     * @returns 版本号字符串。
     */
    export function FromVersion(version: number): string {
        let finalVersion = ""
        let str = version.toString()
        let singleVersion = 0
        for (let i = str.length - 1; i >= 0;) {
            let length = (i - 1) >= 0 ? 2 : 1
            let from = i - length + 1
            singleVersion = parseInt(str.substr(from, length))
            finalVersion = singleVersion + finalVersion
            if (i > 1) {
                finalVersion = "." + finalVersion
            }
            i -= 2
        }
        return finalVersion
    }

    /**
     * 将字符串转换为 ArrayBuffer。
     * 
     * @param str 要转换的字符串。
     * @returns ArrayBuffer 对象。
     * @example
     * ```typescript
     * const buffer = XString.ToBuffer("Hello");
     * ```
     */
    export function ToBuffer(str: string): ArrayBuffer {
        const encoder = new TextEncoder()
        return encoder.encode(str).buffer
    }

    /**
     * 将 ArrayBuffer 转换为字符串。
     * 
     * @param buffer ArrayBuffer 对象。
     * @returns 转换后的字符串。
     * @example
     * ```typescript
     * const str = XString.FromBuffer(buffer);
     * ```
     */
    export function FromBuffer(buf: ArrayBuffer): string {
        const decoder = new TextDecoder()
        if (XEnv.IsCocos && XEnv.IsCocos) return decoder.decode(new Uint8Array(buf))
        else return decoder.decode(buf)
    }

    /**
     * 将字符串转换为 Base64 编码。
     * 
     * @param str 要编码的字符串。
     * @returns Base64 编码的字符串。
     * @example
     * ```typescript
     * XString.ToBase64("Hello"); // 返回 "SGVsbG8="
     * ```
     */
    export function ToBase64(str: string): string {
        if (XEnv.IsBrowser || XEnv.IsCocos) {
            let utf8Encoder = new TextEncoder()
            let binaryData = utf8Encoder.encode(str)
            let binaryArray = Array.from(binaryData)
            let binaryString = ""
            for (let byte of binaryArray) {
                binaryString += String.fromCharCode(byte)
            }
            return btoa(binaryString)
        } else {
            return Buffer.from(str).toString("base64")
        }
    }

    /**
     * 将 Base64 编码转换为字符串。
     * 
     * @param str Base64 编码的字符串。
     * @returns 解码后的字符串。
     * @example
     * ```typescript
     * XString.FromBase64("SGVsbG8="); // 返回 "Hello"
     * ```
     */
    export function FromBase64(str: string): string {
        if (XEnv.IsBrowser || XEnv.IsCocos) {
            let binaryString = atob(str)
            let binaryArray = new Uint8Array(binaryString.length)
            for (let i = 0; i < binaryString.length; i++) {
                binaryArray[i] = binaryString.charCodeAt(i)
            }
            let utf8Decoder = new TextDecoder()
            return utf8Decoder.decode(binaryArray)
        } else {
            return Buffer.from(str, "base64").toString("utf8")
        }
    }


    /**
     * 生成随机字符串。
     * 
     * @param format GUID 格式化选项，默认为 N 格式（32 位，无连字符）。
     * @returns 随机字符串。
     * @example
     * ```typescript
     * const guid = XString.Random();     // 如：c9a0cad5e9624b3b8e07f5df0e5c1bbc
     * const guid2 = XString.Random("D"); // 如：c9a0cad5-e962-4b3b-8e07-f5df0e5c1bbc
     * ```
     * @remarks
     * 支持的格式：
     * - N：32 位数字，无连字符
     * - D：含连字符的 32 位数字
     * - B：带大括号、连字符的 32 位数字
     * - P：带括号、连字符的 32 位数字
     */
    export function Random(format: string = "N"): string {
        let date = new Date().getTime()
        let uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
            let r = (date + Math.random() * 16) % 16 | 0
            date = Math.floor(date / 16)
            return (c == "x" ? r : (r & 0x3 | 0x8)).toString(16)
        })

        // 根据格式选项处理 UUID
        switch (format.toUpperCase()) {
            case "N":
                return uuid.replace(/-/g, "")
            case "D":
                return uuid
            case "B":
                return `{${uuid}}`
            case "P":
                return `(${uuid})`
            default:
                return uuid.replace(/-/g, "")
        }
    }
}
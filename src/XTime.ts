// Copyright (c) 2025 EFramework Organization. All rights reserved.
// Use of this source code is governed by a MIT-style
// license that can be found in the LICENSE file.

/**
 * 时间工具：时间格式化、时间戳转换等。
 */
export namespace XTime {
    /**
     * 格式化日期时间。
     * 支持以下格式化占位符：
     * - yyyy: 年份
     * - MM: 月份，补零
     * - dd: 日期，补零
     * - hh: 小时，补零
     * - mm: 分钟，补零
     * - ss: 秒钟，补零
     * - SSS: 毫秒，补零
     * - q: 季度
     * 
     * @param date 要格式化的日期对象。
     * @param fmt 格式化模板字符串。
     * @returns 格式化后的日期字符串。
     * @example
     * ```typescript
     * const now = new Date();
     * XTime.Format(now, "yyyy-MM-dd hh:mm:ss"); // "2025-01-28 14:30:00"
     * XTime.Format(now, "yyyy年MM月dd日"); // "2025年01月28日"
     * ```
     */
    export function Format(date: Date, fmt: string): string {
        if (!date || !fmt) return ""

        const map = {
            "M": date.getMonth() + 1, // 月份
            "d": date.getDate(),      // 日
            "h": date.getHours(),     // 小时
            "m": date.getMinutes(),   // 分
            "s": date.getSeconds(),   // 秒
            "q": Math.floor((date.getMonth() + 3) / 3), // 季度
            "S": date.getMilliseconds() // 毫秒
        }

        const yearMatch = fmt.match(/y+/)
        if (yearMatch) fmt = fmt.replace(yearMatch[0], (date.getFullYear() + "").slice(-yearMatch[0].length))

        for (const key in map) {
            let reg = new RegExp(`(${key}+)`)
            if (reg.test(fmt)) {
                const value = map[key]
                const replacement = (key.length === 1) ? value.toString() : value.toString().padStart(key.length, '0')
                fmt = fmt.replace(reg, replacement)
            }
        }

        return fmt
    }

    /**
     * 获取当前时间戳（秒）。
     * 返回自 1970-01-01 00:00:00 UTC 以来的秒数。
     * 
     * @returns 当前时间戳，单位：秒。
     * @example
     * ```typescript
     * const timestamp = XTime.GetTimestamp(); // 1706428800
     * ```
     */
    export function GetTimestamp(): number {
        return Date.parse(new Date().toString()) / 1000
    }

    /**
     * 获取当前时间戳（毫秒）。
     * 返回自 1970-01-01 00:00:00 UTC 以来的毫秒数。
     * 
     * @returns 当前时间戳，单位：毫秒。
     * @example
     * ```typescript
     * const ms = XTime.GetMilliSecond(); // 1706428800000
     * ```
     */
    export function GetMilliSecond(): number {
        return new Date().valueOf()
    }
}
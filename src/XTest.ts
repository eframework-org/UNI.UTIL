// Copyright (c) 2025 EFramework Organization. All rights reserved.
// Use of this source code is governed by a MIT-style
// license that can be found in the LICENSE file.

import { XEnv } from "./XEnv"
import { XLog } from "./XLog"
import { XObject } from "./XObject"
import { XTime } from "./XTime"

/**
 * 测试框架：支持 Jest 和独立运行两种模式。
 */
export namespace XTest {
    var isJest: boolean
    function getIsJest(): boolean {
        if (isJest == null) isJest = typeof jest != "undefined"
        return isJest
    }

    /**
     * Jest环境。
     */
    export const IsJest: boolean = getIsJest()

    var mCurrent: string = "Unknown"

    /**
     * 定义一个测试用例。
     * 
     * @param name 测试用例名称。
     * @param fn 测试用例函数。
     * @example
     * ```typescript
     * XTest.Test("should add numbers", async () => {
     *     const result = 1 + 2;
     *     XTest.Expect(result).ToBe(3);
     * });
     * ```
     */
    export function Test(name: string, fn: () => Promise<void>) {
        if (IsJest) {
            test(name, async () => {
                mCurrent = name
                const time = XTime.GetMilliSecond()
                XLog.Debug(`[${name}]: Unit test start, runtime is ${XObject.Key(XEnv.RuntimeType, XEnv.Runtime)}, platform is ${XObject.Key(XEnv.PlatformType, XEnv.Platform)}`)
                await fn()
                XLog.Debug(`[${name}]: Unit test passed, elapsed ${XTime.GetMilliSecond() - time}ms`)
            })
        } else {
            return async () => {
                mCurrent = name
                const time = XTime.GetMilliSecond()
                XLog.Debug(`[${name}]: Unit test start, runtime is ${XObject.Key(XEnv.RuntimeType, XEnv.Runtime)}, platform is ${XObject.Key(XEnv.PlatformType, XEnv.Platform)}`)
                await fn()
                XLog.Debug(`[${name}]: Unit test passed, elapsed ${XTime.GetMilliSecond() - time}ms`)
            }
        }
    }

    /**
     * 创建一个测试断言。
     * 
     * @param obj 要测试的对象。
     * @param tag 断言标签，用于标识断言的来源。
     * @param args 附加参数，用于提供更多上下文信息。
     * @returns 断言对象。
     * @example
     * ```typescript
     * XTest.Expect(value, "计算结果").ToBe(expected);
     * XTest.Expect(array.length, "数组长度").ToBeGreaterThan(0);
     * ```
     */
    export function Expect(obj: any, tag?: string, ...args: any[]): Assert {
        return new Assert(obj, tag, ...args)
    }

    /**
     * 测试断言类。
     * 提供丰富的断言方法，支持值比较、类型检查等。
     */
    export class Assert {
        public Obj: any
        public Tag: string
        public Args: any[]
        public IsNot: boolean = false
        private mJObj: any

        /**
         * 构造函数。
         * 
         * @param obj 测试对象。
         * @param tag 可选标签。
         * @param args 可选参数。
         */
        constructor(obj: any, tag?: string, ...args: any[]) {
            this.Tag = tag ? tag : "Untagged"
            this.Args = args
            if (IsJest) this.mJObj = expect(obj)
            this.Obj = obj
        }

        /**
         * 否定断言。
         * 反转下一个断言的结果。
         * 
         * @returns 当前断言实例。
         * @example
         * ```typescript
         * XTest.Expect(value).Not.ToBeNull();
         * XTest.Expect(array).Not.ToBe(empty);
         * ```
         */
        public get Not(): Assert {
            this.IsNot = !this.IsNot
            return this
        }

        /**
         * 检查对象是否等于预期值。
         * 使用严格相等(===)进行比较。
         * 
         * @param expected 预期值。
         * @returns 断言是否通过。
         * @example
         * ```typescript
         * XTest.Expect(2 + 2).ToBe(4);
         * XTest.Expect("hello").Not.ToBe("world");
         * ```
         */
        public ToBe(expected: any): boolean {
            let ret = false
            let expr = `[${mCurrent}][${this.Tag}][ToBe]: ${this.Obj} ${this.IsNot ? "!=" : "=="} ${expected}`
            if (IsJest) {
                ret = this.IsNot ? this.mJObj.not.toBe(expected) : this.mJObj.toBe(expected)
            } else {
                ret = this.IsNot ? this.Obj !== expected : this.Obj === expected
            }
            if (ret == false) throw new Error(`${expr} was not expected${this.Args && this.Args.length > 0 ? ", Args: " : "."}${this.Args && this.Args.length > 0 ? this.Args : ""}`)
            XLog.Debug(`${expr} was expected${this.Args && this.Args.length > 0 ? ", Args: " : "."}`, ...this.Args)
            return ret
        }

        /**
         * 检查对象是否大于预期值。
         * 
         * @param expected 预期值。
         * @returns 断言是否通过。
         * @example
         * ```typescript
         * XTest.Expect(5).ToBeGreaterThan(3);
         * XTest.Expect(score).ToBeGreaterThan(passingScore);
         * ```
         */
        public ToBeGreaterThan(expected: number): boolean {
            let ret = false
            let expr = `[${mCurrent}][${this.Tag}][ToBeGreaterThan]: ${this.Obj} ${this.IsNot ? "<=" : ">"} ${expected}`
            if (IsJest) {
                ret = this.IsNot ? this.mJObj.not.toBeGreaterThan(expected) : this.mJObj.toBeGreaterThan(expected)
            } else {
                ret = this.IsNot ? this.Obj <= expected : this.Obj > expected
            }
            if (ret == false) throw new Error(`${expr} was not expected${this.Args && this.Args.length > 0 ? ", Args: " : "."}${this.Args && this.Args.length > 0 ? this.Args : ""}`)
            XLog.Debug(`${expr} was expected${this.Args && this.Args.length > 0 ? ", Args: " : "."}`, ...this.Args)
            return ret
        }

        /**
         * 检查对象是否大于或等于预期值。
         * 
         * @param expected 预期值。
         * @returns 断言是否通过。
         */
        public ToBeGreaterThanOrEqual(expected: number): boolean {
            let ret = false
            let expr = `[${mCurrent}][${this.Tag}][ToBeGreaterThanOrEqual]: ${this.Obj} ${this.IsNot ? "<" : ">="} ${expected}`
            if (IsJest) {
                ret = this.IsNot ? this.mJObj.not.toBeGreaterThanOrEqual(expected) : this.mJObj.toBeGreaterThanOrEqual(expected)
            } else {
                ret = this.IsNot ? this.Obj < expected : this.Obj >= expected
            }
            if (ret == false) throw new Error(`${expr} was not expected${this.Args && this.Args.length > 0 ? ", Args: " : "."}${this.Args && this.Args.length > 0 ? this.Args : ""}`)
            XLog.Debug(`${expr} was expected${this.Args && this.Args.length > 0 ? ", Args: " : "."}`, ...this.Args)
            return ret
        }

        /**
         * 检查对象是否小于预期值。
         * 
         * @param expected 预期值。
         * @returns 断言是否通过。
         */
        public ToBeLessThan(expected: number): boolean {
            let ret = false
            let expr = `[${mCurrent}][${this.Tag}][ToBeLessThan]: ${this.Obj} ${this.IsNot ? ">=" : "<"} ${expected}`
            if (IsJest) {
                ret = this.IsNot ? this.mJObj.not.toBeLessThan(expected) : this.mJObj.toBeLessThan(expected)
            } else {
                ret = this.IsNot ? this.Obj >= expected : this.Obj < expected
            }
            if (ret == false) throw new Error(`${expr} was not expected${this.Args && this.Args.length > 0 ? ", Args: " : "."}${this.Args && this.Args.length > 0 ? this.Args : ""}`)
            XLog.Debug(`${expr} was expected${this.Args && this.Args.length > 0 ? ", Args: " : "."}`, ...this.Args)
            return ret
        }

        /**
         * 检查对象是否小于或等于预期值。
         * 
         * @param expected 预期值。
         * @returns 断言是否通过。
         */
        public ToBeLessThanOrEqual(expected: number): boolean {
            let ret = false
            let expr = `[${mCurrent}][${this.Tag}][ToBeLessThanOrEqual]: ${this.Obj} ${this.IsNot ? ">" : "<="} ${expected}`
            if (IsJest) {
                ret = this.IsNot ? this.mJObj.not.toBeLessThanOrEqual(expected) : this.mJObj.toBeLessThanOrEqual(expected)
            } else {
                ret = this.IsNot ? this.Obj > expected : this.Obj <= expected
            }
            if (ret == false) throw new Error(`${expr} was not expected${this.Args && this.Args.length > 0 ? ", Args: " : "."}${this.Args && this.Args.length > 0 ? this.Args : ""}`)
            XLog.Debug(`${expr} was expected${this.Args && this.Args.length > 0 ? ", Args: " : "."}`, ...this.Args)
            return ret
        }

        /**
         * 检查对象是否为 null。
         * 
         * @returns 断言是否通过。
         * @example
         * ```typescript
         * XTest.Expect(null).ToBeNull();
         * XTest.Expect(value).Not.ToBeNull();
         * ```
         */
        public ToBeNull(): boolean {
            let ret = false
            let expr = `[${mCurrent}][${this.Tag}][ToBeNull]: ${this.Obj} ${this.IsNot ? "!=" : "=="} ${"null"}`
            if (IsJest) {
                ret = this.IsNot ? this.mJObj.not.toBeNull() : this.mJObj.toBeNull()
            } else {
                ret = this.IsNot ? this.Obj != null : this.Obj == null
            }
            if (ret == false) throw new Error(`${expr} was not expected${this.Args && this.Args.length > 0 ? ", Args: " : "."}${this.Args && this.Args.length > 0 ? this.Args : ""}`)
            XLog.Debug(`${expr} was expected${this.Args && this.Args.length > 0 ? ", Args: " : "."}`, ...this.Args)
            return ret
        }

        /**
         * 检查对象是否为 undefined。
         * 
         * @returns 断言是否通过。
         */
        public ToBeUndefined(): boolean {
            let ret = false
            let expr = `[${mCurrent}][${this.Tag}][ToBeUndefined]: ${this.Obj} ${this.IsNot ? "!=" : "=="} ${"undefined"}`
            if (IsJest) {
                ret = this.IsNot ? this.mJObj.not.toBeUndefined() : this.mJObj.toBeUndefined()
            } else {
                ret = this.IsNot ? this.Obj != undefined : this.Obj == undefined
            }
            if (ret == false) throw new Error(`${expr} was not expected${this.Args && this.Args.length > 0 ? ", Args: " : "."}${this.Args && this.Args.length > 0 ? this.Args : ""}`)
            XLog.Debug(`${expr} was expected${this.Args && this.Args.length > 0 ? ", Args: " : "."}`, ...this.Args)
            return ret
        }

        /**
         * 检查对象是否为 NaN。
         * 
         * @returns 断言是否通过。
         */
        public ToBeNaN(): boolean {
            let ret = false
            let expr = `[${mCurrent}][${this.Tag}][ToBeNaN]: ${this.Obj} ${this.IsNot ? "!=" : "=="} ${"NaN"}`
            if (IsJest) {
                ret = this.IsNot ? this.mJObj.not.toBeNaN() : this.mJObj.toBeNaN()
            } else {
                ret = this.IsNot ? !isNaN(this.Obj) : isNaN(this.Obj)
            }
            if (ret == false) throw new Error(`${expr} was not expected${this.Args && this.Args.length > 0 ? ", Args: " : "."}${this.Args && this.Args.length > 0 ? this.Args : ""}`)
            XLog.Debug(`${expr} was expected${this.Args && this.Args.length > 0 ? ", Args: " : "."}`, ...this.Args)
            return ret
        }
    }
}
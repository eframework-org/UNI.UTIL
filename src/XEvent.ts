// Copyright (c) 2025 EFramework Organization. All rights reserved.
// Use of this source code is governed by a MIT-style
// license that can be found in the LICENSE file.

import { XLog } from "./XLog"

/**
 * XEvent 是一个轻量级的事件管理器，支持多重监听、单次回调等功能。
 * 
 * 功能特性
 * - 事件管理：提供完整的事件注册、注销和通知机制
 * - 单次回调：可注册执行一次后自动注销的事件回调
 * 
 * 使用手册
 * 1. 管理器
 * 
 * 1.1 创建管理器
 * ```typescript
 * // 创建允许多回调的事件管理器（默认模式）
 * const eventManager = new XEvent.Manager();
 * 
 * // 创建单回调模式的事件管理器
 * const singleManager = new XEvent.Manager(false);
 * ```
 * 
 * 1.2 查询事件
 * ```typescript
 * // 获取特定事件的所有回调
 * const callbacks = eventManager.Get(1001);
 * if (callbacks) {
 *     console.log(`事件1001有${callbacks.length}个回调`);
 * }
 * ```
 * 
 * 1.3 清除所有事件
 * ```typescript
 * // 清除管理器中的所有事件注册
 * eventManager.Clear();
 * ```
 * 
 * 2. 注册与注销
 * 
 * 2.1 注册事件回调
 * ```typescript
 * // 注册普通事件
 * eventManager.Reg(1001, (data) => {
 *     console.log('收到事件:', data);
 * });
 * 
 * // 注册一次性事件（触发一次后自动注销）
 * eventManager.Reg(1002, (data) => {
 *     console.log('这个回调只会执行一次:', data);
 * }, true);
 * ```
 * 
 * 2.2 注销事件回调
 * ```typescript
 * // 定义回调函数
 * const callback = (data) => {
 *     console.log('收到事件:', data);
 * };
 * 
 * // 注册事件
 * eventManager.Reg(1001, callback);
 * 
 * // 注销特定回调
 * eventManager.Unreg(1001, callback);
 * 
 * // 注销事件的所有回调
 * eventManager.Unreg(1001);
 * ```
 * 
 * 3. 事件通知
 * 
 * 3.1 触发事件
 * ```typescript
 * // 触发事件并传递多个参数
 * eventManager.Notify(1002, 'action', 123, { detail: 'info' });
 * ```
 * 
 * 更多信息请参考模块文档。
 */
export namespace XEvent {
    /**
     * 事件回调函数类型。
     * 
     * @param args 事件参数，支持任意类型和数量的参数。
     */
    export type Callback = (...args: any[]) => void

    /**
     * 事件管理器。
     * 负责事件的注册、注销、触发等生命周期管理。
     */
    export class Manager {
        protected multiple: boolean
        protected callbacks: Map<number, Callback[]>
        protected onces: Map<Callback, boolean>
        protected batches: Callback[]

        /**
         * 构造函数。
         * 
         * @param multiple 是否允许同一事件注册多个回调，默认为 true。
         */
        constructor(multiple: boolean = true) {
            this.multiple = multiple
            this.callbacks = new Map<number, Callback[]>()
            this.onces = new Map<Callback, boolean>()
            this.batches = []
        }

        /**
         * 清除所有事件注册。
         */
        public Clear() {
            this.callbacks.clear()
            this.onces.clear()
            this.batches.length = 0
        }

        /**
         * 获取指定事件的所有回调函数。
         * 
         * @param eid 事件标识。
         * @returns 返回事件回调函数数组，如果事件未注册则返回 null。
         * @example
         * ```typescript
         * const callbacks = manager.Get(1001);
         * if (callbacks) {
         *     console.log(`事件1001有${callbacks.length}个回调`);
         * }
         * ```
         */
        public Get(eid: number): Callback[] | null {
            return this.callbacks.get(eid) || null
        }

        /**
         * 注册事件回调。
         * 
         * @param eid 事件标识。
         * @param callback 回调函数。
         * @param once 是否为一次性事件，默认为 false。
         * @returns 是否成功注册。
         * @example
         * ```typescript
         * manager.Reg(1001, (data) => {
         *     console.log('收到事件:', data);
         * });
         * ```
         */
        public Reg(eid: number, callback: Callback, once: boolean = false): boolean {
            if (callback == null) {
                XLog.Error("XEvent.Manager.Reg: nil callback, eid={0}", eid)
                return false
            }

            let callbacks = this.callbacks.get(eid)
            if (!callbacks) {
                callbacks = []
                this.callbacks.set(eid, callbacks)
            }

            if (!this.multiple && callbacks.length > 1) {
                XLog.Error("XEvent.Manager.Reg: not support multi-register, eid={0}", eid)
                return false
            }

            for (const temp of callbacks) {
                if (temp === callback) return false
            }

            if (once) this.onces.set(callback, once)
            callbacks.push(callback)
            return true
        }

        /**
         * 注销事件回调。
         * 
         * @param eid 事件标识。
         * @param callback 要注销的回调函数，如果不指定则注销该事件的所有回调。
         * @returns 是否成功注销。
         * @example
         * ```typescript
         * // 注销特定回调
         * manager.Unreg(1001, callback);
         * // 注销事件所有回调
         * manager.Unreg(1001);
         * ```
         */
        public Unreg(eid: number, callback?: Callback): boolean {
            let ret = false

            if (this.callbacks.has(eid)) {
                const callbacks = this.callbacks.get(eid)
                if (callback) {
                    if (callbacks.length > 0) {
                        ret = callbacks.some((cb, index) => {
                            if (cb === callback) {
                                callbacks.splice(index, 1)
                                if (this.onces.has(callback)) this.onces.delete(callback)
                                return true
                            }
                            return false
                        })
                        if (callbacks.length == 0) this.callbacks.delete(eid)
                    }
                } else {
                    ret = true
                    for (const cb of callbacks) {
                        if (this.onces.has(cb)) this.onces.delete(cb)
                    }
                    this.callbacks.delete(eid)
                }
            }

            return ret
        }

        /**
         * 触发事件。
         * 
         * @param eid 事件标识。
         * @param args 要传递给回调函数的参数。
         * @example
         * ```typescript
         * manager.Notify(1001, { type: 'update', data: 'new value' });
         * ```
         */
        public Notify(eid: number, ...args: any[]): void {
            if (this.callbacks.has(eid)) {
                const callbacks = this.callbacks.get(eid)
                this.batches.length = 0
                for (let i = 0; i < callbacks.length;) {
                    const callback = callbacks[i]
                    if (!callback) {
                        callbacks.splice(i, 1)
                    } else {
                        if (this.onces.has(callback)) {
                            callbacks.splice(i, 1)
                        } else {
                            i++
                        }
                        this.batches.push(callback)
                    }
                }
                for (const callback of this.batches) {
                    callback(...args)
                }
                this.batches.length = 0
            }
        }
    }
}
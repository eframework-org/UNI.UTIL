// Copyright (c) 2025 EFramework Organization. All rights reserved.
// Use of this source code is governed by a MIT-style
// license that can be found in the LICENSE file.

/**
 * XCollect 提供了集合工具，实现了数组/列表的增删改查、排序等功能。
 * 
 * 功能特性
 * - 支持条件查找：通过传入条件函数查找特定元素或索引
 * - 支持元素操作：增加、删除、插入元素到指定位置 
 * - 提供批量操作：批量添加、批量删除、截取范围
 * - 实现排序功能：通过自定义比较函数对列表进行排序
 * 
 * 使用手册
 * 1. 元素查找
 * 
 * 1.1 Find - 查找满足条件的元素
 * ```typescript
 * const list = [1, 2, 3];
 * const item = XCollect.Find(list, x => x > 2); // 返回 3
 * ```
 * 
 * 1.2 Index - 查找满足条件的元素索引
 * ```typescript
 * const list = [1, 2, 3];
 * const index = XCollect.Index(list, x => x > 2); // 返回 2
 * ```
 * 
 * 1.3 Exist - 检查是否存在满足条件的元素
 * ```typescript
 * const list = [1, 2, 3];
 * const exists = XCollect.Exist(list, x => x > 2); // 返回 true
 * ```
 * 
 * 2. 元素操作
 * 
 * 2.1 Insert - 在指定位置插入元素
 * ```typescript
 * const list = [1, 2, 3];
 * XCollect.Insert(list, 4, 1); // 在索引1处插入元素4
 * // list 变为 [1, 4, 2, 3]
 * ```
 * 
 * 2.2 Delete - 删除指定索引的元素
 * ```typescript
 * const list = [1, 2, 3];
 * XCollect.Delete(list, 1);
 * // list 变为 [1, 3]
 * ```
 * 
 * 2.3 Remove - 移除满足条件的第一个元素
 * ```typescript
 * const list = [1, 2, 3, 4];
 * XCollect.Remove(list, x => x > 2); // 移除第一个大于2的元素
 * // list 变为 [1, 2, 4]
 * ```
 * 
 * 3. 批量操作
 * 
 * 3.1 AddRange - 批量添加元素
 * ```typescript
 * const list = [1, 2];
 * XCollect.AddRange(list, [3, 4]);
 * // list 变为 [1, 2, 3, 4]
 * ```
 * 
 * 3.2 DeleteRange - 批量删除元素
 * ```typescript
 * const list = [1, 2, 3, 4, 5];
 * XCollect.DeleteRange(list, 1, 2);
 * // list 变为 [1, 4, 5]
 * ```
 * 
 * 3.3 SubRange - 截取元素范围
 * ```typescript
 * const list = [1, 2, 3, 4, 5];
 * const sub = XCollect.SubRange(list, 1, 3); 
 * // 返回 [2, 3, 4]
 * ```
 * 
 * 4. 元素排序
 * 
 * 4.1 Sort - 自定义排序
 * ```typescript
 * const list = [3, 1, 4, 2];
 * XCollect.Sort(list, (a, b) => a < b); // 升序排序
 * // list 变为 [1, 2, 3, 4]
 * ```
 * 
 * 更多信息请参考模块文档。
 */
export namespace XCollect {
    /**
     * 根据条件从列表中移除元素。
     * 遍历列表查找第一个满足条件的元素并移除。
     * 
     * @param list 列表实例。
     * @param cond 条件函数，返回 true 表示要移除该元素。
     * @returns 如果成功移除元素返回 true，否则返回 false。
     * @example
     * ```typescript
     * const list = [1, 2, 3, 4];
     * XCollect.Remove(list, x => x > 2); // 移除第一个大于2的元素
     * // list 变为 [1, 2, 4]
     * ```
     */
    export function Remove<T>(list: Array<T>, cond: (item: T) => boolean): boolean {
        for (let i = 0; i < list.length; i++) {
            if (cond(list[i])) {
                this.Delete(list, i)
                return true
            }
        }
        return false
    }

    /**
     * 将元素插入到列表的指定位置。
     * 如果索引为 -1 或超出列表长度，则插入到列表末尾。
     * 
     * @param list 列表实例。
     * @param ele 要插入的元素。
     * @param idx 插入位置的索引，默认为 -1（表示插入到列表末尾）。
     * @example
     * ```typescript
     * const list = [1, 2, 3];
     * XCollect.Insert(list, 4, 1); // 在索引1处插入元素4
     * // list 变为 [1, 4, 2, 3]
     * ```
     */
    export function Insert(list: Array<any>, ele: any, idx: number = -1) {
        if (list != null && ele != null) {
            if (idx == -1) idx = list.length
            list.splice(idx, 0, ele)
        }
    }

    /**
     * 对列表进行排序。
     * 使用自定义比较函数进行排序，原地修改列表。
     * 
     * @param list 列表实例。
     * @param func 排序函数，返回 true 表示 o1 应该排在 o2 前面。
     * @example
     * ```typescript
     * const list = [3, 1, 4, 2];
     * XCollect.Sort(list, (a, b) => a < b); // 升序排序
     * // list 变为 [1, 2, 3, 4]
     * ```
     */
    export function Sort<T>(list: T[], func: (o1: T, o2: T) => boolean) {
        if (list != null && func != null && list instanceof Array) {
            list.sort((o1, o2) => {
                if (func(o1, o2)) return -1
                else return 1
            })
        }
    }

    /**
     * 检查列表中是否存在满足条件的元素。
     * 
     * @param list 列表实例。
     * @param cond 条件函数，返回 true 表示找到目标元素。
     * @returns 如果存在满足条件的元素返回 true，否则返回 false。
     * @example
     * ```typescript
     * const list = [1, 2, 3];
     * const exists = XCollect.Exist(list, x => x > 2); // true
     * ```
     */
    export function Exist<T>(list: T[], cond: (item: T) => boolean): boolean {
        if (list && cond) {
            for (let i = 0; i < list.length; i++) {
                if (cond(list[i])) return true
            }
        }
        return false
    }

    /**
     * 在列表中查找满足条件的第一个元素。
     * 
     * @param list 列表实例。
     * @param cond 条件函数，返回 true 表示找到目标元素。
     * @returns 返回第一个满足条件的元素，如果没有找到则返回 null。
     * @example
     * ```typescript
     * const list = [1, 2, 3];
     * const item = XCollect.Find(list, x => x > 2); // 返回 3
     * ```
     */
    export function Find<T>(list: T[], cond: (item: T) => boolean): T {
        if (list && cond) {
            for (let index = 0; index < list.length; index++) {
                let ele = list[index]
                if (cond(ele)) return ele
            }
        }
        return null
    }

    /**
     * 在列表中查找满足条件的第一个元素的索引。
     * 
     * @param list 列表实例。
     * @param cond 条件函数，返回 true 表示找到目标元素。
     * @returns 返回第一个满足条件的元素的索引，如果没有找到则返回 -1。
     * @example
     * ```typescript
     * const list = [1, 2, 3];
     * const index = XCollect.Index(list, x => x > 2); // 返回 2
     * ```
     */
    export function Index<T>(list: T[], cond: (item: T) => boolean): number {
        if (list && cond) {
            for (let index = 0; index < list.length; index++) {
                var ele = list[index]
                if (cond(ele)) return index
            }
        }
        return -1
    }

    /**
     * 从列表中删除指定索引位置的元素。
     * 如果索引超出范围，则不执行任何操作。
     * 
     * @param list 列表实例。
     * @param idx 要删除元素的索引。
     * @example
     * ```typescript
     * const list = [1, 2, 3];
     * XCollect.Delete(list, 1);
     * // list 变为 [1, 3]
     * ```
     */
    export function Delete(list: Array<any>, idx: number) {
        if (list != null) {
            if (idx < list.length) list.splice(idx, 1)
        }
    }

    /**
     * 从列表中截取一段元素，返回新的数组。
     * 不修改原列表。
     * 
     * @param list 列表实例。
     * @param start 开始索引，默认为 0。
     * @param end 结束索引（包含），默认为 -1（表示截取到列表末尾）。
     * @returns 返回截取的元素数组。
     * @example
     * ```typescript
     * const list = [1, 2, 3, 4, 5];
     * const sub = XCollect.SubRange(list, 1, 3); // 返回 [2, 3, 4]
     * ```
     */
    export function SubRange<T>(list: T[], start: number = 0, end: number = -1): T[] {
        var rets: T[] = []
        if (list) {
            if (end == -1) end = list.length - 1
            else end = Math.min(list.length, end)
            start = Math.max(start, 0)
            for (let i = start; i <= end; i++) {
                rets.push(list[i])
            }
        }
        return rets
    }

    /**
     * 将一组元素添加到列表末尾。
     * 支持数组、Set、Map等可迭代对象。
     * 
     * @param list 列表实例。
     * @param eles 要添加的元素集合。
     * @example
     * ```typescript
     * const list = [1, 2];
     * XCollect.AddRange(list, [3, 4]);
     * // list 变为 [1, 2, 3, 4]
     * ```
     */
    export function AddRange<T>(list: Array<T>, eles: Iterable<T> | ArrayLike<T>) {
        if (list && eles) list.push.apply(list, Array.from(eles))
    }

    /**
     * 从列表中删除一段元素。
     * 从指定索引开始删除指定数量的元素。
     * 
     * @param list 列表实例。
     * @param idx 开始删除的索引。
     * @param length 要删除的元素数量，默认删除到列表末尾。
     * @example
     * ```typescript
     * const list = [1, 2, 3, 4, 5];
     * XCollect.DeleteRange(list, 1, 2);
     * // list 变为 [1, 4, 5]
     * ```
     */
    export function DeleteRange(list: Array<any>, idx: number, length?: number) {
        if (list) {
            if (length == null) length = list.length - idx
            for (let i = 0; i < length; i++) {
                this.Delete(list, idx)
            }
        }
    }
}
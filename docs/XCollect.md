# XCollect

[![Version](https://img.shields.io/npm/v/org.eframework.uni.util)](https://www.npmjs.com/package/org.eframework.uni.util)
[![Downloads](https://img.shields.io/npm/dm/org.eframework.uni.util)](https://www.npmjs.com/package/org.eframework.uni.util)

XCollect 提供了集合工具，实现了数组/列表的增删改查、排序等功能。

## 功能特性

- 支持条件查找：通过传入条件函数查找特定元素或索引
- 支持元素操作：增加、删除、插入元素到指定位置 
- 提供批量操作：批量添加、批量删除、截取范围
- 实现排序功能：通过自定义比较函数对列表进行排序

## 使用手册

### 1. 元素查找

1. Find - 查找满足条件的元素

    ```typescript
    const list = [1, 2, 3];
    const item = XCollect.Find(list, x => x > 2); // 返回 3
    ```

2. Index - 查找满足条件的元素索引

    ```typescript
    const list = [1, 2, 3];
    const index = XCollect.Index(list, x => x > 2); // 返回 2
    ```

3. Exist - 检查是否存在满足条件的元素

    ```typescript
    const list = [1, 2, 3];
    const exists = XCollect.Exist(list, x => x > 2); // 返回 true
    ```

### 2. 元素操作

1. Insert - 在指定位置插入元素

    ```typescript
    const list = [1, 2, 3];
    XCollect.Insert(list, 4, 1); // 在索引1处插入元素4
    // list 变为 [1, 4, 2, 3]
    ```

2. Delete - 删除指定索引的元素

    ```typescript
    const list = [1, 2, 3];
    XCollect.Delete(list, 1);
    // list 变为 [1, 3]
    ```

3. Remove - 移除满足条件的第一个元素

    ```typescript
    const list = [1, 2, 3, 4];
    XCollect.Remove(list, x => x > 2); // 移除第一个大于2的元素
    // list 变为 [1, 2, 4]
    ```

### 3. 批量操作

1. AddRange - 批量添加元素

    ```typescript
    const list = [1, 2];
    XCollect.AddRange(list, [3, 4]);
    // list 变为 [1, 2, 3, 4]
    ```

2. DeleteRange - 批量删除元素

    ```typescript
    const list = [1, 2, 3, 4, 5];
    XCollect.DeleteRange(list, 1, 2);
    // list 变为 [1, 4, 5]
    ```

3. SubRange - 截取元素范围

    ```typescript
    const list = [1, 2, 3, 4, 5];
    const sub = XCollect.SubRange(list, 1, 3); 
    // 返回 [2, 3, 4]
    ```

### 4. 排序

1. Sort - 自定义排序

    ```typescript
    const list = [3, 1, 4, 2];
    XCollect.Sort(list, (a, b) => a < b); // 升序排序
    // list 变为 [1, 2, 3, 4]
    ```

## 常见问题

更多问题，请查阅[问题反馈](../CONTRIBUTING.md#问题反馈)。

## 项目信息

- [更新记录](../CHANGELOG.md)
- [贡献指南](../CONTRIBUTING.md)
- [许可证](../LICENSE)
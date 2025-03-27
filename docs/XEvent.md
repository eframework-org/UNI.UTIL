# XEvent

[![Version](https://img.shields.io/npm/v/org.eframework.uni.util)](https://www.npmjs.com/package/org.eframework.uni.util)
[![Downloads](https://img.shields.io/npm/dm/org.eframework.uni.util)](https://www.npmjs.com/package/org.eframework.uni.util)

XEvent 是一个轻量级的事件管理器，支持多重监听、单次回调等功能。

## 功能特性

- 支持事件管理：提供完整的事件注册、注销和触发机制
- 支持一次性事件：可注册执行一次后自动注销的事件回调

## 使用手册

### 1. 事件管理器

1. 创建事件管理器

    ```typescript
    // 创建允许多回调的事件管理器（默认模式）
    const eventManager = new XEvent.Manager();

    // 创建单回调模式的事件管理器
    const singleManager = new XEvent.Manager(false);
    ```

2. 清除所有事件

    ```typescript
    // 清除管理器中的所有事件注册
    eventManager.Clear();
    ```

### 2. 事件注册与注销

1. 注册事件回调

    ```typescript
    // 注册普通事件
    eventManager.Reg(1001, (data) => {
        console.log('收到事件:', data);
    });

    // 注册一次性事件（触发一次后自动注销）
    eventManager.Reg(1002, (data) => {
        console.log('这个回调只会执行一次:', data);
    }, true);
    ```

2. 注销事件回调

    ```typescript
    // 定义回调函数
    const callback = (data) => {
        console.log('收到事件:', data);
    };

    // 注册事件
    eventManager.Reg(1001, callback);

    // 注销特定回调
    eventManager.Unreg(1001, callback);

    // 注销事件的所有回调
    eventManager.Unreg(1001);
    ```

### 3. 事件触发

1. 触发事件

    ```typescript
    // 触发事件并传递多个参数
    eventManager.Notify(1002, 'action', 123, { detail: 'info' });
    ```

2. 获取事件回调

    ```typescript
    // 获取特定事件的所有回调
    const callbacks = eventManager.Get(1001);
    if (callbacks) {
        console.log(`事件1001有${callbacks.length}个回调`);
    }
    ```

## 常见问题

更多问题，请查阅[问题反馈](../CONTRIBUTING.md#问题反馈)。

## 项目信息

- [更新记录](../CHANGELOG.md)
- [贡献指南](../CONTRIBUTING.md)
- [许可证](../LICENSE)
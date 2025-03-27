# XEnv

[![Version](https://img.shields.io/npm/v/org.eframework.uni.util)](https://www.npmjs.com/package/org.eframework.uni.util)
[![Downloads](https://img.shields.io/npm/dm/org.eframework.uni.util)](https://www.npmjs.com/package/org.eframework.uni.util)

XEnv 是一个环境配置管理工具，支持多平台及运行时环境识别等功能。

## 功能特性

- 环境检测：自动识别运行环境及平台等信息
- 应用信息：获取产品名称、版本、作者、标识符等信息

## 使用手册

### 1. 环境检测

1. 运行时类型

    ```typescript
    // 运行时类型枚举
    enum RuntimeType {
        Node,    // Node.js 运行时
        Code,    // VSCode 扩展运行时
        Cocos,   // Cocos Creator 运行时
        Unity,   // Unity 运行时
        Unreal,  // Unreal Engine 运行时
        Electron,// Electron 运行时
        Dom      // 浏览器 DOM 运行时
    }

    // 获取当前运行时类型
    const runtime = XEnv.Runtime; // 返回RuntimeType枚举值

    // 使用预定义常量检查特定运行时
    if (XEnv.IsNode) {
        // Node.js环境下的逻辑
    }
    if (XEnv.IsCocos) {
        // Cocos环境下的逻辑
    }
    ```

2. 平台类型

    ```typescript
    // 平台类型枚举
    enum PlatformType {
        Unknown, // 未知平台
        Windows, // Windows 平台
        Linux,   // Linux 平台
        macOS,     // macOS 平台
        Android, // Android 平台
        iOS,     // iOS 平台
        Browser  // 浏览器平台
    }

    // 获取当前平台类型
    const platform = XEnv.Platform; // 返回PlatformType枚举值

    // 使用预定义常量检查特定平台
    if (XEnv.IsNative) {
        // 原生平台下的逻辑
    }
    if (XEnv.IsBrowser) {
        // 浏览器环境下的逻辑
    }
    ```

### 2. 应用信息

1. 获取基本信息

    ```typescript
    // 获取产品信息
    const appName = XEnv.Product;
    const appVersion = XEnv.Version;
    const appAuthor = XEnv.Author;
    const appId = XEnv.Identifier;
    const appDesc = XEnv.Description;

    console.log(`${appName} v${appVersion} by ${appAuthor}`);
    ```

## 常见问题

更多问题，请查阅[问题反馈](../CONTRIBUTING.md#问题反馈)。

## 项目信息

- [更新记录](../CHANGELOG.md)
- [贡献指南](../CONTRIBUTING.md)
- [许可证](../LICENSE)
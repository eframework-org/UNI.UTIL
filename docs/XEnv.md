# XEnv

[![Version](https://img.shields.io/npm/v/org.eframework.uni.util)](https://www.npmjs.com/package/org.eframework.uni.util)
[![Downloads](https://img.shields.io/npm/dm/org.eframework.uni.util)](https://www.npmjs.com/package/org.eframework.uni.util)

XEnv 是一个环境配置管理工具，支持多平台及运行时环境识别、提供路径处理及文件操作等功能。

## 功能特性

- 支持运行时检测：识别Node.js、VSCode、Cocos、Unity等多种运行环境
- 支持平台检测：识别Windows、Linux、macOS、Android、iOS等操作系统平台
- 提供路径处理：规范化路径、连接路径、获取目录名称
- 支持文件操作：检查文件/目录存在、创建目录
- 提供应用信息：获取产品名称、版本、作者、标识符等信息

## 使用手册

### 1. 运行时和平台检测

1. 运行时类型

    ```typescript
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

### 2. 路径处理

1. 获取本地数据路径

    ```typescript
    // 获取适用于当前环境的数据存储路径
    const dataPath = XEnv.LocalPath;
    ```

2. 处理不同环境的路径兼容性

    ```typescript
    // 在不支持的环境下会抛出错误
    try {
        // 执行环境相关操作
    } catch (error) {
        if (error === XEnv.Unsupport) {
            console.log("当前环境不支持此操作");
        }
    }
    ```

### 3. 应用信息

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

### 4. 运行时类型枚举

1. RuntimeType 枚举定义

    ```typescript
    enum RuntimeType {
        Node,    // Node.js 运行时
        Code,    // VSCode 扩展运行时
        Cocos,   // Cocos Creator 运行时
        Unity,   // Unity 运行时
        Unreal,  // Unreal Engine 运行时
        Electron,// Electron 运行时
        Dom      // 浏览器 DOM 运行时
    }
    ```

### 5. 平台类型枚举

1. PlatformType 枚举定义

    ```typescript
    enum PlatformType {
        Unknown, // 未知平台
        Windows, // Windows 平台
        Linux,   // Linux 平台
        OSX,     // macOS 平台
        Android, // Android 平台
        iOS,     // iOS 平台
        Browser  // 浏览器平台
    }
    ```

## 常见问题

更多问题，请查阅[问题反馈](../CONTRIBUTING.md#问题反馈)。

## 项目信息

- [更新记录](../CHANGELOG.md)
- [贡献指南](../CONTRIBUTING.md)
- [许可证](../LICENSE)
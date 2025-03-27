# XLog

[![Version](https://img.shields.io/npm/v/org.eframework.uni.util)](https://www.npmjs.com/package/org.eframework.uni.util)
[![Downloads](https://img.shields.io/npm/dm/org.eframework.uni.util)](https://www.npmjs.com/package/org.eframework.uni.util)

XLog 提供了一个遵循 RFC5424 标准的日志系统，支持多级别输出和内置堆栈追踪。

## 功能特性

- 支持多级别日志：基于 RFC5424 标准实现 8 个严重程度等级
- 提供格式化功能：支持使用占位符格式化日志信息
- 内置堆栈追踪：支持获取调用堆栈信息

## 使用手册

### 1. 记录不同级别的日志

1. 基本用法

    ```typescript
    // 记录各种级别的日志
    XLog.Debug("调试信息");
    XLog.Info("普通信息");
    XLog.Notice("需要关注的信息");
    XLog.Warn("警告信息");
    XLog.Error("错误信息");
    XLog.Critical("严重错误");
    XLog.Alert("需要立即处理的错误");
    XLog.Emergency("系统不可用");
    ```

2. 使用格式化参数

    ```typescript
    // 使用占位符格式化日志
    XLog.Info("用户 {0} 登录成功，等级: {1}", "张三", 10);
    XLog.Error("加载文件 {0} 失败: {1}", "config.json", "文件不存在");
    ```

### 2. 异常处理

1. 记录异常信息

    ```typescript
    try {
        // 可能抛出异常的代码
        throw new Error("出现未知错误");
    } catch (error) {
        // 输出异常信息
        XLog.Panic(error, "处理数据时出错");
    }
    ```

2. 获取堆栈信息

    ```typescript
    // 获取当前调用堆栈
    const stackTrace = XLog.Trace();
    XLog.Debug("当前堆栈: " + stackTrace);

    // 指定堆栈层级和错误信息
    const customTrace = XLog.Trace(1, "自定义错误");
    XLog.Debug("自定义堆栈: " + customTrace);
    ```

### 3. 日志级别定义

1. LevelType枚举

    ```typescript
    enum LevelType {
        Emergency = 0, // 紧急：系统不可用
        Alert = 1,     // 警报：需要立即采取行动
        Critical = 2,  // 严重：严重故障
        Error = 3,     // 错误：一般错误
        Warn = 4,      // 警告：潜在问题
        Notice = 5,    // 通知：重要但正常的情况
        Info = 6,      // 信息：一般信息
        Debug = 7      // 调试：调试信息
    }
    ```

## 常见问题

### 1. 日志格式是什么样的？
标准格式为：`[时间戳] [日志级别] 日志内容`，时间戳格式为 `MM/dd hh:mm:ss.SSS`，日志级别使用单字母缩写表示，如[E]表示错误，[I]表示信息。

更多问题，请查阅[问题反馈](../CONTRIBUTING.md#问题反馈)。

## 项目信息

- [更新记录](../CHANGELOG.md)
- [贡献指南](../CONTRIBUTING.md)
- [许可证](../LICENSE)
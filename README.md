# EFramework Utility for Unite

[![Version](https://img.shields.io/npm/v/org.eframework.uni.util)](https://www.npmjs.com/package/org.eframework.uni.util)
[![Downloads](https://img.shields.io/npm/dm/org.eframework.uni.util)](https://www.npmjs.com/package/org.eframework.uni.util)

EFramework Utility for Unite 是一个轻量级、跨平台的工具集，提供了统一的 API 接口，确保在多平台环境下保持一致的运行结果。

## 功能特性

- [XCollect](docs/XCollect.md) 提供了集合工具，实现了数组/列表的增删改查、排序等功能
- [XEnv](docs/XEnv.md) 是一个环境管理工具，支持多平台及运行时环境识别等功能
- [XEvent](docs/XEvent.md) 是一个轻量级的事件管理器，支持多重监听、单次回调等功能
- [XFile](docs/XFile.md) 实现了跨平台的文件管理系统，支持在不同运行环境下进行统一的文件和目录操作
- [XLog](docs/XLog.md) 提供了一个遵循 RFC5424 标准的日志系统，支持多级别输出和内置堆栈追踪
- [XObject](docs/XObject.md) 提供了对象操作工具集，支持类型判断、函数绑定、方法劫持等功能
- [XString](docs/XString.md) 提供了字符串处理工具集，支持查找、替换、格式化以及编码转换等功能
- [XTest](docs/XTest.md) 提供了轻量级测试框架，支持 Jest 集成和独立运行两种模式
- [XTime](docs/XTime.md) 提供了时间处理工具，支持日期格式化和时间戳转换等常用时间操作
- [XUtility](docs/XUtility.md) 提供了一组通用工具集，支持 UUID 生成、可执行文件查找和随机数生成等常用操作

### 平台支持

| Runtime/Platform | Windows | Linux | macOS | Android | iOS | Browser |
| :-: | :-: | :-: | :-: | :-: | :-: | :-: |
| Node | ✅ | ✅ | ✅ | ➖ | ➖ | ➖ |
| Code | ✅ | ✅ | ✅ | ➖ | ➖ | ➖ |
| Cocos | ✅ | 📅 | 📅 | 📅 | 📅 | 📅 |
| Unity | ✅ | 📅 | ✅ | ✅ | ✅ | 📅 |
| Unreal | 📅 | 📅 | 📅 | 📅 | 📅 | 📅 |
| Electron | 📅 | 📅 | 📅 | ➖ | ➖ | ➖ |
| Dom | ➖ | ➖ | ➖ | ➖ | ➖ | 📅 |
- ✅已支持  📅开发中  ➖不适用

## 常见问题

更多问题，请查阅[问题反馈](CONTRIBUTING.md#问题反馈)。

## 项目信息

- [更新记录](CHANGELOG.md)
- [贡献指南](CONTRIBUTING.md)
- [许可证](LICENSE)
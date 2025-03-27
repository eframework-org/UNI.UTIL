# XTime

[![Version](https://img.shields.io/npm/v/org.eframework.uni.util)](https://www.npmjs.com/package/org.eframework.uni.util)
[![Downloads](https://img.shields.io/npm/dm/org.eframework.uni.util)](https://www.npmjs.com/package/org.eframework.uni.util)

XTime 提供了时间处理工具，支持日期格式化和时间戳转换等常用时间操作。

## 功能特性

- 日期格式化：支持自定义格式模板的日期展示
- 时间戳转换：支持获取秒级和毫秒级时间戳

## 使用手册

### 1. 日期格式化

1. 通过`Format`函数可以将日期对象格式化为指定的字符串格式：

    ```typescript
    // 格式化当前日期
    const now = new Date();
    const formattedDate = XTime.Format(now, "yyyy-MM-dd hh:mm:ss");  // 例如："2025-01-28 14:30:00"
    const chineseDate = XTime.Format(now, "yyyy年MM月dd日");  // 例如："2025年01月28日"
    ```

**支持的格式化占位符**：
- `yyyy`: 年份
- `MM`: 月份，补零
- `dd`: 日期，补零
- `hh`: 小时，补零
- `mm`: 分钟，补零
- `ss`: 秒钟，补零
- `SSS`: 毫秒，补零
- `q`: 季度

### 2. 获取时间戳

1. XTime提供了获取当前时间戳的两个函数：

    ```typescript
    // 获取秒级时间戳
    const timestampInSeconds = XTime.GetTimestamp();  // 例如：1706428800

    // 获取毫秒级时间戳
    const timestampInMilliseconds = XTime.GetMilliSecond();  // 例如：1706428800000
    ```

## 常见问题

更多问题，请查阅[问题反馈](../CONTRIBUTING.md#问题反馈)。

## 项目信息

- [更新记录](../CHANGELOG.md)
- [贡献指南](../CONTRIBUTING.md)
- [许可证](../LICENSE)
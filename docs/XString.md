# XString

[![Version](https://img.shields.io/npm/v/org.eframework.uni.util)](https://www.npmjs.com/package/org.eframework.uni.util)
[![Downloads](https://img.shields.io/npm/dm/org.eframework.uni.util)](https://www.npmjs.com/package/org.eframework.uni.util)

XString 提供了字符串处理工具集，支持查找、替换、格式化以及编码转换等功能。

## 功能特性

- 支持字符串基本操作：判空、查找、截取、分割等常用功能
- 提供字符串匹配检测：包含、前缀、后缀检查
- 实现字符串格式化：使用占位符进行文本格式化
- 提供编码转换：Base64编码解码、文本与二进制互转

## 使用手册

### 1. 字符串基本操作

1. 判空与检查

    ```typescript
    // 检查字符串是否为空
    XString.IsNullOrEmpty("");      // true
    XString.IsNullOrEmpty(null);    // true
    XString.IsNullOrEmpty("hello"); // false

    // 字符串常量
    const emptyStr = XString.Empty; // 空字符串
    ```

2. 查找与索引

    ```typescript
    // 查找子字符串位置
    XString.IndexOf("hello world", "world");   // 返回 6
    XString.LastIndexOf("hello.world.js", "."); // 返回 10

    // 检查是否包含子字符串
    XString.Contains("hello world", "world");   // true
    XString.Contains("hello world", "xyz");     // false
    ```

3. 截取与分割

    ```typescript
    // 截取子字符串
    XString.Sub("hello world", 0, 5);  // 返回 "hello"

    // 分割字符串
    XString.Split("a,b,c", ",");       // 返回 ["a", "b", "c"]
    XString.Split("hello world", " ");  // 返回 ["hello", "world"]
    ```

### 2. 字符串处理

1. 修饰与替换

    ```typescript
    // 去除首尾空格
    XString.Trim("  hello  ");  // 返回 "hello"

    // 替换字符串
    XString.Replace("hello world", "world", "universe");  // 返回 "hello universe"
    ```

2. 前缀后缀检查

    ```typescript
    // 检查前缀
    XString.StartsWith("hello world", "hello");  // true
    XString.StartsWith("hello world", "world");  // false

    // 检查后缀
    XString.EndsWith("hello world", "world");    // true
    XString.EndsWith("hello world", "hello");    // false
    ```

### 3. 字符串格式化

1. 使用占位符格式化

    ```typescript
    // 简单替换
    XString.Format("Hello {0}!", "world");            // 返回 "Hello world!"

    // 多参数替换
    XString.Format("{0} + {1} = {2}", 1, 2, 3);       // 返回 "1 + 2 = 3"

    // 复杂对象格式化
    const user = { name: "张三" };
    XString.Format("用户: {0}", user);                // 返回 "用户: [object Object]"
    ```

### 4. 版本号处理

1. 版本号转换

    ```typescript
    // 字符串版本号转为数字
    XString.ToVersion("1.2.3");    // 返回数字表示
    XString.ToVersion("v1.2");     // 同样可以处理

    // 数字版本号转为字符串
    XString.FromVersion(10203);    // 返回 "1.2.3"
    ```

### 5. 编码转换

1. Base64编码

    ```typescript
    // 文本转Base64
    XString.ToBase64("Hello");     // 返回 "SGVsbG8="

    // Base64解码
    XString.FromBase64("SGVsbG8="); // 返回 "Hello"
    ```

2. 二进制转换

    ```typescript
    // 字符串转ArrayBuffer
    const buffer = XString.ToBuffer("Hello");

    // ArrayBuffer转字符串
    const text = XString.FromBuffer(buffer);  // 返回 "Hello"
    ```

## 常见问题

更多问题，请查阅[问题反馈](../CONTRIBUTING.md#问题反馈)。

## 项目信息

- [更新记录](../CHANGELOG.md)
- [贡献指南](../CONTRIBUTING.md)
- [许可证](../LICENSE)
# XUtility

[![Version](https://img.shields.io/npm/v/org.eframework.uni.util)](https://www.npmjs.com/package/org.eframework.uni.util)
[![Downloads](https://img.shields.io/npm/dm/org.eframework.uni.util)](https://www.npmjs.com/package/org.eframework.uni.util)

XUtility 提供了一组通用工具集，支持可执行文件查找和随机数生成等常用操作。

## 功能特性

- 进程执行：提供配置子进程执行环境的选项
- 文件查找：在系统 PATH 和自定义路径中查找可执行文件
- 随机数生成：支持生成指定范围内的随机整数

## 使用手册

### 1. 进程执行选项

1. 使用`ExecOpt`函数可以生成用于子进程执行的选项对象：

    ```typescript
    const options = XUtility.ExecOpt("./project");
    require("child_process").exec("npm install", options);
    ```

2. 生成的选项对象包含以下配置：
- `encoding`: "utf8"
- `timeout`: 0（无超时限制）
- `maxBuffer`: 1GB
- `killSignal`: "SIGTERM"
- `cwd`: 指定的工作目录
- `env`: 继承自当前进程的环境变量

### 2. 查找可执行文件

1. 使用`FindBin`函数可以在系统PATH和指定的附加目录中查找可执行文件：

    ```typescript
    const gitPath = XUtility.FindBin("git", "C:/Program Files/Git/bin");
    if (gitPath) {
        console.log("Git found at:", gitPath);
    }
    ```

2. 在Windows系统上，会自动尝试查找带`.exe`和`.bat`扩展名的文件。

### 3. 随机数生成

1. 使用`RandomRange`函数可以生成指定范围内的随机整数（包含最小值和最大值）：

    ```typescript
    const roll = XUtility.RandomRange(1, 6); // 生成1到6之间的随机数（骰子）
    const percent = XUtility.RandomRange(0, 100); // 生成0到100之间的随机数（百分比）
    ```

## 常见问题

更多问题，请查阅[问题反馈](../CONTRIBUTING.md#问题反馈)。

## 项目信息

- [更新记录](../CHANGELOG.md)
- [贡献指南](../CONTRIBUTING.md)
- [许可证](../LICENSE)
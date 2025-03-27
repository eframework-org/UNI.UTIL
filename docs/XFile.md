# XFile

[![Version](https://img.shields.io/npm/v/org.eframework.uni.util)](https://www.npmjs.com/package/org.eframework.uni.util)
[![Downloads](https://img.shields.io/npm/dm/org.eframework.uni.util)](https://www.npmjs.com/package/org.eframework.uni.util)

XFile 提供了跨平台文件系统操作功能，支持在不同运行环境下进行统一的文件和目录操作。

## 功能特性

- 支持文件和目录基本操作：创建、读写、删除、复制
- 提供路径处理：规范化路径、合并路径、获取路径组成部分
- 提供压缩解压功能：支持zip、7z等格式的文件压缩和解压

## 使用手册

### 1. 前置条件

- Windows 环境需要安装 [7-Zip](https://www.7-zip.org/) 或 [WinRAR](https://www.win-rar.com/)
- macOS 环境需要安装 p7zip：`brew install p7zip`

### 2. 文件操作

1. 读写文件

    ```typescript
    // 检查文件是否存在
    if (XFile.HasFile("config.json")) {
        // 读取二进制文件
        const data = XFile.OpenFile("data.bin");
        
        // 读取文本文件
        const text = XFile.OpenText("config.json");
        
        // 写入二进制数据
        const buffer = new ArrayBuffer(8);
        XFile.SaveFile("output.bin", buffer);
        
        // 写入文本数据
        XFile.SaveText("log.txt", "操作成功");
    }
    ```

2. 删除和复制文件

    ```typescript
    // 删除文件
    XFile.DeleteFile("temp.txt");

    // 复制文件
    XFile.CopyFile("source.dat", "backup/source.dat");
    ```

### 3. 目录操作

1. 目录的创建与检查

    ```typescript
    // 检查目录是否存在
    if (!XFile.HasDirectory("logs")) {
        // 创建目录（支持多级目录递归创建）
        XFile.CreateDirectory("logs/app/debug");
    }
    ```

2. 删除和复制目录

    ```typescript
    // 删除目录（包括所有子目录和文件）
    XFile.DeleteDirectory("temp");

    // 复制目录（包括所有子目录和文件）
    XFile.CopyDirectory("source", "backup/source");
    ```

### 4. 路径处理

1. 路径操作

    ```typescript
    // 规范化路径（处理 . 和 .. 并统一分隔符）
    const normalPath = XFile.NormalizePath("dir/../data/./file.txt");
    // 结果: "data/file.txt"

    // 合并路径
    const fullPath = XFile.PathJoin("base", "subdir", "file.txt");
    // 结果: "base/subdir/file.txt"
    ```

2. 路径组成部分

    ```typescript
    // 获取父目录
    const parent = XFile.DirectoryName("/path/to/file.txt");
    // 结果: "/path/to"

    // 获取文件名（带扩展名）
    const filename = XFile.FileName("/path/to/file.txt");
    // 结果: "file.txt"

    // 获取文件名（不带扩展名）
    const basename = XFile.FileName("/path/to/file.txt", false);
    // 结果: "file"

    // 获取文件扩展名
    const ext = XFile.FileExtension("/path/to/file.txt");
    // 结果: ".txt"
    ```

### 5. 压缩和解压

1. 压缩目录

    ```typescript
    // 压缩目录到默认位置（目录名.zip）
    XFile.Zip("./dist", null, () => {
        console.log("压缩完成");
    });

    // 压缩目录到指定位置
    XFile.Zip("./dist", "./releases/app-1.0.0.zip", () => {
        console.log("压缩完成");
    });
    ```

2. 解压文件

    ```typescript
    // 解压到指定目录
    XFile.Unzip("data.zip", "./extracted", () => {
        console.log("解压完成");
    });
    ```

### 6. 其他功能

1. 在系统资源管理器中显示文件

    ```typescript
    // 在文件浏览器中打开并选中文件
    XFile.ShowInExplorer("./logs/error.log");
    ```

2. Base64编码文件操作

    ```typescript
    // 读取Base64编码的文件
    const data = XFile.OpenBase64("encoded.txt");

    // 保存为Base64编码的文件
    XFile.SaveBase64("encoded.txt", "原始数据");
    ```

## 常见问题

更多问题，请查阅[问题反馈](../CONTRIBUTING.md#问题反馈)。

## 项目信息

- [更新记录](../CHANGELOG.md)
- [贡献指南](../CONTRIBUTING.md)
- [许可证](../LICENSE)
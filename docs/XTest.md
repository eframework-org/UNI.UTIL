# XTest

[![Version](https://img.shields.io/npm/v/org.eframework.uni.util)](https://www.npmjs.com/package/org.eframework.uni.util)
[![Downloads](https://img.shields.io/npm/dm/org.eframework.uni.util)](https://www.npmjs.com/package/org.eframework.uni.util)

XTest 提供了轻量级测试框架，支持 Jest 集成和独立运行两种模式。

## 功能特性

- 提供断言功能：丰富的值比较和类型检查断言
- 提供详细日志：测试过程中自动记录环境信息和执行时间

## 使用手册

### 1. 基本测试

1. 创建测试用例

    ```typescript
    // 定义一个简单的测试用例
    XTest.Test("加法测试", async () => {
        const result = 1 + 2;
        XTest.Expect(result).ToBe(3);
    });
    ```

2. 运行测试

    ```typescript
    // 在Jest环境中自动运行
    // 在独立环境中需要手动执行返回的函数

    // 创建并立即执行测试
    (XTest.Test("独立环境测试", async () => {
        // 测试代码
    }))();
    ```

### 2. 断言功能

1. 值比较断言

    ```typescript
    // 等值比较
    XTest.Expect(2 + 2).ToBe(4);

    // 大小比较
    XTest.Expect(5).ToBeGreaterThan(3);
    XTest.Expect(5).ToBeGreaterThanOrEqual(5);
    XTest.Expect(3).ToBeLessThan(5);
    XTest.Expect(3).ToBeLessThanOrEqual(3);
    ```

2. 类型检查断言

    ```typescript
    // null检查
    XTest.Expect(null).ToBeNull();
    XTest.Expect(undefined).Not.ToBeNull();

    // undefined检查
    XTest.Expect(undefined).ToBeUndefined();
    XTest.Expect("hello").Not.ToBeUndefined();

    // NaN检查
    XTest.Expect(NaN).ToBeNaN();
    XTest.Expect(123).Not.ToBeNaN();
    ```

### 3. 断言标签和参数

1. 使用标签提高可读性

    ```typescript
    // 添加描述性标签
    const score = 85;
    XTest.Expect(score, "考试分数").ToBeGreaterThan(60);

    // 添加额外参数提供上下文
    const user = { name: "张三", age: 25 };
    XTest.Expect(user.age, "用户年龄", user).ToBeGreaterThan(18);
    ```

2. 否定断言

    ```typescript
    // 使用Not属性进行否定断言
    XTest.Expect("hello").Not.ToBe("world");
    XTest.Expect(null).Not.ToBeUndefined();
    ```

## 常见问题

### 1. XTest 与 Jest 有什么区别？
1. XTest 提供了比 Jest 更轻量的 API，同时兼容 Jest 环境。
2. 在 Jest 环境中，XTest 会自动集成到 Jest 的测试流程。
3. 在独立环境中，XTest 可以独立运行，不依赖 Jest。

更多问题，请查阅[问题反馈](../CONTRIBUTING.md#问题反馈)。

## 项目信息

- [更新记录](../CHANGELOG.md)
- [贡献指南](../CONTRIBUTING.md)
- [许可证](../LICENSE)
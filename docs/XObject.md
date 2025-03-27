# XObject

[![Version](https://img.shields.io/npm/v/org.eframework.uni.util)](https://www.npmjs.com/package/org.eframework.uni.util)
[![Downloads](https://img.shields.io/npm/dm/org.eframework.uni.util)](https://www.npmjs.com/package/org.eframework.uni.util)

XObject 提供了对象操作工具集，支持类型判断、函数绑定、方法劫持等功能。

## 功能特性

- 支持类型判断：判断对象是值类型、引用类型、函数类型或类
- 实现方法劫持：替换和恢复对象方法
- 提供对象复制：深度克隆对象及计算哈希码
- 支持函数绑定：确保方法调用时保持正确的this引用

## 使用手册

### 1. 类型判断

1. 基本类型判断

    ```typescript
    // 判断值类型（数字、字符串、布尔值）
    XObject.IsValue(123);        // true
    XObject.IsValue("abc");      // true
    XObject.IsValue(true);       // true
    XObject.IsValue(new Date()); // false

    // 判断引用类型（对象、数组等非值类型）
    XObject.IsObject({});         // true
    XObject.IsObject([]);         // true
    XObject.IsObject(new Date()); // true
    XObject.IsObject(123);        // false
    ```

2. 函数和类判断

    ```typescript
    // 判断函数类型
    function fn() {}
    XObject.IsFunction(fn);      // true
    XObject.IsFunction(() => {}); // true

    // 判断类
    class MyClass {}
    XObject.IsClass(MyClass);    // true
    XObject.IsClass(fn);         // false
    ```

### 2. 反射操作

1. 键值访问

    ```typescript
    // 获取枚举值对应的键名
    enum Color { Red = 1, Green = 2, Blue = 3 }
    XObject.Key(Color, 2);       // 返回 "Green"

    // 获取对象中键对应的值
    const obj = { name: "张三", age: 25 };
    XObject.Value(obj, "name");  // 返回 "张三"
    ```

2. 反射调用

    ```typescript
    // 通过字符串调用对象方法
    const calculator = {
        add: (a, b) => a + b
    };
    XObject.Invoke(calculator, "add", 1, 2);  // 返回 3
    ```

### 3. 对象操作

1. 对象克隆

    ```typescript
    // 深度克隆对象
    const original = { 
        name: "张三", 
        info: { age: 25, scores: [90, 85, 92] },
        secret: "密码"
    };
    // 克隆时排除某些字段
    const cloned = XObject.Clone(original, "secret");
    // cloned 包含 name 和 info，但不包含 secret
    ```

2. 计算哈希码

    ```typescript
    // 计算对象哈希码
    XObject.HashCode("abc");       // 计算字符串哈希
    XObject.HashCode([1, 2, 3]);   // 计算数组哈希
    XObject.HashCode({a: 1, b: 2}); // 计算对象哈希
    ```

### 4. 方法劫持

1. 替换和恢复方法

    ```typescript
    // 替换对象方法
    const obj = { 
        greet() { console.log("你好"); }
    };

    // 保存原始方法并替换
    const original = XObject.Hook(obj, "greet", function() {
        console.log("替换后的问候");
    });

    obj.greet();  // 输出 "替换后的问候"

    // 恢复原始方法
    XObject.Unhook(obj, "greet");
    obj.greet();  // 输出 "你好"
    ```

### 5. 函数绑定

1. 使用装饰器

    ```typescript
    class MyComponent extends XObject.Base {
        name = "组件1";
        
        @XObject.This()
        getName() {
            return this.name;
        }
    }

    const comp = new MyComponent();
    const getName = comp.getName;
    getName();  // 返回 "组件1"，即使脱离了对象上下文
    ```

2. 继承Base类

    ```typescript
    // 继承Base类自动为标记的方法绑定this
    class Controller extends XObject.Base {
        status = "在线";
        
        @XObject.This()
        getStatus() {
            return this.status;
        }
    }
    ```

## 常见问题

1. This装饰器与普通bind有什么区别？
XObject.This装饰器在对象实例化时自动绑定this，不需要每次手动调用bind。它是声明式的，更加简洁，并且在对象方法被传递给其他函数作为回调时特别有用。

更多问题，请查阅[问题反馈](../CONTRIBUTING.md#问题反馈)。

## 项目信息

- [更新记录](../CHANGELOG.md)
- [贡献指南](../CONTRIBUTING.md)
- [许可证](../LICENSE)
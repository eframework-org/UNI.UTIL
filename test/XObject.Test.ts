// Copyright (c) 2025 EFramework Organization. All rights reserved.
// Use of this source code is governed by a MIT-style
// license that can be found in the LICENSE file.

import { XObject } from "../src/XObject"
import { XTest } from "../src/XTest"

export const TestXObject = XTest.Test("XObject", async () => {
    class Hello extends XObject.Base {
        public Str1: string = "hello world"
        public Hi1(): string { return this.Str1 }

        public static Str2: string = "hi world"
        public static Hi2(): string { return this.Str2 }

        @XObject.This()
        public Hi3(): string { return this.Str1 }
    }

    const hi = (): string => "hi world"

    let obj = new Hello()

    const hhi1 = obj.Hi1
    let failed = false
    try { hhi1() } catch { failed = true }
    XTest.Expect(failed, "Unbind this").ToBe(true)
    let hhi3 = obj.Hi3
    XTest.Expect(hhi3(), "Bind this").ToBe(obj.Str1)

    XObject.Hook(obj, "Hi1", hi)
    XTest.Expect(obj.Hi1(), "Hook instance").ToBe("hi world")

    XObject.Unhook(obj, "Hi1")
    XTest.Expect(obj.Hi1(), "Unhook instance").ToBe("hello world")

    XObject.Hook(Hello, "Hi1", hi)
    XTest.Expect(obj.Hi1(), "Hook class").ToBe("hi world")

    XObject.Unhook(Hello, "Hi1")
    XTest.Expect(obj.Hi1(), "Unhook class").ToBe("hello world")

    XTest.Expect(XObject.IsValue("hello world"), "IsValue of string").ToBe(true)
    XTest.Expect(XObject.IsValue(true), "IsValue of boolean").ToBe(true)
    XTest.Expect(XObject.IsValue(5.55), "IsValue of number").ToBe(true)
    XTest.Expect(XObject.IsValue(new Hello()), "IsValue of object").ToBe(false)
    XTest.Expect(XObject.IsValue(Hello), "IsValue of class").ToBe(false)

    XTest.Expect(XObject.IsFunction(null), "IsFunction of null").ToBe(false)
    XTest.Expect(XObject.IsFunction(1), "IsFunction of number").ToBe(false)
    XTest.Expect(XObject.IsFunction(new Hello()), "IsFunction of object").ToBe(false)
    XTest.Expect(XObject.IsFunction(Hello), "IsFunction of class").ToBe(false)
    XTest.Expect(XObject.IsFunction(new Hello().Hi1), "IsFunction of function").ToBe(true)

    XTest.Expect(XObject.IsClass(null), "IsClass of null").ToBe(false)
    XTest.Expect(XObject.IsClass(1), "IsClass of number").ToBe(false)
    XTest.Expect(XObject.IsClass(new Hello()), "IsClass of object").ToBe(false)
    XTest.Expect(XObject.IsClass(new Hello().Hi1), "IsClass of function").ToBe(false)
    XTest.Expect(XObject.IsClass(Hello), "IsClass of class").ToBe(true)

    obj = new Hello()
    XTest.Expect(XObject.Key(obj, obj.Str1), "Key of object").ToBe("Str1")
    XTest.Expect(XObject.Key(Hello, Hello.Str2), "Key of class").ToBe("Str2")

    XTest.Expect(XObject.Value(obj, "Str1"), "Value of object").ToBe("hello world")
    XTest.Expect(XObject.Value(Hello, "Str2"), "Value of class").ToBe("hi world")

    XTest.Expect(XObject.Invoke(obj, "Hi1"), "Invoke of object").ToBe("hello world")
    XTest.Expect(XObject.Invoke(Hello, "Hi2"), "Invoke of class").ToBe("hi world")

    XTest.Expect(XObject.Clone<Hello>(obj).Hi1(), "Clone of object").ToBe("hello world")
    let arr = [1, 2, 3]
    XTest.Expect(XObject.Clone<number[]>(arr)[0], "Clone of array").ToBe(1)

    let hstr = XObject.HashCode("hello world")
    let hobj = XObject.HashCode(obj)
    let harr = XObject.HashCode(arr)
    XTest.Expect(hstr, "HashCode of string").Not.ToBe(0)
    XTest.Expect(hobj, "HashCode of object").Not.ToBe(0)
    XTest.Expect(harr, "HashCode of array").Not.ToBe(0)
})
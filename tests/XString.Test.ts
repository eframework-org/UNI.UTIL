// Copyright (c) 2025 EFramework Organization. All rights reserved.
// Use of this source code is governed by a MIT-style
// license that can be found in the LICENSE file.

import { XString } from "../src/XString"
import { XTest } from "../src/XTest"

export const TestXString = XTest.Test("XString", async () => {
    XTest.Expect(XString.IsNullOrEmpty(""), "IsNullOrEmpty").ToBe(true)
    XTest.Expect(XString.IsNullOrEmpty("hello world"), "IsNullOrEmpty").ToBe(false)

    XTest.Expect(XString.IndexOf("hello", "l"), "IndexOf").ToBe(2)
    XTest.Expect(XString.LastIndexOf("hello", "l"), "LastIndexOf").ToBe(3)
    XTest.Expect(XString.IndexOf("hello", "x"), "IndexOf").ToBe(-1)

    XTest.Expect(XString.Sub("hello world", 5, 11), "Sub").ToBe(" world")

    XTest.Expect(XString.Replace("hello", "l", ""), "Replace").ToBe("heo")
    XTest.Expect(XString.Replace("hello", "x", ""), "Replace").ToBe("hello")

    XTest.Expect(XString.Trim(" hello \n"), "Trim").ToBe("hello")
    XTest.Expect(XString.Trim(" hello "), "Trim").ToBe("hello")

    XTest.Expect(XString.Split("hello", "l")[0], "Split").ToBe("he")

    XTest.Expect(XString.Contains("hello", "l"), "Contains").ToBe(true)
    XTest.Expect(XString.Contains("hello", "x"), "Contains").ToBe(false)

    XTest.Expect(XString.StartsWith("hello", "he"), "StartsWith").ToBe(true)
    XTest.Expect(XString.StartsWith(" hello", "he"), "StartsWith").ToBe(false)

    XTest.Expect(XString.EndsWith("hello", "lo"), "EndsWith").ToBe(true)
    XTest.Expect(XString.EndsWith("hello ", "lo"), "EndsWith").ToBe(false)

    XTest.Expect(XString.Format("{0} {1} {2} {3}", "hello", "world", 9999, true), "Format").ToBe("hello world 9999 true")

    let buf = XString.ToBuffer("hello world")
    XTest.Expect(buf, "ToBuffer").Not.ToBeNull()
    XTest.Expect(XString.FromBuffer(buf), "FromBuffer").ToBe("hello world")

    XTest.Expect(XString.FromBase64(XString.ToBase64("hello world")), "FromBase64").ToBe("hello world")

    XTest.Expect(XString.ToVersion("1.10.0"), "ToVersion").ToBe(11000)
    XTest.Expect(XString.FromVersion(11000), "FromVersion").ToBe("1.10.0")

    // 测试 Random 函数的各种格式
    {
        // 测试默认格式 (N)
        const randomN = XString.Random()
        XTest.Expect(randomN.length, "Random N format length").ToBe(32)
        XTest.Expect(randomN.indexOf("-"), "Random N format no hyphens").ToBe(-1)

        // 测试 D 格式 (带连字符)
        const randomD = XString.Random("D")
        XTest.Expect(randomD.length, "Random D format length").ToBe(36)
        XTest.Expect(randomD.split("-").length, "Random D format hyphen count").ToBe(5)

        // 测试 B 格式 (带大括号和连字符)
        const randomB = XString.Random("B")
        XTest.Expect(randomB.charAt(0), "Random B format opening brace").ToBe("{")
        XTest.Expect(randomB.charAt(randomB.length - 1), "Random B format closing brace").ToBe("}")
        XTest.Expect(randomB.length, "Random B format length").ToBe(38)

        // 测试 P 格式 (带括号和连字符)
        const randomP = XString.Random("P")
        XTest.Expect(randomP.charAt(0), "Random P format opening parenthesis").ToBe("(")
        XTest.Expect(randomP.charAt(randomP.length - 1), "Random P format closing parenthesis").ToBe(")")
        XTest.Expect(randomP.length, "Random P format length").ToBe(38)

        // 测试无效格式 (应该默认为 N 格式)
        const randomInvalid = XString.Random("X")
        XTest.Expect(randomInvalid.length, "Random invalid format length").ToBe(32)
        XTest.Expect(randomInvalid.indexOf("-"), "Random invalid format no hyphens").ToBe(-1)
    }
})
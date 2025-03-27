// Copyright (c) 2025 EFramework Organization. All rights reserved.
// Use of this source code is governed by a MIT-style
// license that can be found in the LICENSE file.

import { XEnv } from "../src/XEnv"
import { XTest } from "../src/XTest"

export const TestXEnv = XTest.Test("XEnv", async () => {
    XTest.Expect(XEnv.LocalPath, "DataPath").Not.ToBe("Unknown")
    if (XEnv.IsNode) {
        const path = require("path")
        if (process.platform == "win32") XTest.Expect(XEnv.Platform, "Platform").ToBe(XEnv.PlatformType.Windows)
        else if (process.platform == "linux") XTest.Expect(XEnv.Platform, "Platform").ToBe(XEnv.PlatformType.Linux)
        else if (process.platform == "darwin") XTest.Expect(XEnv.Platform, "Platform").ToBe(XEnv.PlatformType.macOS)
        else if (process.platform == "android") XTest.Expect(XEnv.Platform, "Platform").ToBe(XEnv.PlatformType.Android)
        else XTest.Expect(XEnv.Platform, "Platform").ToBe(XEnv.PlatformType.Unknown)

        let pkg = require(path.join(__dirname, "../package.json"))
        XTest.Expect(XEnv.Product, "Product").ToBe(pkg.displayName)
        XTest.Expect(XEnv.Author, "Author").ToBe(pkg.author.name)
        XTest.Expect(XEnv.Identifier, "Identifier").ToBe(pkg.name)
        XTest.Expect(XEnv.Version, "Version").ToBe(pkg.version)
    } else if (XEnv.IsCocos) {
        XTest.Expect(typeof cc != "undefined", "IsCocos").ToBe(true)
    } else if (XEnv.IsUnity) {
        XTest.Expect(typeof CS != "undefined", "IsUnity").ToBe(true)
    } else if (XEnv.IsUnreal) {
        XTest.Expect(typeof UE != "undefined", "IsUnreal").ToBe(true)
    }
})
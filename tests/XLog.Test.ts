// Copyright (c) 2025 EFramework Organization. All rights reserved.
// Use of this source code is governed by a MIT-style
// license that can be found in the LICENSE file.

import { XLog } from "../src/XLog"
import { XTest } from "../src/XTest"

export const TestXLog = XTest.Test("XLog", async () => {
    XLog.Panic(new Error("Test Panic"), "Extras message.")
    XLog.Emergency("Test Emergency")
    XLog.Alert("Test Alert")
    XLog.Critical("Test Critical")
    XLog.Error("Test Error")
    XLog.Warn("Test Warn")
    XLog.Notice("Test Notice")
    XLog.Info("Test Info: hello is {0}, num is {1}", "world", 10099)
    XLog.Debug("Test Debug")
    XLog.Debug(XLog.Trace(0, "Test Trace"))
})
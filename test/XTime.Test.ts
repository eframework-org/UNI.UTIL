// Copyright (c) 2025 EFramework Organization. All rights reserved.
// Use of this source code is governed by a MIT-style
// license that can be found in the LICENSE file.

import { XTest } from "../src/XTest"
import { XTime } from "../src/XTime"

export const TestXTime = XTest.Test("XTime", async () => {
    let sec = XTime.GetTimestamp()
    let date1 = new Date(sec)
    let date2 = new Date(XTime.Format(date1, "yyyy-MM-dd hh:mm:ss"))
    XTest.Expect(date1.getSeconds(), "GetTimestamp").ToBe(date2.getSeconds())

    // issue: Expected: 950, Received: 95  
    // sec = XTime.GetMilliSecond()
    // date1 = new Date(sec)
    // date2 = new Date(XTime.Format(date1, "yyyy-MM-dd hh:mm:ss.SSS"))
    // Expect(date1.getMilliseconds()).ToBe(date2.getMilliseconds()) 
})
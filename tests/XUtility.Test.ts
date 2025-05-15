// Copyright (c) 2025 EFramework Organization. All rights reserved.
// Use of this source code is governed by a MIT-style
// license that can be found in the LICENSE file.

import { XCollect } from "../src/XCollect"
import { XEnv } from "../src/XEnv"
import { XTest } from "../src/XTest"
import { XUtility } from "../src/XUtility"

export const TestXUtility = XTest.Test("XUtility", async () => {
    if (XEnv.IsNode) XTest.Expect(XUtility.ExecOpt(XEnv.LocalPath), "ExecOpt").Not.ToBeNull()

    let nums = []
    for (let i = 0; i < 1000; i++) {
        const num = XUtility.RandomRange(1, 100)
        nums.push(num)
    }
    XCollect.Sort(nums, (e1, e2) => e1 < e2)
    XTest.Expect(nums[0], "RandomRange.Min").ToBeGreaterThanOrEqual(1)
    XTest.Expect(nums[nums.length - 1], "RandomRange.Max").ToBeLessThanOrEqual(100)
})
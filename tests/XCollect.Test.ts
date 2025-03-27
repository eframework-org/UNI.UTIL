// Copyright (c) 2025 EFramework Organization. All rights reserved.
// Use of this source code is governed by a MIT-style
// license that can be found in the LICENSE file.

import { XCollect } from "../src/XCollect"
import { XTest } from "../src/XTest"

export const TestXCollect = XTest.Test("XCollect", async () => {
    let arr = [0, 1, 2]
    XTest.Expect(XCollect.Exist(arr, (e) => e == 0), "Exist", arr).ToBe(true)
    XTest.Expect(XCollect.Exist(arr, (e) => e == -1), "Exist", arr).ToBe(false)

    XTest.Expect(XCollect.Find(arr, (e) => e == 1), "Find", arr).ToBe(1)
    XTest.Expect(XCollect.Find(arr, (e) => e == -1), "Find", arr).ToBe(null)

    XTest.Expect(XCollect.Index(arr, (e) => e == 1), "Index", arr).ToBe(1)

    XCollect.Delete(arr, 0)
    XTest.Expect(arr[0], "Delete", arr).ToBe(1)

    XCollect.Remove(arr, (e) => e == 1)
    XTest.Expect(arr[0], "Remove", arr).ToBe(2)

    XCollect.Insert(arr, 0, 1)
    XTest.Expect(arr[0], "Insert", arr).ToBe(2)

    arr.push(1)
    XCollect.Sort(arr, (e1, e2) => e1 < e2)
    XTest.Expect(arr[0], "Sort.First", arr).ToBe(0)
    XTest.Expect(arr[arr.length - 1], "Sort.Last", arr).ToBe(2)

    arr = XCollect.SubRange(arr, 0, 1)
    XTest.Expect(arr[0], "SubRange.First", arr).ToBe(0)
    XTest.Expect(arr[arr.length - 1], "SubRange.Last", arr).ToBe(1)

    let narr = [2, 3, 4]
    XCollect.AddRange(arr, narr)
    XTest.Expect(arr[0], "AddRange.First", arr).ToBe(0)
    XTest.Expect(arr[arr.length - 1], "AddRange.Last", arr).ToBe(4)

    XCollect.DeleteRange(arr, 3, 2)
    XTest.Expect(arr[0], "DeleteRange.First", arr).ToBe(0)
    XTest.Expect(arr[arr.length - 1], "DeleteRange.First", arr).ToBe(2)
})
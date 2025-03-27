// Copyright (c) 2025 EFramework Organization. All rights reserved.
// Use of this source code is governed by a MIT-style
// license that can be found in the LICENSE file.

import { XEvent } from "../src/XEvent"
import { XTest } from "../src/XTest"

export const TestXEvent = XTest.Test("XEvent", async () => {
    let ret1 = false
    let ret2 = false
    let ret3 = false
    let str = null

    const cb1 = () => { ret1 = !ret1 }
    var evtMgr = new XEvent.Manager(false)
    XTest.Expect(evtMgr.Reg(1000, cb1, true), "Reg multiple").ToBe(true)
    XTest.Expect(evtMgr.Reg(1000, cb1, true), "Reg multiple").ToBe(false)
    XTest.Expect(evtMgr.Unreg(1000, cb1), "Unreg multiple").ToBe(true)
    XTest.Expect(evtMgr.Unreg(1000, cb1), "Unreg multiple").ToBe(false)

    evtMgr = new XEvent.Manager()
    evtMgr.Reg(1000, cb1, true)
    evtMgr.Notify(1000)
    XTest.Expect(ret1, "Notify").ToBe(true)

    ret1 = false
    evtMgr.Notify(1000)
    XTest.Expect(ret1, "Notify once").ToBe(false)

    const cb2 = (...args: any) => {
        str = args[0]
        ret1 = true
    }
    evtMgr.Reg(2000, cb2, false)
    evtMgr.Reg(2000, cb2, false)
    evtMgr.Notify(2000, "hello args")
    XTest.Expect(str, "Notify with params").ToBe("hello args")

    ret1 = false
    evtMgr.Unreg(2000, cb2)
    XTest.Expect(ret1, "Unreg").ToBe(false)

    evtMgr.Reg(3000, () => { ret2 = true })
    evtMgr.Reg(3000, () => { ret3 = true })
    evtMgr.Notify(3000)
    XTest.Expect(ret2, "Notify multiple").ToBe(true)
    XTest.Expect(ret3, "Notify multiple").ToBe(true)

    ret2 = false
    ret3 = false
    evtMgr.Clear()
    evtMgr.Notify(3000)
    XTest.Expect(ret2, "Clear").ToBe(false) // test clear
    XTest.Expect(ret3, "Clear").ToBe(false)
})
// Copyright (c) 2025 EFramework Organization. All rights reserved.
// Use of this source code is governed by a MIT-style
// license that can be found in the LICENSE file.

import { TestXEvent } from "./XEvent.Test"
import { TestXCollect } from "./XCollect.Test"
import { TestXEnv } from "./XEnv.Test"
import { TestXFile } from "./XFile.Test"
import { TestXLog } from "./XLog.Test"
import { TestXObject } from "./XObject.Test"
import { TestXString } from "./XString.Test"
import { TestXTime } from "./XTime.Test"
import { TestXUtility } from "./XUtility.Test"

export * from "./XEvent.Test"
export * from "./XCollect.Test"
export * from "./XEnv.Test"
export * from "./XFile.Test"
export * from "./XLog.Test"
export * from "./XObject.Test"
export * from "./XString.Test"
export * from "./XTime.Test"
export * from "./XUtility.Test"

export function TestAll() {
    TestXEnv()
    TestXCollect()
    TestXEvent()
    TestXFile()
    TestXLog()
    TestXObject()
    TestXString()
    TestXTime()
    TestXUtility()
}
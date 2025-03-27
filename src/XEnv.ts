// Copyright (c) 2025 EFramework Organization. All rights reserved.
// Use of this source code is governed by a MIT-style
// license that can be found in the LICENSE file.

import { XObject } from "./XObject"

/**
 * XEnv 是一个环境管理工具，支持多平台及运行时环境识别等功能。
 * 
 * 功能特性
 * - 环境检测：自动识别运行环境及平台等信息
 * - 应用信息：获取产品名称、版本、作者、标识符等信息
 * 
 * 使用手册
 * 1. 环境检测
 * 
 * 1.1 运行时类型
 * ```typescript
 * // 运行时类型枚举
 * enum RuntimeType {
 *     Node,    // Node.js 运行时
 *     Code,    // VSCode 扩展运行时
 *     Cocos,   // Cocos Creator 运行时
 *     Unity,   // Unity 运行时
 *     Unreal,  // Unreal Engine 运行时
 *     Electron,// Electron 运行时
 *     Dom      // 浏览器 DOM 运行时
 * }
 * 
 * // 获取当前运行时类型
 * const runtime = XEnv.Runtime; // 返回RuntimeType枚举值
 * 
 * // 使用预定义常量检查特定运行时
 * if (XEnv.IsNode) {
 *     // Node.js环境下的逻辑
 * }
 * if (XEnv.IsCocos) {
 *     // Cocos环境下的逻辑
 * }
 * ```
 * 
 * 1.2 平台类型
 * ```typescript
 * // 平台类型枚举
 * enum PlatformType {
 *     Unknown, // 未知平台
 *     Windows, // Windows 平台
 *     Linux,   // Linux 平台
 *     macOS,   // macOS 平台
 *     Android, // Android 平台
 *     iOS,     // iOS 平台
 *     Browser  // 浏览器平台
 * }
 * 
 * // 获取当前平台类型
 * const platform = XEnv.Platform; // 返回PlatformType枚举值
 * 
 * // 使用预定义常量检查特定平台
 * if (XEnv.IsNative) {
 *     // 原生平台下的逻辑
 * }
 * if (XEnv.IsBrowser) {
 *     // 浏览器环境下的逻辑
 * }
 * ```
 * 
 * 2. 应用信息
 * 
 * 2.1 获取基本信息
 * ```typescript
 * // 获取产品信息
 * const appName = XEnv.Product;
 * const appVersion = XEnv.Version;
 * const appAuthor = XEnv.Author;
 * const appId = XEnv.Identifier;
 * const appDesc = XEnv.Description;
 * 
 * console.log(`${appName} v${appVersion} by ${appAuthor}`);
 * ```
 * 
 * 更多信息请参考模块文档。
 */
export namespace XEnv {
    /**
     * 运行时类型。
     * 用于标识当前代码运行的环境类型。
     */
    export enum RuntimeType {
        /** Node.js 运行时 */
        Node,
        /** VSCode 扩展运行时 */
        Code,
        /** Cocos Creator 运行时 */
        Cocos,
        /** Unity 运行时 */
        Unity,
        /** Unreal Engine 运行时 */
        Unreal,
        /** Electron 运行时 */
        Electron,
        /** 浏览器 DOM 运行时 */
        Dom,
    }

    /**
     * 平台类型。
     * 用于标识当前运行的操作系统平台。
     */
    export enum PlatformType {
        /** 未知平台 */
        Unknown,
        /** Windows 平台 */
        Windows,
        /** Linux 平台 */
        Linux,
        /** macOS 平台 */
        macOS,
        /** Android 平台 */
        Android,
        /** iOS 平台 */
        iOS,
        /** 浏览器平台 */
        Browser,
    }

    var runtime: RuntimeType = null
    /**
     * 获取当前运行时类型。
     * 通过检测全局对象特征判断运行时环境。
     * 结果会被缓存以提高性能。
     */
    function getRuntime(): RuntimeType {
        if (runtime == null) {
            if (typeof process !== 'undefined' && !!process.env.VSCODE_PID) {
                runtime = RuntimeType.Code
                return runtime
            }
            if (typeof cc !== 'undefined') {
                runtime = RuntimeType.Cocos
                return runtime
            }
            if (typeof CS !== 'undefined') {
                runtime = RuntimeType.Unity
                return runtime
            }
            if (typeof UE !== 'undefined') {
                runtime = RuntimeType.Unity
                return runtime
            }
            runtime = RuntimeType.Node
        }
        return runtime
    }

    var platform: PlatformType = null
    /**
     * 获取当前平台类型。
     * 基于运行时环境判断具体的操作系统平台。
     * 结果会被缓存以提高性能。
     */
    function getPlatform(): PlatformType {
        if (platform == null) {
            if (getRuntime() == RuntimeType.Node) {
                if (process.platform == "win32") platform = PlatformType.Windows
                else if (process.platform == "darwin") platform = PlatformType.macOS
                else if (process.platform == "linux") platform = PlatformType.Linux
                else if (process.platform == "android") platform = PlatformType.Android
                else platform = PlatformType.Unknown
            } else if (getRuntime() == RuntimeType.Cocos) {
                // refer: https://docs.cocos.com/creator/3.8/api/zh/variable/sys?id=Platform
                try {
                    if (cc.sys.isBrowser) platform = PlatformType.Browser
                    else if (cc.sys.platform == cc.sys.Platform.WIN32) platform = PlatformType.Windows
                    else if (cc.sys.platform == cc.sys.Platform.MACOS) platform = PlatformType.macOS
                    else if (cc.sys.platform == cc.sys.Platform.ANDROID) platform = PlatformType.Android
                    else if (cc.sys.platform == cc.sys.Platform.IOS) platform = PlatformType.iOS
                    else platform = PlatformType.Unknown
                } catch (error) { platform = PlatformType.Unknown }
            } else if (getRuntime() == RuntimeType.Unity) {
                const plat = CS.UnityEngine.Application.platform
                const platEnum = CS.UnityEngine.RuntimePlatform
                if (plat == platEnum.WindowsPlayer || plat == platEnum.WindowsEditor) platform = PlatformType.Windows
                else if (plat == platEnum.OSXPlayer || plat == platEnum.OSXEditor) platform = PlatformType.macOS
                else if (plat == platEnum.LinuxPlayer || plat == platEnum.LinuxEditor) platform = PlatformType.Linux
                else if (plat == platEnum.Android) platform = PlatformType.Android
                else if (plat == platEnum.IPhonePlayer) platform = PlatformType.iOS
                else if (plat == platEnum.WebGLPlayer || plat == platEnum.WindowsWebPlayer || plat == platEnum.OSXWebPlayer) platform = PlatformType.Browser
                else platform = PlatformType.Unknown
            }
        }
        return platform
    }

    /**
     * 当前平台类型。
     */
    export const Platform = getPlatform()

    /**
     * 当前运行时类型。
     */
    export const Runtime = getRuntime()

    /**
     * 是否为 Node 或 VSCode 运行时。
     */
    export const IsNode = getRuntime() == RuntimeType.Node || getRuntime() == RuntimeType.Code

    /**
     * 是否为 VSCode 扩展运行时。
     */
    export const IsCode = getRuntime() == RuntimeType.Code

    /**
     * 是否为 Cocos Creator 运行时。
     */
    export const IsCocos = getRuntime() == RuntimeType.Cocos

    /**
     * 是否为 Unity 运行时。
     */
    export const IsUnity = getRuntime() == RuntimeType.Unity

    /**
     * 是否为 Unreal 运行时。
     */
    export const IsUnreal = getRuntime() == RuntimeType.Unreal

    /**
     * 是否为原生平台。
     */
    export const IsNative = getPlatform() != PlatformType.Browser

    /**
     * 是否为浏览器平台。
     */
    export const IsBrowser = getPlatform() == PlatformType.Browser

    /**
     * 不支持的运行时和平台错误。
     */
    export const Unsupport = new Error(`Unsupported runtime: ${XObject.Key(XEnv.RuntimeType, XEnv.Runtime)} on platform: ${XObject.Key(XEnv.PlatformType, XEnv.Platform)}`)

    const separator = "/"

    /**
     * 规范化给定的路径。
     * 统一路径分隔符，处理相对路径和特殊字符。
     * 
     * @param path 需要规范化的路径。
     * @returns 规范化后的路径。
     */
    function normalizePath(path: string): string {
        if (typeof path !== "string") throw new TypeError("path must be a string")
        let prefix = ""
        if (path.startsWith("file://")) {
            prefix = "file://"
        } else if (path.startsWith("jar:file://")) {
            prefix = "jar:file://"
        }
        if (prefix != "") {
            path = path.substring(prefix.length)
        }
        path = path.replace(/\\/g, separator)
        const parts = path.split(separator)
        const nparts = []
        for (let i = 0; i < parts.length; i++) {
            let part = parts[i]
            if ((part === "." || part === "")) {
                if (nparts.length == 0) nparts.push(part)
            } else if (part === "..") {
                if (nparts.length > 0) nparts.pop()
            } else nparts.push(part)
        }
        const npath = nparts.join(separator)
        return prefix + npath
    }

    /**
     * 返回给定路径的目录名称。
     * 
     * @param path 需要获取目录名称的路径。
     * @returns 目录名称。
     */
    function directoryName(path: string): string {
        if (path) {
            path = normalizePath(path)
            let idx = path.lastIndexOf(separator)
            if (idx >= 0) path = path.substring(0, idx)
            if (path == "file:/") path += separator
            return path
        }
        return ""
    }

    /**
     * 将多个路径连接成一个。
     * 
     * @param paths 需要连接的路径。
     * @returns 连接后的路径。
     */
    function pathJoin(...paths: string[]) {
        paths = paths.filter(path => typeof path === "string" && path.trim() !== "")
        if (paths.length === 0) return ""
        let ret = paths[0]
        for (let i = 1; i < paths.length; i++) {
            if (!paths[i].startsWith(separator) && !ret.endsWith(separator)) {
                ret += separator
            }
            ret += paths[i]
        }
        return normalizePath(ret)
    }

    /**
     * 检查文件是否存在。
     * 
     * @param file 需要检查的文件路径。
     * @returns 如果文件存在则返回true，否则返回false。
     */
    function hasFile(file: string): boolean {
        if (file) {
            try {
                const stat = require("fs").statSync(file)
                return stat.isFile()
            } catch { }
        }
        return false
    }

    /**
     * 检查目录是否存在。
     * 
     * @param dir 需要检查的目录路径。
     * @returns 如果目录存在则返回true，否则返回false。
     */
    function hasDirectory(dir: string): boolean {
        if (dir) {
            dir = normalizePath(dir)
            if (XEnv.IsNode) {
                try {
                    const stat = require("fs").statSync(dir)
                    return stat.isDirectory()
                } catch { }
            } else if (XEnv.IsNative) {
                if (XEnv.IsCocos) {
                    return jsb.fileUtils.isDirectoryExist(dir)
                } else if (XEnv.IsUnity) {
                    return CS.System.IO.Directory.Exists(dir)
                } else if (XEnv.IsUnreal) {
                    // todo
                }
            } else if (XEnv.IsBrowser) {
                for (let i = 0; i < localStorage.length; i++) {
                    let key = localStorage.key(i)
                    let tdir = directoryName(key)
                    if (tdir == dir || key == dir) return true
                }
            } else throw XEnv.Unsupport
        }
        return false
    }

    /**
     * 创建目录。
     * 
     * @param dir 需要创建的目录路径。
     */
    function createDirectory(dir: string) {
        if (!dir || hasDirectory(dir)) return

        dir = normalizePath(dir)
        if (XEnv.IsNode) {
            if (dir.startsWith("file://") || dir.startsWith("jar:file://")) {
                return
            }
            const fs = require("fs")
            dir = dir.replace(/\\/g, separator)
            const parts = dir.split(separator)
            const nparts = []
            for (let i = 0; i < parts.length; i++) {
                let part = parts[i]
                let sig = false
                if ((part === "." || part === "")) {
                    if (nparts.length == 0) {
                        nparts.push(part)
                        sig = true
                    }
                } else if (part === "..") {
                    if (nparts.length > 0) nparts.pop()
                } else {
                    nparts.push(part)
                    sig = true
                }
                if (sig && nparts.length > 1) {
                    let tmp = nparts.join(separator)
                    if (!hasDirectory(tmp)) {
                        fs.mkdirSync(tmp)
                    }
                }
            }
        } else if (XEnv.IsNative) {
            if (XEnv.IsCocos) {
                jsb.fileUtils.createDirectory(dir)
            } else if (XEnv.IsUnity) {
                CS.System.IO.Directory.CreateDirectory(dir)
            } else if (XEnv.IsUnreal) {
                // todo
            }
        } else if (XEnv.IsBrowser) {
            localStorage.setItem(dir, "")
        } else throw XEnv.Unsupport
    }

    var localPath: string
    /**
     * 获取数据存储路径。
     * 根据不同运行时环境返回适当的数据存储位置。
     * 
     * @returns 数据存储路径。
     */
    function getLocalPath(): string {
        if (localPath == null) {
            if (XEnv.IsNode) {
                if (typeof jest != "undefined") {
                    localPath = process.cwd()
                } else {
                    if (require.main && require.main.filename) {
                        let dir = directoryName(require.main.filename)
                        if (hasFile(pathJoin(dir, "package.json"))) {
                            localPath = dir
                        } else {
                            dir = pathJoin(dir, "..")
                            if (hasFile(pathJoin(dir, "package.json"))) {
                                localPath = dir
                            }
                        }
                    } else {
                        let err = new Error()
                        if (err.stack) {
                            let lines = err.stack.split("\n")
                            for (let i = 0; i < lines.length; i++) {
                                let line = lines[i]
                                if (line.indexOf(".js") >= 0) {
                                    let strs = line.split("(")
                                    if (strs.length > 1) line = strs[1]
                                    strs = line.split("file:///")
                                    if (strs.length > 1) line = strs[1]
                                    strs = line.split(".js")
                                    let file = strs[0] + ".js"
                                    let dir = directoryName(file)
                                    if (hasFile(pathJoin(dir, "package.json"))) {
                                        localPath = dir
                                    } else {
                                        dir = pathJoin(dir, "..")
                                        if (hasFile(pathJoin(dir, "package.json"))) {
                                            localPath = dir
                                        }
                                    }
                                }
                                if (localPath != null) break
                            }
                        }
                    }
                }

                if (localPath == null) {
                    let dir = __dirname
                    if (hasFile(pathJoin(dir, "package.json"))) {
                        localPath = dir
                    } else {
                        dir = pathJoin(dir, "..")
                        if (hasFile(pathJoin(dir, "package.json"))) {
                            localPath = dir
                        }
                    }
                }

                if (localPath == null) localPath = "Unknown"
                else localPath = pathJoin(localPath, "local")
            } else if (XEnv.IsBrowser) {
                localPath = "file://"
            } else if (XEnv.IsCocos) {
                localPath = pathJoin(jsb.fileUtils.getWritablePath(), "local")
            } else if (XEnv.IsUnity) {
                if (CS.UnityEngine.Application.isEditor) {
                    localPath = pathJoin(CS.UnityEngine.Application.dataPath, "..", "Local")
                } else if (CS.UnityEngine.Application.platform == CS.UnityEngine.RuntimePlatform.WindowsPlayer) {
                    localPath = pathJoin(CS.UnityEngine.Application.streamingAssetsPath, "..", "Local")
                } else {
                    localPath = normalizePath(CS.UnityEngine.Application.persistentDataPath)
                }
            }
            if (localPath != "Unknown") {
                if (hasDirectory(localPath) == false) createDirectory(localPath)
            }
        }
        return localPath
    }

    /**
     * 数据路径。
     */
    export const LocalPath = getLocalPath()

    /**
     * 获取包信息。
     * 读取并解析 package.json 文件。
     * 
     * @returns 包信息对象。
     */
    function getPackage(): any {
        if (XEnv.IsNode) {
            const pf = pathJoin(LocalPath, "..", "package.json")
            if (hasFile(pf)) {
                try {
                    let str = require("fs").readFileSync(pf)
                    let pkg = JSON.parse(str.toString())
                    return pkg
                } catch (error) { }
            }
        }
    }

    var product: string
    /**
     * 获取产品名称。
     * 
     * @returns 产品名称。
     */
    function getProduct(): string {
        if (product == null) {
            if (XEnv.IsNode) {
                const pkg = getPackage()
                if (pkg) {
                    if (pkg.displayName) product = pkg.displayName
                    else product = pkg.name
                }
            }
            else if (XEnv.IsUnity) product = CS.UnityEngine.Application.productName

            if (product == null) product = "Unknown"
        }
        return product
    }
    /**
     * 产品名称。
     */
    export const Product = getProduct()

    var author: string
    /**
     * 获取作者名称。
     * 
     * @returns 作者名称。
     */
    function getAuthor(): string {
        if (author == null) {
            if (XEnv.IsNode) {
                const pkg = getPackage()
                if (pkg) {
                    if (pkg.publisher) author = pkg.publisher
                    else if (pkg.author) {
                        if (typeof (pkg.author) == "string") author = pkg.author
                        else author = pkg.author.name
                    }
                }
            }

            if (author == null) author = "Unknown"
        }
        return author
    }
    /**
     * 作者名称。
     */
    export const Author = getAuthor()

    var identifier: string
    /**
     * 获取标识符。
     * 
     * @returns 标识符。
     */
    export function getIdentifier(): string {
        if (identifier == null) {
            if (XEnv.IsNode) {
                const pkg = getPackage()
                if (pkg) identifier = pkg.name
            }
            else if (XEnv.IsUnity) identifier = CS.UnityEngine.Application.identifier

            if (identifier == null || identifier == "") identifier = "Unknown"
        }
        return identifier
    }
    /**
     * 应用标识符。
     */
    export const Identifier = getIdentifier()

    var version: string
    /**
     * 获取版本。
     * 
     * @returns 版本。
     */
    function getVersion(): string {
        if (version == null) {
            if (XEnv.IsNode) {
                const pkg = getPackage()
                if (pkg) version = pkg.version
            }
            else if (XEnv.IsUnity) version = CS.UnityEngine.Application.version

            if (version == null) version = "0.0"
        }
        return version
    }

    /**
     * 应用版本。
     */
    export const Version = getVersion()

    var description: string
    /**
     * 获取描述。
     * 
     * @returns 描述。
     */
    function getDescription(): string {
        if (description == null) {
            if (XEnv.IsNode) {
                const pkg = getPackage()
                if (pkg) description = pkg.description
            }

            if (description == null) description = ""
        }
        return description
    }

    /**
     * 应用描述。
     */
    export const Description = getDescription()
}
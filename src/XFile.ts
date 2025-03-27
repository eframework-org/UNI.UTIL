// Copyright (c) 2025 EFramework Organization. All rights reserved.
// Use of this source code is governed by a MIT-style
// license that can be found in the LICENSE file.

import { XEnv } from "./XEnv"
import { XString } from "./XString"
import { XUtility } from "./XUtility"

/**
 * XFile 实现了跨平台的文件管理系统，支持在不同运行环境下进行统一的文件和目录操作。
 * 
 * 功能特性
 * - 支持文件和目录基本操作：创建、读写、删除、复制
 * - 提供路径处理：规范化路径、合并路径、获取路径组成部分
 * - 提供压缩解压功能：支持zip、7z等格式的文件压缩和解压
 * 
 * 使用手册
 * 1. 前置条件
 * 
 * - Windows 环境需要安装 [7-Zip](https://www.7-zip.org/) 或 [WinRAR](https://www.win-rar.com/)
 * - macOS 环境需要安装 p7zip：`brew install p7zip`
 * 
 * 2. 文件操作
 * 
 * 2.1 读写文件
 * ```typescript
 * // 检查文件是否存在
 * if (XFile.HasFile("config.json")) {
 *     // 读取二进制文件
 *     const data = XFile.OpenFile("data.bin");
 *     
 *     // 读取文本文件
 *     const text = XFile.OpenText("config.json");
 *     
 *     // 写入二进制数据
 *     const buffer = new ArrayBuffer(8);
 *     XFile.SaveFile("output.bin", buffer);
 *     
 *     // 写入文本数据
 *     XFile.SaveText("log.txt", "操作成功");
 * }
 * ```
 * 
 * 2.2 删除和复制文件
 * ```typescript
 * // 删除文件
 * XFile.DeleteFile("temp.txt");
 * 
 * // 复制文件
 * XFile.CopyFile("source.dat", "backup/source.dat");
 * ```
 * 
 * 3. 目录操作
 * 
 * 3.1 目录的创建与检查
 * ```typescript
 * // 检查目录是否存在
 * if (!XFile.HasDirectory("logs")) {
 *     // 创建目录（支持多级目录递归创建）
 *     XFile.CreateDirectory("logs/app/debug");
 * }
 * ```
 * 
 * 3.2 删除和复制目录
 * ```typescript
 * // 删除目录（包括所有子目录和文件）
 * XFile.DeleteDirectory("temp");
 * 
 * // 复制目录（包括所有子目录和文件）
 * XFile.CopyDirectory("source", "backup/source");
 * ```
 * 
 * 4. 路径处理
 * 
 * 4.1 路径操作
 * ```typescript
 * // 规范化路径（处理 . 和 .. 并统一分隔符）
 * const normalPath = XFile.NormalizePath("dir/../data/./file.txt");
 * // 结果: "data/file.txt"
 * 
 * // 合并路径
 * const fullPath = XFile.PathJoin("base", "subdir", "file.txt");
 * // 结果: "base/subdir/file.txt"
 * ```
 * 
 * 4.2 路径组成部分
 * ```typescript
 * // 获取父目录
 * const parent = XFile.DirectoryName("/path/to/file.txt");
 * // 结果: "/path/to"
 * 
 * // 获取文件名（带扩展名）
 * const filename = XFile.FileName("/path/to/file.txt");
 * // 结果: "file.txt"
 * 
 * // 获取文件名（不带扩展名）
 * const basename = XFile.FileName("/path/to/file.txt", false);
 * // 结果: "file"
 * 
 * // 获取文件扩展名
 * const ext = XFile.FileExtension("/path/to/file.txt");
 * // 结果: ".txt"
 * ```
 * 
 * 5. 压缩和解压
 * 
 * 5.1 压缩目录
 * ```typescript
 * // 压缩目录到默认位置（目录名.zip）
 * XFile.Zip("./dist", null, () => {
 *     console.log("压缩完成");
 * });
 * 
 * // 压缩目录到指定位置
 * XFile.Zip("./dist", "./releases/app-1.0.0.zip", () => {
 *     console.log("压缩完成");
 * });
 * ```
 * 
 * 5.2 解压文件
 * ```typescript
 * // 解压到指定目录
 * XFile.Unzip("data.zip", "./extracted", () => {
 *     console.log("解压完成");
 * });
 * ```
 * 
 * 6. 其他功能
 * 
 * 6.1 在系统资源管理器中显示文件
 * ```typescript
 * // 在文件浏览器中打开并选中文件
 * XFile.ShowInExplorer("./logs/error.log");
 * ```
 * 
 * 6.2 Base64编码文件操作
 * ```typescript
 * // 读取Base64编码的文件
 * const data = XFile.OpenBase64("encoded.txt");
 * 
 * // 保存为Base64编码的文件
 * XFile.SaveBase64("encoded.txt", "原始数据");
 * ```
 * 
 * 更多信息请参考模块文档。
 */
export namespace XFile {
    /**
     * 路径分隔符（POSIX风格）。
     * 统一使用正斜杠(/)作为路径分隔符，Windows 平台下会自动转换。
     */
    export const Separator: string = "/"

    /**
     * 检查文件是否存在。
     * 
     * @param file 文件路径。
     * @returns 文件是否存在。
     * @example
     * ```typescript
     * if (XFile.HasFile("config.json")) {
     *     // 处理文件
     * }
     * ```
     */
    export function HasFile(file: string): boolean {
        if (file) {
            if (XEnv.IsNode) {
                try {
                    const stat = require("fs").statSync(file)
                    return stat.isFile()
                } catch { }
            } else if (XEnv.IsNative) {
                if (XEnv.IsCocos) {
                    return jsb.fileUtils.isFileExist(file)
                } else if (XEnv.IsUnity) {
                    return CS.System.IO.File.Exists(file)
                } else if (XEnv.IsUnreal) {
                    // todo
                }
            } else if (XEnv.IsBrowser) {
                return localStorage.hasOwnProperty(file)
            } else throw XEnv.Unsupport
        }
        return false
    }

    /**
     * 打开文件。
     * 读取文件内容到内存。
     * 
     * @param file 文件路径。
     * @returns 返回文件数据的 ArrayBuffer，如果文件不存在则返回 null。
     * @example
     * ```typescript
     * const data = XFile.OpenFile("data.bin");
     * if (data) {
     *     // 处理二进制数据
     * }
     * ```
     */
    export function OpenFile(file: string): ArrayBuffer {
        if (file && HasFile(file)) {
            if (XEnv.IsNode) {
                return require("fs").readFileSync(file)
            } else if (XEnv.IsNative) {
                if (XEnv.IsCocos) {
                    return jsb.fileUtils.getDataFromFile(file)
                } else if (XEnv.IsUnity) {
                    let buf = CS.System.IO.File.ReadAllBytes(file)
                    let nbuf = new Uint8Array(buf.Length)
                    for (let i = 0; i < buf.Length; i++) {
                        nbuf[i] = buf.get_Item(i)
                    }
                    return nbuf.buffer
                } else if (XEnv.IsUnreal) {
                    // todo
                }
            } else if (XEnv.IsBrowser) {
                let data = localStorage.getItem(file)
                if (data) {
                    data = XString.FromBase64(data)
                    return XString.ToBuffer(data)
                }
            } else throw XEnv.Unsupport
        }
        return null
    }

    /**
     * 保存文件。
     * 将数据写入文件，如果文件不存在则创建。
     * 
     * @param file 文件路径。
     * @param data 要写入的数据。
     * @example
     * ```typescript
     * const buffer = new ArrayBuffer(8);
     * XFile.SaveFile("output.bin", buffer);
     * ```
     */
    export function SaveFile(file: string, data: ArrayBuffer) {
        if (file) {
            if (XEnv.IsNode) {
                const dir = DirectoryName(file)
                if (!HasDirectory(dir)) CreateDirectory(dir)
                if (data instanceof ArrayBuffer) data = Buffer.from(data)
                require("fs").writeFileSync(file, data)
            } else if (XEnv.IsNative) {
                if (XEnv.IsCocos) {
                    const dir = DirectoryName(file)
                    if (!HasDirectory(dir)) CreateDirectory(dir)
                    if (typeof data == "string") jsb.fileUtils.writeStringToFile(data, file)
                    else jsb.fileUtils.writeDataToFile(data, file)
                } else if (XEnv.IsUnity) {
                    if (HasFile(file)) DeleteFile(file)
                    var fs = CS.System.IO.File.Open(file, CS.System.IO.FileMode.CreateNew)
                    let ndata = new Uint8Array(data)
                    for (let i = 0; i < ndata.length; i++) {
                        fs.WriteByte(ndata[i])
                    }
                    fs.Flush()
                    fs.Close()
                    fs.Dispose()
                } else if (XEnv.IsUnreal) {
                    // todo
                }
            } else if (XEnv.IsBrowser) {
                let str = XString.FromBuffer(data)
                str = XString.ToBase64(str)
                localStorage.setItem(file, str)
            } else throw XEnv.Unsupport
        }
    }

    /**
     * 删除文件。
     * 
     * @param file 文件路径。
     * @example
     * ```typescript
     * XFile.DeleteFile("temp.txt");
     * ```
     */
    export function DeleteFile(file: string) {
        if (HasFile(file)) {
            if (XEnv.IsNode) {
                require("fs").unlinkSync(file)
            } else if (XEnv.IsNative) {
                if (XEnv.IsCocos) {
                    jsb.fileUtils.removeFile(file)
                } else if (XEnv.IsUnity) {
                    CS.System.IO.File.Delete(file)
                } else if (XEnv.IsUnreal) {
                    // todo
                }
            } else if (XEnv.IsBrowser) {
                localStorage.removeItem(file)
            } else throw XEnv.Unsupport
        }
    }

    /**
     * 检查目录是否存在。
     * 
     * @param dir 目录路径。
     * @returns 目录是否存在。
     * @example
     * ```typescript
     * if (!XFile.HasDirectory("logs")) {
     *     XFile.CreateDirectory("logs");
     * }
     * ```
     */
    export function HasDirectory(dir: string): boolean {
        if (dir) {
            dir = NormalizePath(dir)
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
                    let tdir = DirectoryName(key)
                    if (tdir == dir || key == dir) return true
                }
            } else throw XEnv.Unsupport
        }
        return false
    }

    /**
     * 创建目录。
     * 支持递归创建多级目录。
     * 
     * @param dir 目录路径。
     * @example
     * ```typescript
     * XFile.CreateDirectory("data/cache/temp");
     * ```
     */
    export function CreateDirectory(dir: string) {
        if (!dir || HasDirectory(dir)) return

        dir = NormalizePath(dir)
        if (XEnv.IsNode) {
            if (dir.startsWith("file://") || dir.startsWith("jar:file://")) {
                return
            }
            const fs = require("fs")
            dir = dir.replace(/\\/g, Separator)
            const parts = dir.split(Separator)
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
                    let tmp = nparts.join(Separator)
                    if (!HasDirectory(tmp)) {
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

    /**
     * 压缩目录。
     * 支持 zip、7z 等格式。
     * 
     * @param dir 要压缩的目录路径。
     * @param zip 压缩文件输出路径，默认为目录名加 .zip。
     * @param func 压缩完成后的回调函数。
     * @example
     * ```typescript
     * XFile.Zip("./dist", "./dist.zip", () => {
     *     console.log("压缩完成");
     * });
     * ```
     */
    export function Zip(dir: string, zip?: string, func?: Function) {
        if (!XEnv.IsNode) throw XEnv.Unsupport

        const child_process = require("child_process")
        const paths = ["C:/Program Files/WinRAR",
            "C:/Program Files/Git/usr/bin"]

        if (dir.endsWith("/")) dir = dir.substring(0, dir.length - 1)
        zip = XString.IsNullOrEmpty(zip) ? dir + ".zip" : zip

        let cmd: string
        let args: string[]

        cmd = XUtility.FindBin("WinRAR", ...paths)
        if (cmd) args = ["a", "-r", zip]

        if (!cmd) {
            cmd = XUtility.FindBin("zip", ...paths)
            if (cmd) args = ["-r", zip, dir]
        }

        if (!cmd) throw new Error(`No suitable tool found to zip the directory: ${dir}`)

        const ret = child_process.spawnSync(cmd, args, { cwd: dir })
        if (ret.error) throw ret.error
        if (ret.status !== 0) throw new Error(`Zip failed with exit code ${ret.status}: ${ret.stderr.toString()}`)
        if (func) func(zip)
    }

    /**
     * 解压文件。
     * 支持 zip、7z 等格式。
     * 
     * @param zip 压缩文件路径。
     * @param unzip 解压目标路径。
     * @param func 解压完成后的回调函数。
     * @example
     * ```typescript
     * XFile.Unzip("data.zip", "./data", () => {
     *     console.log("解压完成");
     * });
     * ```
     */
    export function Unzip(zip: string, unzip: string, func?: Function) {
        if (!XEnv.IsNode) throw XEnv.Unsupport

        const path = require("path")
        const child_process = require("child_process")
        const paths = ["C:/Program Files/WinRAR",
            "C:/Program Files/7-Zip",
            "C:/Program Files/Git/usr/bin"]

        let cmd: string
        let args: string[]
        cmd = XUtility.FindBin("WinRAR", ...paths)
        if (cmd) {
            args = ["x", "-o+", zip]
        }
        if (!cmd && path.extname(zip).toLowerCase() === ".7z") {
            cmd = XUtility.FindBin("7z", ...paths)
            if (cmd) args = ["x", zip, "-o" + unzip, "-y"]
        }
        if (!cmd) {
            cmd = XUtility.FindBin("unzip", ...paths)
            if (cmd) args = ["-o", zip, `-d${unzip}`]
        }
        if (!cmd) throw new Error(`No suitable tool found to unzip the file: ${zip}`)

        const ret = child_process.spawnSync(cmd, args, { cwd: unzip })
        if (ret.error) throw ret.error
        if (ret.status !== 0) throw new Error(`Unzip failed with exit code ${ret.status}: ${ret.stderr.toString()}`)
        if (func) func()
    }

    /**
     * 在文件浏览器中显示文件或目录。
     * 
     * @param path 文件或目录路径。
     * @example
     * ```typescript
     * XFile.ShowInExplorer("./logs/error.log");
     * ```
     */
    export function ShowInExplorer(path: string) {
        if (XEnv.IsNode) {
            let cmd = null
            switch (process.platform) {
                case "linux":
                    cmd = "xdg-open " + path
                    break
                case "darwin":
                    cmd = "open " + path
                    break
                case "win32":
                    cmd = "start " + path
                    break
            }
            if (cmd != null) require("child_process").exec(cmd)
        } else throw XEnv.Unsupport
    }

    /**
     * 打开文本文件。
     * 
     * @param file 文件路径。
     * @returns 文件内容作为字符串。
     */
    export function OpenText(file: string): string {
        if (HasFile(file)) {
            if (XEnv.IsNative) {
                if (XEnv.IsCocos) {
                    return jsb.fileUtils.getStringFromFile(file)
                } else if (XEnv.IsUnity) {
                    return CS.System.IO.File.ReadAllText(file)
                }
            }
            return XString.FromBuffer(OpenFile(file))
        }
        return ""
    }

    /**
     * 保存文本文件。
     * 
     * @param file 文件路径。
     * @param text 文本数据。
     */
    export function SaveText(file: string, text: string) {
        if (!XString.IsNullOrEmpty(text)) {
            let dir = DirectoryName(file)
            if (HasDirectory(dir) == false) CreateDirectory(dir)
            if (XEnv.IsNative) {
                if (XEnv.IsCocos) {
                    return jsb.fileUtils.writeStringToFile(text, file)
                } else if (XEnv.IsUnity) {
                    return CS.System.IO.File.WriteAllText(file, text)
                }
            }
            SaveFile(file, XString.ToBuffer(text))
        }
    }

    /**
     * 打开 Base64 编码的文本文件。
     * 
     * @param file 文件路径。
     * @returns 解码后的文本内容。
     */
    export function OpenBase64(file: string): string {
        let data = OpenText(file)
        return XString.FromBase64(data)
    }

    /**
     * 保存 Base64 编码的文本文件。
     * 
     * @param file 文件路径。
     * @param data 文件数据。
     */
    export function SaveBase64(file: string, data: string) {
        data = XString.ToBase64(data)
        SaveText(file, data)
    }

    /**
     * 拷贝文件。
     * 
     * @param from 源路径。
     * @param to 目标路径。
     */
    export function CopyFile(from: string, to: string) {
        if (from && to) {
            if (HasFile(from)) {
                const todir = DirectoryName(to)
                if (!HasDirectory(todir)) CreateDirectory(todir)
                if (HasFile(to)) DeleteFile(to)
                SaveFile(to, OpenFile(from))
            }
        }
    }

    /**
     * 拷贝文件夹。
     * 
     * @param from 源路径。
     * @param to 目标路径。
     */
    export function CopyDirectory(from: string, to: string) {
        if (from && to) {
            if (XEnv.IsNode) {
                const path = require("path")
                const fs = require("fs")

                if (HasDirectory(from)) {
                    from = NormalizePath(from)
                    to = NormalizePath(to)
                    let files = fs.readdirSync(from)
                    files.forEach((file: string) => {
                        let temp = NormalizePath(path.join(from, file))
                        let delta = temp.substring(temp.lastIndexOf("/") + 1, temp.length)
                        if (fs.statSync(temp).isDirectory()) {
                            let dirName = path.join(to, delta)
                            if (HasDirectory(dirName)) {
                                DeleteDirectory(dirName)
                            }
                            CreateDirectory(dirName)
                            CopyDirectory(temp, dirName)
                        } else {
                            CopyFile(temp, path.join(to, delta))
                        }
                    })
                }
            } else throw XEnv.Unsupport
        }
    }

    /**
     * 删除文件夹。
     * 
     * @param dir 文件夹路径。
     * @returns 文件夹是否被删除。
     */
    export function DeleteDirectory(dir: string): boolean {
        if (dir) {
            if (XEnv.IsNode) {
                const fs = require("fs")

                if (HasDirectory(dir)) {
                    let files = fs.readdirSync(dir)
                    files.forEach((file: string) => {
                        let temp = dir + Separator + file
                        if (fs.statSync(temp).isDirectory()) {
                            DeleteDirectory(temp)
                        } else {
                            fs.unlinkSync(temp)
                        }
                    })
                    fs.rmdirSync(dir)
                }
                return true
            } else if (XEnv.IsNative) {
                if (XEnv.IsCocos) {
                    if (dir.endsWith(Separator) == false) dir += Separator // [TONOTICE][20241013] jsb native fileutils bug 
                    jsb.fileUtils.removeDirectory(dir)
                } else if (XEnv.IsUnity) {
                    CS.System.IO.Directory.Delete(dir, true)
                } else if (XEnv.IsUnreal) {
                    // todo
                }
                return true
            } else if (XEnv.IsBrowser) {
                for (let i = 0; i < localStorage.length;) {
                    let key = localStorage.key(i)
                    if (key.startsWith(dir)) {
                        localStorage.removeItem(key)
                    } else i++
                }
            } else throw XEnv.Unsupport
        }
        return false
    }

    /**
     * 归一化路径。
     * 
     * @param path 文件（夹）路径。
     * @returns 归一化后的路径。
     */
    export function NormalizePath(path: string): string {
        if (typeof path !== "string") throw new TypeError("path must be a string")
        let prefix = ""
        if (path.startsWith("file://")) {
            prefix = "file://"
        } else if (path.startsWith("jar:file://")) {
            prefix = "jar:file://"
        }
        if (!XString.IsNullOrEmpty(prefix)) {
            path = path.substring(prefix.length)
        }
        path = path.replace(/\\/g, Separator)
        const parts = path.split(Separator)
        const nparts = []
        for (let i = 0; i < parts.length; i++) {
            let part = parts[i]
            if ((part === "." || part === "")) {
                if (nparts.length == 0) nparts.push(part)
            } else if (part === "..") {
                if (nparts.length > 0) nparts.pop()
            } else nparts.push(part)
        }
        const npath = nparts.join(Separator)
        return prefix + npath
    }

    /**
     * 路径合并。
     * 
     * @param paths 要合并的路径。
     * @returns 合并后的路径。
     */
    export function PathJoin(...paths: string[]): string {
        paths = paths.filter(path => typeof path === "string" && path.trim() !== "")
        if (paths.length === 0) return ""
        let ret = paths[0]
        for (let i = 1; i < paths.length; i++) {
            if (!paths[i].startsWith(Separator) && !ret.endsWith(Separator)) {
                ret += Separator
            }
            ret += paths[i]
        }
        return NormalizePath(ret)
    }

    /**
     * 获取文件（夹）的父路径。
     * 
     * @param path 文件（夹）路径。
     * @returns 父路径。
     */
    export function DirectoryName(path: string): string {
        if (path) {
            path = NormalizePath(path)
            let idx = XString.LastIndexOf(path, Separator)
            if (idx >= 0) path = XString.Sub(path, 0, idx)
            if (path == "file:/") path += Separator
            return path
        }
        return ""
    }

    /**
     * 获取文件名称。
     * 
     * @param path 文件（夹）路径。
     * @param includeExtension 是否包含扩展名。
     * @returns 文件名称。
     */
    export function FileName(path: string, includeExtension: boolean = true): string {
        if (path) {
            path = NormalizePath(path)
            let idx = XString.LastIndexOf(path, Separator)
            if (idx >= 0) path = XString.Sub(path, idx + 1, path.length)
            if (!includeExtension) {
                idx = XString.LastIndexOf(path, ".")
                if (idx >= 0) path = XString.Sub(path, 0, idx)
            }
            return path
        }
        return ""
    }

    /**
     * 获取文件扩展名。
     * 
     * @param path 路径。
     * @returns 文件扩展名。
     */
    export function FileExtension(path: string): string {
        if (path) {
            let idx = XString.LastIndexOf(path, ".")
            if (idx >= 0) path = XString.Sub(path, idx, path.length)
            return path
        }
        return ""
    }
}
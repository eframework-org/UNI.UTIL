// Copyright (c) 2025 EFramework Organization. All rights reserved.
// Use of this source code is governed by a MIT-style
// license that can be found in the LICENSE file.

import { XEnv } from "../src/XEnv"
import { XFile } from "../src/XFile"
import { XString } from "../src/XString"
import { XTest } from "../src/XTest"

export const TestXFile = XTest.Test("XFile", async () => {
    let tempPath = "C://Hello/World\\Local//File.txt"
    XTest.Expect(XFile.NormalizePath(tempPath), "NormalizePath(Windows)").ToBe("C:/Hello/World/Local/File.txt")

    tempPath = "/User/Hello/World//File.txt"
    XTest.Expect(XFile.NormalizePath(tempPath), "NormalizePath(Unix)").ToBe("/User/Hello/World/File.txt")

    tempPath = "jar:file:///Hello/World/\File.txt"
    XTest.Expect(XFile.NormalizePath(tempPath), "NormalizePath(Android Jar File)").ToBe("jar:file:///Hello/World/File.txt")

    tempPath = "file://Hello/World/\File.txt"
    XTest.Expect(XFile.NormalizePath(tempPath), "NormalizePath(Web)").ToBe("file://Hello/World/File.txt")

    tempPath = "./Hello//World/\File.txt"
    XTest.Expect(XFile.NormalizePath(tempPath), "NormalizePath(Relative)").ToBe("./Hello/World/File.txt")

    tempPath = "./Hello//../World/\File.txt"
    XTest.Expect(XFile.NormalizePath(tempPath), "NormalizePath(Relative)").ToBe("./World/File.txt")

    tempPath = ".//Hello.txt"
    XTest.Expect(XFile.NormalizePath(tempPath), "NormalizePath(File)").ToBe("./Hello.txt")

    tempPath = "C://Hello/World\\Local//File.txt"
    XTest.Expect(XFile.DirectoryName(tempPath), "DirectoryName").ToBe("C:/Hello/World/Local")

    XTest.Expect(XFile.FileName(tempPath), "FileName").ToBe("File.txt")

    XTest.Expect(XFile.FileName(tempPath, false), "FileName.WithoutExt").ToBe("File")

    XTest.Expect(XFile.FileExtension(tempPath), "FileExtension").ToBe(".txt")

    let tempRoot = XFile.PathJoin(XEnv.LocalPath, "temp")
    let tempDir1 = XFile.PathJoin(tempRoot, "dir1")
    if (XFile.HasDirectory(tempDir1)) XFile.DeleteDirectory(tempDir1)
    XFile.CreateDirectory(tempDir1)
    XTest.Expect(XFile.HasDirectory(tempDir1), "CreateDirectory", tempDir1).ToBe(true)

    let tempFile1 = XFile.PathJoin(tempDir1, "hello.txt")
    XFile.SaveFile(tempFile1, XString.ToBuffer("world"))
    XTest.Expect(XFile.HasFile(tempFile1), "HasFile", tempFile1).ToBe(true)
    XTest.Expect(XString.FromBuffer(XFile.OpenFile(tempFile1)), "OpenFile", tempFile1).ToBe("world")

    XFile.DeleteFile(tempFile1)
    XTest.Expect(XFile.HasFile(tempFile1), "DeleteFile", tempFile1).ToBe(false)

    XFile.SaveText(tempFile1, "world")
    XTest.Expect(XFile.OpenText(tempFile1), "SaveText", tempFile1).ToBe("world")

    let tempFile2 = XFile.PathJoin(tempDir1, "hello2.txt")
    XFile.CopyFile(tempFile1, tempFile2)
    XTest.Expect(XFile.HasFile(tempFile2), "CopyFile", tempFile2).ToBe(true)

    XFile.SaveBase64(tempFile1, "world")
    XTest.Expect(XFile.OpenBase64(tempFile1), "SaveBase64/OpenBase64", tempFile1).ToBe("world")

    if (XEnv.IsNode) {
        let tempDir2 = XFile.PathJoin(tempRoot, "dir2")
        if (XFile.HasDirectory(tempDir2)) XFile.DeleteDirectory(tempDir2)
        XFile.CopyDirectory(tempDir1, tempDir2)
        XTest.Expect(XFile.HasDirectory(tempDir2), "CopyDirectory", tempDir1, tempDir2).ToBe(true)

        const test7z = XFile.PathJoin(XEnv.LocalPath, "..", "tests", "file", "test7z.7z")
        XFile.Unzip(test7z, tempRoot)
        XTest.Expect(XFile.HasDirectory(XFile.PathJoin(tempRoot, XFile.FileName(test7z, false))), "Unzip", test7z).ToBe(true)

        const testTar = XFile.PathJoin(XEnv.LocalPath, "..", "tests", "file", "testtar.tar")
        XFile.Unzip(testTar, tempRoot)
        XTest.Expect(XFile.HasDirectory(XFile.PathJoin(tempRoot, XFile.FileName(testTar, false))), "Unzip", testTar).ToBe(true)

        const testTarGz = XFile.PathJoin(XEnv.LocalPath, "..", "tests", "file", "testtargz.tar.gz")
        XFile.Unzip(testTarGz, tempRoot)
        XTest.Expect(XFile.HasDirectory(XFile.PathJoin(tempRoot, XFile.FileName(XFile.FileName(testTarGz, false), false))), "Unzip", testTarGz).ToBe(true)

        const testTgz = XFile.PathJoin(XEnv.LocalPath, "..", "tests", "file", "testtgz.tgz")
        XFile.Unzip(testTgz, tempRoot)
        XTest.Expect(XFile.HasDirectory(XFile.PathJoin(tempRoot, XFile.FileName(testTgz, false))), "Unzip", testTgz).ToBe(true)

        const testZip = XFile.PathJoin(XEnv.LocalPath, "..", "tests", "file", "testzip.zip")
        XFile.Unzip(testZip, tempRoot)
        XTest.Expect(XFile.HasDirectory(XFile.PathJoin(tempRoot, XFile.FileName(testZip, false))), "Unzip", testZip).ToBe(true)

        const tempZipDir = XFile.PathJoin(tempRoot, XFile.FileName(testZip, false))
        const tempZipFile = XFile.PathJoin(tempRoot, XFile.FileName(testZip))
        XFile.Zip(tempZipDir)
        XTest.Expect(XFile.HasFile(tempZipFile), "Zip without out file", tempZipDir).ToBe(true)

        XFile.DeleteFile(tempZipFile)
        XFile.Zip(tempZipDir, tempZipFile)
        XTest.Expect(XFile.HasFile(tempZipFile), "Zip with out file", tempZipDir).ToBe(true)
    }

    XFile.DeleteDirectory(tempRoot)
    XTest.Expect(XFile.HasDirectory(tempRoot), "HasDirectory", tempRoot).ToBe(false)
})
# 更新记录

## [0.0.3] - 2025-05-15
### 变更
- 公开 XLog.Print 函数，使得业务层可以替换该函数以重定向日志输出
- 移除 XUtility.GenUUID 函数，使用 XString.Random 替代之

### 修复
- 修复 VSCode 调试环境下 XEnv.LocalPath 计算异常的问题
- 修复 XTime.Format 函数格式化异常的问题

### 新增
- 新增 XString.Random 函数生成随机字符串
- 新增 [DeepWiki](https://deepwiki.com) 智能索引，方便快速查找文档

## [0.0.2] - 2025-04-12
### 新增
- 新增 XFile.Unzip 函数对 .tar、.tar.gz、.tgz 类型文件的支持

## [0.0.1] - 2025-03-27
### 新增
- 首次发布

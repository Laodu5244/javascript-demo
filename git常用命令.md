初始化:
1. git init: 初始化一个git本地项目
2. git status: 查看当前仓库的状态信息

暂存:
1. git add XXX: 单个暂存 ()
2. git add . 全部暂存
3. 暂存后可以用git status查看状态
4. git reset xxx: 移除缓存区的一个文件(reset必须在commit之前)

提交:
1. git commit -m 'message':提交缓存区的内容
2. git log: 查看提交日志
3. git reset commitID :将文件恢复到某次提交的状态
4. git reflog: 查看所有操作记录

创建新分支:
1. git checkout -b xxx: 创建一个xxx新分支
2. git branch 查看所有分支
3. git checkout xxx: 切换到xxx分支
4. git merge: 合并分支变更

远程仓库:
1. git clone: 下载远程仓库
2. git pull origin xxx: 远程仓库同步到本地仓库
3. git push origin xxx: 本地仓库同步到远程仓库
4. git remote add origin https://xxx: 关联远程仓库
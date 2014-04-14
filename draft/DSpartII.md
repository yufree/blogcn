Data Science(part II)
========================================================

# Getting and Cleaning Data

## 概述

> Raw data -> Processing script -> tidy data

- 前期需求
  - 原始数据
  - 干净数据
  - code book
  - 详尽的处理步骤记录
- 原始数据要求
  - 未经处理
  - 未经修改
  - 未经去除异常值
  - 未经总结
- 干净数据
  - 每个变量一列
  - 同一变量不同样本不在一行
  - 一种变量一个表
  - 多张表要有一列可以相互链接
  - 有表头
  - 变量名要有意义
  - 一个文件一张表
- code book
  - 变量信息
  - 总结方式
  - 实验设计
  - 文本文件
  - 包含研究设计与变量信息的章节
- 处理步骤记录
  - 脚本文件
  - 输入为原始数据
  - 输出为处理过数据
  - 脚本中无特定参数

## 下载

- 设定工作目录与数据存储目录


```r
if (!file.exists("data")) {
    dir.create("data")
}
```


- url下载与时间记录


```r
fileUrl <- "yoururl"
download.file(fileUrl, destfile = "./data/XXX.csv", method = "curl")
list.files("./data")
dateDownloaded <- date()
```


## 读取本地文件

- `read.table`
- `read.csv` 默认`sep=",", header=TRUE`
- `quote` 设定引用
- `na.strings` 设定缺失值字符
- `nrows` 设定读取字段
- `skip` 跳过开始行数

## 读取excle文件

- xlsx包


```r
library(xlsx)
cameraData <- read.xlsx("./data/cameras.xlsx", sheetIndex = 1, header = TRUE)
head(cameraData)
# read.xlsx2更快不过选行读取时会不稳定 支持底层读取 如字体等
```


- XLConnect包


```r
library(XLConnect)
wb <- loadWorkbook("XLConnectExample1.xlsx", create = TRUE)
createSheet(wb, name = "chickSheet")
writeWorksheet(wb, ChickWeight, sheet = "chickSheet", startRow = 3, startCol = 4)
saveWorkbook(wb)
# 支持区域操作 生成报告 图片等
```


## 读取XML文件

- 网页常用格式
- 形式与内容分开
- 形式包括标签 元素 属性等
- XML包


```r
library(XML)
fileUrl <- "http://www.w3schools.com/xml/simple.xml"
# 读取xml结构
doc <- xmlTreeParse(fileUrl, useInternal = TRUE)
# 提取节点
rootNode <- xmlRoot(doc)
# 提取根节点名
xmlName(rootNode)
# 提取子节点名
names(rootNode)
# 提取节点数值
xmlSApply(rootNode, xmlValue)
```


- XPath XML的一种查询语法
  - /node 顶级节点
  - //node 所有子节点
  - node[@attr-name] 带属性名的节点
  - node[@attr-name='bob'] 属性名为bob的节点


```r
# 提取节点下属性名为name的数值
xpathSApply(rootNode, "//name", xmlValue)
```


## 读取json文件

- js对象符号 结构化 常作为API输出格式
- jsonlite包


```r
library(jsonlite)
# 读取json文件
jsonData <- fromJSON("https://api.github.com/users/jtleek/repos")
# 列出文件名
names(jsonData)
# 可嵌套截取
jsonData$owner$login
# 可将R对象写成json文件
myjson <- toJSON(iris, pretty = TRUE)

```


## 读取MySQL数据库

- 网络应用常见数据库软件
- 一行一记录
- 数据库表间有index向量
- [常见命令](http://www.pantz.org/software/mysql/mysqlcommands.html)
- [指南](http://www.r-bloggers.com/mysql-and-r/)
- RMySQL包


```r
library(RMySQL)
# 读取数据库
ucscDb <- dbConnect(MySQL(), user = "genome", host = "genome-mysql.cse.ucsc.edu")
result <- dbGetQuery(ucscDb, "show databases;")
# 断开链接
dbDisconnect(ucscDb)
# 读取指定数据库
hg19 <- dbConnect(MySQL(), user = "genome", db = "hg19", host = "genome-mysql.cse.ucsc.edu")
allTables <- dbListTables(hg19)
length(allTables)
# mysql语句查询
dbGetQuery(hg19, "select count(*) from affyU133Plus2")
# 选择子集
query <- dbSendQuery(hg19, "select * from affyU133Plus2 where misMatches between 1 and 3")
affyMis <- fetch(query)
quantile(affyMis$misMatches)
```


## 读取HDF5数据

- 分层分组读取大量数据的格式
- rhdf5包


```r
library(rhdf5)
created = h5createFile("example.h5")
created = h5createGroup("example.h5", "foo")
created = h5createGroup("example.h5", "baa")
created = h5createGroup("example.h5", "foo/foobaa")
h5ls("example.h5")
A = matrix(1:10, nr = 5, nc = 2)
h5write(A, "example.h5", "foo/A")
B = array(seq(0.1, 2, by = 0.1), dim = c(5, 2, 2))
attr(B, "scale") <- "liter"
h5write(B, "example.h5", "foo/foobaa/B")
h5ls("example.h5")
df = data.frame(1L:5L, seq(0, 1, length.out = 5), c("ab", "cde", "fghi", "a", 
    "s"), stringsAsFactors = FALSE)
h5write(df, "example.h5", "df")
h5ls("example.h5")
readA = h5read("example.h5", "foo/A")
readB = h5read("example.h5", "foo/foobaa/B")
readdf = h5read("example.h5", "df")
```


## 读取网页数据

- 网页抓取HTML数据
- 读完了一定关链接
- httr包


```r
con = url("http://scholar.google.com/citations?user=HI-I6C0AAAAJ&hl=en")
htmlCode = readLines(con)
close(con)
htmlCode
library(XML)
url <- "http://scholar.google.com/citations?user=HI-I6C0AAAAJ&hl=en"
html <- htmlTreeParse(url, useInternalNodes = T)
xpathSApply(html, "//title", xmlValue)
library(httr)
html2 = GET(url)
content2 = content(html2, as = "text")
parsedHtml = htmlParse(content2, asText = TRUE)
xpathSApply(parsedHtml, "//title", xmlValue)
GET("http://httpbin.org/basic-auth/user/passwd")
GET("http://httpbin.org/basic-auth/user/passwd", authenticate("user", "passwd"))
google = handle("http://google.com")
pg1 = GET(handle = google, path = "/")
pg2 = GET(handle = google, path = "search")
```


## 读取API

- 通过接口授权后调用数据
- httr包


```r
myapp = oauth_app("twitter", key = "yourConsumerKeyHere", secret = "yourConsumerSecretHere")
sig = sign_oauth1.0(myapp, token = "yourTokenHere", token_secret = "yourTokenSecretHere")
homeTL = GET("https://api.twitter.com/1.1/statuses/home_timeline.json", sig)
json1 = content(homeTL)
json2 = jsonlite::fromJSON(toJSON(json1))
```


## 读取其他资源

- 图片
  - [jpeg](http://cran.r-project.org/web/packages/jpeg/index.html)
  - [readbitmap](http://cran.r-project.org/web/packages/readbitmap/index.html)
  - [png](http://cran.r-project.org/web/packages/png/index.html)
  - [EBImage (Bioconductor)](http://www.bioconductor.org/packages/2.13/bioc/html/EBImage.html)

- GIS
  - [rdgal](http://cran.r-project.org/web/packages/rgdal/index.html)
  - [rgeos](http://cran.r-project.org/web/packages/rgeos/index.html)
  - [raster](http://cran.r-project.org/web/packages/raster/index.html)

- 声音
  - [tuneR](http://cran.r-project.org/web/packages/tuneR/)
  - [seewave](http://rug.mnhn.fr/seewave/)

## *数据操作data.table包*

- 基本兼容'data.frame'
- 速度更快
- 通过'key'可指定因子变量并快速提取分组的行
- 可在第二个参数是R表达式


```r
DT[, list(mean(x), sum(z))]
DT[, table(y)]
```


- 可用`:`生成新变量 进行简单计算


```r
DT[, `:=`(w, z^2)]
DT[, `:=`(m, {
    tmp <- (x + z)
    log2(tmp + 5)
})]
```


- 进行数据条件截取


```r
DT[, `:=`(a, x > 0)]
DT[, `:=`(b, mean(x + w)), by = a]
```


- 进行计数


```r
DT <- data.table(x = sample(letters[1:3], 1e+05, TRUE))
DT[, .N, by = x]
```


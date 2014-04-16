---
layout: post
title: R tips
---

# 简明统计学框架

## 概率与分布

- 从可能性到独立事件概率计算
- 从联合概率到条件概率到贝页斯公式
- 事件的发生空间到分布
- 多事件发生概率比较到标准化分布-z值
- 正态分布评价拟合
- 贝努利分布
- 二项分布，固定总数，成功概率，二项分布可用正态分布近似求值，也可用二项分布取精确值，求区间概率要扩大
- 负二项分布，固定成功次数概率
- 几何分布，最后一次成功概率
- 超几何分布，不放回抽样，成功概率
- 泊松分布，实验次数多，概率小，发生概率，泊松过程

## 统计量

- 总体到样本
  - 多个事件的描述到众数 中位数 再到期望
  - 描述多个事件的变动到方差
  - 取样方法：随机，分层，分类
  - 样本独立性:简单随机取样，样本数少于10%的总体可认为独立样本
  - 估计的偏差为标准误
- 点估计到区间估计
  - 标准误只针对样本均值，理解为样本均值的估计标准差
  - 置信区间为对所有样本进行区间估计，95%的区间包含真值，是对总体参数的估计，近似认为样本符合某分布
    We are XX% confident that the population parameter is between...
    Confidence intervals only attempt to capture population parameters.
- 中心极限法则：样本均值的分布为正态分布

## 统计推断

- 假设检验
  - 不拒绝H0不代表H0是对的，拒绝H0代表HA可能正确，观察数值的区间重叠状况
  - 使用双重否定进行描述
  - type I 假阳性 type II 假阴性
  - 置信水平反映两种错误的可能性
  - p值描述某数值在H0（一般为等式）中出现的可能性，通常与置信水平对比，两边与单边
  - 构建符合某分布的统计量进行参数估计，通过标准误计算p值，进行假设检验过程
  - 功效表示HA拒绝H0的可能性，功效高，检验可靠
  - 统计差异显著不代表实际差异显著，甚至没有实际意义
- 均值比较（连续）
  - 配对数据
  - 均值比较
  - t分布与自由度及小样本均值的标准误估计
  - 样本均值的t检验
  - 多组数据均值的方差分析与F检验
  - 多重比较的假阳性问题
- 比例比较（计数）
  - 比例检验，计算基于H0的标准误，计算z值，计算p值，可反推样品量
  - 比例差异检验，H0为比例相等，估计混合概率，计算标准误进行检验
  - 记分检验与Wald检验
- 优度拟合
  - 分布检验到卡方检验
- 独立性检验
- 精确检验

## 线性模型

- 变量关系到线性回归到线性诊断
- 参数估计到关系解释
- 多元回归
- 模型选择
- 方差分析
- 非线性模型
- logistic模型

-----

# R语言入门

## R Programming

### Overview and History of R

- R语言是S语言的一种方言
- 1976年S是John Chambers等在贝尔实验室作为Fortran的扩展库开发出来的
- 1988年用C语言重写 S3方法 白皮书
- 1993年StatSci从贝尔实验室获得S语言的独家开发售卖许可
- 1998年S4方法 绿皮书 之后S语言稳定 获得Association for Computing Machinery’s Software System Award
- 2004年Insightful（原StatSci）从Lucent收购了S语言
- 2006年Alcatel收购了Lucent成立Alcatel-Lucent
- 2008年TIBCO收购Insightful 之前Insightful开发并售卖S-PLUS
- 1991年Ross Ihaka与Robert GentlemanNew在Zealand开发了R
- 1993年发布R第一份许可
- 1995年R作为自由软件发放GUN许可
- 1996年R邮件列表创立
- 1997年R Core成立 控制R源码
- 2000年R version 1.0.0 放出
- 2013年R version 3.0.2 放出
- R由CRAN掌控的base包与其他包组成
- 其余参考[R主页](http://www.r-project.org/)

### 获得帮助


```r
help()
`?`(command)
# 提问给出以下信息
version
str(.Platform)
```


### 数据类型及基本运算

- 所有数据都是对象 所有对象都有类型
- 基本类型包括：字符“” 数字 整数L 复数(`Re`实部 `Im`虚部) 逻辑
- 向量储存同一类型数据
- list存储不同类型数据 `[[*]]`引用相应向量 `unlist` 可用做紧凑输出
- 对象可以有属性`attributes`
- 对象赋值符号为 <- 赋值同时展示加括号或直接输入对象名 可累加赋值 `a <- b <- c`
- `#`表示注释 不执行
- `:` 用来产生整数序列 也可以用`seq`生成
- 向量用`c`产生
- 空向量用`vector()`函数建立
- 向量中类型不同的对象元素会被强制转换为同一类型 字符优先级最高 其次数字 其次逻辑(0 or 1) 也可以用来串联字符
- 可使用`as.*`来强制转化数据类型
- 对象可以用`names`命名
- 变量名开头不能是数字和. 大小写敏感 下划线不要出现在名字里 分割用. 变量名中不能有空格
- 保留字符

```r
FALSE Inf NA NaN NULL TRUE break else for function if in next repeat while
```

- 清空`rm(list = ls())`
- 矩阵
  - 带有`dimension`属性的向量为矩阵 矩阵的生成次序为upper-left
  - `matrix(1:6,nrow=2,ncol=3)`表示建一个2行3列矩阵 从1到6 先列后行赋值 可用 `byrow = T` 来更改
  - 可用`c`给`dim`赋值行和列数 这样可把一个向量转为一个矩阵 `m<-1:6;dim(m)<-c(2,3)`
  - 矩阵可以用`rbind`或`cbind`生成
  - `t`对矩阵转置
- 因子变量表示分类数据 用标签名区分 用`level`来命名排序 默认是字母排序 有些函数对顺序敏感可用 `levels = c()` 来命名 ( 例如低中高的排序 ) 数字表示 `drop = T` 表示显示截取数据的水平  `nlevels`给出个数
- NaN表未定义或缺失值 NA表示无意义转换或缺失值 NaN可以是NA反之不可以 NA有数据类型 is.NaN与is.NA 可用来检验
- 数据框
  - 特殊list 每个元素长度相等
  - 每一列类型相同 矩阵所有数据类型相同
  - 特殊属性`row.names`
  - 转为矩阵`data.matrix`
  - 变量名自动转化 可以不同
  - 因子变量保持为字符可以用 `I` `data.frame(x,y,I(c))`
- 数组
  - 表示更高维度的数据 
  - `dim() = c(x,y,z)` 三维数组表示一组数 
  - `dimnames` 给数组命名 
  - 数组调用如果只有一行 需要`drop = F` 否则 不会按照数组分类
- `ts` 产生时间序列对象
- `.Last.value` 引用前一个数值
- 取整数 用`round(x,n)` n表示保留几位小数
- 截取整数 `trunc`
- 开平方 `sqrt`
- 绝对值 `abs`
- 指数函数 `exp`
- 自然对数函数 `log`
- 以 10 为底的对数函数 `log10`
- 三角函数 `sin cos tan asin acos atan`
- 常用的逻辑运算符有: 大于 `>` 小于 `<` 等于 `==` 小于或等于 `<=` 大于或等于 `>=` 与 `&` 非 `!` 或`|`
- 判断向量x中是否与y中元素相等 `x %in% y` 结果返回逻辑值
- `sum` 求和 `prod` 求连乘
- `range` 给极值范围
- `duplicated` 给出有重复的值 
- `unique` 给出无重复的值
- 向量操作 `union` 并集 `intersect` 交集 `setdiff` 除了交集的部分
- `rep` 用向量循环生成向量


```r
x <- 1:4  # puts c(1,2,3,4) into x
i <- rep(2, 4)  # puts c(2,2,2,2) into i
y <- rep(x, 2)  # puts c(1,2,3,4,1,2,3,4) into y
z <- rep(x, i)  # puts c(1,1,2,2,3,3,4,4) into z
w <- rep(x, x)  # puts c(1,2,2,3,3,3,4,4,4,4) into w
```

- 整型变量后面加上L x<-10L
- Inf代表1/0 同样1/Inf运算结果为0

### 截取数据

- `[]`截取数据
- 可以用`[x,y]`提取特定数值
- `[-1,-2]`可剔除第一行第二列
- `[[]]`用来从list或者frame里提取元素 类型固定 可提取序列`x[[1]][[3]]` 可部分匹配  `exact=FALSE`
- $用名字提取元素 可部分匹配
- 提取矩阵时默认只能提取向量 但可以提取1*1矩阵`x[1,2,drop=FALSE]`
- 先用`is.NA()`提取 用`!`排除 缺失值可用`is.element(x,y)`来处理很多表示NA值的数字 返回`x %in% y`的逻辑值
- 用`complete.cases()`提取有效数据用`[]`提取可用数据
- `head(x,n)` n表示从头截取多少行
- `tail(x,n)` n表示从尾截取多少行
- `subset(x,f)` x表示数据 f表示表达式
- 条件筛选中获得一个变量多个数值的数据使用 `[is.element(x,c(' ',' ',' ')),]` 或者`[x%in%c(' ',' ',' '),]` 使用`x == c( ' ' , ' ' , ' ' )` 会报错 循环查找三个变量 
- `x!='t'` 可能会把空白值输入 应该使用`is.element(x,'t')`
- `ifelse(con,yes,no)` 利用条件筛选 返回yes 或者no 的值
- 支持正则表达式


### 读取数据

- `read.table` `read.csv` 读取表格 反之`write.table`
- `readLines` 读取文本行 反之`writeLines`
- `source` 读取R代码 反之`dump`
- `dget` 读取多个R代码 反之`dput`
- `load` 读取保存的工作区 反之`save`
- `unserialize` 读取二进制R对象 反之`serialize`

- 设置工作目录


```r
getwd()
setwd()
```


- `?read.table` 
- 大数据读取提速
  - 计算内存
  - `comment.char = ""` 不扫描注释
  - 设定`nrows`
  - 设定`colClasses`


```r
initial <- read.table("datatable.txt", nrows = 100)
classes <- sapply(initial, class)
tabAll <- read.table("datatable.txt", colClasses = classes)
```

- 使用`connections`与`file`等保存外部文件指向

### 控制结构

- `if else` 条件


```r
if(<condition>) {
        ## do something
} else {
        ## do something else
}
if(<condition1>) {
        ## do something
} else if(<condition2>)  {
        ## do something different
} else {
        ## do something different
}
```


- `for‵ 执行固定次数的循环 嵌套不超过2层


```r
for (i in 1:10) {
    print(i)
}
```


- `while` 条件为真执行循环 条件从左到右执行


```r
count <- 0
while (count < 10) {
    print(count)
    count <- count + 1
}
```


- `repeat` 执行无限循环 配合`break` 中断并跳出循环
- `next` 跳出当前循环继续执行


```r
for (i in 1:100) {
    if (i <= 20) {
        ## Skip the first 20 iterations
        next
    }
    ## Do something here
}
```

- `return` 退出函数
- 避免使用无限循环 可用`apply`替代

### 函数


```r
f <- function(<arguments>) {
        ## Do something interesting
}
```

- 函数中参数默认值可用`formals()`显示
- 参数匹配
  - 先检查命名参数
  - 然后检查部分匹配
  - 最后检查位置匹配
- 定义函数时可以定义默认值或者设为`NULL`
- 懒惰执行：只执行需要执行的语句
- `...` 向其他函数传参 之后参数不可部分匹配

### 编程标准

- 使用文本文档与文本编辑器
- 使用缩进
- 限制代码行宽 80为宜
- 限制单个函数长度

### 范围规则

- 自由变量采用静态搜索
- 环境是由数值符号对组成 每个环境都有母环境
- 函数与环境组成环境闭包
- 首先从函数环境中寻找变量
- 之后搜索母环境
- 最高层为工作区
- 之后按搜寻列表从扩展包中寻找变量
- 最后为空环境 之后报错
- 可以函数内定义函数
- S都存在工作区 函数定义一致 R存在内存 可根据需要调用函数环境

### 向量化操作

- 向量操作针对元素
- 矩阵操作也针对元素 `%*%` 表示矩阵操作

### 日期与时间

- 日期以`data`类型存储
- 时间以`POSIXct` 或 `POSIXlt` 类型存储
- 数字上是从1970-01-01以来的天数或秒数
- `POSIXct`以整数存储时间
- `POSIXlt`以年月日时分秒等信息存储时间
- `strptime` `as.Date` `as.POSIXlt` `as.POSIXct`用来更改字符为时间

### 循环

#### `lapply`

- 对列表对象元素应用函数
- 可配合匿名函数使用


```r
x <- list(a = 1:5, b = rnorm(10))
lapply(x, mean)
```

```
## $a
## [1] 3
## 
## $b
## [1] -0.1443
```

```r

x <- 1:4
lapply(x, runif, min = 0, max = 10)
```

```
## [[1]]
## [1] 9.499
## 
## [[2]]
## [1] 0.8047 7.4324
## 
## [[3]]
## [1] 3.431 8.884 2.698
## 
## [[4]]
## [1] 5.781 7.133 9.609 6.583
```

```r

x <- list(a = matrix(1:4, 2, 2), b = matrix(1:6, 3, 2))
lapply(x, function(elt) elt[, 1])
```

```
## $a
## [1] 1 2
## 
## $b
## [1] 1 2 3
```


#### `sapply`

- `lapply`的精简版 
- 如果结果是单元素列表 转化为向量
- 如果结果是等长向量 转化为矩阵
- 否则输出依旧为列表


```r
x <- list(a = 1:4, b = rnorm(10), c = rnorm(20, 1), d = rnorm(100, 5))
sapply(x, mean)
```

```
##      a      b      c      d 
## 2.5000 0.1623 0.5613 5.0406
```


#### `vapply`

- 类似`lapply`可用更复杂函数 返回矩阵

#### `replicate`

- 用于将函数循环使用 如返回随机矩阵

#### `rapply`

- 用`how`来调整输出方法 如选取某列表中类型数据进行迭代

#### `apply`

- 数组边际函数 常用于矩阵的行列处理
- 行为1，列为2
- 可用`rowSums` `rowMeans` `colSums` `colMeans` 来替代 大数据量更快


```r
x <- matrix(rnorm(50), 10, 5)
apply(x, 1, quantile, probs = c(0.25, 0.75))
```

```
##        [,1]    [,2]    [,3]   [,4]    [,5]   [,6]    [,7]     [,8]    [,9]
## 25% -0.7550 -0.1150 -0.6049 -2.047 -0.7313 0.2552 -0.7638 -0.08716 -0.9866
## 75%  0.6002  0.2111  0.4513  0.810  0.9773 0.4735  1.3583  0.72104 -0.7451
##      [,10]
## 25% -1.297
## 75%  1.153
```

```r

a <- array(rnorm(2 * 2 * 10), c(2, 2, 10))
apply(a, c(1, 2), mean)
```

```
##         [,1]   [,2]
## [1,] -0.1998 0.2666
## [2,]  0.3661 0.1896
```


#### `tapply`

- 对数据子集（因子变量区分）向量应用函数


```r
x <- c(rnorm(10), runif(10), rnorm(10, 1))
f <- gl(3, 10)
tapply(x, f, mean)
```

```
##       1       2       3 
## -0.3899  0.4719  1.0280
```


#### `by`

- 对数据按照因子变量应用函数 类似`tapply` 
- 按照某个分类变量a分类求均值 `by(x[,-a],a,mean)`

#### `split`

- 将数据按因子分割为列表 常配合`lapply`使用
- 类似`tapply`
- 可用来生成分组 用`drop`来删除空分组


```r
x <- c(rnorm(10), runif(10), rnorm(10, 1))
f <- gl(3, 10)
lapply(split(x, f), mean)
```

```
## $`1`
## [1] 0.1348
## 
## $`2`
## [1] 0.4068
## 
## $`3`
## [1] 0.7912
```

```r

x <- rnorm(10)
f1 <- gl(2, 5)
f2 <- gl(5, 2)
str(split(x, list(f1, f2), drop = TRUE))
```

```
## List of 6
##  $ 1.1: num [1:2] -1.408 0.726
##  $ 1.2: num [1:2] 0.851 -1.992
##  $ 1.3: num -0.232
##  $ 2.3: num -0.827
##  $ 2.4: num [1:2] 0.568 0.921
##  $ 2.5: num [1:2] 0.00234 -0.07148
```


#### `mapply`

- 多变量版`apply` 从多个参数范围取值 并用函数得到结果


```r
noise <- function(n, mean, sd) {
    rnorm(n, mean, sd)
}
mapply(noise, 1:5, 1:5, 2)
```

```
## [[1]]
## [1] 3.034
## 
## [[2]]
## [1] 2.171 5.217
## 
## [[3]]
## [1] 4.413 1.436 4.034
## 
## [[4]]
## [1] 3.186 3.462 2.538 1.448
## 
## [[5]]
## [1] 5.453 3.605 6.845 5.335 7.109
```

```r

# 等同于如下循环

# list(noise(1, 1, 2), noise(2, 2, 2), noise(3, 3, 2), noise(4, 4, 2),
# noise(5, 5, 2))
```


#### `eapply`

- 对环境变量应用函数 用于包



### 模拟

- 在某分布下产生随机数
  - d 分布概率密度
  - r 分布随机数
  - p 分布累计概率
  - q 分布分位数
  

```r
dnorm(x, mean = 0, sd = 1, log = FALSE)
pnorm(q, mean = 0, sd = 1, lower.tail = TRUE, log.p = FALSE)
qnorm(p, mean = 0, sd = 1, lower.tail = TRUE, log.p = FALSE)
rnorm(n, mean = 0, sd = 1)
```


- `set.seed`保证重现性
- `sample`对数据采样

### 调试

- 三种提示 `message` `warning` `error` 只有`error`致命
- 关注重现性
- 调试工具 `traceback` `debug` `browser` `trace` `recover`
- 三思而行


### 分析代码

- 先设计 后优化
- `system.time` 计算代码运行时间 返回对象类型`proc_time`
  - ‵user time` 执行代码用时
  - `system time` CPU时间
  - `elapsed time` 实际用时
  - 在多核或并行条件下实际用时可以短于执行代码用时
  - 明确知道耗时较长的函数时使用
- `Rprof` R代码要支持分析函数
  - `summaryRprof`可使结果易读
  - 不要与`system.time`混用
  - 0.02s记录一次执行函数
  - `by.total` 记录单个函数用时
  - `by.self` 记录函数执行时被调用函数用时

# 使用R解决常见问题（除了《153 分钟学会 R》提到的以外）

## 图例颜色填充失灵

pch从21到25均可用背景色填充，但在legend里设置bg会与图例背景中bg冲突，需要指明pt.bg才可以

## 生成随机整数

### 问题描述

我需要完全随机设计，从0到20里随机排序，按照排序去分组

### 问题解决

```{r}
x <- 1:20
y <- sample(x)
group1 <- y[1:10]
group2 <- y[11:20]
```

----

## 实验设计中的样本数

### 问题描述

我想知道我所做的实验所需要的样本数。置信水平α表示假阳性；假阴性错误概率用β表示，1-β表示功效，用power表示，与置信水平一样，需要事先确定；还有一个需要预设的是你期望看到的差异值；有了这三个预设值，你就可以得到一个有统计意义的实验所需的样本数。事实上，这四个参数知道其中任意三个，你就可以计算第四个数，所以预实验很重要。

### 问题解决

```{r}
power.t.test(power = .90, delta = 1,sig.level = 0.05) # delta表示你想看到的差异值 数据标准化要处理好
```

这个问题隶属功效分析，R中 **pwr** 包专门用来做功效分析，可参考[这篇文章](http://www.statmethods.net/stats/power.html)

----

## 图文混排幻灯片

### 问题描述

使用knitr包rmd文档如何得到图片与文字的混排的html5幻灯片，beamer略显复杂，markdown似乎过于简单

### 问题解决

markdown语法相对简单，输出幻灯片中结构的调整最好直接修改html文件来调整，或者你可以考虑pandoc中对markdown语法的扩展，利用表格并将图片与文字放到两个单元格中来实现间接的混排。

----

## R中查阅包或数据信息

- `data()` 查阅所有包中自带数据信息
- `help(package="knitr")` 表示查阅名为knitr的包的基本信息及包中函数
- `vignette("foo")` pdf版函数或包介绍，更为详细

----

## 像excel一样在R中操作或输入数据

创建dataframe到一个对象如data`data <- data.frame(pos = factor(0),conc = numeric(0))`，然后`edit(data)`

## 数据框变量改名

fix(data)或者使用reshape包中的rename函数

## 按变量提取数据框部分样本

使用ddply来按变量提取并对提取出的数据取子集

```
library(plyr)
ddply(x,.(a0),function(df) df[seq(min(5,nrow(df))),])
```

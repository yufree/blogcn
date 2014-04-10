Data Science
============

# The Data Scientist's Toolbox

- CLT
  - name of root is represented by a slash: /
  - home directory is represented by a tilde: ~
  - pwd print working directory
  - recipe: command -flags arguments
  - clear: clear out the commands in your current CLI window
  - ls lists files and folders in the current directory
  
    -a lists hidden and unhidden files and folders
    
    -al lists details for hidden and unhidden files and folders
    
  - cd stands for "change directory"
  
    cd takes as an argument the directory you want to visit
    
    cd with no argument takes you to your home directory
    
    cd .. allows you to chnage directory to one level above your current directory
    
  - mkdir stands for "make directory"
  - touch creates an empty file
  - cp stands for "copy"
  
    cp takes as its first argument a file, and as its second argument the path to where you want the file to be copied
    
    cp can also be used for copying the contents of directories, but you must use the -r flag
  
  - rm stands for "remove"
  
    use rm to delete entire directories and their contents by using the -r flag
    
  - mv stands for "move"
  
    move files between directories
    
    use mv to rename files
  
  - echo will print whatever arguments you provide
  - date will print today's date
- git
```{git}
$ git config --global user.name "Your Name Here" # 输入用户名
$ git config --global user.email "your_email@example.com" # 输入邮箱
$ git config --list # 检查
$ git init # 初始化目录
$ git add . # 添加新文件
$ git add -u # 更新改名或删除的文件
$ git add -A|git add --all # 添加所有改动
$ git commit -m "your message goes here" # 描述并缓存本地工作区改动到上一次commit
$ git log # 查看commit记录 用Q退出
$ git status # 查看状态
$ git remote add # 添加服务器端地址
$ git remote -v # 查看远端状态
$ git push # 将本地commit推送到github服务器端
$ git pull|fetch|merge|clone # 本地获取远端repo
$ exit # 退出
```
  - Git = Local (on your computer); GitHub = Remote (on the web)
- 基本问题
  - 描述分析：对数据进行描述但不解释
  - 探索分析：寻找未知的变量间关系 （相关不代表因果）
  - 推断分析：用小样本推断总体 统计模型的目标 强依赖采样过程
  - 预测分析：用一组变量预测另一变量 不一定有因果关系
  - 因果分析：改变一个变量引发另一个变量变化的分析 随机实验 平均效果
  - 机理分析：对个体改变一个变量所导致另一个变量的精确变化 公式模拟与参数拟合
- 数据次于问题
- 大数据依赖科学而不是数据
- 实验设计 重视可重复性随机与分组 预测与推断不同 不要选数据

## 链接

- [统计问题](https://stats.stackexchange.com/)
- [R问题](http://stackoverflow.com/)
- [R mailling ist](http://www.r-project.org/mail.html)
- [数据分享](http://figshare.com/)

# R Programming

## Overview and History of R

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

## 获得帮助


```r
help()
`?`(command)
```


## 数据类型及基本运算

- 所有数据都是对象 所有对象都有类型
- 基本类型包括：字符“” 数字 整数L 复数(`Re()`实部 `Im()`虚部) 逻辑
- 向量储存同一类型数据
- list存储不同类型数据 `[[*]]`引用相应向量 `unlist()` 可用做紧凑输出
- 对象可以有属性`attributes()`
- 对象赋值符号为 <- 赋值同时展示加括号或直接输入对象名 可累加赋值 `a <- b <- c`
- `#`表示注释 不执行
- `:` 用来产生整数序列 也可以用`seq()`生成
- 向量用`c()`产生
- 空向量用`vector()`函数建立
- 向量中类型不同的对象元素会被强制转换为同一类型 字符优先级最高 其次数字 其次逻辑(0 or 1) 也可以用来串联字符
- 可使用`as.*`来强制转化数据类型
- 对象可以用`names`命名
- 变量名开头不能是数字和. 大小写敏感 下划线不要出现在名字里 分割用. 变量名中不能有空格
- 保留字符

```r
FALSE Inf NA NaN NULL TRUE break else for function if in next repeat while
```

- 矩阵
  - 带有`dimension`属性的向量为矩阵 矩阵的生成次序为upper-left
  - `matrix(1:6,nrow=2,ncol=3)`表示建一个2行3列矩阵 从1到6 先列后行赋值 可用 `byrow = T` 来更改
  - 可用`c()`给`dim`赋值行和列数 这样可把一个向量转为一个矩阵 `m<-1:6;dim(m)<-c(2,3)`
  - 矩阵可以用`rbind`或`cbind`生成
  - `t()`对矩阵转置
- 因子变量表示分类数据 用标签名区分 用`level`来命名排序 默认是字母排序 有些函数对顺序敏感可用 `levels = c()` 来命名 ( 例如低中高的排序 ) 数字表示 `drop = T` 表示显示截取数据的水平  `nlevels`给出个数
- NaN表未定义或缺失值 NA表示无意义转换或缺失值 NaN可以是NA反之不可以 NA有数据类型 is.NaN与is.NA 可用来检验
- 数据框
  - 特殊list 每个元素长度相等
  - 每一列类型相同 矩阵所有数据类型相同
  - 特殊属性`row.names`
  - 转为矩阵`data.matrix`
  - 变量名自动转化 可以不同
  - 因子变量保持为字符可以用 `I()` `data.frame(x,y,I(c))`
- 数组
  - 表示更高维度的数据 
  - `dim() = c(x,y,z)` 三维数组表示一组数 
  - `dimnames()` 给数组命名 
  - 数组调用如果只有一行 需要`drop = F` 否则 不会按照数组分类
- `ts()` 产生时间序列对象
- `.Last.value` 引用前一个数值
- 取整数 用`round(x,n)` n表示保留几位小数
- 截取整数 `trunc()`
- 开平方 `sqrt()`
- 绝对值 `abs()`
- 指数函数 `exp()`
- 自然对数函数 `log()`
- 以 10 为底的对数函数 `log10()`
- 三角函数 `sin() cos() tan() asin() acos() atan()`
- 常用的逻辑运算符有: 大于 `>` 小于 `<` 等于 `==` 小于或等于 `<=` 大于或等于 `>=` 与 `&` 非 `!` 或`|`
- 判断向量x中是否与y中元素相等 `x %in% y` 结果返回逻辑值
- `sum()` 求和 `prod()` 求连乘
- `range()` 给极值范围
- `duplicated()` 给出有重复的值 
- `unique()` 给出无重复的值
- 向量操作 `union()` 并集 `intersect()` 交集 `setdiff()` 除了交集的部分
- `rep()` 用向量循环生成向量


```r
x <- 1:4  # puts c(1,2,3,4) into x
i <- rep(2, 4)  # puts c(2,2,2,2) into i
y <- rep(x, 2)  # puts c(1,2,3,4,1,2,3,4) into y
z <- rep(x, i)  # puts c(1,1,2,2,3,3,4,4) into z
w <- rep(x, x)  # puts c(1,2,2,3,3,3,4,4,4,4) into w
```

- 整型变量后面加上L x<-10L
- Inf代表1/0 同样1/Inf运算结果为0

## 截取数据

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


## 读取数据

- `read.table` `read.csv` 读取表格 反之`write.table`
- `readLines` 读取文本行 反之`writeLines`
- `source` 读取R代码 反之`dump`
- `dget` 读取多个R代码 反之`dput`
- `load` 读取保存的工作区 反之`save`
- `unserialize` 读取二进制R对象 反之`serialize`

- 设置工作目录


```r
getwd()
setwd(“”)
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

## 控制结构

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

## 函数


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

## 编程标准

- 使用文本文档与文本编辑器
- 使用缩进
- 限制代码行宽（80）
- 限制单个函数长度

## 范围规则

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

## 向量化操作

- 向量操作针对元素
- 矩阵操作也针对元素 `%*%` 表示矩阵操作

## 日期与时间

- 日期以`data`类型存储
- 时间以`POSIXct` 或 `POSIXlt` 类型存储
- 数字上是从1970-01-01以来的天数或秒数
- `POSIXct`以整数存储时间
- `POSIXlt`以年月日时分秒等信息存储时间
- `strptime` `as.Date` `as.POSIXlt` `as.POSIXct`用来更改字符为时间

## 循环

### `lapply`

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
## [1] 0.04387
```

```r

x <- 1:4
lapply(x, runif, min = 0, max = 10)
```

```
## [[1]]
## [1] 3.744
## 
## [[2]]
## [1] 6.167 1.576
## 
## [[3]]
## [1] 7.445 1.588 3.170
## 
## [[4]]
## [1] 6.484 6.038 7.566 2.140
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


### `sapply`

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
## 2.5000 0.2613 1.0573 4.9900
```


### `apply`

- 数组边际函数 常用于矩阵的行列处理
- 行为1，列为2
- 可用`rowSums` `rowMeans` `colSums` `colMeans` 来替代 大数据量更快


```r
x <- matrix(rnorm(50), 10, 5)
apply(x, 1, quantile, probs = c(0.25, 0.75))
```

```
##       [,1]    [,2]    [,3]    [,4]    [,5]   [,6]    [,7]    [,8]   [,9]
## 25% -1.234 -0.6555 -1.0096 -1.5457 -1.4240 0.1158 -0.6198 0.02307 0.4121
## 75%  0.897  0.7718 -0.3553  0.0363 -0.5013 1.2961 -0.3144 0.50239 0.6274
##       [,10]
## 25% -0.1611
## 75%  0.9515
```

```r

a <- array(rnorm(2 * 2 * 10), c(2, 2, 10))
apply(a, c(1, 2), mean)
```

```
##          [,1]       [,2]
## [1,] 0.009123 -1.968e-05
## [2,] 0.067474 -4.796e-01
```


### `tapply`

- 对数据子集（因子变量区分）向量应用函数


```r
x <- c(rnorm(10), runif(10), rnorm(10, 1))
f <- gl(3, 10)
tapply(x, f, mean)
```

```
##       1       2       3 
## 0.04418 0.33830 1.00656
```


### `split`

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
## [1] 0.41
## 
## $`2`
## [1] 0.5094
## 
## $`3`
## [1] 1.54
```

```r

x <- rnorm(10)
f1 <- gl(2, 5)
f2 <- gl(5, 2)
str(split(x, list(f1, f2), drop = TRUE))
```

```
## List of 6
##  $ 1.1: num [1:2] 0.7408 0.0456
##  $ 1.2: num [1:2] -0.672 -0.622
##  $ 1.3: num 1.74
##  $ 2.3: num -0.416
##  $ 2.4: num [1:2] -0.594 1.436
##  $ 2.5: num [1:2] 0.076 -0.0805
```


### `mapply`

- 多变量版`apply` 从多个参数范围取值 并用函数得到结果


```r
noise <- function(n, mean, sd) {
    rnorm(n, mean, sd)
}
mapply(noise, 1:5, 1:5, 2)
```

```
## [[1]]
## [1] 2.047
## 
## [[2]]
## [1]  4.009 -2.797
## 
## [[3]]
## [1] 3.0327 3.8435 0.7555
## 
## [[4]]
## [1] 5.604 6.220 2.108 6.668
## 
## [[5]]
## [1] 5.264 5.316 6.557 8.286 5.405
```

```r

# 等同于如下循环

# list(noise(1, 1, 2), noise(2, 2, 2), noise(3, 3, 2), noise(4, 4, 2),
# noise(5, 5, 2))
```


## 调试

- 三种提示 `message` `warning` `error` 只有`error`致命
- 关注重现性
- 调试工具 `traceback` `debug` `browser` `trace` `recover`
- 三思而行


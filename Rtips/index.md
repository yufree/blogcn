---
layout: post
title: R tips
---

使用R解决常见问题（除了《153 分钟学会 R》提到的以外）

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

## 为数据框里添加列向量

假设数据框名为data，列向量为b，直接`data$new <- b`或者使用transform函数`data <- transform(data,b)`或者`edit(data)`

## 数据框变量改名

fix(data)或者使用reshape包中的rename函数

----

## R中apply及其类似函数的区别与联系

- apply

对数组或向量进行操作，apply(X, MARGIN, FUN, ...)，这里面margin是最难理解的，可以想象成对对象X的取值方法，1就是按行，2就是按列，c(1,2)就是全体，这时其实就是对所有元素操作了
- eapply

对环境元素套用函数，返回列表，环境是个啥不清楚，大约是用来打包对象的

- lapply

对列表x内的元素套用函数，返回与x等元素数的列表，lapply(X, FUN, ...)

- sapply

与lapply基本一致，不过返回的不是列表，返回的是一个包含与X等元素数的向量，sapply(X, FUN, ...)

- vapply

与sapply基本一致，不过可以返回一个预定义格式的矩阵，由FUN.VALUE决定，可以给定函数输出形式，vapply(X, FUN, FUN.VALUE, ...)

- replicate

一般用在随机数生成上，例如生成多组正态分布，replicate(n,rnorm(x)),就是生成10组含x个元素的正态分布数，每组为一个向量，结果为x*n的矩阵，这点类似重复用sapply生成向量，然后cbind成矩阵

- mapply

可以看成一种处理元素数据的方法，跟函数所需参数有关，mapply(rep, 1:4, 4:1)中rep需要两个参数，一个是需要重复处理的数据，一个是重复的次数,mapply的作用就是从第一个参数里取第一个数据然后从第二个参数里取第二个数据作为重复次数，这样得到第一个元素，取完了就得到一个列表，数据排列得当相当于求方程

- rapply

这个略复杂，参数how为replace或list时，数据结构不变；但how为unlist时，所有数据就压扁成一个list了，classes表示可选择处理数据，如字符或数字，感觉在处理列表时有用，例如对所有列表中的数字元素开平方，rapply(object, f, classes = "ANY", deflt = NULL,how = c("unlist", "replace", "list"), ...)

- tapply

有分类变量列，想按分类变量分组处理连续变量数据可考虑用这个函数，X为连续变量，INDEX为分组变量，可用来处理不规则数组，tapply(X, INDEX, FUN = NULL, …, simplify = TRUE)

- by

跟上面比较类似，by也是对着分组变量用函数处理连续变量，输出结果也差不多，可配合aggregate使用

- 小结

遇到需要处理按分类处理连续变量的情况，考虑by；遇到按行列处理，考虑apply；处理列表元素可考虑lapply或sapply，其余按情况来使用
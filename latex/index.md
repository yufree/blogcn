# 简明latex笔记

## 关于tex

- 作者 Donald Knuth

- `tex` 排版引擎 圆周率

- `metafont` 处理字体 自然对数的底数

- 控制序列 钩子为`\` 

- 宏包 对控制序列打包 钩子为`\ `

        - `Lamport`

        - `latex` 宏包 分部分处理文档 打包了大量命令

        - `latex 2e` 后基本停止

        - Hans 对 `latex` 不满 认为可定制性不够 遂进行二次开发 有了 `context`

- 引擎 处理控制序列 进行排版

        - `pdftex` 可解决文档直接输出为PDF的问题 避免产生dvi

        - 早期不支持unicode 对多国语言只能通过调用宏包来实现字符与图形对应 `cjk` `ctt` `ctex` 等都是此类宏包 需要安装字体

        - `xetex` 可原生支持unicode的引擎并调用系统字体 支持plain tex xelatex 可支持latex宏包

        - `luatex` 合并`metapost` 可直接绘图 可直接调用字体 可脱离宏包调用程序 现与 `context` 结合紧密

- `tex`格式 Knuth为原始300个控制序列写的宏包 有600命令 这900个合称`plain tex`

- 将引擎 宏包 格式 辅助程序等打包即为发行版

        - `miktex` `texlive` `mactex`

        - `context` `minimals` 只有自己的引擎与宏包

- 字体 最早是栅格 后来是矢量 

        - type I 是最早的矢量

        - truetype 是type I 的竞争对手

        - opentype 是基于truetype的进化版

        - 最早格式为DVI 为字体准备了字形盒子 可通过上面编码调用字库显示 之后出现了PS与PDF

        - 原来要编译多次 现在只需要用`xetex`或`luatex`引擎就可以了 他们内置了库来实现字形盒子与字体的联系 这个库有cache功能

- 字体分类

        - 衬线体 起笔落笔有差异 横竖粗细各不同 易于识别 宋体

        - 非衬线体 笔画粗细一致 无装饰 醒目 黑体

        - 等宽体 每个字宽窄相同 汉字 编程

## 关于`xetex`

- `xeCJK` 使用`xelatex`引擎的中文宏包 纠正了`xelatex`一些缩进等的不美观

- `ctex` 包含早期`CTT` `CJK` 及 `xeCJK` 可用`\setCJKmainfont{SimSun}` 来调用系统字体 下面是底层调用中英文混排

### 实例讲解

```
\documentclass[12pt,a4paper]{article}
\usepackage{xltxtra,fontspec,xunicode}
\usepackage[slantfont,boldfont]{xeCJK} % 允许斜体和粗体
\setCJKmainfont{FZJingLeiS-R-GB}   % 设置缺省中文字体 
\setCJKmonofont{SimSun}   % 设置等宽字体
\setmainfont{TeX Gyre Pagella} % 英文衬线字体
\setmonofont{Monaco} % 英文等宽字体
\setsansfont{Trebuchet MS} % 英文无衬线字体
```

## tex常见问题

|- 空白 tab与多个空白认为是一个空白 空行表示段落结束

|- 保留字符 # $ % ^ & _ { } ~ \ 可使用\# \$ \% \^{} \& \_ \{ \} \~{} 来表示 \\表示断行  $\backslash$生成反斜杠

|- latex命令 \tex{} 后面加空格防止命令延长  {}中为命令参数

|- % 表示注释掉一行 也可使用\usepackage{verbatim} 中的comment环境

|- 源文件结构

|-- \documentclass[]{...}声明文档类型[]中为选项 包括字体 纸张 公式对齐 等文档格式

|-- \usepackage[]{...}加入需要的宏包[]中为触发功能的关键词

|-- 以上为导言区

|-- \begin{document}开始正文

|-- \end{document}结束文档

|- 页面样式\pagestyle{style} 不同页眉页脚样式

|- \include{ﬁlename} 用来包含文档 多用于大型文档 在新页包含 连续可用\input{ﬁlename}

|- \includeonly{ﬁlename,ﬁlename,. . .}导言区包含文档 在所有\include文档中 只有\includeonly中的会被处理

|- 语法检查\usepackage{syntonly} \syntaxonly

|- \hyphenation{word list}给出断字列表 完整的不允许断 有-的表示允许的唯一断字点 在文档中\-表示唯一允许断字的地方

|- mbox fbox 不允许断字的地方 后者给出一个方框 mbox可用来分割连字

|- 特殊字符 ‘输入两个表示双引号 -输入1个连字号 2个短破折 3个长破折 网址中波浪号用$\sim$ 而不是\~表示 摄氏度用$-30\,^{\circ}\mathrm{C}$表示 \ldots表示省略号 bable宏包可处理多种非中文语言

|- ~用来强制取消大写字母后空格多出的一点 \@用来表示大写字母作为最后一个词后句号的处理 一般latex不会处理大写字母后的句号（加入多一点空格）认为是缩写

|- \frontmatter 应接着命令 \begin{document} 使用。它把页码更换为罗马数字。对于正文前的内容普遍使用带星的命令（例如，\chapter*{Preface}），以阻止 LATEX 对它们排序。\mainmatter 应出现在书的第一章紧前面。它打开阿拉伯页码计数器，并对页码从新计数。\appendix 标志书中附录材料的开始。该命令后的各章序号改用字母标记。\backmatter 应该插入与书中最后一部分内容的紧前面，如参考文献和索引。在标准文档类型中，它对页面没有什么效果。

|- 交叉引用  \label{marker}引用点, \ref{marker}引用 and \pageref{marker}引用点页码交叉引用

|- 产生脚注 \footnote{footnote text}

|- 强调 \underline{text}下划线 \emph{text} 斜体 强调中强调会切换字体

|- 环境

- itemize 环境用于简单的列表，enumerate 环境用于带序号的列表，description 环境用于带描述的列表
- flushleft 和 flushright 环境分别产生靠左排列和靠右排列的段落
- center 环境产生居中的文本 如果你不输入命令 \\ 指定断行点，LATEX将自行决定
- quote 环境对重要断语和例子的引用很重要
- quotation 环境用于超过几段的较长引用，因为它对段落进行缩进
- verse 环境用于诗歌，在诗歌中断行很重要。在一行的末尾用 \\ 断行，在每一段后留一空行
- verbatim环境直接输出其中内容 可用断字表示 可表示空格 较短的用\verb*|like this :-) |
- \begin{tabular}{table spec}用来生成表格
- \begin{figure}[placement speciﬁer] or \begin{table}[placement speciﬁer]表示浮动体
- \caption{caption text}给浮动体加标签
- \listoffigures and \listoftables 生成图表目录

|- 数学公式

段落中放于 `\(` 和 `\)`， `$` 和 `$` 或者 `\begin{math}` 和 `\end{math}` 单独一行可放于 `\[` 和 `\]` 或 `\begin{displaymath}` 和 `\end{displaymath}`带编号可放于equation数学模式中

1. 空格和分行都将被忽略。所有的空格或是由数学表达式逻辑的衍生，或是由特殊的命令如 `\`,，`\quad` 或 `\qquad` 来得到。

2. 不允许有空行，每个公式中只能有一个段落。

3. 每个字符都将被看作是一个变量名并以此来排版。如果你希望在公式中出现普通的文本（使用正体字并可以有空格），那么你必须使用命令 `\textrm{...}` 来输入这些文本。

|- `\newtheorem{name}[counter]{text}[section]`定理环境name 是短关键字，用于标识“定理”。`text` 定义“定理”的真实名称，会在最终文件中打印出来。

|- 建立新命令

\newcommand{name}[num]{deﬁnition}第一个参数 name 是你想要建立的命令的名称，第二个参数 deﬁnition 是命令的定义。第三个参数 num 是可选的，用于指定命令所需的参数数目（命令最多可以有9个参数）。如果不给出这个参数，那么新建的命令将不接受任何参数。 num可用来传参，\renewcommand可用来建立与原命令名称相同的命令

|- 建立新环境 \newenvironment{name}[num]{before}{after}

|- 建立新宏包 \ProvidesPackage{package name}命令环境打包起名字保存为sty 可直接调用 其实就是打包导言区

|- 行距\linespread{factor}

|- 首行缩进与段落间距 \setlength{\parindent}{0pt} \setlength{\parskip}{1ex plus 0.5ex minus 0.2ex}

|- 水平距离\hspace{length} 橡皮擦 \stretch{n} x\hspace{\stretch{3}}x

|- 垂直距离\vspace{length}

|- 输入双引号`` '' 单引号`' 可得到英文引号

|- `\sum\limits_{k=1}^n k^2` 使求和符号上下标真正出现在上下位
" Vim color file
" Maintainer:	Hans Fugal <hans@fugal.net>
" Last Change:	$Date: 2004/06/13 19:30:30 $
" Last Change:	$Date: 2004/06/13 19:30:30 $
" URL:		http://hans.fugal.net/vim/colors/desert.vim
" Version:	$Id: desert.vim,v 1.1 2004/06/13 19:30:30 vimboss Exp $

" cool help screens
" :he group-name
" :he highlight-groups
" :he cterm-colors

"整体主题的色调：dark 和 lignt
set background=dark

"重新设置一下语法高亮，否则设置不会生效
if version > 580
    " no guarantees for version 5.8 and below, but this makes it stop
    " complaining
    hi clear
    if exists("syntax_on")
        syntax reset
    endif
endif

"主题名称
let g:colors_name="desert"

"由于vim可以在黑白终端、彩色终端、GUI界面下运行,所以需要对其分别进行配置
"term            黑白终端的属性
"cterm           彩色终端的属性
"ctermfg         彩色终端前景色
"ctermbg         彩色终端背景色
"gui             GUI属性         
"guifg           GUI前景色         
"guibg           GUI背景色         
"

"对于黑白终端，我们没有配置的必要，因此主要的配置工作集中在彩色终端与GUI界面上
"由于不是所有终端都支持256色，因此使用一些安全色会使我们的主题更有移植性，而GUI可以支持所有颜色，不在考虑范围之内，vim文档给出的安全色如下：
"0      Black    
"1      DarkBlue    
"2      DarkGreen          
"3      DarkCyan   
"4      DarkRed  
"5      DarkMagenta          
"6      Brown, DarkYellow              
"7      LightGray, LightGrey, Gray, Grey                     
"8      DarkGray, DarkGrey     
"9      Blue, LightBlue       
"10     Green, LightGreen            
"11     Cyan, LightCyan                      
"12     Red, LightRed                           
"13     Magenta, LightMagenta   
"14     Yellow, LightYellow     
"15     White     


"------------------------------GUI界面定义-------------------------------
"正常
hi Normal	    guifg=White        guibg=black

"-----------------highlight groups-----------------
"Cursor              光标所在字符  
hi Cursor	    guibg=khaki        guifg=slategrey
"hi CursorIM
"hi Directory
"hi DiffAdd
"hi DiffChange
"hi DiffDelete
"hi DiffText
hi VertSplit	guibg=#c2bfa5      guifg=grey50     gui=none
hi Folded	    guibg=grey30       guifg=gold
hi FoldColumn	guibg=grey30       guifg=tan


"--------文本搜索----------------
"增量搜索时匹配的文本符串
hi IncSearch	guifg=slategrey    guibg=khaki
"匹配的文本符串
hi Search	    guibg=peru         guifg=wheat


"--------弹出菜单----------------
"增量搜索时匹配的文本符串
hi IncSearch	guifg=slategrey    guibg=khaki
"匹配的文本符串
hi Search	    guibg=peru         guifg=wheat

"--------窗体边框相关------------
"VertSplit           垂直分割窗口的边框  
"LineNr              行号  
"CursorLine          光标所在行  
"CursorColumn         光标所在列  
"ColorColumn         标尺  
"NonText             窗口尾部的~和@，以及文本里实际不显示的字符
hi NonText	    guifg=LightBlue    guibg=grey30

"------------diff模式------------
"DiffAdd             diff模式增加的行  
"DiffChange          diff模式改变的行  
"DiffDelete          diff模式删除的行  
"DiffText            diff模式插入文本 

"--------状态栏提示信息----------
"当前模式
hi ModeMsg	    guifg=goldenrod                            
"其他文本
hi MoreMsg	    guifg=SeaGreen
"询问用户
hi Question	    guifg=springgreen
hi SpecialKey	guifg=yellowgreen
"状态栏
hi StatusLine	guibg=#c2bfa5      guifg=black       gui=none
"非当前窗口的状态栏
hi StatusLineNC	guibg=#c2bfa5      guifg=grey50      gui=none
hi Title	    guifg=indianred
hi Visual	    guifg=khaki        guibg=olivedrab   gui=none
"hi VisualNOS
"hi ErrorMsg 错误信息
"警告信息
hi WarningMsg	guifg=salmon
"hi Error               错误
"hi WildMenu
"hi Menu
"hi Scrollbar
"hi Tooltip

"----syntax highlighting groups-----
"Comment             注释  
hi Comment	    guifg=Green
hi Comment2	    guifg=Red
"hi Comment	    guifg=SkyBlue
"PreProc             预处理  
hi PreProc	    guifg=LightRed
"hi PreProc	    guifg=indianred
"Type                数据类型  
hi Type		    guifg=red
"hi Type		guifg=darkkhaki
"Constant            常量  
hi Constant	    guifg=#00f0f0
"hi Constant	guifg=DarkRed
"hi Constant	guifg=#ffa0a0
"Statement           控制语句  
hi Statement    guifg=yellow
""hi Statement	guifg=#ffeb9b
"hi Statement	guifg=khaki
"Special             字符串中的中的特殊字符 (var)
hi Special      guifg=navajowhite
"String              字符串  
hi String       guifg=lightRed
""hi String       guifg=#f0e7d5
"cCppString          Cpp字符串  
"Number              数字  
hi Number       guifg=LightBlue
"Todo                TODO、HACK、FIXME等标签
hi Todo		    guifg=yellow guibg=yellow2
"hi Todo		guifg=orangered guibg=yellow2
hi Identifier	guifg=palegreen
"hi Underlined
hi Ignore	    guifg=grey40




"--------------- color terminal definitions   彩色终端定义----------------
hi SpecialKey	ctermfg=darkgreen
hi NonText	cterm=bold ctermfg=darkblue
hi Directory	ctermfg=darkcyan
hi ErrorMsg	cterm=bold ctermfg=7 ctermbg=1
hi IncSearch	cterm=NONE ctermfg=yellow ctermbg=green
hi Search	cterm=NONE ctermfg=grey ctermbg=blue
hi MoreMsg	ctermfg=darkgreen
hi ModeMsg	cterm=NONE ctermfg=brown
hi LineNr	ctermfg=3
hi Question	ctermfg=green
hi StatusLine	cterm=bold,reverse
hi StatusLineNC cterm=reverse
hi VertSplit	cterm=reverse
hi Title	ctermfg=5
hi Visual	cterm=reverse
hi VisualNOS	cterm=bold,underline
hi WarningMsg	ctermfg=1
hi WildMenu	ctermfg=0 ctermbg=3
hi Folded	ctermfg=darkgrey ctermbg=NONE
hi FoldColumn	ctermfg=darkgrey ctermbg=NONE
hi DiffAdd	ctermbg=4
hi DiffChange	ctermbg=5
hi DiffDelete	cterm=bold ctermfg=4 ctermbg=6
hi DiffText	cterm=bold ctermbg=1
hi Comment	ctermfg=darkcyan
hi Constant	ctermfg=brown
hi Special	ctermfg=5
hi Identifier	ctermfg=6
hi Statement	ctermfg=3
hi PreProc	ctermfg=5
hi Type		ctermfg=2
hi Underlined	cterm=underline ctermfg=5
hi Ignore	cterm=bold ctermfg=7
hi Ignore	ctermfg=darkgrey
hi Error	cterm=bold ctermfg=7 ctermbg=1


"vim: sw=4

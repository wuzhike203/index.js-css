set shortmess=atI   "������ʱ����ʾ�Ǹ�Ԯ���ڸɴ��ͯ����ʾ  
"����"
set fencs=utf-8,ucs-bom,shift-jis,gb18030,gbk,gb2312,cp936

set termencoding=utf-8

set encoding=utf-8

set fileencodings=ucs-bom,utf-8,cp936

set fileencoding=utf-8
" ��ʾ���İ���
set helplang=cn

"�����˵����Ҽ�����"
source $VIMRUNTIME/delmenu.vim
source $VIMRUNTIME/menu.vim

"����consle�������
language messages zh_CN.utf-8
winpos 5 5          " �趨����λ��  
set lines=20 columns=80    " �趨���ڴ�С  

set nu              " ��ʾ�к�  

set guifont=Courier_New:h14:cANSI   " ��������  
" ������ɫ����
colorscheme desert
"���벹ȫ 
set completeopt=preview,menu 
"����������  
set clipboard+=unnamed 

"�Ӳ�����  
set nobackup
set noswapfile

"�������Դ�Сд
set ignorecase
"�������ַ�����
set hlsearch
set incsearch

set confirm           "ɾ��ʱ����ʾɾ���Ի���

"ʹbackspace����ɾ��indent,"",eol,start��"
set backspace=2

set expandtab            " �ÿո�����Ʊ���
set autoindent           " �Զ�����
set tabstop=4            " Tab���Ŀ���
set shiftwidth=4
set softtabstop=4         " ͳһ����Ϊ4

"���ĸ�ѡ����� C ��������:
"cindent'       ʹ Vim �� C �����Զ�������
"cinkeys'       ָ���ڲ���ģʽ�°��ĸ��������ٴ�������
"cinoptions'    �趨��ϲ�õ�����ģʽ��
"cinwords'      ��������һ���п�ʼһ�����������Ĺؼ��֡�

set cursorline              " ͻ����ʾ��ǰ��

set ruler           " ��ʾ���  


" ������ʾƥ�������
set showmatch

"pathogen ���������
execute pathogen#infect()
"�﷨����
syntax on
"�ļ����ͼ��
filetype on
"�ļ����Ͳ������
filetype plugin on
"�ļ���������,��vim74/indent�ļ���"
filetype indent on

"�Զ���ȫ
"     ����(   �൱�ڰ���(��+)��+<ESC>��+i��
:inoremap ( ()<ESC>i

:inoremap ) <c-r>=ClosePair(')')<CR>

"            <CR>����Ctrl��
":inoremap { {<CR>}<ESC>O
:inoremap { {}<ESC>i

:inoremap } <c-r>=ClosePair('}')<CR>

:inoremap [ []<ESC>i

:inoremap ] <c-r>=ClosePair(']')<CR>

:inoremap " ""<ESC>i

:inoremap ' ''<ESC>i


"F5 python"
noremap <F5> <Esc>:!python %<cr>

"�Զ�����ʱ�������"
"<c-d>  : ����
:imap <silent> <c-d> <c-r>=strftime("%y-%m-%d")<cr> 
"<c-t>  : ʱ��
:imap <silent> <c-t> <c-r>=strftime("%H:%M:%S")<cr> 

set showcmd         " �����������ʾ�������������Щ  
set statusline=%F%m%r%h%w\ [FORMAT=%{&ff}]\ [TYPE=%Y]\ [POS=%l,%v][%p%%]\ %{strftime(\"%d/%m/%y\ -\ %H:%M\")}   
"״̬����ʾ������  
"
autocmd InsertEnter * se cul    " ��ǳɫ������ǰ��  
autocmd InsertLeave * se nocul  " ��ǳɫ������ǰ��  
set laststatus=1    " ������ʾ״̬��(1),������ʾ״̬��(2)  

set foldenable      " �����۵�  
set foldmethod=manual   " �ֶ��۵�  

set nocompatible  "ȥ��������й�viһ����ģʽ��������ǰ�汾��һЩbug�;���  

nmap <leader>w :w!<cr>
nmap <leader>f :find<cr>

" ӳ��ȫѡ+���� ctrl+a
map <C-A> ggVGY
map! <C-A> <Esc>ggVGY
map <F12> gg=G

" ѡ��״̬�� Ctrl+c ����
vmap <C-c> "+y

"ȥ����  
nnoremap <F2> :g/^\s*$/d<CR> 

"�Ƚ��ļ�  
nnoremap <C-F2> :vert diffsplit 

"�½���ǩ  
map <M-F2> :tabnew<CR>  

"�г���ǰĿ¼�ļ�  
map <F3> :tabnew .<CR>  

"����״�ļ�Ŀ¼  
map <C-F3> \be  

" ���õ��ļ����Ķ�ʱ�Զ�����
set autoread

" quickfixģʽ
autocmd FileType c,cpp map <buffer> <leader><space> :w<cr>:make<cr>

"make ����
:set makeprg=g++\ -Wall\ \ %

"�Զ�����
set autowrite

" ȥ������������ʾ����
set noeb

" ��ʷ��¼��
set history=1000

" ����backspace�͹�����Խ�б߽�
set whichwrap+=<,>,h,l

" ������buffer���κεط�ʹ����꣨����office���ڹ�����˫����궨λ��
set mouse=a

set selection=exclusive
set selectmode=mouse,key

" ͨ��ʹ��: commands������������ļ�����һ�б��ı��
set report=0

" �ڱ��ָ�Ĵ��ڼ���ʾ�հף������Ķ�
set fillchars=vert:\ ,stl:\ ,stlnc:\


" ����ƶ���buffer�Ķ����͵ײ�ʱ����3�о���
set scrolloff=2

" ʹ�������������"
nmap <F7> :!start "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" %<cr>

function! ClosePair(char)
    if getline('.')[col('.') - 1] == a:char
        return "\<Right>"
    else
        return a:char
    endif
endfunction

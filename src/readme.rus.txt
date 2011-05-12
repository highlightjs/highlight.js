# Highlight.js

Highlight.js нужен для подсветки синтаксиса в примерах кода в блогах,
форумах и вообще на любых веб-страницах. Пользоваться им очень просто,
потому что работает он автоматически: сам находит блоки кода, сам
определяет язык, сам подсвечивает.

Автоопределением языка можно управлять, когда оно не справляется само (см.
дальше "Эвристика").


## Подключение и использование

В загруженном архиве лежит файл "highlight.pack.js" -- полная сжатая версия
библиотеки для работы. Все несжатые исходные файлы также есть в пакете, поэтому
не стесняйтесь в них смотреть!

Скрипт подключается одним файлом и одним вызовом инициализирующей
функции:

    <script type="text/javascript" src="highlight.pack.js"></script>
    <script type="text/javascript">
      hljs.initHighlightingOnLoad();
    </script>

Также вы можете заменить символы TAB ('\x09'), используемые для отступов, на
фиксированное количество пробелов или на отдельный `<span>`, чтобы задать ему
какой-нибудь специальный стиль:

    <script type="text/javascript">
      hljs.tabReplace = '    '; // 4 spaces
      // ... or
      hljs.tabReplace = '<span class="indent">\t</span>';

      hljs.initHighlightingOnLoad();
    </script>

Дальше скрипт ищет на странице конструкции `<pre><code>...</code></pre>`,
которые традиционно используются для написания кода, и код в них
размечается на куски, помеченные разными значениями классов.


### Инициализация вручную

Если вы используете другие теги для блоков кода, вы можете инициализировать их
явно с помощью функции `highlightBlock(code, tabReplace)`. Она принимает
DOM-элемент с текстом расцвечиваемого кода и опционально - строчку для замены
символов TAB.

Например с использованием jQuery код инициализации может выглядеть так:

    $(document).ready(function() {
      $('pre code').each(function(i, e) {hljs.highlightBlock(e, '    ')});
    });

Если ваш блок кода использует `<br>` вместо переводов строки (т.е. если это не
`<pre>`), передайте `true` третьим параметром в `highlightBlock`:

    $('div.code').each(function(i, e) {hljs.highlightBlock(e, null, true)});


### Выбор стилей

Размеченным классами элементам кода можно задать желаемые стили например так:

    .comment {
      color: gray;
    }

    .keyword {
      font-weight: bold;
    }

    .python .string {
      color: blue;
    }

    .html .atribute .value {
      color: green;
    }

В комплекте с highlight.js идут несколько стилевых тем в директории styles,
которые можно использовать напрямую или как основу для собственных экспериментов.

Полный список классов для разных языков приведен ниже ("Языки").


## Экспорт

В файле export.html находится небольшая программка, которая показывает и дает
скопировать непосредственно HTML-код подсветки для любого заданного фрагмента кода.
Это может понадобится например на сайте, на котором нельзя подключить сам скрипт
highlight.js.


## Языки

В списке приведены все языки, которые знает библиотека с классами,
соответствующими различным синтаксическим частям. В скобках после
названий языков указаны идентификаторы языков, используемые в качестве
классов элемента `<code>`.

Python ("python"):

  keyword          ключевое слово языка
  built_in         стандартные значения (None, False, True и Ellipsis)
  number           число
  string           строка (любого типа)
  comment          комментарий
  decorator        @-декоратор функции
  function         заголовок функции "def some_name(...):"
  class            заголовок класса "class SomeName(...):"
  title            название функции или класса внутри заголовка
  params           все, что в скобках внутри заголовка функции или класса

Результаты профайлинга Питона ("profile"):

  number           число
  string           строка
  builtin          встроенная функция в строке результата
  filename         имя файла в строке результата
  summary          итоговые результаты профилирования
  header           заголовок таблицы результатов
  keyword          название колонки в заголовке
  function         название функции в строке результата (включая скобки)
  title            само название функци в строке результата (без скобок)

Ruby ("ruby"):

  keyword          ключевое слово языка
  string           строка
  subst            внутристроковая подстановка (#{...})
  comment          комментарий
  yardoctag        тег YARD
  function         заголовок функции "def ..."
  class            заголовок класса "class ..."
  title            название функции или класса внутри заголовка
  parent           название родительского класса
  symbol           символ
  instancevar      переменная класса

Perl ("perl"):

  keyword          ключевое слово языка
  comment          комментарий
  number           число
  string           строка
  regexp           регулярное выражение
  sub              заголовок процедуры (от "sub" до "{")
  variable         переменная, начинающаяся с "$", "%", "@"
  operator         оператор
  pod              документация (plain old doc)

PHP ("php"):

  keyword          ключевое слово языка
  number           число
  string           строка (любого типа)
  comment          комментарий
  phpdoc           параметры phpdoc в комментарии
  variable         переменная, начинающаяся с "$"
  preprocessor     метки препроцессора: "<?php" and "?>"

Scala ("scala"):

  keyword          ключевое слово языка
  number           число
  string           строка
  comment          комментарий
  annotaion        аннотация
  javadoc          javadoc-комментарии
  javadoctag       @-тег в javadoc
  class            заголовок класса
  title            название класса внутри заголовка
  params           все, что в скобках внутри заголовка класса
  inheritance      слова "extends" и "with" внутри заголовка класса

Go language ("go"):
  comment          комментарий
  string           строка
  number           число
  keyword          ключевые слова языка
  constant         true false nil iota
  typename         встроенные простые типы (int, string etc.)
  built_in         встроенные функции

XML ("xml"):

  tag              любой открывающий или закрывающий тег от "<" до ">"
  comment          комментарий
  pi               инструкции обработки (<? ... ?>)
  cdata            раздел CDATA
  attribute        атрибут
  value            значение атрибута

HTML ("html"):

  keyword          тег языка HTML
  tag              любой открывающий или закрывающий тег от "<" до ">"
  comment          комментарий
  doctype          объявление <!DOCTYPE ... >
  attribute        атрибут внутри тега со значением или без
  value            значение атрибута

CSS ("css"):

  tag              тег в селекторах
  id               #some_name в селекторах
  class            .some_name в селекторах
  at_rule          @-rule до первого "{" или ";"
  attr_selector    селектор атрибутов (квадатные скобоки в a[href^=http://])
  pseudo           псевдо-классы и элементы (:after, ::after и т.д.)
  comment          комментарий
  rules            все от "{" до "}"
  property         название свойства внутри правила
  value            значение свойства внутри правила, все от ":" до ";" или
                   до конца блока правил
  number           число внутри значения
  string           строка внутри значения
  hexcolor         шестнадцатеричный цвет (#FFFFFF) внутри значения
  function         CSS-функция внутри значения
  params           все от "(" до ")" внутри функции
  important        символ "!important"

Django ("django"):

  keyword          тег HTML в HTML, встроенные шаблонные теги и фильтры в шаблонах
  tag              любой открывающий или закрывающий тег от "<" до ">"
  comment          комментарий
  doctype          объявление <!DOCTYPE ... >
  attribute        атрибут внутри тега со значением или без
  value            значение атрибута
  template_tag     шаблонный тег {% .. %}
  variable         шаблонная переменная {{ .. }}
  template_comment шаблонный комментарий, и {# .. #}, и {% comment %}
  filter           фильтр от "|" до следующего фильтра или до конца тега
  argument         аргумент фильтра

Javascript ("javascript"):

  keyword          ключевое слово языка
  comment          комментарий
  number           число
  literal          специальное слово: "true", "false" и "null"
  string           строка
  regexp           регулярное выражение
  function         заголовок функции
  title            название функции внутри заголовка
  params           все, что в скобках внутри заголовка функции

VBScript ("vbscript"):

  keyword          ключевое слово языка
  comment          комментарий
  number           число
  string           строка
  built_in         встроенная функция

Lua ("lua"):

  keyword          ключевое слово языка
  number           число
  string           строка
  comment          комментарий
  built_in         встроенный оператор
  function         заголовок функции
  title            название функции внутри заголовка
  params           все, что в скобках внутри заголовка функции
  long_brackets    многострочная строка в [=[ .. ]=]

Delphi ("delphi"):

  keyword          ключевое слово языка
  comment          комментарий (любого типа)
  number           число
  string           строка
  function         заголовок функции, процедуры, конструктора или деструктора
  title            название функции, процедуры, конструктора или деструктора
                   внутри заголовка
  params           все, что в скобках внутри заголовка функций
  class            тело класса от "= class" до "end;"

Java ("java"):

  keyword          ключевое слово языка
  number           число
  string           строка
  comment          комментарий
  annotaion        аннотация
  javadoc          javadoc-комментарии
  class            заголовок класса от "class" до "{"
  title            название класса внутри заголовка
  params           все, что в скобках внутри заголовка класса
  inheritance      слова "extends" и "implements" внутри заголовка класса

C++ ("cpp"):

  keyword          ключевое слово языка
  built_in         тип из стандартной библиотеки (включая STL)
  number           число
  string           строка и одиночный символ
  comment          комментарий
  preprocessor     директива препроцессора
  stl_container    инстанцирование STL-контейнеров ("vector<...>")

Objective C ("objectivec"):
  keyword          ключевое слово языка
  built_in         константы и названия классов Cocoa/Cocoa Touch
  number           число
  string           строка
  comment          комментарий
  preprocessor     директива препроцессора
  class            объявление/имплементация класса, протокол,

Vala ("vala"):

  keyword          ключевое слово языка
  number           число
  string           строка
  comment          комментарий
  class            заголовок класса
  title            имя класса в заголовке
  constant         константа из заглавных буква (ALL_UPPER_CASE)

C# ("cs"):

  keyword          ключевое слово языка
  number           число
  string           строка (включая @"..")
  comment          комментарий
  xmlDocTag        тег в xmldoc ("///", "<!--", "-->", "<..>")

RenderMan RSL ("rsl"):

  keyword          ключевое слово языка
  number           число
  string           строка
  comment          комментарий
  preprocessor     директива препроцессора
  shader           ключевое слово шейдеров
  shading          ключевое слово затенений
  built_in         встроенная функция

RenderMan RIB ("rib"):

  keyword          ключевое слово языка
  number           число
  string           строка
  comment          комментарий
  commands         команда

Maya Embedded Language ("mel"):

  keyword          ключевое слово языка
  number           число
  string           строка
  comment          комментарий
  variable         переменная

SQL ("sql"):

  keyword          ключевое слово (в основном из SQL'92 и SQL'99)
  number           число
  string           строка (любого типа: "..", '..', `..`)
  comment          комментарий
  aggregate        агрегатная функция

Smalltalk ("smalltalk"):

  keyword          ключевое слово
  number           число
  string           строка
  comment          комментарий
  symbol           символ
  array            массив
  class            имя класса
  char             буква
  localvars        блок локальных переменных

Lisp ("lisp"):

  keyword          ключевое слово
  number           число
  string           строка
  comment          комментарий
  variable         переменная
  literal          b, t и nil
  list             неквотированный список
  title            первый символ неквотированного списка
  body             остаток неквотированного списка
  quoted           квотированный список: и "(quote .. )", и "'(..)"

Ini ("ini"):

  title            заголовок секции
  value            значение настройки любого типа
  string           строка
  number           число
  keyword          ключевое слово булевского значения

Apache ("apache"):

  keyword          ключевое слово
  number           число
  comment          комментарий
  literal          "On" и "Off"
  sqbracket        переменная в rewrite'ах "%{..}"
  cbracket         опции в rewrite'ах "[..]"
  tag              начало и конец раздела конфига

Nginx ("nginx"):

  keyword          ключевое слово
  string           строка
  number           число
  comment          комментарий
  built_in         встроенная константа
  variable         $-переменная

Diff ("diff"):

  header           заголовок файла
  chunk            заголовок куска внутри файла
  addition         добавленные строки
  deletion         удаленные строки
  change           измененные строки

DOS ("dos"):

  keyword          ключевое слово
  flow             команда .bat-файла
  stream           специальные файлы DOS ("con", "prn", ...)
  winutils         некоторые (см. dos.js за списком)
  envvar           переменная окружения

Bash ("bash"):

  keyword          ключевое слово
  string           строка
  number           число
  comment          комментарий
  literal          специальное слово: "true" и "false"
  variable         переменная
  shebang          заголовок интерпретатора скрипта

CMake ("cmake")

  keyword          ключевое слово языка
  number           число
  string           строка
  comment          комментарий
  envvar           $-переменная

Axapta ("axapta"):

  keyword          ключевое слово языка
  number           число
  string           строка
  comment          комментарий
  class            заголовок класса от "class" до "{"
  title            название класса внутри заголовка
  params           все, что в скобках внутри заголовка класса
  inheritance      слова "extends" и "implements" внутри заголовка класса
  preprocessor     директива препроцессора

1С ("1c"):

  keyword          ключевое слово языка
  number           число
  date             дата
  string           строка
  comment          комментарий
  function         заголовок функции или процедуры
  title            название функции внутри заголовка
  params           все, что в скобках внутри заголовка функции
  preprocessor     директива препроцессора

AVR ассемблер ("avrasm"):

  keyword          ключевое слово языка
  built_in         предопределенный регистр
  number           число
  string           строка
  comment          комментарий
  label            метка
  preprocessor     директива препроцессора
  localvars        подстановка в .macro

VHDL ("vhdl")

  keyword          ключевое слово языка
  number           число
  string           строка
  comment          комментарий
  literal          логическое значение сигнала

Parser3 ("parser3"):

  keyword          ключевое слово языка
  number           число
  comment          комментарий
  variable         переменная, начинающаяся с "$"
  preprocessor     директива препроцессора
  title            пользовательское имя, начинающееся с "@"

TeX ("tex"):

  comment          комментарий
  number           число
  command          команда
  parameter        параметр
  formula          формула
  special          специальный символ

Haskell ("haskell"):

  keyword          ключевое слово языка
  built_in         встроенные классы типов и функции (Bool, Int)
  number           число
  string           строка
  comment          комментарий
  class            классы типов и другие типы данных
  title            название функции
  label            название класса типов

Erlang ("erlang"):
  comment          комментарий
  string           строка
  number           число
  keyword          ключевые слова языка
  record_name      обращение к записи (#record_name)
  title            имя объявляемой функции
  variable         переменная (с заглавной буквы или с _)
  pp.keywords      аттрибуты модуля (-attribute)
  function_name    atom или atom:atom при вызове функции


## Эвристика

Определение языка, на котором написан фрагмент, делается с помощью
довольно простой эвристики: программа пытается расцветить фрагмент всеми
языками подряд, и для каждого языка считает количество подошедших
синтаксически конструкций и ключевых слов. Для какого языка нашлось больше,
тот и выбирается.

Это означает, что в коротких фрагментах высока вероятность ошибки, что
периодически и случается. Чтобы указать язык фрагмента явно, надо написать
его название в виде класса к элементу `<code>`:

    <pre><code class="html">...</code></pre>

Можно использовать рекомендованные в HTML5 названия классов:
"language-html", "language-php". Также можно назначать классы на элемент
`<pre>`.

Чтобы запретить расцветку фрагмента вообще, используется класс "no-highlight":

    <pre><code class="no-highlight">...</code></pre>

## Координаты

Версия: 6.0 beta
URL:    http://softwaremaniacs.org/soft/highlight/
Автор:  Иван Сагалаев (Maniac@SoftwareManiacs.Org)

Лицензионное соглашение читайте в файле LICENSE.
Список соавторов читайте в файле AUTHORS.ru.txt

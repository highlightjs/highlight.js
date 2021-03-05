<span class="hljs-comment"># General operators (from R documentation `?Syntax`)</span>

:: :::
$ @
[ [[
^
- +
:
%any%
* /
+ -
&lt; &gt; &lt;= &gt;= == !=
!
&amp;  &amp;&amp;
| ||
~
-&gt; -&gt;&gt;
&lt;- &lt;&lt;-
=
?

<span class="hljs-comment"># Subset extraction</span>

x[<span class="hljs-number">3</span>]
x[[<span class="hljs-string">&quot;a&quot;</span>]]
x$y
x$`a a`
x$<span class="hljs-string">&quot;a b&quot;</span>

<span class="hljs-comment"># Operators</span>

<span class="hljs-number">2</span>-<span class="hljs-number">2</span>, <span class="hljs-number">2</span>+<span class="hljs-number">2</span>, <span class="hljs-number">2</span>~<span class="hljs-number">2</span>, <span class="hljs-number">2</span>*<span class="hljs-number">2</span>, <span class="hljs-number">2</span>/<span class="hljs-number">2</span>, <span class="hljs-number">2</span>^<span class="hljs-number">2</span>, <span class="hljs-number">2</span>&lt;<span class="hljs-number">2</span>, <span class="hljs-number">2</span>&gt;<span class="hljs-number">2</span>, <span class="hljs-number">2</span>==<span class="hljs-number">2</span>, <span class="hljs-number">2</span>&gt;=<span class="hljs-number">2</span>, <span class="hljs-number">2</span>&lt;=<span class="hljs-number">2</span>, <span class="hljs-number">2</span>!=<span class="hljs-number">2</span>, a&lt;-<span class="hljs-number">2</span>, a=<span class="hljs-number">2</span>, a&lt;&lt;-<span class="hljs-number">2</span>, a:=<span class="hljs-number">2</span>, <span class="hljs-number">2</span>-&gt;a, <span class="hljs-number">2</span>-&gt;&gt;a, <span class="hljs-number">1</span>:<span class="hljs-number">2</span>
~a+b
!<span class="hljs-literal">TRUE</span>
?help, ?`?`, methods?show, ??topic
<span class="hljs-literal">TRUE</span>&amp;<span class="hljs-literal">FALSE</span>, <span class="hljs-built_in">T</span>|<span class="hljs-built_in">F</span>
<span class="hljs-literal">TRUE</span>&amp;&amp;<span class="hljs-literal">FALSE</span>, <span class="hljs-built_in">T</span>||<span class="hljs-built_in">F</span>
base::<span class="hljs-built_in">sum</span>, base:::<span class="hljs-built_in">sum</span>

<span class="hljs-comment"># Custom operators</span>

<span class="hljs-number">2</span>%*%<span class="hljs-number">3</span>
a%&lt;&gt;%b
<span class="hljs-number">2</span>%in%y
a %`tick`% b
a %&#x27;quot&#x27;% b
a %&quot;quot&quot;% b
a %for% b
a %\% b
a %`% b

`% %` = paste
<span class="hljs-string">&quot;foo&quot;</span>`% %`<span class="hljs-string">&quot;bar&quot;</span>

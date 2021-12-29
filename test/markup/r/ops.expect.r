<span class="hljs-comment"># General operators (from R documentation `?Syntax`)</span>

<span class="hljs-operator">::</span> <span class="hljs-operator">:::</span>
<span class="hljs-operator">$</span> <span class="hljs-operator">@</span>
<span class="hljs-punctuation">[</span> <span class="hljs-punctuation">[[</span>
<span class="hljs-operator">^</span>
<span class="hljs-operator">-</span> <span class="hljs-operator">+</span>
<span class="hljs-operator">:</span>
<span class="hljs-operator">%any%</span>
<span class="hljs-operator">*</span> <span class="hljs-operator">/</span>
<span class="hljs-operator">+</span> <span class="hljs-operator">-</span>
<span class="hljs-operator">&lt;</span> <span class="hljs-operator">&gt;</span> <span class="hljs-operator">&lt;=</span> <span class="hljs-operator">&gt;=</span> <span class="hljs-operator">==</span> <span class="hljs-operator">!=</span>
<span class="hljs-operator">!</span>
<span class="hljs-operator">&amp;</span>  <span class="hljs-operator">&amp;&amp;</span>
<span class="hljs-operator">|</span> <span class="hljs-operator">||</span>
<span class="hljs-operator">~</span>
<span class="hljs-operator">-&gt;</span> <span class="hljs-operator">-&gt;&gt;</span>
<span class="hljs-operator">&lt;-</span> <span class="hljs-operator">&lt;&lt;-</span>
<span class="hljs-operator">=</span>
<span class="hljs-operator">?</span>

<span class="hljs-comment"># Subset extraction</span>

x<span class="hljs-punctuation">[</span><span class="hljs-number">3</span><span class="hljs-punctuation">]</span>
x<span class="hljs-punctuation">[[</span><span class="hljs-string">&quot;a&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">]</span>
x<span class="hljs-operator">$</span>y
x<span class="hljs-operator">$</span>`a a`
x<span class="hljs-operator">$</span><span class="hljs-string">&quot;a b&quot;</span>

<span class="hljs-comment"># Operators</span>

<span class="hljs-number">2</span><span class="hljs-operator">-</span><span class="hljs-number">2</span><span class="hljs-punctuation">,</span> <span class="hljs-number">2</span><span class="hljs-operator">+</span><span class="hljs-number">2</span><span class="hljs-punctuation">,</span> <span class="hljs-number">2</span><span class="hljs-operator">~</span><span class="hljs-number">2</span><span class="hljs-punctuation">,</span> <span class="hljs-number">2</span><span class="hljs-operator">*</span><span class="hljs-number">2</span><span class="hljs-punctuation">,</span> <span class="hljs-number">2</span><span class="hljs-operator">/</span><span class="hljs-number">2</span><span class="hljs-punctuation">,</span> <span class="hljs-number">2</span><span class="hljs-operator">^</span><span class="hljs-number">2</span><span class="hljs-punctuation">,</span> <span class="hljs-number">2</span><span class="hljs-operator">&lt;</span><span class="hljs-number">2</span><span class="hljs-punctuation">,</span> <span class="hljs-number">2</span><span class="hljs-operator">&gt;</span><span class="hljs-number">2</span><span class="hljs-punctuation">,</span> <span class="hljs-number">2</span><span class="hljs-operator">==</span><span class="hljs-number">2</span><span class="hljs-punctuation">,</span> <span class="hljs-number">2</span><span class="hljs-operator">&gt;=</span><span class="hljs-number">2</span><span class="hljs-punctuation">,</span> <span class="hljs-number">2</span><span class="hljs-operator">&lt;=</span><span class="hljs-number">2</span><span class="hljs-punctuation">,</span> <span class="hljs-number">2</span><span class="hljs-operator">!=</span><span class="hljs-number">2</span><span class="hljs-punctuation">,</span> a<span class="hljs-operator">&lt;-</span><span class="hljs-number">2</span><span class="hljs-punctuation">,</span> a<span class="hljs-operator">=</span><span class="hljs-number">2</span><span class="hljs-punctuation">,</span> a<span class="hljs-operator">&lt;&lt;-</span><span class="hljs-number">2</span><span class="hljs-punctuation">,</span> a<span class="hljs-operator">:=</span><span class="hljs-number">2</span><span class="hljs-punctuation">,</span> <span class="hljs-number">2</span><span class="hljs-operator">-&gt;</span>a<span class="hljs-punctuation">,</span> <span class="hljs-number">2</span><span class="hljs-operator">-&gt;&gt;</span>a<span class="hljs-punctuation">,</span> <span class="hljs-number">1</span><span class="hljs-operator">:</span><span class="hljs-number">2</span>
a <span class="hljs-operator">&lt;-</span> <span class="hljs-number">10</span>
<span class="hljs-operator">~</span>a<span class="hljs-operator">+</span>b
<span class="hljs-operator">!</span><span class="hljs-literal">TRUE</span>
<span class="hljs-operator">?</span>help<span class="hljs-punctuation">,</span> <span class="hljs-operator">?</span>`?`<span class="hljs-punctuation">,</span> methods<span class="hljs-operator">?</span>show<span class="hljs-punctuation">,</span> <span class="hljs-operator">?</span><span class="hljs-operator">?</span>topic
<span class="hljs-literal">TRUE</span><span class="hljs-operator">&amp;</span><span class="hljs-literal">FALSE</span><span class="hljs-punctuation">,</span> <span class="hljs-built_in">T</span><span class="hljs-operator">|</span><span class="hljs-built_in">F</span>
<span class="hljs-literal">TRUE</span><span class="hljs-operator">&amp;&amp;</span><span class="hljs-literal">FALSE</span><span class="hljs-punctuation">,</span> <span class="hljs-built_in">T</span><span class="hljs-operator">||</span><span class="hljs-built_in">F</span>
base<span class="hljs-operator">::</span><span class="hljs-built_in">sum</span><span class="hljs-punctuation">,</span> base<span class="hljs-operator">:::</span><span class="hljs-built_in">sum</span>

<span class="hljs-comment"># Custom operators</span>

<span class="hljs-number">2</span><span class="hljs-operator">%*%</span><span class="hljs-number">3</span>
a<span class="hljs-operator">%&lt;&gt;%</span>b
<span class="hljs-number">2</span><span class="hljs-operator">%in%</span>y
a <span class="hljs-operator">%`tick`%</span> b
a <span class="hljs-operator">%&#x27;quot&#x27;%</span> b
a <span class="hljs-operator">%&quot;quot&quot;%</span> b
a <span class="hljs-operator">%for%</span> b
a <span class="hljs-operator">%\%</span> b
a <span class="hljs-operator">%`%</span> b

<span class="hljs-comment"># R 4.1 lambda</span>

f <span class="hljs-operator">=</span> <span class="hljs-punctuation">\</span><span class="hljs-punctuation">(</span>x<span class="hljs-punctuation">)</span> x <span class="hljs-operator">*</span> <span class="hljs-number">2</span>

<span class="hljs-comment"># R 4.1 pipe</span>

<span class="hljs-number">1</span> <span class="hljs-operator">:</span> <span class="hljs-number">10</span> <span class="hljs-operator">|&gt;</span> f<span class="hljs-punctuation">(</span><span class="hljs-punctuation">)</span>
<span class="hljs-number">10</span> <span class="hljs-operator">|&gt;</span> x <span class="hljs-operator">=</span><span class="hljs-operator">&gt;</span> rnorm<span class="hljs-punctuation">(</span><span class="hljs-number">1</span><span class="hljs-punctuation">,</span> mean <span class="hljs-operator">=</span> x<span class="hljs-punctuation">)</span>

`% %` <span class="hljs-operator">=</span> paste
<span class="hljs-string">&quot;foo&quot;</span>`% %`<span class="hljs-string">&quot;bar&quot;</span>
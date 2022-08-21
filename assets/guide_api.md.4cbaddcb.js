import{_ as s,o as a,c as n,d as l}from"./app.77fdb89c.js";const C=JSON.parse('{"title":"\u5E38\u7528 API","description":"","frontmatter":{},"headers":[{"level":2,"title":"\u63A5\u53E3\u8BF7\u6C42","slug":"\u63A5\u53E3\u8BF7\u6C42"},{"level":2,"title":"\u9274\u6743","slug":"\u9274\u6743"},{"level":2,"title":"\u4E3B\u5BFC\u822A","slug":"\u4E3B\u5BFC\u822A"},{"level":2,"title":"\u4E3B\u9875\u9762","slug":"\u4E3B\u9875\u9762"},{"level":3,"title":"\u5237\u65B0","slug":"\u5237\u65B0"},{"level":3,"title":"\u6700\u5927\u5316","slug":"\u6700\u5927\u5316"},{"level":2,"title":"\u6807\u7B7E\u680F","slug":"\u6807\u7B7E\u680F"},{"level":3,"title":"\u83B7\u53D6\u5F53\u524D\u6807\u7B7E\u9875 tabId","slug":"\u83B7\u53D6\u5F53\u524D\u6807\u7B7E\u9875-tabid"},{"level":3,"title":"\u5173\u95ED\u6307\u5B9A\u6807\u7B7E\u9875","slug":"\u5173\u95ED\u6307\u5B9A\u6807\u7B7E\u9875"},{"level":3,"title":"\u5173\u95ED\u5F53\u524D\u6807\u7B7E\u9875","slug":"\u5173\u95ED\u5F53\u524D\u6807\u7B7E\u9875"},{"level":2,"title":"\u4E8B\u4EF6\u603B\u7EBF","slug":"\u4E8B\u4EF6\u603B\u7EBF"},{"level":2,"title":"\u65E5\u671F","slug":"\u65E5\u671F"}],"relativePath":"guide/api.md"}'),p={name:"guide/api.md"},o=l(`<h1 id="\u5E38\u7528-api" tabindex="-1">\u5E38\u7528 API <a class="header-anchor" href="#\u5E38\u7528-api" aria-hidden="true">#</a></h1><h2 id="\u63A5\u53E3\u8BF7\u6C42" tabindex="-1">\u63A5\u53E3\u8BF7\u6C42 <a class="header-anchor" href="#\u63A5\u53E3\u8BF7\u6C42" aria-hidden="true">#</a></h2><p>\u8BE6\u7EC6\u53EF\u9605\u8BFB\u300A<a href="./axios.html#\u63A5\u53E3\u8BF7\u6C42">\u4E0E\u670D\u52A1\u7AEF\u4EA4\u4E92 - \u63A5\u53E3\u8BF7\u6C42</a>\u300B\u3002</p><div class="language-js"><span class="copy"></span><pre><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> api </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">@/api</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">api</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">get</span><span style="color:#A6ACCD;">()</span></span>
<span class="line"><span style="color:#A6ACCD;">api</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">post</span><span style="color:#A6ACCD;">()</span></span>
<span class="line"></span></code></pre></div><h2 id="\u9274\u6743" tabindex="-1">\u9274\u6743 <a class="header-anchor" href="#\u9274\u6743" aria-hidden="true">#</a></h2><p>\u8BE6\u7EC6\u53EF\u9605\u8BFB\u300A<a href="./permission.html#\u9274\u6743\u51FD\u6570">\u6743\u9650 - \u9274\u6743\u51FD\u6570</a>\u300B\u3002</p><div class="language-js"><span class="copy"></span><pre><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">useAuth</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">@/utils/composables</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> auth</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> authAll </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">useAuth</span><span style="color:#A6ACCD;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#82AAFF;">auth</span><span style="color:#A6ACCD;">()</span></span>
<span class="line"><span style="color:#82AAFF;">authAll</span><span style="color:#A6ACCD;">()</span></span>
<span class="line"></span></code></pre></div><h2 id="\u4E3B\u5BFC\u822A" tabindex="-1">\u4E3B\u5BFC\u822A <a class="header-anchor" href="#\u4E3B\u5BFC\u822A" aria-hidden="true">#</a></h2><div class="language-js"><span class="copy"></span><pre><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">useMainPage</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">@/utils/composables</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#82AAFF;">useMainPage</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">reload</span><span style="color:#A6ACCD;">()</span></span>
<span class="line"></span></code></pre></div><h2 id="\u4E3B\u9875\u9762" tabindex="-1">\u4E3B\u9875\u9762 <a class="header-anchor" href="#\u4E3B\u9875\u9762" aria-hidden="true">#</a></h2><h3 id="\u5237\u65B0" tabindex="-1">\u5237\u65B0 <a class="header-anchor" href="#\u5237\u65B0" aria-hidden="true">#</a></h3><div class="language-js"><span class="copy"></span><pre><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">useMainPage</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">@/utils/composables</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#82AAFF;">useMainPage</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">reload</span><span style="color:#A6ACCD;">()</span></span>
<span class="line"></span></code></pre></div><h3 id="\u6700\u5927\u5316" tabindex="-1">\u6700\u5927\u5316 <sup class="pro-badge"></sup> <a class="header-anchor" href="#\u6700\u5927\u5316" aria-hidden="true">#</a></h3><div class="language-js"><span class="copy"></span><pre><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">useMainPage</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">@/utils/composables</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// status: true / false</span></span>
<span class="line"><span style="color:#82AAFF;">useMainPage</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">maximize</span><span style="color:#A6ACCD;">(status)</span></span>
<span class="line"></span></code></pre></div><h2 id="\u6807\u7B7E\u680F" tabindex="-1">\u6807\u7B7E\u680F <sup class="pro-badge"></sup> <a class="header-anchor" href="#\u6807\u7B7E\u680F" aria-hidden="true">#</a></h2><h3 id="\u83B7\u53D6\u5F53\u524D\u6807\u7B7E\u9875-tabid" tabindex="-1">\u83B7\u53D6\u5F53\u524D\u6807\u7B7E\u9875 tabId <a class="header-anchor" href="#\u83B7\u53D6\u5F53\u524D\u6807\u7B7E\u9875-tabid" aria-hidden="true">#</a></h3><div class="language-js"><span class="copy"></span><pre><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">useTabbar</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">@/utils/composables</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> getId </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">useTabbar</span><span style="color:#A6ACCD;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#82AAFF;">getId</span><span style="color:#A6ACCD;">()</span></span>
<span class="line"></span></code></pre></div><h3 id="\u5173\u95ED\u6307\u5B9A\u6807\u7B7E\u9875" tabindex="-1">\u5173\u95ED\u6307\u5B9A\u6807\u7B7E\u9875 <a class="header-anchor" href="#\u5173\u95ED\u6307\u5B9A\u6807\u7B7E\u9875" aria-hidden="true">#</a></h3><p>\u8BE5\u65B9\u6CD5\u63A5\u6536\u4E00\u4E2A <code>tabId</code> \u53C2\u6570\u3002</p><div class="language-js"><span class="copy"></span><pre><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">useTabbar</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">@/utils/composables</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> closeById </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">useTabbar</span><span style="color:#A6ACCD;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#82AAFF;">closeById</span><span style="color:#A6ACCD;">(tabId)</span></span>
<span class="line"></span></code></pre></div><h3 id="\u5173\u95ED\u5F53\u524D\u6807\u7B7E\u9875" tabindex="-1">\u5173\u95ED\u5F53\u524D\u6807\u7B7E\u9875 <a class="header-anchor" href="#\u5173\u95ED\u5F53\u524D\u6807\u7B7E\u9875" aria-hidden="true">#</a></h3><p>\u8BE5\u65B9\u6CD5\u63A5\u6536\u4E00\u4E2A <code>to</code> \u53C2\u6570\uFF0C\u8BE5\u53C2\u6570\u4E0E <code>router.push(to)</code> \u4E00\u81F4\uFF0C\u8868\u793A\u5173\u95ED\u5F53\u524D\u6807\u7B7E\u9875\u5E76\u8DF3\u8F6C\u5230\u6307\u5B9A\u8DEF\u7531\uFF0C\u70B9\u51FB\u9605\u8BFB<a href="https://next.router.vuejs.org/zh/api/#routelocationraw" target="_blank" rel="noopener noreferrer">\u53C2\u6570\u8BF4\u660E</a>\u3002</p><div class="language-js"><span class="copy"></span><pre><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">useTabbar</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">@/utils/composables</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> close </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">useTabbar</span><span style="color:#A6ACCD;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#82AAFF;">close</span><span style="color:#A6ACCD;">(to)</span></span>
<span class="line"></span></code></pre></div><h2 id="\u4E8B\u4EF6\u603B\u7EBF" tabindex="-1">\u4E8B\u4EF6\u603B\u7EBF <a class="header-anchor" href="#\u4E8B\u4EF6\u603B\u7EBF" aria-hidden="true">#</a></h2><p>\u57FA\u4E8E <a href="https://github.com/developit/mitt" target="_blank" rel="noopener noreferrer">mitt</a> \u7B80\u5355\u5C01\u88C5\uFF0C\u4F7F\u7528\u65B9\u6CD5\u8BF7\u67E5\u9605\u5B98\u65B9\u6587\u6863\u3002</p><div class="language-js"><span class="copy"></span><pre><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> eventBus </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">@/utils/eventBus</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">eventBus</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">on</span><span style="color:#A6ACCD;">()</span></span>
<span class="line"><span style="color:#A6ACCD;">eventBus</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">emit</span><span style="color:#A6ACCD;">()</span></span>
<span class="line"><span style="color:#A6ACCD;">eventBus</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">off</span><span style="color:#A6ACCD;">()</span></span>
<span class="line"></span></code></pre></div><h2 id="\u65E5\u671F" tabindex="-1">\u65E5\u671F <sup class="pro-badge"></sup> <a class="header-anchor" href="#\u65E5\u671F" aria-hidden="true">#</a></h2><p>\u57FA\u4E8E <a href="https://day.js.org/zh-CN/" target="_blank" rel="noopener noreferrer">dayjs</a> \u7B80\u5355\u5C01\u88C5\uFF0C\u4F7F\u7528\u65B9\u6CD5\u8BF7\u67E5\u9605\u5B98\u65B9\u6587\u6863\u3002</p><div class="language-js"><span class="copy"></span><pre><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> dayjs </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">@/utils/dayjs</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#82AAFF;">dayjs</span><span style="color:#A6ACCD;">()</span></span>
<span class="line"></span></code></pre></div>`,29),e=[o];function t(c,r,i,y,D,A){return a(),n("div",null,e)}var d=s(p,[["render",t]]);export{C as __pageData,d as default};

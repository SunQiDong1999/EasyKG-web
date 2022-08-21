import{_ as s,o as n,c as a,d as o}from"./app.77fdb89c.js";const F=JSON.parse('{"title":"\u4F7F\u7528 Composition API \u5F00\u53D1","description":"","frontmatter":{},"headers":[],"relativePath":"guide/vue3-composition-api.md"}'),p={name:"guide/vue3-composition-api.md"},l=o(`<h1 id="\u4F7F\u7528-composition-api-\u5F00\u53D1" tabindex="-1">\u4F7F\u7528 Composition API \u5F00\u53D1 <a class="header-anchor" href="#\u4F7F\u7528-composition-api-\u5F00\u53D1" aria-hidden="true">#</a></h1><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>Composition API \u662F Vue3 \u5168\u65B0\u63D0\u4F9B\u7684\u4E00\u79CD\u8BED\u6CD5\uFF0C\u5BF9\u4E8E\u4ECE Vue2 \u5C31\u5728\u4F7F\u7528\u7684\u5F00\u53D1\u8005\uFF0C\u5982\u679C\u4E00\u65F6\u534A\u4F1A\u6CA1\u529E\u6CD5\u7ACB\u9A6C\u4E0A\u624B Composition API \uFF0C\u4F60\u4F9D\u65E7\u53EF\u4EE5\u5728\u9879\u76EE\u4E2D\u4F7F\u7528 Options API \u505A\u5F00\u53D1\u3002\u5F53\u7136\u6211\u4EEC\u66F4\u5EFA\u8BAE\u4F60\u4F7F\u7528 Composition API \u8FDB\u884C\u5F00\u53D1\uFF0C\u5B83\u6BD4 Options API \u66F4\u7075\u6D3B\u4E14\u6613\u8BFB\u3002</p></div><p>\u5982\u679C\u4F60\u8FD8\u4E0D\u719F\u6089 Composition API \uFF0C\u90A3\u4E48\u6211\u4EEC\u5EFA\u8BAE\u4F60\u9605\u8BFB Vue3 <a href="https://v3.cn.vuejs.org/guide/composition-api-introduction.html" target="_blank" rel="noopener noreferrer">\u5B98\u65B9\u6587\u6863</a>\u4E86\u89E3\uFF1B\u5982\u679C\u4F60\u5DF2\u7ECF\u719F\u6089 Composition API \uFF0C\u90A3\u4E48\u6211\u4EEC\u5EFA\u8BAE\u4F60\u5728\u5F00\u53D1\u7684\u65F6\u5019\uFF0C\u4F7F\u7528 <a href="https://v3.cn.vuejs.org/api/sfc-script-setup.html" target="_blank" rel="noopener noreferrer"><code>&lt;script setup&gt;</code></a> \u8BED\u6CD5\u7CD6\u8FDB\u884C\u5F00\u53D1\uFF0C\u5B83\u5C06\u63D0\u9AD8\u5F88\u591A\u5F00\u53D1\u4E0A\u7684\u6548\u7387\u3002</p><p>\u540C\u65F6\u5F97\u76CA\u4E8E <a href="https://github.com/antfu/unplugin-auto-import" target="_blank" rel="noopener noreferrer">unplugin-auto-import</a> \u7684\u7279\u6027\uFF0C\u5728 <code>&lt;script setup&gt;</code> \u91CC\u65E0\u9700\u5BFC\u5165\u76F8\u5173 API \uFF0C\u8BE5\u4F9D\u8D56\u4F1A\u81EA\u52A8\u5BFC\u5165\uFF08\u9ED8\u8BA4\u652F\u6301 vue\uFF0Cvue-router \u548C pinia \uFF09\u3002</p><div class="language-vue"><span class="copy"></span><div class="highlight-lines"><br><br><div class="highlighted">\xA0</div><div class="highlighted">\xA0</div><br><br><br><br><br><br><br><br><br><br></div><pre><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">script</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">setup</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// \u539F\u5148\u9700\u8981\u624B\u52A8 import \u76F8\u5173 API</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">ref</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">computed</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">vue</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">useRoute</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">useRouter</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">vue-router</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> count </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">ref</span><span style="color:#A6ACCD;">(</span><span style="color:#F78C6C;">0</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> doubled </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">computed</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> count</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">value </span><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">2</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> route </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">useRoute</span><span style="color:#A6ACCD;">()</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> router </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">useRouter</span><span style="color:#A6ACCD;">()</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(route</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">path)</span></span>
<span class="line"><span style="color:#A6ACCD;">router</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">push</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">/dashboard</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span></code></pre></div><div class="language-vue"><span class="copy"></span><pre><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">script</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">setup</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// \u73B0\u5728\u76F4\u63A5\u4F7F\u7528\u5373\u53EF</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> count </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">ref</span><span style="color:#A6ACCD;">(</span><span style="color:#F78C6C;">0</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> doubled </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">computed</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> count</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">value </span><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">2</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> route </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">useRoute</span><span style="color:#A6ACCD;">()</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> router </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">useRouter</span><span style="color:#A6ACCD;">()</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(route</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">path)</span></span>
<span class="line"><span style="color:#A6ACCD;">router</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">push</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">/dashboard</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span></code></pre></div>`,6),e=[l];function t(c,r,A,y,D,C){return n(),a("div",null,e)}var u=s(p,[["render",t]]);export{F as __pageData,u as default};

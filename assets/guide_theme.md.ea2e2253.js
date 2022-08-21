import{_ as s,o as a,c as n,d as l}from"./app.77fdb89c.js";const F=JSON.parse('{"title":"\u4E3B\u9898","description":"","frontmatter":{},"headers":[{"level":2,"title":"\u6846\u67B6\u4E3B\u9898","slug":"\u6846\u67B6\u4E3B\u9898"},{"level":3,"title":"\u57FA\u7840\u7248","slug":"\u57FA\u7840\u7248"},{"level":3,"title":"\u4E13\u4E1A\u7248","slug":"\u4E13\u4E1A\u7248"},{"level":2,"title":"Element Plus \u4E3B\u9898","slug":"element-plus-\u4E3B\u9898"},{"level":2,"title":"\u5F00\u53D1\u6CE8\u610F","slug":"\u5F00\u53D1\u6CE8\u610F"}],"relativePath":"guide/theme.md"}'),p={name:"guide/theme.md"},e=l(`<h1 id="\u4E3B\u9898" tabindex="-1">\u4E3B\u9898 <a class="header-anchor" href="#\u4E3B\u9898" aria-hidden="true">#</a></h1><h2 id="\u6846\u67B6\u4E3B\u9898" tabindex="-1">\u6846\u67B6\u4E3B\u9898 <a class="header-anchor" href="#\u6846\u67B6\u4E3B\u9898" aria-hidden="true">#</a></h2><h3 id="\u57FA\u7840\u7248" tabindex="-1">\u57FA\u7840\u7248 <a class="header-anchor" href="#\u57FA\u7840\u7248" aria-hidden="true">#</a></h3><p>\u57FA\u7840\u7248\u4E3B\u9898\u6837\u5F0F\u5B58\u653E\u5728 <code>/src/assets/styles/themes.scss</code> \u6587\u4EF6\u4E2D\uFF0C\u5747\u4E3A css \u53D8\u91CF\uFF0C\u4FEE\u6539\u540E\u5373\u53EF\u5728\u9875\u9762\u4E0A\u67E5\u770B\u6548\u679C\uFF0C\u6CE8\u610F\u660E\u4EAE\u548C\u6697\u9ED1\u6A21\u5F0F\u7684\u533A\u5206\u3002</p><h3 id="\u4E13\u4E1A\u7248" tabindex="-1">\u4E13\u4E1A\u7248 <a class="header-anchor" href="#\u4E13\u4E1A\u7248" aria-hidden="true">#</a></h3><p>\u4E0E\u57FA\u7840\u7248\u4E0D\u540C\uFF0C\u4E13\u4E1A\u7248\u9ED8\u8BA4\u63D0\u4F9B\u4E86 6 \u6B3E\u4E3B\u9898\uFF0C\u5E76\u4E14\u4E3B\u9898\u53EF\u5728\u8FD0\u884C\u65F6\u5171\u5B58\uFF0C\u53EF\u52A8\u6001\u5207\u6362\u3002</p><div class="language-js"><span class="copy"></span><pre><code><span class="line"><span style="color:#FFCB6B;">app</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#676E95;font-style:italic;">/**</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">     * \u4E3B\u9898</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">     * default \u9ED8\u8BA4</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">     * sys_green \u7EFF\u8272</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">     * sys_orange \u6A59\u8272</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">     * sys_pink \u7C89\u8272</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">     * sys_grey \u7070\u8272</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">     * sys_yellow \u9EC4\u8272</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">     */</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#FFCB6B;">theme</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">default</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><p>\u5982\u679C\u6846\u67B6\u63D0\u4F9B\u7684\u4E3B\u9898\u98CE\u683C\u6EE1\u8DB3\u4E0D\u4E86\u4F60\u7684\u9700\u6C42\uFF0C\u4F60\u8FD8\u53EF\u4EE5\u81EA\u5B9A\u4E49\u65B0\u7684\u4E3B\u9898\u3002\u9996\u5148\u5148\u6253\u5F00\u9ED8\u8BA4\u4E3B\u9898\u4E86\u89E3\u4E0B\u4EE3\u7801\u7ED3\u6784 <code>/src/assets/styles/themes/default.scss</code> \uFF0C\u4E3B\u9898\u7684\u6837\u5F0F\u90FD\u5B58\u653E\u5728 <code>$theme-default</code> \u8FD9\u4E2A\u53D8\u91CF\u91CC\uFF0C\u6CE8\u610F\u660E\u4EAE\u6A21\u5F0F\u548C\u6697\u9ED1\u6A21\u5F0F\u7684\u533A\u5206\uFF0C\u4E24\u8005\u91CC\u9762\u5C5E\u6027\u540D\u662F\u5B8C\u5168\u4E00\u81F4\u7684\u3002</p><div class="language-scss"><span class="copy"></span><pre><code><span class="line"><span style="color:#A6ACCD;">$theme-default</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#676E95;font-style:italic;">// \u660E\u4EAE\u6A21\u5F0F</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;&quot;</span><span style="color:#A6ACCD;">: </span><span style="color:#89DDFF;">(</span></span>
<span class="line"><span style="color:#A6ACCD;">        ...</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">),</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#676E95;font-style:italic;">// \u6697\u9ED1\u6A21\u5F0F</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">dark</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">: </span><span style="color:#89DDFF;">(</span></span>
<span class="line"><span style="color:#A6ACCD;">        ...</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#89DDFF;">)</span></span>
<span class="line"></span></code></pre></div><p>\u6240\u4EE5\u5982\u679C\u8981\u521B\u5EFA\u4E00\u4E2A\u65B0\u4E3B\u9898\uFF0C\u53EF\u4EE5\u5C06 <code>default.scss</code> \u6587\u4EF6\u590D\u5236\u4E00\u4EFD\u3002\u4F8B\u5982\u8981\u589E\u52A0\u4E00\u4E2A\u7EA2\u8272\u4E3B\u9898\uFF0C\u5219\u590D\u5236 <code>default.scss</code> \u5E76\u5C06\u6587\u4EF6\u540D\u4FEE\u6539\u4E3A <code>red.scss</code> \uFF0C\u7136\u540E\u5C06\u6587\u4EF6\u91CC\u7684 <code>$theme-default</code> \u53D8\u91CF\u540D\u4E5F\u4FEE\u6539\u4E3A <code>$theme-red</code> \uFF0C\u6700\u540E\u6253\u5F00 <code>/src/assets/styles/resources/themes.scss</code> \u6587\u4EF6\uFF0C\u7136\u540E\u589E\u52A0\u4EE5\u4E0B\u4EE3\u7801\u5373\u53EF\u3002</p><div class="language-scss"><span class="copy"></span><div class="highlight-lines"><br><br><br><br><br><br><div class="highlighted">\xA0</div><br><br><br><br><br><br><br><br><div class="highlighted">\xA0</div><br><br></div><pre><code><span class="line"><span style="color:#89DDFF;font-style:italic;">@use</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">../themes/default.scss</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">as</span><span style="color:#A6ACCD;"> *</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">@use</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">../themes/green.scss</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">as</span><span style="color:#A6ACCD;"> *</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">@use</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">../themes/orange.scss</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">as</span><span style="color:#A6ACCD;"> *</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">@use</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">../themes/pink.scss</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">as</span><span style="color:#A6ACCD;"> *</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">@use</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">../themes/grey.scss</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">as</span><span style="color:#A6ACCD;"> *</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">@use</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">../themes/yellow.scss</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">as</span><span style="color:#A6ACCD;"> *</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">@use</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">../themes/red.scss</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">as</span><span style="color:#A6ACCD;"> *</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">$themes</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#FFCB6B;">default</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> $theme-default</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#FFCB6B;">sys_green</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> $theme-green</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#FFCB6B;">sys_orange</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> $theme-orange</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#FFCB6B;">sys_pink</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> $theme-pink</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#FFCB6B;">sys_grey</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> $theme-grey</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#FFCB6B;">sys_yellow</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> $theme-yellow</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#FFCB6B;">red</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> $theme-red</span></span>
<span class="line"><span style="color:#89DDFF;">);</span></span>
<span class="line"></span></code></pre></div><p>\u6700\u540E\u5728\u5E94\u7528\u914D\u7F6E\u91CC\u4FEE\u6539\u4E3B\u9898\u4E3A <code>red</code> \u5C31\u53EF\u4EE5\u8C03\u7528\u8FD9\u4E2A\u6211\u4EEC\u521B\u5EFA\u7684\u4E3B\u9898\u4E86\u3002</p><div class="language-js"><span class="copy"></span><pre><code><span class="line"><span style="color:#FFCB6B;">app</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#FFCB6B;">theme</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">red</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><h2 id="element-plus-\u4E3B\u9898" tabindex="-1">Element Plus \u4E3B\u9898 <a class="header-anchor" href="#element-plus-\u4E3B\u9898" aria-hidden="true">#</a></h2><blockquote><p>\u8BE6\u7EC6\u53EF\u9605\u8BFB Element Plus \u5B98\u65B9\u6587\u6863\u300A<a href="https://element-plus.gitee.io/zh-CN/guide/theming.html" target="_blank" rel="noopener noreferrer">\u81EA\u5B9A\u4E49\u4E3B\u9898</a>\u300B\u3002</p></blockquote><p>\u4F60\u53EF\u4EE5\u5728 <code>/src/assets/style/element-plus/index.scss</code> \u548C <code>/src/assets/style/element-plus/dark.scss</code> \u6587\u4EF6\u4E2D\u5206\u522B\u4FEE\u6539 Element Plus \u7684\u660E\u4EAE\u548C\u6697\u9ED1\u6A21\u5F0F\u4E0B\u7684\u9884\u8BBE\u6837\u5F0F\u3002</p><p>\u4F60\u53EF\u4EE5\u5230 Element Plus \u7684 <a href="https://github.com/element-plus/element-plus/blob/dev/packages/theme-chalk/src/common/var.scss" target="_blank" rel="noopener noreferrer"><code>packages/theme-chalk/src/common/var.scss</code></a> \u548C <a href="https://github.com/element-plus/element-plus/blob/dev/packages/theme-chalk/src/dark/var.scss" target="_blank" rel="noopener noreferrer"><code>packages/theme-chalk/src/dark/var.scss</code></a> \u4E2D\u67E5\u627E\u66F4\u591A\u660E\u4EAE\u548C\u6697\u9ED1\u6A21\u5F0F\u4E0B\u7684 scss \u53D8\u91CF\u3002</p><h2 id="\u5F00\u53D1\u6CE8\u610F" tabindex="-1">\u5F00\u53D1\u6CE8\u610F <a class="header-anchor" href="#\u5F00\u53D1\u6CE8\u610F" aria-hidden="true">#</a></h2><p>\u5982\u679C\u53EA\u5728\u660E\u4EAE\u6216\u6697\u9ED1\u6A21\u5F0F\u4E2D\uFF0C\u9009\u62E9\u5176\u4E2D\u4E00\u79CD\u6A21\u5F0F\u8FDB\u884C\u4E1A\u52A1\u5F00\u53D1\uFF0C\u90A3\u6CA1\u6709\u4EC0\u4E48\u9700\u8981\u6CE8\u610F\u7684\uFF0C\u4F60\u53EF\u4EE5\u6309\u7167\u4EE5\u5F80\u7684\u5F00\u53D1\u4E60\u60EF\u8FDB\u884C\u5F00\u53D1\uFF0C\u8FD9\u4E5F\u662F\u6846\u67B6\u63A8\u8350\u7684\u65B9\u5F0F\u3002</p><p>\u4F46\u5982\u679C\u9700\u8981\u8BA9\u7528\u6237\u53EF\u4EE5\u81EA\u5DF1\u9009\u62E9\u660E\u4EAE\u6216\u6697\u9ED1\u6A21\u5F0F\uFF0C\u6216\u8005\u662F\u6839\u636E\u6D4F\u89C8\u5668\u4E3B\u9898\u6765\u5224\u65AD\u662F\u4F7F\u7528\u660E\u4EAE\u8FD8\u662F\u6697\u9ED1\u6A21\u5F0F\u3002\u8FD9\u65F6\u5019\u5F00\u53D1\u5219\u9700\u8981\u6CE8\u610F\uFF0C\u4E1A\u52A1\u9875\u9762\u91CC\u4F7F\u7528\u5230\u7684\u989C\u8272\u5C06\u4E0D\u80FD\u5199\u6210\u56FA\u5B9A\u503C\uFF08\u4F8B\u5982 color \u3001background-color \u3001border-color \u3001box-shadow \u7B49\u6709\u6D89\u53CA\u5230\u989C\u8272\u7684\u5C5E\u6027\uFF09\uFF0C\u56E0\u4E3A\u540C\u4E00\u4E2A\u8272\u503C\u662F\u65E0\u6CD5\u987E\u53CA\u5230\u660E\u4EAE\u548C\u6697\u9ED1\u4E24\u79CD\u6A21\u5F0F\u7684\u3002</p><p>\u8FD9\u65F6\u5019\u5EFA\u8BAE\u4F7F\u7528 Element Plus \u539F\u751F\u7684 css \u53D8\u91CF\u6765\u4EE3\u66FF\u539F\u6709\u7684\u989C\u8272\uFF0C\u4F60\u53EF\u4EE5\u5728 Element Plus \u5B98\u7F51<a href="https://element-plus.org/zh-CN/component/color.html#%E4%B8%BB%E8%89%B2" target="_blank" rel="noopener noreferrer">\u8FD9\u91CC</a>\u4E86\u89E3\u5230\u8FD9\u4E9B\u989C\u8272\u53D8\u91CF\u3002\u4E3A\u4E86\u65B9\u4FBF\uFF0C\u6211\u4EEC\u5C06\u8FD9\u4E9B\u989C\u8272\u53D8\u91CF\u90FD\u6574\u7406\u4E86\u51FA\u6765\u3002</p><div class="language-css"><span class="copy"></span><pre><code><span class="line"><span style="color:#676E95;font-style:italic;">/* \u4E3B\u8272 primary */</span></span>
<span class="line"><span style="color:#A6ACCD;">var(--el-color-primary)</span></span>
<span class="line"><span style="color:#A6ACCD;">var(--el-color-primary-light-3)</span></span>
<span class="line"><span style="color:#A6ACCD;">var(--el-color-primary-light-5)</span></span>
<span class="line"><span style="color:#A6ACCD;">var(--el-color-primary-light-7)</span></span>
<span class="line"><span style="color:#A6ACCD;">var(--el-color-primary-light-9)</span></span>
<span class="line"><span style="color:#A6ACCD;">var(--el-color-primary-dark-2)</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">/* \u8F85\u52A9\u8272 success */</span></span>
<span class="line"><span style="color:#A6ACCD;">var(--el-color-success)</span></span>
<span class="line"><span style="color:#A6ACCD;">var(--el-color-success-light-3)</span></span>
<span class="line"><span style="color:#A6ACCD;">var(--el-color-success-light-5)</span></span>
<span class="line"><span style="color:#A6ACCD;">var(--el-color-success-light-7)</span></span>
<span class="line"><span style="color:#A6ACCD;">var(--el-color-success-light-9)</span></span>
<span class="line"><span style="color:#A6ACCD;">var(--el-color-success-dark-2)</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">/* \u8F85\u52A9\u8272 warning */</span></span>
<span class="line"><span style="color:#A6ACCD;">var(--el-color-warning)</span></span>
<span class="line"><span style="color:#A6ACCD;">var(--el-color-warning-light-3)</span></span>
<span class="line"><span style="color:#A6ACCD;">var(--el-color-warning-light-5)</span></span>
<span class="line"><span style="color:#A6ACCD;">var(--el-color-warning-light-7)</span></span>
<span class="line"><span style="color:#A6ACCD;">var(--el-color-warning-light-9)</span></span>
<span class="line"><span style="color:#A6ACCD;">var(--el-color-warning-dark-2)</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">/* \u8F85\u52A9\u8272 danger */</span></span>
<span class="line"><span style="color:#A6ACCD;">var(--el-color-danger)</span></span>
<span class="line"><span style="color:#A6ACCD;">var(--el-color-danger-light-3)</span></span>
<span class="line"><span style="color:#A6ACCD;">var(--el-color-danger-light-5)</span></span>
<span class="line"><span style="color:#A6ACCD;">var(--el-color-danger-light-7)</span></span>
<span class="line"><span style="color:#A6ACCD;">var(--el-color-danger-light-9)</span></span>
<span class="line"><span style="color:#A6ACCD;">var(--el-color-danger-dark-2)</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">/* \u8F85\u52A9\u8272 error */</span></span>
<span class="line"><span style="color:#A6ACCD;">var(--el-color-error)</span></span>
<span class="line"><span style="color:#A6ACCD;">var(--el-color-error-light-3)</span></span>
<span class="line"><span style="color:#A6ACCD;">var(--el-color-error-light-5)</span></span>
<span class="line"><span style="color:#A6ACCD;">var(--el-color-error-light-7)</span></span>
<span class="line"><span style="color:#A6ACCD;">var(--el-color-error-light-9)</span></span>
<span class="line"><span style="color:#A6ACCD;">var(--el-color-error-dark-2)</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">/* \u8F85\u52A9\u8272 info */</span></span>
<span class="line"><span style="color:#A6ACCD;">var(--el-color-info)</span></span>
<span class="line"><span style="color:#A6ACCD;">var(--el-color-info-light-3)</span></span>
<span class="line"><span style="color:#A6ACCD;">var(--el-color-info-light-5)</span></span>
<span class="line"><span style="color:#A6ACCD;">var(--el-color-info-light-7)</span></span>
<span class="line"><span style="color:#A6ACCD;">var(--el-color-info-light-9)</span></span>
<span class="line"><span style="color:#A6ACCD;">var(--el-color-info-dark-2)</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">/* \u80CC\u666F */</span></span>
<span class="line"><span style="color:#A6ACCD;">var(--el-bg-color)</span></span>
<span class="line"><span style="color:#A6ACCD;">var(--el-bg-color-page)</span></span>
<span class="line"><span style="color:#A6ACCD;">var(--el-bg-color-overlay)</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">/* \u6587\u5B57 */</span></span>
<span class="line"><span style="color:#A6ACCD;">var(--el-text-color-primary)</span></span>
<span class="line"><span style="color:#A6ACCD;">var(--el-text-color-regular)</span></span>
<span class="line"><span style="color:#A6ACCD;">var(--el-text-color-secondary)</span></span>
<span class="line"><span style="color:#A6ACCD;">var(--el-text-color-placeholder)</span></span>
<span class="line"><span style="color:#A6ACCD;">var(--el-text-color-disabled)</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">/* \u8FB9\u6846 */</span></span>
<span class="line"><span style="color:#A6ACCD;">var(--el-border-color)</span></span>
<span class="line"><span style="color:#A6ACCD;">var(--el-border-color-light)</span></span>
<span class="line"><span style="color:#A6ACCD;">var(--el-border-color-lighter)</span></span>
<span class="line"><span style="color:#A6ACCD;">var(--el-border-color-extra-light)</span></span>
<span class="line"><span style="color:#A6ACCD;">var(--el-border-color-dark)</span></span>
<span class="line"><span style="color:#A6ACCD;">var(--el-border-color-darker)</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">/* \u586B\u5145 */</span></span>
<span class="line"><span style="color:#A6ACCD;">var(--el-fill-color)</span></span>
<span class="line"><span style="color:#A6ACCD;">var(--el-fill-color-light)</span></span>
<span class="line"><span style="color:#A6ACCD;">var(--el-fill-color-lighter)</span></span>
<span class="line"><span style="color:#A6ACCD;">var(--el-fill-color-extra-light)</span></span>
<span class="line"><span style="color:#A6ACCD;">var(--el-fill-color-dark)</span></span>
<span class="line"><span style="color:#A6ACCD;">var(--el-fill-color-darker)</span></span>
<span class="line"><span style="color:#A6ACCD;">var(--el-fill-color-blank)</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">/* box-shadow */</span></span>
<span class="line"><span style="color:#A6ACCD;">var(--el-box-shadow)</span></span>
<span class="line"><span style="color:#A6ACCD;">var(--el-box-shadow-light)</span></span>
<span class="line"><span style="color:#A6ACCD;">var(--el-box-shadow-lighter)</span></span>
<span class="line"><span style="color:#A6ACCD;">var(--el-box-shadow-dark)</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">/* \u7981\u7528 */</span></span>
<span class="line"><span style="color:#A6ACCD;">var(--el-disabled-bg-color)</span></span>
<span class="line"><span style="color:#A6ACCD;">var(--el-disabled-text-color)</span></span>
<span class="line"><span style="color:#A6ACCD;">var(--el-disabled-border-color)</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">/* \u906E\u7F69 */</span></span>
<span class="line"><span style="color:#A6ACCD;">var(--el-overlay-color)</span></span>
<span class="line"><span style="color:#A6ACCD;">var(--el-overlay-color-light)</span></span>
<span class="line"><span style="color:#A6ACCD;">var(--el-overlay-color-lighter)</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">/* mask */</span></span>
<span class="line"><span style="color:#A6ACCD;">var(--el-mask-color)</span></span>
<span class="line"><span style="color:#A6ACCD;">var(--el-mask-color-extra-light)</span></span>
<span class="line"></span></code></pre></div><p>\u53E6\u5916\uFF0C\u4F60\u53EF\u80FD\u8FD8\u4F1A\u7528\u5230\u4EE5\u4E0B\u8FD9\u4E9B transition \u53D8\u91CF\uFF0C\u56E0\u4E3A\u5728\u660E\u4EAE\u548C\u6697\u9ED1\u6A21\u5F0F\u5207\u6362\u8FC7\u7A0B\u4E2D\uFF0C\u5982\u679C\u6CA1\u6709 transition \u7684\u8FC7\u6E21\u6548\u679C\uFF0C\u5C31\u4F1A\u53D8\u5F97\u5F88\u7A81\u5140\uFF0C\u548C\u6846\u67B6\u6574\u4F53\u52A8\u6548\u98CE\u683C\u4E5F\u4E0D\u7EDF\u4E00\u3002</p><div class="language-css"><span class="copy"></span><pre><code><span class="line"><span style="color:#A6ACCD;">var(--el-transition-all)</span></span>
<span class="line"><span style="color:#A6ACCD;">var(--el-transition-fade)</span></span>
<span class="line"><span style="color:#A6ACCD;">var(--el-transition-fade-linear)</span></span>
<span class="line"><span style="color:#A6ACCD;">var(--el-transition-md-fade)</span></span>
<span class="line"><span style="color:#A6ACCD;">var(--el-transition-color)</span></span>
<span class="line"><span style="color:#A6ACCD;">var(--el-transition-border)</span></span>
<span class="line"><span style="color:#A6ACCD;">var(--el-transition-box-shadow)</span></span>
<span class="line"></span></code></pre></div><p>\u9664\u6B64\u4E4B\u5916\uFF0C\u4F60\u8FD8\u53EF\u4EE5\u4F7F\u7528\u4E0B\u9762\u8FD9\u79CD\u65B9\u6CD5\uFF0C\u5728\u9875\u9762\u4E2D\u53BB\u81EA\u5B9A\u4E49\u4E00\u4E9B\u989C\u8272\u3002</p><div class="language-scss"><span class="copy"></span><pre><code><span class="line"><span style="color:#FFCB6B;">html</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#FFCB6B;">div</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#B2CCD6;">color</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">#</span><span style="color:#A6ACCD;">000</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#FFCB6B;">&amp;</span><span style="color:#89DDFF;">.</span><span style="color:#FFCB6B;">dark</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">div</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#B2CCD6;">color</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">#</span><span style="color:#A6ACCD;">fff</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><p>\u6700\u540E\u5206\u4EAB\u4E00\u7BC7\u5173\u4E8E\u6697\u9ED1\u6A21\u5F0F\u7684\u6587\u7AE0\u300A<a href="http://www.woshipm.com/pd/4105894.html" target="_blank" rel="noopener noreferrer">\u6559\u4F60\u5DE7\u7528UI\u8BBE\u8BA1\u4E2D\u7684\u6697\u9ED1\u6A21\u5F0F\u2014\u2014Dark Mode</a>\u300B\uFF0C\u5E0C\u671B\u5E2E\u52A9\u4F60\u66F4\u597D\u5730\u5728\u6697\u9ED1\u6A21\u5F0F\u4E0B\u5F00\u53D1\u51FA\u4F18\u79C0\u7684\u9875\u9762\u3002</p>`,27),o=[e];function c(r,t,i,y,D,C){return a(),n("div",null,o)}var d=s(p,[["render",c]]);export{F as __pageData,d as default};

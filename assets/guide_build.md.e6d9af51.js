import{_ as n,r as p,o as l,c as e,b as a,d as o,a as c}from"./app.77fdb89c.js";const g=JSON.parse('{"title":"\u6784\u5EFA\u4E0E\u9884\u89C8","description":"","frontmatter":{},"headers":[{"level":2,"title":"\u6784\u5EFA","slug":"\u6784\u5EFA"},{"level":2,"title":"\u9884\u89C8","slug":"\u9884\u89C8"},{"level":2,"title":"\u538B\u7F29","slug":"\u538B\u7F29"},{"level":2,"title":"\u5176\u5B83\u8BBE\u7F6E","slug":"\u5176\u5B83\u8BBE\u7F6E"},{"level":3,"title":"\u751F\u6210 PWA \u5E94\u7528","slug":"\u751F\u6210-pwa-\u5E94\u7528"}],"relativePath":"guide/build.md"}'),t={name:"guide/build.md"},r=o(`<h1 id="\u6784\u5EFA\u4E0E\u9884\u89C8" tabindex="-1">\u6784\u5EFA\u4E0E\u9884\u89C8 <a class="header-anchor" href="#\u6784\u5EFA\u4E0E\u9884\u89C8" aria-hidden="true">#</a></h1><h2 id="\u6784\u5EFA" tabindex="-1">\u6784\u5EFA <a class="header-anchor" href="#\u6784\u5EFA" aria-hidden="true">#</a></h2><p>\u9879\u76EE\u5F00\u53D1\u5B8C\u6210\u4E4B\u540E\uFF0C\u53EF\u4EE5\u6267\u884C <code>pnpm run build</code> \u547D\u4EE4\u8FDB\u884C\u6784\u5EFA\uFF0C\u6784\u5EFA\u6253\u5305\u6210\u529F\u4E4B\u540E\uFF0C\u4F1A\u5728\u6839\u76EE\u5F55\u751F\u6210 dist \u6587\u4EF6\u5939\uFF0C\u91CC\u9762\u5C31\u662F\u6784\u5EFA\u6253\u5305\u597D\u7684\u6587\u4EF6\u3002</p><p>\u5982\u679C\u662F\u9700\u8981\u6784\u5EFA\u6D4B\u8BD5\u73AF\u5883\uFF0C\u5219\u6267\u884C <code>pnpm run build:test</code> \u547D\u4EE4\uFF0C\u5BF9\u5E94\u4F1A\u5728\u6839\u76EE\u5F55\u751F\u6210 dist-test \u6587\u4EF6\u5939\u3002</p><h2 id="\u9884\u89C8" tabindex="-1">\u9884\u89C8 <a class="header-anchor" href="#\u9884\u89C8" aria-hidden="true">#</a></h2><p>\u751F\u6210\u597D\u7684 dist \u6587\u4EF6\u5939\u4E00\u822C\u9700\u8981\u90E8\u7F72\u81F3\u670D\u52A1\u5668\u624D\u7B97\u90E8\u7F72\u53D1\u5E03\u6210\u529F\uFF0C\u4F46\u4E3A\u4E86\u4FDD\u8BC1\u6784\u5EFA\u51FA\u6765\u7684\u6587\u4EF6\u80FD\u6B63\u5E38\u8FD0\u884C\uFF0C\u5F00\u53D1\u8005\u901A\u5E38\u5E0C\u671B\u80FD\u5728\u672C\u5730\u5148\u9884\u89C8\u4E00\u4E0B\uFF0C\u53EF\u6267\u884C <code>pnpm run serve</code> \u6216 <code>pnpm run serve:test</code> \u547D\u4EE4\u9884\u89C8\u4E0D\u540C\u73AF\u5883\u6784\u5EFA\u51FA\u7684\u6587\u4EF6\u5939\u3002</p><h2 id="\u538B\u7F29" tabindex="-1">\u538B\u7F29 <a class="header-anchor" href="#\u538B\u7F29" aria-hidden="true">#</a></h2><p>\u5728\u73AF\u5883\u914D\u7F6E\u6587\u4EF6\u91CC\u8BBE\u7F6E <code>VITE_BUILD_COMPRESS</code> \u5373\u53EF\u5728\u6784\u5EFA\u65F6\u751F\u6210 <code>.gz</code> \u6216 <code>.br</code> \u6587\u4EF6\u3002</p><div class="language-"><span class="copy"></span><pre><code><span class="line"><span style="color:#A6ACCD;"># \u5355\u72EC\u5F00\u542F gzip</span></span>
<span class="line"><span style="color:#A6ACCD;">VITE_BUILD_COMPRESS = gzip</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"># \u5355\u72EC\u5F00\u542F brotli \uFF0Cbrotli \u662F\u6BD4 gzip \u538B\u7F29\u7387\u66F4\u9AD8\u7684\u7B97\u6CD5</span></span>
<span class="line"><span style="color:#A6ACCD;">VITE_BUILD_COMPRESS = brotli</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"># \u6216\u8005\u4E5F\u53EF\u4EE5\u90FD\u5F00\u542F\uFF0C\u4E24\u8005\u53EF\u4EE5\u5171\u5B58</span></span>
<span class="line"><span style="color:#A6ACCD;">VITE_BUILD_COMPRESS = gzip,brotli</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>\u4E24\u8005\u5747\u9700\u8981 nginx \u5B89\u88C5\u6307\u5B9A\u6A21\u5757\u5E76\u5F00\u542F\u540E\u624D\u4F1A\u751F\u6548\u3002</p><h2 id="\u5176\u5B83\u8BBE\u7F6E" tabindex="-1">\u5176\u5B83\u8BBE\u7F6E <a class="header-anchor" href="#\u5176\u5B83\u8BBE\u7F6E" aria-hidden="true">#</a></h2><p>\u5728\u73AF\u5883\u914D\u7F6E\u6587\u4EF6\u91CC\u9664\u4E86\u53EF\u4EE5\u8BBE\u7F6E\u538B\u7F29\u9009\u9879\uFF0C\u8FD8\u53EF\u8BBE\u7F6E\uFF1A</p><div class="language-"><span class="copy"></span><pre><code><span class="line"><span style="color:#A6ACCD;"># \u662F\u5426\u5728\u6253\u5305\u65F6\u751F\u6210 sourcemap</span></span>
<span class="line"><span style="color:#A6ACCD;">VITE_BUILD_SOURCEMAP = true</span></span>
<span class="line"><span style="color:#A6ACCD;"># \u662F\u5426\u5728\u6253\u5305\u65F6\u5220\u9664 console \u4EE3\u7801</span></span>
<span class="line"><span style="color:#A6ACCD;">VITE_BUILD_DROP_CONSOLE = true</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h3 id="\u751F\u6210-pwa-\u5E94\u7528" tabindex="-1">\u751F\u6210 PWA \u5E94\u7528 <sup class="pro-badge"></sup> <a class="header-anchor" href="#\u751F\u6210-pwa-\u5E94\u7528" aria-hidden="true">#</a></h3><p>\u5728\u73AF\u5883\u914D\u7F6E\u6587\u4EF6\u91CC\u5F00\u542F PWA \u652F\u6301\u3002</p><div class="language-"><span class="copy"></span><pre><code><span class="line"><span style="color:#A6ACCD;"># \u662F\u5426\u5728\u6253\u5305\u65F6\u5019\u751F\u6210PWA</span></span>
<span class="line"><span style="color:#A6ACCD;">VITE_BUILD_PWA = true</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>\u7136\u540E\u5206\u522B\u5728 <code>/src/main.js</code> \u548C <code>/src/App.vue</code> \u91CC\u53D6\u6D88\u6CE8\u91CA\uFF0C\u5F15\u5165 PWA \u6240\u9700\u7684\u76F8\u5173\u6587\u4EF6\u3002</p><div class="language-js"><span class="copy"></span><pre><code><span class="line"><span style="color:#676E95;font-style:italic;">// PWA</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">./pwa</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"></span></code></pre></div><div class="language-vue"><span class="copy"></span><div class="highlight-lines"><br><div class="highlighted">\xA0</div><br><br><br><br><br><div class="highlighted">\xA0</div><br><br><br></div><pre><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">script</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">setup</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> ReloadPrompt </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">@/pwa/reloadPrompt.vue</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">el-config-provider</span><span style="color:#89DDFF;"> :</span><span style="color:#C792EA;">locale</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">locales</span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">$store</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">state</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">settings</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">defaultLang</span><span style="color:#89DDFF;">]</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">RouterView</span><span style="color:#89DDFF;"> /&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">ReloadPrompt</span><span style="color:#89DDFF;"> /&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">el-config-provider</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span></code></pre></div><p>\u6700\u540E\u5728 <code>/vite/plugins/pwa.js</code> \u6587\u4EF6\u91CC\u4FEE\u6539 manifest \u4FE1\u606F\uFF0C\u5BF9\u5E94\u7684\u56FE\u7247\u76EE\u5F55\u4E3A <code>/public/pwa_icons/</code> \u3002</p><p>\u5F53\u51C6\u5907\u597D\u8FD9\u4E00\u5207\u5E76\u6784\u5EFA\u90E8\u7F72\u5230\u751F\u4EA7\u73AF\u5883\u540E\uFF0C\u4F60\u5C31\u53EF\u4EE5\u5728\u6D4F\u89C8\u5668\u7684\u5730\u5740\u680F\u91CC\u770B\u5230\u591A\u4E86\u4E00\u4E2A\u5C0F\u56FE\u6807\uFF0C\u70B9\u51FB\u540E\u4F1A\u63D0\u793A\u4F60\u53EF\u4EE5\u5B89\u88C5\u5E94\u7528\u3002</p>`,21),i=c("p",null,"\u5E76\u4E14\u4EE5\u540E\u518D\u6B21\u6784\u5EFA\u90E8\u7F72\uFF0C\u8BBF\u95EE\u5730\u5740\u65F6\uFF0C\u5982\u679C\u6D4F\u89C8\u5668\u5B58\u5728\u7F13\u5B58\uFF0C\u5BFC\u81F4\u9875\u9762\u6CA1\u6709\u8F7D\u5165\u6700\u65B0\u7684\u8D44\u6E90\uFF0C\u5728\u9875\u9762\u53F3\u4E0B\u89D2\u8FD8\u4F1A\u51FA\u73B0\u76F8\u5173\u63D0\u793A\u6846\u3002",-1);function d(D,y,C,A,F,h){const s=p("ZoomImg");return l(),e("div",null,[r,a(s,{src:"/pwa1.png"}),i,a(s,{src:"/pwa2.png"})])}var _=n(t,[["render",d]]);export{g as __pageData,_ as default};

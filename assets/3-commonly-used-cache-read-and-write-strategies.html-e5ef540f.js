import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as a,c as t,e as r}from"./app-a569c9af.js";const i={},c=r('<p>看到很多小伙伴简历上写了“<strong>熟练使用缓存</strong>”，但是被我问到“<strong>缓存常用的 3 种读写策略</strong>”的时候却一脸懵逼。</p><p>在我看来，造成这个问题的原因是我们在学习 Redis 的时候，可能只是简单了写一些 Demo，并没有去关注缓存的读写策略，或者说压根不知道这回事。</p><p>但是，搞懂 3 种常见的缓存读写策略对于实际工作中使用缓存以及面试中被问到缓存都是非常有帮助的！</p><p><strong>下面介绍到的三种模式各有优劣，不存在最佳模式，根据具体的业务场景选择适合自己的缓存读写模式。</strong></p><h3 id="cache-aside-pattern-旁路缓存模式" tabindex="-1"><a class="header-anchor" href="#cache-aside-pattern-旁路缓存模式" aria-hidden="true">#</a> Cache Aside Pattern（旁路缓存模式）</h3><p><strong>Cache Aside Pattern 是我们平时使用比较多的一个缓存读写模式，比较适合读请求比较多的场景。</strong></p><p>Cache Aside Pattern 中服务端需要同时维系 db 和 cache，并且是以 db 的结果为准。</p><p>下面我们来看一下这个策略模式下的缓存读写步骤。</p><p><strong>写</strong>：</p><ul><li>先更新 db</li><li>然后直接删除 cache 。</li></ul><p>简单画了一张图帮助大家理解写的步骤。</p><figure><img src="https://oss.javaguide.cn/github/javaguide/database/redis/cache-aside-write.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p><strong>读</strong> :</p><ul><li>从 cache 中读取数据，读取到就直接返回</li><li>cache 中读取不到的话，就从 db 中读取数据返回</li><li>再把数据放到 cache 中。</li></ul><p>简单画了一张图帮助大家理解读的步骤。</p><figure><img src="https://oss.javaguide.cn/github/javaguide/database/redis/cache-aside-read.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>你仅仅了解了上面这些内容的话是远远不够的，我们还要搞懂其中的原理。</p><p>比如说面试官很可能会追问：“<strong>在写数据的过程中，可以先删除 cache ，后更新 db 么？</strong>”</p><p><strong>答案：</strong> 那肯定是不行的！因为这样可能会造成 <strong>数据库（db）和缓存（Cache）数据不一致</strong>的问题。</p><p>举例：请求 1 先写数据 A，请求 2 随后读数据 A 的话，就很有可能产生数据不一致性的问题。</p><p>这个过程可以简单描述为：</p><blockquote><p>请求 1 先把 cache 中的 A 数据删除 -&gt; 请求 2 从 db 中读取数据-&gt;请求 1 再把 db 中的 A 数据更新</p></blockquote><p>当你这样回答之后，面试官可能会紧接着就追问：“<strong>在写数据的过程中，先更新 db，后删除 cache 就没有问题了么？</strong>”</p><p><strong>答案：</strong> 理论上来说还是可能会出现数据不一致性的问题，不过概率非常小，因为缓存的写入速度是比数据库的写入速度快很多。</p><p>举例：请求 1 先读数据 A，请求 2 随后写数据 A，并且数据 A 在请求 1 请求之前不在缓存中的话，也有可能产生数据不一致性的问题。</p><p>这个过程可以简单描述为：</p><blockquote><p>请求 1 从 db 读数据 A-&gt; 请求 2 更新 db 中的数据 A（此时缓存中无数据 A ，故不用执行删除缓存操作 ） -&gt; 请求 1 将数据 A 写入 cache</p></blockquote><p>现在我们再来分析一下 <strong>Cache Aside Pattern 的缺陷</strong>。</p><p><strong>缺陷 1：首次请求数据一定不在 cache 的问题</strong></p><p>解决办法：可以将热点数据可以提前放入 cache 中。</p><p><strong>缺陷 2：写操作比较频繁的话导致 cache 中的数据会被频繁被删除，这样会影响缓存命中率 。</strong></p><p>解决办法：</p><ul><li>数据库和缓存数据强一致场景：更新 db 的时候同样更新 cache，不过我们需要加一个锁/分布式锁来保证更新 cache 的时候不存在线程安全问题。</li><li>可以短暂地允许数据库和缓存数据不一致的场景：更新 db 的时候同样更新 cache，但是给缓存加一个比较短的过期时间，这样的话就可以保证即使数据不一致的话影响也比较小。</li></ul><h3 id="read-write-through-pattern-读写穿透" tabindex="-1"><a class="header-anchor" href="#read-write-through-pattern-读写穿透" aria-hidden="true">#</a> Read/Write Through Pattern（读写穿透）</h3><p>Read/Write Through Pattern 中服务端把 cache 视为主要数据存储，从中读取数据并将数据写入其中。cache 服务负责将此数据读取和写入 db，从而减轻了应用程序的职责。</p><p>这种缓存读写策略小伙伴们应该也发现了在平时在开发过程中非常少见。抛去性能方面的影响，大概率是因为我们经常使用的分布式缓存 Redis 并没有提供 cache 将数据写入 db 的功能。</p><p><strong>写（Write Through）：</strong></p><ul><li>先查 cache，cache 中不存在，直接更新 db。</li><li>cache 中存在，则先更新 cache，然后 cache 服务自己更新 db（<strong>同步更新 cache 和 db</strong>）。</li></ul><p>简单画了一张图帮助大家理解写的步骤。</p><figure><img src="https://oss.javaguide.cn/github/javaguide/database/redis/write-through.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p><strong>读(Read Through)：</strong></p><ul><li>从 cache 中读取数据，读取到就直接返回 。</li><li>读取不到的话，先从 db 加载，写入到 cache 后返回响应。</li></ul><p>简单画了一张图帮助大家理解读的步骤。</p><figure><img src="https://oss.javaguide.cn/github/javaguide/database/redis/read-through.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>Read-Through Pattern 实际只是在 Cache-Aside Pattern 之上进行了封装。在 Cache-Aside Pattern 下，发生读请求的时候，如果 cache 中不存在对应的数据，是由客户端自己负责把数据写入 cache，而 Read Through Pattern 则是 cache 服务自己来写入缓存的，这对客户端是透明的。</p><p>和 Cache Aside Pattern 一样， Read-Through Pattern 也有首次请求数据一定不再 cache 的问题，对于热点数据可以提前放入缓存中。</p><h3 id="write-behind-pattern-异步缓存写入" tabindex="-1"><a class="header-anchor" href="#write-behind-pattern-异步缓存写入" aria-hidden="true">#</a> Write Behind Pattern（异步缓存写入）</h3><p>Write Behind Pattern 和 Read/Write Through Pattern 很相似，两者都是由 cache 服务来负责 cache 和 db 的读写。</p><p>但是，两个又有很大的不同：<strong>Read/Write Through 是同步更新 cache 和 db，而 Write Behind 则是只更新缓存，不直接更新 db，而是改为异步批量的方式来更新 db。</strong></p><p>很明显，这种方式对数据一致性带来了更大的挑战，比如 cache 数据可能还没异步更新 db 的话，cache 服务可能就就挂掉了。</p><p>这种策略在我们平时开发过程中也非常非常少见，但是不代表它的应用场景少，比如消息队列中消息的异步写入磁盘、MySQL 的 Innodb Buffer Pool 机制都用到了这种策略。</p><p>Write Behind Pattern 下 db 的写性能非常高，非常适合一些数据经常变化又对数据一致性要求没那么高的场景，比如浏览量、点赞量。</p><p>File not found</p>',53),n=[c];function h(d,p){return a(),t("div",null,n)}const g=e(i,[["render",h],["__file","3-commonly-used-cache-read-and-write-strategies.html.vue"]]);export{g as default};

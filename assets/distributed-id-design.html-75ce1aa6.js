const e=JSON.parse('{"key":"v-e63759ea","path":"/note/%E5%88%86%E5%B8%83%E5%BC%8F/distributed-id-design.html","title":"分布式ID设计指南","lang":"zh-CN","frontmatter":{"title":"分布式ID设计指南","category":"分布式","description":"看到百度 Geek 说的一篇结合具体场景聊分布式 ID 设计的文章，感觉挺不错的。于是，我将这篇文章的部分内容整理到了这里。原文传送门：分布式 ID 生成服务的技术原理和项目实战 (https://mp.weixin.qq.com/s/bFDLb6U6EgI-DvCdLTq_QA) 。 网上绝大多数的分布式 ID 生成服务，一般着重于技术原理剖析，很少...","head":[["meta",{"property":"og:url","content":"https://javadance.cn/note/%E5%88%86%E5%B8%83%E5%BC%8F/distributed-id-design.html"}],["meta",{"property":"og:site_name","content":"企鹅君"}],["meta",{"property":"og:title","content":"分布式ID设计指南"}],["meta",{"property":"og:description","content":"看到百度 Geek 说的一篇结合具体场景聊分布式 ID 设计的文章，感觉挺不错的。于是，我将这篇文章的部分内容整理到了这里。原文传送门：分布式 ID 生成服务的技术原理和项目实战 (https://mp.weixin.qq.com/s/bFDLb6U6EgI-DvCdLTq_QA) 。 网上绝大多数的分布式 ID 生成服务，一般着重于技术原理剖析，很少..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:author","content":"企鹅君"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"分布式ID设计指南\\",\\"image\\":[\\"\\"],\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"企鹅君\\",\\"url\\":\\"https://javadance.cn\\"}]}"]]},"headers":[{"level":2,"title":"场景一：订单系统","slug":"场景一-订单系统","link":"#场景一-订单系统","children":[{"level":3,"title":"1、一码付","slug":"_1、一码付","link":"#_1、一码付","children":[]},{"level":3,"title":"2、订单号","slug":"_2、订单号","link":"#_2、订单号","children":[]},{"level":3,"title":"3、优惠券和兑换券","slug":"_3、优惠券和兑换券","link":"#_3、优惠券和兑换券","children":[]}]},{"level":2,"title":"场景二：Tracing","slug":"场景二-tracing","link":"#场景二-tracing","children":[{"level":3,"title":"1、日志跟踪","slug":"_1、日志跟踪","link":"#_1、日志跟踪","children":[]},{"level":3,"title":"2、TraceId 生成规则","slug":"_2、traceid-生成规则","link":"#_2、traceid-生成规则","children":[]},{"level":3,"title":"3、SpanId 生成规则","slug":"_3、spanid-生成规则","link":"#_3、spanid-生成规则","children":[]}]},{"level":2,"title":"场景三：短网址","slug":"场景三-短网址","link":"#场景三-短网址","children":[]}],"git":{"createdTime":null,"updatedTime":null,"contributors":[]},"readingTime":{"minutes":13.37,"words":4012},"filePathRelative":"note/分布式/distributed-id-design.md","autoDesc":true,"excerpt":""}');export{e as data};

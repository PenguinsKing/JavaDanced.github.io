const e=JSON.parse('{"key":"v-c53315d2","path":"/note/java/%E5%AE%B9%E5%99%A8/delayqueue-source-code.html","title":"DelayQueue 源码分析","lang":"zh-CN","frontmatter":{"title":"DelayQueue 源码分析","category":"Java","tag":["Java集合"],"description":"DelayQueue 简介 DelayQueue 是 JUC 包(java.util.concurrent)为我们提供的延迟队列，用于实现延时任务比如订单下单 15 分钟未支付直接取消。它是 BlockingQueue 的一种，底层是一个基于 PriorityQueue 实现的一个无界队列，是线程安全的。关于PriorityQueue可以参考笔者编写的...","head":[["meta",{"property":"og:url","content":"https://javadance.cn/note/java/%E5%AE%B9%E5%99%A8/delayqueue-source-code.html"}],["meta",{"property":"og:site_name","content":"企鹅君"}],["meta",{"property":"og:title","content":"DelayQueue 源码分析"}],["meta",{"property":"og:description","content":"DelayQueue 简介 DelayQueue 是 JUC 包(java.util.concurrent)为我们提供的延迟队列，用于实现延时任务比如订单下单 15 分钟未支付直接取消。它是 BlockingQueue 的一种，底层是一个基于 PriorityQueue 实现的一个无界队列，是线程安全的。关于PriorityQueue可以参考笔者编写的..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:author","content":"企鹅君"}],["meta",{"property":"article:tag","content":"Java集合"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"DelayQueue 源码分析\\",\\"image\\":[\\"\\"],\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"企鹅君\\",\\"url\\":\\"https://javadance.cn\\"}]}"]]},"headers":[{"level":2,"title":"DelayQueue 简介","slug":"delayqueue-简介","link":"#delayqueue-简介","children":[]},{"level":2,"title":"DelayQueue 发展史","slug":"delayqueue-发展史","link":"#delayqueue-发展史","children":[]},{"level":2,"title":"DelayQueue 常见使用场景示例","slug":"delayqueue-常见使用场景示例","link":"#delayqueue-常见使用场景示例","children":[]},{"level":2,"title":"DelayQueue 源码解析","slug":"delayqueue-源码解析","link":"#delayqueue-源码解析","children":[{"level":3,"title":"核心成员变量","slug":"核心成员变量","link":"#核心成员变量","children":[]},{"level":3,"title":"构造方法","slug":"构造方法","link":"#构造方法","children":[]},{"level":3,"title":"添加元素","slug":"添加元素","link":"#添加元素","children":[]},{"level":3,"title":"获取元素","slug":"获取元素","link":"#获取元素","children":[]},{"level":3,"title":"查看元素","slug":"查看元素","link":"#查看元素","children":[]}]},{"level":2,"title":"DelayQueue 常见面试题","slug":"delayqueue-常见面试题","link":"#delayqueue-常见面试题","children":[{"level":3,"title":"DelayQueue 的实现原理是什么？","slug":"delayqueue-的实现原理是什么","link":"#delayqueue-的实现原理是什么","children":[]},{"level":3,"title":"DelayQueue 的实现是否线程安全？","slug":"delayqueue-的实现是否线程安全","link":"#delayqueue-的实现是否线程安全","children":[]},{"level":3,"title":"DelayQueue 的使用场景有哪些？","slug":"delayqueue-的使用场景有哪些","link":"#delayqueue-的使用场景有哪些","children":[]},{"level":3,"title":"DelayQueue 中 Delayed 接口的作用是什么？","slug":"delayqueue-中-delayed-接口的作用是什么","link":"#delayqueue-中-delayed-接口的作用是什么","children":[]},{"level":3,"title":"DelayQueue 和 Timer/TimerTask 的区别是什么？","slug":"delayqueue-和-timer-timertask-的区别是什么","link":"#delayqueue-和-timer-timertask-的区别是什么","children":[]}]},{"level":2,"title":"参考文献","slug":"参考文献","link":"#参考文献","children":[]}],"git":{"createdTime":null,"updatedTime":null,"contributors":[]},"readingTime":{"minutes":12.87,"words":3860},"filePathRelative":"note/java/容器/delayqueue-source-code.md","autoDesc":true,"excerpt":""}');export{e as data};

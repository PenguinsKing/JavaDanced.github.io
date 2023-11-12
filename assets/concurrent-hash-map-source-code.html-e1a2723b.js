const e=JSON.parse('{"key":"v-8fe68c14","path":"/note/java/%E5%AE%B9%E5%99%A8/concurrent-hash-map-source-code.html","title":"ConcurrentHashMap 源码分析","lang":"zh-CN","frontmatter":{"title":"ConcurrentHashMap 源码分析","category":"Java","tag":["Java集合"],"description":"本文来自公众号：末读代码的投稿，原文地址：https://mp.weixin.qq.com/s/AHWzboztt53ZfFZmsSnMSw 。 上一篇文章介绍了 HashMap 源码，反响不错，也有很多同学发表了自己的观点，这次又来了，这次是 ConcurrentHashMap 了，作为线程安全的 HashMap ，它的使用频率也是很高。那么它的存储...","head":[["meta",{"property":"og:url","content":"https://javadance.cn/note/java/%E5%AE%B9%E5%99%A8/concurrent-hash-map-source-code.html"}],["meta",{"property":"og:site_name","content":"企鹅君"}],["meta",{"property":"og:title","content":"ConcurrentHashMap 源码分析"}],["meta",{"property":"og:description","content":"本文来自公众号：末读代码的投稿，原文地址：https://mp.weixin.qq.com/s/AHWzboztt53ZfFZmsSnMSw 。 上一篇文章介绍了 HashMap 源码，反响不错，也有很多同学发表了自己的观点，这次又来了，这次是 ConcurrentHashMap 了，作为线程安全的 HashMap ，它的使用频率也是很高。那么它的存储..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:author","content":"企鹅君"}],["meta",{"property":"article:tag","content":"Java集合"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"ConcurrentHashMap 源码分析\\",\\"image\\":[\\"\\"],\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"企鹅君\\",\\"url\\":\\"https://javadance.cn\\"}]}"]]},"headers":[{"level":2,"title":"1. ConcurrentHashMap 1.7","slug":"_1-concurrenthashmap-1-7","link":"#_1-concurrenthashmap-1-7","children":[{"level":3,"title":"1. 存储结构","slug":"_1-存储结构","link":"#_1-存储结构","children":[]},{"level":3,"title":"2. 初始化","slug":"_2-初始化","link":"#_2-初始化","children":[]},{"level":3,"title":"3. put","slug":"_3-put","link":"#_3-put","children":[]},{"level":3,"title":"4. 扩容 rehash","slug":"_4-扩容-rehash","link":"#_4-扩容-rehash","children":[]},{"level":3,"title":"5. get","slug":"_5-get","link":"#_5-get","children":[]}]},{"level":2,"title":"2. ConcurrentHashMap 1.8","slug":"_2-concurrenthashmap-1-8","link":"#_2-concurrenthashmap-1-8","children":[{"level":3,"title":"1. 存储结构","slug":"_1-存储结构-1","link":"#_1-存储结构-1","children":[]},{"level":3,"title":"2. 初始化 initTable","slug":"_2-初始化-inittable","link":"#_2-初始化-inittable","children":[]},{"level":3,"title":"3. put","slug":"_3-put-1","link":"#_3-put-1","children":[]},{"level":3,"title":"4. get","slug":"_4-get","link":"#_4-get","children":[]}]},{"level":2,"title":"3. 总结","slug":"_3-总结","link":"#_3-总结","children":[]}],"git":{"createdTime":null,"updatedTime":null,"contributors":[]},"readingTime":{"minutes":14.23,"words":4268},"filePathRelative":"note/java/容器/concurrent-hash-map-source-code.md","autoDesc":true,"excerpt":""}');export{e as data};
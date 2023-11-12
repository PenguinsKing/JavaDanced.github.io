const e=JSON.parse('{"key":"v-41c22357","path":"/note/%E7%BC%93%E5%AD%98/3-commonly-used-cache-read-and-write-strategies.html","title":"3种常用的缓存读写策略详解","lang":"zh-CN","frontmatter":{"title":"3种常用的缓存读写策略详解","category":"数据库","tag":["Redis"],"description":"看到很多小伙伴简历上写了“熟练使用缓存”，但是被我问到“缓存常用的 3 种读写策略”的时候却一脸懵逼。 在我看来，造成这个问题的原因是我们在学习 Redis 的时候，可能只是简单了写一些 Demo，并没有去关注缓存的读写策略，或者说压根不知道这回事。 但是，搞懂 3 种常见的缓存读写策略对于实际工作中使用缓存以及面试中被问到缓存都是非常有帮助的！ 下面...","head":[["meta",{"property":"og:url","content":"https://javadance.cn/note/%E7%BC%93%E5%AD%98/3-commonly-used-cache-read-and-write-strategies.html"}],["meta",{"property":"og:site_name","content":"企鹅君"}],["meta",{"property":"og:title","content":"3种常用的缓存读写策略详解"}],["meta",{"property":"og:description","content":"看到很多小伙伴简历上写了“熟练使用缓存”，但是被我问到“缓存常用的 3 种读写策略”的时候却一脸懵逼。 在我看来，造成这个问题的原因是我们在学习 Redis 的时候，可能只是简单了写一些 Demo，并没有去关注缓存的读写策略，或者说压根不知道这回事。 但是，搞懂 3 种常见的缓存读写策略对于实际工作中使用缓存以及面试中被问到缓存都是非常有帮助的！ 下面..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:author","content":"企鹅君"}],["meta",{"property":"article:tag","content":"Redis"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"3种常用的缓存读写策略详解\\",\\"image\\":[\\"\\"],\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"企鹅君\\",\\"url\\":\\"https://javadance.cn\\"}]}"]]},"headers":[{"level":3,"title":"Cache Aside Pattern（旁路缓存模式）","slug":"cache-aside-pattern-旁路缓存模式","link":"#cache-aside-pattern-旁路缓存模式","children":[]},{"level":3,"title":"Read/Write Through Pattern（读写穿透）","slug":"read-write-through-pattern-读写穿透","link":"#read-write-through-pattern-读写穿透","children":[]},{"level":3,"title":"Write Behind Pattern（异步缓存写入）","slug":"write-behind-pattern-异步缓存写入","link":"#write-behind-pattern-异步缓存写入","children":[]}],"git":{"createdTime":null,"updatedTime":null,"contributors":[]},"readingTime":{"minutes":5.47,"words":1640},"filePathRelative":"note/缓存/3-commonly-used-cache-read-and-write-strategies.md","autoDesc":true,"excerpt":""}');export{e as data};
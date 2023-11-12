const e=JSON.parse('{"key":"v-2ee3f458","path":"/note/java/%E5%AE%B9%E5%99%A8/linkedhashmap-source-code.html","title":"LinkedHashMap 源码分析","lang":"zh-CN","frontmatter":{"title":"LinkedHashMap 源码分析","category":"Java","tag":["Java集合"],"description":"LinkedHashMap 简介 LinkedHashMap 是 Java 提供的一个集合类，它继承自 HashMap，并在 HashMap 基础上维护一条双向链表，使得具备如下特性: 1. 支持遍历时会按照插入顺序有序进行迭代。 2. 支持按照元素访问顺序排序,适用于封装 LRU 缓存工具。 3. 因为内部使用双向链表维护各个节点，所以遍历时的效率和...","head":[["meta",{"property":"og:url","content":"https://javadance.cn/note/java/%E5%AE%B9%E5%99%A8/linkedhashmap-source-code.html"}],["meta",{"property":"og:site_name","content":"企鹅君"}],["meta",{"property":"og:title","content":"LinkedHashMap 源码分析"}],["meta",{"property":"og:description","content":"LinkedHashMap 简介 LinkedHashMap 是 Java 提供的一个集合类，它继承自 HashMap，并在 HashMap 基础上维护一条双向链表，使得具备如下特性: 1. 支持遍历时会按照插入顺序有序进行迭代。 2. 支持按照元素访问顺序排序,适用于封装 LRU 缓存工具。 3. 因为内部使用双向链表维护各个节点，所以遍历时的效率和..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:author","content":"企鹅君"}],["meta",{"property":"article:tag","content":"Java集合"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"LinkedHashMap 源码分析\\",\\"image\\":[\\"\\"],\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"企鹅君\\",\\"url\\":\\"https://javadance.cn\\"}]}"]]},"headers":[{"level":2,"title":"LinkedHashMap 简介","slug":"linkedhashmap-简介","link":"#linkedhashmap-简介","children":[]},{"level":2,"title":"LinkedHashMap 使用示例","slug":"linkedhashmap-使用示例","link":"#linkedhashmap-使用示例","children":[{"level":3,"title":"插入顺序遍历","slug":"插入顺序遍历","link":"#插入顺序遍历","children":[]},{"level":3,"title":"访问顺序遍历","slug":"访问顺序遍历","link":"#访问顺序遍历","children":[]},{"level":3,"title":"LRU 缓存","slug":"lru-缓存","link":"#lru-缓存","children":[]}]},{"level":2,"title":"LinkedHashMap 源码解析","slug":"linkedhashmap-源码解析","link":"#linkedhashmap-源码解析","children":[{"level":3,"title":"Node 的设计","slug":"node-的设计","link":"#node-的设计","children":[]},{"level":3,"title":"构造方法","slug":"构造方法","link":"#构造方法","children":[]},{"level":3,"title":"get 方法","slug":"get-方法","link":"#get-方法","children":[]},{"level":3,"title":"remove 方法后置操作——afterNodeRemoval","slug":"remove-方法后置操作——afternoderemoval","link":"#remove-方法后置操作——afternoderemoval","children":[]},{"level":3,"title":"put 方法后置操作——afterNodeInsertion","slug":"put-方法后置操作——afternodeinsertion","link":"#put-方法后置操作——afternodeinsertion","children":[]}]},{"level":2,"title":"LinkedHashMap 和 HashMap 遍历性能比较","slug":"linkedhashmap-和-hashmap-遍历性能比较","link":"#linkedhashmap-和-hashmap-遍历性能比较","children":[]},{"level":2,"title":"LinkedHashMap 常见面试题","slug":"linkedhashmap-常见面试题","link":"#linkedhashmap-常见面试题","children":[{"level":3,"title":"什么是 LinkedHashMap？","slug":"什么是-linkedhashmap","link":"#什么是-linkedhashmap","children":[]},{"level":3,"title":"LinkedHashMap 如何按照插入顺序迭代元素？","slug":"linkedhashmap-如何按照插入顺序迭代元素","link":"#linkedhashmap-如何按照插入顺序迭代元素","children":[]},{"level":3,"title":"LinkedHashMap 如何按照访问顺序迭代元素？","slug":"linkedhashmap-如何按照访问顺序迭代元素","link":"#linkedhashmap-如何按照访问顺序迭代元素","children":[]},{"level":3,"title":"LinkedHashMap 如何实现 LRU 缓存？","slug":"linkedhashmap-如何实现-lru-缓存","link":"#linkedhashmap-如何实现-lru-缓存","children":[]},{"level":3,"title":"LinkedHashMap 和 HashMap 有什么区别？","slug":"linkedhashmap-和-hashmap-有什么区别","link":"#linkedhashmap-和-hashmap-有什么区别","children":[]}]},{"level":2,"title":"参考文献","slug":"参考文献","link":"#参考文献","children":[]}],"git":{"createdTime":null,"updatedTime":null,"contributors":[]},"readingTime":{"minutes":19,"words":5700},"filePathRelative":"note/java/容器/linkedhashmap-source-code.md","autoDesc":true,"excerpt":""}');export{e as data};
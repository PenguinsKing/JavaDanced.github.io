const e=JSON.parse('{"key":"v-2a0f1a1b","path":"/note/%E6%95%B0%E6%8D%AE%E5%BA%93/mysql-index.html","title":"MySQL索引详解","lang":"zh-CN","frontmatter":{"title":"MySQL索引详解","category":"数据库","tag":["索引"],"order":2,"description":"作为一名Java老司机，应该清楚，数据库索引这个知识点在面试中基本上必问。 今天就来彻底搞懂他，跟随企鹅君，一往无前～ 索引介绍 MySQL官方对索引定义：是存储引擎用于快速查找记录的一种数据结构。需要额外开辟空间和数据维护工作。 ● 索引是物理数据页存储，在数据文件中（InnoDB，ibd文件），利用数据页(page)存储。 ● 索引可以加快检索速度...","head":[["meta",{"property":"og:url","content":"https://javadance.cn/note/%E6%95%B0%E6%8D%AE%E5%BA%93/mysql-index.html"}],["meta",{"property":"og:site_name","content":"企鹅君"}],["meta",{"property":"og:title","content":"MySQL索引详解"}],["meta",{"property":"og:description","content":"作为一名Java老司机，应该清楚，数据库索引这个知识点在面试中基本上必问。 今天就来彻底搞懂他，跟随企鹅君，一往无前～ 索引介绍 MySQL官方对索引定义：是存储引擎用于快速查找记录的一种数据结构。需要额外开辟空间和数据维护工作。 ● 索引是物理数据页存储，在数据文件中（InnoDB，ibd文件），利用数据页(page)存储。 ● 索引可以加快检索速度..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://javadance.cn/"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"name":"twitter:card","content":"summary_large_image"}],["meta",{"name":"twitter:image:alt","content":"MySQL索引详解"}],["meta",{"property":"article:author","content":"企鹅君"}],["meta",{"property":"article:tag","content":"索引"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"MySQL索引详解\\",\\"image\\":[\\"https://javadance.cn/\\"],\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"企鹅君\\",\\"url\\":\\"https://javadance.cn\\"}]}"]]},"headers":[{"level":2,"title":"索引介绍","slug":"索引介绍","link":"#索引介绍","children":[]},{"level":2,"title":"索引数据结构模型","slug":"索引数据结构模型","link":"#索引数据结构模型","children":[{"level":3,"title":"Hash 表","slug":"hash-表","link":"#hash-表","children":[]},{"level":3,"title":"二叉搜索树(BST)","slug":"二叉搜索树-bst","link":"#二叉搜索树-bst","children":[]},{"level":3,"title":"AVL 树","slug":"avl-树","link":"#avl-树","children":[]},{"level":3,"title":"B-树","slug":"b-树","link":"#b-树","children":[]},{"level":3,"title":"B+树","slug":"b-树-1","link":"#b-树-1","children":[]},{"level":3,"title":"B+树与B-树的区别","slug":"b-树与b-树的区别","link":"#b-树与b-树的区别","children":[]}]},{"level":2,"title":"索引类型","slug":"索引类型","link":"#索引类型","children":[{"level":3,"title":"按照数据模型维度划分：","slug":"按照数据模型维度划分","link":"#按照数据模型维度划分","children":[]},{"level":3,"title":"按照功能逻辑维度划分：","slug":"按照功能逻辑维度划分","link":"#按照功能逻辑维度划分","children":[]},{"level":3,"title":"从底层存储方式维度划分：","slug":"从底层存储方式维度划分","link":"#从底层存储方式维度划分","children":[]}]},{"level":2,"title":"索引概念","slug":"索引概念","link":"#索引概念","children":[{"level":3,"title":"回表查询","slug":"回表查询","link":"#回表查询","children":[]},{"level":3,"title":"主键索引","slug":"主键索引","link":"#主键索引","children":[]},{"level":3,"title":"二级索引(辅助索引)","slug":"二级索引-辅助索引","link":"#二级索引-辅助索引","children":[]},{"level":3,"title":"索引覆盖","slug":"索引覆盖","link":"#索引覆盖","children":[]},{"level":3,"title":"最左匹配原则","slug":"最左匹配原则","link":"#最左匹配原则","children":[]},{"level":3,"title":"索引下推","slug":"索引下推","link":"#索引下推","children":[]}]},{"level":2,"title":"索引为什么会失效","slug":"索引为什么会失效","link":"#索引为什么会失效","children":[]},{"level":2,"title":"正确使用索引","slug":"正确使用索引","link":"#正确使用索引","children":[]},{"level":2,"title":"如何分析sql使用索引情况","slug":"如何分析sql使用索引情况","link":"#如何分析sql使用索引情况","children":[]}],"git":{"createdTime":null,"updatedTime":null,"contributors":[]},"readingTime":{"minutes":19.78,"words":5935},"filePathRelative":"note/数据库/mysql-index.md","autoDesc":true,"excerpt":""}');export{e as data};
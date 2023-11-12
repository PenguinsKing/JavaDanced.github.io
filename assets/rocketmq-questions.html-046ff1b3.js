const e=JSON.parse('{"key":"v-2cd0cbc9","path":"/note/%E4%B8%AD%E9%97%B4%E4%BB%B6/mq/message-queue/rocketmq-questions.html","title":"RocketMQ常见问题总结","lang":"zh-CN","frontmatter":{"title":"RocketMQ常见问题总结","category":"高性能","tag":["RocketMQ","消息队列"],"description":"本文由 FrancisQ 投稿！ (https://mp.weixin.qq.com/s?_biz=Mzg2OTA0Njk0OA==&mid=2247485969&idx=1&sn=6bd53abde30d42a778d5a35ec104428c&chksm=cea245daf9d5cccce631f93115f0c2c4a7634e55f5bef90...","head":[["meta",{"property":"og:url","content":"https://javadance.cn/note/%E4%B8%AD%E9%97%B4%E4%BB%B6/mq/message-queue/rocketmq-questions.html"}],["meta",{"property":"og:site_name","content":"企鹅君"}],["meta",{"property":"og:title","content":"RocketMQ常见问题总结"}],["meta",{"property":"og:description","content":"本文由 FrancisQ 投稿！ (https://mp.weixin.qq.com/s?_biz=Mzg2OTA0Njk0OA==&mid=2247485969&idx=1&sn=6bd53abde30d42a778d5a35ec104428c&chksm=cea245daf9d5cccce631f93115f0c2c4a7634e55f5bef90..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:author","content":"企鹅君"}],["meta",{"property":"article:tag","content":"RocketMQ"}],["meta",{"property":"article:tag","content":"消息队列"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"RocketMQ常见问题总结\\",\\"image\\":[\\"\\"],\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"企鹅君\\",\\"url\\":\\"https://javadance.cn\\"}]}"]]},"headers":[{"level":2,"title":"消息队列扫盲","slug":"消息队列扫盲","link":"#消息队列扫盲","children":[{"level":3,"title":"消息队列为什么会出现？","slug":"消息队列为什么会出现","link":"#消息队列为什么会出现","children":[]},{"level":3,"title":"消息队列能用来干什么？","slug":"消息队列能用来干什么","link":"#消息队列能用来干什么","children":[]}]},{"level":2,"title":"RocketMQ 是什么？","slug":"rocketmq-是什么","link":"#rocketmq-是什么","children":[]},{"level":2,"title":"队列模型和主题模型是什么？","slug":"队列模型和主题模型是什么","link":"#队列模型和主题模型是什么","children":[{"level":3,"title":"队列模型","slug":"队列模型","link":"#队列模型","children":[]},{"level":3,"title":"主题模型","slug":"主题模型","link":"#主题模型","children":[]},{"level":3,"title":"RocketMQ 中的消息模型","slug":"rocketmq-中的消息模型","link":"#rocketmq-中的消息模型","children":[]}]},{"level":2,"title":"RocketMQ 的架构图","slug":"rocketmq-的架构图","link":"#rocketmq-的架构图","children":[]},{"level":2,"title":"RocketMQ 功能特性","slug":"rocketmq-功能特性","link":"#rocketmq-功能特性","children":[{"level":3,"title":"消息","slug":"消息","link":"#消息","children":[]}]},{"level":2,"title":"关于发送消息","slug":"关于发送消息","link":"#关于发送消息","children":[{"level":3,"title":"不建议单一进程创建大量生产者","slug":"不建议单一进程创建大量生产者","link":"#不建议单一进程创建大量生产者","children":[]},{"level":3,"title":"不建议频繁创建和销毁生产者","slug":"不建议频繁创建和销毁生产者","link":"#不建议频繁创建和销毁生产者","children":[]}]},{"level":2,"title":"消费者分类","slug":"消费者分类","link":"#消费者分类","children":[{"level":3,"title":"PushConsumer","slug":"pushconsumer","link":"#pushconsumer","children":[]},{"level":3,"title":"SimpleConsumer","slug":"simpleconsumer","link":"#simpleconsumer","children":[]},{"level":3,"title":"PullConsumer","slug":"pullconsumer","link":"#pullconsumer","children":[]}]},{"level":2,"title":"消费者分组和生产者分组","slug":"消费者分组和生产者分组","link":"#消费者分组和生产者分组","children":[{"level":3,"title":"生产者分组","slug":"生产者分组","link":"#生产者分组","children":[]},{"level":3,"title":"消费者分组","slug":"消费者分组","link":"#消费者分组","children":[]}]},{"level":2,"title":"如何解决顺序消费和重复消费？","slug":"如何解决顺序消费和重复消费","link":"#如何解决顺序消费和重复消费","children":[{"level":3,"title":"顺序消费","slug":"顺序消费","link":"#顺序消费","children":[]},{"level":3,"title":"特殊情况处理","slug":"特殊情况处理","link":"#特殊情况处理","children":[]},{"level":3,"title":"重复消费","slug":"重复消费","link":"#重复消费","children":[]}]},{"level":2,"title":"RocketMQ 如何实现分布式事务？","slug":"rocketmq-如何实现分布式事务","link":"#rocketmq-如何实现分布式事务","children":[]},{"level":2,"title":"如何解决消息堆积问题？","slug":"如何解决消息堆积问题","link":"#如何解决消息堆积问题","children":[]},{"level":2,"title":"什么是回溯消费？","slug":"什么是回溯消费","link":"#什么是回溯消费","children":[]},{"level":2,"title":"RocketMQ 如何保证高性能读写","slug":"rocketmq-如何保证高性能读写","link":"#rocketmq-如何保证高性能读写","children":[{"level":3,"title":"传统 IO 方式","slug":"传统-io-方式","link":"#传统-io-方式","children":[]},{"level":3,"title":"零拷贝技术","slug":"零拷贝技术","link":"#零拷贝技术","children":[]}]},{"level":2,"title":"RocketMQ 的刷盘机制","slug":"rocketmq-的刷盘机制","link":"#rocketmq-的刷盘机制","children":[{"level":3,"title":"同步刷盘和异步刷盘","slug":"同步刷盘和异步刷盘","link":"#同步刷盘和异步刷盘","children":[]},{"level":3,"title":"同步复制和异步复制","slug":"同步复制和异步复制","link":"#同步复制和异步复制","children":[]},{"level":3,"title":"存储机制","slug":"存储机制","link":"#存储机制","children":[]}]},{"level":2,"title":"总结","slug":"总结","link":"#总结","children":[]}],"git":{"createdTime":null,"updatedTime":null,"contributors":[]},"readingTime":{"minutes":53.43,"words":16029},"filePathRelative":"note/中间件/mq/message-queue/rocketmq-questions.md","autoDesc":true,"excerpt":""}');export{e as data};

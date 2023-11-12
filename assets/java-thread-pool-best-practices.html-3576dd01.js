import{_ as o}from"./plugin-vue_export-helper-c27b6911.js";import{r as p,o as c,c as l,a as n,b as a,d as e,e as t}from"./app-a569c9af.js";const i={},u=t(`<p>简单总结一下我了解的使用线程池的时候应该注意的东西，网上似乎还没有专门写这方面的文章。</p><h2 id="_1、正确声明线程池" tabindex="-1"><a class="header-anchor" href="#_1、正确声明线程池" aria-hidden="true">#</a> 1、正确声明线程池</h2><p><strong>线程池必须手动通过 <code>ThreadPoolExecutor</code> 的构造函数来声明，避免使用<code>Executors</code> 类创建线程池，会有 OOM 风险。</strong></p><p><code>Executors</code> 返回线程池对象的弊端如下(后文会详细介绍到)：</p><ul><li><strong><code>FixedThreadPool</code> 和 <code>SingleThreadExecutor</code></strong>：使用的是无界的 <code>LinkedBlockingQueue</code>，任务队列最大长度为 <code>Integer.MAX_VALUE</code>,可能堆积大量的请求，从而导致 OOM。</li><li><strong><code>CachedThreadPool</code></strong>：使用的是同步队列 <code>SynchronousQueue</code>, 允许创建的线程数量为 <code>Integer.MAX_VALUE</code> ，可能会创建大量线程，从而导致 OOM。</li><li><strong><code>ScheduledThreadPool</code> 和 <code>SingleThreadScheduledExecutor</code></strong> : 使用的无界的延迟阻塞队列<code>DelayedWorkQueue</code>，任务队列最大长度为 <code>Integer.MAX_VALUE</code>,可能堆积大量的请求，从而导致 OOM。</li></ul><p>说白了就是：<strong>使用有界队列，控制线程创建数量。</strong></p><p>除了避免 OOM 的原因之外，不推荐使用 <code>Executors</code>提供的两种快捷的线程池的原因还有：</p><ul><li>实际使用中需要根据自己机器的性能、业务场景来手动配置线程池的参数比如核心线程数、使用的任务队列、饱和策略等等。</li><li>我们应该显示地给我们的线程池命名，这样有助于我们定位问题。</li></ul><h2 id="_2、监测线程池运行状态" tabindex="-1"><a class="header-anchor" href="#_2、监测线程池运行状态" aria-hidden="true">#</a> 2、监测线程池运行状态</h2><p>你可以通过一些手段来检测线程池的运行状态比如 SpringBoot 中的 Actuator 组件。</p><p>除此之外，我们还可以利用 <code>ThreadPoolExecutor</code> 的相关 API 做一个简陋的监控。从下图可以看出， <code>ThreadPoolExecutor</code>提供了获取线程池当前的线程数和活跃线程数、已经执行完成的任务数、正在排队中的任务数等等。</p><figure><img src="https://oss.javaguide.cn/github/javaguide/java/concurrent/threadpool-methods-information.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>下面是一个简单的 Demo。<code>printThreadPoolStatus()</code>会每隔一秒打印出线程池的线程数、活跃线程数、完成的任务数、以及队列中的任务数。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token doc-comment comment">/**
 * 打印线程池的状态
 *
 * <span class="token keyword">@param</span> <span class="token parameter">threadPool</span> 线程池对象
 */</span>
<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">printThreadPoolStatus</span><span class="token punctuation">(</span><span class="token class-name">ThreadPoolExecutor</span> threadPool<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">ScheduledExecutorService</span> scheduledExecutorService <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ScheduledThreadPoolExecutor</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token function">createThreadFactory</span><span class="token punctuation">(</span><span class="token string">&quot;print-images/thread-pool-status&quot;</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    scheduledExecutorService<span class="token punctuation">.</span><span class="token function">scheduleAtFixedRate</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
        log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;=========================&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;ThreadPool Size: [{}]&quot;</span><span class="token punctuation">,</span> threadPool<span class="token punctuation">.</span><span class="token function">getPoolSize</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;Active Threads: {}&quot;</span><span class="token punctuation">,</span> threadPool<span class="token punctuation">.</span><span class="token function">getActiveCount</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;Number of Tasks : {}&quot;</span><span class="token punctuation">,</span> threadPool<span class="token punctuation">.</span><span class="token function">getCompletedTaskCount</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;Number of Tasks in Queue: {}&quot;</span><span class="token punctuation">,</span> threadPool<span class="token punctuation">.</span><span class="token function">getQueue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;=========================&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token class-name">TimeUnit</span><span class="token punctuation">.</span><span class="token constant">SECONDS</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3、建议不同类别的业务用不同的线程池" tabindex="-1"><a class="header-anchor" href="#_3、建议不同类别的业务用不同的线程池" aria-hidden="true">#</a> 3、建议不同类别的业务用不同的线程池</h2><p>很多人在实际项目中都会有类似这样的问题：<strong>我的项目中多个业务需要用到线程池，是为每个线程池都定义一个还是说定义一个公共的线程池呢？</strong></p><p>一般建议是不同的业务使用不同的线程池，配置线程池的时候根据当前业务的情况对当前线程池进行配置，因为不同的业务的并发以及对资源的使用情况都不同，重心优化系统性能瓶颈相关的业务。</p>`,17),r=n("strong",null,"我们再来看一个真实的事故案例！",-1),d={href:"https://heapdump.cn/article/646639",target:"_blank",rel:"noopener noreferrer"},k=t(`<figure><img src="https://oss.javaguide.cn/github/javaguide/java/concurrent/production-accident-threadpool-sharing-example.png" alt="案例代码概览" tabindex="0" loading="lazy"><figcaption>案例代码概览</figcaption></figure><p>上面的代码可能会存在死锁的情况，为什么呢？画个图给大家捋一捋。</p><p>试想这样一种极端情况：假如我们线程池的核心线程数为 <strong>n</strong>，父任务（扣费任务）数量为 <strong>n</strong>，父任务下面有两个子任务（扣费任务下的子任务），其中一个已经执行完成，另外一个被放在了任务队列中。由于父任务把线程池核心线程资源用完，所以子任务因为无法获取到线程资源无法正常执行，一直被阻塞在队列中。父任务等待子任务执行完成，而子任务等待父任务释放线程池资源，这也就造成了 <strong>&quot;死锁&quot;</strong> 。</p><figure><img src="https://oss.javaguide.cn/github/javaguide/java/concurrent/production-accident-threadpool-sharing-deadlock.png" alt="线程池使用不当导致死锁" tabindex="0" loading="lazy"><figcaption>线程池使用不当导致死锁</figcaption></figure><p>解决方法也很简单，就是新增加一个用于执行子任务的线程池专门为其服务。</p><h2 id="_4、别忘记给线程池命名" tabindex="-1"><a class="header-anchor" href="#_4、别忘记给线程池命名" aria-hidden="true">#</a> 4、别忘记给线程池命名</h2><p>初始化线程池的时候需要显示命名（设置线程池名称前缀），有利于定位问题。</p><p>默认情况下创建的线程名字类似 <code>pool-1-thread-n</code> 这样的，没有业务含义，不利于我们定位问题。</p><p>给线程池里的线程命名通常有下面两种方式：</p><p><strong>1、利用 guava 的 <code>ThreadFactoryBuilder</code></strong></p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token class-name">ThreadFactory</span> threadFactory <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ThreadFactoryBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                        <span class="token punctuation">.</span><span class="token function">setNameFormat</span><span class="token punctuation">(</span>threadNamePrefix <span class="token operator">+</span> <span class="token string">&quot;-%d&quot;</span><span class="token punctuation">)</span>
                        <span class="token punctuation">.</span><span class="token function">setDaemon</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">ExecutorService</span> threadPool <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ThreadPoolExecutor</span><span class="token punctuation">(</span>corePoolSize<span class="token punctuation">,</span> maximumPoolSize<span class="token punctuation">,</span> keepAliveTime<span class="token punctuation">,</span> <span class="token class-name">TimeUnit</span><span class="token punctuation">.</span><span class="token constant">MINUTES</span><span class="token punctuation">,</span> workQueue<span class="token punctuation">,</span> threadFactory<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>2、自己实现 <code>ThreadFactory</code>。</strong></p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span>concurrent<span class="token punctuation">.</span></span><span class="token class-name">Executors</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span>concurrent<span class="token punctuation">.</span></span><span class="token class-name">ThreadFactory</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span>concurrent<span class="token punctuation">.</span>atomic<span class="token punctuation">.</span></span><span class="token class-name">AtomicInteger</span></span><span class="token punctuation">;</span>
<span class="token doc-comment comment">/**
 * 线程工厂，它设置线程名称，有利于我们定位问题。
 */</span>
<span class="token keyword">public</span> <span class="token keyword">final</span> <span class="token keyword">class</span> <span class="token class-name">NamingThreadFactory</span> <span class="token keyword">implements</span> <span class="token class-name">ThreadFactory</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">AtomicInteger</span> threadNum <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">AtomicInteger</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">ThreadFactory</span> delegate<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 创建一个带名字的线程池生产工厂
     */</span>
    <span class="token keyword">public</span> <span class="token class-name">NamingThreadFactory</span><span class="token punctuation">(</span><span class="token class-name">ThreadFactory</span> delegate<span class="token punctuation">,</span> <span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>delegate <span class="token operator">=</span> delegate<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span> <span class="token comment">// TODO consider uniquifying this</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">Thread</span> <span class="token function">newThread</span><span class="token punctuation">(</span><span class="token class-name">Runnable</span> r<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Thread</span> t <span class="token operator">=</span> delegate<span class="token punctuation">.</span><span class="token function">newThread</span><span class="token punctuation">(</span>r<span class="token punctuation">)</span><span class="token punctuation">;</span>
        t<span class="token punctuation">.</span><span class="token function">setName</span><span class="token punctuation">(</span>name <span class="token operator">+</span> <span class="token string">&quot; [#&quot;</span> <span class="token operator">+</span> threadNum<span class="token punctuation">.</span><span class="token function">incrementAndGet</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot;]&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> t<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5、正确配置线程池参数" tabindex="-1"><a class="header-anchor" href="#_5、正确配置线程池参数" aria-hidden="true">#</a> 5、正确配置线程池参数</h2><p>说到如何给线程池配置参数，美团的骚操作至今让我难忘（后面会提到）！</p><p>我们先来看一下各种书籍和博客上一般推荐的配置线程池参数的方式，可以作为参考。</p><h3 id="常规操作" tabindex="-1"><a class="header-anchor" href="#常规操作" aria-hidden="true">#</a> 常规操作</h3><p>很多人甚至可能都会觉得把线程池配置过大一点比较好！我觉得这明显是有问题的。就拿我们生活中非常常见的一例子来说：<strong>并不是人多就能把事情做好，增加了沟通交流成本。你本来一件事情只需要 3 个人做，你硬是拉来了 6 个人，会提升做事效率嘛？我想并不会。</strong> 线程数量过多的影响也是和我们分配多少人做事情一样，对于多线程这个场景来说主要是增加了<strong>上下文切换</strong> 成本。不清楚什么是上下文切换的话，可以看我下面的介绍。</p><blockquote><p>上下文切换：</p><p>多线程编程中一般线程的个数都大于 CPU 核心的个数，而一个 CPU 核心在任意时刻只能被一个线程使用，为了让这些线程都能得到有效执行，CPU 采取的策略是为每个线程分配时间片并轮转的形式。当一个线程的时间片用完的时候就会重新处于就绪状态让给其他线程使用，这个过程就属于一次上下文切换。概括来说就是：当前任务在执行完 CPU 时间片切换到另一个任务之前会先保存自己的状态，以便下次再切换回这个任务时，可以再加载这个任务的状态。<strong>任务从保存到再加载的过程就是一次上下文切换</strong>。</p><p>上下文切换通常是计算密集型的。也就是说，它需要相当可观的处理器时间，在每秒几十上百次的切换中，每次切换都需要纳秒量级的时间。所以，上下文切换对系统来说意味着消耗大量的 CPU 时间，事实上，可能是操作系统中时间消耗最大的操作。</p><p>Linux 相比与其他操作系统（包括其他类 Unix 系统）有很多的优点，其中有一项就是，其上下文切换和模式切换的时间消耗非常少。</p></blockquote><p>类比于实现世界中的人类通过合作做某件事情，我们可以肯定的一点是线程池大小设置过大或者过小都会有问题，合适的才是最好。</p><ul><li>如果我们设置的线程池数量太小的话，如果同一时间有大量任务/请求需要处理，可能会导致大量的请求/任务在任务队列中排队等待执行，甚至会出现任务队列满了之后任务/请求无法处理的情况，或者大量任务堆积在任务队列导致 OOM。这样很明显是有问题的，CPU 根本没有得到充分利用。</li><li>如果我们设置线程数量太大，大量线程可能会同时在争取 CPU 资源，这样会导致大量的上下文切换，从而增加线程的执行时间，影响了整体执行效率。</li></ul><p>有一个简单并且适用面比较广的公式：</p><ul><li><strong>CPU 密集型任务(N+1)：</strong> 这种任务消耗的主要是 CPU 资源，可以将线程数设置为 N（CPU 核心数）+1。比 CPU 核心数多出来的一个线程是为了防止线程偶发的缺页中断，或者其它原因导致的任务暂停而带来的影响。一旦任务暂停，CPU 就会处于空闲状态，而在这种情况下多出来的一个线程就可以充分利用 CPU 的空闲时间。</li><li><strong>I/O 密集型任务(2N)：</strong> 这种任务应用起来，系统会用大部分的时间来处理 I/O 交互，而线程在处理 I/O 的时间段内不会占用 CPU 来处理，这时就可以将 CPU 交出给其它线程使用。因此在 I/O 密集型任务的应用中，我们可以多配置一些线程，具体的计算方法是 2N。</li></ul><p><strong>如何判断是 CPU 密集任务还是 IO 密集任务？</strong></p><p>CPU 密集型简单理解就是利用 CPU 计算能力的任务比如你在内存中对大量数据进行排序。但凡涉及到网络读取，文件读取这类都是 IO 密集型，这类任务的特点是 CPU 计算耗费时间相比于等待 IO 操作完成的时间来说很少，大部分时间都花在了等待 IO 操作完成上。</p>`,25),m={href:"https://github.com/Snailclimb/JavaGuide/issues/1737",target:"_blank",rel:"noopener noreferrer"},v=t('<p>线程数更严谨的计算的方法应该是：<code>最佳线程数 = N（CPU 核心数）∗（1+WT（线程等待时间）/ST（线程计算时间））</code>，其中 <code>WT（线程等待时间）=线程运行总时间 - ST（线程计算时间）</code>。</p><p>线程等待时间所占比例越高，需要越多线程。线程计算时间所占比例越高，需要越少线程。</p><p>我们可以通过 JDK 自带的工具 VisualVM 来查看 <code>WT/ST</code> 比例。</p><p>CPU 密集型任务的 <code>WT/ST</code> 接近或者等于 0，因此， 线程数可以设置为 N（CPU 核心数）∗（1+0）= N，和我们上面说的 N（CPU 核心数）+1 差不多。</p><p>IO 密集型任务下，几乎全是线程等待时间，从理论上来说，你就可以将线程数设置为 2N（按道理来说，WT/ST 的结果应该比较大，这里选择 2N 的原因应该是为了避免创建过多线程吧）。</p><p><strong>注意</strong>：上面提到的公示也只是参考，实际项目不太可能直接按照公式来设置线程池参数，毕竟不同的业务场景对应的需求不同，具体还是要根据项目实际线上运行情况来动态调整。接下来介绍的美团的线程池参数动态配置这种方案就非常不错，很实用！</p><h3 id="美团的骚操作" tabindex="-1"><a class="header-anchor" href="#美团的骚操作" aria-hidden="true">#</a> 美团的骚操作</h3>',7),h={href:"https://tech.meituan.com/2020/04/02/java-pooling-pratice-in-meituan.html",target:"_blank",rel:"noopener noreferrer"},g=t("<p>美团技术团队的思路是主要对线程池的核心参数实现自定义可配置。这三个核心参数是：</p><ul><li><strong><code>corePoolSize</code> :</strong> 核心线程数线程数定义了最小可以同时运行的线程数量。</li><li><strong><code>maximumPoolSize</code> :</strong> 当队列中存放的任务达到队列容量的时候，当前可以同时运行的线程数量变为最大线程数。</li><li><strong><code>workQueue</code>:</strong> 当新任务来的时候会先判断当前运行的线程数量是否达到核心线程数，如果达到的话，新任务就会被存放在队列中。</li></ul><p><strong>为什么是这三个参数？</strong></p>",3),b={href:"https://mp.weixin.qq.com/s?__biz=Mzg2OTA0Njk0OA==&mid=2247485808&idx=1&sn=1013253533d73450cef673aee13267ab&chksm=cea246bbf9d5cfad1c21316340a0ef1609a7457fea4113a1f8d69e8c91e7d9cd6285f5ee1490&token=510053261&lang=zh_CN&scene=21#wechat_redirect",target:"_blank",rel:"noopener noreferrer"},f=n("code",null,"ThreadPoolExecutor",-1),x=t('<p><strong>如何支持参数动态配置？</strong> 且看 <code>ThreadPoolExecutor</code> 提供的下面这些方法。</p><figure><img src="https://oss.javaguide.cn/github/javaguide/java/concurrent/threadpoolexecutor-methods.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>格外需要注意的是<code>corePoolSize</code>， 程序运行期间的时候，我们调用 <code>setCorePoolSize（）</code>这个方法的话，线程池会首先判断当前工作线程数是否大于<code>corePoolSize</code>，如果大于的话就会回收工作线程。</p><p>另外，你也看到了上面并没有动态指定队列长度的方法，美团的方式是自定义了一个叫做 <code>ResizableCapacityLinkedBlockIngQueue</code> 的队列（主要就是把<code>LinkedBlockingQueue</code>的 capacity 字段的 final 关键字修饰给去掉了，让它变为可变的）。</p><p>最终实现的可动态修改线程池参数效果如下。👏👏👏</p><figure><img src="https://oss.javaguide.cn/github/javaguide/java/concurrent/meituan-dynamically-configuring-thread-pool-parameters.png" alt="动态配置线程池参数最终效果" tabindex="0" loading="lazy"><figcaption>动态配置线程池参数最终效果</figcaption></figure><p>如果我们的项目也想要实现这种效果的话，可以借助现成的开源项目：</p>',7),T={href:"https://github.com/opengoofy/hippo4j",target:"_blank",rel:"noopener noreferrer"},P={href:"https://github.com/dromara/dynamic-tp",target:"_blank",rel:"noopener noreferrer"},y=t(`<h2 id="_6、别忘记关闭线程池" tabindex="-1"><a class="header-anchor" href="#_6、别忘记关闭线程池" aria-hidden="true">#</a> 6、别忘记关闭线程池</h2><p>当线程池不再需要使用时，应该显式地关闭线程池，释放线程资源。</p><p>线程池提供了两个关闭方法：</p><ul><li><strong><code>shutdown（）</code></strong> :关闭线程池，线程池的状态变为 <code>SHUTDOWN</code>。线程池不再接受新任务了，但是队列里的任务得执行完毕。</li><li><strong><code>shutdownNow（）</code></strong> :关闭线程池，线程池的状态变为 <code>STOP</code>。线程池会终止当前正在运行的任务，停止处理排队的任务并返回正在等待执行的 List。</li></ul><p>调用完 <code>shutdownNow</code> 和 <code>shuwdown</code> 方法后，并不代表线程池已经完成关闭操作，它只是异步的通知线程池进行关闭处理。如果要同步等待线程池彻底关闭后才继续往下执行，需要调用<code>awaitTermination</code>方法进行同步等待。</p><p>在调用 <code>awaitTermination()</code> 方法时，应该设置合理的超时时间，以避免程序长时间阻塞而导致性能问题。另外。由于线程池中的任务可能会被取消或抛出异常，因此在使用 <code>awaitTermination()</code> 方法时还需要进行异常处理。<code>awaitTermination()</code> 方法会抛出 <code>InterruptedException</code> 异常，需要捕获并处理该异常，以避免程序崩溃或者无法正常退出。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">// ...</span>
<span class="token comment">// 关闭线程池</span>
executor<span class="token punctuation">.</span><span class="token function">shutdown</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">try</span> <span class="token punctuation">{</span>
    <span class="token comment">// 等待线程池关闭，最多等待5分钟</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>executor<span class="token punctuation">.</span><span class="token function">awaitTermination</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">,</span> <span class="token class-name">TimeUnit</span><span class="token punctuation">.</span><span class="token constant">MINUTES</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 如果等待超时，则打印日志</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>err<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;线程池未能在5分钟内完全关闭&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">InterruptedException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 异常处理</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_7、线程池尽量不要放耗时任务" tabindex="-1"><a class="header-anchor" href="#_7、线程池尽量不要放耗时任务" aria-hidden="true">#</a> 7、线程池尽量不要放耗时任务</h2><p>线程池本身的目的是为了提高任务执行效率，避免因频繁创建和销毁线程而带来的性能开销。如果将耗时任务提交到线程池中执行，可能会导致线程池中的线程被长时间占用，无法及时响应其他任务，甚至会导致线程池崩溃或者程序假死。</p><p>因此，在使用线程池时，我们应该尽量避免将耗时任务提交到线程池中执行。对于一些比较耗时的操作，如网络请求、文件读写等，可以采用异步操作的方式来处理，以避免阻塞线程池中的线程。</p><h2 id="_8、线程池使用的一些小坑" tabindex="-1"><a class="header-anchor" href="#_8、线程池使用的一些小坑" aria-hidden="true">#</a> 8、线程池使用的一些小坑</h2><h3 id="重复创建线程池的坑" tabindex="-1"><a class="header-anchor" href="#重复创建线程池的坑" aria-hidden="true">#</a> 重复创建线程池的坑</h3><p>线程池是可以复用的，一定不要频繁创建线程池比如一个用户请求到了就单独创建一个线程池。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">&quot;wrong&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">wrong</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">InterruptedException</span> <span class="token punctuation">{</span>
    <span class="token comment">// 自定义线程池</span>
    <span class="token class-name">ThreadPoolExecutor</span> executor <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ThreadPoolExecutor</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">,</span><span class="token number">10</span><span class="token punctuation">,</span><span class="token number">1L</span><span class="token punctuation">,</span><span class="token class-name">TimeUnit</span><span class="token punctuation">.</span><span class="token constant">SECONDS</span><span class="token punctuation">,</span><span class="token keyword">new</span> <span class="token class-name">ArrayBlockingQueue</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token keyword">new</span> <span class="token class-name">ThreadPoolExecutor<span class="token punctuation">.</span>CallerRunsPolicy</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">//  处理任务</span>
    executor<span class="token punctuation">.</span><span class="token function">execute</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
      <span class="token comment">// ......</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token string">&quot;OK&quot;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>出现这种问题的原因还是对于线程池认识不够，需要加强线程池的基础知识。</p><h3 id="spring-内部线程池的坑" tabindex="-1"><a class="header-anchor" href="#spring-内部线程池的坑" aria-hidden="true">#</a> Spring 内部线程池的坑</h3><p>使用 Spring 内部线程池时，一定要手动自定义线程池，配置合理的参数，不然会出现生产问题（一个请求创建一个线程）。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Configuration</span>
<span class="token annotation punctuation">@EnableAsync</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ThreadPoolExecutorConfig</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Bean</span><span class="token punctuation">(</span>name<span class="token operator">=</span><span class="token string">&quot;threadPoolExecutor&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">Executor</span> <span class="token function">threadPoolExecutor</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token class-name">ThreadPoolTaskExecutor</span> threadPoolExecutor <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ThreadPoolTaskExecutor</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> processNum <span class="token operator">=</span> <span class="token class-name">Runtime</span><span class="token punctuation">.</span><span class="token function">getRuntime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">availableProcessors</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 返回可用处理器的Java虚拟机的数量</span>
        <span class="token keyword">int</span> corePoolSize <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>processNum <span class="token operator">/</span> <span class="token punctuation">(</span><span class="token number">1</span> <span class="token operator">-</span> <span class="token number">0.2</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> maxPoolSize <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>processNum <span class="token operator">/</span> <span class="token punctuation">(</span><span class="token number">1</span> <span class="token operator">-</span> <span class="token number">0.5</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        threadPoolExecutor<span class="token punctuation">.</span><span class="token function">setCorePoolSize</span><span class="token punctuation">(</span>corePoolSize<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 核心池大小</span>
        threadPoolExecutor<span class="token punctuation">.</span><span class="token function">setMaxPoolSize</span><span class="token punctuation">(</span>maxPoolSize<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 最大线程数</span>
        threadPoolExecutor<span class="token punctuation">.</span><span class="token function">setQueueCapacity</span><span class="token punctuation">(</span>maxPoolSize <span class="token operator">*</span> <span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 队列程度</span>
        threadPoolExecutor<span class="token punctuation">.</span><span class="token function">setThreadPriority</span><span class="token punctuation">(</span><span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token constant">MAX_PRIORITY</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        threadPoolExecutor<span class="token punctuation">.</span><span class="token function">setDaemon</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        threadPoolExecutor<span class="token punctuation">.</span><span class="token function">setKeepAliveSeconds</span><span class="token punctuation">(</span><span class="token number">300</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">// 线程空闲时间</span>
        threadPoolExecutor<span class="token punctuation">.</span><span class="token function">setThreadNamePrefix</span><span class="token punctuation">(</span><span class="token string">&quot;test-Executor-&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 线程名字前缀</span>
        <span class="token keyword">return</span> threadPoolExecutor<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="线程池和-threadlocal-共用的坑" tabindex="-1"><a class="header-anchor" href="#线程池和-threadlocal-共用的坑" aria-hidden="true">#</a> 线程池和 ThreadLocal 共用的坑</h3><p>线程池和 <code>ThreadLocal</code>共用，可能会导致线程从<code>ThreadLocal</code>获取到的是旧值/脏数据。这是因为线程池会复用线程对象，与线程对象绑定的类的静态属性 <code>ThreadLocal</code> 变量也会被重用，这就导致一个线程可能获取到其他线程的<code>ThreadLocal</code> 值。</p><p>不要以为代码中没有显示使用线程池就不存在线程池了，像常用的 Web 服务器 Tomcat 处理任务为了提高并发量，就使用到了线程池，并且使用的是基于原生 Java 线程池改进完善得到的自定义线程池。</p><p>当然了，你可以将 Tomcat 设置为单线程处理任务。不过，这并不合适，会严重影响其处理任务的速度。</p><div class="language-properties line-numbers-mode" data-ext="properties"><pre class="language-properties"><code><span class="token key attr-name">server.tomcat.max-threads</span><span class="token punctuation">=</span><span class="token value attr-value">1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>解决上述问题比较建议的办法是使用阿里巴巴开源的 <code>TransmittableThreadLocal</code>(<code>TTL</code>)。<code>TransmittableThreadLocal</code>类继承并加强了 JDK 内置的<code>InheritableThreadLocal</code>类，在使用线程池等会池化复用线程的执行组件情况下，提供<code>ThreadLocal</code>值的传递功能，解决异步执行时上下文传递的问题。</p>`,24),_=n("code",null,"TransmittableThreadLocal",-1),w={href:"https://github.com/alibaba/transmittable-thread-local",target:"_blank",rel:"noopener noreferrer"},S=n("p",null,"File not found",-1);function E(j,C){const s=p("ExternalLinkIcon");return c(),l("div",null,[u,n("p",null,[r,a(" (本案例来源自："),n("a",d,[a("《线程池运用不当的一次线上事故》"),e(s)]),a(" ，很精彩的一个案例)")]),k,n("p",null,[a("🌈 拓展一下（参见："),n("a",m,[a("issue#1737"),e(s)]),a("）：")]),v,n("p",null,[a("美团技术团队在"),n("a",h,[a("《Java 线程池实现原理及其在美团业务中的实践》"),e(s)]),a("这篇文章中介绍到对线程池参数实现可自定义配置的思路和方法。")]),g,n("p",null,[a("我在这篇"),n("a",b,[a("《新手也能看懂的线程池学习总结》"),e(s)]),a(" 中就说过这三个参数是 "),f,a(" 最重要的参数，它们基本决定了线程池对于任务的处理策略。")]),x,n("ul",null,[n("li",null,[n("strong",null,[n("a",T,[a("Hippo4j"),e(s)])]),a("：异步线程池框架，支持线程池动态变更&监控&报警，无需修改代码轻松引入。支持多种使用模式，轻松引入，致力于提高系统运行保障能力。")]),n("li",null,[n("strong",null,[n("a",P,[a("Dynamic TP"),e(s)])]),a("：轻量级动态线程池，内置监控告警功能，集成三方中间件线程池管理，基于主流配置中心（已支持 Nacos、Apollo，Zookeeper、Consul、Etcd，可通过 SPI 自定义实现）。")])]),y,n("p",null,[_,a(" 项目地址："),n("a",w,[a("https://github.com/alibaba/transmittable-thread-local"),e(s)]),a(" 。")]),S])}const U=o(i,[["render",E],["__file","java-thread-pool-best-practices.html.vue"]]);export{U as default};

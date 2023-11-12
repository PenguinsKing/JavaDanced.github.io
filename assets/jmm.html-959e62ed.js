import{_ as s}from"./plugin-vue_export-helper-c27b6911.js";import{r as t,o as i,c as l,a as e,b as a,d as o,e as r}from"./app-a569c9af.js";const p={},c=r('<p>JMM(Java 内存模型)主要定义了对于一个共享变量，当另一个线程对这个共享变量执行写操作后，这个线程对这个共享变量的可见性。</p><p>要想理解透彻 JMM（Java 内存模型），我们先要从 <strong>CPU 缓存模型和指令重排序</strong> 说起！</p><h2 id="从-cpu-缓存模型说起" tabindex="-1"><a class="header-anchor" href="#从-cpu-缓存模型说起" aria-hidden="true">#</a> 从 CPU 缓存模型说起</h2><p><strong>为什么要弄一个 CPU 高速缓存呢？</strong> 类比我们开发网站后台系统使用的缓存（比如 Redis）是为了解决程序处理速度和访问常规关系型数据库速度不对等的问题。 <strong>CPU 缓存则是为了解决 CPU 处理速度和内存处理速度不对等的问题。</strong></p><p>我们甚至可以把 <strong>内存看作外存的高速缓存</strong>，程序运行的时候我们把外存的数据复制到内存，由于内存的处理速度远远高于外存，这样提高了处理速度。</p><p>总结：<strong>CPU Cache 缓存的是内存数据用于解决 CPU 处理速度和内存不匹配的问题，内存缓存的是硬盘数据用于解决硬盘访问速度过慢的问题。</strong></p><p>为了更好地理解，我画了一个简单的 CPU Cache 示意图如下所示。</p>',7),d={href:"https://github.com/Snailclimb/JavaGuide/issues/1848",target:"_blank",rel:"noopener noreferrer"},h=e("figure",null,[e("img",{src:"https://oss.javaguide.cn/github/javaguide/java/concurrent/cpu-cache.png",alt:"CPU 缓存模型示意图",tabindex:"0",loading:"lazy"}),e("figcaption",null,"CPU 缓存模型示意图")],-1),u=e("p",null,"现代的 CPU Cache 通常分为三层，分别叫 L1,L2,L3 Cache。有些 CPU 可能还有 L4 Cache，这里不做讨论，并不常见",-1),g=e("p",null,[e("strong",null,"CPU Cache 的工作方式："),a(" 先复制一份数据到 CPU Cache 中，当 CPU 需要用到的时候就可以直接从 CPU Cache 中读取数据，当运算完成后，再将运算得到的数据写回 Main Memory 中。但是，这样存在 "),e("strong",null,"内存缓存不一致性的问题"),a(" ！比如我执行一个 i++ 操作的话，如果两个线程同时执行的话，假设两个线程从 CPU Cache 中读取的 i=1，两个线程做了 i++ 运算完之后再写回 Main Memory 之后 i=2，而正确结果应该是 i=3。")],-1),f={href:"https://zh.wikipedia.org/wiki/MESI%E5%8D%8F%E8%AE%AE",target:"_blank",rel:"noopener noreferrer"},m=r('<figure><img src="https://oss.javaguide.cn/github/javaguide/java/concurrent/cpu-cache-protocol.png" alt="缓存一致性协议" tabindex="0" loading="lazy"><figcaption>缓存一致性协议</figcaption></figure><p>我们的程序运行在操作系统之上，操作系统屏蔽了底层硬件的操作细节，将各种硬件资源虚拟化。于是，操作系统也就同样需要解决内存缓存不一致性问题。</p><p>操作系统通过 <strong>内存模型（Memory Model）</strong> 定义一系列规范来解决这个问题。无论是 Windows 系统，还是 Linux 系统，它们都有特定的内存模型。</p><h2 id="指令重排序" tabindex="-1"><a class="header-anchor" href="#指令重排序" aria-hidden="true">#</a> 指令重排序</h2><p>说完了 CPU 缓存模型，我们再来看看另外一个比较重要的概念 <strong>指令重排序</strong> 。</p><p>为了提升执行速度/性能，计算机在执行程序代码的时候，会对指令进行重排序。</p><p><strong>什么是指令重排序？</strong> 简单来说就是系统在执行代码的时候并不一定是按照你写的代码的顺序依次执行。</p><p>常见的指令重排序有下面 2 种情况：</p><ul><li><strong>编译器优化重排</strong>：编译器（包括 JVM、JIT 编译器等）在不改变单线程程序语义的前提下，重新安排语句的执行顺序。</li><li><strong>指令并行重排</strong>：现代处理器采用了指令级并行技术(Instruction-Level Parallelism，ILP)来将多条指令重叠执行。如果不存在数据依赖性，处理器可以改变语句对应机器指令的执行顺序。</li></ul><p>另外，内存系统也会有“重排序”，但又不是真正意义上的重排序。在 JMM 里表现为主存和本地内存的内容可能不一致，进而导致程序在多线程下执行可能出现问题。</p><p>Java 源代码会经历 <strong>编译器优化重排 —&gt; 指令并行重排 —&gt; 内存系统重排</strong> 的过程，最终才变成操作系统可执行的指令序列。</p><p><strong>指令重排序可以保证串行语义一致，但是没有义务保证多线程间的语义也一致</strong> ，所以在多线程下，指令重排序可能会导致一些问题。</p><p>编译器和处理器的指令重排序的处理方式不一样。对于编译器，通过禁止特定类型的编译器重排序的方式来禁止重排序。对于处理器，通过插入内存屏障（Memory Barrier，或有时叫做内存栅栏，Memory Fence）的方式来禁止特定类型的处理器重排序。指令并行重排和内存系统重排都属于是处理器级别的指令重排序。</p><blockquote><p>内存屏障（Memory Barrier，或有时叫做内存栅栏，Memory Fence）是一种 CPU 指令，用来禁止处理器指令发生重排序（像屏障一样），从而保障指令执行的有序性。另外，为了达到屏障的效果，它也会使处理器写入、读取值之前，将主内存的值写入高速缓存，清空无效队列，从而保障变量的可见性。</p></blockquote><h2 id="jmm-java-memory-model" tabindex="-1"><a class="header-anchor" href="#jmm-java-memory-model" aria-hidden="true">#</a> JMM(Java Memory Model)</h2><h3 id="什么是-jmm-为什么需要-jmm" tabindex="-1"><a class="header-anchor" href="#什么是-jmm-为什么需要-jmm" aria-hidden="true">#</a> 什么是 JMM？为什么需要 JMM？</h3>',16),b={href:"http://www.cs.umd.edu/~pugh/java/memoryModel/CommunityReview.pdf",target:"_blank",rel:"noopener noreferrer"},v=r('<p>一般来说，编程语言也可以直接复用操作系统层面的内存模型。不过，不同的操作系统内存模型不同。如果直接复用操作系统层面的内存模型，就可能会导致同样一套代码换了一个操作系统就无法执行了。Java 语言是跨平台的，它需要自己提供一套内存模型以屏蔽系统差异。</p><p>这只是 JMM 存在的其中一个原因。实际上，对于 Java 来说，你可以把 JMM 看作是 Java 定义的并发编程相关的一组规范，除了抽象了线程和主内存之间的关系之外，其还规定了从 Java 源代码到 CPU 可执行指令的这个转化过程要遵守哪些和并发相关的原则和规范，其主要目的是为了简化多线程编程，增强程序可移植性的。</p><p><strong>为什么要遵守这些并发相关的原则和规范呢？</strong> 这是因为并发编程下，像 CPU 多级缓存和指令重排这类设计可能会导致程序运行出现一些问题。就比如说我们上面提到的指令重排序就可能会让多线程程序的执行出现问题，为此，JMM 抽象了 happens-before 原则（后文会详细介绍到）来解决这个指令重排序问题。</p><p>JMM 说白了就是定义了一些规范来解决这些问题，开发者可以利用这些规范更方便地开发多线程程序。对于 Java 开发者说，你不需要了解底层原理，直接使用并发相关的一些关键字和类（比如 <code>volatile</code>、<code>synchronized</code>、各种 <code>Lock</code>）即可开发出并发安全的程序。</p><h3 id="jmm-是如何抽象线程和主内存之间的关系" tabindex="-1"><a class="header-anchor" href="#jmm-是如何抽象线程和主内存之间的关系" aria-hidden="true">#</a> JMM 是如何抽象线程和主内存之间的关系？</h3><p><strong>Java 内存模型（JMM）</strong> 抽象了线程和主内存之间的关系，就比如说线程之间的共享变量必须存储在主内存中。</p><p>在 JDK1.2 之前，Java 的内存模型实现总是从 <strong>主存</strong> （即共享内存）读取变量，是不需要进行特别的注意的。而在当前的 Java 内存模型下，线程可以把变量保存 <strong>本地内存</strong> （比如机器的寄存器）中，而不是直接在主存中进行读写。这就可能造成一个线程在主存中修改了一个变量的值，而另外一个线程还继续使用它在寄存器中的变量值的拷贝，造成数据的不一致。</p><p>这和我们上面讲到的 CPU 缓存模型非常相似。</p><p><strong>什么是主内存？什么是本地内存？</strong></p><ul><li><strong>主内存</strong>：所有线程创建的实例对象都存放在主内存中，不管该实例对象是成员变量，还是局部变量，类信息、常量、静态变量都是放在主内存中。为了获取更好的运行速度，虚拟机及硬件系统可能会让工作内存优先存储于寄存器和高速缓存中。</li><li><strong>本地内存</strong>：每个线程都有一个私有的本地内存，本地内存存储了该线程以读 / 写共享变量的副本。每个线程只能操作自己本地内存中的变量，无法直接访问其他线程的本地内存。如果线程间需要通信，必须通过主内存来进行。本地内存是 JMM 抽象出来的一个概念，并不真实存在，它涵盖了缓存、写缓冲区、寄存器以及其他的硬件和编译器优化。</li></ul><p>Java 内存模型的抽象示意图如下：</p><figure><img src="https://oss.javaguide.cn/github/javaguide/java/concurrent/jmm.png" alt="JMM(Java 内存模型)" tabindex="0" loading="lazy"><figcaption>JMM(Java 内存模型)</figcaption></figure><p>从上图来看，线程 1 与线程 2 之间如果要进行通信的话，必须要经历下面 2 个步骤：</p><ol><li>线程 1 把本地内存中修改过的共享变量副本的值同步到主内存中去。</li><li>线程 2 到主存中读取对应的共享变量的值。</li></ol><p>也就是说，JMM 为共享变量提供了可见性的保障。</p><p>不过，多线程下，对主内存中的一个共享变量进行操作有可能诱发线程安全问题。举个例子：</p><ol><li>线程 1 和线程 2 分别对同一个共享变量进行操作，一个执行修改，一个执行读取。</li><li>线程 2 读取到的是线程 1 修改之前的值还是修改后的值并不确定，都有可能，因为线程 1 和线程 2 都是先将共享变量从主内存拷贝到对应线程的工作内存中。</li></ol><p>关于主内存与工作内存直接的具体交互协议，即一个变量如何从主内存拷贝到工作内存，如何从工作内存同步到主内存之间的实现细节，Java 内存模型定义来以下八种同步操作（了解即可，无需死记硬背）：</p><ul><li><strong>锁定（lock）</strong>: 作用于主内存中的变量，将他标记为一个线程独享变量。</li><li><strong>解锁（unlock）</strong>: 作用于主内存中的变量，解除变量的锁定状态，被解除锁定状态的变量才能被其他线程锁定。</li><li><strong>read（读取）</strong>：作用于主内存的变量，它把一个变量的值从主内存传输到线程的工作内存中，以便随后的 load 动作使用。</li><li><strong>load(载入)</strong>：把 read 操作从主内存中得到的变量值放入工作内存的变量的副本中。</li><li><strong>use(使用)</strong>：把工作内存中的一个变量的值传给执行引擎，每当虚拟机遇到一个使用到变量的指令时都会使用该指令。</li><li><strong>assign（赋值）</strong>：作用于工作内存的变量，它把一个从执行引擎接收到的值赋给工作内存的变量，每当虚拟机遇到一个给变量赋值的字节码指令时执行这个操作。</li><li><strong>store（存储）</strong>：作用于工作内存的变量，它把工作内存中一个变量的值传送到主内存中，以便随后的 write 操作使用。</li><li><strong>write（写入）</strong>：作用于主内存的变量，它把 store 操作从工作内存中得到的变量的值放入主内存的变量中。</li></ul><p>除了这 8 种同步操作之外，还规定了下面这些同步规则来保证这些同步操作的正确执行（了解即可，无需死记硬背）：</p><ul><li>不允许一个线程无原因地（没有发生过任何 assign 操作）把数据从线程的工作内存同步回主内存中。</li><li>一个新的变量只能在主内存中 “诞生”，不允许在工作内存中直接使用一个未被初始化（load 或 assign）的变量，换句话说就是对一个变量实施 use 和 store 操作之前，必须先执行过了 assign 和 load 操作。</li><li>一个变量在同一个时刻只允许一条线程对其进行 lock 操作，但 lock 操作可以被同一条线程重复执行多次，多次执行 lock 后，只有执行相同次数的 unlock 操作，变量才会被解锁。</li><li>如果对一个变量执行 lock 操作，将会清空工作内存中此变量的值，在执行引擎使用这个变量前，需要重新执行 load 或 assign 操作初始化变量的值。</li><li>如果一个变量事先没有被 lock 操作锁定，则不允许对它执行 unlock 操作，也不允许去 unlock 一个被其他线程锁定住的变量。</li><li>……</li></ul><h3 id="java-内存区域和-jmm-有何区别" tabindex="-1"><a class="header-anchor" href="#java-内存区域和-jmm-有何区别" aria-hidden="true">#</a> Java 内存区域和 JMM 有何区别？</h3><p>这是一个比较常见的问题，很多初学者非常容易搞混。 <strong>Java 内存区域和内存模型是完全不一样的两个东西</strong>：</p><ul><li>JVM 内存结构和 Java 虚拟机的运行时区域相关，定义了 JVM 在运行时如何分区存储程序数据，就比如说堆主要用于存放对象实例。</li><li>Java 内存模型和 Java 的并发编程相关，抽象了线程和主内存之间的关系就比如说线程之间的共享变量必须存储在主内存中，规定了从 Java 源代码到 CPU 可执行指令的这个转化过程要遵守哪些和并发相关的原则和规范，其主要目的是为了简化多线程编程，增强程序可移植性的。</li></ul><h3 id="happens-before-原则是什么" tabindex="-1"><a class="header-anchor" href="#happens-before-原则是什么" aria-hidden="true">#</a> happens-before 原则是什么？</h3>',25),M={href:"https://lamport.azurewebsites.net/pubs/time-clocks.pdf",target:"_blank",rel:"noopener noreferrer"},J={href:"https://writings.sh/post/logical-clocks",target:"_blank",rel:"noopener noreferrer"},_=e("strong",null,"逻辑时钟并不度量时间本身，仅区分事件发生的前后顺序，其本质就是定义了一种 happens-before 关系。",-1),k=r(`<p>上面提到的 happens-before 这个概念诞生的背景并不是重点，简单了解即可。</p><p>JSR 133 引入了 happens-before 这个概念来描述两个操作之间的内存可见性。</p><p><strong>为什么需要 happens-before 原则？</strong> happens-before 原则的诞生是为了程序员和编译器、处理器之间的平衡。程序员追求的是易于理解和编程的强内存模型，遵守既定规则编码即可。编译器和处理器追求的是较少约束的弱内存模型，让它们尽己所能地去优化性能，让性能最大化。happens-before 原则的设计思想其实非常简单：</p><ul><li>为了对编译器和处理器的约束尽可能少，只要不改变程序的执行结果（单线程程序和正确执行的多线程程序），编译器和处理器怎么进行重排序优化都行。</li><li>对于会改变程序执行结果的重排序，JMM 要求编译器和处理器必须禁止这种重排序。</li></ul><p>下面这张是 《Java 并发编程的艺术》这本书中的一张 JMM 设计思想的示意图，非常清晰。</p><figure><img src="https://oss.javaguide.cn/github/javaguide/java/concurrent/image-20220731155332375.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>了解了 happens-before 原则的设计思想，我们再来看看 JSR-133 对 happens-before 原则的定义：</p><ul><li>如果一个操作 happens-before 另一个操作，那么第一个操作的执行结果将对第二个操作可见，并且第一个操作的执行顺序排在第二个操作之前。</li><li>两个操作之间存在 happens-before 关系，并不意味着 Java 平台的具体实现必须要按照 happens-before 关系指定的顺序来执行。如果重排序之后的执行结果，与按 happens-before 关系来执行的结果一致，那么 JMM 也允许这样的重排序。</li></ul><p>我们看下面这段代码：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">int</span> userNum <span class="token operator">=</span> <span class="token function">getUserNum</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 	<span class="token comment">// 1</span>
<span class="token keyword">int</span> teacherNum <span class="token operator">=</span> <span class="token function">getTeacherNum</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>	 <span class="token comment">// 2</span>
<span class="token keyword">int</span> totalNum <span class="token operator">=</span> userNum <span class="token operator">+</span> teacherNum<span class="token punctuation">;</span>	<span class="token comment">// 3</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>1 happens-before 2</li><li>2 happens-before 3</li><li>1 happens-before 3</li></ul><p>虽然 1 happens-before 2，但对 1 和 2 进行重排序不会影响代码的执行结果，所以 JMM 是允许编译器和处理器执行这种重排序的。但 1 和 2 必须是在 3 执行之前，也就是说 1,2 happens-before 3 。</p><p><strong>happens-before 原则表达的意义其实并不是一个操作发生在另外一个操作的前面，虽然这从程序员的角度上来说也并无大碍。更准确地来说，它更想表达的意义是前一个操作的结果对于后一个操作是可见的，无论这两个操作是否在同一个线程里。</strong></p><p>举个例子：操作 1 happens-before 操作 2，即使操作 1 和操作 2 不在同一个线程内，JMM 也会保证操作 1 的结果对操作 2 是可见的。</p><h3 id="happens-before-常见规则有哪些-谈谈你的理解" tabindex="-1"><a class="header-anchor" href="#happens-before-常见规则有哪些-谈谈你的理解" aria-hidden="true">#</a> happens-before 常见规则有哪些？谈谈你的理解？</h3><p>happens-before 的规则就 8 条，说多不多，重点了解下面列举的 5 条即可。全记是不可能的，很快就忘记了，意义不大，随时查阅即可。</p><ol><li><strong>程序顺序规则</strong>：一个线程内，按照代码顺序，书写在前面的操作 happens-before 于书写在后面的操作；</li><li><strong>解锁规则</strong>：解锁 happens-before 于加锁；</li><li><strong>volatile 变量规则</strong>：对一个 volatile 变量的写操作 happens-before 于后面对这个 volatile 变量的读操作。说白了就是对 volatile 变量的写操作的结果对于发生于其后的任何操作都是可见的。</li><li><strong>传递规则</strong>：如果 A happens-before B，且 B happens-before C，那么 A happens-before C；</li><li><strong>线程启动规则</strong>：Thread 对象的 <code>start()</code>方法 happens-before 于此线程的每一个动作。</li></ol><p>如果两个操作不满足上述任意一个 happens-before 规则，那么这两个操作就没有顺序的保障，JVM 可以对这两个操作进行重排序。</p><h3 id="happens-before-和-jmm-什么关系" tabindex="-1"><a class="header-anchor" href="#happens-before-和-jmm-什么关系" aria-hidden="true">#</a> happens-before 和 JMM 什么关系？</h3><p>happens-before 与 JMM 的关系用《Java 并发编程的艺术》这本书中的一张图就可以非常好的解释清楚。</p><figure><img src="https://oss.javaguide.cn/github/javaguide/java/concurrent/image-20220731084604667.png" alt="happens-before 与 JMM 的关系" tabindex="0" loading="lazy"><figcaption>happens-before 与 JMM 的关系</figcaption></figure><h2 id="再看并发编程三个重要特性" tabindex="-1"><a class="header-anchor" href="#再看并发编程三个重要特性" aria-hidden="true">#</a> 再看并发编程三个重要特性</h2><h3 id="原子性" tabindex="-1"><a class="header-anchor" href="#原子性" aria-hidden="true">#</a> 原子性</h3><p>一次操作或者多次操作，要么所有的操作全部都得到执行并且不会受到任何因素的干扰而中断，要么都不执行。</p><p>在 Java 中，可以借助<code>synchronized</code>、各种 <code>Lock</code> 以及各种原子类实现原子性。</p><p><code>synchronized</code> 和各种 <code>Lock</code> 可以保证任一时刻只有一个线程访问该代码块，因此可以保障原子性。各种原子类是利用 CAS (compare and swap) 操作（可能也会用到 <code>volatile</code>或者<code>final</code>关键字）来保证原子操作。</p><h3 id="可见性" tabindex="-1"><a class="header-anchor" href="#可见性" aria-hidden="true">#</a> 可见性</h3><p>当一个线程对共享变量进行了修改，那么另外的线程都是立即可以看到修改后的最新值。</p><p>在 Java 中，可以借助<code>synchronized</code>、<code>volatile</code> 以及各种 <code>Lock</code> 实现可见性。</p><p>如果我们将变量声明为 <code>volatile</code> ，这就指示 JVM，这个变量是共享且不稳定的，每次使用它都到主存中进行读取。</p><h3 id="有序性" tabindex="-1"><a class="header-anchor" href="#有序性" aria-hidden="true">#</a> 有序性</h3><p>由于指令重排序问题，代码的执行顺序未必就是编写代码时候的顺序。</p><p>我们上面讲重排序的时候也提到过：</p><blockquote><p><strong>指令重排序可以保证串行语义一致，但是没有义务保证多线程间的语义也一致</strong> ，所以在多线程下，指令重排序可能会导致一些问题。</p></blockquote><p>在 Java 中，<code>volatile</code> 关键字可以禁止指令进行重排序优化。</p><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2>`,36),j=e("li",null,"Java 是最早尝试提供内存模型的语言，其主要目的是为了简化多线程编程，增强程序可移植性的。",-1),C={href:"https://zh.wikipedia.org/wiki/MESI%E5%8D%8F%E8%AE%AE",target:"_blank",rel:"noopener noreferrer"},y=e("li",null,[a("为了提升执行速度/性能，计算机在执行程序代码的时候，会对指令进行重排序。 简单来说就是系统在执行代码的时候并不一定是按照你写的代码的顺序依次执行。"),e("strong",null,"指令重排序可以保证串行语义一致，但是没有义务保证多线程间的语义也一致"),a(" ，所以在多线程下，指令重排序可能会导致一些问题。")],-1),P=e("li",null,"你可以把 JMM 看作是 Java 定义的并发编程相关的一组规范，除了抽象了线程和主内存之间的关系之外，其还规定了从 Java 源代码到 CPU 可执行指令的这个转化过程要遵守哪些和并发相关的原则和规范，其主要目的是为了简化多线程编程，增强程序可移植性的。",-1),x=e("li",null,"JSR 133 引入了 happens-before 这个概念来描述两个操作之间的内存可见性。",-1),U=e("h2",{id:"参考",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#参考","aria-hidden":"true"},"#"),a(" 参考")],-1),w=e("li",null,"《Java 并发编程的艺术》第三章 Java 内存模型",-1),L={href:"http://concurrent.redspider.group/RedSpider.html",target:"_blank",rel:"noopener noreferrer"},E={href:"https://tech.meituan.com/2014/09/23/java-memory-reordering.html",target:"_blank",rel:"noopener noreferrer"},S={href:"https://xie.infoq.cn/article/739920a92d0d27e2053174ef2",target:"_blank",rel:"noopener noreferrer"},z={href:"https://www.cs.umd.edu/~pugh/java/memoryModel/jsr-133-faq.html",target:"_blank",rel:"noopener noreferrer"},N=e("p",null,"File not found",-1);function q(I,R){const n=t("ExternalLinkIcon");return i(),l("div",null,[c,e("blockquote",null,[e("p",null,[e("strong",null,[a("🐛 修正（参见："),e("a",d,[a("issue#1848"),o(n)]),a("）")]),a("：对 CPU 缓存模型绘图不严谨的地方进行完善。")])]),h,u,g,e("p",null,[e("strong",null,[a("CPU 为了解决内存缓存不一致性问题可以通过制定缓存一致协议（比如 "),e("a",f,[a("MESI 协议"),o(n)]),a("）或者其他手段来解决。")]),a(" 这个缓存一致性协议指的是在 CPU 高速缓存与主内存交互的时候需要遵守的原则和规范。不同的 CPU 中，使用的缓存一致性协议通常也会有所不同。")]),m,e("p",null,[a("Java 是最早尝试提供内存模型的编程语言。由于早期内存模型存在一些缺陷（比如非常容易削弱编译器的优化能力），从 Java5 开始，Java 开始使用新的内存模型 "),e("a",b,[a("《JSR-133：Java Memory Model and Thread Specification》"),o(n)]),a(" 。")]),v,e("p",null,[a("happens-before 这个概念最早诞生于 Leslie Lamport 于 1978 年发表的论文"),e("a",M,[a("《Time，Clocks and the Ordering of Events in a Distributed System》"),o(n)]),a("。在这篇论文中，Leslie Lamport 提出了"),e("a",J,[a("逻辑时钟"),o(n)]),a("的概念，这也成了第一个逻辑时钟算法 。在分布式环境中，通过一系列规则来定义逻辑时钟的变化，从而能通过逻辑时钟来对分布式系统中的事件的先后顺序进行判断。"),_]),k,e("ul",null,[j,e("li",null,[a("CPU 可以通过制定缓存一致协议（比如 "),e("a",C,[a("MESI 协议"),o(n)]),a("）来解决内存缓存不一致性问题。")]),y,P,x]),U,e("ul",null,[w,e("li",null,[a("《深入浅出 Java 多线程》："),e("a",L,[a("http://concurrent.redspider.group/RedSpider.html"),o(n)])]),e("li",null,[a("Java 内存访问重排序的研究："),e("a",E,[a("https://tech.meituan.com/2014/09/23/java-memory-reordering.html"),o(n)])]),e("li",null,[a("嘿，同学，你要的 Java 内存模型 (JMM) 来了："),e("a",S,[a("https://xie.infoq.cn/article/739920a92d0d27e2053174ef2"),o(n)])]),e("li",null,[a("JSR 133 (Java Memory Model) FAQ："),e("a",z,[a("https://www.cs.umd.edu/~pugh/java/memoryModel/jsr-133-faq.html"),o(n)])])]),N])}const B=s(p,[["render",q],["__file","jmm.html.vue"]]);export{B as default};

import{_ as d}from"./plugin-vue_export-helper-c27b6911.js";import{r,o as a,c as t,a as e,b as o,d as p,e as s}from"./app-a569c9af.js";const n={},i={href:"https://juejin.im/user/5c33853851882525ea106810",target:"_blank",rel:"noopener noreferrer"},g=s('<h2 id="什么是-zookeeper" tabindex="-1"><a class="header-anchor" href="#什么是-zookeeper" aria-hidden="true">#</a> 什么是 ZooKeeper</h2><p><code>ZooKeeper</code> 由 <code>Yahoo</code> 开发，后来捐赠给了 <code>Apache</code> ，现已成为 <code>Apache</code> 顶级项目。<code>ZooKeeper</code> 是一个开源的分布式应用程序协调服务器，其为分布式系统提供一致性服务。其一致性是通过基于 <code>Paxos</code> 算法的 <code>ZAB</code> 协议完成的。其主要功能包括：配置维护、分布式同步、集群管理、分布式事务等。</p><p>简单来说， <code>ZooKeeper</code> 是一个 <strong>分布式协调服务框架</strong> 。分布式？协调服务？这啥玩意？🤔🤔</p><p>其实解释到分布式这个概念的时候，我发现有些同学并不是能把 <strong>分布式和集群</strong> 这两个概念很好的理解透。前段时间有同学和我探讨起分布式的东西，他说分布式不就是加机器吗？一台机器不够用再加一台抗压呗。当然加机器这种说法也无可厚非，你一个分布式系统必定涉及到多个机器，但是你别忘了，计算机学科中还有一个相似的概念—— <code>Cluster</code> ，集群不也是加机器吗？但是 集群 和 分布式 其实就是两个完全不同的概念。</p><p>比如，我现在有一个秒杀服务，并发量太大单机系统承受不住，那我加几台服务器也 <strong>一样</strong> 提供秒杀服务，这个时候就是 <strong><code>Cluster</code> 集群</strong> 。</p><figure><img src="https://oss.javaguide.cn/p3-juejin/60263e969b9e4a0f81724b1f4d5b3d58~tplv-k3u1fbpfcp-zoom-1.jpeg" alt="cluster" tabindex="0" loading="lazy"><figcaption>cluster</figcaption></figure><p>但是，我现在换一种方式，我将一个秒杀服务 <strong>拆分成多个子服务</strong> ，比如创建订单服务，增加积分服务，扣优惠券服务等等，<strong>然后我将这些子服务都部署在不同的服务器上</strong> ，这个时候就是 <strong><code>Distributed</code> 分布式</strong> 。</p><figure><img src="https://oss.javaguide.cn/p3-juejin/0d42e7b4249144b3a77a0c519216ae3d~tplv-k3u1fbpfcp-zoom-1.jpeg" alt="distributed" tabindex="0" loading="lazy"><figcaption>distributed</figcaption></figure><p>而我为什么反驳同学所说的分布式就是加机器呢？因为我认为加机器更加适用于构建集群，因为它真是只有加机器。而对于分布式来说，你首先需要将业务进行拆分，然后再加机器（不仅仅是加机器那么简单），同时你还要去解决分布式带来的一系列问题。</p><figure><img src="https://oss.javaguide.cn/p3-juejin/e3662ca1a09c4444b07f15dbf85c6ba8~tplv-k3u1fbpfcp-zoom-1.jpeg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>比如各个分布式组件如何协调起来，如何减少各个系统之间的耦合度，分布式事务的处理，如何去配置整个分布式系统等等。<code>ZooKeeper</code> 主要就是解决这些问题的。</p><h2 id="一致性问题" tabindex="-1"><a class="header-anchor" href="#一致性问题" aria-hidden="true">#</a> 一致性问题</h2><p>设计一个分布式系统必定会遇到一个问题—— <strong>因为分区容忍性（partition tolerance）的存在，就必定要求我们需要在系统可用性（availability）和数据一致性（consistency）中做出权衡</strong> 。这就是著名的 <code>CAP</code> 定理。</p><p>理解起来其实很简单，比如说把一个班级作为整个系统，而学生是系统中的一个个独立的子系统。这个时候班里的小红小明偷偷谈恋爱被班里的大嘴巴小花发现了，小花欣喜若狂告诉了周围的人，然后小红小明谈恋爱的消息在班级里传播起来了。当在消息的传播（散布）过程中，你抓到一个同学问他们的情况，如果回答你不知道，那么说明整个班级系统出现了数据不一致的问题（因为小花已经知道这个消息了）。而如果他直接不回答你，因为整个班级有消息在进行传播（为了保证一致性，需要所有人都知道才可提供服务），这个时候就出现了系统的可用性问题。</p><figure><img src="https://oss.javaguide.cn/p3-juejin/38b9ff4b193e4487afe32c9710c6d644~tplv-k3u1fbpfcp-zoom-1-20230717160254318-20230717160259975.jpeg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>而上述前者就是 <code>Eureka</code> 的处理方式，它保证了 AP（可用性），后者就是我们今天所要讲的 <code>ZooKeeper</code> 的处理方式，它保证了 CP（数据一致性）。</p><h2 id="一致性协议和算法" tabindex="-1"><a class="header-anchor" href="#一致性协议和算法" aria-hidden="true">#</a> 一致性协议和算法</h2><p>而为了解决数据一致性问题，在科学家和程序员的不断探索中，就出现了很多的一致性协议和算法。比如 2PC（两阶段提交），3PC（三阶段提交），Paxos 算法等等。</p><p>这时候请你思考一个问题，同学之间如果采用传纸条的方式去传播消息，那么就会出现一个问题——我咋知道我的小纸条有没有传到我想要传递的那个人手中呢？万一被哪个小家伙给劫持篡改了呢，对吧？</p><figure><img src="https://oss.javaguide.cn/p3-juejin/8c73e264d28b4a93878f4252e4e3e43c~tplv-k3u1fbpfcp-zoom-1.jpeg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>这个时候就引申出一个概念—— <strong>拜占庭将军问题</strong> 。它意指 <strong>在不可靠信道上试图通过消息传递的方式达到一致性是不可能的</strong>， 所以所有的一致性算法的 <strong>必要前提</strong> 就是安全可靠的消息通道。</p><p>而为什么要去解决数据一致性的问题？你想想，如果一个秒杀系统将服务拆分成了下订单和加积分服务，这两个服务部署在不同的机器上了，万一在消息的传播过程中积分系统宕机了，总不能你这边下了订单却没加积分吧？你总得保证两边的数据需要一致吧？</p><h3 id="_2pc-两阶段提交" tabindex="-1"><a class="header-anchor" href="#_2pc-两阶段提交" aria-hidden="true">#</a> 2PC（两阶段提交）</h3><p>两阶段提交是一种保证分布式系统数据一致性的协议，现在很多数据库都是采用的两阶段提交协议来完成 <strong>分布式事务</strong> 的处理。</p><p>在介绍 2PC 之前，我们先来想想分布式事务到底有什么问题呢？</p><p>还拿秒杀系统的下订单和加积分两个系统来举例吧（我想你们可能都吐了 🤮🤮🤮），我们此时下完订单会发个消息给积分系统告诉它下面该增加积分了。如果我们仅仅是发送一个消息也不收回复，那么我们的订单系统怎么能知道积分系统的收到消息的情况呢？如果我们增加一个收回复的过程，那么当积分系统收到消息后返回给订单系统一个 <code>Response</code> ，但在中间出现了网络波动，那个回复消息没有发送成功，订单系统是不是以为积分系统消息接收失败了？它是不是会回滚事务？但此时积分系统是成功收到消息的，它就会去处理消息然后给用户增加积分，这个时候就会出现积分加了但是订单没下成功。</p><p>所以我们所需要解决的是在分布式系统中，整个调用链中，我们所有服务的数据处理要么都成功要么都失败，即所有服务的 <strong>原子性问题</strong> 。</p><p>在两阶段提交中，主要涉及到两个角色，分别是协调者和参与者。</p><p>第一阶段：当要执行一个分布式事务的时候，事务发起者首先向协调者发起事务请求，然后协调者会给所有参与者发送 <code>prepare</code> 请求（其中包括事务内容）告诉参与者你们需要执行事务了，如果能执行我发的事务内容那么就先执行但不提交，执行后请给我回复。然后参与者收到 <code>prepare</code> 消息后，他们会开始执行事务（但不提交），并将 <code>Undo</code> 和 <code>Redo</code> 信息记入事务日志中，之后参与者就向协调者反馈是否准备好了。</p><p>第二阶段：第二阶段主要是协调者根据参与者反馈的情况来决定接下来是否可以进行事务的提交操作，即提交事务或者回滚事务。</p><p>比如这个时候 <strong>所有的参与者</strong> 都返回了准备好了的消息，这个时候就进行事务的提交，协调者此时会给所有的参与者发送 <strong><code>Commit</code> 请求</strong> ，当参与者收到 <code>Commit</code> 请求的时候会执行前面执行的事务的 <strong>提交操作</strong> ，提交完毕之后将给协调者发送提交成功的响应。</p><p>而如果在第一阶段并不是所有参与者都返回了准备好了的消息，那么此时协调者将会给所有参与者发送 <strong>回滚事务的 <code>rollback</code> 请求</strong>，参与者收到之后将会 <strong>回滚它在第一阶段所做的事务处理</strong> ，然后再将处理情况返回给协调者，最终协调者收到响应后便给事务发起者返回处理失败的结果。</p><figure><img src="https://oss.javaguide.cn/p3-juejin/1a7210167f1d4d4fb97afcec19902a59~tplv-k3u1fbpfcp-zoom-1.jpeg" alt="2PC流程" tabindex="0" loading="lazy"><figcaption>2PC流程</figcaption></figure><p>个人觉得 2PC 实现得还是比较鸡肋的，因为事实上它只解决了各个事务的原子性问题，随之也带来了很多的问题。</p><figure><img src="https://oss.javaguide.cn/p3-juejin/cc534022c7184770b9b82b2d0008432a~tplv-k3u1fbpfcp-zoom-1.jpeg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><ul><li><strong>单点故障问题</strong>，如果协调者挂了那么整个系统都处于不可用的状态了。</li><li><strong>阻塞问题</strong>，即当协调者发送 <code>prepare</code> 请求，参与者收到之后如果能处理那么它将会进行事务的处理但并不提交，这个时候会一直占用着资源不释放，如果此时协调者挂了，那么这些资源都不会再释放了，这会极大影响性能。</li><li><strong>数据不一致问题</strong>，比如当第二阶段，协调者只发送了一部分的 <code>commit</code> 请求就挂了，那么也就意味着，收到消息的参与者会进行事务的提交，而后面没收到的则不会进行事务提交，那么这时候就会产生数据不一致性问题。</li></ul><h3 id="_3pc-三阶段提交" tabindex="-1"><a class="header-anchor" href="#_3pc-三阶段提交" aria-hidden="true">#</a> 3PC（三阶段提交）</h3><p>因为 2PC 存在的一系列问题，比如单点，容错机制缺陷等等，从而产生了 <strong>3PC（三阶段提交）</strong> 。那么这三阶段又分别是什么呢？</p><blockquote><p>千万不要吧 PC 理解成个人电脑了，其实他们是 phase-commit 的缩写，即阶段提交。</p></blockquote><ol><li><strong>CanCommit 阶段</strong>：协调者向所有参与者发送 <code>CanCommit</code> 请求，参与者收到请求后会根据自身情况查看是否能执行事务，如果可以则返回 YES 响应并进入预备状态，否则返回 NO 。</li><li><strong>PreCommit 阶段</strong>：协调者根据参与者返回的响应来决定是否可以进行下面的 <code>PreCommit</code> 操作。如果上面参与者返回的都是 YES，那么协调者将向所有参与者发送 <code>PreCommit</code> 预提交请求，<strong>参与者收到预提交请求后，会进行事务的执行操作，并将 <code>Undo</code> 和 <code>Redo</code> 信息写入事务日志中</strong> ，最后如果参与者顺利执行了事务则给协调者返回成功的响应。如果在第一阶段协调者收到了 <strong>任何一个 NO</strong> 的信息，或者 <strong>在一定时间内</strong> 并没有收到全部的参与者的响应，那么就会中断事务，它会向所有参与者发送中断请求（abort），参与者收到中断请求之后会立即中断事务，或者在一定时间内没有收到协调者的请求，它也会中断事务。</li><li><strong>DoCommit 阶段</strong>：这个阶段其实和 <code>2PC</code> 的第二阶段差不多，如果协调者收到了所有参与者在 <code>PreCommit</code> 阶段的 YES 响应，那么协调者将会给所有参与者发送 <code>DoCommit</code> 请求，<strong>参与者收到 <code>DoCommit</code> 请求后则会进行事务的提交工作</strong>，完成后则会给协调者返回响应，协调者收到所有参与者返回的事务提交成功的响应之后则完成事务。若协调者在 <code>PreCommit</code> 阶段 <strong>收到了任何一个 NO 或者在一定时间内没有收到所有参与者的响应</strong> ，那么就会进行中断请求的发送，参与者收到中断请求后则会 <strong>通过上面记录的回滚日志</strong> 来进行事务的回滚操作，并向协调者反馈回滚状况，协调者收到参与者返回的消息后，中断事务。</li></ol><figure><img src="https://oss.javaguide.cn/p3-juejin/80854635d48c42d896dbaa066abf5c26~tplv-k3u1fbpfcp-zoom-1.jpeg" alt="3PC流程" tabindex="0" loading="lazy"><figcaption>3PC流程</figcaption></figure><blockquote><p>这里是 <code>3PC</code> 在成功的环境下的流程图，你可以看到 <code>3PC</code> 在很多地方进行了超时中断的处理，比如协调者在指定时间内未收到全部的确认消息则进行事务中断的处理，这样能 <strong>减少同步阻塞的时间</strong> 。还有需要注意的是，<strong><code>3PC</code> 在 <code>DoCommit</code> 阶段参与者如未收到协调者发送的提交事务的请求，它会在一定时间内进行事务的提交</strong>。为什么这么做呢？是因为这个时候我们肯定<strong>保证了在第一阶段所有的协调者全部返回了可以执行事务的响应</strong>，这个时候我们有理由<strong>相信其他系统都能进行事务的执行和提交</strong>，所以<strong>不管</strong>协调者有没有发消息给参与者，进入第三阶段参与者都会进行事务的提交操作。</p></blockquote><p>总之，<code>3PC</code> 通过一系列的超时机制很好的缓解了阻塞问题，但是最重要的一致性并没有得到根本的解决，比如在 <code>DoCommit</code> 阶段，当一个参与者收到了请求之后其他参与者和协调者挂了或者出现了网络分区，这个时候收到消息的参与者都会进行事务提交，这就会出现数据不一致性问题。</p><p>所以，要解决一致性问题还需要靠 <code>Paxos</code> 算法 ⭐️ ⭐️ ⭐️ 。</p><h3 id="paxos-算法" tabindex="-1"><a class="header-anchor" href="#paxos-算法" aria-hidden="true">#</a> <code>Paxos</code> 算法</h3><p><code>Paxos</code> 算法是基于<strong>消息传递且具有高度容错特性的一致性算法</strong>，是目前公认的解决分布式一致性问题最有效的算法之一，<strong>其解决的问题就是在分布式系统中如何就某个值（决议）达成一致</strong> 。</p><p>在 <code>Paxos</code> 中主要有三个角色，分别为 <code>Proposer提案者</code>、<code>Acceptor表决者</code>、<code>Learner学习者</code>。<code>Paxos</code> 算法和 <code>2PC</code> 一样，也有两个阶段，分别为 <code>Prepare</code> 和 <code>accept</code> 阶段。</p><h4 id="prepare-阶段" tabindex="-1"><a class="header-anchor" href="#prepare-阶段" aria-hidden="true">#</a> prepare 阶段</h4><ul><li><code>Proposer提案者</code>：负责提出 <code>proposal</code>，每个提案者在提出提案时都会首先获取到一个 <strong>具有全局唯一性的、递增的提案编号 N</strong>，即在整个集群中是唯一的编号 N，然后将该编号赋予其要提出的提案，在<strong>第一阶段是只将提案编号发送给所有的表决者</strong>。</li><li><code>Acceptor表决者</code>：每个表决者在 <code>accept</code> 某提案后，会将该提案编号 N 记录在本地，这样每个表决者中保存的已经被 accept 的提案中会存在一个<strong>编号最大的提案</strong>，其编号假设为 <code>maxN</code>。每个表决者仅会 <code>accept</code> 编号大于自己本地 <code>maxN</code> 的提案，在批准提案时表决者会将以前接受过的最大编号的提案作为响应反馈给 <code>Proposer</code> 。</li></ul><blockquote><p>下面是 <code>prepare</code> 阶段的流程图，你可以对照着参考一下。</p></blockquote><figure><img src="https://oss.javaguide.cn/p3-juejin/cd1e5f78875b4ad6b54013738f570943~tplv-k3u1fbpfcp-zoom-1.jpeg" alt="paxos第一阶段" tabindex="0" loading="lazy"><figcaption>paxos第一阶段</figcaption></figure><h4 id="accept-阶段" tabindex="-1"><a class="header-anchor" href="#accept-阶段" aria-hidden="true">#</a> accept 阶段</h4><p>当一个提案被 <code>Proposer</code> 提出后，如果 <code>Proposer</code> 收到了超过半数的 <code>Acceptor</code> 的批准（<code>Proposer</code> 本身同意），那么此时 <code>Proposer</code> 会给所有的 <code>Acceptor</code> 发送真正的提案（你可以理解为第一阶段为试探），这个时候 <code>Proposer</code> 就会发送提案的内容和提案编号。</p><p>表决者收到提案请求后会再次比较本身已经批准过的最大提案编号和该提案编号，如果该提案编号 <strong>大于等于</strong> 已经批准过的最大提案编号，那么就 <code>accept</code> 该提案（此时执行提案内容但不提交），随后将情况返回给 <code>Proposer</code> 。如果不满足则不回应或者返回 NO 。</p><figure><img src="https://oss.javaguide.cn/p3-juejin/dad7f51d58b24a72b249278502ec04bd~tplv-k3u1fbpfcp-zoom-1.jpeg" alt="paxos第二阶段1" tabindex="0" loading="lazy"><figcaption>paxos第二阶段1</figcaption></figure><p>当 <code>Proposer</code> 收到超过半数的 <code>accept</code> ，那么它这个时候会向所有的 <code>acceptor</code> 发送提案的提交请求。需要注意的是，因为上述仅仅是超过半数的 <code>acceptor</code> 批准执行了该提案内容，其他没有批准的并没有执行该提案内容，所以这个时候需要<strong>向未批准的 <code>acceptor</code> 发送提案内容和提案编号并让它无条件执行和提交</strong>，而对于前面已经批准过该提案的 <code>acceptor</code> 来说 <strong>仅仅需要发送该提案的编号</strong> ，让 <code>acceptor</code> 执行提交就行了。</p><figure><img src="https://oss.javaguide.cn/p3-juejin/9359bbabb511472e8de04d0826967996~tplv-k3u1fbpfcp-zoom-1.jpeg" alt="paxos第二阶段2" tabindex="0" loading="lazy"><figcaption>paxos第二阶段2</figcaption></figure><p>而如果 <code>Proposer</code> 如果没有收到超过半数的 <code>accept</code> 那么它将会将 <strong>递增</strong> 该 <code>Proposal</code> 的编号，然后 <strong>重新进入 <code>Prepare</code> 阶段</strong> 。</p><blockquote><p>对于 <code>Learner</code> 来说如何去学习 <code>Acceptor</code> 批准的提案内容，这有很多方式，读者可以自己去了解一下，这里不做过多解释。</p></blockquote><h4 id="paxos-算法的死循环问题" tabindex="-1"><a class="header-anchor" href="#paxos-算法的死循环问题" aria-hidden="true">#</a> paxos 算法的死循环问题</h4><p>其实就有点类似于两个人吵架，小明说我是对的，小红说我才是对的，两个人据理力争的谁也不让谁 🤬🤬。</p><p>比如说，此时提案者 P1 提出一个方案 M1，完成了 <code>Prepare</code> 阶段的工作，这个时候 <code>acceptor</code> 则批准了 M1，但是此时提案者 P2 同时也提出了一个方案 M2，它也完成了 <code>Prepare</code> 阶段的工作。然后 P1 的方案已经不能在第二阶段被批准了（因为 <code>acceptor</code> 已经批准了比 M1 更大的 M2），所以 P1 自增方案变为 M3 重新进入 <code>Prepare</code> 阶段，然后 <code>acceptor</code> ，又批准了新的 M3 方案，它又不能批准 M2 了，这个时候 M2 又自增进入 <code>Prepare</code> 阶段。。。</p><p>就这样无休无止的永远提案下去，这就是 <code>paxos</code> 算法的死循环问题。</p><figure><img src="https://oss.javaguide.cn/p3-juejin/bc3d45941abf4fca903f7f4b69405abf~tplv-k3u1fbpfcp-zoom-1.jpeg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>那么如何解决呢？很简单，人多了容易吵架，我现在 <strong>就允许一个能提案</strong> 就行了。</p><h2 id="引出-zab" tabindex="-1"><a class="header-anchor" href="#引出-zab" aria-hidden="true">#</a> 引出 ZAB</h2><h3 id="zookeeper-架构" tabindex="-1"><a class="header-anchor" href="#zookeeper-架构" aria-hidden="true">#</a> Zookeeper 架构</h3><p>作为一个优秀高效且可靠的分布式协调框架，<code>ZooKeeper</code> 在解决分布式数据一致性问题时并没有直接使用 <code>Paxos</code> ，而是专门定制了一致性协议叫做 <code>ZAB(ZooKeeper Atomic Broadcast)</code> 原子广播协议，该协议能够很好地支持 <strong>崩溃恢复</strong> 。</p><figure><img src="https://oss.javaguide.cn/p3-juejin/07bf6c1e10f84fc58a2453766ca6bd18~tplv-k3u1fbpfcp-zoom-1.png" alt="Zookeeper架构" tabindex="0" loading="lazy"><figcaption>Zookeeper架构</figcaption></figure><h3 id="zab-中的三个角色" tabindex="-1"><a class="header-anchor" href="#zab-中的三个角色" aria-hidden="true">#</a> ZAB 中的三个角色</h3><p>和介绍 <code>Paxos</code> 一样，在介绍 <code>ZAB</code> 协议之前，我们首先来了解一下在 <code>ZAB</code> 中三个主要的角色，<code>Leader 领导者</code>、<code>Follower跟随者</code>、<code>Observer观察者</code> 。</p><ul><li><code>Leader</code>：集群中 <strong>唯一的写请求处理者</strong> ，能够发起投票（投票也是为了进行写请求）。</li><li><code>Follower</code>：能够接收客户端的请求，如果是读请求则可以自己处理，<strong>如果是写请求则要转发给 <code>Leader</code></strong> 。在选举过程中会参与投票，<strong>有选举权和被选举权</strong> 。</li><li><code>Observer</code>：就是没有选举权和被选举权的 <code>Follower</code> 。</li></ul><p>在 <code>ZAB</code> 协议中对 <code>zkServer</code>(即上面我们说的三个角色的总称) 还有两种模式的定义，分别是 <strong>消息广播</strong> 和 <strong>崩溃恢复</strong> 。</p><h3 id="消息广播模式" tabindex="-1"><a class="header-anchor" href="#消息广播模式" aria-hidden="true">#</a> 消息广播模式</h3><p>说白了就是 <code>ZAB</code> 协议是如何处理写请求的，上面我们不是说只有 <code>Leader</code> 能处理写请求嘛？那么我们的 <code>Follower</code> 和 <code>Observer</code> 是不是也需要 <strong>同步更新数据</strong> 呢？总不能数据只在 <code>Leader</code> 中更新了，其他角色都没有得到更新吧？</p><p>不就是 <strong>在整个集群中保持数据的一致性</strong> 嘛？如果是你，你会怎么做呢？</p><p>废话，第一步肯定需要 <code>Leader</code> 将写请求 <strong>广播</strong> 出去呀，让 <code>Leader</code> 问问 <code>Followers</code> 是否同意更新，如果超过半数以上的同意那么就进行 <code>Follower</code> 和 <code>Observer</code> 的更新（和 <code>Paxos</code> 一样）。当然这么说有点虚，画张图理解一下。</p><figure><img src="https://oss.javaguide.cn/p3-juejin/b64c7f25a5d24766889da14260005e31~tplv-k3u1fbpfcp-zoom-1.jpeg" alt="消息广播" tabindex="0" loading="lazy"><figcaption>消息广播</figcaption></figure><p>嗯。。。看起来很简单，貌似懂了 🤥🤥🤥。这两个 <code>Queue</code> 哪冒出来的？答案是 <strong><code>ZAB</code> 需要让 <code>Follower</code> 和 <code>Observer</code> 保证顺序性</strong> 。何为顺序性，比如我现在有一个写请求 A，此时 <code>Leader</code> 将请求 A 广播出去，因为只需要半数同意就行，所以可能这个时候有一个 <code>Follower</code> F1 因为网络原因没有收到，而 <code>Leader</code> 又广播了一个请求 B，因为网络原因，F1 竟然先收到了请求 B 然后才收到了请求 A，这个时候请求处理的顺序不同就会导致数据的不同，从而 <strong>产生数据不一致问题</strong> 。</p><p>所以在 <code>Leader</code> 这端，它为每个其他的 <code>zkServer</code> 准备了一个 <strong>队列</strong> ，采用先进先出的方式发送消息。由于协议是 <strong>通过 <code>TCP</code></strong> 来进行网络通信的，保证了消息的发送顺序性，接受顺序性也得到了保证。</p><p>除此之外，在 <code>ZAB</code> 中还定义了一个 <strong>全局单调递增的事务 ID <code>ZXID</code></strong> ，它是一个 64 位 long 型，其中高 32 位表示 <code>epoch</code> 年代，低 32 位表示事务 id。<code>epoch</code> 是会根据 <code>Leader</code> 的变化而变化的，当一个 <code>Leader</code> 挂了，新的 <code>Leader</code> 上位的时候，年代（<code>epoch</code>）就变了。而低 32 位可以简单理解为递增的事务 id。</p><p>定义这个的原因也是为了顺序性，每个 <code>proposal</code> 在 <code>Leader</code> 中生成后需要 <strong>通过其 <code>ZXID</code> 来进行排序</strong> ，才能得到处理。</p><h3 id="崩溃恢复模式" tabindex="-1"><a class="header-anchor" href="#崩溃恢复模式" aria-hidden="true">#</a> 崩溃恢复模式</h3><p>说到崩溃恢复我们首先要提到 <code>ZAB</code> 中的 <code>Leader</code> 选举算法，当系统出现崩溃影响最大应该是 <code>Leader</code> 的崩溃，因为我们只有一个 <code>Leader</code> ，所以当 <code>Leader</code> 出现问题的时候我们势必需要重新选举 <code>Leader</code> 。</p><p><code>Leader</code> 选举可以分为两个不同的阶段，第一个是我们提到的 <code>Leader</code> 宕机需要重新选举，第二则是当 <code>Zookeeper</code> 启动时需要进行系统的 <code>Leader</code> 初始化选举。下面我先来介绍一下 <code>ZAB</code> 是如何进行初始化选举的。</p><p>假设我们集群中有 3 台机器，那也就意味着我们需要两台以上同意（超过半数）。比如这个时候我们启动了 <code>server1</code> ，它会首先 <strong>投票给自己</strong> ，投票内容为服务器的 <code>myid</code> 和 <code>ZXID</code> ，因为初始化所以 <code>ZXID</code> 都为 0，此时 <code>server1</code> 发出的投票为 (1,0)。但此时 <code>server1</code> 的投票仅为 1，所以不能作为 <code>Leader</code> ，此时还在选举阶段所以整个集群处于 <strong><code>Looking</code> 状态</strong>。</p><p>接着 <code>server2</code> 启动了，它首先也会将投票选给自己(2,0)，并将投票信息广播出去（<code>server1</code>也会，只是它那时没有其他的服务器了），<code>server1</code> 在收到 <code>server2</code> 的投票信息后会将投票信息与自己的作比较。<strong>首先它会比较 <code>ZXID</code> ，<code>ZXID</code> 大的优先为 <code>Leader</code>，如果相同则比较 <code>myid</code>，<code>myid</code> 大的优先作为 <code>Leader</code></strong>。所以此时<code>server1</code> 发现 <code>server2</code> 更适合做 <code>Leader</code>，它就会将自己的投票信息更改为(2,0)然后再广播出去，之后<code>server2</code> 收到之后发现和自己的一样无需做更改，并且自己的 <strong>投票已经超过半数</strong> ，则 <strong>确定 <code>server2</code> 为 <code>Leader</code></strong>，<code>server1</code> 也会将自己服务器设置为 <code>Following</code> 变为 <code>Follower</code>。整个服务器就从 <code>Looking</code> 变为了正常状态。</p><p>当 <code>server3</code> 启动发现集群没有处于 <code>Looking</code> 状态时，它会直接以 <code>Follower</code> 的身份加入集群。</p><p>还是前面三个 <code>server</code> 的例子，如果在整个集群运行的过程中 <code>server2</code> 挂了，那么整个集群会如何重新选举 <code>Leader</code> 呢？其实和初始化选举差不多。</p><p>首先毫无疑问的是剩下的两个 <code>Follower</code> 会将自己的状态 <strong>从 <code>Following</code> 变为 <code>Looking</code> 状态</strong> ，然后每个 <code>server</code> 会向初始化投票一样首先给自己投票（这不过这里的 <code>zxid</code> 可能不是 0 了，这里为了方便随便取个数字）。</p><p>假设 <code>server1</code> 给自己投票为(1,99)，然后广播给其他 <code>server</code>，<code>server3</code> 首先也会给自己投票(3,95)，然后也广播给其他 <code>server</code>。<code>server1</code> 和 <code>server3</code> 此时会收到彼此的投票信息，和一开始选举一样，他们也会比较自己的投票和收到的投票（<code>zxid</code> 大的优先，如果相同那么就 <code>myid</code> 大的优先）。这个时候 <code>server1</code> 收到了 <code>server3</code> 的投票发现没自己的合适故不变，<code>server3</code> 收到 <code>server1</code> 的投票结果后发现比自己的合适于是更改投票为(1,99)然后广播出去，最后 <code>server1</code> 收到了发现自己的投票已经超过半数就把自己设为 <code>Leader</code>，<code>server3</code> 也随之变为 <code>Follower</code>。</p><blockquote><p>请注意 <code>ZooKeeper</code> 为什么要设置奇数个结点？比如这里我们是三个，挂了一个我们还能正常工作，挂了两个我们就不能正常工作了（已经没有超过半数的节点数了，所以无法进行投票等操作了）。而假设我们现在有四个，挂了一个也能工作，<strong>但是挂了两个也不能正常工作了</strong>，这是和三个一样的，而三个比四个还少一个，带来的效益是一样的，所以 <code>Zookeeper</code> 推荐奇数个 <code>server</code> 。</p></blockquote><p>那么说完了 <code>ZAB</code> 中的 <code>Leader</code> 选举方式之后我们再来了解一下 <strong>崩溃恢复</strong> 是什么玩意？</p><p>其实主要就是 <strong>当集群中有机器挂了，我们整个集群如何保证数据一致性？</strong></p><p>如果只是 <code>Follower</code> 挂了，而且挂的没超过半数的时候，因为我们一开始讲了在 <code>Leader</code> 中会维护队列，所以不用担心后面的数据没接收到导致数据不一致性。</p><p>如果 <code>Leader</code> 挂了那就麻烦了，我们肯定需要先暂停服务变为 <code>Looking</code> 状态然后进行 <code>Leader</code> 的重新选举（上面我讲过了），但这个就要分为两种情况了，分别是 <strong>确保已经被 Leader 提交的提案最终能够被所有的 Follower 提交</strong> 和 <strong>跳过那些已经被丢弃的提案</strong> 。</p><p>确保已经被 Leader 提交的提案最终能够被所有的 Follower 提交是什么意思呢？</p><p>假设 <code>Leader (server2)</code> 发送 <code>commit</code> 请求（忘了请看上面的消息广播模式），他发送给了 <code>server3</code>，然后要发给 <code>server1</code> 的时候突然挂了。这个时候重新选举的时候我们如果把 <code>server1</code> 作为 <code>Leader</code> 的话，那么肯定会产生数据不一致性，因为 <code>server3</code> 肯定会提交刚刚 <code>server2</code> 发送的 <code>commit</code> 请求的提案，而 <code>server1</code> 根本没收到所以会丢弃。</p><figure><img src="https://oss.javaguide.cn/p3-juejin/4b8365e80bdf441ea237847fb91236b7~tplv-k3u1fbpfcp-zoom-1.jpeg" alt="崩溃恢复" tabindex="0" loading="lazy"><figcaption>崩溃恢复</figcaption></figure><p>那怎么解决呢？</p><p>聪明的同学肯定会质疑，<strong>这个时候 <code>server1</code> 已经不可能成为 <code>Leader</code> 了，因为 <code>server1</code> 和 <code>server3</code> 进行投票选举的时候会比较 <code>ZXID</code> ，而此时 <code>server3</code> 的 <code>ZXID</code> 肯定比 <code>server1</code> 的大了</strong>。(不理解可以看前面的选举算法)</p><p>那么跳过那些已经被丢弃的提案又是什么意思呢？</p><p>假设 <code>Leader (server2)</code> 此时同意了提案 N1，自身提交了这个事务并且要发送给所有 <code>Follower</code> 要 <code>commit</code> 的请求，却在这个时候挂了，此时肯定要重新进行 <code>Leader</code> 的选举，比如说此时选 <code>server1</code> 为 <code>Leader</code> （这无所谓）。但是过了一会，这个 <strong>挂掉的 <code>Leader</code> 又重新恢复了</strong> ，此时它肯定会作为 <code>Follower</code> 的身份进入集群中，需要注意的是刚刚 <code>server2</code> 已经同意提交了提案 N1，但其他 <code>server</code> 并没有收到它的 <code>commit</code> 信息，所以其他 <code>server</code> 不可能再提交这个提案 N1 了，这样就会出现数据不一致性问题了，所以 <strong>该提案 N1 最终需要被抛弃掉</strong> 。</p><figure><img src="https://oss.javaguide.cn/p3-juejin/99cdca39ad6340ae8b77e8befe94e36e~tplv-k3u1fbpfcp-zoom-1.jpeg" alt="崩溃恢复" tabindex="0" loading="lazy"><figcaption>崩溃恢复</figcaption></figure><h2 id="zookeeper-的几个理论知识" tabindex="-1"><a class="header-anchor" href="#zookeeper-的几个理论知识" aria-hidden="true">#</a> Zookeeper 的几个理论知识</h2><p>了解了 <code>ZAB</code> 协议还不够，它仅仅是 <code>Zookeeper</code> 内部实现的一种方式，而我们如何通过 <code>Zookeeper</code> 去做一些典型的应用场景呢？比如说集群管理，分布式锁，<code>Master</code> 选举等等。</p><p>这就涉及到如何使用 <code>Zookeeper</code> 了，但在使用之前我们还需要掌握几个概念。比如 <code>Zookeeper</code> 的 <strong>数据模型</strong>、<strong>会话机制</strong>、<strong>ACL</strong>、<strong>Watcher 机制</strong> 等等。</p><h3 id="数据模型" tabindex="-1"><a class="header-anchor" href="#数据模型" aria-hidden="true">#</a> 数据模型</h3><p><code>zookeeper</code> 数据存储结构与标准的 <code>Unix</code> 文件系统非常相似，都是在根节点下挂很多子节点(树型)。但是 <code>zookeeper</code> 中没有文件系统中目录与文件的概念，而是 <strong>使用了 <code>znode</code> 作为数据节点</strong> 。<code>znode</code> 是 <code>zookeeper</code> 中的最小数据单元，每个 <code>znode</code> 上都可以保存数据，同时还可以挂载子节点，形成一个树形化命名空间。</p><figure><img src="https://oss.javaguide.cn/p3-juejin/663240470d524dd4ac6e68bde0b666eb~tplv-k3u1fbpfcp-zoom-1.jpeg" alt="zk数据模型" tabindex="0" loading="lazy"><figcaption>zk数据模型</figcaption></figure><p>每个 <code>znode</code> 都有自己所属的 <strong>节点类型</strong> 和 <strong>节点状态</strong>。</p><p>其中节点类型可以分为 <strong>持久节点</strong>、<strong>持久顺序节点</strong>、<strong>临时节点</strong> 和 <strong>临时顺序节点</strong>。</p><ul><li>持久节点：一旦创建就一直存在，直到将其删除。</li><li>持久顺序节点：一个父节点可以为其子节点 <strong>维护一个创建的先后顺序</strong> ，这个顺序体现在 <strong>节点名称</strong> 上，是节点名称后自动添加一个由 10 位数字组成的数字串，从 0 开始计数。</li><li>临时节点：临时节点的生命周期是与 <strong>客户端会话</strong> 绑定的，<strong>会话消失则节点消失</strong> 。临时节点 <strong>只能做叶子节点</strong> ，不能创建子节点。</li><li>临时顺序节点：父节点可以创建一个维持了顺序的临时节点(和前面的持久顺序性节点一样)。</li></ul><p>节点状态中包含了很多节点的属性比如 <code>czxid</code>、<code>mzxid</code> 等等，在 <code>zookeeper</code> 中是使用 <code>Stat</code> 这个类来维护的。下面我列举一些属性解释。</p><ul><li><code>czxid</code>：<code>Created ZXID</code>，该数据节点被 <strong>创建</strong> 时的事务 ID。</li><li><code>mzxid</code>：<code>Modified ZXID</code>，节点 <strong>最后一次被更新时</strong> 的事务 ID。</li><li><code>ctime</code>：<code>Created Time</code>，该节点被创建的时间。</li><li><code>mtime</code>：<code>Modified Time</code>，该节点最后一次被修改的时间。</li><li><code>version</code>：节点的版本号。</li><li><code>cversion</code>：<strong>子节点</strong> 的版本号。</li><li><code>aversion</code>：节点的 <code>ACL</code> 版本号。</li><li><code>ephemeralOwner</code>：创建该节点的会话的 <code>sessionID</code> ，如果该节点为持久节点，该值为 0。</li><li><code>dataLength</code>：节点数据内容的长度。</li><li><code>numChildre</code>：该节点的子节点个数，如果为临时节点为 0。</li><li><code>pzxid</code>：该节点子节点列表最后一次被修改时的事务 ID，注意是子节点的 <strong>列表</strong> ，不是内容。</li></ul><h3 id="会话" tabindex="-1"><a class="header-anchor" href="#会话" aria-hidden="true">#</a> 会话</h3><p>我想这个对于后端开发的朋友肯定不陌生，不就是 <code>session</code> 吗？只不过 <code>zk</code> 客户端和服务端是通过 <strong><code>TCP</code> 长连接</strong> 维持的会话机制，其实对于会话来说你可以理解为 <strong>保持连接状态</strong> 。</p><p>在 <code>zookeeper</code> 中，会话还有对应的事件，比如 <code>CONNECTION_LOSS 连接丢失事件</code>、<code>SESSION_MOVED 会话转移事件</code>、<code>SESSION_EXPIRED 会话超时失效事件</code> 。</p><h3 id="acl" tabindex="-1"><a class="header-anchor" href="#acl" aria-hidden="true">#</a> ACL</h3><p><code>ACL</code> 为 <code>Access Control Lists</code> ，它是一种权限控制。在 <code>zookeeper</code> 中定义了 5 种权限，它们分别为：</p><ul><li><code>CREATE</code>：创建子节点的权限。</li><li><code>READ</code>：获取节点数据和子节点列表的权限。</li><li><code>WRITE</code>：更新节点数据的权限。</li><li><code>DELETE</code>：删除子节点的权限。</li><li><code>ADMIN</code>：设置节点 ACL 的权限。</li></ul><h3 id="watcher-机制" tabindex="-1"><a class="header-anchor" href="#watcher-机制" aria-hidden="true">#</a> Watcher 机制</h3><p><code>Watcher</code> 为事件监听器，是 <code>zk</code> 非常重要的一个特性，很多功能都依赖于它，它有点类似于订阅的方式，即客户端向服务端 <strong>注册</strong> 指定的 <code>watcher</code> ，当服务端符合了 <code>watcher</code> 的某些事件或要求则会 <strong>向客户端发送事件通知</strong> ，客户端收到通知后找到自己定义的 <code>Watcher</code> 然后 <strong>执行相应的回调方法</strong> 。</p><figure><img src="https://oss.javaguide.cn/p3-juejin/ac87b7cff7b44c63997ff0f6a7b6d2eb~tplv-k3u1fbpfcp-zoom-1.jpeg" alt="watcher机制" tabindex="0" loading="lazy"><figcaption>watcher机制</figcaption></figure><h2 id="zookeeper-的几个典型应用场景" tabindex="-1"><a class="header-anchor" href="#zookeeper-的几个典型应用场景" aria-hidden="true">#</a> Zookeeper 的几个典型应用场景</h2><p>前面说了这么多的理论知识，你可能听得一头雾水，这些玩意有啥用？能干啥事？别急，听我慢慢道来。</p><figure><img src="https://oss.javaguide.cn/p3-juejin/dbc1a52b0c304bb093ef08fb1d4c704c~tplv-k3u1fbpfcp-zoom-1.jpeg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="选主" tabindex="-1"><a class="header-anchor" href="#选主" aria-hidden="true">#</a> 选主</h3><p>还记得上面我们的所说的临时节点吗？因为 <code>Zookeeper</code> 的强一致性，能够很好地在保证 <strong>在高并发的情况下保证节点创建的全局唯一性</strong> (即无法重复创建同样的节点)。</p><p>利用这个特性，我们可以 <strong>让多个客户端创建一个指定的节点</strong> ，创建成功的就是 <code>master</code>。</p><p>但是，如果这个 <code>master</code> 挂了怎么办？？？</p><p>你想想为什么我们要创建临时节点？还记得临时节点的生命周期吗？<code>master</code> 挂了是不是代表会话断了？会话断了是不是意味着这个节点没了？还记得 <code>watcher</code> 吗？我们是不是可以 <strong>让其他不是 <code>master</code> 的节点监听节点的状态</strong> ，比如说我们监听这个临时节点的父节点，如果子节点个数变了就代表 <code>master</code> 挂了，这个时候我们 <strong>触发回调函数进行重新选举</strong> ，或者我们直接监听节点的状态，我们可以通过节点是否已经失去连接来判断 <code>master</code> 是否挂了等等。</p><figure><img src="https://oss.javaguide.cn/p3-juejin/00468757fb8f4f51875f645fbb7b25a2~tplv-k3u1fbpfcp-zoom-1.jpeg" alt="选主" tabindex="0" loading="lazy"><figcaption>选主</figcaption></figure><p>总的来说，我们可以完全 <strong>利用 临时节点、节点状态 和 <code>watcher</code> 来实现选主的功能</strong>，临时节点主要用来选举，节点状态和<code>watcher</code> 可以用来判断 <code>master</code> 的活性和进行重新选举。</p><h3 id="分布式锁" tabindex="-1"><a class="header-anchor" href="#分布式锁" aria-hidden="true">#</a> 分布式锁</h3><p>分布式锁的实现方式有很多种，比如 <code>Redis</code>、数据库、<code>zookeeper</code> 等。个人认为 <code>zookeeper</code> 在实现分布式锁这方面是非常非常简单的。</p><p>上面我们已经提到过了 <strong>zk 在高并发的情况下保证节点创建的全局唯一性</strong>，这玩意一看就知道能干啥了。实现互斥锁呗，又因为能在分布式的情况下，所以能实现分布式锁呗。</p><p>如何实现呢？这玩意其实跟选主基本一样，我们也可以利用临时节点的创建来实现。</p><p>首先肯定是如何获取锁，因为创建节点的唯一性，我们可以让多个客户端同时创建一个临时节点，<strong>创建成功的就说明获取到了锁</strong> 。然后没有获取到锁的客户端也像上面选主的非主节点创建一个 <code>watcher</code> 进行节点状态的监听，如果这个互斥锁被释放了（可能获取锁的客户端宕机了，或者那个客户端主动释放了锁）可以调用回调函数重新获得锁。</p><blockquote><p><code>zk</code> 中不需要向 <code>redis</code> 那样考虑锁得不到释放的问题了，因为当客户端挂了，节点也挂了，锁也释放了。是不是很简单？</p></blockquote><p>那能不能使用 <code>zookeeper</code> 同时实现 <strong>共享锁和独占锁</strong> 呢？答案是可以的，不过稍微有点复杂而已。</p><p>还记得 <strong>有序的节点</strong> 吗？</p><p>这个时候我规定所有创建节点必须有序，当你是读请求（要获取共享锁）的话，如果 <strong>没有比自己更小的节点，或比自己小的节点都是读请求</strong> ，则可以获取到读锁，然后就可以开始读了。<strong>若比自己小的节点中有写请求</strong> ，则当前客户端无法获取到读锁，只能等待前面的写请求完成。</p><p>如果你是写请求（获取独占锁），若 <strong>没有比自己更小的节点</strong> ，则表示当前客户端可以直接获取到写锁，对数据进行修改。若发现 <strong>有比自己更小的节点，无论是读操作还是写操作，当前客户端都无法获取到写锁</strong> ，等待所有前面的操作完成。</p><p>这就很好地同时实现了共享锁和独占锁，当然还有优化的地方，比如当一个锁得到释放它会通知所有等待的客户端从而造成 <strong>羊群效应</strong> 。此时你可以通过让等待的节点只监听他们前面的节点。</p><p>具体怎么做呢？其实也很简单，你可以让 <strong>读请求监听比自己小的最后一个写请求节点，写请求只监听比自己小的最后一个节点</strong> ，感兴趣的小伙伴可以自己去研究一下。</p><h3 id="命名服务" tabindex="-1"><a class="header-anchor" href="#命名服务" aria-hidden="true">#</a> 命名服务</h3><p>如何给一个对象设置 ID，大家可能都会想到 <code>UUID</code>，但是 <code>UUID</code> 最大的问题就在于它太长了。。。(太长不一定是好事，嘿嘿嘿)。那么在条件允许的情况下，我们能不能使用 <code>zookeeper</code> 来实现呢？</p><p>我们之前提到过 <code>zookeeper</code> 是通过 <strong>树形结构</strong> 来存储数据节点的，那也就是说，对于每个节点的 <strong>全路径</strong>，它必定是唯一的，我们可以使用节点的全路径作为命名方式了。而且更重要的是，路径是我们可以自己定义的，这对于我们对有些有语意的对象的 ID 设置可以更加便于理解。</p><h3 id="集群管理和注册中心" tabindex="-1"><a class="header-anchor" href="#集群管理和注册中心" aria-hidden="true">#</a> 集群管理和注册中心</h3><p>看到这里是不是觉得 <code>zookeeper</code> 实在是太强大了，它怎么能这么能干！</p><p>别急，它能干的事情还很多呢。可能我们会有这样的需求，我们需要了解整个集群中有多少机器在工作，我们想对集群中的每台机器的运行时状态进行数据采集，对集群中机器进行上下线操作等等。</p><p>而 <code>zookeeper</code> 天然支持的 <code>watcher</code> 和 临时节点能很好的实现这些需求。我们可以为每条机器创建临时节点，并监控其父节点，如果子节点列表有变动（我们可能创建删除了临时节点），那么我们可以使用在其父节点绑定的 <code>watcher</code> 进行状态监控和回调。</p><figure><img src="https://oss.javaguide.cn/p3-juejin/f3d70709f10f4fa6b09125a56a976fda~tplv-k3u1fbpfcp-zoom-1.jpeg" alt="集群管理" tabindex="0" loading="lazy"><figcaption>集群管理</figcaption></figure><p>至于注册中心也很简单，我们同样也是让 <strong>服务提供者</strong> 在 <code>zookeeper</code> 中创建一个临时节点并且将自己的 <code>ip、port、调用方式</code> 写入节点，当 <strong>服务消费者</strong> 需要进行调用的时候会 <strong>通过注册中心找到相应的服务的地址列表(IP 端口什么的)</strong> ，并缓存到本地(方便以后调用)，当消费者调用服务时，不会再去请求注册中心，而是直接通过负载均衡算法从地址列表中取一个服务提供者的服务器调用服务。</p><p>当服务提供者的某台服务器宕机或下线时，相应的地址会从服务提供者地址列表中移除。同时，注册中心会将新的服务地址列表发送给服务消费者的机器并缓存在消费者本机（当然你可以让消费者进行节点监听，我记得 <code>Eureka</code> 会先试错，然后再更新）。</p><figure><img src="https://oss.javaguide.cn/p3-juejin/469cebf9670740d1a6711fe54db70e05~tplv-k3u1fbpfcp-zoom-1.jpeg" alt="注册中心" tabindex="0" loading="lazy"><figcaption>注册中心</figcaption></figure><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p>看到这里的同学实在是太有耐心了 👍👍👍 不知道大家是否还记得我讲了什么 😒。</p><figure><img src="https://oss.javaguide.cn/p3-juejin/912c1aa6b7794d4aac8ebe6a14832cae~tplv-k3u1fbpfcp-zoom-1.jpeg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>这篇文章中我带大家入门了 <code>zookeeper</code> 这个强大的分布式协调框架。现在我们来简单梳理一下整篇文章的内容。</p><ul><li><p>分布式与集群的区别</p></li><li><p><code>2PC</code>、<code>3PC</code> 以及 <code>paxos</code> 算法这些一致性框架的原理和实现。</p></li><li><p><code>zookeeper</code> 专门的一致性算法 <code>ZAB</code> 原子广播协议的内容（<code>Leader</code> 选举、崩溃恢复、消息广播）。</p></li><li><p><code>zookeeper</code> 中的一些基本概念，比如 <code>ACL</code>，数据节点，会话，<code>watcher</code>机制等等。</p></li><li><p><code>zookeeper</code> 的典型应用场景，比如选主，注册中心等等。</p><p>如果忘了可以回去看看再次理解一下，如果有疑问和建议欢迎提出 🤝🤝🤝。</p></li></ul><p>File not found</p>',163);function l(f,h){const c=r("ExternalLinkIcon");return a(),t("div",null,[e("blockquote",null,[e("p",null,[e("a",i,[o("FrancisQ"),p(c)]),o(" 投稿。")])]),g])}const m=d(n,[["render",l],["__file","zookeeper-plus.html.vue"]]);export{m as default};

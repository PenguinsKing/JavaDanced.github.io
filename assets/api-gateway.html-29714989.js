import{_ as i}from"./plugin-vue_export-helper-c27b6911.js";import{r as o,o as l,c as r,a as n,b as e,d as t,e as s}from"./app-a569c9af.js";const p={},u=s('<h2 id="什么是网关" tabindex="-1"><a class="header-anchor" href="#什么是网关" aria-hidden="true">#</a> 什么是网关？</h2><p>微服务背景下，一个系统被拆分为多个服务，但是像安全认证，流量控制，日志，监控等功能是每个服务都需要的，没有网关的话，我们就需要在每个服务中单独实现，这使得我们做了很多重复的事情并且没有一个全局的视图来统一管理这些功能。</p><figure><img src="https://oss.javaguide.cn/github/javaguide/system-design/distributed-system/api-gateway-overview.png" alt="网关示意图" tabindex="0" loading="lazy"><figcaption>网关示意图</figcaption></figure><p>一般情况下，网关可以为我们提供请求转发、安全认证（身份/权限认证）、流量控制、负载均衡、降级熔断、日志、监控、参数校验、协议转换等功能。</p><p>上面介绍了这么多功能，实际上，网关主要做了两件事情：<strong>请求转发</strong> + <strong>请求过滤</strong>。</p><p>由于引入网关之后，会多一步网络转发，因此性能会有一点影响（几乎可以忽略不计，尤其是内网访问的情况下）。 另外，我们需要保障网关服务的高可用，避免单点风险。</p><p>如下图所示，网关服务外层通过 Nginx（其他负载均衡设备/软件也行） 进⾏负载转发以达到⾼可⽤。Nginx 在部署的时候，尽量也要考虑高可用，避免单点风险。</p><figure><img src="https://oss.javaguide.cn/github/javaguide/high-performance/load-balancing/server-load-balancing.png" alt="基于 Nginx 的服务端负载均衡" tabindex="0" loading="lazy"><figcaption>基于 Nginx 的服务端负载均衡</figcaption></figure><h2 id="网关能提供哪些功能" tabindex="-1"><a class="header-anchor" href="#网关能提供哪些功能" aria-hidden="true">#</a> 网关能提供哪些功能？</h2><p>绝大部分网关可以提供下面这些功能（有一些功能需要借助其他框架或者中间件）：</p><ul><li><strong>请求转发</strong>：将请求转发到目标微服务。</li><li><strong>负载均衡</strong>：根据各个微服务实例的负载情况或者具体的负载均衡策略配置对请求实现动态的负载均衡。</li><li><strong>安全认证</strong>：对用户请求进行身份验证并仅允许可信客户端访问 API，并且还能够使用类似 RBAC 等方式来授权。</li><li><strong>参数校验</strong>：支持参数映射与校验逻辑。</li><li><strong>日志记录</strong>：记录所有请求的行为日志供后续使用。</li><li><strong>监控告警</strong>：从业务指标、机器指标、JVM 指标等方面进行监控并提供配套的告警机制。</li><li><strong>流量控制</strong>：对请求的流量进行控制，也就是限制某一时刻内的请求数。</li><li><strong>熔断降级</strong>：实时监控请求的统计信息，达到配置的失败阈值后，自动熔断，返回默认值。</li><li><strong>响应缓存</strong>：当用户请求获取的是一些静态的或更新不频繁的数据时，一段时间内多次请求获取到的数据很可能是一样的。对于这种情况可以将响应缓存起来。这样用户请求可以直接在网关层得到响应数据，无需再去访问业务服务，减轻业务服务的负担。</li><li><strong>响应聚合</strong>：某些情况下用户请求要获取的响应内容可能会来自于多个业务服务。网关作为业务服务的调用方，可以把多个服务的响应整合起来，再一并返回给用户。</li><li><strong>灰度发布</strong>：将请求动态分流到不同的服务版本（最基本的一种灰度发布）。</li><li><strong>异常处理</strong>：对于业务服务返回的异常响应，可以在网关层在返回给用户之前做转换处理。这样可以把一些业务侧返回的异常细节隐藏，转换成用户友好的错误提示返回。</li><li><strong>API 文档：</strong> 如果计划将 API 暴露给组织以外的开发人员，那么必须考虑使用 API 文档，例如 Swagger 或 OpenAPI。</li><li><strong>协议转换</strong>：通过协议转换整合后台基于 REST、AMQP、Dubbo 等不同风格和实现技术的微服务，面向 Web Mobile、开放平台等特定客户端提供统一服务。</li><li><strong>证书管理</strong>：将 SSL 证书部署到 API 网关，由一个统一的入口管理接口，降低了证书更换时的复杂度。</li></ul>',11),g={href:"https://mp.weixin.qq.com/s/iITqdIiHi3XGKq6u6FRVdg",target:"_blank",rel:"noopener noreferrer"},c=s('<figure><img src="https://oss.javaguide.cn/github/javaguide/distributed-system/api-gateway/up-35e102c633bbe8e0dea1e075ea3fee5dcfb.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="有哪些常见的网关系统" tabindex="-1"><a class="header-anchor" href="#有哪些常见的网关系统" aria-hidden="true">#</a> 有哪些常见的网关系统？</h2><h3 id="netflix-zuul" tabindex="-1"><a class="header-anchor" href="#netflix-zuul" aria-hidden="true">#</a> Netflix Zuul</h3><p>Zuul 是 Netflix 开发的一款提供动态路由、监控、弹性、安全的网关服务，基于 Java 技术栈开发，可以和 Eureka、Ribbon、Hystrix 等组件配合使用。</p><p>Zuul 核心架构如下：</p><figure><img src="https://oss.javaguide.cn/github/javaguide/distributed-system/api-gateway/zuul-core-architecture.webp" alt="Zuul 核心架构" tabindex="0" loading="lazy"><figcaption>Zuul 核心架构</figcaption></figure><p>Zuul 主要通过过滤器（类似于 AOP）来过滤请求，从而实现网关必备的各种功能。</p><figure><img src="https://oss.javaguide.cn/github/javaguide/system-design/distributed-system/api-gateway/zuul-request-lifecycle.webp" alt="Zuul 请求声明周期" tabindex="0" loading="lazy"><figcaption>Zuul 请求声明周期</figcaption></figure>',8),d={href:"https://github.com/marcosbarbero/spring-cloud-zuul-ratelimit",target:"_blank",rel:"noopener noreferrer"},h=s(`<div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>org.springframework.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>spring-cloud-starter-netflix-zuul<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>com.marcosbarbero.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>spring-cloud-zuul-ratelimit<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>2.2.0.RELEASE<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1),b={href:"https://netflixtechblog.com/announcing-zuul-edge-service-in-the-cloud-ab3af5be08ee",target:"_blank",rel:"noopener noreferrer"},f={href:"https://netflixtechblog.com/open-sourcing-zuul-2-82ea476cb2b3",target:"_blank",rel:"noopener noreferrer"},_=n("figure",null,[n("img",{src:"https://oss.javaguide.cn/github/javaguide/distributed-system/api-gateway/zuul2-core-architecture.png",alt:"Zuul2 架构",tabindex:"0",loading:"lazy"}),n("figcaption",null,"Zuul2 架构")],-1),k={href:"https://github.com/Netflix/zuul",target:"_blank",rel:"noopener noreferrer"},y={href:"https://github.com/Netflix/zuul/wiki",target:"_blank",rel:"noopener noreferrer"},m=n("h3",{id:"spring-cloud-gateway",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#spring-cloud-gateway","aria-hidden":"true"},"#"),e(" Spring Cloud Gateway")],-1),v=n("p",null,[e("SpringCloud Gateway 属于 Spring Cloud 生态系统中的网关，其诞生的目标是为了替代老牌网关 "),n("strong",null,"Zuul"),e("。准确点来说，应该是 Zuul 1.x。SpringCloud Gateway 起步要比 Zuul 2.x 更早。")],-1),x=n("p",null,"为了提升网关的性能，SpringCloud Gateway 基于 Spring WebFlux 。Spring WebFlux 使用 Reactor 库来实现响应式编程模型，底层基于 Netty 实现同步非阻塞的 I/O。",-1),I=n("figure",null,[n("img",{src:"https://oss.javaguide.cn/github/javaguide/system-design/distributed-system/api-gateway/springcloud-gateway- demo.png",alt:"",tabindex:"0",loading:"lazy"}),n("figcaption")],-1),S=n("p",null,"Spring Cloud Gateway 不仅提供统一的路由方式，并且基于 Filter 链的方式提供了网关基本的功能，例如：安全，监控/指标，限流。",-1),w=n("p",null,"Spring Cloud Gateway 和 Zuul 2.x 的差别不大，也是通过过滤器来处理请求。不过，目前更加推荐使用 Spring Cloud Gateway 而非 Zuul，Spring Cloud 生态对其支持更加友好。",-1),A={href:"https://github.com/spring-cloud/spring-cloud-gateway",target:"_blank",rel:"noopener noreferrer"},P={href:"https://spring.io/projects/spring-cloud-gateway",target:"_blank",rel:"noopener noreferrer"},z=s('<h3 id="openresty" tabindex="-1"><a class="header-anchor" href="#openresty" aria-hidden="true">#</a> OpenResty</h3><p>根据官方介绍：</p><blockquote><p>OpenResty 是一个基于 Nginx 与 Lua 的高性能 Web 平台，其内部集成了大量精良的 Lua 库、第三方模块以及大多数的依赖项。用于方便地搭建能够处理超高并发、扩展性极高的动态 Web 应用、Web 服务和动态网关。</p></blockquote><figure><img src="https://oss.javaguide.cn/github/javaguide/system-design/distributed-system/api-gatewaynginx-lua-openresty.png" alt="OpenResty 和 Nginx 以及 Lua 的关系" tabindex="0" loading="lazy"><figcaption>OpenResty 和 Nginx 以及 Lua 的关系</figcaption></figure><p>OpenResty 基于 Nginx，主要还是看中了其优秀的高并发能力。不过，由于 Nginx 采用 C 语言开发，二次开发门槛较高。如果想在 Nginx 上实现一些自定义的逻辑或功能，就需要编写 C 语言的模块，并重新编译 Nginx。</p><p>为了解决这个问题，OpenResty 通过实现 <code>ngx_lua</code> 和 <code>stream_lua</code> 等 Nginx 模块，把 Lua/LuaJIT 完美地整合进了 Nginx，从而让我们能够在 Nginx 内部里嵌入 Lua 脚本，使得可以通过简单的 Lua 语言来扩展网关的功能，比如实现自定义的路由规则、过滤器、缓存策略等。</p><blockquote><p>Lua 是一种非常快速的动态脚本语言，它的运行速度接近于 C 语言。LuaJIT 是 Lua 的一个即时编译器，它可以显著提高 Lua 代码的执行效率。LuaJIT 将一些常用的 Lua 函数和工具库预编译并缓存，这样在下次调用时就可以直接使用缓存的字节码，从而大大加快了执行速度。</p></blockquote>',7),N={href:"https://mp.weixin.qq.com/s/3HglZs06W95vF3tSa3KrXw",target:"_blank",rel:"noopener noreferrer"},X={href:"https://github.com/openresty/openresty",target:"_blank",rel:"noopener noreferrer"},K={href:"https://openresty.org/",target:"_blank",rel:"noopener noreferrer"},j=n("h3",{id:"kong",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#kong","aria-hidden":"true"},"#"),e(" Kong")],-1),q={href:"https://github.com/openresty/",target:"_blank",rel:"noopener noreferrer"},L=s(`<ul><li>Kong Server：基于 Nginx 的服务器，用来接收 API 请求。</li><li>Apache Cassandra/PostgreSQL：用来存储操作数据。</li><li>Kong Dashboard：官方推荐 UI 管理工具，当然，也可以使用 RESTful 方式 管理 Admin api。</li></ul><figure><img src="https://oss.javaguide.cn/github/javaguide/system-design/distributed-system/api-gateway/kong-way.webp" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>由于默认使用 Apache Cassandra/PostgreSQL 存储数据，Kong 的整个架构比较臃肿，并且会带来高可用的问题。</p><p>Kong 提供了插件机制来扩展其功能，插件在 API 请求响应循环的生命周期中被执行。比如在服务上启用 Zipkin 插件：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">curl</span> <span class="token parameter variable">-X</span> POST http://kong:8001/services/<span class="token punctuation">{</span>service<span class="token punctuation">}</span>/plugins <span class="token punctuation">\\</span>
    <span class="token parameter variable">--data</span> <span class="token string">&quot;name=zipkin&quot;</span>  <span class="token punctuation">\\</span>
    <span class="token parameter variable">--data</span> <span class="token string">&quot;config.http_endpoint=http://your.zipkin.collector:9411/api/v2/spans&quot;</span> <span class="token punctuation">\\</span>
    <span class="token parameter variable">--data</span> <span class="token string">&quot;config.sample_ratio=0.001&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Kong 本身就是一个 Lua 应用程序，并且是在 Openresty 的基础之上做了一层封装的应用。归根结底就是利用 Lua 嵌入 Nginx 的方式，赋予了 Nginx 可编程的能力，这样以插件的形式在 Nginx 这一层能够做到无限想象的事情。例如限流、安全访问策略、路由、负载均衡等等。编写一个 Kong 插件，就是按照 Kong 插件编写规范，写一个自己自定义的 Lua 脚本，然后加载到 Kong 中，最后引用即可。</p><figure><img src="https://oss.javaguide.cn/github/javaguide/system-design/distributed-system/api-gateway/kong-gateway-overview.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>除了 Lua，Kong 还可以基于 Go 、JavaScript、Python 等语言开发插件，得益于对应的 PDK（插件开发工具包）。</p>`,8),G={href:"https://docs.konghq.com/gateway/latest/kong-plugins/",target:"_blank",rel:"noopener noreferrer"},C={href:"https://github.com/Kong/kong",target:"_blank",rel:"noopener noreferrer"},Z={href:"https://konghq.com/kong",target:"_blank",rel:"noopener noreferrer"},R=s('<h3 id="apisix" tabindex="-1"><a class="header-anchor" href="#apisix" aria-hidden="true">#</a> APISIX</h3><p>APISIX 是一款基于 OpenResty 和 etcd 的高性能、云原生、可扩展的网关系统。</p><blockquote><p>etcd 是使用 Go 语言开发的一个开源的、高可用的分布式 key-value 存储系统，使用 Raft 协议做分布式共识。</p></blockquote><p>与传统 API 网关相比，APISIX 具有动态路由和插件热加载，特别适合微服务系统下的 API 管理。并且，APISIX 与 SkyWalking（分布式链路追踪系统）、Zipkin（分布式链路追踪系统）、Prometheus（监控系统） 等 DevOps 生态工具对接都十分方便。</p><figure><img src="https://oss.javaguide.cn/github/javaguide/distributed-system/api-gateway/apisix-architecture.png" alt="APISIX 架构图" tabindex="0" loading="lazy"><figcaption>APISIX 架构图</figcaption></figure><p>作为 Nginx 和 Kong 的替代项目，APISIX 目前已经是 Apache 顶级开源项目，并且是最快毕业的国产开源项目。国内目前已经有很多知名企业（比如金山、有赞、爱奇艺、腾讯、贝壳）使用 APISIX 处理核心的业务流量。</p><p>根据官网介绍：“APISIX 已经生产可用，功能、性能、架构全面优于 Kong”。</p><p>APISIX 同样支持定制化的插件开发。开发者除了能够使用 Lua 语言开发插件，还能通过下面两种方式开发来避开 Lua 语言的学习成本：</p><ul><li>通过 Plugin Runner 来支持更多的主流编程语言（比如 Java、Python、Go 等等）。通过这样的方式，可以让后端工程师通过本地 RPC 通信，使用熟悉的编程语言开发 APISIX 的插件。这样做的好处是减少了开发成本，提高了开发效率，但是在性能上会有一些损失。</li><li>使用 Wasm（WebAssembly） 开发插件。Wasm 被嵌入到了 APISIX 中，用户可以使用 Wasm 去编译成 Wasm 的字节码在 APISIX 中运行。</li></ul><blockquote><p>Wasm 是基于堆栈的虚拟机的二进制指令格式，一种低级汇编语言，旨在非常接近已编译的机器代码，并且非常接近本机性能。Wasm 最初是为浏览器构建的，但是随着技术的成熟，在服务器端看到了越来越多的用例。</p></blockquote><figure><img src="https://oss.javaguide.cn/github/javaguide/distributed-system/api-gateway/up-a240d3b113cde647f5850f4c7cc55d4ff5c.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>',11),O={href:"https://github.com/apache/apisix",target:"_blank",rel:"noopener noreferrer"},W={href:"https://apisix.apache.org/zh/",target:"_blank",rel:"noopener noreferrer"},E=n("p",null,"相关阅读：",-1),J={href:"https://mp.weixin.qq.com/s/j8ggPGEHFu3x5ekJZyeZnA",target:"_blank",rel:"noopener noreferrer"},F={href:"https://www.apiseven.com/zh/blog/why-we-need-Apache-APISIX",target:"_blank",rel:"noopener noreferrer"},T={href:"https://www.apiseven.com/zh/blog",target:"_blank",rel:"noopener noreferrer"},V={href:"https://www.apiseven.com/zh/usercases",target:"_blank",rel:"noopener noreferrer"},H=n("h3",{id:"shenyu",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#shenyu","aria-hidden":"true"},"#"),e(" Shenyu")],-1),B=n("p",null,"Shenyu 是一款基于 WebFlux 的可扩展、高性能、响应式网关，Apache 顶级开源项目。",-1),D=n("figure",null,[n("img",{src:"https://oss.javaguide.cn/github/javaguide/distributed-system/api-gateway/shenyu-architecture.png",alt:"Shenyu 架构",tabindex:"0",loading:"lazy"}),n("figcaption",null,"Shenyu 架构")],-1),Q=n("p",null,"Shenyu 通过插件扩展功能，插件是 ShenYu 的灵魂，并且插件也是可扩展和热插拔的。不同的插件实现不同的功能。Shenyu 自带了诸如限流、熔断、转发、重写、重定向、和路由监控等插件。",-1),M={href:"https://github.com/apache/incubator-shenyu",target:"_blank",rel:"noopener noreferrer"},U={href:"https://shenyu.apache.org/",target:"_blank",rel:"noopener noreferrer"},Y=s('<h2 id="如何选择" tabindex="-1"><a class="header-anchor" href="#如何选择" aria-hidden="true">#</a> 如何选择？</h2><p>上面介绍的几个常见的网关系统，最常用的是 Spring Cloud Gateway、Kong、APISIX 这三个。</p><p>对于公司业务以 Java 为主要开发语言的情况下，Spring Cloud Gateway 通常是个不错的选择，其优点有：简单易用、成熟稳定、与 Spring Cloud 生态系统兼容、Spring 社区成熟等等。不过，Spring Cloud Gateway 也有一些局限性和不足之处， 一般还需要结合其他网关一起使用比如 OpenResty。并且，其性能相比较于 Kong 和 APISIX，还是差一些。如果对性能要求比较高的话，Spring Cloud Gateway 不是一个好的选择。</p><p>Kong 和 APISIX 功能更丰富，性能更强大，技术架构更贴合云原生。Kong 是开源 API 网关的鼻祖，生态丰富，用户群体庞大。APISIX 属于后来者，更优秀一些，根据 APISIX 官网介绍：“APISIX 已经生产可用，功能、性能、架构全面优于 Kong”。下面简单对比一下二者：</p><ul><li>APISIX 基于 etcd 来做配置中心，不存在单点问题，云原生友好；而 Kong 基于 Apache Cassandra/PostgreSQL ，存在单点风险，需要额外的基础设施保障做高可用。</li><li>APISIX 支持热更新，并且实现了毫秒级别的热更新响应；而 Kong 不支持热更新。</li><li>APISIX 的性能要优于 Kong 。</li><li>APISIX 支持的插件更多，功能更丰富。</li></ul><h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考" aria-hidden="true">#</a> 参考</h2>',6),$={href:"https://cloud.tencent.com/developer/article/2104299",target:"_blank",rel:"noopener noreferrer"},nn={href:"https://xie.infoq.cn/article/10e4dab2de0bdb6f2c3c93da6",target:"_blank",rel:"noopener noreferrer"},en={href:"https://blog.fintopia.tech/60e27b0e2078082a378ec5ed/",target:"_blank",rel:"noopener noreferrer"},an={href:"https://apisix.apache.org/zh/blog/2023/03/08/why-do-microservices-need-an-api-gateway/",target:"_blank",rel:"noopener noreferrer"},tn=n("p",null,"File not found",-1);function sn(on,ln){const a=o("ExternalLinkIcon");return l(),r("div",null,[u,n("p",null,[e("下图来源于"),n("a",g,[e("百亿规模 API 网关服务 Shepherd 的设计与实现 - 美团技术团队 - 2021"),t(a)]),e("这篇文章。")]),c,n("p",null,[e("我们可以自定义过滤器来处理请求，并且，Zuul 生态本身就有很多现成的过滤器供我们使用。就比如限流可以直接用国外朋友写的 "),n("a",d,[e("spring-cloud-zuul-ratelimit"),t(a)]),e(" (这里只是举例说明，一般是配合 hystrix 来做限流)：")]),h,n("p",null,[n("a",b,[e("Zuul 1.x"),t(a)]),e(" 基于同步 IO，性能较差。"),n("a",f,[e("Zuul 2.x"),t(a)]),e(" 基于 Netty 实现了异步 IO，性能得到了大幅改进。")]),_,n("ul",null,[n("li",null,[e("GitHub 地址： "),n("a",k,[e("https://github.com/Netflix/zuul"),t(a)])]),n("li",null,[e("官方 Wiki： "),n("a",y,[e("https://github.com/Netflix/zuul/wiki"),t(a)])])]),m,v,x,I,S,w,n("ul",null,[n("li",null,[e("Github 地址： "),n("a",A,[e("https://github.com/spring-cloud/spring-cloud-gateway"),t(a)])]),n("li",null,[e("官网： "),n("a",P,[e("https://spring.io/projects/spring-cloud-gateway"),t(a)])])]),z,n("p",null,[e("关于 OpenResty 的入门以及网关安全实战推荐阅读这篇文章："),n("a",N,[e("每个后端都应该了解的 OpenResty 入门以及网关安全实战"),t(a)]),e("。")]),n("ul",null,[n("li",null,[e("Github 地址： "),n("a",X,[e("https://github.com/openresty/openresty"),t(a)])]),n("li",null,[e("官网地址： "),n("a",K,[e("https://openresty.org/"),t(a)])])]),j,n("p",null,[e("Kong 是一款基于 "),n("a",q,[e("OpenResty"),t(a)]),e(" （Nginx + Lua）的高性能、云原生、可扩展、生态丰富的网关系统，主要由 3 个组件组成：")]),L,n("p",null,[e("关于 Kong 插件的详细介绍，推荐阅读官方文档："),n("a",G,[e("https://docs.konghq.com/gateway/latest/kong-plugins/"),t(a)]),e("，写的比较详细。")]),n("ul",null,[n("li",null,[e("Github 地址： "),n("a",C,[e("https://github.com/Kong/kong"),t(a)])]),n("li",null,[e("官网地址： "),n("a",Z,[e("https://konghq.com/kong"),t(a)])])]),R,n("ul",null,[n("li",null,[e("Github 地址："),n("a",O,[e("https://github.com/apache/apisix"),t(a)])]),n("li",null,[e("官网地址： "),n("a",W,[e("https://apisix.apache.org/zh/"),t(a)])])]),E,n("ul",null,[n("li",null,[n("a",J,[e("为什么说 Apache APISIX 是最好的 API 网关？"),t(a)])]),n("li",null,[n("a",F,[e("有了 NGINX 和 Kong，为什么还需要 Apache APISIX"),t(a)])]),n("li",null,[n("a",T,[e("APISIX 技术博客"),t(a)])]),n("li",null,[n("a",V,[e("APISIX 用户案例"),t(a)]),e("（推荐）")])]),H,B,D,Q,n("ul",null,[n("li",null,[e("Github 地址： "),n("a",M,[e("https://github.com/apache/incubator-shenyu"),t(a)])]),n("li",null,[e("官网地址： "),n("a",U,[e("https://shenyu.apache.org/"),t(a)])])]),Y,n("ul",null,[n("li",null,[e("Kong 插件开发教程[通俗易懂]："),n("a",$,[e("https://cloud.tencent.com/developer/article/2104299"),t(a)])]),n("li",null,[e("API 网关 Kong 实战："),n("a",nn,[e("https://xie.infoq.cn/article/10e4dab2de0bdb6f2c3c93da6"),t(a)])]),n("li",null,[e("Spring Cloud Gateway 原理介绍和应用："),n("a",en,[e("https://blog.fintopia.tech/60e27b0e2078082a378ec5ed/"),t(a)])]),n("li",null,[e("微服务为什么要用到 API 网关？："),n("a",an,[e("https://apisix.apache.org/zh/blog/2023/03/08/why-do-microservices-need-an-api-gateway/"),t(a)])])]),tn])}const un=i(p,[["render",sn],["__file","api-gateway.html.vue"]]);export{un as default};
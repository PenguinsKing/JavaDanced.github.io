import{_ as r}from"./plugin-vue_export-helper-c27b6911.js";import{r as e,o as s,c as o,a,b as t,d as i,e as p}from"./app-a569c9af.js";const l={},c=p('<h2 id="java特点" tabindex="-1"><a class="header-anchor" href="#java特点" aria-hidden="true">#</a> Java特点</h2><p>1.面向对象（封装，继承，多态）</p><p>2.平台无关性 （一次编写，随处运行）</p><p>3.可靠性（内存管理机制不用自己去处理指针、内存, 异常处理机制）</p><p>4.安全性（Java存储分配模型是防御恶意代码的主要方法之一。Java没有指针，所以程序员不能得到隐蔽起来的内存和伪造指针去指向存储器；再例如限制访问权限修饰符）</p><p>5.丰富的资源库、强大的生态</p><h2 id="jdk-和-jre" tabindex="-1"><a class="header-anchor" href="#jdk-和-jre" aria-hidden="true">#</a> JDK 和 JRE</h2><p>JRE：全称Java Runtime Environment，提供Java运行时环境，主要包括 Java 虚拟机（JVM）、Java 基础类库（Class Library）</p><p>JDK：全称Java Development Kit，提供Java的开发和运行环境，提供给开发者使用，JDK包含JRE，JAVA源码的编译器javac，监控工具jconsole，分析工具jvisualvm等</p><p>总结，如果你需要运行Java程序，只需要安装JRE；如果你需要程序开发，那么需要安装JDK就行了，不需要再重复安装JRE。</p><h3 id="java-和-c-区别" tabindex="-1"><a class="header-anchor" href="#java-和-c-区别" aria-hidden="true">#</a> Java 和 C++ 区别</h3><p>不同点：</p><ul><li>Java 不提供指针来直接访问内存，程序内存更加安全，C++有指针概念</li><li>Java有JVM⾃动内存管理垃圾回收机制(GC)，不需要程序员⼿动释放⽆⽤内存</li><li>Java是单继承，可以用接口实现多继承， C++支持多继承</li></ul><p>c++是多继承，并且有指针的概念，需要由程序员自己管理内存；</p><p>Java是单继承，可以用接口实现多继承，Java 不提供指针来直接访问内存，程序内存更加安全，并且Java有JVM⾃动内存管理机制，不需要程序员⼿动释放⽆⽤内存</p><h2 id="面向对象" tabindex="-1"><a class="header-anchor" href="#面向对象" aria-hidden="true">#</a> 面向对象</h2><p><strong>三大特性:</strong> 封装、继承、多态</p><p><strong>封装:</strong> 对抽象的事物抽象化成一个对象，并对其对象的属性私有化，同时提供一些能被外界访问属性的方法；可以理解为类的隔离</p><p><strong>继承：</strong> 子类扩展新的数据域或功能，并复用父类的属性与功能，单继承，多实现；可以理解为类的复用</p><p><strong>多态：</strong> 通过继承（多个⼦类对同⼀⽅法的重写）、也可以通过接⼝（实现接⼝并覆盖接⼝）；可以理解为类的扩展</p><h2 id="多态实现原理" tabindex="-1"><a class="header-anchor" href="#多态实现原理" aria-hidden="true">#</a> 多态实现原理</h2><p>多态的底层实现是动态绑定，即在运行时才把方法调用与方法实现关联起来。</p><p><strong>静态绑定与动态绑定：</strong></p><p>​ 一种是在编译期确定，被称为静态分派，比如方法的重载；</p><p>​ 一种是在运行时确定，被称为动态分派，比如方法的覆盖（重写）和接口的实现。</p><p><strong>多态的实现</strong></p><p>​ 虚拟机栈中会存放当前方法调用的栈帧（局部变量表、操作栈、动态连接 、返回地址）。多态的实现过程，就是方法调用动态分派的过程，如果子类覆盖了父类的方法，则在多态调用中，动态绑定过程会首先确定实际类型是子类，从而先搜索到子类中的方法。这个过程便是方法覆盖的本质。</p><h2 id="抽象类和接口" tabindex="-1"><a class="header-anchor" href="#抽象类和接口" aria-hidden="true">#</a> 抽象类和接口</h2><p><strong>抽象类：</strong> 包含抽象方法的类，即使用abstract修饰的类；抽象类只能被继承，所以不能使用final修饰，抽象类不能被实例化，</p><p>**接口： **接口是一个抽象类型，是抽象方法的集合，接口支持多继承，接口中定义的方法，默认是public abstract修饰的抽象方法</p><p><strong>相同点:</strong></p><p>​ ① 抽象类和接口都不能被实例化</p><p>​ ② 抽象类和接口都可以定义抽象方法，子类/实现类必须覆写这些抽象方法</p><p><strong>不同点：</strong></p><p>​ ① 抽象类有构造方法，接口没有构造方法</p><p>​ ③抽象类可以包含普通方法，接口中只能是public abstract修饰抽象方法（Java8之后可以）</p><p>​ ③ 抽象类只能单继承，接口可以多继承</p><p>​ ④ 抽象类可以定义各种类型的成员变量，接口中只能是public static final修饰的静态常量</p><p><strong>抽象类的使用场景：</strong></p><p>​ 既想约束子类具有共同的行为（但不再乎其如何实现），又想拥有缺省的方法，又能拥有实例变量</p><p><strong>接口的应用场景：</strong></p><p>​ 约束多个实现类具有统一的行为，但是不在乎每个实现类如何具体实现；实现类中各个功能之间可能没有任何联系</p><h2 id="static和final关键字" tabindex="-1"><a class="header-anchor" href="#static和final关键字" aria-hidden="true">#</a> static和final关键字</h2><p><strong>static：</strong> 可以修饰属性、方法</p><p>​ <strong>static修饰属性：</strong></p><p>​ 类级别属性，所有对象共享一份，随着类的加载而加载（只加载一次），先于对象的创建；可以使用类名直接调用。</p><p>​ <strong>static修饰方法：</strong></p><p>​ 随着类的加载而加载；可以使用类名直接调用；静态方法中，只能调用静态的成员，不可用this；</p><p><strong>final：</strong> 关键字主要⽤在三个地⽅：变量、⽅法、类。</p><p>​ <strong>final修饰变量：</strong></p><p>​ 如果是基本数据类型的变量，则其数值⼀旦在初始化之后便不能更改；</p><p>​ 如果是引⽤类型的变量，则在对其初始化之后便不能再让其指向另⼀个对象。</p><p>​ <strong>final修饰方法：</strong></p><p>​ 把⽅法锁定，以防任何继承类修改它的含义（重写）；类中所有的 private ⽅法都隐式地指定为 final。</p><p>​ <strong>final修饰类：</strong></p><p>​ final 修饰类时，表明这个类不能被继承。final 类中的所有成员⽅法都会被隐式地指定为 final ⽅法。</p><p>一个类不能被继承，除了final关键字之外，还有可以私有化构造器。（内部类无效）</p><h2 id="泛型以及泛型擦除" tabindex="-1"><a class="header-anchor" href="#泛型以及泛型擦除" aria-hidden="true">#</a> 泛型以及泛型擦除</h2>',58),d={href:"https://blog.csdn.net/baoyinwang/article/details/107341997",target:"_blank",rel:"noopener noreferrer"},g=p(`<p><strong>泛型：</strong></p><p>​ 泛型的本质是参数化类型。这种参数类型可以用在类、接口和方法的创建中，分别称为泛型类、泛型接口和泛型方法。</p><p><strong>泛型擦除：</strong></p><p>​ Java的泛型是伪泛型，使用泛型的时候加上类型参数，在编译器编译生成的字节码的时候会去掉，这个过程成为类型擦除。</p><p>​ 如List等类型，在编译之后都会变成 List。JVM 看到的只是 List，而由泛型附加的类型信息对 JVM 来说是不可见的。</p><p>可以通过反射添加其它类型元素</p><h2 id="反射原理以及使用场景" tabindex="-1"><a class="header-anchor" href="#反射原理以及使用场景" aria-hidden="true">#</a> 反射原理以及使用场景</h2><p><strong>Java反射：</strong></p><p>​ 是指在运行状态中，对于任意一个类都能够知道这个类所有的属性和方法；并且都能够调用它的任意一个方法；</p><p><strong>反射原理：</strong></p><p>​ 反射首先是能够获取到Java中的反射类的字节码，然后将字节码中的方法，变量，构造函数等映射成 相应的 Method、Filed、Constructor 等类</p><p>​ <strong>如何得到Class的实例:</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>  1.类名.class(就是一份字节码)
  2.Class.forName(String className);根据一个类的全限定名来构建Class对象
  3.每一个对象多有getClass()方法:obj.getClass();返回对象的真实类型
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>使用场景：</strong></p><ul><li><p><strong>开发通用框架 -</strong> 反射最重要的用途就是开发各种通用框架。很多框架（比如 Spring）都是配置化的（比如通过 XML 文件配置 JavaBean、Filter 等），为了保证框架的通用性，需要根据配置文件运行时动态加载不同的对象或类，调用不同的方法。</p></li><li><p><strong>动态代理</strong> - 在切面编程（AOP）中，需要拦截特定的方法，通常，会选择动态代理方式。这时，就需要反射技术来实现了。</p><p>JDK：spring默认动态代理，需要实现接口</p><p>CGLIB：通过asm框架序列化字节流，可配置，性能差</p></li><li><p><strong>自定义注解</strong> - 注解本身仅仅是起到标记作用，它需要利用反射机制，根据注解标记去调用注解解释器，执行行为。</p></li></ul><h2 id="java异常体系" tabindex="-1"><a class="header-anchor" href="#java异常体系" aria-hidden="true">#</a> Java异常体系</h2><p>​ <img src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3137389296,1222888772&amp;fm=26&amp;gp=0.jpg" alt="img" loading="lazy"></p><p>Throwable 是 Java 语言中所有错误或异常的超类。下一层分为 Error 和 Exception</p><p><strong>Error ：</strong></p><p>​ 是指 java 运行时系统的内部错误和资源耗尽错误。应用程序不会抛出该类对象。如果出现了这样的错误，除了告知用户，剩下的就是尽力使程序安全的终止。</p><p><strong>Exception 包含：RuntimeException 、CheckedException</strong></p><p>编程错误可以分成三类：语法错误、逻辑错误和运行错误。</p><p><strong>语法错误</strong>（也称编译错误）是在编译过程中出现的错误，由编译器检查发现语法错误</p><p><strong>逻辑错误</strong>指程序的执行结果与预期不符，可以通过调试定位并发现错误的原因</p><p><strong>运行错误</strong>是引起程序非正常终端的错误，需要通过异常处理的方式处理运行错误</p><p><strong>RuntimeException：</strong> 运行时异常，程序应该从逻辑角度尽可能避免这类异常的发生。</p><p>​ 如 NullPointerException 、 ClassCastException ；</p><p>**CheckedException：**受检异常，程序使用trycatch进行捕捉处理</p><p>​ 如IOException、SQLException、NotFoundException；</p>`,29);function h(v,u){const n=e("ExternalLinkIcon");return s(),o("div",null,[c,a("p",null,[t("参考："),a("a",d,[t("https://blog.csdn.net/baoyinwang/article/details/107341997"),i(n)])]),g])}const x=r(l,[["render",h],["__file","基础.html.vue"]]);export{x as default};

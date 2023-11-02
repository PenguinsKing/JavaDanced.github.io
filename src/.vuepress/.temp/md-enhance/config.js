import { defineClientConfig } from "@vuepress/client";
import VPCard from "/Users/admin/Desktop/blog/blogs/node_modules/vuepress-plugin-md-enhance/lib/client/components/VPCard.js";
import CodeTabs from "/Users/admin/Desktop/blog/blogs/node_modules/vuepress-plugin-md-enhance/lib/client/components/CodeTabs.js";
import { hasGlobalComponent } from "/Users/admin/Desktop/blog/blogs/node_modules/vuepress-shared/lib/client/index.js";
import { CodeGroup, CodeGroupItem } from "/Users/admin/Desktop/blog/blogs/node_modules/vuepress-plugin-md-enhance/lib/client/compact/index.js";
import "/Users/admin/Desktop/blog/blogs/node_modules/vuepress-plugin-md-enhance/lib/client/styles/container/index.scss";
import CodeDemo from "/Users/admin/Desktop/blog/blogs/node_modules/vuepress-plugin-md-enhance/lib/client/components/CodeDemo.js";
import "/Users/admin/Desktop/blog/blogs/node_modules/vuepress-plugin-md-enhance/lib/client/styles/figure.scss";
import "/Users/admin/Desktop/blog/blogs/node_modules/vuepress-plugin-md-enhance/lib/client/styles/footnote.scss";
import "/Users/admin/Desktop/blog/blogs/node_modules/vuepress-plugin-md-enhance/lib/client/styles/image-mark.scss"
import Playground from "/Users/admin/Desktop/blog/blogs/node_modules/vuepress-plugin-md-enhance/lib/client/components/Playground.js";
import Tabs from "/Users/admin/Desktop/blog/blogs/node_modules/vuepress-plugin-md-enhance/lib/client/components/Tabs.js";
import "/Users/admin/Desktop/blog/blogs/node_modules/vuepress-plugin-md-enhance/lib/client/styles/tasklist.scss";

export default defineClientConfig({
  enhance: ({ app }) => {
    app.component("VPCard", VPCard)
    app.component("CodeTabs", CodeTabs);
    if(!hasGlobalComponent("CodeGroup", app)) app.component("CodeGroup", CodeGroup);
    if(!hasGlobalComponent("CodeGroupItem", app)) app.component("CodeGroupItem", CodeGroupItem);
    app.component("CodeDemo", CodeDemo);
    app.component("Playground", Playground);
    app.component("Tabs", Tabs);
  },
  setup: () => {

  }
});

## Next.js App Router Course - Starter

This is the starter template for the Next.js App Router Course. It contains the starting code for the dashboard application.

For more information, see the [course curriculum](https://nextjs.org/learn) on the Next.js Website.

## chapter 1
/app：包含应用程序的所有路由、组件和逻辑，您主要将在这里进行工作。
/app/lib：包含应用程序中使用的功能，例如可重用的实用函数和数据获取函数。
/app/ui：包含应用程序的所有 UI 组件，例如卡片、表格和表单。为了节省您的时间，我们已预先设置好这些组件的样式。
/public：包含应用程序的所有静态资源，例如图像。
配置文件：您还会注意到next.config.ts应用程序根目录下的配置文件。大多数此类文件在您使用新项目启动时都会自动创建和预配置create-next-app。在本课程中，您无需修改​​它们。

## chapter 2
- Global Styles -> global.css：包含应用程序的全局样式。    
- Css Modules -> css.module.css：模块样式。
- Tailwind CSS -> class="text-red-100"：Tailwind CSS 样式。

现代前端项目的最佳实践是：三者并存，但各司其职

global.css
  └─ 重置 + 变量 + 全局修复
Button.module.css
  └─ 组件结构 & 状态
<div class="flex items-center gap-2 text-sm">
  └─ 布局 & 微调

工程规律版：CSS 不是三种写法，而是三层责任

系统层（Global）组件层（Modules）元素层（Tailwind）

module.exports = {
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: 'JavaScript 整洁代码规范',
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description:
    '🎉 JavaScript 中好的代码实践和规范，可以当作 Code Review 的自查手册',

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    [
      'meta',
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
    ],
  ],

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    repo: '',
    editLinks: false,
    docsDir: '',
    editLinkText: '',
    lastUpdated: false,
    nav: [
      {
        text: '变量规范',
        link: '/variables/',
      },
      {
        text: '函数规范',
        link: '/functions/',
      },
      {
        text: '对象与数据结构规范',
        link: '/objects-and-data-structures/',
      },
      {
        text: '类规范',
        link: '/classes/',
      },
      {
        text: 'SOLID原则',
        link: '/solid/',
      },
      {
        text: '测试规范',
        link: '/testing/',
      },
      {
        text: '异步规范',
        link: '/concurrency/',
      },
      {
        text: '编码风格',
        link: '/formatting/',
      },
      {
        text: 'Github',
        link: 'https://github.com/yuetong3yu/js-clean-code-cn',
      },
    ],
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: ['@vuepress/plugin-back-to-top', '@vuepress/plugin-medium-zoom'],
}

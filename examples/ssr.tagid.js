const Vue = require('vue')
const renderer = require('vue-server-renderer').createRenderer()
const VueMeta = require('../')

Vue.use(VueMeta, {
  tagIDKeyName: 'hid'
})

const vm = new Vue({
  template: '<hello/>',
  metaInfo: {
    title: 'Hello',
    htmlAttrs: { amp: undefined },
    meta: [
      { hid: 'description', name: 'description', content: 'Hello World' }
    ],
    script: [
      { hid: 'schema', innerHTML: '{ "@context": "http://www.schema.org", "@type": "Organization" }', type: 'application/ld+json' },
      { innerHTML: '{ "body": "yes" }', body: true, type: 'application/ld+json' }
    ],
    __dangerouslyDisableSanitizersByTagID: { schema: ['innerHTML'] }
  },
  components: {
    Hello: {
      template: '<p>Hello</p>',
      metaInfo: {
        title: 'Coucou',
        meta: [
          { hid: 'description', name: 'description', content: 'Coucou' }
        ]
      }
    }
  }
})

renderer.renderToString(vm, function (err, html) {
  if (err) throw err
  const $meta = vm.$meta().inject()
  console.log('Title:\n' + $meta.title.text())
  console.log('\nHTML attrs:\n' + $meta.htmlAttrs.text())
  console.log('\nMeta:\n' + $meta.meta.text())
  console.log('\nHead Script:\n' + $meta.script.text())
  console.log('\nBody Script:\n' + $meta.script.text({ body: true }))
})

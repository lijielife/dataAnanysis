/**
 * Created by leon on 17/1/19.
 * 代理本域名下面请求，供开发/测试使用
 * 如一个同域名请求，在dev环境 127.0.0.1:7777/total ，可以代理到 远端的 http://cnpm.51.nb/total
 */


// 更多花式配置，参考文档： http://webpack.github.io/docs/webpack-dev-server.html#proxy
module.exports = {
    '/ssoagentlogin': {
      changeOrigin: true,
      target: 'http://transcript.ops-activityeffect.51.env', //stable服务端地址
      headers:{
            'Proxy-Visit':'VUCBa23KrOkFFczlrR3Lvu%2BAFZ9eX9hv', // iam 登录需要
        },
    }, 
    '/ops-activityeffect/**': {
     changeOrigin: true,
 //target: 'http://opsplate.u51-inc.com', //online服务端地址
  // target:'http://shiyong05.ops-activityeffect.51.env', //ares 开发联调地址
  // target:'http://ops-activityeffect.st.51.nb:8080',
    // target:  process.env.BUILD_ENV === 'prod' ? 'http://opsplate.u51-inc.com' : 'http://06yiqi.ops-activityeffect.51.env', //连线上
   // target:  process.env.BUILD_ENV === 'prod' ? 'http://opsplate.u51-inc.com' : 'http://ops-activityeffect.st.51.nb:8080', //
    target:  process.env.BUILD_ENV === 'prod' ? 'http://opsplate.u51-inc.com' : 'http://transcript.ops-activityeffect.51.env', //连线上
    },
             
};
# wx-promise-http
## 简单实现微信promise请求
<pre>import WxHttp from '{path}/wxhttp';</pre>
<pre>
class xxx extends WxHttp {
  super({
    api:,//api前缀
    header://http头, 静态设置，有变动需实set时更新
  });
}
</pre>
或者
<pre>
let xxx = new WxHttp({
  api:,//api前缀
  header://http头
});
</pre>

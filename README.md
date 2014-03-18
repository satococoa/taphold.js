# taphold.js

リンク長押し時に何かしらのアクションをしたいときに使うライブラリです。
ネイティブアプリの WebView 内で使うことを想定しています。

`taphold` というカスタム URL スキームで `{href: "http://examle.com/", src: "http://example.com/foo.jpg"}` のような JSON を渡しますので、あとはネイティブで。

## 使い方

```
<script type="text/javascript">
window.addEventListener('load', function(){
  var th = new TapHold({debug: true});
  th.activate();
});
</script>
```

`debug: true` だと、実際に `taphold://` へ遷移せずに `console.log()` します。

ネイティブアプリに組み込むときは
例えば `stringByEvaluatingJavaScriptFromString` とか使ってもいいと思います。

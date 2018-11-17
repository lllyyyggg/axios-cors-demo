# `CORS详解`

CORS是一个W3C标准，全称是"跨域资源共享"`(Cross-origin resource sharing)`。

它允许浏览器向跨源服务器，发出`XMLHttpRequest`请求，从而克服了`AJAX`只能同源使用的限制。

因此，实现`CORS`通信的关键是服务器。只要服务器实现了`CORS`接口，就可以跨源通信。


## `两种请求`

浏览器将CORS请求分成两类：简单请求`(simple request)`和非简单请求`(not-so-simple request)`。

只要同时满足以下两大条件，就属于简单请求。

```
（1) 请求方法是以下三种方法之一:
		HEAD
		GET
		POST	
 (2）HTTP的头信息不超出以下几种字段:
		Accept
		Accept-Language
		Content-Language
		Last-Event-ID
		Content-Type：只限于三个值application/x-www-form-urlencoded、multipart/form-data、text/plain
```

凡是不同时满足上面两个条件，就属于非简单请求。

浏览器对这两种请求的处理，是不一样的。

### `简单请求`

对于简单请求，浏览器直接发出CORS请求。具体来说，就是在头信息之中，增加一个Origin字段。

```
Origin: http://localhost:3000
```

上面的头信息中，`Origin`字段用来说明，本次请求来自哪个源`(协议 + 域名 + 端口)`。服务器根据这个值，决定是否同意这次请求。
		
如果`Origin`指定的源，不在许可范围内，服务器会返回一个正常的`HTTP`回应。浏览器发现，这个回应的头信息没有包含`Access-Control-Allow-Origin`字段，就知道出错了，从而抛出一个错误，被`XMLHttpRequest`的`onerror`回调函数捕获。

> 注意，这种错误无法通过状态码识别，因为`HTTP`回应的状态码有可能是`200`

如果Origin指定的域名在许可范围内，服务器返回的响应，会多出几个头信息字段。

```
Access-Control-Allow-Origin: http://localhost:3000
Access-Control-Allow-Credentials: true
Access-Control-Expose-Headers: lanyage
Content-Type:text/html; charset=utf-8
```
上面的头信息之中，有三个与CORS请求相关的字段，都以Access-Control-开头。

##### `Access-Control-Allow-Origin`

该字段是必须的。它的值要么是请求时Origin字段的值，要么是一个*，表示接受任意域名的请求。

##### `Access-Control-Allow-Credentials`

该字段可选。它的值是一个布尔值，表示是否允许发送Cookie。

默认情况下，Cookie不包括在CORS请求之中。设为true，即表示服务器明确许可，Cookie可以包含在请求中，一起发给服务器。这个值也只能设为true，如果服务器不要浏览器发送Cookie，删除该字段即可。

##### `Access-Control-Expose-Headers`

该字段可选。`CORS`请求时，`XMLHttpRequest`对象的`getResponseHeader()`方法只能拿到6个基本字段：`Cache-Control`、`Content-Language`、`Content-Type`、`Expires`、`Last-Modified`、`Pragma`。

##### `withCredentials 属性`

上面说到，`CORS`请求默认不发送`Cookie`和`HTTP`认证信息。如果要把Cookie发到服务器，一方面要服务器同意，指定`Access-Control-Allow-Credentials`字段。

`Access-Control-Allow-Credentials:true`

另一方面，开发者必须在`AJAX`请求中打开`withCredentials`属性。

```
var xhr = new XMLHttpRequest();
xhr.withCredentials=true;
```
否则，即使服务器同意发送`Cookie`，浏览器也不会发送。或者，服务器要求设置`Cookie`，浏览器也不会处理。

> 但是，如果省略`withCredentials`设置，有的浏览器还是会一起发送`Cookie`。这时，可以显式关闭`withCredentials`。

### `非简单请求`

非简单请求是那种对服务器有特殊要求的请求，比如请求方法是`PUT`或`DELETE`，或者`Content-Type`字段的类型是`application/json`。

非简单请求的CORS请求，会在正式通信之前，增加一次HTTP查询请求，称为"预检"请求。

浏览器先询问服务器，当前网页所在的域名是否在服务器的许可名单之中，以及可以使用哪些HTTP动词和头信息字段。只有得到肯定答复，浏览器才会发出正式的`XMLHttpRequest`请求，否则就报错。

下面是一段axios代码。

```
const host = "http://localhost:8081"
let url=`${host}/delete/1001`;
    
axios.delete(url)
.then(res => {
	 console.log(res.data);
})
```

如果仅仅是这样的话，会报错，那么此时需要在服务端添加`Access-Control-Allow-Methods`头信息，内容可以是`GET,POST,DELETE,PUT`。

```
response.setHeader("Access-Control-Allow-Methods","GET,POST,DELETE,PUT");	//表示支持这么多种请求
response.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");  //表示支持的请求源
```
其中`Access-Control-Allow-Origin`该字段是必须的，用来列出浏览器的CORS请求会用到哪些HTTP方法，上例是PUT。
这样，非简单请求就会请求两次。

```
Request URL: http://localhost:8081/delete/1001
Request Method: OPTIONS
```

```
Request URL: http://localhost:8081/delete/1001
Request Method: DELETE

// result: 1001
```
另外，如果你想携带额外的响应头。

```
Access-Control-Allow-Headers
```

> 服务端的header是不区分大小写的。

服务端要想获取到请求headers，可以通过这样的方法。

首先是定义Interceptor，也就是拦截器。

```
@Component
public class RequestInterceptor implements HandlerInterceptor {
    public static final Logger logger = LoggerFactory.getLogger(RequestInterceptor.class);

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        logger.info("==> pre handler invoked <==");
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
        response.setHeader("Access-Control-Allow-Methods","GET,POST,DELETE,PUT");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type,User-Agent,Authorization,Lanyage");
        Enumeration<String> headerNames = request.getHeaderNames();
        while (headerNames.hasMoreElements()){
            String headerName = headerNames.nextElement();
            if(headerName.equalsIgnoreCase("lanyage")) {
                logger.info("==> header Lanyage : {} <==", request.getHeader(headerName.toLowerCase()));
            }
        }
        return true;
    }
}
```
然后必须在`WebMvcConfigurer`的实现类中进行配置。

```
@Configuration
public class WebAppConfig implements WebMvcConfigurer {

    @Autowired
    private RequestInterceptor interceptor;
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(interceptor);
    }
}
```




            


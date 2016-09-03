'use strict';
;(function(angular){
    /*由于默认angular提供的异步请求对象不支持自定义函数名
    * angular随机分配的回调函数名称不被豆瓣支持*/
    var http = angular.module("moviecat.services.http",[]);
    http.service("HttpService",['$window',"$document",function($window,$document){
        /*console.log($document);*/
        /*url:http://api.douban.com/vsdf-><script>->html就可自动执行*/
        this.jsonp = function(url,data,callback){
            // 0.将data转换为url字符串形式
            //{id:1,name:'zhangsan'}=>id=1&name=zhangsan
            var querystring =url.indexOf("?")==-1?"?":"&";
            for(var key in data){
                querystring += key + '=' +data[key] +"&";
                //id = 1  &
            }
            //1.挂载回调函数
            var fnSuffix = Math.random().toString().replace('.','');
            var cbFuncName = "my_json_cb"+fnSuffix;
            //不推荐
            $window[cbFuncName] = callback;
            /*相当于执行了window.cbFuncName*/
            //2.处理URL地址中的回调参数

            querystring += 'callback='+cbFuncName;
            //url += callback=shdajkfh
            //3.创建一个script标签
            var scriptElement = $document[0].createElement('script')
            scriptElement.src=url + querystring;
            //此时还不能将其append到页面上

            //4.将script标签放在页面中
            $document[0].body.appendChild(scriptElement);
            //append后页面会自动发送一个请求，请求完后就会自动执行
        };

    }])
})(angular);
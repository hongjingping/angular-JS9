(function(angular){
    'use strict';
  /*正在热映模块*/
  var module = angular.module(
      'moviecat.in_theaters',
      [
          'ngRoute',
          'moviecat.services.http'
      ]);
/*配置模块的路由*/
  module.config(['$routeProvider', function($routeProvider) {
      /*分页路由我们可以传递参数*/
        $routeProvider.when('/in_theaters/:page', {
          templateUrl: 'in_theaters/view.html',
          controller: 'InTheatersController'
        });
      }]);

  module.controller('InTheatersController', [
    "$scope",
      '$routeParams',
      'HttpService',
    function($scope,$routeParams,HttpService) {
        var count = 10;//每一页的条数
        var page = parseInt($routeParams.page);//当前第几页
        var start = (page-1)*count;//当前页

        /*控制器 分为两步:1.设计暴露数据，2.设计暴露行为*/
        $scope.subjects = [{},{}];
        $scope.message = '';
        $scope.totalCount =0;
        $scope.totalPages = 0;
        /*加载开始的时候是true，结束后为false*/
        $scope.loading = true;
            HttpService.jsonp(
                "http://api.douban.com/v2/movie/in_theaters",
                {start:start,count:count},
                function(data){
            $scope.subjects = data.subjects;
            /*console.log(data);*/
            $scope.totalCount = data.total;
            $scope.totalPages = Math.ceil($scope.totalCount/count);
            $scope.loading = false;
            $scope.$apply('subject');

            /*$apply的作用就是让指定的表达式重新同步*/

        })


      }
  ])
})(angular);



/*======豆瓣不支持HSONP跨域，只能自己写========*/
//  var doubanApiAddress = 'http://api.douban.com/v2/movie/in_theaters';
//  /*测试$http服务,在当前的目录下才可以做ajax请求，别的地方是跨域*/
//  /*在angular中使用jsonP的方式跨域请求，就必须给当前地址加上一个参数callback=JSONP_CALLBACK，千万不能写错*/
//  $http.jsonp(doubanApiAddress+"?callback = JSON_CALLBACK").then(function(res){
//      /*此处代码是在异步请求完后才开始执行(需要等待一段时间)*/
//      if(res.status == 200){
//          $scope.subjects = res.data.subjects;
//      }else {
//          $scope.message = "获取数据错误,错误信息"+res.statusText;
//      }
//      console.log(11);
//  },function(err){
//      $scope.message = "获取数据错误,错误信息"+err.statusText;
//  })
angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})
.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})
.controller('AccountCtrl', function($scope) {
		  $scope.tirarFoto = function (){
        var mOption = {
          poiRadius: 500,           //半径为1000米内的POI,默认100米
          numPois: 6                //列举出50个POI,默认10个
        }
          var myGeo = new BMap.Geocoder();
          var map, mPoint;
          var geolocation = new BMap.Geolocation();
          geolocation.getCurrentPosition(function (r) {
          if(this.getStatus() == BMAP_STATUS_SUCCESS) {
          	/*创建新的地图*/
          	map = new BMap.Map("allmap");
            mPoint = r.point;
            map.centerAndZoom(mPoint, 15);
            map.enableScrollWheelZoom();
            /*移动到定位的位置*/
            var marker = new BMap.Marker(r.point);
            map.addOverlay(marker);
            /*可拖拽*/
            marker.enableDragging();
            alert('您的位置：'+r.point.lng+','+r.point.lat);
            displayPOI();
          	//根据地点搜索  
           /* var local = new BMap.LocalSearch(map, {
                renderOptions : {map : map}
              });
              local.search("石家庄学院");*/
            }
          }, {enableHighAccuracy: true});
                //创建地址解析实例
            function displayPOI() {
            /*map.addOverlay(new BMap.Circle(mPoint, 500)); */       //添加一个圆形覆盖物
              myGeo.getLocation(mPoint,/* { renderOptions : {map : map}},*/
                function mCallback(rs) {
                  var allPois = rs.surroundingPois;       //获取全部POI（该点半径为100米内有6个POI点）
                  for (i = 0; i < allPois.length; ++i) {
                    document.getElementById("r-result").innerHTML += "<p style='font-size:12px;'>" + (i + 1) + "、" + allPois[i].title + ",地址:" + allPois[i].address + "</p>";
                    /*map.addOverlay(new BMap.Marker(allPois[i].point));*/
                  }
                }, mOption
              );
      		}
      }
});

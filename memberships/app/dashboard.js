angular.module("cft-dashboard-app", [])
.controller("ctf-dashboard", function($scope){
    let dashboard = $scope;

    //Dashboard Profile 
    Object.defineProperty(dashboard, "profile", {
        enumerable: false,
        writable: true,
        configurable: true,
        value: {

        }
    })
})
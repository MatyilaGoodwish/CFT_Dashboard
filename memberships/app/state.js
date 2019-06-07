'use strict';

angular.module("cft-dashboard-app", ['kendo.directives'])
.controller("cft-dashboard", function($scope, $http){
    //angular scope
    const dashboard = $scope;

    //add more functionality to this constructor function
    function Dashboard(){
        this.Company = function(company){
            return company;
        }
    }

    //activity namespace
    const App = new Dashboard();

    //apply binding to view
    dashboard.copyright = App.Company("CFT Membership");

})
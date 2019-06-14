'use strict';

function RouterInit(){
          this.Router = new kendo.Router({
                    init: function(){
                      Layout.render("#root");
                    }
          });
          this.Layout = new kendo.Layout("ui-layout");

          this.RouterConfig = function(){
                    this.Router.route("/", (queryStrings)=>{
                              this.Layout.showIn("#content", new kendo.View("welcome", { model: dashboardProps }));
                      });
                     this. Router.route("/profile", (queryStrings)=>{
                              this.Layout.showIn("#content", new kendo.View("profile", { model: dashboardProps }));
                    
                      });
                      this.Router.route("/downloads", (queryStrings)=>{
                              this.Layout.showIn("#content", new kendo.View("downloads", {model: dashboardProps}));
                      });
                      this.Router.route("/members", (queryStrings)=>{ 
                              this.Layout.showIn("#content", new kendo.View("members", {model: dashboardProps}));
                                  $("#members-registered").kendoGrid({
                                    dataSource: userProfileStored.activeMembers,
                                    sortable: true,
                                    pageSize: 5,
                                    filterable: true,
                                    selectable:true
                                  });
                      });
                      this.Router.start();
          }
}
$(document).ready(function(){
          new RouterInit().RouterConfig();
})
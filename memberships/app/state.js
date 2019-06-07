'use strict';
function init(e){

let dashboardProps = kendo.observable({
    profile:{
        ID: "99089890809",
        Names:"",
        Surname: "",
        Phone:"",
        Email:"",
        Joined: "",
    },
    copyright: {
      information: `${new Date().getFullYear() } - RTE IT Systems, Version 1.0.0 - All rights reserved`
    }
  })
  
  firebase.auth().onAuthStateChanged(function(user){
      if(user){
        dashboardProps.set("profile.Email", user.email)
      }else{
          location.replace("../index.html");
      }
  })

  let dashboardDataSource = new kendo.data.DataSource({
    data: []
  });

  kendo.bind(document.body, dashboardProps);

  let Layout = new kendo.Layout("ui-layout");
 
  let Router = new kendo.Router({
    init: function(){
      Layout.render("#root");
    }
  })

  
  Router.route("/", (queryStrings)=>{
    Layout.showIn("#content", new kendo.View("welcome", { model: dashboardProps }));
  })
  Router.route("/profile", (queryStrings)=>{
    Layout.showIn("#content", new kendo.View("profile", { model: dashboardProps }));
  })
  Router.route("/statements", (queryStrings)=>{
    
  })
  Router.route("/members", (queryStrings)=>{ 
    Layout.showIn("#content", new kendo.View("members", {model: dashboardProps}));


    

  })

  Router.start();
 
}

$(document).ready(init.bind(this)); 

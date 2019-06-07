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
    user:{
        signout: function(){
            firebase.auth().signOut();
            setTimeout(function(){
                location.replace('index.html');
            }, 3000);
        }
    },
    copyright: {
      information: `${new Date().getFullYear() } - RTE IT Systems, Version 1.0.0 - All rights reserved`
    }
  })

  

  function dataSynchronization(){
     firebase.auth().onAuthStateChanged(function(user){
        if(user){
           let userDefined =   firebase.firestore()
            .collection("test").get()
           userDefined.then(function(snapshot){
             snapshot.forEach(client=>{

              

                console.log(client.data())
             });
            userDefined.catch(function(error){
              kendo.alert("kindly check your internet connectivity or speed");
            })
           })
        }
    })
}

dataSynchronization();




  




  function dataSynchronizationProfile(){
    return firebase.auth().onAuthStateChanged(function(user){
      if(user){
          firebase.firestore().collection("test").add({
            test: "query"
          }) 
      }
    })
  }

   
  
  firebase.auth().onAuthStateChanged(function(user){
      if(user){
        dashboardProps.set("profile.Email", user.email);

 
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
  Router.route("/downloads", (queryStrings)=>{
    Layout.showIn("#content", new kendo.View("downloads", {model: dashboardProps}));
  })
  Router.route("/members", (queryStrings)=>{ 
    Layout.showIn("#content", new kendo.View("members", {model: dashboardProps}));

  })

  Router.start();
}

$(document).ready(init.bind(this)); 

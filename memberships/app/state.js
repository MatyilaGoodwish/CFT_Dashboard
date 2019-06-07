'use strict';

//i know i deleted everything

//we write the init function

function init(e){

  //we create a data source
  let dashboardDataSource = new kendo.data.DataSource({
    data: []
  });

  //we create an observer
  let dashboardProps = kendo.observable({
    copyright: {
      information: `${new Date().getFullYear() }  All rights reserved`
    }
  })

  //we bound the dashboard the the state management code
  kendo.bind(document.body, dashboardProps);

  //secondly we create the layout that will be rendered on the view on the root
  let Layout = new kendo.Layout("ui-layout");//we need this on the page as ref



  //we create views here
  //lets render a componet as an example hope you ready
  let moduleExcelSpreadSheet = new kendo.View(`
      <div id="cft-editor" data-role="spreadsheet"></div>
    `);

  //init will start route definitions
  let Router = new kendo.Router({
    init: function(){
      //starts the router calls on demand
      Layout.render("#root"); //we are showing the layout to shadow dom
    }
  })

  
  Router.route("/", (queryStrings)=>{
    Layout.showIn("#content", new kendo.View("welcome"));
  })
  Router.route("/profile", (queryStrings)=>{
    Layout.showIn("#content", new kendo.View("profile"));
  })
  Router.route("/statements", (queryStrings)=>{
    //console.log("you are navigating root index");
  })
  Router.route("/members", (queryStrings)=>{
    //console.log("you are navigating root index");
  })

 

  Router.start(); //we start the router here we still need to add routes
  //the first route will call layout and display it on the page.
}

$(document).ready(init.bind(this)); //this way

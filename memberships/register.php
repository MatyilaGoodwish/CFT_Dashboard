<!DOCTYPE html>
<html lang="en" ng-controller="cft-controller" ng-app="cft-app">
<head>
    <!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-141699418-1"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-141699418-1');
</script>

    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Membership | Register</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link rel="stylesheet" href="styles/kendo.common.min.css"/>
    <link rel="stylesheet" href="styles/kendo.office365.min.css"/>
    <script src="https://www.gstatic.com/firebasejs/5.2.0/firebase.js"></script>
    <script src="js/jquery.min.js"></script>
    <script src="js/angular.min.js"></script>
    <script src="security/auth.js"></script>
    <script src="app/main.js"></script>
    <script async src="//platform-api.sharethis.com/js/sharethis.js#property=5cecf6325676af001119ea04&product="sticky-share-buttons"></script>
    <script>
          function IfCurrentUserIsLoggedIn()
          {
                    this.IsActive = function(){
                             firebase.auth().onAuthStateChanged(function(user){
                                       if(user) location.replace("./dashboard/index.php");
                             });
                    }
          }
          new IfCurrentUserIsLoggedIn().IsActive();
    </script>
 <style>
            body{
                background:url("images/housing.jpg") center fixed no-repeat;
                background-size: cover;
            }
     </style>
</head>
<body class="bg-light text-light">
    <div id="content" >
        <!-- Register Interface -->
        <div class="container p-3 mt-4 " id="register-interface">
                <div class="container-fluid p-2 my-4">
                    <div class="row">
                            <div class="col-md-4 p-3 ">
                                   
                                </div>
                        <div class="col-md-4 shadow p-4 text-center rounded bg-dark">
                                <div class="m-2">
                                        <img src="../memberships/branding/CFT/CFT emb.svg" width="150">
                                        <h1 class="text-muted lead display-4 text-white">Register</h1>
                                        <hr>
                                    <div class="form-group">
                                            <h5 class="lead mb-1">Email Address</h5>
                                            <input type="email" ng-model="reg_email" class="form-control" placeholder="Email address" required />
                                    </div>
                                    <div class="form-group">
                                            <h5 class="lead mb-1">Password</h5>
                                            <input type="password" ng-model="reg_password" class="form-control" placeholder="*******" required />
                                    </div>
            
                                    <a href="index.php">Existing account login here</a>
                                    <br/>
                                    <hr>
                                    <button ng-click="register()" class="btn btn-secondary" >Register</button>
                                    
                                    <span id="notification" class="mt-3">
        
                                    </span>
                                </div>
                        </div>
                          <div class="col-md-4 p-3 ">
                                
                            </div>
                    </div>
                </div>
            </div>
    </div> 
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
</body>
</html>
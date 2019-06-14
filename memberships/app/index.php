<?php 
namespace Business\Models;
require_once("inc/meekro.class.php");
class Business{
    public function __constructor(){}
    public function setup(){
       echo "<div class='my-2 bg-danger text-white text-center lead p-2'>We currently offline for transacting</div>";
    }
}


\Business\Modeles\Business::setup();
          

?>
<!doctype html>
<html class="no-js" lang="en" >
<head>
    <!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-141699418-1"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-141699418-1');
</script>

    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <title>Membership Manager</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="shortcut icon" type="image/x-icon" href="img/favicon.ico">
    <script src="https://www.gstatic.com/firebasejs/6.0.1/firebase.js"></script>
    <script src="../security/auth.js"></script>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">
<!-- we dont change these -->
    <link rel="stylesheet" href="../styles/kendo.common.min.css">
    <link rel="stylesheet" href="../styles/kendo.bootstrap.min.css">
     <!-- we dont change these -->
     
  
    <script src="../js/jquery.min.js"></script>
  <!--  <script src="../app/dashboard.js"></script> -->
    <script src="../app/state.js"></script>
    <script src="./admin/main.js"></script>


  
    <script src="./__member.module.js"></script>
    <script src="./__categories.module.js"></script>

</head>
<body>

  <nav class="navbar navbar-expand-lg navbar-light bg-light text-dark">
    
   <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
     <span class="navbar-toggler-icon text-white"></span>
   </button>
  
   <a class="navbar-brand" href="/">
    <img src="../branding/CFT/Logo.svg" width="150" />
</a>

<div class="collapse navbar-collapse" id="navbarTogglerDemo02">
        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
          <li class="nav-item active">
            <a class="nav-link text-muted" href="#"><i class="fa fa-home"></i> Home <span class="sr-only"></span></a>
          </li>
          <li class="nav-item">
            <a class="nav-link text-muted" href="#/profile"><i class="fa fa-user"></i> My Profile</a>
          </li>
          <li class="nav-item">
                <a class="nav-link text-muted" href="#/downloads"><i class="fa fa-download"></i> Downloads</a>
              </li>
          <li class="nav-item">
               <a class="nav-link text-muted" href="#/members"><i class="fa fa-group"></i> Active Memberships <span class="badge border-rounded badge-circle badge-success p-2" data-bind="text: ourMembers"></span></a>
             </li>
        </ul>
     
        <ul class="navbar-nav">
                <li class="nav-item text-center " style="position: relative;right:0px!important;">
                        <a class="nav-link text-muted text-right" href="#/members/active" data-bind="text: profile.Email"></a>
                </li>
                <li class="nav-item text-center " style="position: relative;right:0px!important;">
                        <a class="btn text-light text-danger bg-danger p-1 btn-lg" href="#/signout" data-bind="click: user.signout"><i class="fa fa-sign-out"></i>  Logout </a>
                </li>
        </ul>
      </div>
 </nav>


    <div id="root" class="p-2"></div>


    <script id="profile" type="text/x-kendo-template">
        <div class="container">
            <div class="display-4 text-muted">My Membership</div>
            <p class="text-muted lead mb-4">Complete to keep your membership details update all the time.</p>
            <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                
                        <p class="lead">Full Names</p>
                        <input type="text" class="form-control" required data-bind="value: profile.Names" />

                        <p class="lead">Last Name</p>
                        <input type="text" class="form-control" required data-bind="value: profile.Surname" />

                        <p class="lead">ID Number</p>
                        <input type="text" class="form-control" required data-bind="value: profile.ID" />

                        <p class="lead">Phone Number</p>
                        <input type="number" class="form-control" required data-bind="value: profile.Phone" />
                        
                        <p class="lead">Member Email</p>
                        <input type="email" readonly class="form-control" required data-bind="value: profile.Email" />
                      
                        <hr>
                        <input type="button" class="btn btn-secondary btn-lg mt-2" value="Update" data-bind="click: profile.Update" />
                    </div>
                </div>
            </div>
        </div>
    </script>

    <script id="welcome" type="text/x-kendo-template">
        <div class="container container-fluid p-2">
                    <form name="mystory" action="index.php" method="POST" >
                              <h3 class="display-4 text-capitalize text-muted">Let's Hear Your Story</h3>  
                              <p class="mb-4">Our communities are far behind with development and housing</p>
                              <div class="row p-2">
                                        <div class="col-md-6 my-4 p-2">
                                                  <p class="mb-1 text-muted lead my-2">What's Your Area? </p>
                                                  <select name="country" class="countries form-control" id="countryId">
                                                        <option value="">Select Country</option>
                                                    </select>
                                                    
                                                     <p class="mb-1 text-muted lead my-2">State?</p>
                                                    <select name="state" class="states form-control my-2" id="stateId">
                                                        <option value="">Select State</option>
                                                    </select>
                                                    
                                                   
                                                  <p class="mb-1 text-muted lead my-2">Do You Own Property?</p>
                                                  <select class="form-control my-2" name="property">
                                                            <option>No</option>
                                                            <option>Yes</option>
                                                  </select>
                                                   
                                        </div>
                                        <div class="col-md-6 my-4 p-2">
                                        <p class="mb-1 text-muted lead my-2">Are Currently Employed?</p>
                                                  <select class="form-control" name="property">
                                                            <option>I am working</option>
                                                            <option>I don't have a job</option>
                                                  </select>
                                                  
                                                   <p class="mb-1 text-muted lead my-2">Choose City?</p>
                                                  <select name="city" class="cities form-control my-2" id="cityId">
                                                        <option value="">Select City</option>
                                                    </select>
                                        </div>
                              </div>
                              <textarea data-role="editor" name="story"></textarea>        
                              <hr>
                              <button type="submit" class="btn btn-secondary btn-lg">Share Now</button>
                    </form>
        </div>
    </script>

    <script id="members" type="text/x-kendo-template">
        <div class="container  p-2">
                <h3 class="display-4 text-muted">Community Members</h3>
                <p class="text-muted lead mb-4">List of all registered members changing the world through CFT</p>
            <div class="row">
                <div class="col-md-12">
                     <div data-role="grid" id="members-registered"></div>
                </div>
            </div>
        </div>
    </script>

    <script id="downloads" type="text/x-kendo-template">
        <div class="container p-2">
            <div class="row">
                <div class="col-md-12">
                     <h5 class="display-4  text-muted">Downloads</h5>
                     <p class="text-muted lead mb-4">
                              Here you will find important documents regarding community projects, notifications and more
                     </p>
                </div>
            </div>
        </div>
    </script>


    <script id="ui-layout" type="text/x-kendo-template">
        <div id="content" class="my-4"></div>
    </script>




    <div class="footer-copyright-area p-2 sticky-bottom mt-4 bg-light text-muted text-center">
        <div class="container">
            <div class="row">
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 p-4 m-3">
                    <div class="footer-copy-right">
                                        <span class="text-muted text-center text-capitalize">2019 &copy;  Powered by RTE (Community Members)</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="../app/jquery.min.js"></script>
    <script src="../app/kendo.all.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
      <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
  
<script src="//geodata.solutions/includes/countrystatecity.js"></script>
     
</body>
</html>

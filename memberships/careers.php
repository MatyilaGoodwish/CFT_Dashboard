<?php
namespace Employment\Interns;
 class Career
 {
        public static function HttpRequest($Resource)
        {
                switch($Resource)
                {
                    case  "careers":
                            include "careers/personal.html";
                            break;
                    default:
                              \Employment\Interns\Career::HttpPostRequest($_POST["start"]);
                }
        }
        public static function HttpPostRequest($Resource)
        {
                switch($Resource)
                {
                    case "apply":
                        include "careers/application.html";
                        break;
                     case "step1":
                     include "careers/contact.html";
                     break;
                     case "step3":
                     include "careers/education.html";
                     break;
                     case "step4":
                     include "careers/workhistory.html";
                     break;
                     case "step5":
                     include "careers/contacts.html";
                     break;
                     case "step6":
                     include "careers/complete.html";
                     break;
                     case "step7":
                     include "careers/final.html";
                     break;
                     default:
                }
        }
 }

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
    <title>Careers</title>
    <meta name="description" content="Together We Empowering the Community">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="shortcut icon" type="image/x-icon" href="img/favicon.ico">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">
    <script async src="//platform-api.sharethis.com/js/sharethis.js#property=5cecf6325676af001119ea04&product="sticky-share-buttons"></script>
</head>
<body class="bg-light text-muted">

 <div class="container container-fluid">
          <div class="row">
              <div class="col-md-4"></div>
                    <div class="col-md-4 text-center text-dark p-3 align-center">
                    <img src="../memberships/branding/CFT/CFT emb.svg" width="140">
                            <?php
                                \Employment\Interns\Career::HttpRequest($_GET["interns"]);
                               ?>
                    </div>
                    <div class="col-md-4"></div>
          </div>
</div>
 
    <div class="footer-copyright-area p-2  mt-4 bg-dark text-muted text-center">
        <div class="container">
            <div class="row">
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 p-4 m-3">
                    <div class="footer-copy-right">
                                <span class="text-muted text-center text-capitalize">2019 &copy;  Powered by RTE </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="app/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
      <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
</body>
</html>

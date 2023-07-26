<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <!-- CSRF Token -->
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <title>ClosingRoom</title>

  <!-- Styles -->

  <style>
    html {
      font-size: .8rem ;
    }

    .pdf-header {
      position: fixed ;
      padding: 0 2rem ;
    }
    .pdf-content {
      margin-top: 150px ;
      padding: 0 3rem ;
    }
    .pdf-footer {
      position: fixed ;
      bottom: -50px ;
      left: -100px;
      right: -100px;

      height: 40px ;
      box-sizing: border-box ;

      background-color: rgb(24, 56, 99) ;
    }

    .text-uppercase {
      text-transform: uppercase ;
    }
    .text-center {
      text-align: center ;
    }
    .text-white {
      color: white ;
    }
    .w-100 {
      width: 100% ;
    }
    .w-50 {
      width: 50% ;
    }
    .mr-3 {
      margin-right: 1rem ;
    }
    .p-3 {
      padding: 1rem ;
    }
    .mb-2 {
      margin-bottom: .5rem ;
    }
  </style>

  @yield('style')
</head>
<body>
  <div class="pdf-container">
    <div class="pdf-header">
      @yield('header')
    </div>
    <div class="pdf-content">
      @yield('content')
    </div>
    <div class="pdf-footer p-3 text-center text-white">
      Created Using MNM ClosingRoom - www.mnmcs.com/closingroom<br/>
      © 2019 MNMCS
    </div>
    </table>
  </div>
</body>
</html>

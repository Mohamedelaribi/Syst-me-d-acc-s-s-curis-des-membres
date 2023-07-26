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
  <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">
  <style>
    .email-wrapper {
      background-color: #E6E7E8 ;
    }
    .email-container {
      margin: auto ;
      width: 800px ;
      text-align: center ;
    }

    .email-header table {
      margin: 2rem 0 ;
      width: 100% ;
    }
    .email-header table td {
      width: 50% ;
    }
    .email-header .logo-image {
      margin-right: 1rem ;
    }
    .email-header .logo-image img {
      width: 80px ;
    }
    .email-header .logo-text {
      color: #183863 ;
      vertical-align: bottom ;
    }
    .email-header .logo-text .title {
      font-weight: bold ;
      color: inherit ;
      font-size: 3rem ;
      line-height: 2rem ;
    }
    .email-header .logo-text .subtitle {
      color: inherit ;
      font-size: 1rem ;
    }

    .email-footer {
      margin-top: 1rem ;
      color: #808080 ;
      font-size: .8rem ;
      text-align: center ;
    }
    .email-footer a {
      color: inherit ;
      text-decoration: none ;
    }



  </style>

  @yield('style')

</head>

<body>
  <div class="email-wrapper">
    <table class="email-container">
      <tbody>
<!-- email header !-->
        <tr class="email-header">
          <td>
            <table>
              <tr>
                <td class="logo-image" align="right">
                  <img src="{{$message->embed(public_path().'/images/logo@4x.png')}}">
                </td>
                <td class="logo-text" align="left">
                  <div class="title">
                    MNM
                  </div>
                  <div class="subtitle">
                    Crypto Specialists
                  </div>
                </td>
              </tr>
            </table>
          </td>
        </tr>
<!-- email body !-->
        <tr class="email-body">
          <td>
            @yield('content')
          </td>
        </tr>
<!-- email footer !-->
        <tr class="email-footer">
          <td>
            © 2018 mnmcs.com All Rights Reserved<br/>
            URL:<a href="www.mnmcs.com">www.mnmcs.com</a>  E-mail:<a href="mailto:support@mnmcs.com.com">support@mnmcs.com.com</a>
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
</body>
</html>

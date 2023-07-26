@extends('email.layout')

@section('style')
  <style>
    .content-wrapper {
      background-color: white ;
      min-height: 300px ;
      padding: 0 4rem 1rem ;
    }

    .content-header td {
      padding: 0 1rem ;
    }
    .content-header .heading {
      padding: 2rem 0 1rem ;
      font-size: 1.5rem ;
      border-bottom: 2px solid #B3B3B3 ;
    }

    .content-body td {
      padding: 1rem 0 0 ;
      height: 250px ;
      vertical-align: top ;
    }
    .content-body a {
      color: #0071BC ;
      text-decoration: none ;
    }

    .content-footer {
      margin: auto 4rem 2rem ;
      color: #999999 ;
      font-size: .8rem ;
    }
    .content-footline {
      height: 15px;
      background: linear-gradient(to right, white, rgb(0, 31, 126));
    }
  </style>
@endsection

@section('content')
  <div class="content-wrapper">
    <table>
      <tbody>
  <!-- content-header -->
        <tr class="content-header">
          <td>
            <div class="heading">Closing Room Invitation</div>
          </td>
        </tr>
  <!-- content-body -->
        <tr class="content-body">
          <td align="left">
            Hello, you have been invited to participate in a private closing room at MNCS by [{{$displayname}}] as {{$role}}.<br/><br/>
            Room #{{$room_id}} [{{$participants}} participants]<br/><br/>
            Please click the link below<br/>
            <a href="{{$link}}">{{$link}}</a>
          </td>
        </tr>
  <!-- content-footer -->
        <tr class="content-footer">
          <td align="left">
            MNMCS Closing Room Team<br/>
            Automated message, please do not reply.
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="content-footline"></div>
@endsection

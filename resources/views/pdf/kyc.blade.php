@extends('pdf.layout')

@section('style')
  <style>
    .pdf-header .common-header {
      margin: 1rem 0 ;
      border-bottom: 3px solid rgb(35, 31, 32) ;
    }
    .room-header .input {
      width: 50% ;
      display: inline-block ;
      border-bottom: 1px solid rgb(35, 31, 32);
    }

    .sheet-header {
      margin-bottom: 2rem ;
    }
    .sheet-header th {
      font-size: 1.5rem ;
      color: rgb(24, 56, 99) ;
      border-bottom: 2px solid rgb(35, 31, 32) ;
    }

    .personal_data-container {
      border-spacing: 0 2rem;
    }
    .personal_data-container td {
      vertical-align: top ;
    }
  </style>
@endsection

@section('header')
  <table class="common-header w-100" cellspacing=1 cellpadding=0>
    <tbody>
      <tr>
        <td style="padding-left: .5rem;">1</td>
        <td width="200px" style="color: rgb(24, 56, 99); border-bottom: 10px solid rgb(24, 56, 99)">
          CR-{{ $room['id'] }} - KYC
        </td>
      </tr>
    </tbody>
  </table>
  <table class="room-header w-100" cellpadding=0 borderspacing=0>
    <tbody>
      <tr>
        <td>
          <span class="mr-3 text-uppercase">Date:</span>
          <span class="input text-center">{{ $room['create_date'] }}</span>
        </td>
        <td>
          <span class="mr-3 text-uppercase">ClosingRoom Number:</span>
          <span class="input text-center">{{ $room['id'] }}</span>
        </td>
      </tr>
    </tbody>
  </table>
@endsection

@section('content')
  <table class="sheet-header w-100" border=0 cellpadding=0>
    <tbody>
      <tr>
        <th align="center">Intermediary Personal Data Sheet</th>
      </tr>
    </tbody>
  </table>

  <table class="personal_data-container w-100" border=0 cellpadding=0>
    <tbody>
      <tr>
        <td>
          <div class="mb-2"><b>First Name:</b></div>
          <div>{{ $user['firstname'] }}</div>
        </td>
        <td>
          <div class="mb-2"><b>Last Name:</b></div>
          <div>{{ $user['lastname'] }}</div>
        </td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td>
          <div class="mb-2"><b>Address:</b></div>
          <div>{{ $user['address'] }}</div>
        </td>
        <td>
          <div class="mb-2"><b>Country:</b></div>
          <div>{{ $user['country'] }}</div>
        </td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td colspan=4>
          <div class="mb-2"><b>Passport/ID Card No:</b></div>
          <div>{{ $user['passport'] }}</div>
        </td>
      </tr>
    </tbody>
  </table>
@endsection

@extends('pdf.layout')

@section('style')
  <style>
    .pdf-header .common-header {
      margin: 1rem 0 ;
      border-bottom: 3px solid rgb(35, 31, 32) ;
    }
    .room-header .input {
      width: 45% ;
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

    .room_data-container {
      border-spacing: 0 2rem ;
    }
    .room_data-container td {
      vertical-align: top ;
    }

    .availability-container, .participants-container {
      margin-bottom: 2rem ;
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
        <th align="center">General Deal Details</th>
      </tr>
    </tbody>
  </table>

  <table class="room_data-container w-100" border=0 cellpadding=0>
    <tbody>
      <tr>
        <td>
          <div class="mb-2">Creation Date:</div>
          <div>{{ $room['create_date'] }}</div>
        </td>
        <td>
          <div class="mb-2">Expiration Date:</div>
          <div>{{ $room['expire_date'] }}</div>
        </td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td>
          <div class="mb-2">Total Amount of BTC:</div>
          <div>{{ $room['dealdetails']['amount_of_coins'] }}</div>
        </td>
        <td>
          <div class="mb-2">Location of BTC:</div>
          <div>{{ $room['dealdetails']['country_btc'] }}</div>
        </td>
        <td>
          <div class="mb-2">Daily Tranche Size:</div>
          <div>{{ $room['dealdetails']['tranche_size'] }}</div>
        </td>
        <td>
          <div class="mb-2">Tranches Per Week:</div>
          <div>{{ $room['dealdetails']['tranche_size'] }}</div>
        </td>
      </tr>
      <tr>
        <td>
          <div class="mb-2">Net Discount:</div>
          <div>{{ $room['dealdetails']['net_gross_discount'] }}</div>
        </td>
        <td>
          <div class="mb-2">Gross Discount:</div>
          <div>{{ $room['dealdetails']['net_gross_discount'] }}</div>
        </td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td>
          <div class="mb-2">Fiat Currency:</div>
          <div>{{ $room['dealdetails']['country_btc'] }}</div>
        </td>
        <td>
          <div class="mb-2">Country of Fiat:</div>
          <div>{{ $room['dealdetails']['bank_country_of_fiat_buyer'] }}</div>
        </td>
        <td>
          <div class="mb-2">Bank of Fiat:</div>
          <div>{{ $room['dealdetails']['bank_country_of_fiat_seller'] }}</div>
        </td>
        <td></td>
      </tr>
    </tbody>
  </table>

  <table class="availability-container w-100" border=0 cellpadding=0>
    <thead>
      <tr>
        <th colspan="3">Availability (Buyer)</th>
        <th colspan="3">Availability (Seller)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td colspan="2">Face to Face:</td>
        <td align="center">{{ $room['dealdetails']['face_to_face'] }}</td>
        <td colspan="2">Face to Face:</td>
        <td align="center">{{ $room['dealdetails']['face_to_face'] }}</td>
      </tr>
      <tr>
        <td colspan="2">Lawyer to Lawyer</td>
        <td align="center">{{ $room['dealdetails']['lawyer_to_laywer'] }}</td>
        <td colspan="2">Lawyer to Lawyer:</td>
        <td align="center">{{ $room['dealdetails']['lawyer_to_laywer'] }}</td>
      </tr>
      <tr>
        <td colspan="2">Is Buyer a Platform:</td>
        <td align="center">{{ $room['dealdetails']['is_buyer_platform'] }}</td>
        <td colspan="2">Is Seller a Platform:</td>
        <td align="center">{{ $room['dealdetails']['is_seller_platform'] }}</td>
      </tr>
      <tr>
        <td colspan="2">(if NO) Is Buyer Onboarded with a platform:</td>
        <td align="center">{{ $room['dealdetails']['is_buyer_onboarded_to_platform'] }}</td>
        <td colspan="2">(if NO) Is Buyer Onboarded with a platform:</td>
        <td align="center">{{ $room['dealdetails']['is_seller_onboarded_to_platform'] }}</td>
      </tr>
    </tbody>
  </table>

  <table class="participants-container w-50" border=0 cellpadding=0>
    <thead>
      <tr>
        <th colspan="4">Current Parties (Display Name) (as of {{ date("d/m/y") }}):</th>
      </tr>
    </thead>
    <tbody>
      @foreach($room['users'] as $user)
        <tr>
          <td>{{ $user['displayname'] }}</td>
          <td align="center">-</td>
          <td>{{ $user['role_label'] }}</td>
          <td></td>
        </tr>
      @endforeach
    </tbody>
  </table>

  <div class="comment-container w-100">
    <div>
      Comments:
    </div>
    <textarea rows="4" cols="50">{{ $room['dealdetails']['comments'] }}</textarea>
  </div>

@endsection

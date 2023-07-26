<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use PDF;

use Storage;
use Kreait\Firebase;
use Kreait\Firebase\Factory;
use Kreait\Firebase\ServiceAccount;
use Kreait\Firebase\Database;

class PDFController extends Controller
{
	const ROLES = array('', 'Buyer', 'Seller', 'Buyer Mandate', 'Seller Mandate', 'Buyer Intermediary', 'Seller Intermediary', 'Escrow Agent', 'Lawyer');

	public function dealdetails(Request $request)
	{
		$rid = $request->rid;

		$serviceAccount = ServiceAccount::fromJsonFile(__DIR__.'/API/dataroom-cd23c-aefc710bc8c6.json');
    $firebase = (new Factory)
    ->withServiceAccount($serviceAccount)
    ->withDatabaseUri('https://dataroom-cd23c.firebaseio.com/')
    ->create();

		$database = $firebase->getDatabase();

		$room = $database->getReference('/rooms/'.$rid)->getSnapshot()->getValue();
		$users = $database->getReference('/users')->getSnapshot()->getValue();

		$room['rid'] = $rid;
		$room['id'] = str_pad($room['id'], 6, '0', STR_PAD_LEFT);
		$room['dealdetails'] = $room['documents']['general']['dealdetails'];
		$room['create_date'] = date( "d M Y", $room['create_date']);
		$room['expire_date'] = date( "d M Y", $room['expire_date']);
		foreach ($room['users'] as $uid=>&$user) {
			$user = array_merge($user, $users[$uid]);
			$user['role_label'] = self::ROLES[$user['role']];
		}

		$data = [
			'room' => $room,
		];

		$pdf = PDF::loadView('pdf.dealdetails', $data);

		if ($request->download == 'true') {
			return $pdf->download('dealdetails.pdf');
		} else {
			return $pdf->stream('dealdetails.pdf');
		}
	}

	public function kyc(Request $request)
	{
		$rid = $request->rid;
		$uid = $request->uid;

		$serviceAccount = ServiceAccount::fromJsonFile(__DIR__.'/API/dataroom-cd23c-aefc710bc8c6.json');
    $firebase = (new Factory)
    ->withServiceAccount($serviceAccount)
    ->withDatabaseUri('https://dataroom-cd23c.firebaseio.com/')
    ->create();

		$database = $firebase->getDatabase();

		$room = $database->getReference('/rooms/'.$rid)->getSnapshot()->getValue();
		$user = $database->getReference('/users/'.$uid)->getSnapshot()->getValue();

		$room['rid'] = $rid;
		$room['id'] = str_pad($room['id'], 6, '0', STR_PAD_LEFT);
		$room['create_date'] = date( "d M Y", $room['create_date']);
		$user['uid'] = $uid;

		$data = [
			'room' => $room,
			'user' => $user,
		];

		$pdf = PDF::loadView('pdf.kyc', $data);

		if ($request->download == 'true') {
			return $pdf->download('kyc.pdf');
		} else {
			return $pdf->stream('kyc.pdf');
		}
	}
}

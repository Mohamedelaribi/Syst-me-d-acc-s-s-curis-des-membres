<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('invite', function () {
	$data = [
		'displayname'		=> 'Bob',
		'role'					=> 'BUYER MANDATE',
		'room_id'				=> '065331',
		'participants'	=> '5',
		'link'					=> 'http://www.closingroom.com/nf89423mm#23'
	];
	return view('email.invite', $data);
});

Route::get('verify', function () {
	$data = [
		'displayname' 	=> 'Michael',
		'link' 					=> 'http://www.closingroom.com/nf89423mm#23'
	];
	return view('email.verify', $data);
});

Route::post('dealdetails','PDFController@dealdetails');
Route::post('kyc','PDFController@kyc');
Route::post('file','API\FirebaseController@viewFile');

Route::any('{all}', function () {
	return view('welcome');
})->where('all', '.*');

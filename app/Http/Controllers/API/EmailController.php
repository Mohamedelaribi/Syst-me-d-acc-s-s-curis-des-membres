<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use Mail;

class EmailController extends Controller
{
	public function sendInviteEmail(Request $request)
	{
		$sender_email = $request->sender_email;
		$receiver_email = $request->receiver_email;

		$data = [
			'displayname'			=> $request->displayname,
			'role'						=> $request->role,
			'room_id'					=> $request->room_id,
			'participants'		=> $request->participants,
			'link'						=> $request->link
		];

		Mail::send('email.invite', $data, function($message) use ($sender_email, $receiver_email) {
			$message->to($receiver_email, '')->subject('Invitation to a new room');
			$message->from($sender_email, 'ClosingRoom');
		});

		return $data;
	}

	public function sendVerifyEmail(Request $request)
	{
		$email = $request->email;

		$data = [
			'displayname' 		=> $request->displayname,
			'link'						=> $request->link
		];

		Mail::send('email.verify', $data, function($message) use ($email) {
			$message->to($email, '')->subject('Email Verification');
			$message->from("no-reply@mnmcs.com", 'ClosingRoom');
		});

		return $data;
	}
}

<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use Storage;
use Kreait\Firebase;
use Kreait\Firebase\Factory;
use Kreait\Firebase\ServiceAccount;
use Kreait\Firebase\Database;
use File;
use Response;

class FirebaseController extends Controller
{
	public function fileUpload(Request $request)
	{
    $file = $request->file('file');
    $url = $request->url;

		// // Get File Content
		$fileContent = $file->get();

		// // Encrypt the Content
		// $encryptedContent = encrypt($fileContent);
		// $decryptedContent = decrypt($encryptedContent);

		// // Store the encrypted Content
		// Storage::put('storage/uploads/file.dat', $fileContent);

		//Move Uploaded File
    $dirPath = 'storage/uploads';
    $fileName = $file->getClientOriginalName();
    $filePath = $dirPath.'/'.$fileName;

    $file->move($dirPath, $fileName);

    // Storage::put('storage/uploads/'.$file->getClientOriginalName(), $decryptedContent);

//    dd($file->getMimeType());

    $serviceAccount = ServiceAccount::fromJsonFile(__DIR__.'/dataroom-cd23c-aefc710bc8c6.json');
    $firebase = (new Factory)
    ->withServiceAccount($serviceAccount)
    ->withDatabaseUri('https://dataroom-cd23c.firebaseio.com/')
    ->create();

    $database = $firebase->getDatabase();
    $storage = $firebase->getStorage();
    $bucket = $storage->getBucket();

    $object = $bucket->upload(
      fopen($filePath, 'r'),
      ['name' => $url,]
    );

    return $url;
  }

  public function viewFile(Request $request)
  {
    $serviceAccount = ServiceAccount::fromJsonFile(__DIR__.'/dataroom-cd23c-aefc710bc8c6.json');
    $firebase = (new Factory)
    ->withServiceAccount($serviceAccount)
    ->withDatabaseUri('https://dataroom-cd23c.firebaseio.com/')
    ->create();

    $database = $firebase->getDatabase();
    $storage = $firebase->getStorage();
    $bucket = $storage->getBucket();

    $object = $bucket->object($request->url);

    $dirPath = 'storage/uploads';
    $fileName = 'document.dat';
    $filePath = $dirPath.'/'.$fileName;

    $object->downloadToFile($filePath);

    if ($request->download == 'true') {
      return response()->download($filePath)->deleteFileAfterSend();
    } else {
      $file = File::get($filePath);
      $type = File::mimeType($filePath);

      $response = Response::make($file, 200);
      $response->header("Content-Type", $type);

      return $response;
    }
  }
}

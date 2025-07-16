<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Spatie\RouteAttributes\Attributes\Get;
use Spatie\RouteAttributes\Attributes\Post;
use Spatie\RouteAttributes\Attributes\Delete;

class SampleController extends Controller
{
    #[Get('/toys')]
    public function showToys()
    {
        return 'Here are all the toys!';
    }

    #[Post('/toys')]
    public function addToy(Request $request){
        return '+ Toy added: '. $request->input('name');
    }

    #[Delete('/toys/{id}')]
        public function deleteToy($id){
            return 'Toy #'.$id.' has been delete!';
        
    }
}

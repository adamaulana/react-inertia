<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Redirect;
use App\Http\Controllers\Route;
use App\Http\Middleware\HandleInsertiaRequests;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('user', [
            'users' => User::all()->map(function ($user) {
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'edit_url' => route('user.edit', $user->id),
                ];
            }),
            'create_url' => route('user.create'),
        ]); //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('CreateUser');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $post = $request->validate([
            'name'      => ['required'],
            'email'     => ['required','email','unique:users'],
            'password'  => ['required','confirmed'],
            'password_confirmation'  => ['required'],
            'image' => ['required', 'mimes:png,jpg,jpeg']
        ]);
        $extFile = $request->image->getClientOriginalExtension();
        $nameFile = "spa".time().".".$extFile;
        $image = $request->image->move('images', $nameFile);
        $post['image'] = $nameFile;
        // dd($post);
        User::create($post);

        // return Redirect::back();


    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $user = User::find($id);
        return Inertia::render('CreateUser', [
            'editUser' => $user
        ]);

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $put = $request->validate([
            'name'      => ['required'],
            'email'     => ['required','email','unique:users'],
            'image' => ['required', 'mimes:png,jpg,jpeg']
        ]);
        $extFile = $request->image->getClientOriginalExtension();
        $nameFile = "spa".time().".".$extFile;
        $image = $request->image->move('images', $nameFile);
        $put['image'] = $nameFile;
        // dd($post);
        User::where('id', $id )->update($put);
        return Redirect::route('user.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $delete = User::find($id);
        $delete->delete();
        return to_route('user.create');
    }
}

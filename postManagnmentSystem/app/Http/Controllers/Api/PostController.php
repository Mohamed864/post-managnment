<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\PostRequest;
use App\Http\Resources\PostResource;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;



class PostController extends Controller
{
    use AuthorizesRequests;
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        /** @var \App\Models\User|\App\Models\Admin $user */
        $user = Auth::user();

        // Admin sees all posts, user sees their own
        $posts = $user->tokenCan('admin')
            ? Post::with('user')->latest()->get()
            : $user->posts()->latest()->get();

        return PostResource::collection($posts);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PostRequest $request)
    {
        $user = Auth::user();

        $post = Post::create([
            'user_id' => $user->id,
            ...$request->only(['title', 'content', 'status']),
        ]);

        return new PostResource($post);
    }

    /**
     * Display the specified resource.
     */
   public function show(Post $post)
    {
        return new PostResource($post->load('user'));
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(PostRequest $request, Post $post)
    {
        $this->authorize('update', $post);

        $post->update($request->only(['title', 'content', 'status']));

        return new PostResource($post);
    }



    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        $this->authorize('delete', $post);

        $post->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Post deleted successfully',
        ]);
    }


}

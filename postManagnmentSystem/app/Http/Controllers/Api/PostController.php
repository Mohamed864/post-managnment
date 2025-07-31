<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\PostRequest;
use App\Http\Resources\PostResource;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Support\Facades\Storage;



class PostController extends Controller
{
    use AuthorizesRequests;
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        /** @var \App\Models\User|\App\Models\Admin $user */
        $user = Auth::user();

        // Admin sees all posts, user sees their own
        $query = $user->tokenCan('admin')
        ? Post::with('user')->latest()
        : $user->posts()->latest();


        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('content', 'like', "%{$search}%");
            });
        }

        // Filter by status
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }



       $posts = $query->paginate($request->per_page ?? 10);

        return PostResource::collection($posts);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PostRequest $request)
    {
        $user = Auth::user();

        $postData = [
            'user_id' => $user->id,
            'title' => $request->title,
            'content' => $request->content,
            'status' => $request->status,
        ];


        $post = Post::create($postData);

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

        $updateData = $request->only(['title', 'content', 'status']);

        $post->update($updateData);

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

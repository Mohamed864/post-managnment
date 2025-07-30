import {
    getAllPosts,
    adminCreatePost,
    adminUpdatePost,
    adminDeletePost,
    adminShowPost,
} from "./adminService";

import {
    getUserPosts,
    createPost,
    updatePost,
    deletePost,
    showPost,
} from "./userService";

export const fetchPosts = (isAdmin) =>
    isAdmin ? getAllPosts() : getUserPosts();

export const createNewPost = (data, isAdmin) =>
    isAdmin ? adminCreatePost(data) : createPost(data);

export const updateExistingPost = (id, data, isAdmin) =>
    isAdmin ? adminUpdatePost(id, data) : updatePost(id, data);

export const deleteExistingPost = (id, isAdmin) =>
    isAdmin ? adminDeletePost(id) : deletePost(id);

export const showSinglePost = (id, isAdmin) =>
    isAdmin ? adminShowPost(id) : showPost(id);

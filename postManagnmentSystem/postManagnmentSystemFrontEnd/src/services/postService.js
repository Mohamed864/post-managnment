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

// src/services/postService.js
export const fetchPosts = (isAdmin, page = 1, perPage = 10, filters = {}) =>
    isAdmin
        ? getAllPosts(page, perPage, filters)
        : getUserPosts(page, perPage, filters);

export const showSinglePost = (
    id,
    isAdmin,
    include = [],
    withTrashed = false
) =>
    isAdmin ? adminShowPost(id, include, withTrashed) : showPost(id, include);

export const createNewPost = (data, isAdmin) =>
    isAdmin ? adminCreatePost(data) : createPost(data);

export const updateExistingPost = (id, data, isAdmin) =>
    isAdmin ? adminUpdatePost(id, data) : updatePost(id, data);

export const deleteExistingPost = (id, isAdmin) =>
    isAdmin ? adminDeletePost(id) : deletePost(id);

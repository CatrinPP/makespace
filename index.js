'use strict';

var MAX_POSTS = 10;
var STATUS_OK = 200;

var postsDiv = document.querySelector(`#posts`);

var getXhr = function (onLoad) {
  var xhr = new XMLHttpRequest();
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    if (xhr.status === STATUS_OK) {
      onLoad(xhr.response);
    }
  });
  return xhr;
};

var load = function (url, onLoad) {
    var xhr = getXhr(onLoad);
    xhr.open('GET', url);
    xhr.send();
};

var onSuccess = function (data) {
  renderPosts(data.reverse());
};

var renderPost = function (data) {
  var post = document.querySelector('#post').content.querySelector('.post');
  var postElement = post.cloneNode(true);
  postElement.querySelector('.post__title').textContent = data.title;
  postElement.querySelector('.post__text').textContent = data.body;
  return postElement;
};

var renderPosts = function (data) {
  var fragment = document.createDocumentFragment();
  var postsCount = data.length > MAX_POSTS ? MAX_POSTS : data.length;
  for (var i = 0; i < postsCount; i++) {
      fragment.appendChild(renderPost(data[i]));
  }
  postsDiv.appendChild(fragment);
};

var getPosts = function () {
  load('https://jsonplaceholder.typicode.com/posts/', onSuccess);
};

getPosts();
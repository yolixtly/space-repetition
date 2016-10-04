// require('isomorphic-fetch'); #TODO when you add Thunk
var FETCH_WORD_SUCCESS = 'FETCH_WORD_SUCCESS';
var FETCH_WORD_ERROR = 'FETCH_WORD_ERROR';

var fetchWordSuccess = function(items){
	return {
		type: FETCH_WORD_SUCCESS,
		data: items 
	};
};

var fetchWordError = function(items){
	return {
		type: FETCH_WORD_ERROR,
		data: error 
	};
};

var fetchWord = function(){
	return function(dispatch){
		var url ="http://localhost:3000/items/";
	};
	return fetch(url).then(function(response){
		if(response.status < 200 || response.status >= 300){
			var error = new Error(response.statusText);
			error.response = response;
			throw error;
		}
		return response.json();
	})
	.then(function(items){
		console.log('fetch items Promise: ', items);
		return dispatch(
			fetWordSucess(items)
		);
	})
	.catch(function(error){
		return dispatch(
			fetchWordError(error)
		);
	});
};

exports.fetchWord = fetchWord;
exports.FETCH_WORD_SUCCESS = FETCH_WORD_SUCCESS;
exports.fetchWordSuccess = fetchWordSuccess;
exports.FETCH_WORD_ERROR = FETCH_WORD_ERROR;
exports.fetchWordError = fetchWordError;
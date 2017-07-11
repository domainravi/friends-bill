'use strict';

var config = {
  apiKey: "AIzaSyB5oy_-zvtNbajVUcLbKYkzNarhIn0DMxw",
  authDomain: "friendsbill.firebaseio.com",
  databaseURL: "https://friendsbill.firebaseio.com/",
  storageBucket: "gs://firebase-friendsbill.appspot.com",
};
firebase.initializeApp(config);

var ref = firebase.database().ref();

angular.module('myApp.friends', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/friends', {
		templateUrl: 'friends/friends.html',
		controller: 'friendsCtrl'
	});
}])

.controller('friendsCtrl', ['$scope', '$firebaseArray', function($scope, $firebaseArray) {
	//Intialize firebase
	//var ref = new Firebase('https://friendsbill.firebaseio.com/friends');

	//get friends
	$scope.friends = $firebaseArray(ref);
	//console.log($scope.friends);

	//show details form
	$scope.showExpenseForm = function () {
		$scope.showForm = true;
	}

	//hide Expense form
	$scope.hideExpenseForm = function(){
		$scope.showForm = false;	
		$scope.showExpense = false;
		$scope.updateForm = false;
	}

	//Show update form
	$scope.showEditExpenseForm = function(friends){
		$scope.updateForm = true;
		$scope.showForm = false;
		$scope.id = friends.$id;
		$scope.description = friends.description;
		$scope.amount = friends.amount;
		$scope.friend = friends.friend;
	}



	//submit Expense form
	$scope.submitExpenseForm = function(){
		//console.log('Adding....');

		//Assign values
		if ($scope.description) {
			var description = $scope.description;
		}else{
			var description = null;
		}
		if ($scope.amount) {
			var amount = $scope.amount;
		}else{
			var amount = null;
		}
		if ($scope.friend) {
			var friend = $scope.friend;
		}else{
			var friend = null;
		}


		//build objects
		$scope.friends.$add({
			description : description,
			amount : amount,
			friend : friend
		}).then(function(ref){
			var id = ref.key();

			//call clearExpenseFormField method
			clearExpenseFormField();

			//hide Expense form
			$scope.showForm = false;
		});
	};


	//update form
	$scope.editExpenseFormSubmit = function(){
		var id = $scope.id;
		var record = $scope.friends.$getRecord(id);

		record.description = $scope.description;
		record.amount = $scope.amount;
		record.friend = $scope.friend;
		$scope.friends.$save(record).then(function(ref){
			console.log(ref.key);
		})

		clearExpenseFormField();

		$scope.updateForm = false;

	}


	//Remove Expense
	$scope.removeExpenseForm  = function(friend){
		$scope.friends.$remove(friend);
	}

	//clear form field
	function clearExpenseFormField(){
		$scope.description = '';
		$scope.amount = '';
		$scope.friend = '';
	}

}]);
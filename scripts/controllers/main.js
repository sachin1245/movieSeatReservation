'use strict';


angular.module('seatReservationApp')
    .controller('mainController', function ($scope) {

       
        $scope.rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
        $scope.cols = [1, 2, 3, 4, 5, 6, 7, 8,9,10,11,12];

       
        var reserved = ['A2', 'A3', 'C5', 'C6', 'C7', 'C8', 'J1', 'J2', 'J3', 'J4'];
        var selected = [];

        $scope.bookedSeats = []

         $scope.bookedUsers =[];
         $scope.currentUser = {
            name: '',
            noOfSeats: '',
            count: 0,
            selectedSeats: []
         }
         $scope.noOfSeats;

         
         
        
        $scope.seatClicked = function(seatPos) {
            console.log("Selected Seat: " + seatPos);
            var index = selected.indexOf(seatPos);
            if($scope.currentUser.count < 1){
              $scope.currentUser.selectedSeats = [];   
            }
            if($scope.currentUser.noOfSeats > 0){
                    if(index != -1) {
                    selected.splice(index, 1)
                    $scope.currentUser.noOfSeats++;
                    $scope.currentUser.count++;
                } else {
                    $scope.currentUser.noOfSeats--;
                    $scope.currentUser.count++;
                    selected.push(seatPos);
                    $scope.currentUser.selectedSeats.push(seatPos);

                 }
            }else{
                console.log('You have to select how many seats you want');
            }
            
        }

        $scope.checker = function(total){
            console.log(total);

            var count1= 0;
            reserved.forEach(function(reserve){
                if(reserve == total){
                    count1++;
                }
                    
            });
            if(count1 > 0){
                 return ;
             }else{
                return $scope.seatClicked(total);
             }
           
         }


        $scope.getStatus = function(seatPos) {
            if(reserved.indexOf(seatPos) > -1) {
                return 'reserved';
            } else if(selected.indexOf(seatPos) > -1) {
                return 'selected';
            }
        }

        // clear selected
        $scope.clearSelected = function() {
            selected = [];
        }

        // show selected
        $scope.showSelected = function() {
            if(selected.length > 0) {
                alert("Selected Seats: \n" + selected);
            } else {
                alert("No seats selected!");
            }
        }

       

        $scope.startSelection  = function(user){

            $scope.currentUser = user;

            console.log(user);
            $scope.noOfSeats = seats;
            $scope.myVar = "booked";

            $scope.myVar1 = true;

        }  

        $scope.confirmSelection = function(user){
            
            
         


            user.selectedSeats.forEach(function(seat){
                reserved.push(seat);
            });
            // reserved.forEach(function(reserved){
            //     var a = 'myVar'+reserved;
            //     console.log(a);
            //     a = true;
            // })

            user.selectedSeats.toString();

            $scope.bookedUsers.push(user);
            $scope.selected = [];

            console.log($scope.currentUser);
            console.log($scope.bookedUsers);
            

             $scope.currentUser.count = 0;

        } 

    });

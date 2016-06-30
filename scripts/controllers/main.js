'use strict';


angular.module('seatReservationApp')
    .controller('mainController', function ($scope) {

       
        $scope.rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
        $scope.cols = [1, 2, 3, 4, 5, 6, 7, 8,9,10,11,12];

       
        var reserved = [];
        var selected = [];

        

        $scope.bookedUsers =[];
        $scope.currentUser = {
            name: '',
            noOfSeats: '',
            count: 0,
            selectedSeats: []
        }
       

         
         
        
        $scope.seatClicked = function(seatPos,count) {
            
            var index = selected.indexOf(seatPos);
            if($scope.currentUser.count < 1){
              $scope.currentUser.selectedSeats = [];   
            }

            var count1= 0;
            selected.forEach(function(select){
                if(select == seatPos){
                    count1++;
                }
                    
            });
            console.log(count);
            if($scope.currentUser.noOfSeats + count > 0){
                    if(index != -1) {
                        selected.splice(index, 1);
                        
                        $scope.currentUser.noOfSeats++;
                        

                        if(count1 > 0 ){
                            console.log("Unselected Seat: " + seatPos);
                            selected = _.without(selected, seatPos);
                            $scope.currentUser.selectedSeats = _.without($scope.currentUser.selectedSeats, seatPos);
                            $scope.currentUser.count--;
                        }
                    } else {
                        console.log("Selected Seat: " + seatPos);
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
            var count2 = 0;
            reserved.forEach(function(reserve){
                if(reserve == total){
                    count1++;
                }
                    
            });

            selected.forEach(function(select){
                if(select == total){
                    count2++;
                }
            });
            

            if($scope.currentUser.name.length < 1){
                 return console.log('Enter a Valid Name')
             }else if($scope.currentUser.noOfSeats < 1 && count2 < 1){
                 return console.log('The no of Seats should atleast be 1');
             }else if(count1 > 0){
                return console.log('This seat is Already booked');
             }else{
                return $scope.seatClicked(total,count2);
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

            if(user.name.length < 1 ){
                return console.log('Enter Your Name & No of Seats You Want');
            }else if(isNaN(user.noOfSeats)){
                return console.log('Enter a Valid Number of Seats')
            }else if(user.noOfSeats < 1){
                return console.log('No of Seats Should be Atleast One')
            }
            $scope.currentUser = user;
            console.log($scope.currentUser.noOfSeats);
            console.log(user);

        }  

        $scope.confirmSelection = function(user){
            
        
        if($scope.currentUser.name.length < 1){
                 return console.log('Enter a Valid Name')
        }else if($scope.currentUser.count < 1){
                 
                 return console.log('No seats are selected');
        }else if($scope.currentUser.noOfSeats > 0){
                return console.log('you have ' + $scope.currentUser.noOfSeats + ' more seats to select before confirm')
        }   
         user.selectedSeats.forEach(function(seat){
                reserved.push(seat);
            });
          
          var bookedData = {
            name: $scope.currentUser.name,
            noOfSeats: $scope.currentUser.count,
            seatSelected: $scope.currentUser.selectedSeats
          };


          
            $scope.bookedUsers.push(bookedData);
            console.log($scope.currentUser);
            console.log($scope.bookedUsers);
            
            $scope.currentUser.finalNoOfSeats = $scope.currentUser.count;
             $scope.currentUser.count = 0;

        } 



    });

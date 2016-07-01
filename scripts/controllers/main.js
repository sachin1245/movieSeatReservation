'use strict';


angular.module('movieSeatReservation')
    .controller('mainController', function ($scope) {

       
        $scope.rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
        $scope.cols = [1, 2, 3, 4, 5, 6, 7, 8,9,10,11,12];

       $scope.totalNoOfSeats = 120;


        //stores all the reserved seats 
        var reserved = [];

        //stores the selected seats 
        var selected = [];

        //stores the data of all the users who have booked the tickets
         $scope.bookedUsers =[];


        //data of user currently booking 
        $scope.currentUser = {
            name: '',
            noOfSeats: '',
            count: 0,   //helps in validation
            selectedSeats: [] //selected seats data
        }
       

       
        // performs validation when user click on a seat 
        // if everything goes well then calls seatClicked() function
        $scope.checker = function(seatPos){

            var count1= 0;
            var count2 = 0;

            //to check if the seat is already booked
            reserved.forEach(function(reserve){
                if(reserve == seatPos){
                    count1++;
                }
                    
            });


            selected.forEach(function(select){
                if(select == seatPos){
                    count2++;
                }
            });
            

            //total no of seats available to book
            var seatsAvailable = $scope.totalNoOfSeats - reserved.length;

            //validation happens here
            if($scope.currentUser.noOfSeats > seatsAvailable){
                return console.log("only  " + seatsAvailable + " seats are available");
                $scope.currentUser.noOfSeats = 0;
            }else if($scope.currentUser.name.length < 1){
                 return console.log('Enter a Valid Name')
             }else if($scope.currentUser.noOfSeats < 1 && count2 < 1){
                 return console.log('The no of Seats should atleast be 1');
             }else if(count1 > 0){
                return console.log('This seat is Already booked');
             }else{
                return $scope.seatClicked(seatPos,count2);
             }
           
         }

          //if validation passes this function decide the seat should be 
          //selected or unselected
          $scope.seatClicked = function(seatPos,count) {
            

            var index = selected.indexOf(seatPos);

            //initializing the current user seats=0 if no seats are booked yet
            if($scope.currentUser.count < 1){
              $scope.currentUser.selectedSeats = [];   
            }


            //raise the count which helps to unselect already selected seat
            var count1= 0;
            selected.forEach(function(select){
                if(select == seatPos){
                    count1++;
                }
                    
            });


            if($scope.currentUser.noOfSeats + count > 0){
                    if(index != -1) {
                        selected.splice(index, 1);
                        
                        $scope.currentUser.noOfSeats++;
                        
                        //unselects the selected seats before confirmation and removes
                        // from current user seatsSelected array
                        if(count1 > 0 ){
                            console.log("Unselected Seat: " + seatPos);
                            selected = _.without(selected, seatPos);
                            $scope.currentUser.selectedSeats = _.without($scope.currentUser.selectedSeats, seatPos);
                            $scope.currentUser.count--;
                        }

                        //selects a seat and pushes it to selected seats of current user
                    } else {
                        console.log("Selected Seat: " + seatPos);
                        $scope.currentUser.noOfSeats--;
                        $scope.currentUser.count++;
                        selected.push(seatPos);
                        $scope.currentUser.selectedSeats.push(seatPos);

                    }
            }else{
                console.log('Select the no of seats you want to book');
            }
            
        }

        //helps to select which seat image to according according to the data 
        $scope.getStatus = function(seatPos) {
            if(reserved.indexOf(seatPos) > -1) {
                return 'reserved';
            } else if(selected.indexOf(seatPos) > -1) {
                return 'selected';
            }
        }

       
        //Start Booking
        //Validates when start selection button is clicked and 
        //sets the current user data accordingly
        $scope.startSelection  = function(user){

            //to check if the amout of seats selected are available
            var seatsAvailable = $scope.totalNoOfSeats - reserved.length;

            //fails if amount of seats selcted are not available
            if(user.noOfSeats > seatsAvailable){
                return console.log("only  " + seatsAvailable + " seats are available");
                $scope.currentUser.noOfSeats = 0;
            }
            //fails if name field is empty
            else if(user.name.length < 1 ){
                return console.log('Enter Your Name & No of Seats You Want');
            }//fails if selcted no of seats is not a number
            else if(isNaN(user.noOfSeats)){
                return console.log('Enter a Valid Number of Seats');
            }//fails if no of seats is < 1
            else if(user.noOfSeats < 1){
                return console.log('No of Seats Should be Atleast One');
            }

            //updates the current user data if everything goes well
            $scope.currentUser = user;
            

        }  

        //Confirm Booking
        //Validates and updates all the booked users data
        $scope.confirmSelection = function(user){
            
            
            if($scope.currentUser.name.length < 1){
                     return console.log('Enter a Valid Name')
            }else if($scope.currentUser.count < 1){
                      return console.log('No seats are selected');
            }else if($scope.currentUser.noOfSeats > 0){
                    return console.log('you have ' + $scope.currentUser.noOfSeats + ' more seats to select before confirm')
            }   

            //pushes the current user selected seats to the reserved seats array
             user.selectedSeats.forEach(function(seat){
                    reserved.push(seat);
            });
              
            //updates the current user data in all booked users data   
            var bookedData = {
                name: $scope.currentUser.name,
                noOfSeats: $scope.currentUser.count,
                seatSelected: $scope.currentUser.selectedSeats
              };
            $scope.bookedUsers.push(bookedData);
           

            $scope.currentUser.count = 0;

        } 



    });

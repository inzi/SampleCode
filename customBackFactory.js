   .factory('customBack', function ($rootScope, $ionicPlatform, $ionicHistory) {
        // the idea here is a universal back handler that handles both hard and soft backs - but a controller can register a handler
        // to intercept a back in case its needed.
        // run this function when either hard or soft back button is pressed
        

        var factoryObject = {
            defaultCallback:''
        };
        factoryObject.defaultCallback = function () {
            console.log("This function should be overridden to handle a custom back.")
            return true
        };
        factoryObject.callback = factoryObject.defaultCallback;



        //when implemented - customBack.callback should return true or false.
        // this gives a dialog the ability to cancel a hard or soft back.


        var doCustomBack = function () {
            console.log("doCustomBack");
            if (factoryObject.callback() == true) {
                spit("restoring $ionicGoBack");
                factoryObject.deregisterHardBack();
                factoryObject.deregisterSoftBack();
                factoryObject.callback = factoryObject.defaultCallback;
                $rootScope.$ionicGoBack();
            }
           
        };

        factoryObject.invoke = function () {
            doCustomBack();
        }

        factoryObject.oldSoftBack = $rootScope.$ionicGoBack;

        factoryObject.deregisterSoftBack = function () {
            $rootScope.$ionicGoBack = factoryObject.oldSoftBack;
        };

        factoryObject.deregisterHardBack = $ionicPlatform.registerBackButtonAction(
                    doCustomBack, 101
                );
        factoryObject.init = function () {
            console.log("=-=-=-=-=-=-=-=-=-=-=-=-=-=- customBack invoked");
            $rootScope.$ionicGoBack = function () {
                doCustomBack();
            };
        }

        return factoryObject;

    })

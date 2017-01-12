(function() {
    var module;

    try {
        // Get current templates module
        module = angular.module('app.views');
    } catch (error) {
        // Or create a new one
        module = angular.module('app.views', []);
    }

    module.run(["$templateCache", function($templateCache) {
        $templateCache.put('js/components/game/game.html', '<a class=\"btn btn-warning logout\" ng-click=\"$ctrl.disconnect()\">Logout</a>\n<div class=\"page-header\">\n    <h1>Game</h1>\n</div>\n\n<section id=\"game\">\n    <div class=\"container\">\n        <div class=\"row\">\n            Joueur 1 : {{$ctrl.currentUser.name}}\n            <br /> Joueur 2 : {{$ctrl.otherUser[0].name || \'Waiting for user 2\'}}\n            <div ng-repeat=\"tac in $ctrl.tic track by $index\">\n                <div class=\"col-xs-4 thumbnail\" ng-click=\"$ctrl.click($parent.$index, $index)\" ng-repeat=\"toe in tac track by $index\">\n                    <h1 class=\"toe\">{{toe.value}}</h1>\n                </div>\n            </div>\n            {{$ctrl.tic[0]}}<br>\n            {{$ctrl.tic[1]}}<br>\n            {{$ctrl.tic[2]}}\n        </div>\n    </div>\n</section>\n');
    }]);
})();
(function() {
    var module;

    try {
        // Get current templates module
        module = angular.module('app.views');
    } catch (error) {
        // Or create a new one
        module = angular.module('app.views', []);
    }

    module.run(["$templateCache", function($templateCache) {
        $templateCache.put('js/components/login/login.html', '<div class=\"page-header\">\n    <h1>Login</h1>\n</div>\n<!-- Prelogin -->\n<section id=\"prelogin\">\n    <div class=\"container\">\n        <div class=\"row text-align\">\n            <a class=\"btn btn-primary\" ng-click=\"login = !login\">Login</a>\n            <a class=\"btn btn-primary\" ng-click=\"register = !register\">Register</a>\n        </div>\n    </div>\n</section>\n\n<!-- Login -->\n<section ng-if=\"login\">\n    <div class=\"container\">\n        <form name=\"login\">\n            <div class=\"row\">\n                <div class=\"col-sm-12\">\n                    <h3>Login</h3>\n                </div>\n                <div class=\"input-field col-sm-12\">\n                    <label for=\"Email\">Email</label>\n                    <input type=\"text\" ng-model=\"$ctrl.user.email\" required>\n\n                </div>\n                <div class=\"input-field col-sm-12\">\n                    <label for=\"Password\">Password</label>\n                    <input type=\"text\" ng-model=\"$ctrl.user.password\" required>\n                </div>\n                <div class=\"col-sm-12\">\n                    <button class=\"btn btn-success\" ng-disabled=\"login.$invalid\" ng-click=\"$ctrl.connect($ctrl.user)\">\n                        Connexion\n                    </button>\n                </div>\n            </div>\n        </form>\n    </div>\n</section>\n<!-- Register -->\n<section ng-if=\"register\">\n    <div class=\"container\">\n        <form name=\"newUserForm\">\n            <div class=\"row\">\n                <h3>Register</h3>\n                <div class=\"col s12\">\n                    <div class=\"input-field col s6\">\n                        <label for=\"Name\">Name</label>\n                        <input id=\"Name\" type=\"text\" ng-model=\"$ctrl.newUser.name\" required>\n                    </div>\n                    <div class=\"input-field col s6\">\n                        <label for=\"Email\">Email</label>\n                        <input id=\"Email\" type=\"text\" ng-model=\"$ctrl.newUser.email\" required>\n                    </div>\n                    <div class=\"input-field col s6\">\n                        <label for=\"Password\">Password</label>\n                        <input id=\"Password\" type=\"text\" ng-model=\"$ctrl.newUser.password\" required>\n                    </div>\n                </div>\n                <div class=\"col s12\">\n                    <button class=\"btn btn-success\" ng-disabled=\"newUserForm.$invalid\" ng-click=\"$ctrl.add($ctrl.newUser)\">\n                            Create Account\n                    </button>\n                </div>\n            </div>\n        </form>\n    </div>\n</section>\n');
    }]);
})();

//# sourceMappingURL=templates.js.map
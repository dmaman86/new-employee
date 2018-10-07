(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<nav class=\"navbar navbar-expand-lg navbar-light bg-light\">\n\n  <a class=\"navbar-brand\" href=\"#\">{{ title }}</a>\n\n  <button class=\"navbar-toggler\" type=\"button\" data-toggle=\"collapse\" data-target=\"#navbarNavAltMarkup\" aria-controls=\"navbarNavAltMarkup\" aria-expanded=\"false\" aria-label=\"Toggle navigation\">\n      <span class=\"navbar-toggler-icon\"></span>\n    </button>\n\n  <div class=\"collapse navbar-collapse\" id=\"navbarNavAltMarkup\" *ngIf=\"identity\">\n    <div class=\"navbar-nav\">\n      <div *ngIf=\"this.identity.level == 'USER_ROLE'\">\n          <a class=\"nav-item nav-link active\" [routerLink]=\"['/home']\" routerLinkActive=\"active\">Home <span class=\"sr-only\">(current)</span></a>\n      </div>\n      <div *ngIf=\"this.identity.level == 'ADMIN_ROLE'\">\n          <a class=\"nav-item nav-link active\" [routerLink]=\"['/home-admin']\" routerLinkActive=\"active\">Home <span class=\"sr-only\">(current)</span></a>\n      </div>\n      <a class=\"nav-item nav-link disabled\" (click)=\"logout()\" routerLinkActive=\"active\">LogOut</a>\n      <a class=\"nav-item nav-link disabled\" href=\"#\" routerLinkActive=\"active\">About Me</a>\n    </div>\n  </div>\n\n  <div class=\"collapse navbar-collapse\" id=\"navbarNavAltMarkup\" *ngIf=\"!identity\">\n    <div class=\"navbar-nav\">\n      <a class=\"nav-item nav-link\" [routerLink]=\"['/login']\">Login</a>\n      <a class=\"nav-item nav-link\" [routerLink]=\"['/register']\">Register</a>\n      <a class=\"nav-item nav-link disabled\" href=\"#\">About Me</a>\n    </div>\n  </div>\n\n</nav>\n\n<div class=\"container main-container\">\n  <router-outlet></router-outlet>\n</div>\n\n\n\n\n\n\n\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./services/user.service */ "./src/app/services/user.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AppComponent = /** @class */ (function () {
    function AppComponent(_route, _router, _userService) {
        this._route = _route;
        this._router = _router;
        this._userService = _userService;
        this.title = 'Employee Management Application';
    }
    AppComponent.prototype.ngOnInit = function () {
        this.identity = this._userService.getIdentity();
        console.log(this.identity);
    };
    AppComponent.prototype.ngDoCheck = function () {
        this.identity = this._userService.getIdentity();
    };
    AppComponent.prototype.logout = function () {
        localStorage.clear();
        this.identity = null;
        this._router.navigate(['/login']);
    };
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            providers: [_services_user_service__WEBPACK_IMPORTED_MODULE_2__["UserService"]]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _services_user_service__WEBPACK_IMPORTED_MODULE_2__["UserService"]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _app_routing__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app.routing */ "./src/app/app.routing.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _components_login_login_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/login/login.component */ "./src/app/components/login/login.component.ts");
/* harmony import */ var _components_contacts_contacts_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/contacts/contacts.component */ "./src/app/components/contacts/contacts.component.ts");
/* harmony import */ var _components_edit_user_edit_user_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/edit-user/edit-user.component */ "./src/app/components/edit-user/edit-user.component.ts");
/* harmony import */ var _components_home_home_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/home/home.component */ "./src/app/components/home/home.component.ts");
/* harmony import */ var _components_home_admin_home_admin_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./components/home-admin/home-admin.component */ "./src/app/components/home-admin/home-admin.component.ts");
/* harmony import */ var _components_register_register_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./components/register/register.component */ "./src/app/components/register/register.component.ts");
/* harmony import */ var _components_user_week_user_week_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./components/user-week/user-week.component */ "./src/app/components/user-week/user-week.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




// routing

// components








var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"],
                _components_login_login_component__WEBPACK_IMPORTED_MODULE_6__["LoginComponent"],
                _components_contacts_contacts_component__WEBPACK_IMPORTED_MODULE_7__["ContactsComponent"],
                _components_edit_user_edit_user_component__WEBPACK_IMPORTED_MODULE_8__["EditUserComponent"],
                _components_home_home_component__WEBPACK_IMPORTED_MODULE_9__["HomeComponent"],
                _components_home_admin_home_admin_component__WEBPACK_IMPORTED_MODULE_10__["HomeAdminComponent"],
                _components_register_register_component__WEBPACK_IMPORTED_MODULE_11__["RegisterComponent"],
                _components_user_week_user_week_component__WEBPACK_IMPORTED_MODULE_12__["UserWeekComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                _app_routing__WEBPACK_IMPORTED_MODULE_4__["routing"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClientModule"]
            ],
            providers: [
                _app_routing__WEBPACK_IMPORTED_MODULE_4__["appRoutingProviders"]
            ],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/app.routing.ts":
/*!********************************!*\
  !*** ./src/app/app.routing.ts ***!
  \********************************/
/*! exports provided: appRoutingProviders, routing */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "appRoutingProviders", function() { return appRoutingProviders; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "routing", function() { return routing; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _components_home_home_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/home/home.component */ "./src/app/components/home/home.component.ts");
/* harmony import */ var _components_home_admin_home_admin_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/home-admin/home-admin.component */ "./src/app/components/home-admin/home-admin.component.ts");
/* harmony import */ var _components_login_login_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/login/login.component */ "./src/app/components/login/login.component.ts");
/* harmony import */ var _components_register_register_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/register/register.component */ "./src/app/components/register/register.component.ts");
/* harmony import */ var _components_contacts_contacts_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/contacts/contacts.component */ "./src/app/components/contacts/contacts.component.ts");
/* harmony import */ var _components_edit_user_edit_user_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/edit-user/edit-user.component */ "./src/app/components/edit-user/edit-user.component.ts");
/* harmony import */ var _components_user_week_user_week_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/user-week/user-week.component */ "./src/app/components/user-week/user-week.component.ts");

// import components







var appRoutes = [
    { path: 'home', component: _components_home_home_component__WEBPACK_IMPORTED_MODULE_1__["HomeComponent"] },
    { path: 'home-admin', component: _components_home_admin_home_admin_component__WEBPACK_IMPORTED_MODULE_2__["HomeAdminComponent"] },
    { path: 'login', component: _components_login_login_component__WEBPACK_IMPORTED_MODULE_3__["LoginComponent"] },
    { path: 'register', component: _components_register_register_component__WEBPACK_IMPORTED_MODULE_4__["RegisterComponent"] },
    { path: 'edit-user', component: _components_edit_user_edit_user_component__WEBPACK_IMPORTED_MODULE_6__["EditUserComponent"] },
    { path: 'contacts', component: _components_contacts_contacts_component__WEBPACK_IMPORTED_MODULE_5__["ContactsComponent"] },
    { path: 'user-week', component: _components_user_week_user_week_component__WEBPACK_IMPORTED_MODULE_7__["UserWeekComponent"] },
    { path: '**', pathMatch: 'full', redirectTo: 'login' }
];
var appRoutingProviders = [];
var routing = _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forRoot(appRoutes);


/***/ }),

/***/ "./src/app/components/contacts/contacts.component.css":
/*!************************************************************!*\
  !*** ./src/app/components/contacts/contacts.component.css ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/components/contacts/contacts.component.html":
/*!*************************************************************!*\
  !*** ./src/app/components/contacts/contacts.component.html ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h1>{{ title }}</h1>\n<hr>\n<div *ngIf=\"this.identity.role == 'USER_ROLE'\">\n    <table class=\"table\" >\n        <thead>\n          <tr>\n            <th scope=\"col\"></th>\n            <th scope=\"col\">First Name</th>\n            <th scope=\"col\">Last Name</th>\n            <th scope=\"col\">Email</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr *ngFor=\"let user of users; let i = index\">\n            <!--<th scope=\"row\">{{ i+1 }}</th>-->\n            <td><input type=\"checkbox\" id=\"{{user.email}}\"></td>\n            <td>{{ user.name }}</td>\n            <td>{{ user.last_name }}</td>\n            <td>{{ user.email }}</td>\n          </tr>\n          \n        </tbody>\n      </table>\n\n      <button type=\"submit\" class=\"btn btn-primary\" (click)=\"addArr()\">Send Email</button>\n</div>\n\n<div *ngIf=\"this.identity.role == 'ADMIN_ROLE'\">\n    <table class=\"table\" >\n        <thead>\n          <tr>\n            <th scope=\"col\"></th>\n            <th scope=\"col\">First Name</th>\n            <th scope=\"col\">Last Name</th>\n            <th scope=\"col\">Email</th>\n            <th scope=\"col\">Role</th>\n            <th scope=\"col\">Level</th>\n            <th></th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr *ngFor=\"let user of users; let i = index\">\n            <th scope=\"row\">{{ i+1 }}</th>\n            <td>{{ user.name }}</td>\n            <td>{{ user.last_name }}</td>\n            <td>{{ user.email }}</td>\n            <td>{{ user.role }}</td>\n            <td>{{ user.level }}</td>\n            <td *ngIf=\"identity._id != user._id\">\n              <input type=\"button\" (click)=\"editUser( user._id )\"\n                class=\"btn btn-primary\" value=\"Edit\"/>\n              <input type=\"button\" (click)=\"deleteUser( user._id )\"\n                class=\"btn btn-danger\" value=\"Delete\"/>\n            </td>\n          </tr>\n          \n        </tbody>\n      </table>\n</div>\n\n<div *ngIf=\"status == 'edit'\">\n  <form #userEdit=\"ngForm\" (ngSubmit)=\"onSubmit()\">\n    <p>\n      <label>Name:</label>\n      <label>{{ temp_user.name }}</label>\n    </p>\n    <p>\n      <label>Last Name:</label>\n      <label>{{ temp_user.last_name }}</label>\n    </p>\n    <p>\n      <label>Email:</label>\n      <label>{{ temp_user.email }}</label>\n    </p>\n    <p>\n      <label>Role:</label>\n      <input \n        type=\"text\"\n        name=\"role\"\n        #role=\"ngModel\"\n        [(ngModel)]=\"temp_user.role\"\n        class=\"form-control\"\n        placeholder=\"temp_user.role\"/>\n    </p>\n    <p>\n        <label>Level:</label>\n        <input \n          type=\"text\"\n          name=\"level\"\n          #level=\"ngModel\"\n          [(ngModel)]=\"temp_user.level\"\n          class=\"form-control\"\n          placeholder=\"temp_user.level\"/>\n      </p>\n      <input \n        type=\"submit\"\n        value=\"Send\"\n        class=\"btn btn-warning\"\n        [disabled]=\"!userEdit.form.valid\"/>\n  </form>\n</div>\n\n\n"

/***/ }),

/***/ "./src/app/components/contacts/contacts.component.ts":
/*!***********************************************************!*\
  !*** ./src/app/components/contacts/contacts.component.ts ***!
  \***********************************************************/
/*! exports provided: ContactsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContactsComponent", function() { return ContactsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _models_user__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../models/user */ "./src/app/models/user.ts");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/user.service */ "./src/app/services/user.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ContactsComponent = /** @class */ (function () {
    function ContactsComponent(_route, _router, _userService) {
        this._route = _route;
        this._router = _router;
        this._userService = _userService;
        this.users = [];
        this.title = 'List Contacts';
        this.user = this._userService.getIdentity();
        this.identity = this.user;
        this.temp_user = new _models_user__WEBPACK_IMPORTED_MODULE_2__["User"]('', '', '', '', '', '', '');
    }
    ContactsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._userService.getUsers().subscribe(function (response) {
            console.log(response);
            for (var i = 0; i < response.users.length; i++) {
                _this.users[i] = response.users[i];
            }
            console.log(_this.users);
        }, function (error) {
            var errorMensage = error;
            console.log(errorMensage);
            if (errorMensage != null) {
                _this.status = 'error';
            }
        });
    };
    ContactsComponent.prototype.editUser = function (userId) {
        console.log(userId);
        this.status = 'edit';
        for (var i = 0; i < this.users.length; i++) {
            if (this.users[i]._id === userId) {
                this.temp_user._id = this.users[i]._id;
                this.temp_user.name = this.users[i].name;
                this.temp_user.last_name = this.users[i].last_name;
                this.temp_user.email = this.users[i].email;
                this.temp_user.role = this.users[i].role;
                this.temp_user.level = this.users[i].level;
            }
        }
    };
    ContactsComponent.prototype.deleteUser = function (userId) {
        var _this = this;
        for (var i = 0; i < this.users.length; i++) {
            if (this.users[i]._id === userId) {
                this.temp_user._id = this.users[i]._id;
                this.temp_user.name = this.users[i].name;
                this.temp_user.last_name = this.users[i].last_name;
                this.temp_user.email = this.users[i].email;
                this.temp_user.role = this.users[i].role;
                this.temp_user.level = this.users[i].level;
            }
        }
        console.log(this.temp_user);
        this._userService.deleteUser(this.temp_user).subscribe(function (response) {
            console.log(response);
            if (response.ok) {
                window.location.reload();
            }
        }, function (error) {
            var errorMensage = error;
            console.log(errorMensage);
            if (errorMensage != null) {
                _this.status = 'error';
            }
        });
    };
    ContactsComponent.prototype.onSubmit = function () {
        var _this = this;
        console.log(this.temp_user);
        this._userService.updateUser(this.temp_user).subscribe(function (response) {
            console.log(response);
            if (!response.ok) {
                _this.status = 'error';
            }
            else {
                _this.status = 'success';
                window.location.reload();
            }
        }, function (error) {
            var errorMensage = error;
            console.log(errorMensage);
            if (errorMensage != null) {
                _this.status = 'error';
            }
        });
    };
    ContactsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-contacts',
            template: __webpack_require__(/*! ./contacts.component.html */ "./src/app/components/contacts/contacts.component.html"),
            styles: [__webpack_require__(/*! ./contacts.component.css */ "./src/app/components/contacts/contacts.component.css")],
            providers: [_services_user_service__WEBPACK_IMPORTED_MODULE_3__["UserService"]]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _services_user_service__WEBPACK_IMPORTED_MODULE_3__["UserService"]])
    ], ContactsComponent);
    return ContactsComponent;
}());



/***/ }),

/***/ "./src/app/components/edit-user/edit-user.component.css":
/*!**************************************************************!*\
  !*** ./src/app/components/edit-user/edit-user.component.css ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/components/edit-user/edit-user.component.html":
/*!***************************************************************!*\
  !*** ./src/app/components/edit-user/edit-user.component.html ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h1>{{ title }}</h1>\n<hr>\n<form #updateForm=\"ngForm\" (ngSubmit)=\"onSubmit( updateForm )\">\n\n    <!--<div class=\"alert alert-success\" *ngIf=\"status == 'success' \">\n        Register success!! \n        <a [routerLink]=\"['/login']\">Sign In Here</a>\n      </div>\n    \n      <div class=\"alert alert-danger\" *ngIf=\"status == 'error' \">\n       Please try again in another data\n      </div>-->\n    <div class=\"form-row\">\n\n        <div class=\"form-group col-md-6\">\n          <label for=\"inputName4\">First Name</label>\n          <input type=\"text\"\n                name=\"name\"\n                #name=\"ngModel\"\n                [(ngModel)]=\"user.name\"\n                class=\"form-control\"\n                placeholder=\"{{ user.name }}\">\n        </div>\n  \n        <div class=\"form-group col-md-6\">\n          <label for=\"inputLastName4\">Last Name</label>\n          <input type=\"text\"\n                  name=\"last_name\"\n                  #last_name=\"ngModel\"\n                  [(ngModel)]=\"user.last_name\"\n                 class=\"form-control\"\n                 placeholder=\"{{ user.last_name }}\">\n        </div>\n  \n      </div>\n\n      <div class=\"form-group\">\n          <label for=\"inputEmail\">Email</label>\n          <input type=\"email\"\n              name=\"email\"\n              #email=\"ngModel\"\n              [(ngModel)]=\"user.email\"\n              class=\"form-control\"\n              pattern=\"[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$\"\n              placeholder=\"{{ user.email }}\">\n      </div>\n\n      <div class=\"form-group\">\n          <label for=\"inputPassword\">Password</label>\n          <input type=\"password\"\n              name=\"password\"\n              #password=\"ngModel\"\n              [(ngModel)]=\"user.password\"\n              class=\"form-control\"\n              placeholder=\"{{ user.password }}\">\n      </div>\n    \n    <button\n       type=\"submit\"\n       class=\"btn btn-primary\"\n      [disabled]=\"!updateForm.form.valid\">Update Data</button>\n  </form>\n\n"

/***/ }),

/***/ "./src/app/components/edit-user/edit-user.component.ts":
/*!*************************************************************!*\
  !*** ./src/app/components/edit-user/edit-user.component.ts ***!
  \*************************************************************/
/*! exports provided: EditUserComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditUserComponent", function() { return EditUserComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _models_user__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../models/user */ "./src/app/models/user.ts");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/user.service */ "./src/app/services/user.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var EditUserComponent = /** @class */ (function () {
    function EditUserComponent(_route, _router, _userService) {
        this._route = _route;
        this._router = _router;
        this._userService = _userService;
        this.title = 'Update Data';
        this.user = this._userService.getIdentity();
        this.identity = this.user;
        this.temp = new _models_user__WEBPACK_IMPORTED_MODULE_2__["User"]('', '', '', '', '', '', '');
    }
    EditUserComponent.prototype.ngOnInit = function () {
    };
    EditUserComponent.prototype.onSubmit = function (form) {
        var _this = this;
        console.log(this.user);
        this.temp = this.user;
        this._userService.updateUser(this.user).subscribe(function (response) {
            console.log(response);
            if (response.ok) {
                _this.identity = response.user;
                localStorage.setItem('identity', JSON.stringify(_this.identity));
                if (_this.identity.role === 'USER_ROLE') {
                    _this._router.navigate(['/home']);
                }
                else {
                    _this._router.navigate(['/home-admin']);
                }
            }
        }, function (error) {
            var errorMensage = error;
            console.log(errorMensage);
            if (errorMensage != null) {
                _this.status = 'error';
            }
        });
    };
    EditUserComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-edit-user',
            template: __webpack_require__(/*! ./edit-user.component.html */ "./src/app/components/edit-user/edit-user.component.html"),
            styles: [__webpack_require__(/*! ./edit-user.component.css */ "./src/app/components/edit-user/edit-user.component.css")],
            providers: [_services_user_service__WEBPACK_IMPORTED_MODULE_3__["UserService"]]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _services_user_service__WEBPACK_IMPORTED_MODULE_3__["UserService"]])
    ], EditUserComponent);
    return EditUserComponent;
}());



/***/ }),

/***/ "./src/app/components/home-admin/home-admin.component.css":
/*!****************************************************************!*\
  !*** ./src/app/components/home-admin/home-admin.component.css ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/components/home-admin/home-admin.component.html":
/*!*****************************************************************!*\
  !*** ./src/app/components/home-admin/home-admin.component.html ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n  <header>\n    <div class=\"content\">\n      <h3 class=\"title\">Welcome {{ user.role }} {{ user.name }} {{ user.last_name }}</h3>\n      <hr>\n    </div>\n  </header>\n  <div class=\"container\">\n      <main>\n          <div>\n              <h4>Menu</h4>\n              <ul>\n                <li><a href=\"#\">My Profile</a></li>\n                <li><a [routerLink]=\"['/edit-user']\">Edit Profile</a></li>\n                <li><a [routerLink]=\"['/contacts']\">Contacts</a></li>\n                <!--<li><a [routerLink]=\"['/builder-week']\">Builder Week</a></li>-->\n              </ul>\n            </div>\n      </main>\n      <aside>\n        <div>\n          <div class=\"form-group\">\n            <h4><label for=\"comment\">Message:</label></h4>\n            <form #messageForm=\"ngForm\" (ngSubmit)=\"onSubmit( messageForm )\">\n              <textarea\n                  name=\"text\"\n                  #text=\"ngModel\"\n                  [(ngModel)]=\"text.text\" \n                  class=\"form-control\"\n                  rows=\"5\"\n                  id=\"comment\"\n                  placeholder=\"{{ message.text }}\">\n                  \n                </textarea>\n                \n              <br>\n              <input \n                type=\"submit\"\n                value=\"Send\"\n                class=\"btn btn-success\"\n                [disabled]=\"!messageForm.form.valid\" />\n              <input\n               type=\"submit\"\n               value=\"Delete\"\n               class=\"btn btn-danger\"\n                (click)=\"deleteMessage()\"/>\n            </form>\n            \n          </div>\n        </div>\n      </aside>\n  </div>\n</div>\n\n\n\n"

/***/ }),

/***/ "./src/app/components/home-admin/home-admin.component.ts":
/*!***************************************************************!*\
  !*** ./src/app/components/home-admin/home-admin.component.ts ***!
  \***************************************************************/
/*! exports provided: HomeAdminComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeAdminComponent", function() { return HomeAdminComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _models_message__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../models/message */ "./src/app/models/message.ts");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/user.service */ "./src/app/services/user.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var HomeAdminComponent = /** @class */ (function () {
    function HomeAdminComponent(_route, _router, _userService) {
        this._route = _route;
        this._router = _router;
        this._userService = _userService;
        this.user = this._userService.getIdentity();
        this.identity = this.user;
        this.text = new _models_message__WEBPACK_IMPORTED_MODULE_2__["Message"]('', '', '');
        this.message = new _models_message__WEBPACK_IMPORTED_MODULE_2__["Message"]('', '', '');
    }
    HomeAdminComponent.prototype.ngOnInit = function () {
        this.refreshTextArea();
    };
    HomeAdminComponent.prototype.onSubmit = function (form) {
        var _this = this;
        console.log(form.value);
        this.text.text = form.value.text;
        console.log(this.text);
        this._userService.sendMessage(this.text).subscribe(function (response) {
            console.log(response);
            if (response.ok) {
                _this.status = 'success';
                form.reset();
                _this.refreshTextArea();
            }
        }, function (error) {
            console.log(error);
        });
    };
    HomeAdminComponent.prototype.refreshTextArea = function () {
        var _this = this;
        this._userService.getMessage().subscribe(function (response) {
            console.log(response);
            if (response.ok) {
                _this.message._id = response.message._id;
                _this.message.text = response.message.text;
                _this.message.date = response.message.created_at;
            }
        }, function (error) {
            var errorMessage = error;
            console.log(errorMessage);
            if (errorMessage !== null) {
                _this.status = 'error';
            }
        });
    };
    HomeAdminComponent.prototype.deleteMessage = function () {
        var _this = this;
        console.log(this.message._id);
        this._userService.deleteMessage(this.message._id).subscribe(function (response) {
            console.log(response);
            _this.refreshTextArea();
        }, function (error) {
            var errorMessage = error;
            console.log(errorMessage);
            if (errorMessage !== null) {
                _this.status = 'error';
            }
        });
    };
    HomeAdminComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-home-admin',
            template: __webpack_require__(/*! ./home-admin.component.html */ "./src/app/components/home-admin/home-admin.component.html"),
            styles: [__webpack_require__(/*! ./home-admin.component.css */ "./src/app/components/home-admin/home-admin.component.css")],
            providers: [_services_user_service__WEBPACK_IMPORTED_MODULE_3__["UserService"]]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _services_user_service__WEBPACK_IMPORTED_MODULE_3__["UserService"]])
    ], HomeAdminComponent);
    return HomeAdminComponent;
}());



/***/ }),

/***/ "./src/app/components/home/home.component.css":
/*!****************************************************!*\
  !*** ./src/app/components/home/home.component.css ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/components/home/home.component.html":
/*!*****************************************************!*\
  !*** ./src/app/components/home/home.component.html ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<br>\n<div class=\"container\">\n  <header>\n    <div class=\"content\">\n      <h3 class=\"title\">Welcome {{ user.name }} {{ user.last_name }}</h3>\n      <hr>\n    </div>\n  </header>\n  <div class=\"container\">\n      <main>\n          <div>\n              <h4>Menu</h4>\n              <ul>\n                <li><a href=\"#\">My Profile</a></li>\n                <li><a [routerLink]=\"['/edit-user']\">Edit Profile</a></li>\n                <li><a [routerLink]=\"['/contacts']\">Contacts</a></li>\n                <li><a [routerLink]=\"['/user-week']\">Week</a></li>\n              </ul>\n            </div>\n      </main>\n      <aside>\n        <div>\n          <h4>Message:</h4>\n            <ul>\n              <li>{{ message.text }}</li>\n            </ul>\n        </div>\n      </aside>\n  </div>\n</div>\n\n\n\n\n"

/***/ }),

/***/ "./src/app/components/home/home.component.ts":
/*!***************************************************!*\
  !*** ./src/app/components/home/home.component.ts ***!
  \***************************************************/
/*! exports provided: HomeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeComponent", function() { return HomeComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _models_message__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../models/message */ "./src/app/models/message.ts");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/user.service */ "./src/app/services/user.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var HomeComponent = /** @class */ (function () {
    function HomeComponent(_route, _router, _userService) {
        this._route = _route;
        this._router = _router;
        this._userService = _userService;
        this.messages = [];
        this.user = this._userService.getIdentity();
        this.idenity = this.user;
        this.message = new _models_message__WEBPACK_IMPORTED_MODULE_2__["Message"]('', '', '');
    }
    HomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log(this.user);
        this._userService.getMessage().subscribe(function (response) {
            if (response.ok) {
                console.log(response.message);
                _this.message._id = response.message._id;
                _this.message.text = response.message.text;
                _this.message.date = response.message.created_at;
            }
        }, function (error) {
            var errorMessage = error;
            console.log(errorMessage);
            if (errorMessage !== null) {
                _this.status = 'error';
            }
        });
    };
    HomeComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-home',
            template: __webpack_require__(/*! ./home.component.html */ "./src/app/components/home/home.component.html"),
            styles: [__webpack_require__(/*! ./home.component.css */ "./src/app/components/home/home.component.css")],
            providers: [_services_user_service__WEBPACK_IMPORTED_MODULE_3__["UserService"]]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _services_user_service__WEBPACK_IMPORTED_MODULE_3__["UserService"]])
    ], HomeComponent);
    return HomeComponent;
}());



/***/ }),

/***/ "./src/app/components/login/login.component.css":
/*!******************************************************!*\
  !*** ./src/app/components/login/login.component.css ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/components/login/login.component.html":
/*!*******************************************************!*\
  !*** ./src/app/components/login/login.component.html ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"col-log-5\">\n  <h1>{{ title }}</h1>\n  <hr>\n\n  <div class=\"alert alert-danger\" *ngIf=\"status == 'error' \">\n\t\tPlease check email/password\n  </div>\n  <div class=\"alert alert-danger\" *ngIf=\"status == 'remenber' \">\n\t\tI remember you, if you want connect to admin\n\t</div>\n\n  <form #loginForm=\"ngForm\" (ngSubmit)=\"onSubmit()\">\n      <div class=\"form-group row\">\n        <label for=\"inputEmail3\"\n         class=\"col-sm-2 col-form-label\">Email</label>\n        <div class=\"col-sm-10\">\n          <input type=\"email\"\n                name=\"email\"\n                #email=\"ngModel\"\n                [(ngModel)]=\"user.email\"\n                class=\"form-control\"\n                required\n                pattern=\"[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$\"\n                placeholder=\"Email\">\n        </div>\n      </div>\n      <div class=\"form-group row\">\n        <label for=\"inputPassword3\"\n               class=\"col-sm-2 col-form-label\">Password</label>\n        <div class=\"col-sm-10\">\n          <input type=\"password\"\n                 class=\"form-control\"\n                  name=\"password\"\n                  #password=\"ngModel\"\n                  [(ngModel)]=\"user.password\"\n                  required\n                  placeholder=\"Password\">\n        </div>\n      </div>\n\n      <div class=\"form-group row\">\n        <div class=\"col-sm-10\">\n          <button \n            type=\"submit\"\n            class=\"btn btn-primary\"\n            [disabled]=\"!loginForm.form.valid\">Sign in</button>\n            <a class=\"nav-item nav-link disabled\" (click)=\"newUser()\">New User? Click me</a>\n        </div>\n      </div>\n    </form>\n\n</div>\n\n"

/***/ }),

/***/ "./src/app/components/login/login.component.ts":
/*!*****************************************************!*\
  !*** ./src/app/components/login/login.component.ts ***!
  \*****************************************************/
/*! exports provided: LoginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginComponent", function() { return LoginComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _models_user__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../models/user */ "./src/app/models/user.ts");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/user.service */ "./src/app/services/user.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var LoginComponent = /** @class */ (function () {
    function LoginComponent(_route, _router, _userService) {
        this._route = _route;
        this._router = _router;
        this._userService = _userService;
        this.title = 'Sign In please';
        this.user = new _models_user__WEBPACK_IMPORTED_MODULE_2__["User"]('', '', '', '', '', 'USER', 'USER');
    }
    LoginComponent.prototype.ngOnInit = function () {
    };
    LoginComponent.prototype.onSubmit = function () {
        var _this = this;
        console.log(this.user);
        this._userService.signup(this.user).subscribe(function (response) {
            _this.identity = response.user;
            console.log(_this.identity);
            if (!_this.identity || !_this.identity._id) {
                _this.status = 'error';
            }
            else if (!_this.identity.status) {
                _this.status = 'remenber';
            }
            else {
                localStorage.setItem('identity', JSON.stringify(_this.identity));
                _this.getToken();
                if (_this.identity.role === 'USER_ROLE') {
                    _this._router.navigate(['/home']);
                }
                else {
                    _this._router.navigate(['/home-admin']);
                }
            }
        }, function (error) {
            var errorMessage = error;
            console.log(errorMessage);
            if (errorMessage !== null) {
                _this.status = 'error';
            }
        });
    };
    LoginComponent.prototype.getToken = function () {
        var _this = this;
        this._userService.signup(this.user, 'true').subscribe(function (response) {
            _this.token = response.token;
            console.log(_this.token);
            if (_this.token.length <= 0) {
                _this.status = 'error';
            }
            else {
                localStorage.setItem('token', _this.token);
                _this.status = 'success';
            }
        }, function (error) {
            var errorMessage = error;
            console.log(errorMessage);
            if (errorMessage !== null) {
                _this.status = 'error';
            }
        });
    };
    LoginComponent.prototype.newUser = function () {
        this._router.navigate(['/register']);
    };
    LoginComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-login',
            template: __webpack_require__(/*! ./login.component.html */ "./src/app/components/login/login.component.html"),
            styles: [__webpack_require__(/*! ./login.component.css */ "./src/app/components/login/login.component.css")],
            providers: [_services_user_service__WEBPACK_IMPORTED_MODULE_3__["UserService"]]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _services_user_service__WEBPACK_IMPORTED_MODULE_3__["UserService"]])
    ], LoginComponent);
    return LoginComponent;
}());



/***/ }),

/***/ "./src/app/components/register/register.component.css":
/*!************************************************************!*\
  !*** ./src/app/components/register/register.component.css ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/components/register/register.component.html":
/*!*************************************************************!*\
  !*** ./src/app/components/register/register.component.html ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h1>{{ title }}</h1>\n<hr>\n<form #registerForm=\"ngForm\" (ngSubmit)=\"onSubmit(registerForm)\">\n\n    <div class=\"alert alert-success\" *ngIf=\"status == 'success' \">\n        Register success!! \n        <a [routerLink]=\"['/login']\">Sign In Here</a>\n      </div>\n    \n      <div class=\"alert alert-danger\" *ngIf=\"status == 'error' \">\n       Please try again in another data\n      </div>\n    <div class=\"form-row\">\n\n        <div class=\"form-group col-md-6\">\n          <label for=\"inputName4\">First Name</label>\n          <input type=\"text\"\n                name=\"name\"\n                #name=\"ngModel\"\n                [(ngModel)]=\"user.name\"\n                class=\"form-control\"\n                required\n                placeholder=\"First Name\">\n          <div *ngIf=\"name.errors?.required\"\n                class=\"form-control-feedback\">\n                Name is required!\n          </div>\n        </div>\n  \n        <div class=\"form-group col-md-6\">\n          <label for=\"inputLastName4\">Last Name</label>\n          <input type=\"text\"\n                  name=\"last_name\"\n                  #last_name=\"ngModel\"\n                  [(ngModel)]=\"user.last_name\"\n                 class=\"form-control\"\n                 required\n                 placeholder=\"Last Name\">\n        </div>\n  \n      </div>\n\n      <div class=\"form-group\">\n          <label for=\"inputEmail\">Email</label>\n          <input type=\"email\"\n              name=\"email\"\n              #email=\"ngModel\"\n              [(ngModel)]=\"user.email\"\n              class=\"form-control\"\n              required\n              pattern=\"[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$\"\n              placeholder=\"Email\">\n      </div>\n\n      <div class=\"form-group\">\n          <label for=\"inputPassword\">Password</label>\n          <input type=\"password\"\n              name=\"password\"\n              #password=\"ngModel\"\n              [(ngModel)]=\"user.password\"\n              class=\"form-control\"\n              required\n              placeholder=\"Password\">\n      </div>\n    \n    <button\n       type=\"submit\"\n       class=\"btn btn-primary\"\n      [disabled]=\"!registerForm.form.valid\">Sign in</button>\n  </form>"

/***/ }),

/***/ "./src/app/components/register/register.component.ts":
/*!***********************************************************!*\
  !*** ./src/app/components/register/register.component.ts ***!
  \***********************************************************/
/*! exports provided: RegisterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegisterComponent", function() { return RegisterComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _models_user__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../models/user */ "./src/app/models/user.ts");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/user.service */ "./src/app/services/user.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var RegisterComponent = /** @class */ (function () {
    function RegisterComponent(_route, _router, _userService) {
        this._route = _route;
        this._router = _router;
        this._userService = _userService;
        this.title = 'Please fill in all the fields';
        this.user = new _models_user__WEBPACK_IMPORTED_MODULE_2__["User"]('', '', '', '', '', '', '');
    }
    RegisterComponent.prototype.ngOnInit = function () {
    };
    RegisterComponent.prototype.onSubmit = function (form) {
        var _this = this;
        this._userService.register(this.user).subscribe(function (response) {
            if (response.user && response.user._id) {
                _this.status = 'success';
                form.reset();
            }
            else {
                _this.status = 'error';
            }
        }, function (error) {
            console.log(error);
        });
    };
    RegisterComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-register',
            template: __webpack_require__(/*! ./register.component.html */ "./src/app/components/register/register.component.html"),
            styles: [__webpack_require__(/*! ./register.component.css */ "./src/app/components/register/register.component.css")],
            providers: [_services_user_service__WEBPACK_IMPORTED_MODULE_3__["UserService"]]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _services_user_service__WEBPACK_IMPORTED_MODULE_3__["UserService"]])
    ], RegisterComponent);
    return RegisterComponent;
}());



/***/ }),

/***/ "./src/app/components/user-week/user-week.component.css":
/*!**************************************************************!*\
  !*** ./src/app/components/user-week/user-week.component.css ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/components/user-week/user-week.component.html":
/*!***************************************************************!*\
  !*** ./src/app/components/user-week/user-week.component.html ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\n  user-week works!\n</p>\n"

/***/ }),

/***/ "./src/app/components/user-week/user-week.component.ts":
/*!*************************************************************!*\
  !*** ./src/app/components/user-week/user-week.component.ts ***!
  \*************************************************************/
/*! exports provided: UserWeekComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserWeekComponent", function() { return UserWeekComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var UserWeekComponent = /** @class */ (function () {
    function UserWeekComponent() {
    }
    UserWeekComponent.prototype.ngOnInit = function () {
    };
    UserWeekComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-user-week',
            template: __webpack_require__(/*! ./user-week.component.html */ "./src/app/components/user-week/user-week.component.html"),
            styles: [__webpack_require__(/*! ./user-week.component.css */ "./src/app/components/user-week/user-week.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], UserWeekComponent);
    return UserWeekComponent;
}());



/***/ }),

/***/ "./src/app/models/message.ts":
/*!***********************************!*\
  !*** ./src/app/models/message.ts ***!
  \***********************************/
/*! exports provided: Message */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Message", function() { return Message; });
var Message = /** @class */ (function () {
    function Message(_id, text, date) {
        this._id = _id;
        this.text = text;
        this.date = date;
    }
    return Message;
}());



/***/ }),

/***/ "./src/app/models/user.ts":
/*!********************************!*\
  !*** ./src/app/models/user.ts ***!
  \********************************/
/*! exports provided: User */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "User", function() { return User; });
var User = /** @class */ (function () {
    function User(_id, name, last_name, email, password, role, level) {
        this._id = _id;
        this.name = name;
        this.last_name = last_name;
        this.email = email;
        this.password = password;
        this.role = role;
        this.level = level;
    }
    return User;
}());



/***/ }),

/***/ "./src/app/services/global.ts":
/*!************************************!*\
  !*** ./src/app/services/global.ts ***!
  \************************************/
/*! exports provided: GLOBAL */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GLOBAL", function() { return GLOBAL; });
var GLOBAL = {
    url: '/api/'
};


/***/ }),

/***/ "./src/app/services/user.service.ts":
/*!******************************************!*\
  !*** ./src/app/services/user.service.ts ***!
  \******************************************/
/*! exports provided: UserService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserService", function() { return UserService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _global__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./global */ "./src/app/services/global.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var UserService = /** @class */ (function () {
    function UserService(_http) {
        this._http = _http;
        this.url = _global__WEBPACK_IMPORTED_MODULE_2__["GLOBAL"].url;
    }
    UserService.prototype.register = function (user) {
        var params = JSON.stringify(user);
        var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]().set('Content-Type', 'application/json');
        return this._http.post(this.url + 'register', params, { headers: headers });
    };
    UserService.prototype.signup = function (user, gettoken) {
        if (gettoken === void 0) { gettoken = 'false'; }
        if (gettoken !== 'false') {
            user.gettoken = gettoken;
        }
        var params = JSON.stringify(user);
        var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]().set('Content-Type', 'application/json');
        return this._http.post(this.url + 'login', params, { headers: headers });
    };
    UserService.prototype.getIdentity = function () {
        var identity = JSON.parse(localStorage.getItem('identity'));
        if (identity !== 'undefined') {
            this.identity = identity;
        }
        else {
            this.identity = null;
        }
        return this.identity;
    };
    UserService.prototype.getToken = function () {
        var token = localStorage.getItem('token');
        if (token !== 'undefined') {
            this.token = token;
        }
        else {
            this.token = null;
        }
        return this.token;
    };
    UserService.prototype.getMessage = function () {
        var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]().set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Authorization', this.getToken());
        return this._http.get(this.url + 'get-message', { headers: headers });
    };
    UserService.prototype.sendMessage = function (message) {
        console.log(message);
        var params = JSON.stringify(message);
        var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]().set('Content-Type', 'application/json').set('Authorization', this.getToken());
        return this._http.post(this.url + 'message', message, { headers: headers });
    };
    UserService.prototype.deleteMessage = function (messageId) {
        var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]().set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', this.getToken());
        return this._http.delete(this.url + 'delete-message/' + messageId, { headers: headers });
    };
    UserService.prototype.getUsers = function () {
        var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]().set('Content-Type', 'application/json').set('Authorization', this.getToken());
        return this._http.get(this.url + 'users', { headers: headers });
    };
    UserService.prototype.deleteUser = function (user) {
        var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]().set('Content-Type', 'application/json').set('Authorization', this.getToken());
        return this._http.delete(this.url + 'delete-user/' + user._id, { headers: headers });
    };
    UserService.prototype.updateUser = function (user) {
        var params = JSON.stringify(user);
        var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]().set('Content-Type', 'application/json').set('Authorization', this.getToken());
        return this._http.put(this.url + 'update-user/' + user._id, params, { headers: headers });
    };
    UserService.prototype.adminUpdateUser = function (user) {
        var params = JSON.stringify(user);
        var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]().set('Content-Type', 'application/json').set('Authorization', this.getToken());
        return this._http.put(this.url + 'admin-update-user/' + user._id, params, { headers: headers });
    };
    UserService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], UserService);
    return UserService;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.error(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Volumes/David/new-employee/new_employee-project/angular-src/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map
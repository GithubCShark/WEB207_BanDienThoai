var app = angular.module("myapp", ["ngRoute"]);
app.config(function($routeProvider){
    $routeProvider
    .when("/gioithieu", {templateUrl:"gioithieu.html"})
    .when("/lienhe", {templateUrl:"lienhe.html"})
    .when("/gopy", {templateUrl:"gopy.html"})
    .when("/doithongtin/:name", {templateUrl:"doithongtin.html", controller:"dttCtrl"})
    .when("/doimatkhau", {templateUrl:"doimatkhau.html", controller:"dmkCtrl"})
    .when("/tracnghiem/:idSubj/:tenSubj", {templateUrl:"tracnghiem.html", controller:"tnCtrl"})
    .otherwise({templateUrl:"danhmuc.html", controller:"dmCtrl"})
});
app.controller("asm", function($scope, $http){
    $scope.subjects = [];
    $scope.name = "Tài khoản";
    $http.get("db/Subjects.js").then( function(d){ $scope.subjects=d.data;} );
});
app.controller("dmCtrl", function($scope, $http){
    $scope.start = 0;
    $scope.First = function (){$scope.start=0;}
    $scope.Previous = function (){
        if ($scope.start >= 4) { 
            $scope.start -= 4;
        }
    }
    $scope.Next = function (){
        if ($scope.start < $scope.subjects.length-4) {
            $scope.start += 4;
        }
    }
    $scope.Last = function (){
        $scope.start = $scope.subjects.length-4;
    }
});
app.controller("tnCtrl", function($scope, $http, $routeParams, $interval){
    $scope.question = [];
    $scope.start = 0;
    $scope.minutes = 0;
    $scope.seconds = 0;
    var time = $scope.minutes * 60;
    $scope.marks = 0;
    $scope.idSubj = $routeParams.idSubj;
    $scope.tenSubj = $routeParams.tenSubj;
    $http.get("db/Quizs/" + $scope.idSubj + ".js").then(
        function(d) {
            $scope.question=d.data;
            $scope.all = $scope.question.length;
        },
        function(d) {alert("Lỗi");}
    );
    $scope.countDown = $interval(clock, 1000);
    function clock(){
        $scope.minutes = Math.floor(time /60);
        var sec = time % 60;
        $scope.seconds = sec;
        time ++;
    }
    $scope.Submit =function (){
        Swal.fire({
            postion: 'mid',
            title: 'Đã hoàn thành',
            icon: 'success',
            text: 'Bạn đạt được ' + $scope.marks + '/' + $scope.all + ' điểm',
            showConfirmButton: true
        })
        if (angular.isDefined($scope.countDown)) {
            $interval.cancel($scope.countDown);
        }
    }
    var checkTraLoi = $scope.traloi = {checked:""};
    $scope.Check = function (){
        var a = $("#cauTraLoi").val();
        var b = $("#dapAn").val();
        if (parseInt(a) == parseInt(b)) {
            Swal.fire({
                postion: 'mid',
                icon: 'success',
                title: 'Chính xác',
                showConfirmButton: false,
                timer: 1600
            })
            $scope.marks += 1;
        } else {
            Swal.fire({
                postion: 'mid',
                icon: 'error',
                title: 'Bạn chọn sai rồi',
                showConfirmButton: false,
                timer: 1600
            })
        }
        $scope.start += 1;
    }
});
app.controller("dnCtrl", function($scope, $http){
    $scope.students = [];
    $http.get("db/Students.js").then(
        function(d) {$scope.students=d.data;},
        function(d) {alert("Lỗi");}
    );
    $scope.dn = function (){
        $scope.tc = false;
        for (var i = 0; i < $scope.students.length; i++) {
            if ($scope.user == $scope.students[i].username 
                && $scope.pass == $scope.students[i].password) {
                $scope.tc = true;
                break;
            }
        }
        if ($scope.tc) {
            sessionStorage.setItem("username", $scope.students[i].username);
            sessionStorage.setItem("fullname", $scope.students[i].fullname);
            sessionStorage.setItem("email", $scope.students[i].email);
            sessionStorage.setItem("gender", $scope.students[i].gender);
            sessionStorage.setItem("birthday", $scope.students[i].birthday);
            sessionStorage.setItem("schoolfee", $scope.students[i].schoolfee);
            sessionStorage.setItem("marks", $scope.students[i].marks);
            $('#loginModal').modal('hide');
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();
            window.location.reload();
        } else {
            Swal.fire({
                postion: 'mid',
                icon: 'error',
                title: 'Tài khoản hoặc mật khẩu không đúng',
                showConfirmButton: true,
            })
        }
    }
    $scope.reloadPage = function (){
        window.location.reload();
    }
});
app.controller("trangThaiCtrl", function($scope){
    var fn = sessionStorage.getItem("username");
    if (fn != "") {
        $scope.name = fn;
    }

    $scope.dx = function (){
        sessionStorage.clear();
        $scope.name = "Tài khoản";
        reloadPage();
    }
});
app.controller("dkCtrl", function($scope, $http){
    $scope.dk = function (){
        var Student = {
            "username": $scope.username,
            "password": $scope.password,
            "fullname": $scope.fullname,
            "email": $scope.email,
            "gender": $scope.gender,
            "birthday": "",
            "schoolfee": "",
            "marks": "0"
        };
        students.push(angular.copy(Student));
        alert("Đăng kí thành công.");
        console.log(students);
    }
});
app.controller("qmkCtrl", function($scope, $http){
    $scope.students = [];
    $http.get("db/Students.js").then(
        function(d) {$scope.students=d.data;},
        function(d) {alert("Lỗi");}
    );
    $scope.qmk = function (){
        var tc = false;
        for (var i = 0; i < $scope.students.length; i++) {
            if ($scope.email == $scope.students[i].email) {
                tc = true;
                break;
            }
        }
        if (tc) {
            alert("Mật khẩu tài khoản này là : " + $scope.students[i].password);
        } else {
            alert("Email không tồn tại.");
        }
    }
});
app.controller("dttCtrl", function($scope, $http, $routeParams){
    $scope.fullname = sessionStorage.getItem("fullname");
    $scope.email = sessionStorage.getItem("email");
    $scope.gender = sessionStorage.getItem("gender");
    $scope.birthday = sessionStorage.getItem("birthday");
    $scope.schoolfee = sessionStorage.getItem("schoolfee");
    $scope.marks = sessionStorage.getItem("marks");
    $scope.username = $routeParams.name;
});
app.controller("dmkCtrl", function($scope, $http){
    $scope.students = [];
    $http.get("db/Students.js").then(
        function(d) {$scope.students=d.data;},
        function(d) {alert("Lỗi");}
    );
    $scope.dmk = function (){
        for (var i = 0; i < $scope.students.length; i++) {
            if ($scope.email == $scope.students[i].email 
                && $scope.oldPassword == $scope.students[i].password) {
                if ($scope.confirmPassword == $scope.newPassword) {
                    alert("Đổi mật khẩu thành công thành: " + $scope.confirmPassword);
                } else {
                    alert("Mật khẩu nhập không giống nhau");
                }
            }
        }
    }
});
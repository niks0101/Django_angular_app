'use strict';

angular.module('myApp.project', []).controller('ProjectCtrl', ['$scope', '$http', 'ProjectService', '$routeParams', function ($scope, $http, ProjectService, $routeParams) {
    console.log("ProjectCtrl intialized");
    $scope.project = {};
    $scope.dataLoading = true;
    ProjectService.GetProjectById($routeParams.id).then(function (responseData) {
        console.log(responseData);
        $scope.project = responseData;
        $scope.data = responseData.questionset;
        $scope.main_question =$scope.data[0];
    }, function (response) {
        FlashService.Error(response.message);
        $scope.dataLoading = false;
    });
    $scope.showQuestions=function (id) {
        for(var i=0;i<$scope.data.length ;i++) {
            if($scope.data[i].id === id) {
                $scope.main_question =$scope.data[i];
                break;
            }
        }
    }
    $scope.submitForm = function (question_id) {
        var project_id = $routeParams.id;
        var question_id = question_id;
        console.log("quesion id" + question_id);
        console.log($scope.data);
        var request = {
            method: 'POST',
            url: '/projects/' + project_id + '/questions/' + question_id,
            data: {model: $scope.data, files: formdata},
            headers: {
                'Content-Type': undefined
            }
        };
        ProjectService.setAnswer(request).then(function (response) {
            console.log("success");
        }, function (errorresponse) {
            console.log("error");
        })
    };
    var formdata = new FormData();
    $scope.getTheFiles = function ($files) {
        angular.forEach($files, function (value, key) {
            formdata.append(key, value);
        });
    };

    // NOW UPLOAD THE FILES.
    $scope.uploadFiles = function () {



        // SEND THE FILES.
        $http(request)
            .success(function (d) {
                alert(d);
            })
            .error(function () {
            });
    }
}]);
//         var data = [
//             {
//                 id: 1,
//                 question_title: 'ACCESS CONTROL POLICY AND PROCEDURES',
//                 question_list: [
//                     {
//                         id: "1",
//                         val: "AC-1(a)(1)[1] develops and documents an access control policy that addresses:",
//                         answer_option: [
//                             {id: "1", val: "AC-1(a)(1)[1][a] purpose", check_val: false},
//                             {id: "2", val: "AC-1(a)(1)[1][b] scope", check_val: false},
//                             {id: "3", val: "AC-1(a)(1)[1][a] purpose", check_val: false},
//                             {id: "4", val: "AC-1(a)(1)[1][b] scope", check_val: false},
//                             {id: "5", val: "AC-1(a)(1)[1][a] purpose", check_val: false},
//                             {id: "6", val: "AC-1(a)(1)[1][b] scope", check_val: false}
//                         ]
//                     },
//                     {
//                         id: "2",
//                         val: "defines personnel or roles to whom the access control policy are to be disseminated;",
//                         answer_option: [
//                             {
//                                 id: "1",
//                                 val: "defines personnel or roles to whom the access control policy are to be disseminated;",
//                                 check_val: false
//                             }]
//                     },
//                     {
//                         id: "3",
//                         val: "defines personnel or roles to whom the access control policy are to be disseminated;",
//                         answer_option: [
//                             {
//                                 id: "1",
//                                 val: "defines personnel or roles to whom the access control policy are to be disseminated;",
//                                 check_val: false
//                             }]
//                     },
//                     {
//                         id: "4",
//                         val: "defines personnel or roles to whom the access control policy are to be disseminated;",
//                         answer_option: [
//                             {
//                                 id: "1",
//                                 val: "defines personnel or roles to whom the access control policy are to be disseminated;",
//                                 check_val: false
//                             }]
//                     },
//                     {
//                         id: "5",
//                         val: "defines personnel or roles to whom the access control policy are to be disseminated;",
//                         answer_option: [
//                             {
//                                 id: "1",
//                                 val: "defines personnel or roles to whom the access control policy are to be disseminated;",
//                                 check_val: false
//                             }]
//                     },
//                     {
//                         id: "6",
//                         val: "defines personnel or roles to whom the access control policy are to be disseminated;",
//                         answer_option: [
//                             {
//                                 id: "1",
//                                 val: "defines personnel or roles to whom the access control policy are to be disseminated;",
//                                 check_val: false
//                             }]
//                     },
//                     {
//                         id: "7",
//                         val: "defines personnel or roles to whom the access control policy are to be disseminated;",
//                         answer_option: [
//                             {
//                                 id: "1",
//                                 val: "defines personnel or roles to whom the access control policy are to be disseminated;",
//                                 check_val: false
//                             }]
//
//                     },
//                 ],
//                 comment: "",
//                 uploaded_doc1: "",
//                 uploaded_doc2: ""
//
//             },
//
//            {
//                 id: 2,
//                 question_title: 'ACCESS CONTROL POLICY AND PROCEDURES',
//                 question_list: [
//                     {
//                         id: "1",
//                         val: "AC-1(a)(1)[1] develops and documents an access control policy that addresses:",
//                         answer_option: [
//                             {id: "1", val: "AC-1(a)(1)[1][a] purpose", check_val: false},
//                             {id: "2", val: "AC-1(a)(1)[1][b] scope", check_val: false},
//                             {id: "3", val: "AC-1(a)(1)[1][a] purpose", check_val: false},
//                             {id: "4", val: "AC-1(a)(1)[1][b] scope", check_val: false},
//                             {id: "5", val: "AC-1(a)(1)[1][a] purpose", check_val: false},
//                             {id: "6", val: "AC-1(a)(1)[1][b] scope", check_val: false}
//                         ]
//                     },
//                     {
//                         id: "2",
//                         val: "defines personnel or roles to whom the access control policy are to be disseminated;",
//                         answer_option: [
//                             {
//                                 id: "1",
//                                 val: "defines personnel or roles to whom the access control policy are to be disseminated;",
//                                 check_val: false
//                             }]
//                     },
//                     {
//                         id: "3",
//                         val: "defines personnel or roles to whom the access control policy are to be disseminated;",
//                         answer_option: [
//                             {
//                                 id: "1",
//                                 val: "defines personnel or roles to whom the access control policy are to be disseminated;",
//                                 check_val: false
//                             }]
//                     },
//                     {
//                         id: "4",
//                         val: "defines personnel or roles to whom the access control policy are to be disseminated;",
//                         answer_option: [
//                             {
//                                 id: "1",
//                                 val: "defines personnel or roles to whom the access control policy are to be disseminated;",
//                                 check_val: false
//                             }]
//                     },
//                     {
//                         id: "5",
//                         val: "defines personnel or roles to whom the access control policy are to be disseminated;",
//                         answer_option: [
//                             {
//                                 id: "1",
//                                 val: "defines personnel or roles to whom the access control policy are to be disseminated;",
//                                 check_val: false
//                             }]
//                     },
//                     {
//                         id: "6",
//                         val: "defines personnel or roles to whom the access control policy are to be disseminated;",
//                         answer_option: [
//                             {
//                                 id: "1",
//                                 val: "defines personnel or roles to whom the access control policy are to be disseminated;",
//                                 check_val: false
//                             }]
//                     },
//                     {
//                         id: "7",
//                         val: "defines personnel or roles to whom the access control policy are to be disseminated;",
//                         answer_option: [
//                             {
//                                 id: "1",
//                                 val: "defines personnel or roles to whom the access control policy are to be disseminated;",
//                                 check_val: false
//                             }]
//
//                     },
//                 ],
//                 comment: "",
//                 uploaded_doc1: "",
//                 uploaded_doc2: ""
//
//             },
//
//               {
//                 id: 3,
//                 question_title: 'ACCESS CONTROL POLICY AND PROCEDURES',
//                 question_list: [
//                     {
//                         id: "1",
//                         val: "AC-1(a)(1)[1] develops and documents an access control policy that addresses:",
//                         answer_option: [
//                             {id: "1", val: "AC-1(a)(1)[1][a] purpose", check_val: false},
//                             {id: "2", val: "AC-1(a)(1)[1][b] scope", check_val: false},
//                             {id: "3", val: "AC-1(a)(1)[1][a] purpose", check_val: false},
//                             {id: "4", val: "AC-1(a)(1)[1][b] scope", check_val: false},
//                             {id: "5", val: "AC-1(a)(1)[1][a] purpose", check_val: false},
//                             {id: "6", val: "AC-1(a)(1)[1][b] scope", check_val: false}
//                         ]
//                     },
//                     {
//                         id: "2",
//                         val: "defines personnel or roles to whom the access control policy are to be disseminated;",
//                         answer_option: [
//                             {
//                                 id: "1",
//                                 val: "defines personnel or roles to whom the access control policy are to be disseminated;",
//                                 check_val: false
//                             }]
//                     },
//                     {
//                         id: "3",
//                         val: "defines personnel or roles to whom the access control policy are to be disseminated;",
//                         answer_option: [
//                             {
//                                 id: "1",
//                                 val: "defines personnel or roles to whom the access control policy are to be disseminated;",
//                                 check_val: false
//                             }]
//                     },
//                     {
//                         id: "4",
//                         val: "defines personnel or roles to whom the access control policy are to be disseminated;",
//                         answer_option: [
//                             {
//                                 id: "1",
//                                 val: "defines personnel or roles to whom the access control policy are to be disseminated;",
//                                 check_val: false
//                             }]
//                     },
//                     {
//                         id: "5",
//                         val: "defines personnel or roles to whom the access control policy are to be disseminated;",
//                         answer_option: [
//                             {
//                                 id: "1",
//                                 val: "defines personnel or roles to whom the access control policy are to be disseminated;",
//                                 check_val: false
//                             }]
//                     },
//                     {
//                         id: "6",
//                         val: "defines personnel or roles to whom the access control policy are to be disseminated;",
//                         answer_option: [
//                             {
//                                 id: "1",
//                                 val: "defines personnel or roles to whom the access control policy are to be disseminated;",
//                                 check_val: false
//                             }]
//                     },
//                     {
//                         id: "7",
//                         val: "defines personnel or roles to whom the access control policy are to be disseminated;",
//                         answer_option: [
//                             {
//                                 id: "1",
//                                 val: "defines personnel or roles to whom the access control policy are to be disseminated;",
//                                 check_val: false
//                             }]
//
//                     },
//                 ],
//                 comment: "",
//                 uploaded_doc1: "",
//                 uploaded_doc2: ""
//
//             }
//         ];
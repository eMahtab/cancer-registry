var app=angular.module('cancerRegistryApp',
['mgcrea.ngStrap','ngMessages','angular-ladda','toaster','ngAnimate']);

app.config(function($datepickerProvider) {
  angular.extend($datepickerProvider.defaults, {
    dateFormat: 'dd-MM-yyyy',
    autoclose: true
  });
})

function extractDate(date){
  if (typeof date == 'undefined'){
    return null;
  }else{
  var year=date.getFullYear()
  var month=date.getMonth()+1;
  var date_of_month=date.getDate();
  return year+'-'+month+'-'+date_of_month;
   }
}

function undefined_or_empty(value){
  if(typeof value == 'undefined' || value == '' ){
    return true;
  }else{
    return false;
  }
}

app.controller('formController',function($scope,$http,toaster,$window){
      $scope.formData={};
      $scope.submitting_form=false;

     $scope.processForm=function(){
       $scope.submitting_form=true;
       console.log("Form : "+JSON.stringify($scope.formData));
       console.log("Form is submitted");

       var aadhar;
       if(undefined_or_empty($scope.formData.aadhar_1) || undefined_or_empty($scope.formData.aadhar_2) ||
          undefined_or_empty($scope.formData.aadhar_3) || undefined_or_empty($scope.formData.aadhar_4) ||
          undefined_or_empty($scope.formData.aadhar_5) || undefined_or_empty($scope.formData.aadhar_6) ||
          undefined_or_empty($scope.formData.aadhar_7) || undefined_or_empty($scope.formData.aadhar_8) ||
          undefined_or_empty($scope.formData.aadhar_9) || undefined_or_empty($scope.formData.aadhar_10)||
          undefined_or_empty($scope.formData.aadhar_11)|| undefined_or_empty($scope.formData.aadhar_12))
      {
        aadhar=null;
      } else{
        aadhar=$scope.formData.aadhar_1+$scope.formData.aadhar_2+
                   $scope.formData.aadhar_3+$scope.formData.aadhar_4+
                   $scope.formData.aadhar_5+$scope.formData.aadhar_6+
                   $scope.formData.aadhar_7+$scope.formData.aadhar_8+
                   $scope.formData.aadhar_9+$scope.formData.aadhar_10+
                   $scope.formData.aadhar_11+$scope.formData.aadhar_12;
      }

       var source_of_registration;
       if(undefined_or_empty($scope.formData.source_of_registration)){
         source_of_registration=null;
       }else{source_of_registration=$scope.formData.source_of_registration;}

       var date_of_registration;
       if(undefined_or_empty($scope.formData.date_of_registration)){
         date_of_registration=null;
       }else{date_of_registration=extractDate($scope.formData.date_of_registration);}

       var father_name=undefined_or_empty($scope.formData.father_name) ? null:$scope.formData.father_name;
       var mother_name=undefined_or_empty($scope.formData.mother_name) ? null:$scope.formData.mother_name;
       var spouse_name=undefined_or_empty($scope.formData.spouse_name) ? null:$scope.formData.spouse_name;
       var patient_name=undefined_or_empty($scope.formData.patient_name) ? null:$scope.formData.patient_name;
       var address=undefined_or_empty($scope.formData.address) ? null :$scope.formData.address;

       var address_pincode;
       if(undefined_or_empty($scope.formData.address_pincode_1) || undefined_or_empty($scope.formData.address_pincode_2) ||
          undefined_or_empty($scope.formData.address_pincode_3) || undefined_or_empty($scope.formData.address_pincode_4) ||
          undefined_or_empty($scope.formData.address_pincode_5) || undefined_or_empty($scope.formData.address_pincode_6)
        ){
          address_pincode=null;
        }
        else{
          address_pincode=$scope.formData.address_pincode_1+$scope.formData.address_pincode_2+
                          $scope.formData.address_pincode_3+$scope.formData.address_pincode_4+
                          $scope.formData.address_pincode_5+$scope.formData.address_pincode_6;
        }


       var primary_number;
       if(undefined_or_empty($scope.formData.primary_number_1) || undefined_or_empty($scope.formData.primary_number_2) ||
          undefined_or_empty($scope.formData.primary_number_3) || undefined_or_empty($scope.formData.primary_number_4) ||
          undefined_or_empty($scope.formData.primary_number_5) || undefined_or_empty($scope.formData.primary_number_6) ||
          undefined_or_empty($scope.formData.primary_number_7) || undefined_or_empty($scope.formData.primary_number_8) ||
          undefined_or_empty($scope.formData.primary_number_9) || undefined_or_empty($scope.formData.primary_number_10)
        ){
          primary_number=null;
        }
        else{
          primary_number=$scope.formData.primary_number_1+$scope.formData.primary_number_2+
                            $scope.formData.primary_number_3+$scope.formData.primary_number_4+
                            $scope.formData.primary_number_5+$scope.formData.primary_number_6+
                            $scope.formData.primary_number_7+$scope.formData.primary_number_8+
                            $scope.formData.primary_number_9+$scope.formData.primary_number_10;
        }

        var secondary_number;
        if(undefined_or_empty($scope.formData.secondary_number_1) || undefined_or_empty($scope.formData.secondary_number_2) ||
           undefined_or_empty($scope.formData.secondary_number_3) || undefined_or_empty($scope.formData.secondary_number_4) ||
           undefined_or_empty($scope.formData.secondary_number_5) || undefined_or_empty($scope.formData.secondary_number_6) ||
           undefined_or_empty($scope.formData.secondary_number_7) || undefined_or_empty($scope.formData.secondary_number_8) ||
           undefined_or_empty($scope.formData.secondary_number_9) || undefined_or_empty($scope.formData.secondary_number_10)
         ){
           secondary_number=null;
         }
         else{
           secondary_number=$scope.formData.secondary_number_1+$scope.formData.secondary_number_2+
                             $scope.formData.secondary_number_3+$scope.formData.secondary_number_4+
                             $scope.formData.secondary_number_5+$scope.formData.secondary_number_6+
                             $scope.formData.secondary_number_7+$scope.formData.secondary_number_8+
                             $scope.formData.secondary_number_9+$scope.formData.secondary_number_10;
         }


        var date_of_birth;
         if(undefined_or_empty($scope.formData.date_of_birth)){
           date_of_birth=null;
         }else{
           date_of_birth=extractDate($scope.formData.date_of_birth);
         }


       var place_of_birth=undefined_or_empty($scope.formData.place_of_birth) ? null: $scope.formData.place_of_birth ;
       var duration_of_stay_in_village=undefined_or_empty($scope.formData.duration_of_stay_in_village) ? null : $scope.formData.duration_of_stay_in_village;
       var patient_age=undefined_or_empty($scope.formData.patient_age) ? null :$scope.formData.patient_age;
       var sex=undefined_or_empty($scope.formData.sex)?null:$scope.formData.sex;
       var sex_other=undefined_or_empty($scope.formData.sex_other)?null:$scope.formData.sex_other;
       var marital_status=undefined_or_empty($scope.formData.marital_status)?null:$scope.formData.marital_status;
       var marital_status_other=undefined_or_empty($scope.formData.marital_status_other)?null:$scope.formData.marital_status_other;
       var mother_tongue=undefined_or_empty($scope.formData.mother_tongue)?null:$scope.formData.mother_tongue;
       var mother_tongue_other=undefined_or_empty($scope.formData.mother_tongue_other)?null:$scope.formData.mother_tongue_other;
       var religion=undefined_or_empty($scope.formData.religion)?null:$scope.formData.religion;
       var religion_other=undefined_or_empty($scope.formData.religion_other)?null:$scope.formData.religion_other;
       var education=undefined_or_empty($scope.formData.education)?null:$scope.formData.education;
       var education_other=undefined_or_empty($scope.formData.education_other)?null:$scope.formData.education_other;

       var date_of_diagnosis;
       if(undefined_or_empty($scope.formData.date_of_diagnosis)){
         date_of_diagnosis=null;
       }
       else{
         date_of_diagnosis=extractDate($scope.formData.date_of_diagnosis);
       }

       var method_of_diagnosis=undefined_or_empty($scope.formData.method_of_diagnosis)?null:$scope.formData.method_of_diagnosis;
       var method_of_diagnosis_other=undefined_or_empty($scope.formData.method_of_diagnosis_other)?null:$scope.formData.method_of_diagnosis_other;
       var primary_site_of_tumor=undefined_or_empty($scope.formData.primary_site_of_tumor)?null:$scope.formData.primary_site_of_tumor;
       var primary_histology=undefined_or_empty($scope.formData.primary_histology)?null:$scope.formData.primary_histology;
       var prior_treatment=undefined_or_empty($scope.formData.prior_treatment)?null:$scope.formData.prior_treatment;
       var type_of_treatment=undefined_or_empty($scope.formData.type_of_treatment)?null:$scope.formData.type_of_treatment;
       var type_of_treatment_other=undefined_or_empty($scope.formData.type_of_treatment_other)?null:$scope.formData.type_of_treatment_other;
       var current_treatment=undefined_or_empty($scope.formData.current_treatment)?null:$scope.formData.current_treatment;
       var current_treatment_other=undefined_or_empty($scope.formData.current_treatment_other)?null:$scope.formData.current_treatment_other;

       var request_body={};
       request_body.aadhar=aadhar;request_body.source_of_registration=source_of_registration;
       request_body.date_of_registration=date_of_registration;
       request_body.patient_name=patient_name;
       request_body.father_name=father_name;request_body.mother_name=mother_name;
       request_body.spouse_name=spouse_name;
       request_body.address=address;
       request_body.address_pincode=address_pincode;
       request_body.primary_number=primary_number;
       request_body.secondary_number=secondary_number;
       request_body.date_of_birth=date_of_birth;
       request_body.place_of_birth=place_of_birth;
       request_body.duration_of_stay_in_village=duration_of_stay_in_village;
       request_body.patient_age=patient_age;
       request_body.sex=sex;
       request_body.sex_other=sex_other;
       request_body.marital_status=marital_status;
       request_body.marital_status_other=marital_status_other;
       request_body.mother_tongue=mother_tongue;
       request_body.mother_tongue_other=mother_tongue_other;
       request_body.religion=religion;
       request_body.religion_other=religion_other;
       request_body.education=education;
       request_body.education_other=education_other;
       request_body.date_of_diagnosis=date_of_diagnosis;
       request_body.method_of_diagnosis=method_of_diagnosis;
       request_body.method_of_diagnosis_other=method_of_diagnosis_other;
       request_body.primary_site_of_tumor=primary_site_of_tumor;
       request_body.primary_histology=primary_histology;
       request_body.prior_treatment=prior_treatment;
       request_body.type_of_treatment=type_of_treatment;
       request_body.type_of_treatment_other=type_of_treatment_other;
       request_body.current_treatment=current_treatment;
       request_body.current_treatment_other=current_treatment_other;



       console.log("Aadhar "+aadhar);
       $http.post('http://localhost:7000/patient',request_body,{headers:{'Content-Type': 'application/json'}})
       .success(function(res){
              $scope.submitting_form=false;
              toaster.pop('success','Record added successfully');
              //$scope.formData=null;
              setTimeout(function(){$window.location.reload()},3000) ;
              console.log("SuccessFull "+res);}
              )
       .error(function(res){   $scope.submitting_form=false; console.log("Error "+res);});


     }

});


app.directive('capitalize', function() {
    return {
      require: 'ngModel',
      link: function(scope, element, attrs, modelCtrl) {
        var capitalize = function(inputValue) {
          if (inputValue == undefined) inputValue = '';
          var capitalized = inputValue.toUpperCase();
          if (capitalized !== inputValue) {
            modelCtrl.$setViewValue(capitalized);
            modelCtrl.$render();
          }
          return capitalized;
        }
        modelCtrl.$parsers.push(capitalize);
        capitalize(scope[attrs.ngModel]); // capitalize initial value
      }
    };
  });

app.directive('numberOnly', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, ngModelCtrl) {
            function fromUser(text) {
                if (text) {
                    var transformedInput = text.replace(/[^0-9]/g, '');

                    if (transformedInput !== text) {
                        ngModelCtrl.$setViewValue(transformedInput);
                        ngModelCtrl.$render();
                    }
                    return transformedInput;
                }
                return undefined;
            }
            ngModelCtrl.$parsers.push(fromUser);
        }
    };
});

app.directive('letterOnly', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, ngModelCtrl) {
            function fromUser(text) {
                if (text) {
                    var transformedInput = text.replace(/[^a-zA-Z ]/g, '');

                    if (transformedInput !== text) {
                        ngModelCtrl.$setViewValue(transformedInput);
                        ngModelCtrl.$render();
                    }
                    return transformedInput;
                }
                return undefined;
            }
            ngModelCtrl.$parsers.push(fromUser);
        }
    };
});

app.directive('moveFocus', function() {
  return {
    restrict: 'A',
    link: function($scope,elem,attrs) {

      elem.bind('keyup', function(e) {

          var code = e.keyCode || e.which;
          console.log("Key was presssed "+code );

        if (code >= 48 && code <= 57) {
          e.preventDefault();
             elem.next().select();
             elem.next().focus();
        }
      });
    }
  }
});


function isEmpty(value) {
    return angular.isUndefined(value) || value === '' || value === null || value !== value;
}

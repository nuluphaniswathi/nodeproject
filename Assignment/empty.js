/*Validation rules:
-> Length of student’s name should be more than 2 chars
-> Range of marks is 0 to 60
-> Email should be valid one
-> City should be in hyderabad, chennai and bangalore only. Outsiders not allowed
Endpoints:
POST http://localhost:4000/student-api/student
POST http://localhost:4000/student-api/student/<roll_no>/address
POST http://localhost:4000/student-api/student/<roll_no>/sem-marks
GET http://localhost:4000/student-api/students
GET http://localhost:4000/student-api/students/<roll_no>
GET http://localhost:4000/student-api/students-with-aggregate
PUT http://localhost:4000/student-api/student/<roll_no>/new-address
PUT http://localhost:4000/student-api/student/<roll_no>/semester/<sem-id>/new-marks
DELETE http://localhost:4000/student-api/student/<roll_no>.      (soft delete)*/
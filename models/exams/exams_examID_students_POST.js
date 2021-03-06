const util = require('../utility');
const students_studentID_GET = require('../students/students_studentID_GET');
const exams = require('./exams');
const exams_students = exams.exams_students;
const exams_list = exams.exams_list;
const isInteger = util.isInteger;
const Response = util.Response;
const toInt = util.toInt;
const Request = util.Request;


function exams_examID_students_POST(req) {
    let id = toInt(req.params.examID);
    if (!isInteger(id) || id < 1) {
        return new Response(404, "Bad id parameter");
    }
    if (!exams_list[id]) {
        return new Response(404, "Exam not found");
    }

    let studentID = req.body.studentID;
    if (!isInteger(studentID) || studentID < 1) {
        return new Response(400, "Bad studentID parameter");
    }
    if (exams_students[id].includes(studentID)) {
        return new Response(423, "Student already signed up");
    }
    let stud_req = new Request();
    stud_req.params.studentID = studentID;
    let stud_res = students_studentID_GET(stud_req);
    if (stud_res.status !== 200) {
        return new Response(424, "Student not found therefore not added");
    } else {
        exams_students[id].push(studentID);
        exams_list[id].tot_students++;
        return new Response(204, "Student added to exam");
    }
}



module.exports = exams_examID_students_POST;
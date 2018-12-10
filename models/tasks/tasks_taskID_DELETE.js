const util = require("../utility");
const Request = util.Request;
const Response = util.Response;
const toInt = util.toInt;
const isInteger = util.isInteger;

const tasks_taskID_submissions_GET = require("../tasks/tasks_taskID_submissions_GET");
const submissions_submissionID_DELETE = require("../submissions/submissions_submissionID_DELETE");
const tasks_taskID_exams_GET = require("../tasks/tasks_taskID_exams_GET");
const exams_examID_DELETE = require("../exams/exams_examID_DELETE");

const tasks = require("./tasks");
const tasks_list = tasks.tasks_list;

function tasks_taskID_DELETE(req) {
    let taskID = toInt(req.params.taskID);

    if (!isInteger(taskID)) {
        return new Response(400, "TaskID is not an integer");
    }
    if (taskID < 1) {
        return new Response(400, "TaskID invalid value");
    }

    if (!tasks_list[taskID]) {
        return new Response(404, "A task with the specified taskID was not found");
    }

    // get submissions with this task
    let taskReq = new Request();
    taskReq.params.taskID = taskID;
    let subsList = tasks_taskID_submissions_GET(taskReq).json.submissions;

    // delete submissions with this task
    let subReq = new Request();
    for (sub of subsList) {
        subReq.params.submissionID = sub.id;
        submissions_submissionID_DELETE(subReq); // TODO: force delete
    }

    // remove task from exams
    let examsList = tasks_taskID_exams_GET(taskReq).json.exams;
    let examReq = new Request();
    for (exam of examsList) {
        examReq.params.examID = exam.id;
        exams_examID_DELETE(examReq); // TODO: delete task from exam
    }

    delete tasks_list[taskID];
    return new Response(204, "Task removed");
}

module.exports = tasks_taskID_DELETE;
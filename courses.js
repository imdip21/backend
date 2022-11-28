const express = require("express");
const route = express.Router();
const courses = [
    { id: 1, name: "ReactJs" },
    { id: 2, name: "React Native" },
    { id: 3, name: "NodeJs" },
];

route.get("/", (req, res) => {
    res.send(courses);
});

// api/course/1
route.get("/:id", (req, res) => {
    //   res.send(req.params.id);
    let course = courses.find((c) => c.id === parseInt(req.params.id));
    if (!course)
        res.status(404).send("The course with the given ID was not found"); //404

    res.send(course);
});
route.get("/api/posts/:year/:mm", (req, res) => {
    res.send(req.params);
});

//Create new post

route.post("/", (req, res) => {
    const { error } = validateFn(req.body);
    if (error) {
        // 400 bad request
        res.status(400).send(error.details[0].message);
        return;
    }
    const course = {
        id: courses.length + 1,
        name: req.body.name,
    };
    courses.push(course);
    res.send(course);
});
route.put("/:id", (req, res) => {
    //looking for course that have id
    // if not existing , return 404

    let course = courses.find((c) => c.id === parseInt(req.params.id));
    if (!course)
        res.status(404).send("The course with the given ID was not found"); //404

    //validate
    //if invalid 404
    // const { error } = validateFn(req.body);
    // if (error) {
    //   // 400 bad request
    //   res.status(400).send(error.details[0].message);
    //   return;
    // }
    //Update Course
    course.name = req.body.name;
    res.send(course);
    //Return updated course
});
// route.put("//:id", (req, res) => {
//   let course = courses.find((c) => c.id === parseInt(req.params.id));
//   if (!course)
//     res.status(404).send("The course with the given ID was not found");

//   course.name = req.body?.name;

//   res.send(course);
// })

route.delete("//:id", (req, res) => {
    let course = courses.find((c) => c.id === parseInt(req.params.id));
    if (!course)
        res.status(404).send("The course with the given ID was not found");

    //Delete 
    const index = courses.indexOf(course)
    courses.splice(index, 1);

    res.send(course)

    //Return the same course

})

const validateFn = (course) => {
    const schema = {
        name: Joi.string().min(3).required(),
    };
    return Joi.validate(req.body, schema);
};

module.exports = route;
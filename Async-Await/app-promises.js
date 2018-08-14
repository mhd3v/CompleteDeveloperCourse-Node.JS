const users = [{
    id: 1,
    name: 'mahad',
    schoolId: 101
},{
    id: 2,
    name: 'ali',
    schoolId: 999
}];

const grades= [{
    id: 1,
    schoolId: 101,
    grade: 86
},{
    id: 2,
    schoolId: 999,
    grade: 89
},{
    id: 3,
    schoolId: 101,
    grade: 80
}];

const getUser = (id) => {
    return new Promise((resolve, reject)=> {
        const user = users.find((user) => user.id === id);

        if(user)
        resolve(user);

        else
        reject(`Unable to find user with id of ${id}`);

    });
};

const getGrades = (schoolId) => {
    return new Promise((resolve, reject) => {
        resolve(grades.filter((grade) => grade.schoolId === schoolId));
    });
};


//==================================== Inefficient way to getStatus. Unnecessary global user var declaration and complex chaining

// const getStatus = (userId) => {
//     let user; //equivalent to var in es6
//     return getUser(userId).then((tempUser) => {
//         user = tempUser;
//         return getGrades(user.schoolId);
//     }).then((grades) => {   
//         let average = 0;

//         if(grades.length > 0){
//             average = grades.map((grade) => grade.grade).reduce((a,b) => a+b) / grades.length;     //get array of all grades, calling reduce on it to get the total sum
//         }

//        return `${user.name} has a ${average}% in the class.`
//     });
// };

const getStatusAlt = async (userId) => {  //using async await. When we add ASYNC keyword before a function, it will always return a promise

    //await can only be inside a async function

    const user = await getUser(userId); //AWAIT needs to always be before a function that returns a promise. If the function returns a rejected promise, ASYNC will return a reject aswell by throwing a new Error
    const grades = await getGrades(user.schoolId);

    let average = 0;

        if(grades.length > 0){
            average = grades.map((grade) => grade.grade).reduce((a,b) => a+b) / grades.length;     //get array of all grades, calling reduce on it to get the total sum
        }

    return `${user.name} has a ${average}% in the class.`
}

getStatusAlt(2).then((status) => {
    console.log(status);
}).catch((e) => {
    console.log(e);
});

// getStatus(3).then((status) => {
//     console.log(status);
// }).catch((e) => {
//     console.log(e);
// });
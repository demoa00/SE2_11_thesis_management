exports.isStudent = (user) => {
    if (user.userId != undefined && user.codDegree != undefined && user.role != undefined) {
        if (user.role === 'student') {
            return true;
        }
    }

    return false;
}

exports.isProfessor = (user) => {
    if (user.userId != undefined && user.codGroup != undefined && user.role != undefined) {
        if (user.role === 'professor') {
            return true;
        }
    }

    return false;
}

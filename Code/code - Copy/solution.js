document.addEventListener('DOMContentLoaded', function() {
    // Initial list of students
    let students = [
        { studentNumber: 219689715, fullName: 'Maria', caMark: null, examMark: null, finalMark: null, grade: null },
        { studentNumber: 221344566, fullName: 'Bobby', caMark: null, examMark: null, finalMark: null, grade: null },
        { studentNumber: 219824567, fullName: 'Kevin', caMark: null, examMark: null, finalMark: null, grade: null },
        { studentNumber: 220827171, fullName: 'Simon', caMark: null, examMark: null, finalMark: null, grade: null },
        { studentNumber: 220042845, fullName: 'Tangi', caMark: null, examMark: null, finalMark: null, grade: null },
    ];

    // The table
    let table = document.getElementById('marksTable');
    students.forEach(student => {
        let row = table.insertRow();
        row.insertCell().textContent = student.studentNumber;
        row.insertCell().textContent = student.fullName;
        row.insertCell().innerHTML = `<input type="number" id="ca_${student.studentNumber}">`;
        row.insertCell().innerHTML = `<input type="number" id="exam_${student.studentNumber}">`;
        row.insertCell().textContent = '-';
        row.insertCell().textContent = '-';
    });

    // Function to update marks and calculate final results
    function calculateResults() {
        students.forEach(student => {
            let caMark = parseFloat(document.getElementById(`ca_${student.studentNumber}`).value);
            let examMark = parseFloat(document.getElementById(`exam_${student.studentNumber}`).value);

            student.caMark = caMark;
            student.examMark = examMark;
            student.finalMark = (caMark + examMark) / 2;
            student.grade = determineGrade(student.finalMark);

            let row = document.querySelector(`#marksTable tr:nth-child(${students.indexOf(student) + 2})`);
            row.cells[4].textContent = student.finalMark.toFixed(2);
            row.cells[5].textContent = student.grade;
        });

        // Calculate total pass/fail and display
        let totalPass = students.filter(student => student.grade !== 'F').length;
        let totalFail = students.length - totalPass;
        let totalResult = totalFail === 0 ? 'Pass' : 'Fail';
        alert(`Total Result: ${totalResult}\nTotal Pass: ${totalPass}\nTotal Fail: ${totalFail}`);
    }

    // Function to determine grade
    function determineGrade(finalMark) {
        if (finalMark >= 90) return 'A+';
        else if (finalMark >= 80) return 'A';
        else if (finalMark >= 70) return 'B';
        else if (finalMark >= 60) return 'C';
        else if (finalMark >= 50) return 'D';
        else return 'F';
    }

    // Event listener for the Submit button
    const submitButton = document.getElementById('submitButton');
    submitButton.addEventListener('click', calculateResults);

    // Populate the table upon loading
    populateTable();
});

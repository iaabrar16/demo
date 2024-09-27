document.addEventListener('DOMContentLoaded', () => {
    const coursesTableBody = document.querySelector('.courses-card tbody');
    const courseSelectionButtons = document.querySelectorAll('.select-course');

    courseSelectionButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const courseCode = event.target.getAttribute('data-course');
            const courseTitle = event.target.parentElement.previousElementSibling.textContent;

            // Check if course is already added
            const existingCourse = document.querySelector(`.courses-table [data-course="${courseCode}"]`);
            if (existingCourse) return; // Avoid adding duplicates

            // Add course to the table
            const newRow = document.createElement('tr');
            newRow.classList.add('course-row');
            newRow.setAttribute('data-course', courseCode);
            newRow.innerHTML = `
                <td>${courseCode}</td>
                <td>${courseTitle}</td>
                <td>3.00</td>
            `;
            coursesTableBody.appendChild(newRow);

            // Add section details
            const sectionRow = document.createElement('tr');
            sectionRow.classList.add('accordion');
            sectionRow.setAttribute('id', courseCode);
            sectionRow.innerHTML = `
                <td colspan="3">
                    <table class="sections-table">
                        <thead>
                            <tr>
                                <th>Section</th>
                                <th>Time</th>
                                <th>Instructor</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${getSections(courseCode)}
                        </tbody>
                    </table>
                </td>
            `;
            coursesTableBody.appendChild(sectionRow);

            // Toggle section visibility
            newRow.addEventListener('click', () => {
                const accordion = document.getElementById(courseCode);
                accordion.style.display = accordion.style.display === 'table-row' ? 'none' : 'table-row';
            });
        });
    });

    function getSections(courseCode) {
        const sections = {
            'CSE104': `
                <tr>
                    <td>01</td>
                    <td>Mon & Wed 10:00 AM - 11:30 AM</td>
                    <td>Prof. Brown</td>
                    <td><button>Select</button></td>
                </tr>
                <tr>
                    <td>02</td>
                    <td>Tue & Thu 02:00 PM - 03:30 PM</td>
                    <td>Prof. Green</td>
                    <td><button>Select</button></td>
                </tr>
            `,
            'CSE105': `
                <tr>
                    <td>01</td>
                    <td>Mon & Wed 01:00 PM - 02:30 PM</td>
                    <td>Prof. White</td>
                    <td><button>Select</button></td>
                </tr>
                <tr>
                    <td>02</td>
                    <td>Tue & Thu 03:00 PM - 04:30 PM</td>
                    <td>Prof. Black</td>
                    <td><button>Select</button></td>
                </tr>
            `,
            // Add other course sections here
        };
        return sections[courseCode] || '';
    }
});

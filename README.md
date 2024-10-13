#MENTOR AND STUDENT ASSIGNMENT SYSTEM - BACKEND


 1. Project Overview :

       - The Mentor and Student Assignment System is designed to manage mentor-student relationships within educational or mentorship programs.
      
       - It provides administrators with the ability to assign students to mentors, change assignments, and track a student's mentor history.

 2. Features :
   
       - Create a Mentor: Allows the creation of mentor profiles, storing mentor details.

       - Create a Student: Enables the creation of student profiles, who can be assigned to a mentor later.

       - Assign Students to a Mentor: Assigns multiple students to a mentor at once.

       - Change a Student’s Mentor: Reassigns a mentor to a student while keeping the history of previous assignments.

       - View Students for a Mentor: Shows all students assigned to a mentor.

       - View Previous Mentors of a Student: Logs previous mentors for a particular student.

 3. Tech Stack :

       - Node.js: Server-side logic.

       - Express.js: API routing and HTTP handling.

       - MongoDB: Database for storing mentor, student, and assignment data.
   
       - Mongoose: ODM for MongoDB to define schemas for mentors and students

4. Backend API Endpoints :

   a) Create Mentor :

      - URL : POST /api/mentor/create

      - Request Body :

       {
       "name": "John Doe"
       }

      - Response : Created mentor object.

   b) Create Student :

      - URL: POST /api/student/create

      - Request Body:
   
       {
       "name": "Jane Smith"
       }

      - Response: Created student object.

   c) Assign Students to Mentor :

     - URL: POST /api/assign

     - Request Body :

           {
            "mentorId": "mentorObjectId",
            "studentIds": ["studentObjectId1", "studentObjectId2"]
           }

    - Response: Updated mentor object with assigned students.

   d) Change Mentor for a Student :

    - URL: POST /api/change

    - Request Body:

          {
          "studentId": "studentObjectId",
          "newMentorId": "newMentorObjectId"
          }

    - Response: Updated student object.

   e) View Students for a Mentor :

    - URL: GET /api/:mentorId/students

    - Response: Array of students assigned to the mentor.

   d) View Previous Mentors of a Student :

    - URL: GET /api/:studentId/previous-mentors

    - Response: Array of previously assigned mentors for the student.

5. Future Enhancements :

      - Authentication and Authorization : Implement roles like admin, mentor, and student to limit access to certain features.
    
      - Notification System: Notify users when assignments are changed.

      - Search and Filtering: Allow mentors and students to be searched based on specific criteria like skills.

      - Reports: Create reports on mentor-student relationships to provide insights for admins.


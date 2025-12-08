const { hiddenAPI } = require('./hiddenAPI.js');

async function introToCanvasAPI(){
    console.log("Starting Canvas API test...");
    const accessToken = await hiddenAPI();
    const canvasDomain = "https://yourschool.instructure.com/api/v1";
    const courseId = "*****"; // Replace with your actual course ID

    const assignment =
    `${canvasDomain}/courses/${courseId}/assignments`;

    const quizzes =
    `${canvasDomain}/courses/${courseId}/quizzes`;

    const discussions =
    `${canvasDomain}/courses/${courseId}/discussion_topics`;

    // Making request using Bearer token
    const response = await fetch(assignment, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    //Convert response to JSON
    const assignmentsJSON = await response.json();

    // -----------------------------------------------------------

    const quiz_list = await fetch(quizzes, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    
    const quizzesJSON = await quiz_list.json();

    // -----------------------------------------------------------

    
    const discussion_list = await fetch(discussions, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    const discussion_listJSON = await discussion_list.json();
    // ----------------------------------------------------------------------------------------------
    // Check if we got valid data
    if (Array.isArray(assignmentsJSON) && assignmentsJSON.length > 0) {
        console.log("=== ASSIGNMENTS ===");
        for (let i = 0; i < assignmentsJSON.length; i++) {
            console.log(`Assignment ${i + 1}:`);
            console.log(`Name: ${assignmentsJSON[i].name}`);
            const cleanDescription = assignmentsJSON[i].description?.replace(/<[^>]*>/g, '') || 'No description available';
            console.log(`Description: ${cleanDescription}`);
            console.log(`Due Date: ${assignmentsJSON[i].due_at || 'No due date set'}`);
            console.log('---');
        }
    } else {
        console.log("No assignments found or API error:", assignmentsJSON);
    }

    // Display quizzes
    if (Array.isArray(quizzesJSON) && quizzesJSON.length > 0) {
        console.log("\n=== QUIZZES ===");
        for (let i = 0; i < quizzesJSON.length; i++) {
            console.log(`Quiz ${i + 1}:`);
            console.log(`Title: ${quizzesJSON[i].title}`);
            const cleanQuizDescription = quizzesJSON[i].description?.replace(/<[^>]*>/g, '') || 'No description available';
            console.log(`Description: ${cleanQuizDescription}`);
            console.log(`Due Date: ${quizzesJSON[i].due_at || 'No due date set'}`);
            console.log(`Points: ${quizzesJSON[i].points_possible || 'Not specified'}`);
            console.log('---');
        }
    } else {
        console.log("No quizzes found or API error:", quizzesJSON);
    }

    if (Array.isArray(discussion_listJSON) && discussion_listJSON.length > 0) {
        console.log("\n=== DISCUSSIONS ===");
        for(let i =0; i <discussion_listJSON.length; i++){
            console.log(`Discussion ${i + 1}:`);
            console.log(`Title: ${discussion_listJSON[i].title}`);
            const cleanDiscussionDescription = discussion_listJSON[i].message?.replace(/<[^>]*>/g, '') || 'No description available';
            console.log(`Description: ${cleanDiscussionDescription}`);
            console.log('---');
        }
    }
    }

introToCanvasAPI();


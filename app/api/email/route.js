"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.Resend_API_Key);
function validateString(value, maxLength) {
    return typeof value === "string" && value.trim().length > 0 && value.length <= maxLength;
    }
export const sendEmail = async (formData) =>{
    const name = formData.get("Name"); // Full name input
    const senderEmail = formData.get("senderEmail"); // Email input
    const event = formData.get("Event"); // Country input
    const message = formData.get("Message");

    if (!name || !validateString(name, 100)) {
        return {
            error: "Invalid Name", // Error message for invalid name
        };
    }
    if (!senderEmail || !validateString(senderEmail, 500)) {
        return {
            error: "Invalid sender email",
        };
    }
    const validEvents = ["Club Night", "Festival", "Private Event", "Corporate Event", "Other"];
    if (!event || !validEvents.includes(event)) {
        return {
            error: "Invalid Event. Please select a Event.",
        };
    }
    if (!message) {
        return {
            error: "Must fill out the booking info",
        };

    }
    const emailBody = `
    New Booking Request from DJ BagGuy Website:
    
    Name: ${name}
    Email: ${senderEmail}
    Event Type: ${event}
    Message: ${message}
    `;
    try {
        await resend.emails.send({
        from: "Book BagGuy <onboarding@resend.dev>",
        to: "opulentsoundexp@gmail.com",
        subject: "New Booking Request",
        reply_to: senderEmail,
        text: emailBody,
        });
    
        return { success: true };
    } catch (error) {
        console.error("Email sending failed:", error);
        return { error: "Failed to send email. Please try again later." };
    }
    };




// export const sendEmail = async (formData) => {
//     const name = formData.get("Name"); // Full name input
//     const senderEmail = formData.get("senderEmail"); // Email input
//     const country = formData.get("Event"); // Country input
//     const message = formData.get("Message"); // Message input

//     console.log("Fullname:", name);
//     console.log("Email Address:", senderEmail);
//     console.log("Event:", event);
//     console.log("Message:", message);

//     // Perform validation
//     if (!name || !validateString(name, 100)) {
//         return {
//             error: "Invalid full name", // Error message for invalid name
//         };
//     }

//     // Validate sender email (Ensure it's not empty and within the max length)
//     if (!senderEmail || !validateString(senderEmail, 500)) {
//         return {
//             error: "Invalid sender email",
//         };
//     }

//     // Validate country (Ensure it's not empty and one of the valid options)
//     const validCountries = ["australia", "canada", "usa", "uk"];
//     if (!country || !validCountries.includes(country)) {
//         return {
//             error: "Invalid country. Please select a valid country.",
//         };
//     }
 
//     // Validate message (Ensure it's not empty)
//     if (!message) {
//         return {
//             error: "Must fill out the booking info",
//         };
//     }

//     // Construct email body including all form data
//     const emailBody = `
//         $Ciabatta$
        
//         Full Name: ${name}
//         Email Address: ${senderEmail}
//         Country: ${country}
//         Message: ${message}
//     `;

//     // Send the email using the Resend API
//     try {
//         await resend.emails.send({
//             from: "Book BagGuy <onbaording@resend.dev>",
//             to: "opulentsoundexp@gmail.com",
//             subject: "Message from Booking Form",
//             reply_to: senderEmail,
//             text: emailBody, // Include full data in the email body
//         });

//         console.log("Email sent successfully!"); // Success log
//         return { success: true }; // Indicate success
//     } catch (error) {
//         console.error("Error sending email:", error); // Error log
//         return { error: "Failed to send email" }; // Error handling
//     }
// };

// // Helper function to validate string length
// function validateString(str, maxLength) {
//     return typeof str === "string" && str.length <= maxLength;
// }

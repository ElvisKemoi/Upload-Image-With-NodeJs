const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const path = require("path");

// Function to upload multiple images
async function uploadImages(imagePaths) {
	const url = ""; // URL of your PHP server where the file upload is handled

	// Create a FormData instance
	const form = new FormData();

	// Add files to the form data
	imagePaths.forEach((imagePath) => {
		const file = fs.createReadStream(imagePath);
		const fileName = path.basename(imagePath);
		form.append("fileUpload[]", file, fileName); // Using 'fileUpload[]' to match the PHP form field name
	});

	// Sending the POST request to the PHP server
	try {
		const response = await axios.post(url, form, {
			headers: {
				...form.getHeaders(), // Set proper headers for file upload
			},
		});

		console.log(response.data);
	} catch (error) {
		console.error("Error uploading images:", error);
	}
}

// Example usage
const imagePaths = ["/your-image-path"];

uploadImages(imagePaths);

// Function to toggle job details visibility
function toggleDetails(jobElement) {
    const details = jobElement.querySelector(".details");
    if (details.style.display === "block") {
        details.style.display = "none";
    } else {
        details.style.display = "block";
    }
}

let interviewList = [];
let rejectedList = [];
let activeTab = "all";

let total = document.getElementById("total");
let interviewCount = document.getElementById("interviewCount");
let rejectedCount = document.getElementById("rejectedCount");

let allFilterBtn = document.getElementById("all-filter-btn");
let interviewFilterBtn = document.getElementById("interview-filter-btn");
let rejectedFilterBtn = document.getElementById("rejected-filter-btn");

let allJobsSection = document.getElementById("allJobs");
let filteredSection = document.getElementById("filtered-section");
let emptySection = document.getElementById("empty-section");
let mainContainer = document.querySelector("main");

function calculateCount() {
    let totalCards = allJobsSection.querySelectorAll(".card").length;
    total.innerText = totalCards;
    interviewCount.innerText = interviewList.length;
    rejectedCount.innerText = rejectedList.length;
    updateAvailableJobs();
    toggleEmptySection();
}

function updateAvailableJobs() {
    let availableText = document.getElementById("availableCount");
    let currentCount = 0;
    if(activeTab === "all") {
        currentCount = allJobsSection.querySelectorAll(".card").length;
        availableText.innerText = `${currentCount} jobs`;
    } else {
        currentCount = filteredSection.querySelectorAll(".card").length;
        availableText.innerText = `${currentCount} out of ${total.innerText} jobs`;
    }
}

function toggleEmptySection() {
    let count = 0;
    if(activeTab === "all") {
        count = allJobsSection.querySelectorAll(".card").length;
    } else {
        count = filteredSection.querySelectorAll(".card").length;
    }
    if(count === 0) {
        emptySection.classList.remove("hidden");
    } else {
        emptySection.classList.add("hidden");
    }
}

function toggleStyle(id) {
    allFilterBtn.classList.remove("bg-sky-500", "text-white");
    interviewFilterBtn.classList.remove("bg-sky-500", "text-white");
    rejectedFilterBtn.classList.remove("bg-sky-500", "text-white");

    allFilterBtn.classList.add("bg-white", "text-black");
    interviewFilterBtn.classList.add("bg-white", "text-black");
    rejectedFilterBtn.classList.add("bg-white", "text-black");

    let selected = document.getElementById(id);
    selected.classList.remove("bg-white", "text-black");
    selected.classList.add("bg-sky-500", "text-white");

    if(id === "interview-filter-btn") {
        activeTab = "interview";
        allJobsSection.classList.add("hidden");
        filteredSection.classList.remove("hidden");
        renderInterview();
    } else if(id === "rejected-filter-btn") {
        activeTab = "rejected";
        allJobsSection.classList.add("hidden");
        filteredSection.classList.remove("hidden");
        renderRejected();
    } else {
        activeTab = "all";
        allJobsSection.classList.remove("hidden");
        filteredSection.classList.add("hidden");
    }

    toggleEmptySection();
    updateAvailableJobs();
}

mainContainer.addEventListener("click", function(event) {
    if(event.target.classList.contains("interview-btn")) {
        handleStatusChange(event, "INTERVIEW");
    }
    if(event.target.classList.contains("rejected-btn")) {
        handleStatusChange(event, "REJECTED");
    }
    if(event.target.classList.contains("fa-trash-can")) {
        handleDelete(event);
    }
});

function handleStatusChange(event, status) {
    let card = event.target.closest(".card");
    let companyName = card.querySelector(".companyName").innerText;
    let statusEl = card.querySelector(".status");
    statusEl.innerText = status.toUpperCase();
    statusEl.classList.remove(
        "bg-gray-200", "bg-red-100", "text-red-700", "border-red-500",
        "bg-green-100", "text-green-700", "border-green-500", "border"
    );
    if(status === "INTERVIEW") {
        statusEl.classList.add("bg-green-100", "text-green-700", "border", "border-green-500");
    } else if(status === "REJECTED") {
        statusEl.classList.add("bg-red-100", "text-red-700", "border", "border-red-500");
    }
    let cardInfo = {
        companyName,
        position: card.querySelector(".position").innerText,
        typeLocationSalary: card.querySelector(".type-location-salary").innerText,
        postDescription: card.querySelector(".postDescription").innerText
    };
    if(status === "INTERVIEW") {
        if(!interviewList.find(item => item.companyName === companyName)) {
            interviewList.push(cardInfo);
        }
        rejectedList = rejectedList.filter(item => item.companyName !== companyName);
    } else if(status === "REJECTED") {
        if(!rejectedList.find(item => item.companyName === companyName)) {
            rejectedList.push(cardInfo);
        }
        interviewList = interviewList.filter(item => item.companyName !== companyName);
    }
    calculateCount();
    if(activeTab === "interview") renderInterview();
    if(activeTab === "rejected") renderRejected();
}

function handleDelete(event) {
    let card = event.target.closest(".card");
    let companyName = card.querySelector(".companyName").innerText;
    allJobsSection.querySelectorAll(".card").forEach(item => {
        if(item.querySelector(".companyName").innerText === companyName) item.remove();
    });
    filteredSection.querySelectorAll(".card").forEach(item => {
        if(item.querySelector(".companyName").innerText === companyName) item.remove();
    });
    interviewList = interviewList.filter(item => item.companyName !== companyName);
    rejectedList = rejectedList.filter(item => item.companyName !== companyName);
    calculateCount();
    if(activeTab === "interview") renderInterview();
    if(activeTab === "rejected") renderRejected();
}

function renderInterview() {
    filteredSection.innerHTML = "";
    interviewList.forEach(interview => {
        let div = createCard(interview, "INTERVIEW");
        filteredSection.appendChild(div);
    });
    toggleEmptySection();
    updateAvailableJobs();
}

function renderRejected() {
    filteredSection.innerHTML = "";
    rejectedList.forEach(rejected => {
        let div = createCard(rejected, "REJECTED");
        filteredSection.appendChild(div);
    });
    toggleEmptySection();
    updateAvailableJobs();
}

function createCard(cardInfo, status) {
    let div = document.createElement("div");
    div.className = "card bg-white p-4 max-[510px]:p-3 flex justify-between max-[510px]:flex-col rounded-lg mb-3 max-[510px]:mb-2 max-[510px]:gap-2";
    let statusClasses = status === "INTERVIEW"
        ? "bg-green-100 text-green-700 border border-green-500"
        : "bg-red-100 text-red-700 border border-red-500";
    div.innerHTML = `
        <div class="space-y-2">
            <h1 class="companyName font-semibold">${cardInfo.companyName}</h1>
            <p class="position text-gray-500">${cardInfo.position}</p>
            <br>
            <p class="type-location-salary text-gray-500">${cardInfo.typeLocationSalary}</p>
            <br>
            <p class="status ${statusClasses} px-4 py-2 rounded-md inline-block">${status.toUpperCase()}</p>
            <p class="postDescription">${cardInfo.postDescription}</p><br>
            <div class="flex gap-2 max-[510px]:flex-col">
                <button class="text-green-500 border border-green-500 px-4 py-2 max-[510px]:px-3 max-[510px]:py-1 rounded-md interview-btn">INTERVIEW</button>
                <button class="text-red-500 border border-red-500 px-4 py-2 max-[510px]:px-3 max-[510px]:py-1 rounded-md rejected-btn">REJECTED</button>
            </div>
        </div>
        <div>
            <div class="rounded-full border border-gray-500 w-10 h-10 flex items-center justify-center">
                <i class="fa-regular fa-trash-can"></i>
            </div>
        </div>
    `;
    return div;
}

calculateCount();
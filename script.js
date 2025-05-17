document.getElementById("startBtn").addEventListener("click", () => {
  document.querySelector(".landing").classList.add("hidden");
  document.getElementById("builder").classList.remove("hidden");
});

const resumeForm = document.getElementById("resumeForm");
const preview = document.getElementById("resumePreview");
const downloadBtn = document.getElementById("downloadBtn");

function addExperience() {
  const container = document.getElementById("experienceSection");
  container.innerHTML += `
    <div class="exp-entry">
      <input type="text" placeholder="Job Title" class="jobTitle" />
      <input type="text" placeholder="Company Name" class="company" />
      <input type="text" placeholder="Duration" class="duration" />
      <textarea placeholder="Job Details" class="jobDetails"></textarea>
    </div>`;
}

function addEducation() {
  const container = document.getElementById("educationSection");
  container.innerHTML += `
    <div class="edu-entry">
      <input type="text" placeholder="Degree" class="degree" />
      <input type="text" placeholder="Institution" class="institution" />
      <input type="text" placeholder="Duration" class="eduDuration" />
      <input type="text" placeholder="Grade" class="grade" />
    </div>`;
}

function addProject() {
  const container = document.getElementById("projectSection");
  container.innerHTML += `
    <div class="project-entry">
      <input type="text" placeholder="Project Title" class="projectTitle" />
      <textarea placeholder="Description" class="projectDesc"></textarea>
      <input type="text" placeholder="Project Link" class="projectLink" />
    </div>`;
}

resumeForm.addEventListener("submit", function(e) {
  e.preventDefault();

  const name = document.getElementById("fullName").value;
  const title = document.getElementById("title").value;
  const profile = document.getElementById("profile").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const address = document.getElementById("address").value;
  const guardian = document.getElementById("guardian").value;
  const github = document.getElementById("github").value;
  const skills = document.getElementById("skills").value;
  const languages = document.getElementById("languages").value;
  const hobbies = document.getElementById("hobbies").value;

  const experiences = Array.from(document.querySelectorAll(".exp-entry")).map(exp => {
    const job = exp.querySelector(".jobTitle").value;
    const company = exp.querySelector(".company").value;
    const duration = exp.querySelector(".duration").value;
    const details = exp.querySelector(".jobDetails").value;
    return job && company ? `<strong>${job}</strong> at ${company} (${duration})<br>${details}<br>` : '';
  }).join("");

  const educations = Array.from(document.querySelectorAll(".edu-entry")).map(edu => {
    const degree = edu.querySelector(".degree").value;
    const institution = edu.querySelector(".institution").value;
    const duration = edu.querySelector(".eduDuration").value;
    const grade = edu.querySelector(".grade").value;
    return `<strong>${degree}</strong> at ${institution} (${duration})<br>Grade: ${grade}<br>`;
  }).join("");

  const projects = Array.from(document.querySelectorAll(".project-entry")).map(proj => {
    const title = proj.querySelector(".projectTitle").value;
    const desc = proj.querySelector(".projectDesc").value;
    const link = proj.querySelector(".projectLink").value;
    return title ? `<strong>${title}</strong><br>${desc}<br>${link ? `<a href="${link}">${link}</a>` : ''}<br>` : '';
  }).join("");

  const imgFile = document.getElementById("profileImage").files[0];
  const reader = new FileReader();

  reader.onloadend = () => {
    preview.innerHTML = `
      <img src="${reader.result}" />
      <h2>${name}</h2>
      <h3>${title}</h3>
      <p><strong>Profile:</strong> ${profile}</p>
      <p>📧 ${email} | 📞 ${phone} | 📍 ${address}</p>
      <p><strong>Guardian:</strong> ${guardian}</p>
      ${github ? `<p><strong>GitHub:</strong> <a href="${github}">${github}</a></p>` : ""}
      <h3>Experience</h3>${experiences}
      <h3>Education</h3>${educations}
      ${projects ? `<h3>Projects</h3>${projects}` : ""}
      <h3>Skills</h3><p>${skills}</p>
      <h3>Languages</h3><p>${languages}</p>
      <h3>Hobbies</h3><p>${hobbies}</p>
    `;
  };

  if (imgFile) reader.readAsDataURL(imgFile);
});

downloadBtn.addEventListener("click", () => {
  const element = document.getElementById("resumePreview");
  html2pdf().from(element).save("resume.pdf");
});

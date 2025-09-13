const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

function addTask(text) {
  const li = document.createElement("li");
  li.textContent = text;
  taskList.appendChild(li);
}

function randomMathProblem() {
  const a = Math.floor(Math.random() * 50) + 20;
  const b = Math.floor(Math.random() * 50) + 20;
  const op = Math.random() > 0.5 ? "+" : "*";
  const question = `${a} ${op} ${b}`;
  const answer = op === "+" ? a + b : a * b;
  return { question, answer };
}

// ---------- Modal Helper ----------
function showModal(message, options = [], disableClose = false) {
  return new Promise((resolve) => {
    const overlay = document.createElement("div");
    overlay.className = "modal-overlay";

    const box = document.createElement("div");
    box.className = "modal-box";

    const msg = document.createElement("p");
    msg.textContent = message;

    box.appendChild(msg);

    options.forEach(opt => {
      if (opt.type === "button") {
        const btn = document.createElement("button");
        btn.textContent = opt.label;
        if (opt.class) btn.classList.add(opt.class);
        btn.onclick = () => {
          document.body.removeChild(overlay);
          resolve(opt.value);
        };
        box.appendChild(btn);
      } else if (opt.type === "input") {
        const input = document.createElement("input");
        input.type = "text";
        input.placeholder = opt.placeholder || "";
        input.style.marginBottom = "10px";
        box.appendChild(input);

        const btn = document.createElement("button");
        btn.textContent = opt.label;
        btn.onclick = () => {
          document.body.removeChild(overlay);
          resolve(input.value);
        };
        box.appendChild(btn);
      } else if (opt.type === "link") {
        const a = document.createElement("a");
        a.href = opt.href;
        a.target = "_blank";
        a.textContent = opt.label;
        a.onclick = () => {
          document.body.removeChild(overlay);
          resolve(opt.value);
        };
        box.appendChild(a);
      } else if (opt.type === "scrollbox") {
        const scrollDiv = document.createElement("div");
        scrollDiv.style.height = "150px";
        scrollDiv.style.overflowY = "scroll";
        scrollDiv.style.border = "1px solid #aaa";
        scrollDiv.style.margin = "10px 0";
        scrollDiv.style.padding = "5px";
        scrollDiv.style.textAlign = "left";
        scrollDiv.innerHTML = opt.content;
        box.appendChild(scrollDiv);

        const btn = document.createElement("button");
        btn.textContent = opt.label;
        btn.disabled = true;
        scrollDiv.onscroll = () => {
          if (scrollDiv.scrollTop + scrollDiv.clientHeight >= scrollDiv.scrollHeight) {
            btn.disabled = false;
          }
        };
        btn.onclick = () => {
          document.body.removeChild(overlay);
          resolve(opt.value);
        };
        box.appendChild(btn);
      }
    });

    overlay.appendChild(box);
    document.body.appendChild(overlay);
  });
}

// ---------- Dynamic Loading Sequence ----------
async function showLoadingSequence() {
  return new Promise((resolve) => {
    const overlay = document.createElement("div");
    overlay.className = "modal-overlay";

    const box = document.createElement("div");
    box.className = "modal-box";

    const msg = document.createElement("p");
    msg.textContent = "Initializing...";

    const progress = document.createElement("div");
    progress.style.width = "100%";
    progress.style.height = "20px";
    progress.style.background = "#222";
    progress.style.borderRadius = "10px";
    progress.style.overflow = "hidden";
    progress.style.marginBottom = "15px";

    const bar = document.createElement("div");
    bar.style.height = "100%";
    bar.style.width = "0%";
    bar.style.background = "#00ff88";
    bar.style.transition = "width 0.2s linear";

    progress.appendChild(bar);
    box.appendChild(progress);
    box.appendChild(msg);
    overlay.appendChild(box);
    document.body.appendChild(overlay);

    const funnyMsgs = [
      "Capturing the JMLs to shoot mockingbird protocol TTLS...",
      "Establishing console.org commands...",
      "Recommitting changes to ZBLL algorithms...",
      "Encrypting 4D hypercube pathways...",
      "Reticulating splines...",
      "Performing quantum checksum...",
      "Verifying human sarcasm detector..."
    ];

    let i = 0;
    const msgInterval = setInterval(() => {
      msg.textContent = funnyMsgs[i % funnyMsgs.length];
      i++;
    }, 1500);

    setTimeout(() => { bar.style.width = "30%"; }, 1500);
    setTimeout(() => { bar.style.width = "97%"; }, 2000);
    setTimeout(() => {
      bar.style.transition = "width 7.5s linear";
      bar.style.width = "100%";
    }, 2500);

    setTimeout(() => {
      clearInterval(msgInterval);
      document.body.removeChild(overlay);
      resolve();
    }, 10000);
  });
}

// ---------- Fake Captcha ----------
async function showFakeCaptcha() {
  let firstTry = true;
  while (true) {
    const result = await showModal("Check 'I'm not a robot' to proceed:", [
      { type: "button", label: "I'm not a robot", value: true }
    ]);
    if (result) return;
    if (firstTry) {
      alert("Verification failed. Try again.");
      firstTry = false;
    } else {
      return;
    }
  }
}

// ---------- Task Approval Committee ----------
async function taskApprovalReview() {
  // Create overlay and box
  const overlay = document.createElement("div");
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.background = "rgba(0,0,0,0.7)";
  overlay.style.display = "flex";
  overlay.style.justifyContent = "center";
  overlay.style.alignItems = "center";
  overlay.style.zIndex = "9999";

  const box = document.createElement("div");
  box.style.background = "#111";
  box.style.color = "#0f0";
  box.style.padding = "20px";
  box.style.borderRadius = "10px";
  box.style.textAlign = "center";
  box.style.width = "400px";

  const msg = document.createElement("p");
  msg.textContent = "Your task is being reviewed by the International Task Approval Committee…";

  box.appendChild(msg);
  overlay.appendChild(box);
  document.body.appendChild(overlay);

  // Wait 3 seconds
  await new Promise((resolve) => setTimeout(resolve, 3000));

  // Remove overlay
  document.body.removeChild(overlay);
}


// ---------- Terms of Service Scroll ----------
async function showTermsOfService() {
  const fakeText = Array(20).fill("Lorem ipsum dolor sit amet, consectetur adipiscing elit.").join("<br>");
  await showModal("Please scroll through and accept the terms:", [
    { type: "scrollbox", label: "Accept", value: true, content: fakeText }
  ]);
}

// ---------- Main Flow ----------
addBtn.addEventListener("click", async () => {
  const text = taskInput.value.trim();
  if (!text) return;

  const step1 = await showModal("Are you sure you want to add task?", [
    { type: "button", label: "Yes", value: true },
    { type: "button", label: "No", value: false, class: "no" }
  ]);
  if (!step1) return;

  const step2 = await showModal("Nah bro fr this time?", [
    { type: "button", label: "Yes", value: true },
    { type: "button", label: "No", value: false, class: "no" }
  ]);
  if (!step2) return;

  // Math Problem
  const { question, answer } = randomMathProblem();
  const step3 = await showModal(`Solve this: ${question}`, [
    { type: "input", label: "Submit", value: "submit" }
  ]);
  if (parseInt(step3) !== answer) {
    alert("😂 Wrong answer, no task for you.");
    return;
  }

  // Fake Captcha
  await showFakeCaptcha();

  // Rickroll Verification
  await showModal("For verification purposes click this link:", [
    { type: "link", label: "Verify Me 😈", href: "https://bit.ly/3neRJt2", value: true }
  ]);

  // Terms of Service Scroll
  await showTermsOfService();

  // Loading bar
  await showLoadingSequence();

  // Task Approval Committee
  await taskApprovalReview();

  // Final length check
  if (text.length < 20) {
    alert("Task is not of sufficient length");
    return;
  }

  addTask(text);
  taskInput.value = "";
});

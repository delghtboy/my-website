// Fade-in page transition
window.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("fade-in");
});

// Registration Handler
const regForm = document.getElementById("registerForm");
if (regForm) {
  regForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("regName").value;
    const email = document.getElementById("regEmail").value;
    const password = document.getElementById("regPassword").value;
    const user = { name, email, password };
    localStorage.setItem("user", JSON.stringify(user));
    alert("Registration successful!");
    window.location.href = "login.html";
  });
}

// Login Handler
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.email === email && storedUser.password === password) {
      localStorage.setItem("loggedIn", "true");
      window.location.href = "dashboard.html";
    } else {
      alert("Invalid credentials!");
    }
  });
}

// Dashboard Display
if (window.location.pathname.includes("dashboard.html")) {
  const isLoggedIn = localStorage.getItem("loggedIn") === "true";
  const user = JSON.parse(localStorage.getItem("user"));
  if (!isLoggedIn || !user) {
    window.location.href = "login.html";
  } else {
    document.getElementById("userName").textContent = user.name;
    document.getElementById("userEmail").textContent = user.email;
  }
}

// Profile Form Handler
const profileForm = document.getElementById("profileForm");
if (profileForm) {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    alert("Please log in.");
    window.location.href = "login.html";
  } else {
    document.getElementById("profileName").value = user.name;
    document.getElementById("profileEmail").value = user.email;
  }

  profileForm.addEventListener("submit", (e) => {
    e.preventDefault();
    user.name = document.getElementById("profileName").value;
    localStorage.setItem("user", JSON.stringify(user));
    alert("Profile updated successfully!");
    window.location.href = "dashboard.html";
  });
}

// Logout
function logout() {
  localStorage.removeItem("loggedIn");
  window.location.href = "login.html";
}

// Fade-out effect on page leave
document.querySelectorAll('a[href]').forEach(link => {
  link.addEventListener('click', function (e) {
    const href = link.getAttribute('href');
    if (href.startsWith('#') || href.startsWith('javascript')) return;

    e.preventDefault();
    document.body.classList.remove('fade-in');
    document.body.style.opacity = 0;

    setTimeout(() => {
      window.location.href = href;
    }, 300); // match this with transition duration
  });
});
function loginUser(event) {
  event.preventDefault();

  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  const storedUser = JSON.parse(localStorage.getItem("user"));

  if (storedUser && storedUser.email === email && storedUser.password === password) {
    // ✅ Save login state
    localStorage.setItem("loggedIn", "true");

    // 👉 Redirect to dashboard
    window.location.href = "dashboard.html";
  } else {
    alert("Invalid email or password!");
  }
}

// ✅ 3D Background using Three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("bg-canvas"),
});
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.z = 5;

const geometry = new THREE.TorusGeometry(1, 0.4, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0x00ffcc });
const torus = new THREE.Mesh(geometry, material);
scene.add(torus);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

function animate() {
  requestAnimationFrame(animate);
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// ✅ Profile Image Hover Animation
const profileImg = document.querySelector(".profile-img");
if (profileImg) {
  profileImg.addEventListener("mouseenter", () => {
    profileImg.style.transform = "scale(1.05) rotateY(10deg)";
  });
  profileImg.addEventListener("mouseleave", () => {
    profileImg.style.transform = "scale(1) rotateY(0deg)";
  });
}

// ✅ Admin Profile Picture Edit
const isAdmin = true;
const editBtn = document.querySelector(".edit-btn");
const fileInput = document.getElementById("profile-upload");
const profileImage = document.getElementById("profile-preview");

if (isAdmin && editBtn) editBtn.style.display = "block";

const savedImage = localStorage.getItem("jyothiProfileImg");
if (savedImage) profileImage.src = savedImage;

fileInput.addEventListener("change", () => {
  const file = fileInput.files[0];
  if (file && file.type.startsWith("image/")) {
    const reader = new FileReader();
    reader.onload = function (e) {
      profileImage.src = e.target.result;
      localStorage.setItem("jyothiProfileImg", e.target.result);
      showToast("Image updated successfully!");
    };
    reader.readAsDataURL(file);
  }
});

function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerText = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.classList.add("show"), 100);
  setTimeout(() => toast.remove(), 3000);
}

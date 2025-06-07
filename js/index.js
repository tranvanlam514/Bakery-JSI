document.addEventListener("DOMContentLoaded", function () {
  const loginBtn = document.getElementById("loginBtn");
  const userAvatar = document.getElementById("userAvatar");
  const logoutBtn = document.getElementById("logoutBtn");

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // Người dùng đã đăng nhập
      loginBtn.style.display = "none";
      userAvatar.style.display = "inline-block";
      logoutBtn.style.display = "inline-block";
    } else {
      // Chưa đăng nhập
      loginBtn.style.display = "inline-block";
      userAvatar.style.display = "none";
      logoutBtn.style.display = "none";
    }
  });

  // Xử lý khi bấm nút Logout
  logoutBtn.addEventListener("click", function () {
    firebase.auth().signOut().then(() => {
      alert("Đăng xuất thành công!");
      window.location.reload();
    }).catch((error) => {
      console.error("Đăng xuất thất bại: ", error);
    });
  });
});
  let slideIndex = 0;
  showSlides();


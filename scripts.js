// scripts.js
document.addEventListener("DOMContentLoaded", function(){
  // year
  document.getElementById("year").textContent = new Date().getFullYear();

  // mobile nav toggle
  const navToggle = document.querySelector(".nav-toggle");
  navToggle?.addEventListener("click", () => {
    const nav = document.querySelector(".nav");
    if(!nav) return;
    if(nav.style.display === "flex") nav.style.display = "";
    else nav.style.display = "flex";
  });

  // form handling: build mailto with form content
  const form = document.getElementById("contactForm");
  const mailtoBtn = document.getElementById("mailtoBtn");
  const toEmail = "info@example.com"; // ここを書き換えてください

  function buildMailto(data){
    const subject = encodeURIComponent(`[お問い合わせ] ${data.subject || "サービス相談"}`);
    const bodyLines = [
      `お名前: ${data.name}`,
      `会社名: ${data.company || "-"}`,
      `メール: ${data.email}`,
      ``,
      `ご相談内容:`,
      `${data.message}`
    ];
    const body = encodeURIComponent(bodyLines.join("\n"));
    return `mailto:${toEmail}?subject=${subject}&body=${body}`;
  }

  form?.addEventListener("submit", function(e){
    e.preventDefault();
    // simple validation
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
    const company = document.getElementById("company").value.trim();

    if(!name || !email || !message){
      alert("必須項目（お名前、メール、相談内容）を入力してください。");
      return;
    }
    const mailto = buildMailto({name, company, email, message, subject: "お問い合わせ"});
    window.location.href = mailto;
  });

  mailtoBtn?.addEventListener("click", function(){
    // open mail client with empty template
    const mailto = `mailto:${toEmail}?subject=${encodeURIComponent("お問い合わせ（ウェブ）")}&body=${encodeURIComponent("こちらにご相談内容を入力してください。\n\n---\n")}`;
    window.location.href = mailto;
  });
});

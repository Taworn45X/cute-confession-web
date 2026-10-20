// ========================================================
// 💖 CUTE CONFESSION WEB - CONFIGURATION FILE 💖
// สไตล์กวนๆ น่ารัก เบียวๆ ไม่เลี่ยน!
// ========================================================

const CONFIG = {
  // สรรพนามหรือชื่อเล่น
  senderName: "เค้า",
  receiverName: "เธอ",

  // ลิงก์เพลงพื้นหลัง (BGM) - ค่าเริ่มต้นใช้ระบบดนตรี Music Box สังเคราะห์ละมุน (ทำงานได้ 100% ทุกเครื่อง)
  // หรือสามารถใส่ลิงก์ MP3 ของคุณเองได้ เช่น "assets/my_song.mp3"
  bgmUrl: "",

  // วันที่เริ่มคบ (ถ้าปล่อยเป็น "auto" จะดึงวันที่ปัจจุบันตอนกดตกลง)
  relationshipDate: "auto",

  // เนื้อหาแต่ละหน้า (สไลด์ 1 - 4)
  slides: [
    {
      id: 1,
      badge: "✨ Chapter 1",
      title: "นี้มันก็น่าจะนานแล้วนะ",
      highlight: "ที่รู้จักกันมา...",
      subtext: "แตะหน้าจอไปต่อดิ๊ 💌",
      gif: "assets/slide1_shy.gif",
      altText: "Peach and Goma Hug"
    },
    {
      id: 2,
      badge: "🥺 สารภาพตรงๆ",
      title: "ขอโทษที่ใช้เวลานาน",
      highlight: "ขนาดนี้นะครับ...",
      subtext: "แตะอีกที ฟังต่อก่อนนะ 🤍",
      gif: "assets/slide2_plead.gif",
      altText: "Pleading cat"
    },
    {
      id: 3,
      badge: "🔥 เข้าสู่ช่วงจริงจัง",
      title: "เค้าว่ามันถึงเวลาแล้วละ...",
      highlight: "ที่จะต้องพูดตรงๆ",
      subtext: "ตั้งสติดีๆ ห้ามกะพริบตา... 😳",
      gif: "assets/slide3_heartbeat.gif",
      altText: "Heartbeat cat"
    },
    {
      id: 4,
      badge: "🎮 สำคัญมาก!",
      title: "ขอตังเติมเกมหน่อยยยจิ",
      highlight: "----- หยอกกก!!! 🤣",
      subtext: "ฮ่าๆๆ ล้อเล่นน! ของจริงอยู่อีกหน้า แตะเลย 🚀",
      gif: "assets/slide4_anya_smug.gif",
      altText: "Anya Smug Face"
    }
  ],

  // สไลด์ที่ 5: หน้าถามความในใจ (The Question)
  questionSlide: {
    badge: "⚔️ Final Boss Stage",
    title: "เป็นแฟนกันไหม?",
    subtext: "ตอบดีๆ นะ ตอบผิดแมวต่อยจริงด้วย 55555 🥊",
    gif: "assets/slide5_love.gif",
    yesBtnText: "เป็นดิ รอนานละ 💖",
    noBtnText: "ไม่เป็น 😐",
    noAttempts: [
      "เอ๊ะ มือลั่นหรอ? ลองใหม่ดิ๊ 🤨",
      "อย่ามาเล่นตัวนะบอกเลย! 😾",
      "บอกให้เป็นไง จะกวนหรอออ! 💢",
      "ปุ่มนี้ไม่ให้กดแล้ววว โดนแบน! 🚫",
      "หนีแล้ว! แบร่ ไม่ต้องกด 😜"
    ]
  },

  // มีมแมวต่อยเมื่อกด "ไม่เป็น"
  catPunch: {
    gif: "assets/cat_punch.gif",
    soundEffect: "punch",
    messages: [
      "เดี๋ยวเถอะ!! เล่นตัวนักนะ! 😾👊",
      "บอกให้กดอีกปุ่มไงเล่าา!! 💥",
      "กล้าปฏิเสธหรอ ห๊ะะะ เดี๋ยวโดน!! 🥊",
      "ต่อยจริงนะจะบอกให้ ไม่ได้โม้!! 😾💢"
    ]
  },

  // หน้าสุดท้ายเมื่อกด "เป็น" (Tokyo Ghoul Kaneki Ken)
  ending: {
    badge: "🎉 ปลดล็อกฉายา: ไม่โสดแล้วนะ!",
    title: "ฮิๆๆๆๆ ฉันรู้อยู่แล้วละ! 😈✨",
    subtitle: "ตกหลุมพรางเรียบร้อย! แคปหลักฐานไว้หมดแล้ว ห้ามคืนคำ 55555",
    characters: [
      {
        name: "Kaneki ยิ้มแห่งความมืด",
        gif: "assets/kaneki_laugh.gif",
        quote: "\"ทุกอย่างเป็นไปตามแผนการของฉันตั้งแต่แรก... ฮิๆๆๆ\" 🖤⚡"
      },
      {
        name: "Kaneki ดวงตาสีเลือด",
        gif: "assets/kaneki_knuckle.gif",
        quote: "\"1000 ลบ 7 ได้เท่าไหร่...? ได้เป็นแฟนกันไง จบนะ!\" 🩸"
      }
    ],
    lineShareMessage: "แคปหลักฐานไว้หมดแล้วนะ! เป็นแฟนกันเรียบร้อย ห้ามคืนคำเด็ดขาดดด 55555 💖😈"
  }
};

if (typeof module !== "undefined") {
  module.exports = CONFIG;
}

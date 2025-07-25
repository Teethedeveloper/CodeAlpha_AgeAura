document.getElementById('ageForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const dobInput = document.getElementById('dob');
  const dob = dobInput.value;
  const validationMsg = document.getElementById('validationMsg');
  const resultDiv = document.getElementById('result');
  const loader = document.getElementById('loader');

  // Clear previous messages & styles
  validationMsg.textContent = '';
  validationMsg.classList.remove('show');
  dobInput.classList.remove('input-error');
  resultDiv.classList.remove('show');
  resultDiv.innerHTML = '';

  if (!dob) {
    validationMsg.textContent = '🚨 Please enter your date of birth to continue.';
    validationMsg.classList.add('show');
    dobInput.classList.add('input-error');
    dobInput.focus();
    return;
  }

  loader.classList.remove('hidden');

  setTimeout(() => {
    const birthDate = new Date(dob);
    const today = new Date();

    if (birthDate > today) {
      validationMsg.textContent = '🚫 Future dates are invalid.';
      validationMsg.classList.add('show');
      loader.classList.add('hidden');
      dobInput.classList.add('input-error');
      dobInput.focus();
      return;
    }

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += prevMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    const { sign, traits, emoji, color } = getZodiacSign(birthDate.getDate(), birthDate.getMonth() + 1);
    resultDiv.innerHTML = `
      <div class="zodiac-card" style="--theme: ${color};">
        <div class="zodiac-emoji">${emoji}</div>
        <div class="zodiac-sign">${sign}</div>
        <div class="zodiac-traits">${traits}</div>
        <div class="zodiac-age">
          🎉 You are <strong>${years}</strong> years, <strong>${months}</strong> months, and <strong>${days}</strong> days old.
        </div>
      </div>
    `;
    loader.classList.add('hidden');
    resultDiv.classList.add('show');
  }, 1500);
});

document.getElementById('resetBtn').addEventListener('click', () => {
  const dobInput = document.getElementById('dob');
  const validationMsg = document.getElementById('validationMsg');
  const resultDiv = document.getElementById('result');
  const loader = document.getElementById('loader');

  dobInput.value = '';
  validationMsg.textContent = '';
  validationMsg.classList.remove('show');
  dobInput.classList.remove('input-error');
  resultDiv.innerHTML = '';
  resultDiv.classList.remove('show');
  loader.classList.add('hidden');
});

function getZodiacSign(day, month) {
  const signs = [
    { sign: "Capricorn", emoji: "♑", color: "#3e4e50", from: [12, 22], to: [1, 19], traits: "Disciplined, grounded, and ambitious. A spiritual warrior of goals." },
    { sign: "Aquarius", emoji: "♒", color: "#00bcd4", from: [1, 20], to: [2, 18], traits: "Free spirit of the stars. Unique, visionary, and electric." },
    { sign: "Pisces", emoji: "♓", color: "#6a5acd", from: [2, 19], to: [3, 20], traits: "Mystical, empathetic, artistic — you dream in color and feel in galaxies." },
    { sign: "Aries", emoji: "♈", color: "#e53935", from: [3, 21], to: [4, 19], traits: "Fiery, bold, fearless. A cosmic leader wrapped in power." },
    { sign: "Taurus", emoji: "♉", color: "#7e57c2", from: [4, 20], to: [5, 20], traits: "Earthy, sensual, unshakable. Lover of beauty and luxury." },
    { sign: "Gemini", emoji: "♊", color: "#ffd600", from: [5, 21], to: [6, 20], traits: "Dual soul, quick mind. A communicator of the multiverse." },
    { sign: "Cancer", emoji: "♋", color: "#00acc1", from: [6, 21], to: [7, 22], traits: "Emotional depth, maternal magic. A nurturing light." },
    { sign: "Leo", emoji: "♌", color: "#fbc02d", from: [7, 23], to: [8, 22], traits: "Royal, radiant, untamed. A born ruler of fire and flair." },
    { sign: "Virgo", emoji: "♍", color: "#43a047", from: [8, 23], to: [9, 22], traits: "Logical healer. Order-bringer with crystal clarity." },
    { sign: "Libra", emoji: "♎", color: "#e91e63", from: [9, 23], to: [10, 22], traits: "Charming balancer of energy. You make beauty divine." },
    { sign: "Scorpio", emoji: "♏", color: "#8e24aa", from: [10, 23], to: [11, 21], traits: "Mysterious force. Intense, transformative, divine." },
    { sign: "Sagittarius", emoji: "♐", color: "#fb8c00", from: [11, 22], to: [12, 21], traits: "Wanderer of truths. Philosophical spark and freedom fire." }
  ];

  for (const z of signs) {
    if ((month === z.from[0] && day >= z.from[1]) || (month === z.to[0] && day <= z.to[1])) {
      return z;
    }
  }

  return {
    sign: "Unknown",
    emoji: "✨",
    color: "#777",
    traits: "An enigma among the stars. You defy definition."
  };
}



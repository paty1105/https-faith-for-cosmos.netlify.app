// Faith for the Cosmos: interactive self-check questions
// Simple, ungraded, instant-feedback only. Nothing here saves to Supabase.

function checkMC(button, correctValue) {
  const container = button.closest(".check-question");
  const selected = container.querySelector("input[type='radio']:checked");
  const feedback = container.querySelector(".feedback");

  if (!selected) {
    feedback.textContent = "Choose an answer first.";
    feedback.className = "feedback error-msg";
    return;
  }

  if (selected.value === correctValue) {
    feedback.textContent = container.dataset.correctMsg || "Correct.";
    feedback.className = "feedback correct-msg";
  } else {
    feedback.textContent = container.dataset.incorrectMsg || "Not quite, take another look.";
    feedback.className = "feedback incorrect-msg";
  }
}

function checkBlank(button) {
  const wrapper = button.closest(".blank-wrapper");
  const input = wrapper.querySelector(".blank-input");
  const feedback = wrapper.querySelector(".feedback");
  const accepted = input.dataset.answer.split("|").map((s) => s.trim().toLowerCase());
  const given = input.value.trim().toLowerCase();

  if (!given) {
    feedback.textContent = "Type an answer first.";
    feedback.className = "feedback error-msg";
    return;
  }

  if (accepted.includes(given)) {
    feedback.textContent = "Correct.";
    feedback.className = "feedback correct-msg";
  } else {
    feedback.textContent = "Not quite, the module text above has the answer.";
    feedback.className = "feedback incorrect-msg";
  }
}

function checkDropdown(select) {
  const wrapper = select.closest(".dropdown-wrapper");
  const feedback = wrapper.querySelector(".feedback");
  const correct = select.dataset.answer;

  if (!select.value) {
    feedback.textContent = "";
    return;
  }

  if (select.value === correct) {
    feedback.textContent = "Correct.";
    feedback.className = "feedback correct-msg";
  } else {
    feedback.textContent = "Not quite, take another look.";
    feedback.className = "feedback incorrect-msg";
  }
}

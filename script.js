document.addEventListener("DOMContentLoaded", () => {
  const circles = document.querySelectorAll(".circle");
  const lines = document.querySelectorAll(".line");
  const prevButton = document.getElementById("prev");
  const nextButton = document.getElementById("next");
  const instructions = document.getElementById("instructions");
  let currentStep = parseInt(localStorage.getItem("currentStep")) || 1;

  const updateProgress = () => {
    circles.forEach((circle, idx) => {
      if (idx < currentStep) {
        circle.classList.add("active", "completed");
        if (
          circle.nextElementSibling &&
          circle.nextElementSibling.classList.contains("line")
        ) {
          circle.nextElementSibling.classList.add("completed");
        }
      } else {
        circle.classList.remove("active", "completed");
        if (
          circle.nextElementSibling &&
          circle.nextElementSibling.classList.contains("line")
        ) {
          circle.nextElementSibling.classList.remove("completed");
        }
      }
    });

    instructions.textContent = `Step ${currentStep} of ${circles.length}`;

    prevButton.disabled = currentStep === 1;
    nextButton.disabled = currentStep === circles.length;

    localStorage.setItem("currentStep", currentStep);

    // Update lines position
    updateLines();
  };

  const updateLines = () => {
    circles.forEach((circle, idx) => {
      if (
        circle.nextElementSibling &&
        circle.nextElementSibling.classList.contains("line")
      ) {
        const line = circle.nextElementSibling;
        const circleRect = circle.getBoundingClientRect();
        const nextCircleRect =
          circle.nextElementSibling.nextElementSibling.getBoundingClientRect();

        const progressContainerRect = document
          .querySelector(".progress-container")
          .getBoundingClientRect();

        const startX = circleRect.right - progressContainerRect.left;
        const endX = nextCircleRect.left - progressContainerRect.left;

        line.style.left = `${startX}px`;
        line.style.width = `${endX - startX}px`;
      }
    });
  };

  const goToStep = (step) => {
    if (step < 1 || step > circles.length) return;
    currentStep = step;
    updateProgress();
  };

  prevButton.addEventListener("click", () => {
    goToStep(currentStep - 1);
  });

  nextButton.addEventListener("click", () => {
    goToStep(currentStep + 1);
  });

  circles.forEach((circle) => {
    circle.addEventListener("click", () => {
      goToStep(parseInt(circle.getAttribute("data-step")));
    });
  });

  updateProgress();
});

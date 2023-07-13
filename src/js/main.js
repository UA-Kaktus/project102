document.addEventListener("DOMContentLoaded", () => {
	mobileMenu();

	function mobileMenu() {
		const switcher = document.querySelector(".menu__switcher");
		const menu = document.querySelector("nav.navigation");
		let mobMenuActive = false;

		switcher.addEventListener("click", () => {
			if (mobMenuActive) {
				switcher.classList.remove("menu__switcher_active");
				menu.style.left = "-30rem";
				mobMenuActive = false;
				document.body.style.overflow = "";
			} else {
				switcher.classList.add("menu__switcher_active");
				menu.style.left = 0;
				mobMenuActive = true;
				document.body.style.overflow = "hidden";
			}
		});
	}
});

document.addEventListener('DOMContentLoaded', () => {
    const menu = document.getElementById('mobile-menu');
    const openBtn = document.getElementById('menu-open-btn');
    const closeBtn = document.getElementById('menu-close-btn');

    console.log("Navigation elements status:", { menu, openBtn, closeBtn });
    // Edge guard clause to ensure code blocks do not crash standalone frames
    if (menu && openBtn && closeBtn) {
        // Open Mobile Navigation Drawer Panel Action Hook
        openBtn.addEventListener('click', () => {
            console.log("Hamburger menu button clicked!");
            menu.style.display = 'flex';
            setTimeout(() => {
                menu.classList.add('menu-active');
            }, 10);
        });

        // Close panel routine logic function
        const closeMenuRoutine = () => {
            console.log("Close menu button clicked!");
            menu.classList.remove('menu-active');
            setTimeout(() => {
                menu.style.display = 'none';
            }, 400);
        };

        closeBtn.addEventListener('click', closeMenuRoutine);

        // Close if user taps outside the cream panel bounding box area frame
        window.addEventListener('click', (e) => {
            if (e.target === menu) {
                closeMenuRoutine();
            }
        });
    } else {
        console.error("Missing responsive HTML element hooks inside this layout framework!");
    }
});

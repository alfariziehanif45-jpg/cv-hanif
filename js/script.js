/* =================================
   TYPING EFFECT
================================= */

const typingElement =
    document.getElementById("typing");

const texts = [

    "Web Developer",

    "Mobile Developer",

    "UI Designer",

    "Tech Enthusiast"

];


let textIndex = 0;

let charIndex = 0;

let deleting = false;


function typingEffect() {


    const currentText =
        texts[textIndex];


    if (!deleting) {


        typingElement.textContent =
            currentText.substring(
                0,
                charIndex + 1
            );


        charIndex++;


        if (
            charIndex ===
            currentText.length
        ) {


            deleting = true;


            setTimeout(
                typingEffect,
                1500
            );


            return;

        }


    } else {


        typingElement.textContent =
            currentText.substring(
                0,
                charIndex - 1
            );


        charIndex--;


        if (charIndex === 0) {


            deleting = false;


            textIndex++;


            if (
                textIndex >=
                texts.length
            ) {

                textIndex = 0;

            }

        }

    }


    setTimeout(

        typingEffect,

        deleting
            ? 60
            : 100

    );

}


typingEffect();



/* =================================
   SCROLL REVEAL
================================= */

const reveals =
    document.querySelectorAll(
        ".reveal"
    );


function revealOnScroll() {


    const windowHeight =
        window.innerHeight;


    reveals.forEach(
        element => {


            const elementTop =
                element
                    .getBoundingClientRect()
                    .top;


            if (
                elementTop <
                windowHeight - 100
            ) {


                element.classList.add(
                    "active"
                );

            }

        }
    );

}


window.addEventListener(
    "scroll",
    revealOnScroll
);


revealOnScroll();



/* =================================
   SKILL ANIMATION
================================= */

const skillProgress =
    document.querySelectorAll(
        ".skill-progress"
    );


function animateSkills() {


    skillProgress.forEach(
        progress => {


            const rect =
                progress
                    .getBoundingClientRect();


            if (
                rect.top <
                window.innerHeight - 100
            ) {


                progress.style.width =
                    progress.dataset.width;

            }

        }
    );

}


window.addEventListener(
    "scroll",
    animateSkills
);


animateSkills();



/* =================================
   MOBILE MENU
================================= */

const menuToggle =
    document.querySelector(
        ".menu-toggle"
    );


const navMenu =
    document.querySelector(
        ".nav-menu"
    );


menuToggle.addEventListener(
    "click",
    () => {


        navMenu.classList.toggle(
            "active"
        );

    }
);



/* =================================
   CLOSE MOBILE MENU
================================= */

document
    .querySelectorAll(
        ".nav-menu a"
    )
    .forEach(
        link => {


            link.addEventListener(
                "click",
                () => {


                    navMenu.classList.remove(
                        "active"
                    );

                }
            );

        }
    );



/* =================================
   PROJECT FILTER
================================= */

const filterButtons =
    document.querySelectorAll(
        ".filter-btn"
    );


const projectCards =
    document.querySelectorAll(
        ".project-card"
    );


const projectCategories =
    document.querySelectorAll(
        ".project-category"
    );


filterButtons.forEach(
    button => {


        button.addEventListener(
            "click",
            () => {


                /* ACTIVE BUTTON */

                filterButtons.forEach(
                    btn => {

                        btn.classList.remove(
                            "active"
                        );

                    }
                );


                button.classList.add(
                    "active"
                );


                const filter =
                    button.dataset.filter;



                /* ALL */

                if (
                    filter === "all"
                ) {


                    projectCards.forEach(
                        card => {

                            card.style.display =
                                "block";

                        }
                    );


                    projectCategories.forEach(
                        category => {

                            category.style.display =
                                "block";

                        }
                    );


                    return;

                }



                /* FILTER CARD */

                projectCards.forEach(
                    card => {


                        const category =
                            card.dataset.category;


                        if (
                            category ===
                            filter
                        ) {

                            card.style.display =
                                "block";

                        } else {

                            card.style.display =
                                "none";

                        }

                    }
                );



                /* HIDE EMPTY CATEGORY */

                projectCategories.forEach(
                    category => {


                        const visibleCards =
                            category.querySelectorAll(
                                `.project-card[data-category="${filter}"]`
                            );


                        if (
                            visibleCards.length === 0
                        ) {

                            category.style.display =
                                "none";

                        } else {

                            category.style.display =
                                "block";

                        }

                    }
                );

            }
        );

    }
);



/* =================================
   CERTIFICATE MODAL
================================= */

const modal =
    document.getElementById(
        "certificateModal"
    );


const modalImage =
    document.getElementById(
        "modalImage"
    );


const modalClose =
    document.getElementById(
        "modalClose"
    );


const certificateButtons =
    document.querySelectorAll(
        ".view-certificate"
    );


certificateButtons.forEach(
    button => {


        button.addEventListener(
            "click",
            () => {


                const image =
                    button.dataset.image;


                modalImage.src =
                    image;


                modal.classList.add(
                    "active"
                );


                document.body.style.overflow =
                    "hidden";

            }
        );

    }
);



/* CLOSE MODAL */

modalClose.addEventListener(
    "click",
    closeModal
);


modal.addEventListener(
    "click",
    event => {


        if (
            event.target === modal
        ) {

            closeModal();

        }

    }
);


function closeModal() {


    modal.classList.remove(
        "active"
    );


    document.body.style.overflow =
        "";

}



/* =================================
   ESC KEY
================================= */

document.addEventListener(
    "keydown",
    event => {


        if (
            event.key === "Escape"
        ) {

            closeModal();

        }

    }
);
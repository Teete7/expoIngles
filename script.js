// Simple JavaScript functionality for the store project
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Add smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === "#") return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 2. Add an interactive alert for the "Add to cart" buttons
    const cartButtons = document.querySelectorAll('.btn-cart');
    cartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Get the product name from the card
            const card = e.target.closest('.card');
            const productName = card.querySelector('h3').innerText;
            
            alert(`✅ Added to cart: ${productName}\nExcellent choice for your setup!`);
        });
    });

});

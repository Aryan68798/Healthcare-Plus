document.addEventListener('DOMContentLoaded', function () {
    const cards = document.querySelectorAll('.medicine-card');

    function updateSummary() {
        let totalQty = 0;
        let totalPrice = 0;

        cards.forEach(card => {
            const qtyEl = card.querySelector('.qty-value');
            const priceEl = card.querySelector('.medicine-price');
            const basePrice = parseFloat(priceEl.dataset.price) || 0;
            const qty = parseInt(qtyEl.textContent, 10) || 0;

            totalQty += qty;
            totalPrice += qty * basePrice;

            const displayPrice = qty > 0 ? (qty * basePrice) : basePrice;
            priceEl.textContent = '₹ ' + displayPrice.toFixed(2);
        });

        const totalQtyEl = document.querySelector('[data-total-qty]');
        const totalPriceEl = document.querySelector('[data-total-price]');

        if (totalQtyEl) totalQtyEl.textContent = totalQty;
        if (totalPriceEl) totalPriceEl.textContent = '₹ ' + totalPrice.toFixed(2);
    }

    cards.forEach(card => {
        const minusBtn = card.querySelector('.qty-btn.minus');
        const plusBtn = card.querySelector('.qty-btn.plus');
        const valueEl = card.querySelector('.qty-value');

        function changeQuantity(delta) {
            let current = parseInt(valueEl.textContent, 10) || 0;
            current += delta;
            if (current < 0) current = 0;
            valueEl.textContent = current;
            updateSummary();
        }

        if (minusBtn) {
            minusBtn.addEventListener('click', function () {
                changeQuantity(-1);
            });
        }

        if (plusBtn) {
            plusBtn.addEventListener('click', function () {
                changeQuantity(1);
            });
        }
    });
    updateSummary();
});



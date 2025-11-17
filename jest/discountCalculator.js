
function calculatePrice(price, type, member = "basic", couponOptions = {}) {
  const { coupon = false, couponType, discount } = couponOptions;

  let baseDiscount = 0;
  let memberDiscount = 0;

  if (type === "priceBase") {
    if (price >= 50000 && price < 100000) {
      baseDiscount = 0.05;
    } else if (price >= 100000 && price < 200000) {
      baseDiscount = 0.1;
    } else if (price >= 200000) {
      baseDiscount = 0.2;
    }
  }
  let result = price * (1 - baseDiscount);

  if (type === "memberBase") {
    if (member === "sliver") {
      memberDiscount = 0.02;
    } else if (member === "gold") {
      memberDiscount = 0.05;
    } else if (member === "vip") {
      memberDiscount = 0.1;
    }
    result = result * (1 - memberDiscount);
  }

  if (coupon) {
    const minPrice = price * 0.5;
    let next = result;

    if (couponType === "fixed") {
      next = result - discount;
    } else if (couponType === "percentage") {
      next = result * (1 - discount);
    }
    result = Math.max(next, minPrice);
  }
  return result;
}

module.exports = { calculatePrice };

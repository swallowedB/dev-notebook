const { calculatePrice } = require("./discountCalculator");

describe("상품 가격에 따른 금액 할인 계산", () => {
  // 1. 5만원 이상일 때 5% 할인
  test("5만원 이상일 때", () => {
    expect(calculatePrice(80000, "priceBase")).toBe(76000);
  });

  // 2. 10만원 이상일 때 10% 할인
  test("10만원 이상일 때", () => {
    expect(calculatePrice(150000, "priceBase")).toBe(135000);
  });
  // 3. 20만원 이상일 때 20% 할인
  test("20만원 이상일 때", () => {
    expect(calculatePrice(250000, "priceBase")).toBe(200000);
  });
});

describe("회원등급에 따른 금액 할인 계산", () => {
  // 1. 일반회원 - 추가할인 없음
  test("일반 회원일 때 추가 할인 없음", () => {
    expect(calculatePrice(40000, "memberBase", "basic")).toBe(40000);
  });

  // 2. 실버회원 - 추가 2% 할인
  test("실버 회원일 때 추가 2% 할인", () => {
    expect(calculatePrice(40000, "memberBase", "sliver")).toBe(39200);
  });
  // 3. 골드회원 - 추가 5% 할인
  test("골드 회원일 때 추가 5% 할인", () => {
    expect(calculatePrice(40000, "memberBase", "gold")).toBe(38000);
  });
  // 4. vip회원 - 추가 10% 할인
  test("vip 회원일 때 추가 10% 할인", () => {
    expect(calculatePrice(40000, "memberBase", "vip")).toBe(36000);
  });
});

describe("쿠폰 금액 할인 계산", () => {
  test("고정 금액 할인", () => {
    expect(
      calculatePrice(40000, "memberBase", "basic", {
        coupon: true,
        couponType: "fixed",
        discount: 2000,
      })
    ).toBe(38000);
  });

  test("비율 금액 할인", () => {
    expect(
      calculatePrice(40000, "memberBase", "basic", {
        coupon: true,
        couponType: "percentage",
        discount: 0.2,
      })
    ).toBe(32000);
  });
});

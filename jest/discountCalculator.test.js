const { calculatePrice } = require("./discountCalculator");

/*
[더 깔끔하고 좋은 코드를 위해]
1. 🔴 AAA 패턴으로 써보는 것이 좋다!


*/

describe("상품 가격에 따른 금액 할인 계산", () => {
  // 1. 5만원 이상일 때 5% 할인
  test("5만원 이상일 때", () => {
    // Arrange(준비)
    const price = 80000;
    const type = "priceBase";

    // Act(실행)
    const result = calculatePrice(price, type);

    // Assert(검증)
    expect(result).toBe(76000);
  });

  // 2. 10만원 이상일 때 10% 할인
  test("10만원 이상일 때", () => {
    const price = 150000;
    const type = "priceBase";

    const result = calculatePrice(price, type);
    expect(result).toBe(135000);
  });

  // 3. 20만원 이상일 때 20% 할인
  test("20만원 이상일 때", () => {
    const price = 250000;
    const type = "priceBase";

    const result = calculatePrice(price, type);
    expect(result).toBe(200000);
  });
});

describe("회원등급에 따른 금액 할인 계산", () => {
  // 1. 일반회원 - 추가할인 없음
  test("일반 회원일 때 추가 할인 없음", () => {
    const price = 40000;
    const type = "memberBase";
    const membership = "basic";

    const result = calculatePrice(price, type, membership);
    expect(result).toBe(40000);
  });

  // 2. 실버회원 - 추가 2% 할인
  test("실버 회원일 때 추가 2% 할인", () => {
    const price = 40000;
    const type = "memberBase";
    const membership = "sliver";

    const result = calculatePrice(price, type, membership);
    expect(result).toBe(39200);
  });
  // 3. 골드회원 - 추가 5% 할인
  test("골드 회원일 때 추가 5% 할인", () => {
    const price = 40000;
    const type = "memberBase";
    const membership = "gold";

    const result = calculatePrice(price, type, membership);
    expect(result).toBe(38000);
  });
  // 4. vip회원 - 추가 10% 할인
  test("vip 회원일 때 추가 10% 할인", () => {
    const price = 40000;
    const type = "memberBase";
    const membership = "vip";

    const result = calculatePrice(price, type, membership);
    expect(result).toBe(36000);
  });
});

describe("쿠폰 금액 할인 계산", () => {
  test("고정 금액 할인", () => {
    const price = 40000;
    const type = "memberBase";
    const membership = "basic";
    const couponOptions = {
      coupon: true,
      couponType: "fixed",
      discount: 2000,
    };

    const result = calculatePrice(price, type, membership, couponOptions);
    expect(result).toBe(38000);
  });

  test("비율 금액 할인", () => {
    const price = 40000;
    const type = "memberBase";
    const membership = "basic";
    const couponOptions = {
      coupon: true,
      couponType: "percentage",
      discount: 0.2,
    };
    const result = calculatePrice(price, type, membership, couponOptions);
    expect(result).toBe(32000);
  });
});

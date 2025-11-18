const { calculateDiscountedPrice } = require("./calculator");

test("20% 할인 적용 시 올바른 결과를 반환", () => {
  const price = 10000;

  const total = calculateDiscountedPrice(price, 20)

  expect(total).toBe(8000)
})

test("할인 적용 시 0보다 큰 유효한 가격이 반환", () => {
  const price = 1000;
  const total = calculateDiscountedPrice(price, 20);
  expect(total).toBeGreaterThan(0)
})

test("기본 가격, 할인 적용 후 가격이 기본가격보다 작은지 확인", () => {
  const price = 10000;
  const total = calculateDiscountedPrice(price, 20);
  expect(total).toBeLessThan(price)
})

test("유효하지 않은 이력 (음수 할인율)", () => {
  const price = 10000;
  expect(() => calculateDiscountedPrice(price, -10)).toThrow()
})
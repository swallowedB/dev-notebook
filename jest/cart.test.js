const { filterCartItems } = require("./cart");

const cart = [
  { name: "노트북", price: 1000 },
  { name: "마우스", price: 50 },
  { name: "휴대폰", price: 80 },
];

test("노트북을 필터링 했을 떄 노트북이 포함되어있는지 확인", () => {
  expect(filterCartItems(cart, "노트북")).toContain(cart[0]);
});


test("노트북을 필터링 했을 떄 노트북이 포함되어있는지 확인", () => {
  expect(filterCartItems(cart, "휴대폰")).not.toContain(cart[0]);
});

test("노트북을 필터링 했을 떄 노트북이 포함되어있는지 확인", () => {
  expect(filterCartItems(cart, "마우스")).toEqual([cart[1]]);
});

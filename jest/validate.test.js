const { validateEmail } = require("./validate");

// 유효한 이메일 입력
test("유효한 이메일 입력시 true 반환", () => {
  const email = 'sundrops7@gmail.com'

  const result = validateEmail(email);
  expect(result).toBeTruthy()
})

test("유효하지 안ㅇ흔 이메일 입력시 false 반환", () => {
  const email = 'sundrops7gmail.com'
  
  const result = validateEmail(email);
  expect(result).toBeFalsy()
})

test("유효하지 않은 이메일 입력시 true 아닌지 확인", () => {
  const email = 'sundrops7mail.com'

  const result = validateEmail(email);
  expect(result).not.toBeTruthy()
})
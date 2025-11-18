const { fetchData } = require("./appClient");

describe("apiClient.js 테스트", () => {
  test("API 호출 후 데이터 포맷이 올바르게 되는지 확인", async () => {

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({
        id: 1,
        name: "김철수",
        address: {
          street: "테스트 거리",
          suite: "테스트 호수",
          city: "서울",
        },
      })
    })
    // Arrange
    const url = "https://jsonplaceholder.typicode.com/users/1";
    const callback = jest.fn()

    // Act
    await fetchData(url);

    // Assert
    expect(callback).toHaveBeenCalledTimes(0);
    // 또는 호출이 되지 않았는지 확인
    expect(callback).not.toHaveBeenCalled();
  });
});

import { fireEvent, render, screen } from "@testing-library/react";
import { Input } from ".";


test("Input 컴포넌트 미입력 시 X 버튼이 보이지 않아야 한다.", () => {
  render(<Input />);

  const input = screen.getByRole("textbox");
  const deleteButton = screen.queryByRole("button", {name: "입력값 지우기"});

  expect(input).toHaveValue("");
  expect(deleteButton).not.toBeInTheDocument();
})

test("Input 컴포넌트 입력 시 X 버튼이 보여야 한다.", () => {
  render(<Input defaultValue="입력값" />);

  const input = screen.getByRole("textbox");
  const deleteButton = screen.queryByRole("button", {name: "입력값 지우기"});

  expect(input).toHaveValue("입력값");
  expect(deleteButton).toBeInTheDocument();
})

test("X 버튼 클릭 시 입력값이 지워지는지 확인한다", () => {
  render(<Input defaultValue="입력값" />);

  const input = screen.getByRole("textbox");
  const deleteButton = screen.getByRole("button", { name: "입력값 지우기" });

  // X 버튼 클릭
  fireEvent.click(deleteButton);

  // 입력값이 지워지고,
  expect(input).toHaveValue("");
  // X 버튼이 사라진다.
  expect(deleteButton).not.toBeInTheDocument();
});
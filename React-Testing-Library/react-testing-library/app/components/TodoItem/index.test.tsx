import TodoItem from "./index";
import { getByRole, getByText, render, screen } from "@testing-library/react";

describe("TodoItem 렌더링", () => {
  test("할 일 항목 상태 테스트", () => {
    render(<TodoItem task="리액트 공부하기" completed={true} />)
    
    const taskText = screen.getByText("리액트 공부하기");
    expect(taskText).toHaveTextContent("리액트 공부하기")

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeChecked()
    expect(checkbox).toBeDisabled()

    const editButton = screen.getByRole('button', {name: '수정'})
    expect(editButton).toBeDisabled();

    const listItem = screen.getByRole("listitem");
    expect(listItem).toHaveClass("completed")
  })
})
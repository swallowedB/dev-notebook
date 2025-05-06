#  🔎 상호작용

## 💬 이벤트에 대한 응답 
React에서는 JSX에 이벤트 핸들러를 추가할 수 있습니다. 이벤트 핸들러는 클릭, 마우스 호버, 폼 인풋 포커스 등 사용자 상호작용에 따라 유발되는 사용자 정의 함수입니다.

`<button>`과 같은 내장 컴포넌트는 `onClick` 과 같은 내장 브라우저 이벤트만 지원합니다. 반면 사용자 정의 컴포넌트를 생성하는 경우, 컴포넌트 이벤트 핸들러 props의 역할에 맞는 원하는 이름을 사용할 수 있습니다.

### ✅ DOM 요소 - 브라우저 이벤트
```jsx
<button onClick={handleClick}>Click me</button>
```
- `<button>`은 HTML 요소이다. 즉, DOM 요소
- `onClick` 과 같이 브라우저에서 제공하는 이벤트 명칭으로만 써야한다.
- 직접 만든 이름은 ❌

### ✅ 사용자 정의 컴포넌트 - props를 통해 이벤트 전달
```jsx
function MyButton({ onMyClick }) {
  return <button onClick={onMyClick}>Click</button>;
}

function App() {
  const handleClick = () => {
    alert("clicked!");
  };

  return <MyButton onMyClick={handleClick} />;
}
```
- `<MyButton>`은 React 컴포넌트
- `onMyClick` 은 사용자가 정의한 이름의 props
- 실제 버튼에는 브라우저 이벤트인 `onClick` 을 연결해야 하니깐, 내부에서 `onClick={onMyClick}` 으로 연결

## 📍 브라우저 이벤트 정리

### 1️⃣ 마우스 이벤트

| 이벤트 이름          | 설명                        |
| --------------- | ------------------------- |
| `onClick`       | 요소 클릭 시                   |
| `onDoubleClick` | 더블 클릭 시                   |
| `onMouseDown`   | 마우스 버튼 누를 때               |
| `onMouseUp`     | 마우스 버튼 뗄 때                |
| `onMouseEnter`  | 마우스가 요소에 들어올 때 (hover 진입) |
| `onMouseLeave`  | 마우스가 요소에서 나갈 때            |
| `onMouseMove`   | 마우스가 움직일 때                |

### 2️⃣ 키보드 이벤트
| 이벤트 이름       | 설명                                                    |
| ------------ | ----------------------------------------------------- |
| `onKeyDown`  | 키보드 키를 누를 때                                           |
| `onKeyUp`    | 키보드 키를 뗄 때                                            |

### 3️⃣ 폼 입력 관련 이벤트
| 이벤트 이름      | 설명                                             |
| ----------- | ---------------------------------------------- |
| `onChange`  | `<input>`, `<select>`, `<textarea>` 등 값이 변경될 때 |
| `onInput`   | 사용자가 값을 입력할 때 (IME 입력 등 더 즉각적인 반응 필요 시 사용)     |
| `onSubmit`  | `<form>` 제출 시                                  |
| `onInvalid` | 폼 validation 에러 발생 시                           |
| `onReset`   | 폼 초기화 시                                        |

### 4️⃣ 포커스 이벤트
| 이벤트 이름    | 설명                   |
| --------- | -------------------- |
| `onFocus` | 요소가 focus될 때         |
| `onBlur`  | 요소가 blur(포커스 잃음) 될 때 |

### 5️⃣ 폼/파일 입력 관련
| 이벤트 이름                               | 설명                    |
| ------------------------------------ | --------------------- |
| `onCopy`                             | 복사할 때 (Ctrl+C)        |
| `onCut`                              | 잘라낼 때 (Ctrl+X)        |
| `onPaste`                            | 붙여넣을 때 (Ctrl+V)       |
| `onDrag`, `onDragStart`, `onDragEnd` | 드래그 관련 이벤트            |
| `onDrop`                             | 요소에 드래그된 파일 등 drop될 때 |

### 6️⃣ 터치 이벤트
| 이벤트 이름          | 설명        |
| --------------- | --------- |
| `onTouchStart`  | 터치 시작할 때  |
| `onTouchMove`   | 터치 이동할 때  |
| `onTouchEnd`    | 터치 끝날 때   |
| `onTouchCancel` | 터치가 취소될 때 |

### 7️⃣ UI/Window 이벤트
| 이벤트 이름     | 설명                               |
| ---------- | -------------------------------- |
| `onScroll` | 스크롤 될 때                          |
| `onResize` | 윈도우 크기 변경 시 (`window`에 직접 붙여야 함) |
| `onLoad`   | 리소스 로드 완료 시 (이미지 등)              |
| `onError`  | 오류 발생 시                          |

## 💬 이벤트 핸들러 추가하기
- 먼저 함수 정의 후 JSX 태그에 prop 형태로 전달
```jsx
  export default function Button() {
  function handleClick() {
    alert('You clicked me!');
  }

  return (
    <button onClick={handleClick}>
      Click me
    </button>
  );
}
```
- `handle` 로 시작하고 그 뒤에 이벤트명을 붙인 함수명을 가진다. => 관습

### ⚠️ 주의!!
- 이벤트 핸들러로 전달한 함수들은 호출이 아닌 전달되어야 한다.
  
|함수를 전달하기 (✅ 올바른 예시)|함수를 호출하기 (❌ 잘못된 예시)|
|--------|-----------|
|`<button onClick={handleClick}>`|	`<button onClick={handleClick()}>`|

- 잘못된 예시에서 `handleClick()` 끝의 `()` 가 렌더링 과정 중 클릭이 없었음에도 불구하고 즉시 함수를 실행하도록 만든다.
- 왜? 이는 JSX `{}` 내의 자바스크립트가 즉시 실행되기 때문이다.

## 💬 이벤트 핸들러 Prop audaudgkrl
- 사용자 정의 컴포넌트엔서는 이벤트 핸들러 prop의 이름을 원하는 대로 명명할 수 있다.
- 관습적으로 이벤트 핸들러 prop의 이름은 `on` 으로 시작하여 대문자 영문으로 이어진다.

## 💬 전파 멈추기
- 이벤트 핸들러는 이벤트 오브젝트를 유일한 매개변수로 받는다.
- 관습을 따르자면 `event` 를 의미하는 `e` 로 호출되는 것이 일반적이다.
- `e.stopPropagation()`을 호출한다.
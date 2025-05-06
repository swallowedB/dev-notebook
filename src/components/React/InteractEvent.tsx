import { useRef, useState } from "react";

export default function InteractEvent() {
  const [clickCount, setClickCount] = useState(0);
  const [doubleCount, setDounbleCount] = useState(0);
  const [key, setKey] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [inputRealTime, setInputRealTime] = useState("");
  const [focus, setFocus] = useState(false);
  const [dragText, setDragText] = useState("이 텍스트를 드래그하세요");
  const [hover, setHover] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [formMessage, setFormMessage] = useState("");

  const scrollBoxRef = useRef(null);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragText("드롭 완료!");
  };

  const handleScroll = () => {
    const scrollTop = scrollBoxRef.current?.scrollTop || 0;
    setScrollY(scrollTop);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormMessage("폼이 제출되었습니다!");
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>React 브라우저 이벤트</h1>

      {/* 클릭 */}
      <section>
        <h2>클릭 이벤트</h2>
        <button onClick={() => setClickCount(clickCount + 1)}>
          클릭 수 : {clickCount}
        </button>
      </section>

      {/* 더블클릭 */}
      <section>
        <h2>더블 클릭 이벤트</h2>
        <button onDoubleClick={() => setDounbleCount(doubleCount + 1)}>
          더블 클릭: {doubleCount}
        </button>
      </section>

      <section>
        <h2>키보드 입력</h2>
        <input
          type="text"
          placeholder="키보드 입력 감지"
          onKeyDown={(e) => setKey(e.key)}
        />
        <p>누른 키 : {key}</p>
      </section>

      <section>
        <h2>입력 변경</h2>
        <input
          type="text"
          placeholder="onChange test"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <p>입력된 값: {inputValue}</p>
      </section>

      <section>
        <h2>실시간 입력 감지</h2>
        <input
          type="text"
          placeholder="onInput 테스트"
          onInput={(e) =>
            setInputRealTime((e.target as HTMLInputElement).value)
          }
        />
        <p>실시간 입력 값: {inputRealTime}</p>
      </section>

      <section>
        <h2>포커스 블러</h2>
        <input
          type="text"
          placeholder="포커스 테스트"
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
        />
        <p>{focus ? "포커스 상태임 ✅" : "포커스 상태 아님❌"}</p>
      </section>

      {/* 드래그 & 드롭 */}
      <section>
        <h2>📦 드래그 & 드롭</h2>
        <div
          draggable
          onDragStart={() => setDragText("드래그 중...")}
          onDragEnd={() => setDragText("드래그 종료")}
          style={{
            padding: "1rem",
            border: "1px dashed gray",
            width: "fit-content",
            cursor: "grab",
            marginBottom: "1rem",
          }}
        >
          {dragText}
        </div>
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          style={{
            padding: "2rem",
            border: "2px solid #888",
            background: "#eee",
          }}
        >
          여기에 드롭하세요
        </div>
      </section>

      {/* 마우스 엔터 / 리브 */}
      <section>
        <h2>👆 Hover 감지 (onMouseEnter / onMouseLeave)</h2>
        <div
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          style={{
            padding: "1rem",
            background: hover ? "#d1e7dd" : "#f8f9fa",
            border: "1px solid #ccc",
          }}
        >
          마우스를 올려보세요
        </div>
        <p>{hover ? "Hover 중! 🟢" : "Hover 아님 🔘"}</p>
      </section>

      {/* 스크롤 감지 */}
      <section>
        <h2>🖱️ 스크롤 감지</h2>
        <div
          ref={scrollBoxRef}
          onScroll={handleScroll}
          style={{
            height: '100px',
            overflowY: 'scroll',
            border: '1px solid #aaa',
            padding: '1rem',
            marginBottom: '1rem',
          }}
        >
          {Array.from({ length: 30 }).map((_, i) => (
            <p key={i}>스크롤 콘텐츠 {i + 1}</p>
          ))}
        </div>
        <p>스크롤 위치: {scrollY}px</p>
      </section>

      {/* 폼 제출 */}
      <section>
        <h2>📨 폼 제출 (onSubmit)</h2>
        <form onSubmit={handleFormSubmit}>
          <input placeholder="입력 후 제출해보세요" />
          <button type="submit">제출</button>
        </form>
        <p>{formMessage}</p>
      </section>
    </div>
  );
}

import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import gsap from "gsap";

/**
 * to, from, fromTo
 * - gsap.to(): 요소의 현재 상태에서 시작하여 트윈에 정의된 값으로 "이동"합니다.
 * - gsap.from(): 거꾸로 된 .to()와 같습니다. 트윈에 정의된 값에서 시작하여 요소의 현재 상태로 "이동"합니다.
 * - gsap.fromTo(): 시작값과 끝값을 모두 정의합니다.
 *
 * stagger
 * - GSAP의 stagger는 여러 요소에 애니메이션을 적용할 때, 각 요소가 순차적으로 애니메이션되도록 하는 기능입니다.
 *
 * timeline
 * - 복잡한 시퀀스의 애니메이션을 아주 간단하게 만들 수 있게하는 기능입니다.
 *
 * play, pause, resume, reverse, restart 등의 메서드
 * - tween 객체에서 사용할 수 있는 메서드입니다.
 * - toRef 참고
 */
const Tutorial1 = () => {
  const container = useRef<HTMLDivElement>(null);
  const toRef = useRef<gsap.core.Tween>(null);

  const { contextSafe } = useGSAP(
    () => {
      // ✅ safe, created during execution, selector text scoped
      // gsap.to(".good", { y: 100, x: 100, delay: 1, duration: 0.1 });
    },
    { scope: container }
  );

  // ✅ wrapped in contextSafe() - animation will be cleaned up correctly
  const onClickTo = contextSafe(() => {
    toRef.current = gsap.to(".good", { x: 40, backgroundColor: "blue" });
  });

  const onClickStop = contextSafe(() => {
    toRef.current?.pause(); // 애니메이션 일시 정지
  });

  const onClickFrom = contextSafe(() => {
    gsap.to(".good", { x: 0, backgroundColor: "red" });
  });

  const onClickFromTo = contextSafe(() => {
    gsap.fromTo(
      ".good",
      { x: 0, backgroundColor: "red" },
      { x: 40, backgroundColor: "green" }
    );
  });

  const onClickStagger = contextSafe(() => {
    gsap.to(".stagger", {
      duration: 1, // 애니메이션의 총 지속 시간 (초 단위)
      delay: 0.5, // 애니메이션 시작 전 0.5초 대기
      rotation: 360,
      opacity: 1,
      stagger: 0.2, // 각 요소마다 0.2초씩 지연되어 순차적으로 실행 (이게 중요 *)
      ease: "sine.out",
      force3D: true, // 3D 변환을 강제로 활성화하여 하드웨어 가속 사용
    });
  });

  const onClickTimeline = contextSafe(() => {
    const timeline = gsap.timeline();

    timeline.to(".timeline1", {
      duration: 0.5,
      x: 15,
      backgroundColor: "blue",
    });
    timeline.to(".timeline2", {
      duration: 0.5,
      x: 15,
      backgroundColor: "green",
    });
    timeline.to(".timeline3", {
      duration: 0.5,
      x: 15,
      backgroundColor: "red",
    });
  });

  return (
    <div ref={container}>
      <h2>to, from, fromTo</h2>
      <div className="good"></div>
      <button onClick={onClickTo} className="bad">
        to
      </button>
      <button onClick={onClickStop} className="bad">
        stop
      </button>
      <button onClick={onClickFrom} className="bad">
        from
      </button>
      <button onClick={onClickFromTo} className="bad">
        fromTo
      </button>

      <hr style={{ marginTop: "100px", border: "none" }} />

      <h2>stagger</h2>
      <div style={{ display: "flex", gap: "15px" }}>
        <div className="stagger item1"></div>
        <div className="stagger item2"></div>
        <div className="stagger item3"></div>
        <div className="stagger item4"></div>
        <div className="stagger item5"></div>
      </div>
      <button onClick={onClickStagger} className="bad">
        stagger
      </button>

      <hr style={{ marginTop: "100px", border: "none" }} />

      <h2>timeline</h2>
      <div style={{ display: "flex", gap: "15px" }}>
        <div className="timeline1"></div>
        <div className="timeline2"></div>
        <div className="timeline3"></div>
      </div>
      <button onClick={onClickTimeline} className="bad">
        timeline
      </button>
    </div>
  );
};

export default Tutorial1;

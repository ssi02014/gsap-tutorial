import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import gsap from "gsap";

/**
 * Tweens 란?
 * - Tweens 란 GSAP의 기본적인 애니메이션입니다.
 * - 예를 들어, gsap.to(), gsap.from(), gsap.fromTo() 등이 있습니다.
 *
 * to, from, fromTo
 * - gsap.to(): 요소의 현재 상태에서 시작하여 트윈에 정의된 값으로 "이동"합니다.
 * - gsap.from(): 거꾸로 된 .to()와 같습니다. 트윈에 정의된 값에서 시작하여 요소의 현재 상태로 "이동"합니다.
 * - gsap.fromTo(): 시작값과 끝값을 모두 정의합니다.
 * - gsap.set(): 즉시 설정하는 것과 같습니다.
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
      repeat: 3, // 애니메이션 반복 횟수, -1은 무한 반복
      repeatDelay: 1, // 반복 사이 1초 대기
      yoyo: true, // 반복 시 원래 위치로 돌아옴, 동작 원리는 참고: https://gsap.com/docs/v3/GSAP/Tween/yoyo()
      delay: 0.5, // 애니메이션 시작 전 0.5초 대기
      rotation: 360,
      opacity: 1,
      stagger: 0.2, // 각 요소마다 0.2초씩 지연되어 순차적으로 실행 (이게 중요 *)
      ease: "sine.out", // 가속도
      force3D: true, // 3D 변환을 강제로 활성화하여 하드웨어 가속 사용
    });

    /**
     * stagger는 객체도 기능
     * @see https://gsap.com/resources/getting-started/Staggers/
     * - each: 0.2를 주면 각 스태거 시작 사이에 0.2초가 있음을 의미
     * - amount: 2초를 주면 모든 스태거가 2초 이내에 실행됨을 의미
     * - from: 스태거가 발생 할 시작 위치를 정할 수 있음 "end" 또는 "cented", "edges" 등 가능
     * - ease: 가속도 함수를 정할 수 있음 to와 같음
     * - 그 외 grid, axis와 같은 그리드와 관련된 속성이 있음
     */
  });

  const onClickTimeline = contextSafe(() => {
    const timeline = gsap.timeline();

    timeline.to(".timeline.item1", {
      duration: 0.5,
      x: 15,
      backgroundColor: "blue",
    });
    timeline.to(".timeline.item2", {
      duration: 0.5,
      x: 15,
      backgroundColor: "green",
    });
    timeline.to(".timeline.item3", {
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
        <div className="timeline item1"></div>
        <div className="timeline item2"></div>
        <div className="timeline item3"></div>
      </div>
      <button onClick={onClickTimeline} className="bad">
        timeline
      </button>
    </div>
  );
};

export default Tutorial1;

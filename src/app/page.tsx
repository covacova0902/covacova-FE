"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
  
  // 루트 경로("/")에 해당하는 홈 페이지 컴포넌트
export default function HomePage() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(true);
  
  useEffect(() => {
    //1.2초 뒤 페이드아웃 시작
    const fadeTimer = setTimeout(() => {
      setIsVisible(false);
    }, 800);

    //1.5초 뒤 /home으로 이동시키는 타이머
    const timer = setTimeout(() => {
      router.push("/home");
    }, 1500);

    //컴포넌트가 언마운트될 때 타이머 제거
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(timer);
    }
  }, [router]);

  return (
    <main className={`mx-auto flex h-screen max-w-[390px] flex-col items-center bg-white px-6 pt-[22vh]
    transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0"}`}>
      <Image src="/assets/logos/covacovaLogo.svg" alt="코바코바 로고" width={184} height={184} priority/>
      <p className="mt-[32vh] text-center text-base leading-relaxed">코에서 코로,<br />
      마음까지 이어지는 뜨개 이야기</p>
    </main>
  );
}

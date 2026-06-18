import type { Metadata } from "next"; // 페이지 메타데이터(title, description 등)의 타입
import type { ReactNode } from "react"; // 자식 컴포넌트(children)의 타입
import "./globals.css"; // 전역 스타일(Tailwind 포함)을 모든 페이지에 적용

export const metadata: Metadata = {
  title: "코바코바", // 브라우저 탭에 표시될 제목
  description: "코바코바 프로젝트 프론트엔드", // 검색엔진/공유 시 표시될 설명
};

// 모든 페이지를 감싸는 루트 레이아웃 컴포넌트
export default function RootLayout({
  children, // 각 페이지(page.tsx)의 내용이 여기로 전달됨
}: {
  children: ReactNode; // children의 타입을 React 노드로 제한
}) {
  return (
    <html lang="ko">
      {/* lang="ko"로 문서 언어를 한국어로 지정 */}
      <body>{children}</body>
      {/* 실제 페이지 내용이 렌더링되는 위치 */}
    </html>
  );
}

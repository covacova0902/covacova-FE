// 루트 경로("/")에 해당하는 홈 페이지 컴포넌트
export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      {/* 화면 전체 높이를 채우고 내용을 가운데 정렬 */}
      <h1 className="text-2xl font-bold">코바코바</h1>
      {/* 임시 홈 화면 타이틀, 실제 기획에 맞춰 추후 교체 */}
    </main>
  );
}

import { dirname } from "path"; // 파일 경로에서 디렉토리 부분만 추출하는 함수
import { fileURLToPath } from "url"; // import.meta.url(파일 URL)을 일반 경로 문자열로 변환
import { FlatCompat } from "@eslint/eslintrc"; // 구버전(eslintrc) 설정을 새 flat config로 변환해주는 도구

const __filename = fileURLToPath(import.meta.url); // 현재 파일의 절대 경로
const __dirname = dirname(__filename); // 현재 파일이 위치한 디렉토리

const compat = new FlatCompat({
  baseDirectory: __dirname, // next/core-web-vitals 같은 설정을 찾을 기준 경로
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"), // Next.js 공식 권장 규칙 + TS 규칙 적용
];

export default eslintConfig; // ESLint가 이 배열을 최종 설정으로 사용

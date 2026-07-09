import Image from "next/image";

export default function LoginPage() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-97.5 flex-col bg-white px-6">
      {/* 로고 */}
      <Image
        src="/assets/logos/logo.svg"
        alt="코바코바 로고"
        width={220}
        height={36}
        className="mx-auto pt-20"
        priority
      />

      {/* 로그인 세션 제목 */}
      <h1 className="mt-25 text-lg font-bold text-black">로그인</h1>

      {/* 아이디 입력칸 */}
      <input
        type="text"
        placeholder="아이디를 입력해주세요."
        className="mt-10 border-b border-gray-200 py-3 text-b0r font-normal focus:outline-none"
      />

      {/* 비밀번호 입력칸 */}
      <input
        type="password"
        placeholder="비밀번호를 입력해주세요."
        className="mt-3 border-b border-gray-200 py-3 text-b0r font-normal focus:outline-none"
      />

      {/* 아이디 저장 체크박스 + 아이디/비밀번호 찾기 */}
      <div className="mt-5 flex items-center justify-between text-b1r font-normal text-gray-800">
        <label className="flex items-center gap-1.5">
          {/* label로 감싸 체크박스와 글자 함께 클릭 */}
          <input type="checkbox" className="peer sr-only cursor-pointer" />
          <Image
            src="/assets/icons/checked.svg"
            alt=""
            width={24}
            height={24}
            className="hidden peer-checked:block"
          />
          <Image
            src="/assets/icons/unchecked.svg"
            alt=""
            width={24}
            height={24}
            className="peer-checked:hidden"
          />
          <span className="peer-checked:text-black cursor-pointer">
            아이디 저장
          </span>
        </label>

        <div className="flex items-center gap-2">
          <button type="button" className="cursor-pointer">
            아이디 찾기
          </button>
          <span>|</span>
          <button type="button" className="cursor-pointer">
            비밀번호 찾기
          </button>
        </div>
      </div>

      {/* 로그인 버튼 */}
      <button
        type="submit"
        className="cursor-pointer mt-7 w-full rounded-full bg-blue py-4 text-b0m font-medium"
      >
        로그인
      </button>

      {/* 회원가입 버튼 */}
      <p className="mt-5 text-center text-b1m font-normal text-gray-600">
        회원이 아니신가요?{" "}
        <button
          type="button"
          className="cursor-pointer font-medium text-black ml-1"
        >
          회원가입
        </button>
      </p>

      <div className="flex-1" />

      {/* 소셜 로그인 */}
      <div className="mb-10 flex flex-col gap-3">
        <button
          type="button"
          className="relative cursor-pointer flex w-full items-center justify-center gap-2 rounded-full bg-[#FEE500] py-4 text-b0m font-medium text-black"
        >
          <Image
            src="/assets/icons/kakao.svg"
            alt=""
            width={16}
            height={16}
            className="absolute left-8"
          />{" "}
          <span className="text-center">카카오톡 계정으로 로그인</span>
        </button>
        <button
          type="button"
          className="relative cursor-pointer flex w-full items-center justify-center gap-2 rounded-full border border-gray-400 py-4 text-b0m font-medium text-black"
        >
          <Image
            src="/assets/icons/google.svg"
            alt=""
            width={16}
            height={16}
            className="absolute left-8"
          />
          <span className="text-center">Google 계정으로 로그인</span>
        </button>
      </div>
    </main>
  );
}

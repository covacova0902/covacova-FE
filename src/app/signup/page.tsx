import Image from "next/image";

export default function SignupPage() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-97.5 flex-col bg-white px-6">
      {/* 상단 헤더 */}
      <div className="flex items-center gap-3 pt-10">
        <button type="button" className="cursor-pointer">
          <Image src="/assets/icons/back.svg" alt="" width={24} height={24} />
        </button>
        <h1 className="text-lg font-bold text-[--color-black]">회원가입</h1>
      </div>

      <form className="flex flex-col">
        {/* 이메일 아이디 */}
        <label className="mt-12 text-b2m font-normal text-gray-600">
          이메일 아이디
        </label>
        <div className="mt-1 flex items-center gap-2">
          <input
            type="text"
            placeholder="이메일 아이디를 입력해주세요"
            className="flex-1 py-3 text-b0m font-normal focus:outline-none border-b border-gray-200"
          />
          <button
            type="button"
            className="cursor-pointer shrink-0 rounded-full bg-warm-gray px-4 py-2 text-b1m font-medium text-white"
          >
            중복확인
          </button>
        </div>

        {/* 비밀번호 */}
        <label className="mt-6 text-b2m font-normal text-gray-600">
          비밀번호
        </label>
        <input
          type="password"
          placeholder="비밀번호를 입력해주세요"
          className="mt-1 border-b border-gray-200 py-3 text-b0m font-normal focus:outline-none"
        />

        {/* 비밀번호 확인 */}
        <label className="mt-6 text-b2m font-normal text-gray-600">
          비밀번호 확인
        </label>
        <input
          type="password"
          placeholder="비밀번호를 동일하게 입력해주세요"
          className="mt-1 border-b border-gray-200 py-3 text-b0m font-normal focus:outline-none"
        />

        {/* 이름 */}
        <label className="mt-6 text-b2m font-normal text-gray-600">이름</label>
        <input
          type="text"
          placeholder="이름을 입력해주세요"
          className="mt-1 border-b border-gray-200 py-3 text-b0m font-normal focus:outline-none"
        />

        {/* 약관 동의 */}
        <div className="mt-6 flex flex-col gap-3 text-b2m font-normal text-gray-800">
          <label className="flex items-center gap-1.5">
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
            <span className="cursor-pointer">전체 약관에 동의합니다.</span>
          </label>

          {/* 이용약관 */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-1.5">
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
              <span className="cursor-pointer">
                (필수) 이용약관에 동의합니다.
              </span>
            </label>
            <button
              type="button"
              className="cursor-pointer text-b2m font-normal text-gray-600 underline"
            >
              보기
            </button>
          </div>

          {/* 개인정보 */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-1.5">
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
              <span className="cursor-pointer">
                (필수) 개인정보처리방침에 동의합니다.
              </span>
            </label>
            <button
              type="button"
              className="cursor-pointer text-b2m font-normal text-gray-600 underline"
            >
              보기
            </button>
          </div>
        </div>

        {/* 가입하기 버튼 */}
        <button
          type="submit"
          className="mt-6 mb-10 w-full cursor-pointer rounded-full bg-gray-200 py-4 text-b0m font-medium text-gray-1000"
        >
          가입하기
        </button>
      </form>
    </main>
  );
}

import Image from "next/image";

export default function LoginPage() {
    return (
        <main className="mx-auto flex h-screen max-w-[390px] flex-col bg-white px-6 pt-14">
            {/* 로고 */}
            <Image src="/assets/logos/logo.svg" alt="코바코바 로고" width={220} height={36}
            className="mx-auto" priority/>

            {/* 로그인 세션 제목 */}
            <h1 className="mt-30 text-lg font-bold text-[#373636]">로그인</h1>

            {/* 아이디 입력칸 */}
            <input type="text" placeholder="아이디를 입력해주세요." 
            className="mt-10 border-b border-[#DFDCDB] py-3 text-base focus:outline-none"/>

            {/* 비밀번호 입력칸 */}
            <input type="password" placeholder="비밀번호를 입력해주세요." 
            className="mt-3 border-b border-[#DFDCDB] py-3 text-base focus:outline-none"/>

            {/* 아이디 저장 체크박스 + 아이디/비밀번호 찾기 */}
            <div className="mt-5 flex items-center justify-between text-sm text-[#969290]">
                <label className="flex items-center gap-1.5"> {/* label로 감싸 체크박스와 글자 함께 클릭 */}
                    <input type="checkbox" className="peer sr-only" />

                    <Image src="/assets/icons/checked.svg" alt="" width={24} height={24}
                    className="hidden peer-checked:block"/>
                    <Image src="/assets/icons/unchecked.svg" alt="" width={24} height={24}
                    className="peer-checked:hidden"/>
                    아이디 저장
                </label>

                <div className="flex items-center gap-2">
                    <button type="button">아이디 찾기</button>
                    <span>|</span>
                    <button type="button">비밀번호 찾기</button>
                </div>
            </div>
        </main>
    )
}
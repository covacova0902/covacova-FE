"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "@/lib/axios";
import { getErrorMessage, getFieldError } from "@/lib/getErrorMessage";

const PASSWORD_MIN_LENGTH = 8;

const TERMS_SECTIONS = [
  {
    heading: "제 1조(목적)",
    body: '본 약관은 ○○○○○(이하 "회사"라고 합니다)이 운영하는 코바코바 서비스의 이용과 관련하여 회사와 이용자의 권리, 의무 및 책임, 기타 필요한 사항을 규정함을 목적으로 합니다.',
  },
  {
    heading: "제2조(정의)",
    body: '본 약관은 ○○○○○(이하 "회사"라고 합니다)이 운영하는 코바코바 서비스의 이용과 관련하여 회사와 이용자의 권리, 의무 및 책임, 기타 필요한 사항을 규정함을 목적으로 합니다.',
  },
  {
    heading: "제3조(정의)",
    body: '본 약관은 ○○○○○(이하 "회사"라고 합니다)이 운영하는 코바코바 서비스의 이용과 관련하여 회사와 이용자의 권리, 의무 및 책임, 기타 필요한 사항을 규정함을 목적으로 합니다.',
  },
];

const PRIVACY_SECTIONS = [
  {
    heading: "제1조(목적)",
    body: '본 방침은 ○○○○○(이하 "회사"라고 합니다)이 운영하는 코바코바 서비스의 개인정보 처리에 관한 사항을 규정함을 목적으로 합니다.',
  },
  {
    heading: "제2조(수집 항목 및 이용 목적)",
    body: '본 방침은 ○○○○○(이하 "회사"라고 합니다)이 운영하는 코바코바 서비스의 개인정보 처리에 관한 사항을 규정함을 목적으로 합니다.',
  },
];

export default function SignupPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [name, setName] = useState("");

  const [emailChecked, setEmailChecked] = useState(false);
  const [emailCheckError, setEmailCheckError] = useState("");
  const [emailChecking, setEmailChecking] = useState(false);

  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const agreeAll = agreeTerms && agreePrivacy;

  const [submitting, setSubmitting] = useState(false);

  const [activeModal, setActiveModal] = useState<"terms" | "privacy" | null>(
    null,
  );

  const passwordTooShort =
    password.length > 0 && password.length < PASSWORD_MIN_LENGTH;
  const passwordMismatch =
    passwordConfirm.length > 0 && password !== passwordConfirm;

  const isFormValid =
    emailChecked &&
    password.length >= PASSWORD_MIN_LENGTH &&
    password === passwordConfirm &&
    name.trim().length > 0 &&
    agreeTerms &&
    agreePrivacy;

  const handleEmailChange = (value: string) => {
    setEmail(value);
    setEmailChecked(false);
    setEmailCheckError("");
  };

  const handleCheckEmail = async () => {
    if (!email) {
      setEmailCheckError("이메일을 입력해주세요.");
      return;
    }

    setEmailChecking(true);
    setEmailCheckError("");

    try {
      const { data: res } = await api.get("/api/members/check-email", {
        params: { email },
      });

      if (!res.data.available) {
        setEmailChecked(false);
        setEmailCheckError(res.message ?? "이미 사용 중인 이메일이에요.");
        return;
      }

      setEmailChecked(true);
      alert(res.message ?? "사용 가능한 이메일이에요.");
    } catch (error) {
      setEmailChecked(false);
      setEmailCheckError(
        getFieldError(error, "email") ??
          getErrorMessage(error, "중복확인 중 오류가 발생했어요."),
      );
    } finally {
      setEmailChecking(false);
    }
  };

  const handleAgreeAll = (checked: boolean) => {
    setAgreeTerms(checked);
    setAgreePrivacy(checked);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || submitting) return;

    setSubmitting(true);

    try {
      const { data: res } = await api.post("/api/members", {
        email,
        password,
        termsAgreed: agreeTerms,
        privacyAgreed: agreePrivacy,
      });

      if (!res.success) {
        alert(res.message ?? "회원가입에 실패했어요.");
        return;
      }

      alert("회원가입이 완료됐어요.");
      router.push("/login");
    } catch (error) {
      alert(getErrorMessage(error, "회원가입 중 오류가 발생했어요."));
    } finally {
      setSubmitting(false);
    }
  };

  const emailBorder = emailCheckError
    ? "border-pink-muted"
    : emailChecked
      ? "border-blue"
      : "border-gray-200";

  const passwordBorder = passwordTooShort
    ? "border-pink-muted"
    : password.length >= PASSWORD_MIN_LENGTH
      ? "border-blue"
      : "border-gray-200";

  const passwordConfirmBorder = passwordMismatch
    ? "border-pink-muted"
    : password.length > 0 && password === passwordConfirm
      ? "border-blue"
      : "border-gray-200";

  return (
    <main className="mx-auto flex min-h-dvh max-w-97.5 flex-col bg-white px-6">
      {/* 상단 헤더 */}
      <div className="flex items-center gap-3 pt-10">
        <button
          type="button"
          onClick={() => router.back()}
          className="cursor-pointer"
        >
          <Image src="/assets/icons/back.svg" alt="" width={24} height={24} />
        </button>
        <h1 className="text-lg font-bold text-[--color-black]">회원가입</h1>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col">
        {/* 이메일 아이디 */}
        <label className="mt-12 text-b2m font-normal text-gray-600">
          이메일 아이디
        </label>
        <div className="mt-1 flex items-center gap-2">
          <input
            type="text"
            placeholder="이메일 아이디를 입력해주세요"
            value={email}
            onChange={(e) => handleEmailChange(e.target.value)}
            className={`flex-1 py-3 text-b0m font-normal focus:outline-none border-b ${emailBorder}`}
          />
          <button
            type="button"
            onClick={handleCheckEmail}
            disabled={emailChecking}
            className="cursor-pointer shrink-0 rounded-full bg-warm-gray px-4 py-2 text-b1m font-medium text-white"
          >
            {emailChecking ? "확인 중..." : "중복확인"}
          </button>
        </div>
        {emailCheckError && (
          <p className="mt-1 text-b3m font-normal text-pink-muted">
            {emailCheckError}
          </p>
        )}

        {/* 비밀번호 */}
        <label className="mt-6 text-b2m font-normal text-gray-600">
          비밀번호
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호를 입력해주세요"
          className={`mt-1 border-b py-3 text-b0m font-normal focus:outline-none ${
            passwordBorder
          }`}
        />
        {passwordTooShort && (
          <p className="mt-1 text-b3m font-normal text-pink-muted">
            비밀번호는 {PASSWORD_MIN_LENGTH}자 이상이어야 해요.
          </p>
        )}

        {/* 비밀번호 확인 */}
        <label className="mt-6 text-b2m font-normal text-gray-600">
          비밀번호 확인
        </label>
        <input
          type="password"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          placeholder="비밀번호를 동일하게 입력해주세요"
          className={`mt-1 border-b py-3 text-b0m font-normal focus:outline-none ${
            passwordConfirmBorder
          }`}
        />
        {passwordMismatch && (
          <p className="mt-1 text-b3m font-normal text-pink-muted">
            비밀번호가 일치하지 않아요.
          </p>
        )}

        {/* 이름 */}
        <label className="mt-6 text-b2m font-normal text-gray-600">이름</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="이름을 입력해주세요"
          className="mt-1 border-b border-gray-200 py-3 text-b0m font-normal focus:outline-none"
        />

        {/* 약관 동의 */}
        <div className="mt-6 flex flex-col gap-3 text-b2m font-normal text-gray-800">
          <label className="flex items-center gap-1.5">
            <input
              type="checkbox"
              checked={agreeAll}
              onChange={(e) => handleAgreeAll(e.target.checked)}
              className="peer sr-only cursor-pointer"
            />
            <Image
              src="/assets/icons/checked.svg"
              alt=""
              width={24}
              height={24}
              className="hidden peer-checked:block cursor-pointer"
            />
            <Image
              src="/assets/icons/unchecked.svg"
              alt=""
              width={24}
              height={24}
              className="peer-checked:hidden cursor-pointer"
            />
            <span className="cursor-pointer">전체 약관에 동의합니다.</span>
          </label>

          {/* 이용약관 */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-1.5">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="peer sr-only cursor-pointer"
              />
              <Image
                src="/assets/icons/checked.svg"
                alt=""
                width={24}
                height={24}
                className="hidden peer-checked:block cursor-pointer"
              />
              <Image
                src="/assets/icons/unchecked.svg"
                alt=""
                width={24}
                height={24}
                className="peer-checked:hidden cursor-pointer"
              />
              <span className="cursor-pointer">
                (필수) 이용약관에 동의합니다.
              </span>
            </label>
            <button
              type="button"
              onClick={() => setActiveModal("terms")}
              className="cursor-pointer text-b2m font-normal text-gray-600 underline"
            >
              보기
            </button>
          </div>

          {/* 개인정보 */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-1.5">
              <input
                type="checkbox"
                checked={agreePrivacy}
                onChange={(e) => setAgreePrivacy(e.target.checked)}
                className="peer sr-only cursor-pointer"
              />
              <Image
                src="/assets/icons/checked.svg"
                alt=""
                width={24}
                height={24}
                className="hidden peer-checked:block cursor-pointer"
              />
              <Image
                src="/assets/icons/unchecked.svg"
                alt=""
                width={24}
                height={24}
                className="peer-checked:hidden cursor-pointer"
              />
              <span className="cursor-pointer">
                (필수) 개인정보처리방침에 동의합니다.
              </span>
            </label>
            <button
              type="button"
              onClick={() => setActiveModal("privacy")}
              className="cursor-pointer text-b2m font-normal text-gray-600 underline"
            >
              보기
            </button>
          </div>
        </div>

        {/* 가입하기 버튼 */}
        <button
          type="submit"
          disabled={!isFormValid || submitting}
          className="mt-6 mb-10 w-full cursor-pointer rounded-full bg-blue py-4 text-b0m font-medium disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-1000"
        >
          {submitting ? "가입 중..." : "가입하기"}
        </button>
      </form>

      {/* 약관 오버레이 */}
      {activeModal && (
        <div className="fixed inset-0 z-50 mx-auto flex max-w-97.5 flex-col bg-white">
          {/* 헤더 */}
          <div className="flex items-center justify-between px-6 pt-10">
            <h2 className="text-lg font-medium text-black">
              {activeModal === "terms" ? "서비스 이용약관" : "개인정보처리방침"}
            </h2>
            <button
              type="button"
              onClick={() => setActiveModal(null)}
              className="cursor-pointer"
            >
              <Image
                src="/assets/icons/close.svg"
                alt=""
                width={20}
                height={20}
              />
            </button>
          </div>

          {/* 본문 */}
          <div className="mt-10 flex-1 overflow-y-auto px-6">
            <h3 className="text-lg font-bold text-black">
              {activeModal === "terms"
                ? "코바코바 서비스 이용약관"
                : "코바코바 개인정보처리방침"}
            </h3>
            <div className="mt-6 flex flex-col gap-4">
              {(activeModal === "terms"
                ? TERMS_SECTIONS
                : PRIVACY_SECTIONS
              ).map((section) => (
                <div key={section.heading}>
                  <h4 className="text-b1m font-medium text-black">
                    {section.heading}
                  </h4>
                  <p className="mt-1 text-b2r font-normal text-black">
                    {section.body}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 동의하기 버튼 */}
          <div className="px-6 pt-4 pb-10">
            <button
              type="button"
              onClick={() => {
                if (activeModal === "terms") {
                  setAgreeTerms(true);
                } else {
                  setAgreePrivacy(true);
                }
                setActiveModal(null);
              }}
              className="w-full cursor-pointer rounded-full bg-blue py-4 text-b0m font-medium"
            >
              동의하기
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

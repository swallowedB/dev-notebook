import type { Config } from "jest";

const config: Config = {
  // 브라우저 환경 흉내
  testEnvironment: "jest-environment-jsdom",

  // ts/tsx 파일 트랜스폼
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },

  // 인식할 확장자
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],

  // 절대 경로 alias (@/...) 쓰고 있다면 여기 매핑
  // create-next-app 기본 tsconfig 기준으로는 rootDir 기준으로 매핑
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },

  // RTL 매처들(jest-dom) 세팅 파일
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],

  // 테스트 파일 패턴
  testMatch: [
    "<rootDir>/__tests__/**/*.(test|spec).(ts|tsx)",
    "<rootDir>/**/*.(test|spec).(ts|tsx)",
  ],
};

export default config;

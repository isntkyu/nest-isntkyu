>>>NestJS와 typeORM을 공부합니다.

ZeroCho 님의 슬랙 클론 코딩 풀스택 리포지토리를 fork 해서 

express로 구성된 백엔드 코드를 nestjs로 바꿔봅니다


* 2/16

  * nest 세팅, 구조파악  공식문서 열람

* 2/17

  * dotenv 셋팅 
  * console.log() -> 미들웨어 구현하여 logger 사용 
    * implements 를 하면 구현이 반드시 이루어져야함
    * DI provider - @injectable()


  >  users 모듈만들고 > 컨트롤러 

  - nest g(generate) mo users
  - nest g co users 컨트로러
  - nest g s users 서비싀

  #### nest 명령어 대신 npx @nestjs/cli 를 사용하는중

  npm i -g @nestjs/cli는 문제가있음 (나중에 정리, 해결)